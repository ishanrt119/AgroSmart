import React, { useState } from 'react';
import { Conversation, Language } from '../../types';
import { TRANSLATIONS } from '../../constants';

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewGroup: () => void;
  language: Language;
}

const ConversationList: React.FC<ConversationListProps> = ({ conversations, activeConversationId, onSelectConversation, onNewGroup, language }) => {
  const t = TRANSLATIONS[language];
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full sm:w-1/3 border-r border-border-light dark:border-border-dark flex flex-col bg-slate-50 dark:bg-slate-900/50">
      <div className="p-4 border-b border-border-light dark:border-border-dark flex-shrink-0 space-y-4">
        <input
          type="text"
          placeholder={t.searchUsers}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 text-sm border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-primary focus:border-primary rounded-md bg-white dark:bg-slate-800"
        />
        <button onClick={onNewGroup} className="w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark">
          {t.newGroup}
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        {filteredConversations.map(conv => (
          <div
            key={conv.id}
            onClick={() => onSelectConversation(conv.id)}
            className={`flex items-center p-3 cursor-pointer border-l-4 ${activeConversationId === conv.id ? 'bg-primary/10 border-primary' : 'border-transparent hover:bg-gray-100 dark:hover:bg-slate-800'}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3 ${conv.isGroup ? 'bg-green-500' : 'bg-secondary'}`}>
              {conv.avatar}
            </div>
            <div className="flex-grow overflow-hidden">
              <p className="font-semibold truncate">{conv.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{conv.messages[conv.messages.length - 1]?.text || 'No messages yet'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
