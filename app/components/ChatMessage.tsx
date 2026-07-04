"use client";

import { useState } from "react";
import { Message } from "../types";
import clsx from "clsx";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export default function ChatMessage({ message, isStreaming = false }: ChatMessageProps) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const processedContent = message.content.replace(/—/g, "-");

  if (isStreaming && !message.content) {
    return (
      <div className="flex items-center gap-3 mt-6">
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100">
          <Image
            src="/assets/rubber-duck.png"
            alt="Swahiba"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
        <div className="flex gap-1 items-center">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    );
  }

  return (
    <div className={clsx("flex items-start gap-3 mt-6", isUser ? "flex-row-reverse" : "flex-row")}>
      {/* Avatar */}
      {isUser ? (
        <div className="w-8 h-8 flex-shrink-0" />
      ) : (
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100">
          <Image
            src="/assets/rubber-duck.png"
            alt="Swahiba"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
      )}

      {/* Plain text only — NO BUBBLES */}
      <div className={clsx("max-w-[90%] leading-relaxed relative group", isUser ? "text-right" : "", !isUser ? "pr-8" : "")}>
        <div className="text-[15px] text-gray-900 break-words">
          {isUser ? (
            <div className="whitespace-pre-wrap">{processedContent}</div>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0 text-gray-900">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                em: ({ children }) => <em className="text-gray-900">{children}</em>,
                ul: ({ children }) => <ul className="list-disc pl-5 my-2 text-gray-900">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-5 my-2 text-gray-900">{children}</ol>,
                li: ({ children }) => <li className="mb-1 text-gray-900">{children}</li>,
                h1: ({ children }) => <h1 className="text-xl font-bold my-3 text-gray-900">{children}</h1>,
                h2: ({ children }) => <h2 className="text-lg font-bold my-2 text-gray-900">{children}</h2>,
                h3: ({ children }) => <h3 className="text-base font-bold my-2 text-gray-900">{children}</h3>,
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      className="my-3 rounded-lg overflow-x-auto"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-gray-100 text-gray-900 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                      {children}
                    </code>
                  );
                },
                table({ children }) {
                  return (
                    <div className="overflow-x-auto my-3 rounded border border-gray-200">
                      <table className="min-w-full text-sm">{children}</table>
                    </div>
                  );
                },
                th({ children }) {
                  return <th className="bg-gray-100 text-gray-900 px-3 py-2 border border-gray-200 font-semibold text-left">{children}</th>;
                },
                td({ children }) {
                  return <td className="px-3 py-2 border border-gray-200 text-gray-900">{children}</td>;
                }
              }}
            >
              {processedContent}
            </ReactMarkdown>
          )}

          {!isUser && isStreaming && (
            <span className="ml-1 inline-block w-[2px] h-[16px] bg-gray-900 animate-pulse align-middle" />
          )}
        </div>

        {/* Copy button */}
        {!isUser && !isStreaming && message.content && (
          <button
            onClick={handleCopy}
            className="absolute top-0 right-0 p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
            title="Copy message"
          >
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}