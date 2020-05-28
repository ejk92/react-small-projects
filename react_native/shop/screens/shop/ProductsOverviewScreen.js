import React from "react";
import {FlatList, ScrollView, View, Text, StyleSheet, Platform} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import CustomHeaderButton from "../../components/UI/HeaderButton";

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    return (
        <FlatList 
            data={products} 
            keyExtractor={item => item.id}
            renderItem={itemData => 
                <ProductItem 
                    image={itemData.item.imageUrl}
                    name={itemData.item.name}
                    price={itemData.item.price}
                    onViewDetails={()=> {
                        props.navigation.navigate('productDetails', {productId: itemData.item.id, productName: itemData.item.name})
                    }}
                    onAddToCart={()=>dispatch(cartActions.addToCart(itemData.item))}
                />
            }
        />
    );
};

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: "All products",
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

styles = StyleSheet.create({});

export default ProductsOverviewScreen;