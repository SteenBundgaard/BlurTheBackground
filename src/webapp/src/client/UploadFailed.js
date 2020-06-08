import React, { Component } from "react";
import { connect } from 'react-redux'
import Popup from "reactjs-popup";
import { uploadActions } from './actions/action-types/uploadActions';

class UploadFailed extends Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.props.dispatch({ type: uploadActions.CLEARING })
    }

    render() {
        return (
            <Popup modal closeOnDocumentClick position="center center" open={true} onClose={this.onClose}>
                <span>Failed to process {this.props.name}. It may not be a valid jpg file.</span>
            </Popup>);
    }
}

function mapStateToProps(state) {
    const name = state.upload.name;
    return {
        name
    };
}

export default connect(mapStateToProps)(UploadFailed);