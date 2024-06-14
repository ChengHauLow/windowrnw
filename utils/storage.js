import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value, isObject) => {
    try {
        if(isObject){
            value = JSON.stringify(value)
        }
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        // saving error
        return false
    }
};


export const getData = async (key, isObject) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return isObject ? JSON.parse(value) : value;
    } catch (e) {
        // error reading value
        return false
    }
};