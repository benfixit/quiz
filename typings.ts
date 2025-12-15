export type CategoryType = {
    id: number,
    title: string,
    icon: string,
    color: string
}

//@todo add category ID to questions
export type QuestionType = {
    id: string,
    text: string,
    options: string[],
    answer: string
}