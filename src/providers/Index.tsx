
import type { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { CookiesProvider } from "react-cookie"
import { TokenExpirationProvider } from "./TokenExpirationProvider";
import { FormProvider } from "./FormProvider";

interface AppProviderProps {
    children: ReactNode;
}




const IndexProvider: React.FC<AppProviderProps> = ({ children }) => {

    return (
        <FormProvider>
            <CookiesProvider>
                <ThemeProvider>
                    <TokenExpirationProvider>
                        {children}
                    </TokenExpirationProvider>
                </ThemeProvider>
            </CookiesProvider>
        </FormProvider>
    );
};

export default IndexProvider;