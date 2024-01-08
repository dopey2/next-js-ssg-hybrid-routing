"use client";

import { useState, useEffect } from "react";
import ClientRouter from "@/feat/ClientRouter";
import { initI18nClient } from "@/i18n/client";


interface Props {
  params: { lang: string };
}

/**
 * Main app
 */
export default function MainApp(props: Props) {
    const [isServer, setRender] = useState(true);
    const [isI18nLoading, setI18nLoading] = useState(true);

    useEffect(() => {
        setRender(false);
        initI18nClient(props.params.lang).then(() => {
            setI18nLoading(false);
        });
    }, []);


    if(isServer || isI18nLoading) {
        return <div className={"flex flex-1 items-center justify-center"}>loading</div>;
    }

    return <ClientRouter params={props.params}/>;
}
