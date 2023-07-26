// import * as RNLocalize from "react-native-localize";

import StorageService from "./StorageService";

import en from "../localization/en";
import vn from "../localization/vn";

// http://www.lingoes.net/en/translator/langcode.htm

/**
 * Language Localization class 
 */
export default class LanguageUtils {
  /**
   * list of all languages which we wan to apply in app
   */
  static languages = {
      english: "english",
      vietnam: "vietnam",
  }

  /**
   * @const for change language globally
   */
  static changeLanguageGlobal = "CHANGE_LANGUAGE_GLOBAL"

  /**
   * list of locales for all languages
   */
  static positionLocales = ['en', "vn-VN"]

  /**
   * @returns current selected language in app.
   */
  static currentAppLanguage = this.setAppLangaugeFromDeviceLocale(true);

  /**
   * @param {*} needToGetLang 
   * set the default language from device locales  
   */
  static setAppLangaugeFromDeviceLocale(needToGetLang) {
      // let deviceLocale = RNLocalize.findBestAvailableLanguage(this.positionLocales);

      // const languageTag = deviceLocale?.languageTag || "en"

      // const isGujDetected = this.positionLocales.find((locale) => 'vn-VN' === languageTag);

      // const language = isGujDetected
      //     ? this.languages.vietnam : this.languages.english;

      // if (needToGetLang) {
      //     return language;
      // }

      const language = this.languages.vietnam;
      this.setAppLangauge(language);
  }

  /**
   * set the language from device local storage 
   * App will select language from local storage and will set as Default language for app.
   * if language not found from storage then will select from device locales.
   */
  static async setAppLangaugeFromDeviceStorage() {
      const language = await StorageService.getItem(StorageService.APP_LANGUAGE);
      console.log("language", language);
      if (language) {
          this.setAppLangauge(language);
      } else {
          this.setAppLangaugeFromDeviceLocale();
      }
  }

  /**
   * 
   * @param {*} language 
   * sets the app language in app
   */
  static async setAppLangauge(language) {
      this.currentAppLanguage = language;
      await StorageService.saveItem(StorageService.APP_LANGUAGE, language);
  }

  /**
   * 
   * @param {*} key 
   * @returns the string value of key in selected language
   */
  static getLangText(key) {
      if (this.currentAppLanguage === this.languages.english) {
          return en[key];
      }

      return vn[key];
  }
}