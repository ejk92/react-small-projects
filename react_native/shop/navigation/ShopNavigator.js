import React from "react";
import { Platform } from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons} from "@expo/vector-icons";
import { useSelector } from "react-redux";

import ProductsOverviewScreen, {screenOptions as productsOverviewScreenOptions} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailsScreen, {screenOptions as productDetailScreenOptions} from "../screens/shop/ProductDetailScreen";
import CartScreen, {screenOptions as cartScreenOptions} from "../screens/shop/CartScreen";
import OrdersScreen, {screenOptions as ordersScreenOptions} from "../screens/shop/OrdersScreen";
import UserProductsScreen, {screenOptions as userProductsScreenOptions} from "../screens/user/UserProductsScreen";
import EditProductScreen, {screenOptions as editProductScreenOptions} from "../screens/user/EditProductScreen";
import Colors from '../constants/Colors';
import AuthScreen, {screenOptions as authScreenOptions} from "../screens/user/AuthScreen";

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

const ProductsStackNavigator = createStackNavigator();

const ProductsNavigator = () => {
    return (
        <ProductsStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
            <ProductsStackNavigator.Screen 
                name="productsOverview" 
                component={ProductsOverviewScreen}
                options={productsOverviewScreenOptions}
            />
            <ProductsStackNavigator.Screen 
                name="productDetails" 
                component={ProductDetailsScreen}
                options={productDetailScreenOptions}
            />
            <ProductsStackNavigator.Screen 
                name="cart" 
                component={CartScreen}
                options={cartScreenOptions}
            />
        </ProductsStackNavigator.Navigator>
    )
};

const OrdersStackNavigator = createStackNavigator();

const OrdersNavigator = () => {
    return (
        <OrdersStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
            <OrdersStackNavigator.Screen 
                name="orders"
                component={OrdersScreen} 
                options={ordersScreenOptions}
            />
        </OrdersStackNavigator.Navigator>
    )
};

const AdminStackNavigator = createStackNavigator();

const AdminNavigator = () => {
    return (
        <AdminStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
            <AdminStackNavigator.Screen 
                name="userProducts" 
                component={UserProductsScreen}
                options={userProductsScreenOptions}
            />
            <AdminStackNavigator.Screen 
                name="editProduct" 
                component={EditProductScreen}
                options={editProductScreenOptions}
            />
        </AdminStackNavigator.Navigator>
    )
};

const ShopDrawerNavigator = createDrawerNavigator();

const ShopNavigator = () => {
    return (
        <ShopDrawerNavigator.Navigator>
            <ShopDrawerNavigator.Screen 
                name="products"
                component={ProductsNavigator}
                options={{
                    drawerIcon: props => (
                        <Ionicons
                            name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                            size={23}
                            color={drawerConfig.tintColor}
                        />
                    )
                }}
            />
            <ShopDrawerNavigator.Screen 
                name="orders"
                component={OrdersNavigator}
                options={{
                    drawerIcon: props => (
                        <Ionicons
                            name={Platform.OS === "android" ? "md-list" : "ios-list"}
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />
            <ShopDrawerNavigator.Screen 
                name="admin"
                component={AdminNavigator}
                options={{
                    drawerIcon: props => (
                        <Ionicons
                            name={Platform.OS === "android" ? "md-create" : "ios-create"}
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />
        </ShopDrawerNavigator.Navigator>
    )
}

const AuthStackNavigator = createStackNavigator();

const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
            <AuthStackNavigator.Screen 
                name="auth"
                component={AuthScreen}
                options={authScreenOptions}
            />
        </AuthStackNavigator.Navigator>
    )
}

// const ProductsNavigator = createStackNavigator({
//         productsOverview: ProductsOverviewScreen,
//         productDetails: ProductDetailsScreen,
//         cart: CartScreen
//     }, 
//     {
//         navigationOptions: {
//             drawerIcon: drawerConfig => 
//                 <Ionicons
//                     name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
//                     size={23}
//                     color={drawerConfig.tintColor}
//                 />
//         },
//         defaultNavigationOptions: defaultNavigationOptions
//     }
// )

// const OrdersNavigator = createStackNavigator({
//         orders: OrdersScreen
//     },
//     {
//         navigationOptions: {
//             drawerIcon: drawerConfig => 
//                 <Ionicons
//                     name={Platform.OS === "android" ? "md-list" : "ios-list"}
//                     size={23}
//                     color={drawerConfig.tintColor}
//                 />
//         },
//         defaultNavigationOptions: defaultNavigationOptions
//     }
// )

// const AdminNavigator = createStackNavigator({
//     userProducts: UserProductsScreen,
//     editProduct: EditProductScreen
// },
// {
//     navigationOptions: {
//         drawerIcon: drawerConfig => 
//             <Ionicons
//                 name={Platform.OS === "android" ? "md-create" : "ios-create"}
//                 size={23}
//                 color={drawerConfig.tintColor}
//             />
//     },
//     defaultNavigationOptions: defaultNavigationOptions
// }
// )


// const ShopNavigator = createDrawerNavigator({
//     products: ProductsNavigator,
//     orders: OrdersNavigator,
//     admin: AdminNavigator
// }, {
//     contentOptions: {
//         activeTintColor: Colors.primary
//     }
// });

// const AuthNavigator = createStackNavigator(
//     {
//     auth: AuthScreen
//     }, {
//         defaultNavigationOptions: defaultNavigationOptions
//     }
// );

// const MainNavigator = createSwitchNavigator({
//     auth: AuthNavigator,
//     shop: ShopNavigator
// })



const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token);
    return (
        <NavigationContainer>
            {!isAuth && <ShopNavigator />}
            {isAuth && <AuthNavigator />}
        </NavigationContainer>
    );
};

export default AppNavigator;