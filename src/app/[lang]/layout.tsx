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

export default function RootLayout(props: Props) {
    return (
        <html lang={props.params.lang}>
            <link rel="alternate" hrefLang="en-US" href="https://www.localhost:3000/en" />
            <body>
                <div id="root" className={"w-full h-full flex flex-1 flex-col"}>
                    {props.children}
                </div>
            </body>
        </html>
    );
}
