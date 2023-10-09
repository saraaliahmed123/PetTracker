import {React} from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from "@expo/vector-icons";
import { Platform } from 'react-native';

const Add = ({onPress}) => {

    let platform = Platform.OS
    
    return (
        <View style={ Platform.OS === 'web' ? styles.addW : styles.add}>
        <TouchableOpacity
            style={styles.addButton}
            onPress={
            platform === "web"
            ?
            () => {onPress()}
            :
            onPress
            }
        >
            <AntDesign name="pluscircle" size={Platform.OS === 'web' ? 30 : 48} color="#7494B9" />
            {/* <Image
            style={styles.tinyLogoImage}
              source={{
                uri: item.image,
              }}/> */}
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    add: {
        position: 'absolute',
        right: '5%',
        bottom: '5%',
        height: '9%',
        width: '15%',
    },
    addW:{
        height: '45%',
        width: '7%',
        margin: 20,
    },
    addButton: {
        width: '100%',
        height: '100%',
    },
})

export default Add