import { Metadata } from "next";


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

/**
 * Home page
 */
export default function HomePage(props: Props) {
    return (
        <div className={"w-full h-full flex flex-1 flex-col items-center justify-center"}>
            <h1 className={"text-3xl"}>Home page {props.params.lang}</h1>
            <a href={`/${props.params.lang}/app/featA`}>MAIN APP URL</a>
        </div>
    );
}
