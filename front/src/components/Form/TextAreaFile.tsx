import * as React from 'react';
import * as styles from './TextAreaFile.scss';
import { observer } from 'mobx-react'; 
import * as classNames from 'classnames';

interface TextAreaFileProps {
    config: {
        textareaValue: string,
        textareaEmpty: boolean,
    };
    textareaOnFocusHandler: () => void;
    textareaOnBlurHandler: () => void;
    textareaOnChangeHandler: (e: any) => void;
}

@observer
class TextAreaFile extends React.Component<TextAreaFileProps, {}> {

    render() {
        return(
            <div className={styles.TextAreaFile}>
                <textarea 
                    value={this.props.config.textareaEmpty ? 'PASTE FILE NAMES HERE' : this.props.config.textareaValue}
                    onFocus={this.props.textareaOnFocusHandler} 
                    onBlur={this.props.textareaOnBlurHandler}
                    onChange={this.props.textareaOnChangeHandler} 
                    className={classNames(styles.textArea, {[styles.textArea__empty]: this.props.config.textareaEmpty})}
                />
            </div>
        );
    }
}

export default TextAreaFile;