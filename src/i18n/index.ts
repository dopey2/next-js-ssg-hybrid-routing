import i18n from 'i18next';


export const initI18n = async(locale: string) => {
    const translationModule = await import(`./resources/${locale}/i18n_${locale}.json`);
    const translation = translationModule;

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
