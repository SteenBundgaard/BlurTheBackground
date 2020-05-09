import React, { Component }  from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class TopMenu extends Component {
    render() {
        return (
            <div>
                <li><Link to="/About">About</Link></li>
                {!this.props.isAuthenticated && <li><Link to="/try-it">Try It</Link></li>}
                {!this.props.isAuthenticated && <li><Link to="/sign-in">Sign in</Link></li>}
                {this.props.isAuthenticated && <li><Link to="/upload">Upload</Link></li>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    let isAuthenticated = state.authentication.isAuthenticated;
    return {
        isAuthenticated
    };
}
 
export default connect(mapStateToProps)(TopMenu)