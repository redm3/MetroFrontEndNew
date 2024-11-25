import React, { createContext, useState } from 'react';

// Named export for this context (to be used via useContext elsewhere)
export const UserContext = createContext();

// The provider component wrapper for this context. Uses its own state to keep track of the current email.
// Use it in a top-level component such as App.jsx like <UserProvider>...</UserProvider>.
// All child components in the ... above will receive the data values from line 13.
export const UserProvider = (props) => {
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    React.useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    return (
        <UserContext.Provider value={{ email, setEmail, isAdmin, setIsAdmin }}>
            {props.children}
        </UserContext.Provider>
    );
};
