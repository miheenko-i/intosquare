import { Component, type ReactNode } from "react";
import { Index } from "@/routes/index";

class ErrorBoundary extends Component<{children: ReactNode}, {failed: boolean}> {
  state = {failed: false};
  static getDerivedStateFromError() { return {failed: true}; }
  componentDidCatch(error: Error) { console.error("IntoSquare rendering error:", error); }
  render() {
    if (this.state.failed) return <main className="fallback"><h1>Let's try that again.</h1><p>The page couldn't load. Please refresh your browser.</p><a href="./">Reload IntoSquare ↗</a></main>;
    return this.props.children;
  }
}
export default function App() {
  return <ErrorBoundary><Index /></ErrorBoundary>;
}
