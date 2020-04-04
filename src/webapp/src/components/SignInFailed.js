import React, { Component } from "react";
import { connect } from 'react-redux'
import Popup from "reactjs-popup";
import { loginActions } from './actions/action-types/loginActions';
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'

class SignInFailed extends Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.props.dispatch( { type: loginActions.LOGIN_RESET })
        this.props.dispatch(push('/'));
    }
    
    render() {
        return (
    <Popup modal closeOnDocumentClick position="center center" open={true} onClose={this.onClose}>
      <span> Your authentication with BlurBackground.online failed </span>
    </Popup>);
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(withRouter(SignInFailed));