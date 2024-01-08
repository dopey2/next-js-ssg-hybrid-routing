import i18n from 'i18next';
import i18n_fr from "@/i18n/resources/fr/i18n_fr";
import i18n_en from "@/i18n/resources/en/i18n_en";


const locales = {
    fr: i18n_fr,
    en: i18n_en,
};

/**
 * Use this initialization function on server side, for SSG
 * @param locale
 */
export const initI18nServer = async(locale: string) => {
    //@ts-ignore
    const translation = locales[locale];

    const config = {
        resources: {
            [locale]: {
                translation,
            },
        },
        lng: locale,
        fallbackLng: locale,
        debug: false,
    };

    await i18n.init(config);
};

export default i18n;
