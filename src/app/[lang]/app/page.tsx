import { Metadata } from "next";
import MainApp from "@/feat/main";
import Link from "@/components/navigation/Link";


interface Props {
  params: { lang: string };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    return {
        title: `main-app-${props.params.lang}`,
        description: `main page description ${props.params.lang}`,
        other: {
            "custom-header": "custom-next-app",
        },
    };
}

/**
 * The main app page is hybrid meaning it mixes static generation with client side rendering & client side routing
 * /[lang]/app/**
 *
 */
export default function Page(props: Props) {
    return (
        <div className={"flex flex-1 flex-col"}>
            <header>
                <nav className="flex h-16 min-h-[4rem] flex-row bg-purple-900  items-center">
                    <div className={"w-36 pl-8"}>
                        <Link keepDefaultBehaviour={true} href={`/${props.params.lang}`} className={"text-2xl text-red-600"}>
                  HOME
                        </Link>
                    </div>

                    <div className={"flex flex-1  justify-center "}>
                        <Link href={`/${props.params.lang}/app/featA`} className={"text-xl text-white ml-8"}>
                  FeatA
                        </Link>

                        <Link href={`/${props.params.lang}/app/featB`} className={"text-xl text-white ml-8"}>
                  FeatB
                        </Link>

                    </div>
                    <div className={"w-36 text-white"}/>
                </nav>
            </header>

            <main className={"flex flex-1"}>
                <MainApp params={props.params}/>
            </main>

            <footer className={"flex pt-4 pb-4 flex-col bg-purple-900 justify-center items-center"}>
                <Link href={"https://github.com/dopey2"} rel="author" className={"text-white"}>@Github</Link>
            </footer>
        </div>
    );
}
