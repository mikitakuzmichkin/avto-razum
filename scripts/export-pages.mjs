import { spawnSync } from "node:child_process";

const result = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    GITHUB_PAGES: "1",
    NEXT_PUBLIC_BASE_PATH: "/avto-razum",
    NEXT_PUBLIC_SITE_URL: "https://mikitakuzmichkin.github.io/avto-razum",
  },
});

process.exit(result.status ?? 1);
