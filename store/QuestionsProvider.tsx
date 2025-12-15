import { createContext, ReactNode, useContext, useState } from "react";
import { QuestionType } from "@/typings";
import { questions as data } from "@/constants/questions";

type Props = {
    children: ReactNode;
};

type ValueType = {
    questions: QuestionType[];
    setQuestions: (questions: QuestionType[]) => void;
}

const QuestionsContext = createContext<ValueType>({ questions: data, setQuestions: () => {} });

const QuestionsProvider = ({ children }: Props) => {
    const [questions, setQuestions] = useState<QuestionType[]>(data);

    return (
        <QuestionsContext.Provider value={{ questions, setQuestions }}>
            {children}
        </QuestionsContext.Provider>
    );
}

export const useQuestions = () => {
    const { questions, ...rest } = useContext(QuestionsContext);

    if (questions.length === 0) {
        throw new Error("Couldn't find the questions. Do not forget to wrap your component with the Questions Provider?");
    }

    return { questions, ...rest }
}

export default QuestionsProvider;