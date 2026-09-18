import { watch } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "./build.mjs";
import { serve } from "./serve.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
await build();
serve();
let timer, building=false, queued=false;
async function rebuild() {
  if(building){queued=true;return;}
  building=true;
  try{await build();console.log("Rebuilt. Refresh the browser to see the changes.");}catch(error){console.error(error);}
  building=false;
  if(queued){queued=false;await rebuild();}
}
for(const entry of ["src","index.html"]) watch(path.join(root,entry),{recursive:entry==="src"},()=>{clearTimeout(timer);timer=setTimeout(rebuild,150);});
