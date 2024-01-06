"use client";

import { useState, useEffect } from "react";
import ClientRouter from "@/feat/ClientRouter";


interface Props {
  params: { lang: string };
}

/**
 * Main app
 */
export default function MainApp(props: Props) {
    const [isClient, setRender] = useState(false);
    useEffect(() => setRender(true), []);

    if(!isClient) {
        return <div className={"flex flex-1 items-center justify-center"}>loading</div>;
    }

    return <ClientRouter params={props.params}/>;
}
