import Sound from "react-native-sound";
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { LOGIN_TYPE } from "./variables";
import StorageService from "./StorageService";

function getRandomNumbersArray(numberOfItems: number): number[] {
  const randomNumbers: number[] = [];

  for (let i = 0; i < numberOfItems; i++) {
    const randomNumber = Math.floor(Math.random() * 100);
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}


//Sound Util
const pauseAudio = (audio:Sound) => {
  if(audio) {
    if(audio.isPlaying()){
      audio.stop();
    }
  }
}

const playingAudio = (audio:Sound, url: string) => {
  if(audio){
    if(audio.isPlaying()){
      audio.stop();
    }
  }
  Sound.setCategory('Playback');

  audio = new Sound(
    url,
    null,
    error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      // console.log(
      //   'duration in seconds: ' +
      //     audio.getDuration() +
      //     'number of channels: ' +
      //     audio.getNumberOfChannels(),
      // );

      audio.play(success => {
        if (success) {
          console.log('successfully finished playing');
          audio.release();
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    },
  );
  audio.release();    
}

let setPreviousPlayingAudio: React.Dispatch<React.SetStateAction<boolean>> | null = null;
const setPreviousPlayingAudioHandler = (setPreviousPlayingAudioParam: React.Dispatch<React.SetStateAction<boolean>>) => {
  setPreviousPlayingAudio = setPreviousPlayingAudioParam;
}
const stopPreviousPlayingAudioHandler = (setPreviousPlayingAudioParam: React.Dispatch<React.SetStateAction<boolean>>) => {
  if(setPreviousPlayingAudio !== null) {
    setPreviousPlayingAudio(false);
  }
}

const appStateUnfocus = (AppState:any, callback: () => void) => {
  return AppState.addEventListener('change', nextAppState => {
    if (
      AppState.currentState.match(/inactive|background/) &&
      nextAppState === 'background'
    ) {
      callback();
    }
  });
}

const onAppleButtonPress = async (setUser: any) => {

  try {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      //console.log(appleAuthRequestResponse);
      let appleEmail = appleAuthRequestResponse.email ? appleAuthRequestResponse.email : "";

      // if(appleEmail) {
      //   await StorageService.saveItem(StorageService.APPLE_EMAIL, appleEmail);
      // } else {
      //   appleEmail = await StorageService.getItem(StorageService.APPLE_EMAIL);
      // }

      if(!appleEmail) {
        //get id if apple user doesn't want to share their email
        appleEmail = appleAuthRequestResponse.user ? appleAuthRequestResponse.user : "";
      }

      const appleUserData = {
        "idToken": appleAuthRequestResponse.identityToken,
        "nonce": appleAuthRequestResponse.nonce,
        "loginType": LOGIN_TYPE.APPLE,
        "user": {
          "email": appleEmail,
          "firstName": appleAuthRequestResponse?.fullName?.familyName ? appleAuthRequestResponse.fullName.familyName : "",
          "lastName": appleAuthRequestResponse?.fullName?.givenName ? appleAuthRequestResponse.fullName.givenName : "",
          "name": "",
          "googleId": "",
          "imageUrl": ""
        }
      }
      
      setUser(appleUserData);
    }
  } catch (error) {
    console.log(error);
  }
}

export { 
  getRandomNumbersArray, 
  playingAudio, 
  pauseAudio, 
  setPreviousPlayingAudioHandler,
  stopPreviousPlayingAudioHandler,
  appStateUnfocus,
  onAppleButtonPress
}

