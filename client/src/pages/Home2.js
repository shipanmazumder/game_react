import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class Home2 extends Component {
    render() {
        return (
            <div>
                I am from home 2
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Home2);