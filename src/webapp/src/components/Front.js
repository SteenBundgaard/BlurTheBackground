import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Item1 from '../images/item1.jpg'
import Item2 from '../images/item2.jpg'
import Item3 from '../images/item3.jpg'
import { connect } from 'react-redux'

class Front extends Component {

    render() {
        return (
            <div>
                <div id="index-banner" className="parallax-container">
                    <div className="section no-pad-bot">
                        <div className="container">
                            <br /><br />
                            <h1 className="header center teal-text text-lighten-2">Blur the Background</h1>
                            <div className="row center">
                                <h5 className="header col s12 light">An AI based approach to improve foreground-background seperation on portraits</h5>
                            </div>
                            <div className="row center">
                            {!this.props.isAuthenticated && <Link to="/try-it" className="btn-large waves-effect waves-light teal lighten-1">Try It</Link>}
                            {this.props.isAuthenticated && <Link to="/upload" className="btn-large waves-effect waves-light teal lighten-1">Upload</Link>}
                            </div>
                            <br /><br />
                        </div>
                    </div>
                    <div className="parallax"><img src={Item1} alt="Unsplashed background img 1" /></div>
                </div>

                <div className="container">
                    <div className="section">
                        <div className="row">
                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="material-icons">group</i></h2>
                                    <h5 className="center">Portrait Segmentation</h5>

                                    <p className="light">Bokeh, a blur on an out-of-focus region in a photograph, helps seperating the model from the background. This effect is achieved by using wide aperture lenses. If the sensor is smaller than full-frame, depth of field might be to large to achieve a proper foreground-background segmentation.</p>
                                </div>
                            </div>

                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="material-icons">flash_on</i></h2>
                                    <h5 className="center">Driven by AI</h5>

                                    <p className="light">Since the emergence of Deep Neural Networks (DNN), semantic image segmentation has made a tremendous progress. Semantic image segmentation is the task of labelling each pixel in the image to a category, e.g. person. For simple portrait segmentation only two classes are of relevance, person and background. </p>
                                </div>
                            </div>

                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="material-icons">settings</i></h2>
                                    <h5 className="center">Adding a blur</h5>

                                    <p className="light">In image processing a blur can be added by applying a function to the image data. Different functions produces different effects. This tool uses the box blur which supposedly reproduces the bokeh effect of a fast lens more accurately. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="parallax-container valign-wrapper">
                    <div className="section no-pad-bot">
                        <div className="container">
                            <div className="row center">
                                <h5 className="header col s12 light">The era of computational photography</h5>
                            </div>
                        </div>
                    </div>
                    <div className="parallax"><img src={Item2} alt="Unsplashed background img 2" /></div>
                </div>

                <div className="container">
                    <div className="section">

                        <div className="row">
                            <div className="col s12 center">
                                <h3><i className="mdi-content-send brown-text"></i></h3>
                                <h4>The future of photography</h4>
                                <p className="left-align light">The relationship between traditional photography and computing has become ever more tenuous in recent years. The compact camera market has collapsed and the average consumer has moved to smartphone photography which in turn produces phenomenal results using tiny image sensors but with a huge computational backend. The emerging technology will soon allow these tiny cameras to produce as good results as traditional heavy weight equipment with large cameras and huge lenses. Sadly this technology can also be used for other things like deepfake.</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="parallax-container valign-wrapper">
                    <div className="section no-pad-bot">
                        <div className="container">
                            <div className="row center">
                                <h5 className="header col s12 light">Improve your existing portraits</h5>
                            </div>
                        </div>
                    </div>
                    <div className="parallax"><img src={Item3} alt="Unsplashed background img 3" /></div>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    let isAuthenticated = state.authentication.isAuthenticated;
    return {
        isAuthenticated
    };
}
export default connect(mapStateToProps)(Front)