import { Platform } from 'react-native';

export const googleExpoClientId="941001352428-fbo21fnfabg5ruslf6giufujlea2kvu1.apps.googleusercontent.com";
export const googleAndroidClientIdProduction="941001352428-5o71fbh7klqrlb0r0hft6emk4t7h31o6.apps.googleusercontent.com";
export const googleAndroidClientIdDevelopment="544736289646-mdln26sv4jkd1hctd22t0ra7rmktsqo7.apps.googleusercontent.com";
//export const googleIosClientId="941001352428-3jvqfq4mjbfa3me4bsglsc1qff81474q.apps.googleusercontent.com";
export const googleIosClientId="941001352428-3jvqfq4mjbfa3me4bsglsc1qff81474q.apps.googleusercontent.com";
export const googleWebClientId="941001352428-ekedip2lb1eovghgq98dtn5mq1fc6l4i.apps.googleusercontent.com";

export const bannerAdsIos="ca-app-pub-7745252561449149/1842408827";
export const bannerAdsAndroid="ca-app-pub-7745252561449149/7860457612";
export const bannerAds = Platform.OS === 'ios' ? bannerAdsIos : bannerAdsAndroid

export const interstitialAdAdsIos="ca-app-pub-7745252561449149/6520020436";
export const interstitialAdAdsAndroid="ca-app-pub-7745252561449149/7302371643";
export const interstitialAds = Platform.OS === 'ios' ? interstitialAdAdsIos : interstitialAdAdsAndroid

export const version = "1.6"; 
export const serverUrl = __DEV__ ? "https://civics-test-nextjs-6hx9kdy0b-nguyenlekhanh811-gmailcom.vercel.app" : "https://civics-test-nextjs-6hx9kdy0b-nguyenlekhanh811-gmailcom.vercel.app"; 
export const signupWithGoogleUrl = "/api/user/signupWithGoogle/"; 
export const learn_2008 = "/civics/learn/2008"; 
export const test_answer_2008 = "/api/civics/test/answer/2008"; 
export const get_answer = "/api/civics/test/get_answer"; 
export const submit_feedback_url = "/api/contact/feedback"; 