"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function AIChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carga

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const newMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {

      var credentials = btoa("admin:admin");
      const res = await fetch("http://localhost:8008/answerQuestion", {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "Authorization": `Basic ${credentials}`
        },
        body: JSON.stringify({
          question: input,
          plot: false,
          plot_details: "",
          embeddings_provider: "googleaistudio",
          embeddings_model: "models/text-embedding-004",
          vector_store_provider: "Chroma",
          sql_gen_provider: "googleaistudio",
          sql_gen_model: "gemini-1.5-flash",
          chat_provider: "googleaistudio",
          chat_model: "gemini-1.5-flash",
          vdp_database_names: "samples_bank,admin,proyecto",
          use_views: "",
          expand_set_views: true,
          custom_instructions: "speak in spanish please about the questions about real state",
          markdown_response: true,
          vector_search_k: 5,
          mode: "default",
          disclaimer: true,
          verbose: true
        })
        
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { text: data.answer, sender: "ai" }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Error en la respuesta", sender: "ai" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen p-4 bg-gray-900 text-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-center">Precios Inmuebles EEUU</h1>
      <div className="flex-1 overflow-y-auto p-4 bg-gray-800 rounded-xl shadow-inner">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-2xl max-w-[75%] ${
              msg.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-700 text-gray-200 mr-auto"
            }`}
            style={{ wordBreak: "break-word" }}
          >
            {msg.text}
          </div>
        ))}
        {loading && <p className="text-gray-400">Pensando...</p>}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <textarea
          className="flex-1 p-3 border border-gray-600 bg-gray-700 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Escribe un mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          style={{ overflow: "hidden" }}
          disabled={loading}
        />
        <button
          className="p-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
          onClick={handleSendMessage}
          disabled={loading}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
