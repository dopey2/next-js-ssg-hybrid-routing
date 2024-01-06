"use client";

import React, { ReactNode } from "react";


type HistoryApi = (href: string) => void;
let historyApiExternalRef: HistoryApi = (href: string) => {
    window.history.pushState({}, "", href);
};

let _externalUpdateListeners = () => {};

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
        _externalUpdateListeners();
    }
    public static removeListener(id: string): void {
        delete BrowserRouter.listeners[id];
    }
    public static pushHistory(href: string) {
        historyApiExternalRef(href);
    }
    private href: string = "";
    
    
    constructor(props: {}) {
        super(props);
        this.state = { isClient: false };
    }
    

    componentDidMount() {
        this.setState({ isClient: true });
        historyApiExternalRef = this.onHistory.bind(this);
        _externalUpdateListeners = this.externalUpdateListeners.bind(this);
        this.href = new URL(window.location.href).pathname;
        this.updateListeners();
    }

    private onHistory(href: string) {
        console.log("on history", href);
        window.history.pushState({}, "", href);
        this.href = href;
        this.updateListeners();
    }

    private externalUpdateListeners() {
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
