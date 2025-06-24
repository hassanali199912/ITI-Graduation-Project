import { createContext, useContext, useState, type ReactNode } from "react";


interface FromContexType {
    formData: Record<string, any>;
    setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    resetForm: () => void
}



const FormContext = createContext<FromContexType | undefined>(undefined);



export const FormProvider = ({ children }: { children: ReactNode }) => {
    const [formData, setFormData] = useState<Record<string, any>>({});

    const resetForm = () => setFormData({});

    return (
        <FormContext.Provider value={{ formData, setFormData, resetForm }}>
            {children}
        </FormContext.Provider>
    )
}


export const useFormContext = (): FromContexType => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
};