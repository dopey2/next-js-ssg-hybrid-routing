"use client";

import React, { AllHTMLAttributes, AnchorHTMLAttributes } from "react";
import BrowserRouter from "./Router";

interface Props extends AllHTMLAttributes<AnchorHTMLAttributes<any>> {
  href: string;
  className?: string;
  children: string;
  /**
   * If set to true <Link> will act as an <a> element, meaning that client side routing will be disabled, and a location change will trigger a page refresh
   */
  keepDefaultBehaviour?: boolean
}

interface State {
  isClient: boolean;
}

interface AnchorClickProp {
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => any
}


export default class Link extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isClient: false };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.setState({ isClient: true })
  }

  /**
   * The onClick function is only attached to <a> element only when this code run on client side
   * We cancel the default behaviour because we don't want the browser to make a get request & reload the page
   * Instead we use our own historyApi
   * @param e
   * @private
   */
  private onClick(e: React.MouseEvent<HTMLAnchorElement>): void {
    e.preventDefault();
    BrowserRouter.pushHistory(this.props.href)
  }

  render() {
    const clientOnlyProps: AnchorClickProp = {  };
    if(this.state.isClient) { clientOnlyProps.onClick = this.onClick; }
    if(this.props.keepDefaultBehaviour) { clientOnlyProps.onClick = undefined }

    return (
        <a
            href={this.props.href}
            className={this.props.className}
            {...clientOnlyProps}
        >
          {this.props.children}
        </a>
    )
  }
}
