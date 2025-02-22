// app/components/ChatInterface.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';
import LoadingSpinner from './LoadingSpinner';

export default function ChatInterface() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    {
      role: 'system',
      content:
        '생각하고 계신 아이디어가 있으신가요? 없으시다면 관심 분야 등을 자유롭게 말씀 주시면 도와드릴게요!',
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage = { role: 'user', content: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const analyzeResponse = await fetch('/api/analyzer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userIdea: userInput }),
      });

      if (!analyzeResponse.ok) throw new Error('Network response was not ok');
      const analyzeData = await analyzeResponse.json();
      setMessages(prev => [...prev, { role: 'assistant', content: analyzeData.verdict }]);

      const chatResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!chatResponse.ok) throw new Error('Network response was not ok');
      const chatData = await chatResponse.json();
      setMessages(prev => [...prev, { role: 'assistant', content: chatData.content }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '죄송합니다. 응답을 처리하는 중 오류가 발생했습니다. 다시 시도해 주세요.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id="chat-section" 
      className="w-full max-w-2xl backdrop-blur-lg bg-gray-900/50 p-6 rounded-2xl border border-gray-700/50 shadow-2xl"
    >
      <div className="overflow-y-auto max-h-[500px] mb-6 pr-2 custom-scrollbar">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-3 mb-4 ${
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                ${msg.role === 'user' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                {msg.role === 'user' ? <FaUser size={14} /> : <FaRobot size={14} />}
              </div>
              <div
                className={`max-w-[80%] p-4 rounded-2xl shadow-lg
                  ${msg.role === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white' 
                    : 'bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100'
                  }`}
              >
                <p className="text-sm md:text-base leading-relaxed">{msg.content}</p>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center py-4"
            >
              <LoadingSpinner />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <motion.form 
        onSubmit={handleSubmit}
        className="flex gap-3 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <input
          type="text"
          className="flex-1 px-4 py-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 
                     outline-none border border-gray-700 focus:border-blue-500 transition-all duration-300
                     shadow-inner backdrop-blur-sm"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="아이디어를 입력해보세요..."
          disabled={isLoading}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600
                     text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium shadow-lg
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          <span className="hidden md:inline">전송</span>
          <FaPaperPlane className="text-sm" />
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
