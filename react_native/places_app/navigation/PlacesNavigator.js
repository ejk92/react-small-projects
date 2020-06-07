import {Platform} from "react-native";
import { createAppContainer } from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";

import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import PlacesListScreen from "../screens/PlacesListScreen";
import MapScreen from "../screens/MapScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import Colors from "../constants/Colors";


const PlacesNavigator = createStackNavigator({
    Places: PlacesListScreen,
    PlaceDetail: PlaceDetailScreen,
    Map: MapScreen,
    NewPlace: NewPlaceScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ""
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
    
});


export default createAppContainer(PlacesNavigator);