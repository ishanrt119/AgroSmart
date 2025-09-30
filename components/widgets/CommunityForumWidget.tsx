
import React from 'react';
import { Language, ForumPost } from '../../types';
import Card from '../shared/Card';
import { TRANSLATIONS } from '../../constants';

interface CommunityForumWidgetProps {
    language: Language;
}

const CommunityForumWidget: React.FC<CommunityForumWidgetProps> = ({ language }) => {
    const t = TRANSLATIONS[language];
    // Dummy Data
    const forumData: ForumPost[] = [
        { id: 1, author: 'Ramesh Singh', title: 'Best fertilizer for potatoes in rocky soil?', replies: 5 },
        { id: 2, author: 'Sunita Devi', title: 'How to manage water during dry spells?', replies: 8 },
        { id: 3, author: 'Expert Mohan', title: 'Tip: Using neem oil for pest control', replies: 12 },
        { id: 4, author: 'Vikram Choudhary', title: 'Market rate for ginger is high this week.', replies: 3 },
    ];

    return (
        <Card title={t.communityForum}>
            <div className="space-y-3">
                {forumData.map(post => (
                    <div key={post.id} className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                        <p className="font-semibold truncate">{post.title}</p>
                        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>by {post.author}</span>
                            <span>{post.replies} {t.replies}</span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default CommunityForumWidget;
