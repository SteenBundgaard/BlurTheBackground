import React, { Component } from 'react';
import Upload from './Upload'

class TryIt extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="section">

                    <div className="row">
                        <div className="col s12 center">
                            <h3><i className="mdi-content-send brown-text"></i></h3>
                            <h4>Try it now</h4>
                            <p className="left-align light">Even though this service is completely free it still requires you to sign-in for getting your full resolution image processed. If you just want to try it out you can do so, but the processed image will only be downloadable in low resolution. This service will not retain your images.</p>
                        </div>
                    </div>
                </div>
                <Upload />
            </div>
        )
    }
}

export default TryIt;