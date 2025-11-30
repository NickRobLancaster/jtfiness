import { onMounted, onBeforeUnmount } from "vue";
import { custom_link } from "~/utils/custom_link";

export function use_bind_custom_links(root_ref) {
  const scroll_to_with_offset = (hash) => {
    if (!hash) return;
    const el = document.querySelector(`#${hash}`);
    if (!el) return;

    // offset for fixed nav (optional, adjust as needed)
    const offset = 140;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  const on_click = (e) => {
    const el = e.target?.closest?.("[data-href], [data_hash]");
    if (!el || !root_ref?.value?.contains(el)) return;

    const url = el.getAttribute("data-href");
    if (!url) return;

    e.preventDefault();

    const hash = el.getAttribute("data_hash") || null;

    // always navigate via Nuxt router
    custom_link(url, hash);

    // only run scroll offset if hash is present
    if (hash) {
      // delay ensures DOM is rendered before scroll
      setTimeout(() => scroll_to_with_offset(hash), 400);
    }
  };

  onMounted(() => {
    root_ref?.value?.addEventListener("click", on_click);
  });

  onBeforeUnmount(() => {
    root_ref?.value?.removeEventListener("click", on_click);
  });
}
