import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useResult } from "@/store/ResultProvider";
import { questions } from "@/constants/questions";

export default function ResultScreen(){
    const { result, setResult } = useResult();

    const score = result.filter(item => item.status === true).length;

    const handlePlayAgain = () => {
        setResult([]);
        router.push("/");
    }

    const handleShareResult = () => {
        console.log("Share result ::: ", result);
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.view}>
                    <Text style={styles.title}>
                        Quiz Result
                    </Text>
                    <Text style={styles.icon}>
                        🏆
                    </Text>
                    <Text style={styles.yourScore}>
                        Your Score
                    </Text>
                    <Text style={styles.score}>
                        {score} / {questions.length}
                    </Text>
                </View>
                <View style={styles.btns}>
                    <Pressable style={styles.pressable} onPress={handlePlayAgain}>
                        <View>
                            <Text style={styles.pressableText}>Play Again</Text>
                        </View>
                    </Pressable>
                    <Pressable style={styles.pressable} onPress={handleShareResult}>
                        <View>
                            <Text style={styles.pressableText}>Share result (TBD)</Text>
                        </View>
                    </Pressable>
                    <Pressable style={styles.pressable} onPress={() => router.navigate("/review")}>
                        <View>
                            <Text style={styles.pressableText}>Review result</Text>
                        </View>
                    </Pressable>
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
        // backgroundColor: "#1F2543"
    },
    view: { 
        marginVertical: 36,
    },
    title: { 
        fontWeight: "bold", 
        fontSize: 36, 
        marginBottom: 40,
        textAlign: "center",
        color: "#0f0f0f"
    },
    icon: { 
        marginBottom: 8,
        fontSize: 200,
        textAlign: "center"
    },
    yourScore: {
        fontSize: 12,
        textTransform: "uppercase",
        color: "#555555",
        textAlign: "center",
        marginBottom: 8
    },
    score: {
        color: "#0f0f0f",
        textAlign: "center",
        fontSize: 48,
        fontWeight: "bold"
    },
    btns: { 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        rowGap: 16 
    },
    pressable: { 
        alignItems: "center", 
        backgroundColor: "#0f0f0f", 
        borderColor: "transparent", 
        color: "#ffffff",
        borderRadius: 8, 
        borderWidth: 1,
        padding: 16,
        width: "100%"
    },
    pressableText: {
        color: "#ffffff"
    },
});