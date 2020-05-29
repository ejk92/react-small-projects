import React from "react";
import { FlatList, StyleSheet, Platform, Button } from "react-native";
import {useSelector, useDispatch} from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import  Colors  from "../../constants/Colors";
import * as productsActions from "../../store/actions/products";

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();
    return (
        <FlatList 
            data={userProducts}
            keyExtractor={(item) => item.id}
            renderItem={itemData => 
                <ProductItem 
                    image={itemData.item.imageUrl} 
                    name={itemData.item.name}
                    price={itemData.item.price} 
                    onViewDetails={() => {}}
                    onAddToCart={() => {}}
                >
                    <Button 
                        color={Colors.primary} 
                        title="Edit" 
                        onPress={() => {}}
                    />
                    <Button 
                        color={Colors.primary} 
                        title="Delete" 
                        onPress={() => {
                            dispatch(productsActions.deleteProduct(itemData.item.id));
                        }}
                    />
                </ProductItem>
            }
        />
    )
}

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: "Your products",
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
        }
    }
}

const styles = StyleSheet.create({});

export default UserProductsScreen;