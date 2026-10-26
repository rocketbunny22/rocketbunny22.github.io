import Link from "next/link";

export default function BlogLayout({ children }) {
  return <>
    <header className="site-header"><nav className="site-nav" aria-label="Primary navigation">
      <Link className="site-nav__brand" href="/"><span className="site-nav__mark" aria-hidden="true">DN</span><span>Derek Nolt</span></Link>
      <Link className="site-nav__link" href="/">← Portfolio</Link>
    </nav></header>
    {children}
    <footer className="site-footer"><div className="site-footer__inner"><p className="site-footer__text">© {new Date().getFullYear()} Derek Nolt</p><Link className="site-footer__link" href="/blog">Blog</Link></div></footer>
  </>;
}
