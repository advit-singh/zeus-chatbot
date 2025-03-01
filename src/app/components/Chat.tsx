'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);
    setShowTypingIndicator(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, newMessage],
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      let assistantMessage = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        assistantMessage += text;

        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            role: 'assistant',
            content: assistantMessage,
          };
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      setShowTypingIndicator(false);
    }
  };

  return (
    <div className="flex flex-col h-[90vh] max-w-4xl mx-auto p-6 space-y-6 bg-zeus-marble/50 rounded-xl shadow-lg backdrop-blur-sm">
      <header className="text-center py-4 border-b border-zeus-gold/20">
        <h1 className="text-3xl font-bold text-zeus-blue dark:text-zeus-gold mb-2">Zeus Chat</h1>
        <p className="text-sm text-zeus-blue/70 dark:text-zeus-gold/70">Commune with the King of Olympus</p>
      </header>

      <div className="flex-1 overflow-y-auto space-y-6 pb-6 px-2">
        {showWelcome && (
          <div className="p-6 rounded-lg bg-zeus-cloud/50 border border-zeus-gold/20 text-center animate-[float-cloud_4s_ease-in-out_infinite]">
            <p className="text-lg font-semibold text-zeus-blue dark:text-zeus-gold">Greetings, mortal!</p>
            <p className="text-sm mt-2 text-zeus-blue/70 dark:text-zeus-gold/70">I am Zeus, ruler of Mount Olympus. What wisdom do you seek?</p>
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-6 ${message.role === 'user'
              ? 'ml-auto max-w-[80%] bg-zeus-light-blue/10 rounded-tr-none rounded-2xl text-right'
              : 'mr-auto max-w-[80%] bg-zeus-gold/10 rounded-tl-none rounded-2xl border border-zeus-gold/20'}`}
          >
            <p className={`whitespace-pre-wrap ${message.role === 'assistant' ? 'text-zeus-blue dark:text-zeus-gold' : 'text-foreground'}`}>
              {message.content}
            </p>
          </div>
        ))}
        {showTypingIndicator && (
          <div className="mr-auto max-w-[80%] p-6 bg-zeus-gold/10 rounded-tl-none rounded-2xl border border-zeus-gold/20">
            <div className="flex space-x-2">
              <span className="w-3 h-3 bg-zeus-gold/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-3 h-3 bg-zeus-gold/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-3 h-3 bg-zeus-gold/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3 p-4 bg-zeus-cloud/30 rounded-xl border border-zeus-gold/20">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Zeus for guidance..."
          className="flex-1 p-4 bg-zeus-marble border border-zeus-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-zeus-gold/50 placeholder-zeus-blue/50 dark:placeholder-zeus-gold/50"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`px-6 py-4 bg-zeus-blue dark:bg-zeus-gold text-white rounded-lg hover:animate-[lightning-flash_1s_ease-in-out] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center min-w-[120px]`}
        >
          {isLoading ? 'Summoning...' : 'Invoke'}
        </button>
      </form>
    </div>
  );
}
