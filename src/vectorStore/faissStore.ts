import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { embeddings } from "../utils/embeddings.util";
import { Document } from "langchain/document";

let vectorStore: FaissStore;

export async function initializeVectorStore(
  docs: Document[]
): Promise<FaissStore> {
  vectorStore = await FaissStore.fromDocuments(docs, embeddings);
  return vectorStore;
}

export async function saveVectorStore(path: string): Promise<void> {
  await vectorStore.save(path);
}

export async function loadVectorStore(path: string): Promise<FaissStore> {
  vectorStore = await FaissStore.load(path, embeddings);
  return vectorStore;
}

export function getVectorStore(): FaissStore {
  return vectorStore;
}
