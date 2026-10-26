import Link from "next/link";
import { formatDate, getAllPosts } from "../../lib/posts.mjs";

export function generateMetadata() {
  const posts = getAllPosts();
  return { title: "Blog | Derek Nolt", description: "Security research, practical projects, and technical notes by Derek Nolt.", alternates: { canonical: "https://derek.groundedcyber.com/blog" }, ...(posts.length ? {} : { robots: { index: false, follow: true } }) };
}

export default function BlogPage() {
  const posts = getAllPosts();
  return <main className="section"><div className="section__inner blog-container">
    <p className="section__eyebrow">Field notes</p><h1 className="section__title">Blog</h1>
    <p className="blog-intro">Security research, practical projects, and notes from the lab.</p>
    {posts.length ? <div className="blog-grid">{posts.map((post) => <article className="project-card blog-card" key={post.slug}>
      <p className="project-card__label"><time dateTime={post.date}>{formatDate(post.date)}</time>{post.tags.length > 0 && ` · ${post.tags.join(" · ")}`}</p>
      <h2 className="project-card__title"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
      <p className="project-card__text">{post.description}</p><Link className="project-card__link" href={`/blog/${post.slug}`}>Read article →</Link>
    </article>)}</div> : <p className="blog-empty">Articles are coming soon.</p>}
  </div></main>;
}
