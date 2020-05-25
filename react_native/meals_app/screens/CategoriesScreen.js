import React from "react";
import { Button, View, Text, StyleSheet, FlatList } from "react-native";

import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButtom from "../components/HeaderButton";


const CategoriesScreen = props => {

    const categoryGridHandler = (id) => {
        props.navigation.navigate({
            routeName: 'CategoryMeals', 
            params: {
                categoryId: id
            }
        });
    }

    const renderGridItem = itemData => (
        <CategoryGridTile 
            title={itemData.item.title}
            color={itemData.item.color}
            onSelect={() => categoryGridHandler(itemData.item.id)}
        />
    )

    return (
        <FlatList
            numColumns={2}
            data={CATEGORIES}
            renderItem={renderGridItem}
            keyExtractor={(item, index) => item.id}
        />
    );
};

CategoriesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Meal categories',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButtom}>
                <Item title="Menu" iconName='ios-menu' onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        )
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});

export default CategoriesScreen;