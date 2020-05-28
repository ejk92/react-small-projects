import React from "react";
import {View, Text, Button, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback,Platform } from "react-native";
import  Colors  from "../../constants/Colors";


const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === "android" && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <View style={styles.product}>
            <View style={styles.touchable}>
                <TouchableCmp onPress={props.onViewDetails} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{uri: props.image}}/>
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.name}>{props.name}</Text>
                            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.actions}>
                            <Button color={Colors.primary} title="View details" onPress={props.onViewDetails}/>
                            <Button color={Colors.primary} title="To cart" onPress={props.onAddToCart}/>
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </View>
        
    )
};

const styles = StyleSheet.create({
    product: {
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
        height: 300,
        margin: 20,
        overflow: "hidden"
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: "hidden"
    },
    image: {
        width: '100%',
        height: '100%'
    },
    name: {
        fontFamily: "open-sans-bold",
        fontSize: 18,
        marginVertical: 2
    },
    price: {
        fontFamily: "open-sans",
        fontSize: 14,
        color: "#888"
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "25%",
        paddingHorizontal: 30
    },
    details: {
       alignItems: "center",
       height: "15%",
       padding: 10
    },
    touchable: {
        borderRadius: 10,
        overflow: "hidden"
    }
});

export default ProductItem;