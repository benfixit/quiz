import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAudioPlayer } from "expo-audio";

type Props = {
    initialSeconds: number;
    onTimerStop: () => void;
}

const audioSource = require("@/assets/sounds/clock-ticking.mp3");

const CountdownTimer = (props: Props) => {
    const { initialSeconds = 30, onTimerStop = () => {} } = props;
    const [timer, setTimer] = useState<number>(initialSeconds);
    const player = useAudioPlayer(audioSource);

    useEffect(() => {
        if (timer <= 0) {
            player.pause();
            onTimerStop();
            return;
        }

        let interval = setInterval(() => {
            player.play();
            setTimer(lastTimerCount => lastTimerCount - 1)
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, onTimerStop, player]);

    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>{timer}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        borderWidth: 6,
        height: 56,
        width: 56,
        borderRadius: "50%",
        paddingVertical: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        borderColor: "#0f0f0f"
    },
    text: { 
        textAlign: "right", 
        fontSize: 16 
    }
});

export default CountdownTimer;