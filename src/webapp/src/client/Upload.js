import React, { Component } from 'react';
import Item5 from '../images/item5.jpg'
import Style from './Upload.module.css'
import { actions } from './actions/actionCreators'
import { connect } from 'react-redux'

class Upload extends Component {
    onUpload = (clickEvent) => {
        clickEvent.preventDefault();
        this.props.dispatch(actions.upload());
    }

    render() {
        return (
            <div className="container">
                <div className="row"/>
                <div className="row">
                    <div className="col s6 offset-s3">
                        <div className="card card-panel hoverable grey">
                            <div>
                                <img src={Item5} className={Style.imageCenter}/>              
                            </div>             
                            <div className="card-action">
                                <a href="#" onClick={this.onUpload}>Upload Image</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Upload);
