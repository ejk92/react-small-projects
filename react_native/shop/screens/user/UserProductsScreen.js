import React, {useState, useCallback} from "react";
import { View, FlatList, StyleSheet, Platform, Button, Alert, ActivityIndicator } from "react-native";
import {useSelector, useDispatch} from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import  Colors  from "../../constants/Colors";
import * as productsActions from "../../store/actions/products";

const UserProductsScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = id => props.navigation.navigate('editProduct', {productId: id});

    const deleteProduct = useCallback(async (id) => {
        setIsLoading(true);
        await dispatch(productsActions.deleteProduct(id));
        setIsLoading(false);
    }, [dispatch, setIsLoading]);

    const deleteHandler = (id) => {
        Alert.alert(
            "Are you sure?", 
            "Do you really want to delete product", [
                {text: "No", style: 'default'},
                {text: "Yes", style: "desctructive", 
                onPress: () => deleteProduct(id)}
            ]
        )
    }

    if (isLoading) {
        <View>
            <ActivityIndicator size="large" />
        </View>
    }
    
    return (
        <FlatList 
            data={userProducts}
            keyExtractor={(item) => item.id}
            renderItem={itemData => 
                <ProductItem 
                    image={itemData.item.imageUrl} 
                    name={itemData.item.name}
                    price={itemData.item.price} 
                    onSelect={() => editProductHandler(itemData.item.id)}
                >
                    <Button 
                        color={Colors.primary} 
                        title="Edit" 
                        onPress={() => editProductHandler(itemData.item.id)}
                    />
                    <Button 
                        color={Colors.primary} 
                        title="Delete" 
                        onPress={() => deleteHandler(itemData.item.id)}
                    />
                </ProductItem>
            }
        />
    )
}

export const screenOptions = navData => {
    return {
        headerTitle: "Your products",
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item 
                        title='Menu' 
                        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
                        onPress={() => navData.navigation.toggleDrawer()}
                    />
                </HeaderButtons>
            )
        },
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item 
                        title='Add' 
                        iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'} 
                        onPress={() => navData.navigation.navigate('editProduct')}
                    />
                </HeaderButtons>
            )
        }
    }
}

const styles = StyleSheet.create({});

export default UserProductsScreen;