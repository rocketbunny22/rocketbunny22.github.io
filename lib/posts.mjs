import fs from "node:fs";
import path from "node:path";

const postsDirectory = path.join(process.cwd(), "content", "blog");

export function parseFrontMatter(source, filename) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`Blog post ${filename} must begin with valid front matter.`);
  const data = { title: "", description: "", date: "", tags: [] };
  let activeList = null;
  const unquote = (value) => ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) ? value.slice(1, -1) : value;
  for (const rawLine of match[1].split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    if (activeList === "tags" && line.startsWith("- ")) {
      data.tags.push(unquote(line.slice(2).trim()));
      continue;
    }
    const separator = line.indexOf(":");
    if (separator < 1) throw new Error(`Blog post ${filename} has invalid front matter: ${line}`);
    const key = line.slice(0, separator).trim();
    const value = unquote(line.slice(separator + 1).trim());
    activeList = key === "tags" ? "tags" : null;
    if (key === "title" || key === "description" || key === "date") data[key] = value;
  }
  return { data, content: match[2] };
}

function parsePost(filename) {
  const slug = filename.replace(/\.md$/, "");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid blog filename: ${filename}. Use lowercase words separated by hyphens.`);
  const { data, content } = parseFrontMatter(fs.readFileSync(path.join(postsDirectory, filename), "utf8"), filename);
  if (!data.title || !data.description || !data.date) throw new Error(`Blog post ${filename} is missing title, description, or date front matter.`);
  const date = new Date(`${data.date}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== data.date) throw new Error(`Blog post ${filename} must have a valid date in YYYY-MM-DD format.`);
  return { slug, ...data, content };
}

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter((filename) => filename.endsWith(".md")).map(parsePost).sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return undefined;
  const filename = `${slug}.md`;
  return fs.existsSync(path.join(postsDirectory, filename)) ? parsePost(filename) : undefined;
}

export function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}
