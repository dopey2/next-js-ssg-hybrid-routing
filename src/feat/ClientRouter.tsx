import { ThemeProvider } from "@material-tailwind/react";
import BrowserRouter from "@/components/navigation/Router";
import Route from "@/components/navigation/Route";
import FeatA from "@/feat/FeatA";
import FeatB from "@/feat/FeatB";


interface Props {
  params: { lang: string };
}

export default function ClientRouter(props: Props) {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Route path={`/${props.params.lang}/app/featA`}>
                    <FeatA/>
                </Route>
                <Route path={`/${props.params.lang}/app/featB`}>
                    <FeatB/>
                </Route>
            </BrowserRouter>
        </ThemeProvider>
    );
}
