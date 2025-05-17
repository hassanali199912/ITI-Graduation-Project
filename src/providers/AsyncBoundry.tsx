import GeneralLoader from "../shared/components/loaders/GeneralLoader";
import GeneralLErrorUI from "../shared/components/errors/GeneralError";
import { Suspense, type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";


interface AsyncBoundryProps {
    children: ReactNode
}



const AsyncBoundry: React.FC<AsyncBoundryProps> = ({ children }) => {

    return (
        <ErrorBoundary fallback={<GeneralLErrorUI />} >
            <Suspense fallback={<GeneralLoader />}>
                {children}
            </Suspense>
        </ErrorBoundary>
    )

}


export default AsyncBoundry