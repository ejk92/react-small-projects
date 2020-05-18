import React from "react";
import { View, Text, StyleSheet, Platform, addons } from "react-native";
import Colors from "../constants/color";

const Header = props => {
    return (
        <View style={{
                ...styles.headerBase, 
                ...Platform.select({
                    ios: styles.headerIOS,
                    android: styles.headerAndroid
                })
            }}
        >
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerBase: {
        width: "100%",
        height: 90,
        paddingTop: 36,
        alignItems: "center",
        justifyContent: "center",
        
    },
    headerAndroid: {
        backgroundColor: Colors.primary,
        borderBottomColor: 'transparent',
    },
    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    headerTitle: {
        color: Platform.OS === 'ios' ? Colors.accent : 'white',
        fontSize: 18
    }
});

export default Header;