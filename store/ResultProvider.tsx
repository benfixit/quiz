import { createContext, ReactNode, useContext, useState } from "react";
import { AnswersType } from "@/typings";

type Props = {
    children: ReactNode;
};

type ValueType = {
    result: AnswersType[];
    setResult: (result: AnswersType[]) => void;
}

const ResultContext = createContext<ValueType>({ result: [], setResult: () => {} });

const ResultProvider = ({ children }: Props) => {
    const [result, setResult] = useState<AnswersType[]>([]);

    return (
        <ResultContext.Provider value={{ result, setResult }}>
            {children}
        </ResultContext.Provider>
    );
}

export const useResult = () => {
    const { result, ...rest } = useContext(ResultContext);

    if (!result) {
        throw new Error("Couldn't find the result. Do not forget to wrap your component with the Result Provider?");
    }

    return { result, ...rest }
}

export default ResultProvider;