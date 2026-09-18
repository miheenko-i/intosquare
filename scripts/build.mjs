import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import os from "node:os";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const tailwind = require("tailwindcss");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(root, "src");
const relative = (file) => path.relative(root, file).replaceAll(path.sep, "/");
async function walk(dir) {
  const entries = await fs.readdir(dir, {withFileTypes: true});
  const result = [];
  for (const entry of entries) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await walk(file));
    else if (/\.tsx?$/.test(file) && !file.endsWith(".d.ts")) result.push(file);
  }
  return result.sort();
}
export async function build() {
  const waitlistConfig = JSON.parse(await fs.readFile(path.join(root, "waitlist.config.json"), "utf8"));
  const allFiles = await walk(sourceRoot);
  const fileSet = new Set(allFiles);
  // Ship only the modules reachable from the entry point, not the archived demo.
  const files = [path.join(sourceRoot, "main.tsx")];
  const queued = new Set(files);
  const candidates = new Set();
  const modules = [];
  function resolveImport(specifier, parent) {
    if (specifier.startsWith("react")) return specifier;
    const base = specifier.startsWith("@/") ? path.join(sourceRoot, specifier.slice(2)) : path.resolve(path.dirname(parent), specifier);
    const match = [base, `${base}.ts`, `${base}.tsx`, path.join(base,"index.ts"), path.join(base,"index.tsx")].find((file) => fileSet.has(file));
    if (!match) throw new Error(`Unresolved import ${specifier} in ${relative(parent)}`);
    if (!queued.has(match)) { queued.add(match); files.push(match); }
    return relative(match);
  }
  for (const file of files) {
    let source = await fs.readFile(file, "utf8");
    if (relative(file) === "src/config/waitlist.ts") {
      const endpoint = process.env.INTOSQUARE_WAITLIST_ENDPOINT || waitlistConfig.endpoint || "";
      if (endpoint && new URL(endpoint).protocol !== "https:") throw new Error("Waitlist endpoint must use HTTPS.");
      source = source.replace('"__INTOSQUARE_WAITLIST_ENDPOINT__"', JSON.stringify(endpoint));
    }
    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.ES2022, true, file.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    function scan(node) {
      if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
        for (const token of node.text.split(/\s+/)) if (token) candidates.add(token);
      }
      ts.forEachChild(node, scan);
    }
    scan(ast);
    const output = ts.transpileModule(source, {fileName: file, reportDiagnostics: true, compilerOptions: {
      target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, isolatedModules: true
    }});
    const errors = output.diagnostics?.filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error) ?? [];
    if (errors.length) throw new Error(ts.formatDiagnosticsWithColorAndContext(errors, {
      getCanonicalFileName: (file) => file, getCurrentDirectory: () => root, getNewLine: () => "\n"
    }));
    const code = output.outputText.replace(/\brequire\((['"])([^'"]+)\1\)/g, (_match, _quote, specifier) => `require(${JSON.stringify(resolveImport(specifier, file))})`);
    modules.push(`${JSON.stringify(relative(file))}: function(require, module, exports) {\n${code}\n}`);
  }
  const cssSource = await fs.readFile(path.join(sourceRoot,"waitlist.css"),"utf8");
  const twDir = path.dirname(require.resolve("tailwindcss/package.json"));
  const compiler = await tailwind.compile(cssSource, {
    base: sourceRoot,
    loadStylesheet: async (id, base) => {
      const file = id === "tailwindcss" ? path.join(twDir,"index.css") : path.resolve(base, id);
      return {path:file, base:path.dirname(file), content:await fs.readFile(file,"utf8")};
    }
  });
  const css = compiler.build([...candidates]);
  const runtime = await fs.readFile(path.join(root,"vendor/react-runtime.js"),"utf8");
  const application = `(function(){"use strict";const definitions={${modules.join(",\n")}};const cache={};
const builtins={"react":globalThis.React,"react-dom/client":{createRoot:globalThis.ReactDOM.createRoot},"react/jsx-runtime":{Fragment:globalThis.React.Fragment,jsx:jsx,jsxs:jsx}};
function jsx(type,props,key){return globalThis.React.createElement(type,key===undefined?props:Object.assign({},props,{key:key}));}
function require(id){if(builtins[id])return builtins[id];if(cache[id])return cache[id].exports;const factory=definitions[id];if(!factory)throw new Error("Missing module: "+id);const module={exports:{}};cache[id]=module;factory(require,module,module.exports);return module.exports;}
require("src/main.tsx");})();`;
  const htmlTemplate = await fs.readFile(path.join(root,"index.html"),"utf8");
  // Inline runtime and CSS. Pre-render content too, so a script-blocked viewer is not blank.
  let html = htmlTemplate.replace("<!-- APP_STYLES -->",()=>`<style>${css.replaceAll("</style", "<\\/style")}</style>`).replace("<!-- APP_SCRIPTS -->",()=>`<script>${(runtime+"\n"+application).replaceAll("</script", "<\\/script")}</script>`);
  let markup;
  let renderer;
  try {
    const React = require("react");
    const { renderToString } = require("react-dom/server");
    const moduleLoader = new Function("externalRequire", `
      const definitions={${modules.join(",\n")}};
      const cache={};
      function require(id){
        if(id.startsWith("react"))return externalRequire(id);
        if(cache[id])return cache[id].exports;
        if(!definitions[id])throw new Error("Missing module: "+id);
        const module={exports:{}};cache[id]=module;
        definitions[id](require,module,module.exports);return module.exports;
      }
      return require("src/App.tsx").default;
    `);
    const App = moduleLoader(require);
    markup = renderToString(React.createElement(React.StrictMode, null, React.createElement(App)));
    renderer = "react-dom/server";
  } catch (error) {
    // Bootstrap/export environments may ship the vendored browser runtime only.
    // An explicit opt-in permits rendering that exact runtime using Playwright.
    if (process.env.INTOSQUARE_BROWSER_PRERENDER !== "1") {
      throw new Error("Pre-rendering failed. Run npm install first. Original error: " + error.message);
    }
    const temp = await fs.mkdtemp(path.join(os.tmpdir(), "intosquare-prerender-"));
    try {
      const input = path.join(temp, "input.html");
      const output = path.join(temp, "markup.html");
      await fs.writeFile(input, html.replace("<!-- APP_MARKUP -->", ""));
      const result = spawnSync(process.env.PYTHON || "python", [path.join(root,"scripts/prerender.py"), input, output], {encoding:"utf8", timeout:45000});
      if (result.status !== 0) throw new Error(result.stderr || result.error?.message || "Browser pre-render failed");
      markup = await fs.readFile(output,"utf8");
      renderer = "browser snapshot";
    } finally { await fs.rm(temp,{recursive:true,force:true}); }
  }
  if (!markup?.includes('id="headline"') || !markup.includes('id="signup-email"') || !markup.includes('id="how-it-works"')) {
    throw new Error("Refusing to export an empty or incomplete landing page.");
  }
  html = html.replace("<!-- APP_MARKUP -->", () => markup);
  await fs.mkdir(path.join(root,"dist"),{recursive:true});
  await fs.writeFile(path.join(root,"dist/index.html"),html);
  await fs.writeFile(path.join(root,"dist/app.css"),css);
  await fs.writeFile(path.join(root,"dist/IntoSquare.html"),html);
  await fs.writeFile(path.join(root,"dist/.nojekyll"), "");
  if (process.argv.includes("--pages")) {
    const pagesDirectory = path.join(root, "docs");
    await fs.mkdir(pagesDirectory, { recursive: true });
    await fs.writeFile(path.join(pagesDirectory, "index.html"), html);
    await fs.writeFile(path.join(pagesDirectory, ".nojekyll"), "");
  }
  console.log(`Built ${files.length} React/TypeScript modules, ${candidates.size} CSS candidates; ${(Buffer.byteLength(html)/1024).toFixed(0)} KB content-first standalone HTML; prerendered with ${renderer}.`);
  return html;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  build().catch(error=>{console.error(error);process.exitCode=1;});
}
