import React, {useState} from "react";
import { ScrollView, View,Button, Text, TextInput, StyleSheet, Image, Alert} from "react-native";
import Colors from "../constants/Colors";
import * as ImgPicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const ImagePicker = props => {
    const [pickedImage, setPickedImage] = useState();

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if (result.status !== 'granted') {
            Alert.alert('Insufficient permissions', 'You need to grant camera permissions', [{'text': 'ok'}]);
            return false;
        }
        return true;
    
    };
    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await ImgPicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.4
        });
        setPickedImage(image.uri);
        props.onImageTaken(image.uri);
    };
    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!pickedImage ? <Text>No image picked yet.</Text> :
                <Image style={styles.image} source={{uri: pickedImage}}/>}
            </View>
            <Button title="Take Image" color={Colors.primary} onPress={takeImageHandler}/> 
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',

    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default ImagePicker;