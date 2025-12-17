import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@react-native-vector-icons/ionicons';
import { useResult } from "@/store/ResultProvider";
import { AnswersType } from "@/typings";
import { useEffect } from "react";

export default function ReviewScreen(){
    const { result } = useResult();

    useEffect(() => {
        
    });

    const renderItem = (item: AnswersType) => {
        return (
            <View style={styles.view}>
                <View style={styles.textView}>
                    <Ionicons name="help-circle" size={24} color={"aqua"} />
                    <Text style={{ flex: 1 }}>{item.question}</Text>
                </View>
                {!item.status && <View style={styles.textView}>
                    <Ionicons name="close-circle" size={24} color={"red"} />
                    <Text style={styles.userAnswer}>{item.userAnswer}</Text>
                </View>}
                <View style={styles.textView}>
                    <Ionicons name="checkmark-circle" size={24} color={"green"} />
                    <Text style={{}}>{item.correctAnswer}</Text>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList 
                    data={result} 
                    showsVerticalScrollIndicator={false} 
                    renderItem={({ item }) => renderItem(item)} 
                    keyExtractor={item => item.question}
                    contentContainerStyle={styles.list}
                />
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
    list: {
        gap: 8,
        width: "100%"
    },
    view: { 
        backgroundColor: "#ffffff",
        borderRadius: 8,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        rowGap: 8
    },
    textView: { 
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 8
    },
    userAnswer: {
        textDecorationLine: "line-through"
    }
});