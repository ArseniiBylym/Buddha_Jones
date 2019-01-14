import * as classNames from 'classnames';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as zenscroll from 'zenscroll';
import { DurationCounterDropdownEntry, DurationCounterDropdownOptions } from './DurationCounter';

const s = require('./DurationCounterDropdown.css');

interface DurationCounterDropdownProps {
    onClick: (value: number | string | boolean) => void;
    options: DurationCounterDropdownOptions | null;
    isMounted?: boolean;
}

@observer
export class DurationCounterDropdown extends React.Component<DurationCounterDropdownProps, {}> {
    @observable private show: boolean = false;
    @observable private optionsCopy: DurationCounterDropdownOptions | null = null;

    @computed private get addedOptionsList(): DurationCounterDropdownEntry[] {
        if (this.optionsCopy === null) {
            return [];
        }

        return this.optionsCopy.optionsList;
    }

    private dropdown: HTMLDivElement | null = null;

    private minWidth: number = 128;
    private buttonHeight: number = 36;

    public componentDidMount() {
        this.optionsCopy = this.props.options;

        setTimeout(() => {
            this.show = true;

            if (this.dropdown) {
                const scroller = zenscroll.createScroller(this.dropdown, 128, this.buttonHeight);
                const list = this.dropdown.firstElementChild;
                if (list) {
                    const entries = list.getElementsByTagName('li');
                    if (entries && entries[0]) {
                        for (let i = 0; i < entries.length; i++) {
                            const entry = entries[i];
                            if (entry.className === s.active && scroller) {
                                scroller.center(entry);
                                break;
                            }
                        }
                    }
                }
            }
        }, 8);
    }

    public componentWillReceiveProps(nextProps: DurationCounterDropdownProps) {
        if (typeof this.props.isMounted !== 'undefined' && typeof nextProps.isMounted !== 'undefined') {
            if (nextProps.isMounted === false && nextProps.isMounted !== this.props.isMounted) {
                this.show = false;
            }
        }

        if (nextProps.options) {
            this.optionsCopy = nextProps.options;
        }
    }

    public render() {
        if (this.optionsCopy === null) {
            return null;
        }

        let {
            optionsCopy: { optionsList, positionX, positionY, width, height },
        } = this;

        if (optionsList.length <= 0) {
            return null;
        }

        // Ensure dropdown is at least of minimum width
        if (width < this.minWidth) {
            const diff = this.minWidth - width;
            positionX -= diff / 2;

            if (positionX < 0) {
                positionX = 0;
            }
        }

        // Ensure reasonable usable height
        // TODO: Add calculation for dynamic content
        height += 256;
        positionY -= 128;

        // Render portal
        return ReactDOM.createPortal(
            <div
                ref={this.referenceDropdown}
                className={classNames(s.dropdown, { [s.open]: this.show })}
                style={{ position: 'absolute', left: positionX, top: positionY, width, height }}
            >
                <ul>
                    {this.addedOptionsList.map(entry => (
                        <li key={entry.value} className={classNames({ [s.active]: entry.isSelected })}>
                            <button style={{ height: this.buttonHeight }} onClick={this.handleClick(entry.value)}>
                                {entry.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>,
            document.body
        );
    }

    private referenceDropdown = (ref: HTMLDivElement) => (this.dropdown = ref);

    private handleClick = (value: number | string) => (e: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.onClick) {
            this.props.onClick(value);
        }
    };
}
