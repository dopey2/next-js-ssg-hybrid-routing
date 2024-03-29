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
    private static nextId: number = 0;
    private id!: string;

    constructor(props: Props) {
        super(props);
        this.state = { isMatch: false };
        this.id = Route.nextId.toString();
        Route.nextId++;
    }

    componentDidMount() {
        BrowserRouter.registerListener(this.id, this.onHistoryChange.bind(this));
    }

    componentWillUnmount() {
        BrowserRouter.removeListener(this.id);
    }

    onHistoryChange(href: string) {
        const regex = new RegExp(this.props.path);
        // TODO Improve the test to handle more complex scenarios
        const isMatch = regex.test(href);
        this.setState({ isMatch });
    }

    render() {
        return this.state.isMatch
            ? this.props.children
            : null;
    }
}
