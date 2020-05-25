import React from "react";
import {FlatList, ScrollView, View, Text, StyleSheet, ScrollView} from "react-native";
import {useSelector} from "react-redux";


const ProductsOverviewScreen = () => {
    const products = useSelector(state => state.products.availableProducts);
    const renderProductCard = (itemData) => {
        return (
            <Text>{itemData.item.name}</Text>
        )
    }
    return (
        <ScrollView>
            <FlatList 
                data={products} 
                keyExtractor={item => item.id}
                renderItem={renderProductCard}
                onPress={() => {}}
            />
        </ScrollView>
    )
};

ProductsOverviewScreen.navigationOptions = {
    headerTitle: "All products"
}

styles = StyleSheet.create({});

export default ProductsOverviewScreen;