import { loadPDF, splitTextintoChunks } from "./utils/pdfLoader.util";
import {
  initializeVectorStore,
  saveVectorStore,
  loadVectorStore,
} from "./vectorStore/faissStore";
import { retrieveSimilarChunks } from "./retrievel/retriever";
import { Document } from "langchain/document";
import "dotenv/config";
import { generateAnswer } from "./qa/qaModel";

async function main() {
  // Step 1: Load and split PDF
  const filePath = "./data/test.pdf"; // Path to your PDF file
  const text = await loadPDF(filePath);
  const chunks = splitTextintoChunks(text);

  // Step 2: Convert chunks into documents
  const docs = chunks.map(
    (chunk, index) =>
      new Document({ pageContent: chunk, metadata: { id: index } })
  );

  // Step 3: Initialize and save the vector store
  await initializeVectorStore(docs);
  await saveVectorStore("./data/vectorStore");

  // Step 4: Load the vector store (for demonstration)
  await loadVectorStore("./data/vectorStore");

  // Step 5: Retrieve similar chunks for a query
  const query = " jsp lifecycle";
  const similarChunks = await retrieveSimilarChunks(query);

  const context = similarChunks.join("\n");

  // console.log("Similar Chunks:");
  // similarChunks.forEach((chunk, index) => {
  //   console.log(`\nChunk ${index + 1}:\n${chunk}`);
  // });

  const answer = await generateAnswer(query, context);
  console.log("\nFinal Answer:\n", answer);
}

main().catch(console.error);
