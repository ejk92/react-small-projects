import React from "react";
import {useSelector} from "react-redux";
import {View, Text, StyleSheet, Button, FlatList} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CartItem from "../../components/shop/CartItem";


const CartScreen = props => {
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productName: state.cart.items[key].productName,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        };
        return transformedCartItems;
    });

    const totalAmount = useSelector(state => state.cart.totalAmount);
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${totalAmount}</Text>
                </Text>
                <Button 
                    color={Colors.accent} 
                    title="Order now" 
                    disabled={cartItems.length === 0}
                />
            </View>
            <FlatList 
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => 
                    <CartItem 
                        quantity={itemData.item.quantity}
                        name={itemData.item.productName}
                        amount={itemData.item.sum}
                        onRemove={() => {}}
                    />
                }
            />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white"
    },
    summaryText: {
        fontFamily: "open-sans-bold",
        fontSize: 18,
    },
    amount: {
        color: Colors.primary
    }
});

export default CartScreen;