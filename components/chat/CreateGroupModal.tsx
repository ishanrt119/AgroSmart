import React, { useState } from 'react';
import { ChatUser, Language } from '../../types';
import { TRANSLATIONS } from '../../constants';

interface CreateGroupModalProps {
  allUsers: ChatUser[];
  onClose: () => void;
  onCreateGroup: (groupName: string, selectedMembers: ChatUser[]) => void;
  language: Language;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ allUsers, onClose, onCreateGroup, language }) => {
  const t = TRANSLATIONS[language];
  const [groupName, setGroupName] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(new Set());

  const handleUserToggle = (userId: string) => {
    setSelectedUserIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupName.trim() && selectedUserIds.size > 0) {
      const selectedMembers = allUsers.filter(user => selectedUserIds.has(user.id));
      onCreateGroup(groupName.trim(), selectedMembers);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-xl w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h3 className="text-lg font-semibold">{t.createGroup}</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="groupName" className="block text-sm font-medium">{t.groupName}</label>
                <input
                  type="text"
                  id="groupName"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="mt-1 w-full px-3 py-2 text-sm border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-primary focus:border-primary rounded-md bg-white dark:bg-slate-800"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">{t.selectMembers}</label>
                <div className="mt-2 max-h-48 overflow-y-auto border border-border-light dark:border-border-dark rounded-md p-2 space-y-2">
                  {allUsers.map(user => (
                    <div key={user.id} className="flex items-center">
                      <input
                        id={`user-${user.id}`}
                        type="checkbox"
                        checked={selectedUserIds.has(user.id)}
                        onChange={() => handleUserToggle(user.id)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor={`user-${user.id}`} className="ml-3 text-sm">{user.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-3 bg-gray-50 dark:bg-slate-800/50 flex justify-end space-x-3 rounded-b-lg">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700">
              {t.cancel}
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-md border border-transparent shadow-sm">
              {t.create}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
