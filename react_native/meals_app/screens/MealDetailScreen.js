import React, {useCallback, useEffect} from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import {useSelector, useDispatch} from "react-redux";

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import { toggleFavourite } from "../store/actions/meals";

const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    )
}

const MealDetailScreen = props => {
    const mealId = props.navigation.getParam("mealId");
    const availableMeals = useSelector(state => state.meals.meals)
    const selectedMeal = availableMeals.find(meal => meal.id === mealId);
    const currentMealIsFavorite = useSelector(state =>
        state.meals.favouriteMeals.some(meal => meal.id === mealId)
      );
    const dispatch = useDispatch();

    const toggleFavouriteHandler = useCallback(() => {
        dispatch(toggleFavourite(mealId));
    }, [dispatch, mealId]);

    useEffect(() => {
        props.navigation.setParams({toggleFav: toggleFavouriteHandler})
    }, [toggleFavouriteHandler]);

    useEffect(() => {
        props.navigation.setParams({ isFav: currentMealIsFavorite });
      }, [currentMealIsFavorite]);

    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity}</DefaultText>
                <DefaultText>{selectedMeal.affordability}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredient => (
                <ListItem key={ingredient}>{ingredient}</ListItem>
            ))}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step => (<ListItem key={step}>{step}</ListItem>))}
        </ScrollView>
    )
};

MealDetailScreen.navigationOptions = navigationData => {
    const mealTitle = navigationData.navigation.getParam("mealTitle");
    const toggleFav = navigationData.navigation.getParam("toggleFav");
    const isFavourite = navigationData.navigation.getParam("isFav");
    return {
        headerTitle: mealTitle,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title="Favorite" 
                    iconName={isFavourite ? 'ios-star' : 'ios-star-outline' }
                    onPress={toggleFav} 
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 200
    },
    details: {
        flexDirection: "row",
        padding: 15,
        justifyContent: "space-around"
    },
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 22,
        textAlign: "center"
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10
    }
});

export default MealDetailScreen;