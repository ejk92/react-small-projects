import React from "react";
import {FlatList, ScrollView, View, Text, StyleSheet} from "react-native";
import {useSelector} from "react-redux";

import ProductItem from "../../components/shop/ProductItem";

const ProductsOverviewScreen = () => {
    const products = useSelector(state => state.products.availableProducts);
    
    return (
        <FlatList 
            data={products} 
            keyExtractor={item => item.id}
            renderItem={itemData => 
                <ProductItem 
                    image={itemData.item.imageUrl}
                    name={itemData.item.name}
                    price={itemData.item.price}
                    onViewDetail={()=>{}}
                    onAddToCart={()=>{}}
                />
            }
        />
    );
};

ProductsOverviewScreen.navigationOptions = {
    headerTitle: "All products"
};

styles = StyleSheet.create({});

export default ProductsOverviewScreen;