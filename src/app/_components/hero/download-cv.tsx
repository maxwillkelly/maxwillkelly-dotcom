"use client";

import { Button, Spinner, Tooltip } from "@heroui/react";
import { DownloadCloud } from "lucide-react";
import { Ripple } from "m3-ripple";
import { useRef, useState } from "react";

import { siteConfig } from "@/lib/site";

async function generateDownload() {
  const response = await fetch("/api/cv", {
    cache: "no-store",
    signal: AbortSignal.timeout(65_000),
  });
  if (
    !response.ok ||
    !response.headers.get("content-type")?.startsWith("application/pdf")
  ) {
    throw new Error("CV generation failed");
  }
  const pdf = await response.blob();
  if ((await pdf.slice(0, 5).text()) !== "%PDF-")
    throw new Error("Invalid PDF");
  const url = URL.createObjectURL(pdf);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${siteConfig.name} - CV.pdf`;
  document.body.append(link);
  link.click();
  link.remove();
  // Allow browsers time to start consuming the download before releasing it.
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

export const DownloadCv = () => {
  const downloading = useRef(false);
  const [isPending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  const download = async () => {
    if (downloading.current) return;
    downloading.current = true;
    setPending(true);
    setMessage("Generating CV…");
    try {
      await generateDownload();
      setMessage("CV download started.");
    } catch {
      setMessage("Could not generate the CV. Click to retry.");
    } finally {
      downloading.current = false;
      setPending(false);
    }
  };

  return (
    <div className="relative flex shrink-0 items-start">
      <Tooltip delay={0}>
        <Button
          aria-label={isPending ? "Generating CV" : "Download CV"}
          isIconOnly
          isPending={isPending}
          variant="tertiary"
          onPress={download}
        >
          <Ripple />
          {isPending ? (
            <Spinner color="current" size="sm" />
          ) : (
            <DownloadCloud />
          )}
        </Button>
        <Tooltip.Content placement="bottom">
          <p>Download CV</p>
        </Tooltip.Content>
      </Tooltip>
      <output className="absolute left-0 top-full w-48 pt-2 text-xs text-muted">
        {message}
      </output>
    </div>
  );
};
