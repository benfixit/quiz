import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn } from "react-native-reanimated";
import { router, UnknownOutputParams, useLocalSearchParams } from "expo-router";
import { useQuestions } from "@/store/QuestionsProvider";
import { useResult } from "@/store/ResultProvider";
import { QuestionType } from "@/typings";

type AnswersType = {
    question: string,
    answer: string,
    status: boolean
}

export default function QuestionScreen(){
    const { questions } = useQuestions();
    const param = useLocalSearchParams<UnknownOutputParams & { questionNumber: number }>();
    const questionNumber = Number(param.questionNumber);
    const [question, setQuestion] = useState<QuestionType>(questions[0]);
    const [selectedOption, setSelectedOption] = useState<string>("");
    const { result, setResult } = useResult();
    

    useEffect(() => {
        if (questionNumber) {
            const currentQuestion = questions[questionNumber - 1];

            setQuestion(currentQuestion);
        }
    }, [questionNumber]);

    const handlePressOption = (option: string) => {
        // Change the button color, simulate a transition and show the new question
        // disable the other buttons while changing the color of the clicked button
        // play sound
        setSelectedOption(option);

        // if we get to the end, navigate to the result screen with the result and selected result
    }

    const handlePressNext = () => {
        const status = selectedOption === question.answer;
        
        const data: AnswersType = {
            question: question.text,
            answer: selectedOption,
            status
        }

        // push user answers to context
        setResult([...result, data]);

        const nextQuestionNumber = questionNumber + 1;

        if (nextQuestionNumber >= questions.length) {
            router.push("/result");
            return;
        }

        router.push({ pathname: "/question", params: { questionNumber: nextQuestionNumber }})
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Animated.View entering={FadeIn.duration(400).delay(400)}>
                    <View style={styles.view}>
                        <Text style={styles.questionNumber}>
                            Question {questionNumber} of {questions.length}
                        </Text>
                        <Text style={styles.questionText}>
                            {question.text}
                        </Text>
                    </View>
                    <View style={styles.options}>
                        {question.options.map((option, index) => (
                            <Pressable 
                                key={index} 
                                style={({ pressed }) => [
                                    styles.pressable,
                                    { borderColor: pressed ? "#0f0f0f" : "transparent" }
                                ]} 
                                onPress={() => handlePressOption(option)}
                            >
                                <View>
                                    <Text style={styles.optionText}>
                                        {option}
                                    </Text>
                                </View>
                            </Pressable>
                        ))}
                    </View>
                    <View>
                        <Pressable style={[styles.pressable, styles.next]} onPress={handlePressNext}>
                            <View>
                                <Text style={styles.nextText}>Next</Text>
                            </View>
                        </Pressable>
                    </View>
                </Animated.View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F0ECE7"
    },
    view: { 
        marginVertical: 40,
        height: "30%"
    },
    questionNumber: {
        color: "#777777",
        fontSize: 14,
        marginBottom: 8
    },
    questionText: { 
        fontWeight: "bold", 
        fontSize: 20, 
        marginBottom: 16,
    },
    options: {
        display: "flex",
        flexDirection: "column",
        rowGap: 16,
        marginBottom: 36
    },
    optionText: {
        fontSize: 16
    },
    pressable: { 
        alignItems: "center", 
        backgroundColor: "#ffffff", 
        color: "#0f0f0f",
        borderRadius: 8, 
        borderWidth: 1,
        padding: 16
    },
    next: {
        backgroundColor: "#0f0f0f"
    },
    nextText: {
        color: "#ffffff",
        fontSize: 16
    }
});