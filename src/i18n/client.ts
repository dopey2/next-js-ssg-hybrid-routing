import i18n from "i18next";
import i18n_fr from "./resources/fr/i18n_fr.json";
import i18n_en from "./resources/en/i18n_en.json";


export const initI18nClient = async(locale: string) => {

    const config = {
        resources: {
            fr: { translation: i18n_fr },
            en: { translation: i18n_en },
        },
        lng: locale,
        fallbackLng: locale,
        debug: false,
    };

    await i18n.init(config);
};
