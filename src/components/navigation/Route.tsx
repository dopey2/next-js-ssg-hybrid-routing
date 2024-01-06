import React from "react";
import BrowserRouter from "@/components/navigation/Router";


interface Props {
  path: string;
  children: React.ReactElement | string;
}

interface State {
  isMatch?: boolean;
}

export default class Route extends React.PureComponent<Props, State> {
    private id!: string;
    constructor(props: Props) {
        super(props);
        this.state = { isMatch: false };
        this.id = Route._nextId.toString();
        Route._nextId++;
    }
    componentDidMount() {
        BrowserRouter.registerListener(this.id, this.onHistoryChange.bind(this));
    }
    componentWillUnmount() {
        BrowserRouter.removeListener(this.id);
    }
    onHistoryChange(href: string) {
        const regex = new RegExp(href);
        // TODO Improve the test to handle more complex scenarios
        const isMatch = regex.test(this.props.path);
        this.setState({ isMatch });
    }
    render() {
        return this.state.isMatch
            ? this.props.children
            : null;
    }
    private static _nextId: number = 0;

    
}
