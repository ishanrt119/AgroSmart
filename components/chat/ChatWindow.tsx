import React, { useState, useRef, useEffect } from 'react';
import { Conversation, ChatUser, Language } from '../../types';
import { TRANSLATIONS } from '../../constants';

interface ChatWindowProps {
  conversation: Conversation | null;
  onSendMessage: (text: string) => void;
  currentUser: ChatUser;
  language: Language;
  isAiTyping: boolean;
  aiUser: ChatUser;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, onSendMessage, currentUser, language, isAiTyping, aiUser }) => {
  const t = TRANSLATIONS[language];
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages, isAiTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      onSendMessage(messageText.trim());
      setMessageText('');
    }
  };
  
  const getSender = (senderId: string) => {
      return conversation?.members.find(m => m.id === senderId);
  }

  if (!conversation) {
    return (
      <div className="hidden sm:flex flex-1 items-center justify-center text-gray-500 dark:text-gray-400">
        <p>{t.noConversation}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark">
      <header className="p-4 border-b border-border-light dark:border-border-dark flex-shrink-0 flex items-center space-x-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${conversation.isGroup ? 'bg-green-500' : conversation.avatar === '✨' ? 'bg-purple-500' : 'bg-secondary'}`}>
          {conversation.avatar}
        </div>
        <div>
            <h3 className="font-semibold">{conversation.name}</h3>
            {conversation.isGroup && <p className="text-xs text-gray-500">{conversation.members.map(m => m.name).join(', ')}</p>}
        </div>
      </header>
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {conversation.messages.map(msg => {
          const isCurrentUser = msg.senderId === currentUser.id;
          const sender = getSender(msg.senderId);
          return (
            <div key={msg.id} className={`flex items-end gap-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
              {!isCurrentUser && (
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${sender?.avatar === '✨' ? 'bg-purple-500' : 'bg-gray-400'}`}>
                    {sender?.avatar}
                 </div>
              )}
              <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${isCurrentUser ? 'bg-primary text-white rounded-br-lg' : 'bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-bl-lg'}`}>
                {!isCurrentUser && conversation.isGroup && <p className="text-xs font-bold text-secondary mb-1">{sender?.name}</p>}
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${isCurrentUser ? 'text-gray-200' : 'text-gray-500 dark:text-gray-400'} text-right`}>{msg.timestamp}</p>
              </div>
            </div>
          );
        })}

        {isAiTyping && (
          <div className="flex items-end gap-2 justify-start">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold bg-purple-500 text-sm flex-shrink-0">
                  {aiUser?.avatar}
              </div>
              <div className="max-w-xs md:max-w-md p-3 rounded-2xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-bl-lg">
                  <div className="flex items-center space-x-1">
                      <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
                  </div>
              </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-border-light dark:border-border-dark flex-shrink-0">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder={t.typeMessage}
            className="flex-grow px-4 py-2 text-sm border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-primary focus:border-primary rounded-full bg-slate-100 dark:bg-slate-800"
            disabled={isAiTyping}
          />
          <button type="submit" className="bg-primary text-white rounded-full p-3 flex items-center justify-center disabled:bg-gray-400" disabled={isAiTyping}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;