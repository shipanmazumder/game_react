import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class Home extends Component {
    render() {
        return (
            <div>
                <h1>I AM from Home</h1>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Home);