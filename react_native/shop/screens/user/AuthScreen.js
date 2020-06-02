import React from "react";
import {KeyboardAvoidingView, View, ScrollView, StyleSheet} from "react-native";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";

const AuthScreen = props => {
    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.screen}>
            <Card>
                <ScrollView>
                    <Input 
                        id="email"
                        label="Email" 
                        keybordType="email-address" 
                        required 
                        autoCapitalize="none"
                        errorMessage="Please enter a valid email address"
                        onValueChange={() => {}}
                        initialValue=""
                    />
                </ScrollView>
            </Card>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({});

export default AuthScreen;