"use client";

import React, { ReactNode } from "react";


let BrowserRouterInstance: BrowserRouter | null = null;

interface Props {
  children ?: ReactNode
}

interface State {
  isClient: boolean;
}


type HistoryChangeCallback = (href: string) => void;
interface HistoryListeners {
  [key: string]: HistoryChangeCallback
}

export default class BrowserRouter extends React.PureComponent<Props, State> {
    private static listeners: HistoryListeners = {};

    public static registerListener(id: string, callback: HistoryChangeCallback): void {
        BrowserRouter.listeners[id] = callback;
        BrowserRouterInstance?.updateListeners();
    }

    public static removeListener(id: string): void {
        delete BrowserRouter.listeners[id];
    }

    public static pushHistory(href: string) {
        BrowserRouterInstance?.onHistory(href);
    }

    // TODO improve this later, check for host/pathname/query etc
    // TODO keep track of initial url to detect when the client leave the site (link to external url)
    private href: string = "";

    constructor(props: {}) {
        super(props);
        this.state = { isClient: false };

        this.onHistory = this.onHistory.bind(this);
        this.updateListeners = this.updateListeners.bind(this);
    }


    componentDidMount() {
        BrowserRouterInstance = this;
        this.setState({ isClient: true });
        this.href = new URL(window.location.href).pathname;
        this.updateListeners();
    }

    private onHistory(href: string) {
        window.history.pushState({}, "", href);
        this.href = href;
        this.updateListeners();
    }

    private updateListeners(): void {
        for(const key in BrowserRouter.listeners) {
            const callback = BrowserRouter.listeners[key];
            callback(this.href);
        }
    }

    render() {
        return this.props.children;
    }
}
