import React, { useState, useMemo, useEffect } from 'react';
import { Language, Conversation, ChatUser, ChatMessage } from '../../types';
import { TRANSLATIONS, ICONS } from '../../constants';
import { INITIAL_CONVERSATIONS, ALL_USERS, AI_ASSISTANT_USER_ID, AI_ASSISTANT_USER } from '../../data/chatData';
import { getAiChatResponse } from '../../services/geminiService';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';
import CreateGroupModal from './CreateGroupModal';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currentUser: ChatUser;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, language, currentUser }) => {
  const t = TRANSLATIONS[language];
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv_ai');
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);

  useEffect(() => {
    // Update conversation names and initial messages on language change
    setConversations(prev => prev.map(conv => {
      if (conv.id === 'conv_ai') {
        return {
          ...conv,
          name: t.aiAssistant,
          messages: conv.messages[0]?.senderId === AI_ASSISTANT_USER_ID 
            ? [{ ...conv.messages[0], text: t.aiWelcomeMessage }]
            : conv.messages,
        }
      }
      return conv;
    }));
  }, [language, t.aiAssistant, t.aiWelcomeMessage]);

  const activeConversation = useMemo(() => {
    return conversations.find(c => c.id === activeConversationId) || null;
  }, [activeConversationId, conversations]);

  const handleSendMessage = async (text: string) => {
    if (!activeConversationId) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: new Date().toLocaleTimeString(language === 'hi' ? 'hi-IN' : 'en-US', { hour: 'numeric', minute: '2-digit' }),
    };

    const conversationBeforeUpdate = conversations.find(c => c.id === activeConversationId)!;
    const historyForApi = [...conversationBeforeUpdate.messages, userMessage];

    // Add user message to state immediately for responsiveness
    setConversations(prev =>
      prev.map(conv =>
        conv.id === activeConversationId
          ? { ...conv, messages: [...conv.messages, userMessage] }
          : conv
      )
    );

    const isAiChat = conversationBeforeUpdate.members.some(m => m.id === AI_ASSISTANT_USER_ID);

    if (isAiChat) {
      setIsAiTyping(true);
      try {
        const aiResponseText = await getAiChatResponse(historyForApi, currentUser);
        const aiMessage: ChatMessage = {
          id: `msg_${Date.now() + 1}`,
          senderId: AI_ASSISTANT_USER_ID,
          text: aiResponseText,
          timestamp: new Date().toLocaleTimeString(language === 'hi' ? 'hi-IN' : 'en-US', { hour: 'numeric', minute: '2-digit' }),
        };
        setConversations(prev =>
          prev.map(conv =>
            conv.id === activeConversationId
              ? { ...conv, messages: [...conv.messages, aiMessage] }
              : conv
          )
        );
      } catch (error) {
        const errorMessage: ChatMessage = {
          id: `msg_error_${Date.now()}`,
          senderId: AI_ASSISTANT_USER_ID,
          text: t.aiError,
          timestamp: new Date().toLocaleTimeString(language === 'hi' ? 'hi-IN' : 'en-US', { hour: 'numeric', minute: '2-digit' }),
        };
        setConversations(prev =>
          prev.map(conv =>
            conv.id === activeConversationId
              ? { ...conv, messages: [...conv.messages, errorMessage] }
              : conv
          )
        );
      } finally {
        setIsAiTyping(false);
      }
    }
  };


  const handleCreateGroup = (groupName: string, selectedMembers: ChatUser[]) => {
    const newGroup: Conversation = {
      id: `conv_${Date.now()}`,
      name: groupName,
      members: [...selectedMembers, currentUser],
      messages: [],
      isGroup: true,
      avatar: '👥',
    };
    setConversations(prev => [newGroup, ...prev]);
    setShowCreateGroupModal(false);
    setActiveConversationId(newGroup.id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true">
      <div className="bg-background-light dark:bg-background-dark w-full h-full sm:rounded-2xl shadow-2xl flex flex-col max-w-6xl max-h-[95vh] overflow-hidden">
        <header className="flex items-center justify-between p-4 border-b border-border-light dark:border-border-dark flex-shrink-0">
          <h2 className="text-xl font-bold text-primary">{t.chat}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700" aria-label="Close chat">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICONS.CLOSE} />
            </svg>
          </button>
        </header>

        <div className="flex-grow flex overflow-hidden">
          {/* Left Panel */}
          <ConversationList
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={setActiveConversationId}
            onNewGroup={() => setShowCreateGroupModal(true)}
            language={language}
          />

          {/* Right Panel */}
          <ChatWindow
            conversation={activeConversation}
            onSendMessage={handleSendMessage}
            currentUser={currentUser}
            language={language}
            isAiTyping={activeConversation?.id === 'conv_ai' && isAiTyping}
            aiUser={AI_ASSISTANT_USER}
          />
        </div>
      </div>
      {showCreateGroupModal && (
        <CreateGroupModal
          allUsers={ALL_USERS.filter(u => u.id !== currentUser.id)}
          onClose={() => setShowCreateGroupModal(false)}
          onCreateGroup={handleCreateGroup}
          language={language}
        />
      )}
    </div>
  );
};

export default ChatModal;