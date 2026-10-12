"use client";

import { Button, Spinner } from "@heroui/react";
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

  const download = async () => {
    if (downloading.current) return;
    downloading.current = true;
    setPending(true);
    try {
      await generateDownload();
    } catch (error) {
      console.error("CV download failed", error);
    } finally {
      downloading.current = false;
      setPending(false);
    }
  };

  return (
    <Button
      aria-label={isPending ? "Generating CV" : "Download CV"}
      className="gap-2 text-xs [&_svg]:size-4"
      isPending={isPending}
      size="sm"
      variant="tertiary"
      onPress={download}
    >
      <Ripple />
      {isPending ? <Spinner color="current" size="sm" /> : <DownloadCloud />}
      Download CV
    </Button>
  );
};
