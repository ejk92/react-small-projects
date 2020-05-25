import React from "react";
import {View, StyleSheet} from "react-native";
import {useSelector} from "react-redux";

import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import DefaultText from "../components/DefaultText";


const CategoryMealsScreen = props => {
    const availableMeals = useSelector(state => state.meals.filteredMeals);

    const catId = props.navigation.getParam('categoryId');    
    const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0);

    if (displayedMeals.length === 0) {
        return <View style={styles.content}><DefaultText>No meals found. Maybe check your filters</DefaultText></View>
    }

    return <MealList listData={displayedMeals} navigation={props.navigation} />    

};

CategoryMealsScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
    return {
        headerTitle: selectedCategory.title,
    }
};


const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default CategoryMealsScreen;