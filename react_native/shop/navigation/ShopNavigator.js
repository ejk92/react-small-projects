import React from "react";
import { Platform } from "react-native";
import {createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator} from 'react-navigation-drawer';
import { Ionicons} from "@expo/vector-icons";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import Colors from '../constants/Colors';
import AuthScreen from "../screens/user/AuthScreen";

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: "open-sans-bold"
    },
    headerBackTitleStyle: {
        fontFamily: "open-sans"
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsNavigator = createStackNavigator({
        productsOverview: ProductsOverviewScreen,
        productDetails: ProductDetailsScreen,
        cart: CartScreen
    }, 
    {
        navigationOptions: {
            drawerIcon: drawerConfig => 
                <Ionicons
                    name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                    size={23}
                    color={drawerConfig.tintColor}
                />
        },
        defaultNavigationOptions: defaultNavigationOptions
    }
)

const OrdersNavigator = createStackNavigator({
        orders: OrdersScreen
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => 
                <Ionicons
                    name={Platform.OS === "android" ? "md-list" : "ios-list"}
                    size={23}
                    color={drawerConfig.tintColor}
                />
        },
        defaultNavigationOptions: defaultNavigationOptions
    }
)

const AdminNavigator = createStackNavigator({
    userProducts: UserProductsScreen,
    editProduct: EditProductScreen
},
{
    navigationOptions: {
        drawerIcon: drawerConfig => 
            <Ionicons
                name={Platform.OS === "android" ? "md-create" : "ios-create"}
                size={23}
                color={drawerConfig.tintColor}
            />
    },
    defaultNavigationOptions: defaultNavigationOptions
}
)


const ShopNavigator = createDrawerNavigator({
    products: ProductsNavigator,
    orders: OrdersNavigator,
    admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
});

const AuthNavigator = createStackNavigator(
    {
    auth: AuthScreen
    }, {
        defaultNavigationOptions: defaultNavigationOptions
    }
);

const MainNavigator = createSwitchNavigator({
    auth: AuthNavigator,
    shop: ShopNavigator
})

export default createAppContainer(MainNavigator);