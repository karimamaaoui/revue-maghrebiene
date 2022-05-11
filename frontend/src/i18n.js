// import i18n from "i18next";
// import Backend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";
// import { initReactI18next } from "react-i18next";

// i18n.use(Backend)
// 	.use(LanguageDetector)
// 	.use(initReactI18next)
// 	.init({
// 		backend: {
// 			// translation file path
// 			loadPath: "/assets/i18n/{{ns}}/{{lng}}.json",
// 		},
// 		fallbackLng: "en",
// 		// disabled in production
// 		debug: false,
// 		// can have multiple namespaces, in case you want to divide a huge
// 		// translation into smaller pieces and load them on demand
// 		ns: ["common", "home", "profile"],

// 		interpolation: {
// 			espaceValue: false,
// 			formatSeparator: ",",
// 		},
// 		react: {
// 			wait: true,
// 		},
// 	});

// export default i18n;
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation:{
		"welcome": {
			"title": "title",
			"age":"age",
			"email":'email'
			
		}
	}
  },
  fr: {
    translation: {
		"welcome": {
			"title": "titre",
			"age":"age",
			"email":"adresse email"
    }}
  }
};

i18n.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		backend: {
			// translation file path
			loadPath: "/assets/i18n/{{ns}}/{{lng}}.json",
		},
		fallbackLng: "en",
		// disabled in production
		debug: false,
		// can have multiple namespaces, in case you want to divide a huge
		// translation into smaller pieces and load them on demand
		ns: ["common", "home", "profile"],

		interpolation: {
			espaceValue: false,
			formatSeparator: ",",
		},
		react: {
			wait: true,
		},
	});

  export default i18n;