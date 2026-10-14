import { spawnSync } from "node:child_process";

const env = {
  ...process.env,
  GITHUB_PAGES: "1",
  NEXT_PUBLIC_BASE_PATH: "/avto-razum",
  NEXT_PUBLIC_SITE_URL: "https://mikitakuzmichkin.github.io/avto-razum",
};

const seo = spawnSync("node", ["scripts/write-seo.mjs"], {
  stdio: "inherit",
  shell: true,
  env,
});

if (seo.status) process.exit(seo.status ?? 1);

const result = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  shell: true,
  env,
});

process.exit(result.status ?? 1);
