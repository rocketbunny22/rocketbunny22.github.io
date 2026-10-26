import { test } from "node:test";
import assert from "node:assert/strict";
import { parseFrontMatter, getPostBySlug } from "../lib/posts.mjs";

test("parses the documented Grounded Cyber Markdown format", () => {
  const result = parseFrontMatter('---\ntitle: "A useful post"\ndescription: "A concise description."\ndate: "2026-10-20"\ntags:\n  - Security\n  - Research\n---\n## Article\n', "useful-post.md");
  assert.deepEqual(result.data, { title: "A useful post", description: "A concise description.", date: "2026-10-20", tags: ["Security", "Research"] });
  assert.match(result.content, /## Article/);
});

test("rejects missing front matter and unsafe slugs", () => {
  assert.throws(() => parseFrontMatter("# Missing metadata", "invalid.md"), /must begin with valid front matter/);
  assert.equal(getPostBySlug("../pages"), undefined);
});
