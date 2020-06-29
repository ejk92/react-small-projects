import React, {useState, useEffect, useCallback, useReducer} from "react";
import {View, Text, ScrollView, StyleSheet, TextInput, Platform, Alert, ActivityIndicator} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {useSelector, useDispatch} from "react-redux";

import CustomHeaderButton from "../../components/UI/HeaderButton";
import * as productsActions from "../../store/actions/products";
import Input from "../../components/UI/Input";
import { Colors } from "react-native/Libraries/NewAppScreen";

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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const productId = props.route.params ? props.route.params.productId : null;
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

    useEffect(() => {
        if (error) {
            Alert.alert("An error occured", error, [{text: "OK"}])
        }
    }, [error]);

    const submitHandler = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert("Wrong input", "Please check the errors in the form", [{text: "Okay"}]);
            //return;
        };
        setIsLoading(true);
        setError(null);
        try {
            if (editedProduct) {
                await dispatch(productsActions.updateProduct(
                    productId, 
                    formState.inputValues.name, 
                    formState.inputValues.description, 
                    formState.inputValues.imageUrl
                ));
            }   else {
                await dispatch(productsActions.createProduct(
                    formState.inputValues.name, 
                    formState.inputValues.description, 
                    formState.inputValues.imageUrl, 
                    +formState.inputValues.price
                ));
            }
            props.navigation.goBack();
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
        
    }, [dispatch, formState]);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item 
                            title='Save' 
                            iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} 
                            onPress={submitHandler}
                        />
                    </HeaderButtons>
                )
            }
        })
    }, [submitHandler]);


    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue, 
            isValid: inputValidity, 
            input: inputIdentifier
        });
    }, [dispatchFormState]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }
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

export const screenOptions = navData => {

    const routeParams = navData.route.params ? navData.route.params : null;
    return {
        headerTitle: routeParams.productId ? "Edit product" : "Add product",
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default EditProductScreen;