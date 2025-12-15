import { View, Text, StyleSheet, LayoutAnimation } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useQuestions } from "@/store/QuestionsProvider";
import GameButton from "@/components/GameButton";

export default function QuestionScreen(){
    const [questionNumber, setQuestionNumber] = useState(1);
    const { questions } = useQuestions();
    const currentQuestion = questions[questionNumber - 1];

    const handlePress = (option: string) => {
        // Change the button color, simulate a transition and show the new question
        // disable the other buttons while changing the color of the clicked button
        // play sound
        LayoutAnimation.spring();
        setQuestionNumber(questionNumber + 1);

        // if we get to the end, navigate to the result screen with the result and selected result
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.view}>
                    <Text style={styles.questionNumber}>
                        Question {questionNumber} of {questions.length}
                    </Text>
                    <Text style={styles.questionText}>
                        {currentQuestion.text}
                    </Text>
                </View>
                <View style={styles.options}>
                    {currentQuestion.options.map((option, index) => (
                        <GameButton
                            key={index}
                            title={option}
                            onPress={() => handlePress(option)}
                            colorFrom="#10B981" // A nice green
                            colorTo="#059669"   // A darker green when pressed
                        />
                        // <Pressable key={index} style={styles.pressable} onPress={() => handlePress(option)}>
                        //     <View>
                        //         <Text>{option}</Text>
                        //     </View>
                        // </Pressable>
                    ))}
                </View>
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
        rowGap: 16
    },
    pressable: { 
        alignItems: "center", 
        backgroundColor: "#ffffff", 
        borderColor: "transparent", 
        color: "#0f0f0f",
        borderRadius: 8, 
        borderWidth: 1,
        padding: 16
    }
});