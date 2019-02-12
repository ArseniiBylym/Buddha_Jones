import { AsyncHandler } from 'helpers/AsyncHandler';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { FetchQueryChildrenProps } from './FetchQuery';

interface Props<R> {
    mockResponses: R[];
    simulateLoadingDelay?: number;
    children(props: FetchQueryChildrenProps<R>[]): JSX.Element;
}

@observer
export class FetchQueryMock<R> extends React.Component<Props<R>, {}> {
    static get defaultProps(): Partial<Props<{}>> {
        return {
            mockResponses: [],
            simulateLoadingDelay: 2000,
        };
    }

    @observable private isLoading: boolean = true;

    componentDidMount() {
        this.stopLoading(this.props.simulateLoadingDelay || 0);
    }

    public render() {
        return this.props.children(
            this.props.mockResponses.map(response => ({
                loading: this.isLoading,
                fetchError: false,
                retry: () => this.simulateRetry(),
                response,
            }))
        );
    }

    private simulateRetry = async () => {
        try {
            this.isLoading = true;
            setTimeout(() => {
                this.isLoading = false;
            }, 3000);
        } catch (error) {
            console.error(error);
        }
    };

    private stopLoading = async (timeout: number = 0) => {
        try {
            await AsyncHandler.timeout(timeout);
            this.isLoading = false;
        } catch (error) {
            console.error(error);
        }
    };
}
