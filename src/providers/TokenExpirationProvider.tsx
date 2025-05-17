import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useCookies } from '../shared/hooks/useCookies';

interface TokenExpirationContextType {
    isTokenExpired: boolean;
    timeUntilExpiration: number;
}

const TokenExpirationContext = createContext<TokenExpirationContextType | null>(null);

export const TokenExpirationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isTokenExpired, setIsTokenExpired] = useState(false);
    const [timeUntilExpiration, setTimeUntilExpiration] = useState(0);
    const { getCookie, removeCookie } = useCookies()

    useEffect(() => {
        const checkTokenExpiration = () => {
            const token = getCookie("token");
            if (!token) return;

            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const expirationTime = payload.exp * 1000;
                const currentTime = Date.now();
                const timeLeft = expirationTime - currentTime;

                setTimeUntilExpiration(timeLeft);
                console.log(`Your session will expire in ${timeLeft} sec.`);

                if (timeLeft < 1) {
                    setIsTokenExpired(true);
                    toast.error('Your session has expired. Please log in again.');
                    removeCookie("token");
                    //  لما اشوف الرابط ;
                    // navigate("/login") 
                } else if (timeLeft <= (300000)) {
                    toast.warning(`Your session will expire in ${Math.floor(timeLeft / 60000)} minutes.`);
                }
            } catch (error) {
                console.error('Error checking token expiration:', error);
            }
        };

        checkTokenExpiration();
        const intervalId = setInterval(checkTokenExpiration, 30000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <TokenExpirationContext.Provider value={{ isTokenExpired, timeUntilExpiration }}>
            {children}
        </TokenExpirationContext.Provider>
    );
};

export const useTokenExpiration = () => {
    const context = useContext(TokenExpirationContext);
    if (!context) {
        throw new Error('useTokenExpiration must be used within a TokenExpirationProvider');
    }
    return context;
};
