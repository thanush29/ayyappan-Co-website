import { extractPdfText } from "./pdfLoader";

export async function createTFIDFEngine() {
  let corpus = "";
  let tfidfMap: Record<string, number> = {};

  // Load JSON
  const jsonRes = await fetch("/content.json");
  const jsonData = await jsonRes.json();
  const jsonText = Object.values(jsonData).flat().join("\n");

  // Load PDF
  const pdfRes = await fetch("/Ayyappanco_Company_Profile.pdf");
  const pdfBlob = await pdfRes.blob();
  const pdfText = await extractPdfText(pdfBlob);

  // Combine
  corpus = jsonText + "\n" + pdfText;

  // Build TF counts
  corpus.toLowerCase().split(/\s+/).forEach((w) => {
    tfidfMap[w] = (tfidfMap[w] || 0) + 1;
  });

  // Engine is ready
  const query = async (q: string) => {
    const terms = q.toLowerCase().split(/\s+/);

    const hits = terms
      .filter((t) => tfidfMap[t])
      .sort((a, b) => tfidfMap[b] - tfidfMap[a]);

    return hits.join(" ");
  };

  return { query };
}
