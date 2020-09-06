import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Footer extends Component {
    render() {
        return (
            <footer className="page-footer teal">
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <h5 className="white-text">Photography Blog</h5>
                            <ul>
                                 <li><Link to="/blog" className="grey-text text-lighten-4">Panasonic G9 - shooting portraits at f2.8?</Link></li>
                            </ul>

                        </div>
                        <div className="col l3 s12">
                            <h5 className="white-text">Miscellaneous</h5>
                            <ul>
                                <li><Link to="/terms-of-service" className="white-text">Terms of Service</Link></li>
                                <li><Link to="/privacy-policy" className="white-text">Privacy Policy</Link></li>
                            </ul>
                        </div>
                        <div className="col l3 s12">
                            <h5 className="white-text">Contact</h5>
                            <ul>
                                <li><address><a className="white-text" href="mailto:blurbackgroundonline@gmail.com">Administrator</a></address></li>                               
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                    </div>
                </div>
            </footer>

        )
    }
}

export default Footer;