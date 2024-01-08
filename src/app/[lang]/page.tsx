import { Metadata } from "next";
import i18n from 'i18next';
import { initI18nServer } from "@/i18n/server";


interface Props {
  params: { lang: string };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    return {
        title: `home ${props.params.lang}`,
        description: `home ${props.params.lang} description`,
        other: {
            "custom-header": "custom-next-app",
        },
    };
}

async function getData(locale: string) {
    await initI18nServer(locale);
}


/**
 * Home page
 */
export default async function HomePage(props: Props) {
    await getData(props.params.lang);

    return (
        <div className={"w-full h-full flex flex-1 flex-col items-center justify-center"}>
            <h1 className={"text-3xl"}>Home page - {props.params.lang.toUpperCase()}</h1>
            <h1 className={"text-3xl"}>{i18n.t("home.welcome")}</h1>

            <a href={`/${props.params.lang}/app/featA`}>MAIN APP URL</a>
        </div>
    );
}
