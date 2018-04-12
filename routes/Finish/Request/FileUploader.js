import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionAlertNotify } from './../../../actions/Notifications';
import { Section, Row, Col } from './../../../components/Section';
import Select from './../../../components/Form/Select';
import Radio from './../../../components/Form/Radio';
import TextArea from './../../../components/Form/TextArea';
import Button from './../../../components/Button/Button';

// Props
const propTypes = {
    accept: PropTypes.string,
    multiple: PropTypes.bool,
    url: PropTypes.string.isRequired,
    checkType: PropTypes.bool
};

// Default props
const defaultProps = {
    accept: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    multiple: false,
    checkType: false
};

// Component
class FileUploader extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            queue: [],
            files: []
        };
    }

    handleFileChange(e) {
        let files = e.target.files;
        let { queue } = this.state;
        files = this.formatFiles(files);

        this.setState({
            queue: queue.concat(files)
        });

        var newArray = this.state.files.slice();

        Array.prototype.map.call(files, file => {
            ((file) => {
                file = this.initFileObj(file);
                newArray.push(file);
                this.setState({ files: newArray });
            })(file);
        });
    }

    initFileObj(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);

        if (file.completed === undefined) {
            file.completed = 0;
        }

        return file;
    }

    formatFiles(files) {
        let rtn = [];
        let { accept, checkType } = this.props;
        Array.prototype.map.call(files, (file) => {
            if (checkType && (!file.type || accept.indexOf(file.type) === -1)) {
                this.props.dispatch(
                    actionAlertNotify(
                        'Wrong file',
                        null,
                        'error',
                        false,
                        true,
                        false,
                        5
                    )
                );
                return;
            }
            rtn.push(file);
        });
        return rtn;
    }

    handleUpload() {
        if (this.state.files.length === 0) {
            this.props.dispatch(
                actionAlertNotify(
                    'Please select the file to upload',
                    null,
                    'error',
                    false,
                    true,
                    false,
                    5
                )
            );
        }

        // to be implemented, xhr
    }

    render() {
        const { accept, multiple } = this.props;
        return (
            <div>
                <input ref="file" type="file" name="file" accept={accept} multiple={multiple} onChange={this.handleFileChange.bind(this)} />
                <br /><br />
                <Button
                    onClick={e => this.handleUpload(e)}
                    label={{
                        text: 'Upload',
                        color: 'black',
                        size: 'large',
                        onLeft: false
                    }}
                />
            </div>
        );
    }
}

FileUploader.propTypes = propTypes;
FileUploader.defaultProps = defaultProps;

function mapStateToProps(state) {
    return {
        header: state.header
    };
}

export default connect(mapStateToProps)(FileUploader);
