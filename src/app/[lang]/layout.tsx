import "@/styles/index.css";
import "@/styles/tailwind.output.css";


interface Params {
  lang: string;
}

interface Props {
  children: React.ReactNode;
  params: Params
}

export async function generateStaticParams(): Promise<Array<Params>> {
    return [
        { lang: "en" },
        { lang: "fr" }
    ];
}

const getAlternateHrefUrls = (lang: string) => {
    const hrefUrls = [
        {
            lang: "fr",
            hrefLang: "fr-FR",
            href: "https://www.localhost:3000/fr",
        },
        {
            lang: "en",
            hrefLang: "en-US",
            href: "https://www.localhost:3000/en",
        }
    ];

    return hrefUrls.filter((l) => l.lang !== lang);
};

export default function RootLayout(props: Props) {
    const alternateHrefUrl = getAlternateHrefUrls(props.params.lang);

    return (
        <html lang={props.params.lang}>
            {alternateHrefUrl.map((data) => (
                <link key={data.hrefLang} rel="alternate" hrefLang={data.hrefLang} href={data.href} />
            ))}

            <body>
                <div id="root" className={"w-full h-full flex flex-1 flex-col"}>
                    {props.children}
                </div>
            </body>
        </html>
    );
}
