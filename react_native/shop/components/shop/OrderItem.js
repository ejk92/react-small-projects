import React, { useState } from "react";
import {View, Text, Button, Image, StyleSheet, TouchableOpacity, Platform } from "react-native";

import CartItem from "./CartItem";
import Card from "../UI/Card";
import Colors from "../../constants/Colors";

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>{props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={Colors.primary} title="Show details" onPress={() => {
                setShowDetails(prevState => !prevState);
            }}/>
            {showDetails && <View style={styles.detailItem}>
                    {props.items.map(cartItem => <CartItem key={cartItem.productId} quantity={cartItem.quantity} amount={cartItem.sum} name={cartItem.name}/>)}
                </View>}
        </Card>
    )
};

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: "center"
    },
    summary: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },
    totalAmount: {
        fontFamily: "open-sans-bold",
        fontSize: 16
    },
    date: {
        fontFamily: "open-sans",
        fontSize: 16,
        color: "#888"
    },
    detailItem: {
        width: "100%"
    }
});

export default OrderItem;