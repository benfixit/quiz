import { FlatList, View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { categories } from "@/constants/categories";
import { CategoryType } from "@/typings";
import { router } from "expo-router";
import { useCategory } from "@/store/CategoryProvider";

export default function HomeScreen(){
    const { setCategory } = useCategory();

    const renderItem = (category: CategoryType ) => {
        return (
            <Pressable style={styles.catPressable} onPress={() => {
                setCategory(category);
                router.push("/welcome");
            }}>
                <View>
                    <Text style={styles.catIcon}>
                        {category.icon}
                    </Text>
                    <Text>
                        {category.title}
                    </Text>
                </View>
            </Pressable>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.view}>
                    <Text style={styles.categoryText}>
                        Hey, what subject do you want to quiz yourself on today?
                    </Text>
                </View>
                <FlatList
                    style={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    data={categories}
                    numColumns={2}
                    renderItem={({ item }) => renderItem(item)} 
                    keyExtractor={item => item.id.toString()} 
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: "#F0ECE7"
    },
    view: { 
        marginBottom: 16
    },
    categoryText: { 
        fontWeight: "bold", 
        fontSize: 20, 
        marginBottom: 8
    },
    flatList: { 
        width: "100%"
    },
    link: {
        marginTop: 16,
        paddingVertical: 16,
    },
    catPressable: { 
        alignItems: "center", 
        backgroundColor: "#ffffff", 
        borderColor: "transparent", 
        borderRadius: 8, 
        borderWidth: 1, 
        display: "flex", 
        flex: 1,
        flexDirection: "column",
        justifyContent: "center", 
        margin: 8, 
        padding: 40
    },
    catIcon: { 
        marginBottom: 8,
        fontSize: 40,
        textAlign: "center"
    }
});