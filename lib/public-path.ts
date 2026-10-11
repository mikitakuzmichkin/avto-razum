const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Префикс публичных файлов. Пустой, пока сайт открывается с корня домена. */
export function publicPath(path: string) {
  if (!basePath || !path.startsWith("/") || path.startsWith("//")) return path;
  if (path === basePath || path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path}`;
}
