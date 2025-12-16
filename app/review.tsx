import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useCategory } from "@/store/CategoryProvider";
import { router } from "expo-router";

export default function ReviewScreen(){
    const { category } = useCategory();

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.view}>
                    <Text style={styles.categoryText}>
                        {category.title}
                    </Text>
                    <Text style={styles.catIcon}>
                        {category.icon}
                    </Text>
                </View>
                <Pressable style={styles.pressable} onPress={() => router.push("/question")}>
                    <View>
                        <Text style={styles.pressableText}>
                            Get Started
                        </Text>
                    </View>
                </Pressable>
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
        marginVertical: 80,
    },
    categoryText: { 
        fontWeight: "bold", 
        fontSize: 36, 
        marginBottom: 40,
        textAlign: "center"
    },
    catIcon: { 
        marginBottom: 8,
        fontSize: 200,
        textAlign: "center"
    },
    pressable: { 
        alignItems: "center", 
        backgroundColor: "#0f0f0f", 
        borderColor: "transparent", 
        color: "#ffffff",
        borderRadius: 8, 
        borderWidth: 1,
        padding: 16
    },
    pressableText: {
        color: "#ffffff"
    },
});