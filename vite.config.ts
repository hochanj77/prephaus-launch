import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// GitHub Pages serves project sites from /<repo>/.
// For user/organization sites (<owner>.github.io), the site is served from /.
const ghRepoName = process.env.GITHUB_REPOSITORY?.split("/")?.[1];
const ghBase =
  process.env.GITHUB_PAGES && ghRepoName && !ghRepoName.endsWith(".github.io")
    ? `/${ghRepoName}/`
    : "/";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: ghBase,
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
