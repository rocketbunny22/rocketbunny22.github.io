import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDate, getAllPosts, getPostBySlug } from "../../../lib/posts.mjs";

export const dynamicParams = false;
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.length ? posts.map((post) => ({ slug: post.slug })) : [{ slug: "__empty" }];
}
export async function generateMetadata({ params }) {
  const post = getPostBySlug((await params).slug);
  if (!post) return {};
  const url = `https://derek.groundedcyber.com/blog/${post.slug}`;
  return { title: `${post.title} | Derek Nolt`, description: post.description, alternates: { canonical: url }, openGraph: { type: "article", url, title: post.title, description: post.description, publishedTime: post.date, tags: post.tags } };
}
export default async function PostPage({ params }) {
  const post = getPostBySlug((await params).slug);
  if (!post) notFound();
  const schema = { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.description, datePublished: post.date, author: { "@type": "Person", name: "Derek Nolt" }, mainEntityOfPage: `https://derek.groundedcyber.com/blog/${post.slug}` };
  return <main className="section"><article className="section__inner project-post">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <Link className="project-card__link" href="/blog">← All posts</Link>
    <header className="project-post__header"><p className="section__eyebrow"><time dateTime={post.date}>{formatDate(post.date)}</time></p><h1 className="section__title">{post.title}</h1><p className="project-post__summary">{post.description}</p><p className="project-post__byline">By Derek Nolt{post.tags.length > 0 && ` · ${post.tags.join(" · ")}`}</p></header>
    <div className="blog-prose"><ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown></div>
  </article></main>;
}
