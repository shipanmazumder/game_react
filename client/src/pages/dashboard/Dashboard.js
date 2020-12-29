import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="row page-title-header">
          <div className="col-12">
            <div className="page-header">
              <h4 className="page-title">Dashboard</h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-3 col-lg-6 col-sm-6 grid-margin-xl-0 grid-margin">
                    <div className="d-flex">
                      <div className="wrapper">
                        <h3 className="mb-0 font-weight-semibold">32,451</h3>
                        <h5 className="mb-0 font-weight-medium text-primary">
                          Visits
                        </h5>
                        <p className="mb-0 text-muted">+14.00(+0.50%)</p>
                      </div>
                      <div className="wrapper my-auto ml-auto ml-lg-4">
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-sm-6 mt-md-0 mt-4 grid-margin-xl-0 grid-margin">
                    <div className="d-flex">
                      <div className="wrapper">
                        <h3 className="mb-0 font-weight-semibold">15,236</h3>
                        <h5 className="mb-0 font-weight-medium text-primary">
                          Impressions
                        </h5>
                        <p className="mb-0 text-muted">+138.97(+0.54%)</p>
                      </div>
                      <div className="wrapper my-auto ml-auto ml-lg-4">
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-sm-6 mt-md-0 mt-4 grid-margin-xl-0 grid-margin">
                    <div className="d-flex">
                      <div className="wrapper">
                        <h3 className="mb-0 font-weight-semibold">7,688</h3>
                        <h5 className="mb-0 font-weight-medium text-primary">
                          Conversion
                        </h5>
                        <p className="mb-0 text-muted">+57.62(+0.76%)</p>
                      </div>
                      <div className="wrapper my-auto ml-auto ml-lg-4">
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-sm-6 mt-md-0 mt-4 grid-margin-xl-0 grid-margin">
                    <div className="d-flex">
                      <div className="wrapper">
                        <h3 className="mb-0 font-weight-semibold">1,553</h3>
                        <h5 className="mb-0 font-weight-medium text-primary">
                          Downloads
                        </h5>
                        <p className="mb-0 text-muted">+138.97(+0.54%)</p>
                      </div>
                      <div className="wrapper my-auto ml-auto ml-lg-4">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Dashboard);
