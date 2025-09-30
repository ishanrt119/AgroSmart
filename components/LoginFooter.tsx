import React from 'react';

const LoginFooter: React.FC = () => {
    return (
        <footer className="w-full max-w-screen-xl mx-auto p-4 md:p-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <div className="border-t border-border-light dark:border-border-dark pt-4">
                <p>&copy; {new Date().getFullYear()} AgroSmart. All rights reserved.</p>
                <div className="mt-2 space-x-4">
                    <a href="#" className="hover:text-primary">Privacy Policy</a>
                    <span>&middot;</span>
                    <a href="#" className="hover:text-primary">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default LoginFooter;
