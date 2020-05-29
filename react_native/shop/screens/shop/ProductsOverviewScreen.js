import React from "react";
import {FlatList, StyleSheet, Platform, Button} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import  Colors  from "../../constants/Colors";


const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (id, name) => {
        props.navigation.navigate('productDetails', {
            productId: id, 
            productName: name
        });
    };

    return (
        <FlatList 
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

ProductsOverviewScreen.navigationOptions = navData => {
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

styles = StyleSheet.create({});

export default ProductsOverviewScreen;