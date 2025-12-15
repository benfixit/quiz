import { createContext, ReactNode, useContext, useState } from "react";
import { CategoryType } from "@/typings";
import { categories } from "@/constants/categories";

type Props = {
    children: ReactNode;
};

type ValueType = {
    category: CategoryType;
    setCategory: (category: CategoryType) => void;
}

const CategoryContext = createContext<ValueType>({ category: categories[0], setCategory: () => {} });

const CategoryProvider = ({ children }: Props) => {
    const [category, setCategory] = useState<CategoryType>(categories[0]);

    return (
        <CategoryContext.Provider value={{ category, setCategory }}>
            {children}
        </CategoryContext.Provider>
    );
}

export const useCategory = () => {
    const { category, ...rest } = useContext(CategoryContext);

    if (!category) {
        throw new Error("Couldn't find the category. Do not forget to wrap your component with the Category Provider?");
    }

    return { category, ...rest }
}

export default CategoryProvider;