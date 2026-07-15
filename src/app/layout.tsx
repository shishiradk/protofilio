import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shishir Adhikari | AI Engineer",
  description:
    "AI Engineer building production RAG pipelines, computer-vision APIs, and LLM-powered backend services with FastAPI, PyTorch, LangChain, and vector databases.",
  keywords:
    "AI Engineer, Machine Learning, RAG, LLM, Computer Vision, NLP, LangChain, LangGraph, FastAPI, PyTorch, Python, Vector Database, FAISS, ChromaDB",
  openGraph: {
    title: "Shishir Adhikari | AI Engineer",
    description:
      "Building production RAG pipelines, computer-vision APIs, and LLM-powered backend services.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
