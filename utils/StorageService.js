import AsyncStorage from "@react-native-async-storage/async-storage";

const StorageKeys = {
    APP_LANGUAGE: 'APP_LANGUAGE',
    USER: '@user'
}

function getItem(key) {
    return AsyncStorage.getItem(key)
        .then((i) => {
            return JSON.parse(i);
        })
        .catch((e) => console.log(e.message, e));
}

function saveItem(key, item) {
    return AsyncStorage
        .setItem(key, JSON.stringify(item))
        .then((value) => item);
}

function clear() {
    return AsyncStorage.clear();
}

function deleteItem(key) {
    return AsyncStorage.removeItem(key);
}

const StorageService = {
    ...StorageKeys,
    getItem,
    saveItem,
    clear,
    deleteItem,
}

export default StorageService;