import React from "react";
import {
    ScrollView,
    Button,
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import {useSelector} from "react-redux";

import Colors from "../../constants/Colors";

const ProductDetailsScreen = props => {

    const productId = props.navigation.getParam("productId");
    const selectedProduct = useSelector(state => 
        state.products.availableProducts.find(product => product.id === productId));

    return (
        <View>
            <ScrollView>
                <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
                <View style={styles.actions}>
                    <Button color={Colors.primary} title="Add to cart" onPress={() => {}}/>
                </View>
                <Text style={styles.price} >${selectedProduct.price}</Text>
                <Text style={styles.description}>{selectedProduct.description}</Text>
            </ScrollView>
        </View>
    )
};

ProductDetailsScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam("productName")
    }
}


const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300
    },
    price: {
        fontSize: 20,
        color: "#888",
        textAlign: "center",
        marginVertical: 20,
        fontFamily: "open-sans-bold"

    },
    description: {
        fontSize: 14,
        textAlign: "center",
        marginHorizontal: 20
    },
    actions: {
        marginVertical: 10,
        alignItems: "center"
    }
});

export default ProductDetailsScreen;