import i18n from "i18next";


/**
 * Use this initialization function in your SPA
 * @param locale
 */
export const initI18nClient = async(locale: string) => {
    const translationModule = await import(`./resources/${locale}/i18n_${locale}.ts`);
    const translation = translationModule.default;
    const config = {
        resources: {
            [locale]: { translation },
        },
        lng: locale,
        fallbackLng: locale,
        debug: false,
    };

    await i18n.init(config);
};
