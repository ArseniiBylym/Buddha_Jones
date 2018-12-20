import * as React from 'react';
import * as styles from './TextAreaFile.scss';
import { observer } from 'mobx-react'; 
import { ButtonAdd } from 'components/Button';
import * as classNames from 'classnames';

interface TextAreaFileProps{
    addHandler: (arr: string[]) => void,
}
interface TextAreaFileState{
    value: string,
    empty: boolean
}

@observer
class TextAreaFile extends React.Component<TextAreaFileProps, TextAreaFileState>{

    state = {
        value: '',
        empty: true
    }

    handleFileAdd = () => {
        if(this.state.value) {
            const arr: string[] | null = this.state.value.match(/[^\r\n]+/g)
            if(arr) {
                this.props.addHandler(arr)
            }
        }
        this.setState({
            value: '',
            empty: true,
        })
    }

    onChangeHandler = e => {
        this.setState({
            value: e.target.value,
        })
    }

    onBlurHandler = () => {
        if(!this.state.value) {
            this.setState({
                empty: true
            })
        }
    }

    onFocusHandler = () => {
        if(this.state.empty) {
            this.setState({
                empty: false
            })
        }
    }

    render() {

        return(
            <div className={styles.TextAreaFile}>
                <textarea 
                    value={this.state.empty ? 'PASTE FILE NAMES HERE' : this.state.value}
                    onFocus={this.onFocusHandler} 
                    onBlur={this.onBlurHandler}
                    onChange={this.onChangeHandler} 
                    className={classNames(styles.textArea, {[styles.textArea__empty]: this.state.empty})}
                >
                </textarea>
                <div className={styles.addButtonContainer}>
                    <ButtonAdd
                        onClick={this.handleFileAdd}
                        label="Add list"
                        labelOnLeft={true}
                        float="right"
                    />
                </div>
            </div>
        )
    }
}

export default TextAreaFile