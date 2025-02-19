import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import "dotenv/config";

export const embeddings = new HuggingFaceTransformersEmbeddings({
  model: "sentence-transformers/all-MiniLM-L6-v2", // Lightweight embedding model
});
