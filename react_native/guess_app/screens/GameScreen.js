import React, {useState, useRef, useEffect} from "react";
import { View, Text, StyleSheet, Button, Alert, Dimensions, FlatList} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import BodyText from "../components/BodyText";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);


const GameScreen = props => {
    const {userChoice, onGameOver} = props;

    const initialGuess = generateRandomBetween(1, 100, userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

     

    useEffect(() => {
        if (currentGuess == userChoice) {
            onGameOver(pastGuesses.length);    
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < userChoice) ||
            (direction === 'greater' && currentGuess > userChoice)
        ) {
            Alert.alert('Don\'t lie',
             "You know that is wrong...", [
                 {text: "Sorry", style: 'cancel'}
            ]);
            return;
        }
        
        if (direction === "lower") {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(currPastGuesses => [nextNumber.toString(), ...currPastGuesses]);
    };
    
    return (
        <View style={styles.screen}> 
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={() => nextGuessHandler('lower')}><Ionicons name="md-remove" size={24} color="white" /></MainButton>
                <MainButton onPress={() => nextGuessHandler('greater')}><Ionicons name="md-add" size={24} color="white" /></MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/*<ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((pastGuess, index) => renderListItem(pastGuess, pastGuesses.length - index))}
                </ScrollView>*/}
                <FlatList 
                    contentContainerStyle={styles.list}   
                    data={pastGuesses}
                    keyExtractor={item => item}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                />
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: "90%"
    },
    listItem: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%'
    },
    list: {
        flexGrow: 1,
        justifyContent: "flex-end"
    },
    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 350 ? '60%' : '80%'
    }
});

export default GameScreen;