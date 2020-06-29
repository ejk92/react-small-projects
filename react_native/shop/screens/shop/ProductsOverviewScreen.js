import React, {useState, useEffect, useCallback} from "react";
import {FlatList, StyleSheet, Platform, Text, Button, ActivityIndicator, View} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import  Colors  from "../../constants/Colors";


const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => setIsLoading(false));
    }, [dispatch, loadProducts])

    useEffect(() => {
        const unsubscribe = props.navigation.addListener(
            'focus',
            loadProducts
        );
        return () => {
            unsubscribe();
        }
    }, [loadProducts])

    const selectItemHandler = (id, name) => {
        props.navigation.navigate('productDetails', {
            productId: id, 
            productName: name
        });
    };

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occurred</Text>
                <Button title="Try again" onPress={loadProducts} color={Colors.primary} />
            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary}/>
            </View>
        )
    }

    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isLoading}
            data={products} 
            keyExtractor={item => item.id}
            renderItem={itemData => 
                <ProductItem 
                    image={itemData.item.imageUrl}
                    name={itemData.item.name}
                    price={itemData.item.price}
                    onSelect={()=> selectItemHandler(itemData.item.id, itemData.item.name)}
                >
                    <Button 
                        color={Colors.primary} 
                        title="View details" 
                        onPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.name);
                        }}
                    />
                    <Button 
                        color={Colors.primary} 
                        title="To cart" 
                        onPress={() => {
                            dispatch(cartActions.addToCart(itemData.item));
                        }}
                    />
                </ProductItem>
            }
        />
    );
};

export const screenOptions = navData => {
    return {
        headerTitle: "All products",
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item 
                        title='Menu' 
                        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
                        onPress={() => {navData.navigation.toggleDrawer()}}
                    />
                </HeaderButtons>
            )
        },
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item 
                        title='Cart' 
                        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} 
                        onPress={() => {navData.navigation.navigate('cart')}}
                    />
                </HeaderButtons>
            )
        }
    }
};

styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    }
});

export default ProductsOverviewScreen;