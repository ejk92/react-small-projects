import React, {useState, useEffect, useReducer, useCallback} from "react";
import {useDispatch} from "react-redux";
import {KeyboardAvoidingView, View, ScrollView, StyleSheet, Button, ActivityIndicator, Alert} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE"

const formReducer = (state, action) => {
    switch (action.type) {
        case FORM_INPUT_UPDATE:
            const updatedValues = {
                ...state.inputValues,
                [action.input]: action.value
            };
            const updatedValidities = {
                ...state.inputValidities,
                [action.input]: action.isValid
            }
            let updatedFormIsValid = true;
            for (const key in updatedValidities) {
                updatedFormIsValid = updatedFormIsValid && updatedValidities[key].isValid;
            }
            return {
                formIsValid: updatedFormIsValid,
                inputValidities: updatedValidities,
                inputValues: updatedValues
            }
        default:
            return state
    }
}


const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: "",
            password: ""
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
            Alert.alert("an error occured", error, [{text: "OKEy"}])
            setError();
        }
    }, [error]);

    const authHandler = async () => {
        let action;
        if (isSignup) {
            action = authActions.singup(formState.inputValues.email, formState.inputValues.password);
        } else {
            action = authActions.login(formState.inputValues.email, formState.inputValues.password);
        }
        setIsLoading(true);
        try {
            await dispatch(action);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.screen}>
            <LinearGradient colors={["#ffedf2", "#ffe4f5"]} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input 
                            id="email"
                            label="Email" 
                            keybordType="email-address" 
                            required 
                            autoCapitalize="none"
                            errorText="Please enter a valid email address"
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <Input 
                            id="password"
                            label="Password" 
                            keybordType="default"
                            secureTextEntry
                            required 
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid email address"
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        {isLoading ? <ActivityIndicator size="small" color={Colors.primary}/> : <View style={styles.buttonContainer}><Button title={isSignup ? "Sign up" : "Login"} color={Colors.primary} onPress={authHandler} /></View>}
                        <View style={styles.buttonContainer}><Button title={`Switch to ${isSignup ? 'Login': 'Sign up'}`} color={Colors.accent} onPress={()=>
                            {setIsSignup(prevState => !prevState)}} /></View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
};

AuthScreen.navigationOptions = {
    headerTitle: "Authenticate"
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    authContainer: {
        width: "80%",
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        marginTop: 10
    }
});

export default AuthScreen;