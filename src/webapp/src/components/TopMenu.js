import React, { Component }  from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class TopMenu extends Component {
    render() {
        return (
            <div>
                <li><Link to="/About">About</Link></li>
                {!this.props.isAuthenticated && <li><Link to="/TryIt">Try It</Link></li>}
                {/* {!this.props.isAuthenticated && <li><Link to="/SignIn">Sign in</Link></li>} */}
                <li><Link to="/SignIn">Sign in</Link></li>}
                {this.props.isAuthenticated && <li><Link to="/Upload">Upload</Link></li>}
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