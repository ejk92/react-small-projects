import React, {useState, useRef, useEffect} from "react";
import { View, Text, StyleSheet, Button, Alert} from "react-native";

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Game is over</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});

export default GameOverScreen;

