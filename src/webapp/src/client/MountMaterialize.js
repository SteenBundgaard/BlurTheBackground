import React from "react";
import { withRouter } from "react-router-dom";

class MountMaterialize extends React.Component {
    componentDidMount() {
        window.M.AutoInit();
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.location.pathname !== prevProps.location.pathname
        ) {
            window.M.AutoInit();
        }
    }

    render() {
        return null;
    }
}

export default withRouter(MountMaterialize);