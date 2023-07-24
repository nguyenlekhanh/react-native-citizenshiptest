import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserInfo = async (token, setUserInfo) => {
    if(!token) return;
    try {
        const response = await fetch(
            "https://www.googleapis.com/userinfo/v2/me",
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        const user = await response.json();
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        setUserInfo(user);
    } catch(error) {

    }
}