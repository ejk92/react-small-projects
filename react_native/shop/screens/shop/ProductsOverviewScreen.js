import React from "react";
import {FlatList, ScrollView, View, Text, StyleSheet} from "react-native";
import {useSelector} from "react-redux";


const ProductsOverviewScreen = () => {
    const products = useSelector(state => state.products.availableProducts);
    
    return (
        <FlatList 
            data={products} 
            keyExtractor={item => item.id}
            renderItem={itemData => <Text>{itemData.item.title}</Text>}
        />
    );
};

ProductsOverviewScreen.navigationOptions = {
    headerTitle: "All products"
};

styles = StyleSheet.create({});

export default ProductsOverviewScreen;