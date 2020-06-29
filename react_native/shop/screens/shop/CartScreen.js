import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {View, Text, StyleSheet, Button, FlatList} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";

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
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });

    const dispatch = useDispatch();

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                <Button 
                    color={Colors.accent} 
                    title="Order now" 
                    disabled={cartItems.length === 0}
                    onPress={() => {
                        dispatch(orderActions.addOrder(cartItems, cartTotalAmount))
                    }}
                />
            </Card>
            <FlatList 
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                    <CartItem 
                        quantity={itemData.item.quantity}
                        name={itemData.item.productName}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId));
                        }}
                    />
                )}
            />
        </View>
    )
};

export const screenOptions = {
    headerTitle: "Your cart"
}

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