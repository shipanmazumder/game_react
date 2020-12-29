import React, { Component } from "react";
import "../App.scss";
import AppRoutes from "../AppRoutes";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
import SettingsPanel from "./shared/SettingsPanel";
import Footer from "./shared/Footer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isFullPageLayout:false
    };
  }
  componentDidMount() {
    this.setState({
      isFullPageLayout:!this.props.auth.isAuth
    })
    this.onRouteChanged();
  }
  render() {
    let {isFullPageLayout}=this.state;
    let navbarComponent = !isFullPageLayout ? <Navbar /> : "";
    let sidebarComponent = !isFullPageLayout ? <Sidebar /> : "";
    let SettingsPanelComponent = !isFullPageLayout ? (
      <SettingsPanel />
    ) : (
      ""
    );
    let footerComponent = !isFullPageLayout ? <Footer /> : "";
    return (
      <div className="container-scroller">
        {navbarComponent}
        <div className="container-fluid page-body-wrapper">
          {sidebarComponent}
          <div className="main-panel">
            <div className="content-wrapper">
              <AppRoutes />
              {SettingsPanelComponent}
            </div>
            {footerComponent}
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    window.scrollTo(0, 0);
    if(this.props.auth.isAuth){
      this.setState({
        isFullPageLayout: false,
      });
      document
      .querySelector(".page-body-wrapper")
      .classList.remove("full-page-wrapper");
    }else{
      this.setState({
        isFullPageLayout: true,
      });
        document
          .querySelector(".page-body-wrapper")
          .classList.add("full-page-wrapper");
    }
    // const fullPageLayoutRoutes = [
    //   "/login",
    //   "/user-pages/register-1",
    //   "/user-pages/register-2",
    //   "/user-pages/lockscreen",
    //   "/error-pages/error-404",
    //   "/error-pages/error-500",
    //   "/general-pages/landing-page",
    // ];
    // for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
    //   if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
    //     this.setState({
    //       isFullPageLayout: true,
    //     });
    //     document
    //       .querySelector(".page-body-wrapper")
    //       .classList.add("full-page-wrapper");
    //     break;
    //   } else {
    //     this.setState({
    //       isFullPageLayout: false,
    //     });
    //     document
    //       .querySelector(".page-body-wrapper")
    //       .classList.remove("full-page-wrapper");
    //   }
    // }
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(App));
