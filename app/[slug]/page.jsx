import pages from "../../content/pages.json";
import LegacyPage from "../legacy-page";
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(pages).filter((slug) => slug !== "home").map((slug) => ({ slug })); }
export async function generateMetadata({ params }) { const { slug } = await params; const page = pages[slug]; return { title: page.title, description: page.description, alternates: { canonical: `https://derek.groundedcyber.com/${slug}` } }; }
export default async function Page({ params }) { const { slug } = await params; return <LegacyPage page={pages[slug]} />; }
