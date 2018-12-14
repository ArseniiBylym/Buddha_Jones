import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';

// Styles
require('./Icon.css');

// Props
export interface IconProps {
    className?: string | null;
    width?: number | null;
    height?: number | null;
    backgroundSize?: string | null;
    marginLeft?: number | null;
    marginLeftAuto?: boolean;
    marginRight?: number | null;
    marginRightAuto?: boolean;
    marginTop?: number | null;
    marginTopAuto?: boolean;
    marginBottom?: number | null;
    marginBottomAuto?: boolean;
    transform?: string | null;
}

interface IconStrictProps extends IconProps {
    iconName: string;
}

// State
export interface IconState {
    iconName: string;
}

// Component
@observer
export class Icon extends React.Component<IconStrictProps, IconState> {
    static get defaultProps(): IconStrictProps {
        return {
            iconName: '',
            className: null,
            width: null,
            height: null,
            backgroundSize: null,
            marginLeft: null,
            marginLeftAuto: false,
            marginRight: null,
            marginRightAuto: false,
            marginTop: null,
            marginTopAuto: false,
            marginBottom: null,
            marginBottomAuto: false,
            transform: null,
        };
    }

    constructor(props: IconStrictProps) {
        super(props);

        this.state = {
            iconName: this.props.iconName
                ? this.props.iconName
                : this && this.constructor && this.constructor.name
                    ? this.constructor.name
                    : '',
        };
    }

    public render() {
        return (
            <i
                className={classNames('icon', this.state.iconName, this.props.className)}
                style={{
                    backgroundSize: this.props.backgroundSize
                        ? this.props.backgroundSize
                        : this.props.width && this.props.height
                            ? this.props.width + 'px ' + this.props.height + 'px'
                            : null,
                    width: this.props.width ? this.props.width + 'px' : null,
                    height: this.props.height ? this.props.height + 'px' : null,
                    marginLeft: this.props.marginLeftAuto
                        ? 'auto'
                        : this.props.marginLeft
                            ? this.props.marginLeft + 'px'
                            : null,
                    marginRight: this.props.marginRightAuto
                        ? 'auto'
                        : this.props.marginRight
                            ? this.props.marginRight + 'px'
                            : null,
                    marginTop: this.props.marginTopAuto
                        ? 'auto'
                        : this.props.marginTop
                            ? this.props.marginTop + 'px'
                            : null,
                    marginBottom: this.props.marginBottomAuto
                        ? 'auto'
                        : this.props.marginBottom
                            ? this.props.marginBottom + 'px'
                            : null,
                    transform: this.props.transform ? this.props.transform : null,
                }}
            />
        );
    }
}
