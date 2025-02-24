// app/components/ChatInterface.tsx
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';

interface Analysis {
  idea: {
    content: string;
    provided: "true" | "false" | "partial";
    feedback: string | null;
  };
  target_customer: {
    content: string;
    provided: "true" | "false" | "partial";
    feedback: string | null;
  };
  value_proposition: {
    content: string;
    provided: "true" | "false" | "partial";
    feedback: string | null;
  };
  etc: {
    content: string | null;
    provided: "true" | "false" | "partial";
  };
}

interface Message {
  role: string;
  content: string;
  analysis?: Analysis;
}

interface ChatResponse {
  message: string;
  analysis: Analysis;
}

interface StatusType {
  idea: {
    content: string;
    provided: "true" | "false" | "partial";
  };
  target_customer: {
    content: string;
    provided: "true" | "false" | "partial";
  };
  value_proposition: {
    content: string;
    provided: "true" | "false" | "partial";
  };
  etc: {
    content: string;
    provided: "true" | "false" | "partial";
  };
}

interface ChatInterfaceProps {
  onStatusUpdate: (status: StatusType) => void;
  onInvalidAnalysis?: () => void;
}

export default function ChatInterface({ onStatusUpdate }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `생각하고 계신 아이디어가 있으신가요? 없으시다면 관심 분야 등을 자유롭게 말씀 주시면 도와드릴게요! 정확한 평가를 위해서 아이디어, 타겟 고객, 가치 제안을 고루 입력해주세요!`,
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingDots, setTypingDots] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const chatContainerRef = useRef<null | HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<StatusType>({
    idea: { content: '', provided: "false" },
    target_customer: { content: '', provided: "false" },
    value_proposition: { content: '', provided: "false" },
    etc: { content: '', provided: "false" }
  });
  console.log(typingDots);
  console.log(currentStatus);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setTypingDots((prev: string) => prev.length >= 3 ? '' : prev + '.');
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const scrollToBottom = useCallback(() => {
    if (shouldScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setShouldScroll(false);
    }
  }, [shouldScroll]);

  useEffect(() => {
    if (messages.length > 0) {
      setShouldScroll(true);
    }
  }, [messages]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [shouldScroll, scrollToBottom]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage = { role: 'user', content: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const chatResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!chatResponse.ok) throw new Error('Network response was not ok');
      
      const rawData = await chatResponse.json();
      const chatData: ChatResponse = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: chatData.message,
        analysis: chatData.analysis
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (chatData.analysis) {
        const newStatus: StatusType = {
          idea: {
            content: chatData.analysis.idea.provided === "true" ? chatData.analysis.idea.content : '',
            provided: chatData.analysis.idea.provided
          },
          target_customer: {
            content: chatData.analysis.target_customer.provided === "true" ? chatData.analysis.target_customer.content : '',
            provided: chatData.analysis.target_customer.provided
          },
          value_proposition: {
            content: chatData.analysis.value_proposition.provided === "true" ? chatData.analysis.value_proposition.content : '',
            provided: chatData.analysis.value_proposition.provided
          },
          etc: {
            content: chatData.analysis.etc?.content || '',
            provided: chatData.analysis.etc?.content ? "true" : "false"
          }
        };
        setCurrentStatus(newStatus);

        // Only update status if at least one element is provided
        if (newStatus.idea.provided || newStatus.target_customer.provided || newStatus.value_proposition.provided || newStatus.etc.provided) {
          onStatusUpdate(newStatus);
        }
      }
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

  const MessageBubble = ({ message }: { message: Message }) => {
    const isUser = message.role === 'user';
    
    const getStatusIcon = (provided: "true" | "false" | "partial") => {
      switch(provided) {
        case "true":
          return "✓";
        case "partial":
          return "!";
        case "false":
          return "✕";
        default:
          return "";
      }
    };

    const getStatusColor = (provided: "true" | "false" | "partial") => {
      switch(provided) {
        case "true":
          return "bg-green-500";
        case "partial":
          return "bg-yellow-500";
        case "false":
          return "bg-red-500";
        default:
          return "bg-gray-600";
      }
    };

    const getFieldLabel = (key: string) => {
      switch(key) {
        case 'idea':
          return '아이디어 설명';
        case 'target_customer':
          return '타겟 고객';
        case 'value_proposition':
          return '가치 제안';
        case 'etc':
          return '기타';
        default:
          return '';
      }
    };

    return (
      <div className={`flex items-start gap-2 sm:gap-3 mb-4 sm:mb-6 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center
          ${isUser ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-purple-500 to-purple-600'}
          shadow-lg`}>
          {isUser ? <FaUser className="w-3 h-3 sm:w-4 sm:h-4" /> : <FaRobot className="w-3 h-3 sm:w-4 sm:h-4" />}
        </div>
        
        <div className="flex flex-col max-w-[85%] sm:max-w-[80%]">
          <div className={`p-3 sm:p-4 rounded-2xl shadow-lg ${
            isUser 
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white ml-auto' 
              : 'bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100'
          }`}>
            <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
          </div>

          {!isUser && message.analysis && (
            <div className="mt-2 sm:mt-3 p-3 sm:p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50">
              {Object.entries(message.analysis).map(([key, value]) => {
                if (key === 'etc' && value.content) {
                  return (
                    <div key={key} className="mt-3 pt-3 border-t border-gray-700">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-xs
                          ${getStatusColor(value.provided)} transition-colors duration-300`}>
                          {getStatusIcon(value.provided)}
                        </div>
                        <div className="flex-1">
                          <span className="text-xs sm:text-sm text-gray-200">{getFieldLabel(key)}</span>
                          <p className="text-[11px] sm:text-xs text-gray-300 mt-1">&ldquo;{value.content}&rdquo;</p>
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={key} className="flex items-center gap-2 sm:gap-3 mb-2 last:mb-0">
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-xs
                      ${getStatusColor(value.provided)} transition-colors duration-300`}>
                      {getStatusIcon(value.provided)}
                    </div>
                    <div className="flex-1">
                      <span className="text-xs sm:text-sm text-gray-200">{getFieldLabel(key)}</span>
                      {value.content && (
                        <p className="text-[11px] sm:text-xs text-gray-300 mt-1">&ldquo;{value.content}&rdquo;</p>
                      )}
                      {value.feedback && (
                        <p className="text-[11px] sm:text-xs text-gray-400 mt-1">{value.feedback}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl backdrop-blur-lg bg-gray-900/50 p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-700/50 shadow-2xl mx-auto">
      <div 
        ref={chatContainerRef}
        className="overflow-y-auto h-[calc(100vh-240px)] sm:h-[calc(100vh-280px)] sm:max-h-[600px] mb-4 sm:mb-6 custom-scrollbar"
      >
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
        {isLoading && (
          <div className="flex items-start gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600">
              <FaRobot className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <div className="flex items-center gap-1.5 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-gray-800 to-gray-700">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form 
        onSubmit={handleSubmit}
        className="flex gap-2 sm:gap-3 relative"
      >
        <input
          type="text"
          className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-800/50 
                    text-sm sm:text-base text-white placeholder-gray-400 outline-none 
                    border border-gray-700 focus:border-blue-500 transition-all duration-300 
                    shadow-inner backdrop-blur-sm"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="아이디어를 입력해보세요..."
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600
                    text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl flex items-center gap-2 
                    font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed 
                    transition-all duration-300"
        >
          <span className="hidden sm:inline">전송</span>
          <FaPaperPlane className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </form>
    </div>
  );
}
