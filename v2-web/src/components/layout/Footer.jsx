import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-surface border-t mt-auto py-8">
            <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Medic 138. Street-smart medical education.</p>
            </div>
        </footer>
    );
};

export default Footer;
