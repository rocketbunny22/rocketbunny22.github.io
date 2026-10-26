import pages from "../content/pages.json";
import { getAllPosts } from "../lib/posts.mjs";

export const dynamic = "force-static";
export default function sitemap() {
  const base = "https://derek.groundedcyber.com";
  const posts = getAllPosts();
  return [
    { url: `${base}/` },
    ...Object.keys(pages).filter((slug) => slug !== "home").map((slug) => ({ url: `${base}/${slug}` })),
    ...(posts.length ? [{ url: `${base}/blog` }, ...posts.map((post) => ({ url: `${base}/blog/${post.slug}` }))] : []),
  ];
}
