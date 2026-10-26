"use client";
import { useEffect } from "react";

export default function LegacyPage({ page }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = page.script;
    document.body.appendChild(script);
    return () => script.remove();
  }, [page.script]);
  return <>{page.css && <style dangerouslySetInnerHTML={{ __html: page.css }} />}<div dangerouslySetInnerHTML={{ __html: page.body }} /></>;
}
