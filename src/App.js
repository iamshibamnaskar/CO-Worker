import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const API_KEY = "GEMINI-API-KEY"; // Replace with actual key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]); // Store conversation history in state

  useEffect(() => {
    chrome.storage.local.get("selectedText", (data) => {
      if (data.selectedText) {
        setInput(data.selectedText);
        sendMessage(data.selectedText, false);
        chrome.storage.local.remove("selectedText");
        setInput("");
      }
    });
  }, []);

  const sendMessage = async (message, sen) => {
    if (!message.trim()) return;

    const userMessage = { role: "user", content: sen ? message : "User Query" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setLoading(true);

    const updatedHistory = [
      ...conversationHistory,
      { role: "user", parts: [{ text: message }] },
    ];
    setConversationHistory(updatedHistory); // Update conversation history in state

    let fullPrompt = updatedHistory
      .map((msg) => `${msg.role === "user" ? "user: " : "gemini: "}${msg.parts[0].text}`)
      .join("\n");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: fullPrompt }] }] }),
      });

      const data = await response.json();
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        const botMessage = { role: "model", content: data.candidates[0].content.parts[0].text };

        setConversationHistory((prevHistory) => [
          ...prevHistory,
          { role: "model", parts: [{ text: botMessage.content }] },
        ]); // Update history with bot response

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    }

    setLoading(false);
    setInput("");
  };

  return (
    <div className="container flex flex-col w-[500px] h-[600px] bg-white shadow-xl rounded-lg">
      <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
        {messages.length==0?(
          <div>CO-WORKER</div>
        ):(
          messages.map((msg, index) => (
            <div key={index} className={`flex w-full mt-2 space-x-3 max-w-xs ${msg.role === "user" ? "ml-auto justify-end" : ""}`}>
              {msg.role !== "user" && <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>}
              <div>
                <div
                  className={`p-3 rounded-lg ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
                  style={{ maxWidth: "400px", wordBreak: "break-word", overflow: "auto" }}
                >
                  <ReactMarkdown components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className="bg-black text-white px-1 rounded" {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
                <span className="text-xs text-gray-500 leading-none">Just now</span>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="bg-gray-300 p-4 flex">
        <input
          className="flex-grow items-center h-10 rounded px-3 text-sm"
          type="text"
          placeholder="Type your message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input, true)}
        />
        {loading?(
          <span class="loader"></span>
        ):(
          <button
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => sendMessage(input, true)}
          disabled={loading}
        >
          Send
        </button>
        )}
      </div>
    </div>
  );
}

export default App;
