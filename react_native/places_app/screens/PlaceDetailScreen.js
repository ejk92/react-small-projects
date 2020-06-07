import React from "react";
import { View, Text, StyleSheet} from "react-native";


const PlaceDetailScreen = props => {
    return <View style={styles.screen}>
        <Text>PlaceDetailScreen</Text>
    </View>
}

PlaceDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('title')
    }
}

const styles = StyleSheet.create({});

export default PlaceDetailScreen;