
import type { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { CookiesProvider } from "react-cookie"
import { TokenExpirationProvider } from "./TokenExpirationProvider";
import { FormProvider } from "./FormProvider";
import { Provider } from "react-redux"
import { store } from "../redux/store/store"
interface AppProviderProps {
    children: ReactNode;
}




const IndexProvider: React.FC<AppProviderProps> = ({ children }) => {

    return (
        <Provider store={store}>
            <FormProvider>
                <CookiesProvider>
                    <ThemeProvider>
                        <TokenExpirationProvider>
                            {children}
                        </TokenExpirationProvider>
                    </ThemeProvider>
                </CookiesProvider>
            </FormProvider>
        </Provider>
    );
};

export default IndexProvider;