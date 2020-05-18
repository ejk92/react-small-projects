import React, {useState, useRef, useEffect} from "react";
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView} from "react-native";

import BodyText from "../components/BodyText";
import Colors from "../constants/color";
import MainButton from "../components/MainButton";

const GameOverScreen = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <BodyText>The Game is Over !</BodyText>
                <View style={styles.imageContainer}>
                    <Image
                        fadeDuration={300}
                        source={require('../assets/success.png')}
                        style={styles.image}
                    />
                </View>
                <BodyText style={styles.resultText}>
                    Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess number <Text style={styles.highlight}>{props.userNumber}</Text>
                </BodyText>
                <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: "black",
        overflow: "hidden",
        marginVertical: Dimensions.get('window').height / 40
    },
    image: {
        width: '100%',
        height: '100%',
    },
    highlight: {
        color: Colors.primary
    },
    resultText: {
        textAlign: "center",
        fontSize: Dimensions.get('window').height < 600 ? 12 : 18,
        marginBottom: 20,
    }
});

export default GameOverScreen;

