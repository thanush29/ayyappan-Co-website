import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.js?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

export async function extractPdfText(file: Blob): Promise<string> {
  const buffer = await file.arrayBuffer();

  const loadingTask = pdfjsLib.getDocument({ data: buffer });
  const pdf = await loadingTask.promise;

  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    const text = content.items
      .map((c: any) => c.str || "")
      .join(" ");

    fullText += text + "\n";
  }

  return fullText;
}
