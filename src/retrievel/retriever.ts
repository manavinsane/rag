import { getVectorStore } from "../vectorStore/faissStore";

export async function retrieveSimilarChunks(
  query: string,
  k: number = 4
): Promise<string[]> {
  const vectorStore = getVectorStore();
  const results = await vectorStore.similaritySearch(query, k);
  return results.map((doc) => doc.pageContent);
}
