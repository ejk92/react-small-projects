import React, {useState, useEffect, useCallback} from "react";
import {View, Text, ScrollView, StyleSheet, TextInput, Platform, Alert} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {useSelector, useDispatch} from "react-redux";

import CustomHeaderButton from "../../components/UI/HeaderButton";
import * as productsActions from "../../store/actions/products";

const EditProductScreen = props => {
    const productId = props.navigation.getParam("productId");
    const editedProduct = useSelector(state => 
        state.products.userProducts.find(product => product.id === productId)
    );

    const dispatch = useDispatch();

    const getFromProduct = (product, param) => product ? product[param] : "";

    const [name, setName] = useState(getFromProduct(editedProduct, "name"));
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState(getFromProduct(editedProduct, "imageUrl"));
    const [description, setDescription] = useState(getFromProduct(editedProduct, "description"));

    const submitHandler = useCallback(() => {
        if (editedProduct) {
            dispatch(productsActions.updateProduct(productId, name, description, imageUrl));
        } else {
            dispatch(productsActions.createProduct(name, description, imageUrl, +price));
        }
        props.navigation.goBack();
    }, [dispatch, productId, name, description, imageUrl, price]);

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    }, [submitHandler])

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                        style={styles.input}
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput 
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={text => setImageUrl(text)}
                    />
                </View>
                {editedProduct ? null : <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput 
                        style={styles.input}
                        value={price}
                        onChangeText={text => setPrice(text)}
                    />
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                        style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam("submit");
    return {
        headerTitle: navData.navigation.getParam("productId") ? "Edit product" : "Add product",
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item 
                        title='Save' 
                        iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} 
                        onPress={submitFn}
                    />
                </HeaderButtons>
            )
        }
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    }
});

export default EditProductScreen;