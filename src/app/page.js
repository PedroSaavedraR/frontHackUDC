"use client";

import { useState } from 'react';
import { Send } from 'lucide-react';


export default function AIChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');


      setTimeout(() => {
        setMessages((prev) => [...prev, { text: '¿En qué puedo ayudar?', sender: 'ai' }]);
      }, 1000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen p-4 bg-gray-900 text-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-center">Chatbot Salarios 2019 España</h1>
      <div className="flex-1 overflow-y-auto p-4 bg-gray-800 rounded-xl shadow-inner">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-2xl max-w-[75%] ${msg.sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-700 text-gray-200 mr-auto'}`}
            style={{ wordBreak: 'break-word' }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <textarea
          className="flex-1 p-3 border border-gray-600 bg-gray-700 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Prompt..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          style={{ overflow: 'hidden' }}
        />
        <button
          className="p-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
          onClick={handleSendMessage}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}