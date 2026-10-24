"use client";

import { Button, Spinner } from "@heroui/react";
import { DownloadCloud } from "lucide-react";
import { Ripple } from "m3-ripple";
import { useState } from "react";

import { env } from "@/lib/env";

const generateDownload = async () => {
  const response = await fetch("/api/pdf", {
    cache: "no-store",
    signal: AbortSignal.timeout(65_000),
  });

  if (
    !response.ok ||
    !response.headers.get("content-type")?.startsWith("application/pdf")
  ) {
    throw new Error("PDF generation failed");
  }

  const pdf = await response.blob();

  // Check the PDF header to reject non-PDF bodies
  if ((await pdf.slice(0, 5).text()) !== "%PDF-") {
    throw new Error("PDF response is missing the PDF header");
  }

  const url = URL.createObjectURL(pdf);
  const link = document.createElement("a");

  link.href = url;
  link.download = env.NEXT_PUBLIC_PDF_FILENAME;

  document.body.append(link);

  link.click();
  link.remove();

  // Allow browsers time to start consuming the download before releasing it.
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
};

export const DownloadPdfButton = () => {
  const [isPending, setPending] = useState(false);

  const downloadPdf = async () => {
    setPending(true);

    try {
      await generateDownload();
    } catch (error) {
      console.error("PDF download failed", error);
    } finally {
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
      onPress={downloadPdf}
    >
      <Ripple />
      {isPending ? <Spinner color="current" size="sm" /> : <DownloadCloud />}
      Download CV
    </Button>
  );
};
