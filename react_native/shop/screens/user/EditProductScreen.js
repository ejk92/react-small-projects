import React, {useEffect, useCallback, useReducer} from "react";
import {View, Text, ScrollView, StyleSheet, TextInput, Platform, Alert} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {useSelector, useDispatch} from "react-redux";

import CustomHeaderButton from "../../components/UI/HeaderButton";
import * as productsActions from "../../store/actions/products";
import Input from "../../components/UI/Input";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidites = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        
        let updatedFormIsValid = false;    
        for (const key in updatedValidites) {
            updatedFormIsValid = updatedFormIsValid && updatedValidites[key]
        }

        return { 
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidites
        };
    }
    return state
};

const EditProductScreen = props => {
    const productId = props.navigation.getParam("productId");
    const editedProduct = useSelector(state => 
        state.products.userProducts.find(product => product.id === productId)
    );

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            name: editedProduct ? editedProduct.name : "",
            imageUrl: editedProduct ? editedProduct.imageUrl : "",
            description: editedProduct ? editedProduct.description : "",
            price: ""
        },
        inputValidities: {
            name: editedProduct ? true: false,
            imageUrl: editedProduct ? true: false,
            description: editedProduct ? true: false,
            price:  editedProduct ? true: false
        },
        formIsValid: editedProduct ? true: false
    });


    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert("Wrong input", "Please check the errors in the form", [{text: "Okay"}]);
            return;
        };

        if (editedProduct) {
            dispatch(productsActions.updateProduct(
                productId, 
                formState.inputValues.name, 
                formState.inputValues.description, 
                formState.inputValues.imageUrl
            ));
        } else {
            dispatch(productsActions.createProduct(
                formState.inputValues.name, 
                formState.inputValues.description, 
                formState.inputValues.imageUrl, 
                +formState.inputValues.price
            ));
        }
        props.navigation.goBack();
    }, [dispatch, formState]);

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    }, [submitHandler]);


    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue, 
            isValid: inputValidity, 
            input: inputIdentifier
        });
    }, [dispatchFormState]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <Input 
                    id="name"
                    label="Name"
                    errorText="Please enter a valid name"
                    keyboardType="default"
                    autoCapitalize="sentences"
                    autoCorrect
                    returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.name : ""}
                    initiallyValid={!!editedProduct}
                />
                <Input 
                    id="imageUrl"
                    label="ImageUrl"
                    errorText="Please enter a valid image url"
                    keyboardType="default"
                    returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.imageUrl : ""}
                    initiallyValid={!!editedProduct}
                />
                {editedProduct ? null : 
                    <Input 
                        id="price"
                        label="Price"
                        errorText="Please enter a valid image price"
                        keyboardType="decimal-pad"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                    />
                    }
                <Input 
                    id="description"
                    label="Description"
                    errorText="Please enter a valid image description"
                    keyboardType="default"
                    autoCorrect
                    multiline
                    numberOfLines={3}
                    initialValue={editedProduct ? editedProduct.description : ""}
                    initiallyValid={!!editedProduct}
                    onInputChange={inputChangeHandler}
                />
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
    }
});

export default EditProductScreen;