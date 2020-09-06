import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <div className="container">
                <div className="section">

                    <div className="row">
                        <div className="col s12 center">
                            <h3><i className="mdi-content-send brown-text"></i></h3>
                            <h4>About</h4>
                            <p className="left-align light">This application is provided to you for free to experiment with modern image processing using 
                            advanced machine learning. Please accept a limitation of a free serivce is a not-too-fast processing times as computing power is expensive in the Cloud.
                            This might be especially noticable for high megapixel images.
                            Any feedback is welcome and can be provided by sending an email to the administrator using the link at the bottom of the page. </p>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default About;