import pages from "../content/pages.json";
import LegacyPage from "./legacy-page";
export const metadata = { title: pages.home.title, description: pages.home.description, alternates: { canonical: "https://derek.groundedcyber.com/" } };
export default function Home() { return <LegacyPage page={pages.home} />; }
