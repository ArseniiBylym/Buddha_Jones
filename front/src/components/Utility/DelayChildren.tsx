import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

interface DelayChildrenProps {
    isMounted: boolean;
    delayMount?: number;
    delayUnmount?: number;
    children(props: { isMounted?: boolean }): JSX.Element;
}

@observer
export class DelayChildren extends React.Component<DelayChildrenProps, {}> {
    @observable private isMounted: boolean =
        this.props.isMounted && (typeof this.props.delayMount === 'undefined' || this.props.delayMount <= 0)
            ? true
            : false;

    private delayedMount: NodeJS.Timer | null = null;
    private delayedUnmount: NodeJS.Timer | null = null;

    public componentWillReceiveProps(nextProps: DelayChildrenProps) {
        if (this.props.isMounted !== nextProps.isMounted) {
            if (nextProps.isMounted) {
                this.toggleState(true, typeof nextProps.delayMount === 'number' ? nextProps.delayMount : 0);
            } else {
                this.toggleState(false, typeof nextProps.delayUnmount === 'number' ? nextProps.delayUnmount : 0);
            }
        }
    }

    public componentWillUnmount() {
        this.clearTimeouts();
    }

    public render() {
        if (this.isMounted === false) {
            return null;
        }

        return this.props.children({ isMounted: this.props.isMounted });
    }

    private toggleState = (isMounted: boolean, withDelay: number) => {
        if (withDelay <= 0) {
            this.isMounted = isMounted;
            return;
        }

        setTimeout(() => {
            this.isMounted = isMounted;
        }, withDelay);
    };

    private clearTimeouts = () => {
        if (this.delayedMount) {
            clearTimeout(this.delayedMount);
        }

        if (this.delayedUnmount) {
            clearTimeout(this.delayedUnmount);
        }
    };
}
