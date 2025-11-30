import { useRouter } from "#app";

export function custom_link(url, hash = null) {
  const router = useRouter();
  if (!url) return;

  try {
    const full_url = new URL(url, window.location.origin);
    const is_internal = full_url.origin === window.location.origin;
    if (!is_internal) return window.open(full_url.href, "_blank");

    const path = full_url.pathname || "/";
    const query = Object.fromEntries(full_url.searchParams.entries());
    const nav_target = hash
      ? { path, query, hash: `#${hash}` }
      : { path, query };
    router.push(nav_target);
  } catch {
    const nav_target = hash ? { path: url, hash: `#${hash}` } : { path: url };
    router.push(nav_target);
  }
}
