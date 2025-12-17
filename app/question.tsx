//@ts-nocheck
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn } from "react-native-reanimated";
import { router, UnknownOutputParams, useLocalSearchParams } from "expo-router";
import { useQuestions } from "@/store/QuestionsProvider";
import { useResult } from "@/store/ResultProvider";
import { QuestionType, AnswersType } from "@/typings";
import CountdownTimer from "@/components/CountdownTimer";

export default function QuestionScreen(){
    const { questions } = useQuestions();
    const param = useLocalSearchParams<UnknownOutputParams & { questionNumber: number }>();
    const questionNumber = Number(param.questionNumber);
    const { result, setResult } = useResult();
    const [question, setQuestion] = useState<QuestionType>(questions[0]);
    const [selectedOption, setSelectedOption] = useState<string>(null);
    const [disableOptions, setDisableOptions] = useState<boolean>(false);
    const [hasSelected, setHasSelected] = useState<boolean>(false);
    

    useEffect(() => {
        if (questionNumber) {
            const currentQuestion = questions[questionNumber - 1];

            setQuestion(currentQuestion);
        }
    }, [questionNumber]);

    const handlePressOption = (option: string) => {
        // Change the button color, simulate a transition and show the new question
        // play sound
        setSelectedOption(option);
        setHasSelected(true);
    }

    const handlePressNext = () => {
        const status = selectedOption === question.answer;
        
        const data: AnswersType = {
            question: question.text,
            correctAnswer: question.answer,
            userAnswer: selectedOption,
            status
        }

        // push user answers to context
        setResult([...result, data]);

        const nextQuestionNumber = questionNumber + 1;

        if (nextQuestionNumber > questions.length) {
            router.replace("/result");
            return;
        }

        router.replace({ pathname: "/question", params: { questionNumber: nextQuestionNumber }})
    }

    const handleTimerStop = () => {
        // Disable options and enable the next button
        setDisableOptions(true);
        setHasSelected(true)
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Animated.View entering={FadeIn.duration(400).delay(400)}>
                    <CountdownTimer initialSeconds={5} onTimerStop={handleTimerStop} />
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
                                disabled={disableOptions}
                                style={[
                                    styles.pressable,
                                    { borderColor: selectedOption === option ? "#0f0f0f" : "transparent" },
                                    disableOptions && styles.buttonDisabled
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
                        <Pressable 
                            disabled={hasSelected === false && disableOptions === false} 
                            style={[styles.pressable, styles.next, (hasSelected === false && disableOptions === false) && styles.buttonDisabled]} 
                            onPress={handlePressNext}
                        >
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
        marginTop: 48,
        marginBottom: 48,
        height: "20%",
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
        marginBottom: 40
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
    },
    buttonDisabled: {
        backgroundColor: 'gray', // Style when disabled
        opacity: 0.5, // Common way to indicate disabled
    },
});