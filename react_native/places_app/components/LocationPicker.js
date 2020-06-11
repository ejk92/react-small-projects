import React, { useState, useEffect } from "react";
import {View, Button, Text, ActivityIndicator, Alert, StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';
import* as Location from 'expo-location';

import Colors from "../constants/Colors";


const LocationPicker = props => {
    const [pickedLocation, setPickedLocation] = useState();
    const [isFetching, setIsFetching] = useState(false);
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert('Insufficient permissions', 'You need to grant location permissions', [{'text': 'ok'}]);
            return false;
        }
        return true;
    
    };

    const mapPickedLocation = props.navigation.getParam('pickedLocation');

    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation);
        }
    }, [mapPickedLocation])

    const pickOnMapHandler = () => {
        props.navigation.navigate('Map');
    }

    const getLocationHandler = async () => {
        setIsFetching(true);
        const hasPermissions = await verifyPermissions;
        if (!hasPermissions) {
            return;
        }

        try {
            const location = await Location.getCurrentPositionAsync({timeout: 5000});
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });

        } catch (err) {
            Alert.alert("Could not fetch location", 'Please try again liater', [{text: 'okay'}]);
        }
        setIsFetching(false);
    };

    return (
        <View style={styles.locationPicker}>
            <View style={styles.mapPreview}>
                {isFetching ? <ActivityIndicator  size="large" color={Colors.primary} /> : <Text>No location chosen</Text>}
            </View>
            <View style={styles.actions}>
                <Button title="Get user location" color={Colors.primary} onPress={getLocationHandler}/>
                <Button title="Pick on map" color={Colors.primary} onPress={pickOnMapHandler}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    locationPicker: {
        margin: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});


export default LocationPicker;