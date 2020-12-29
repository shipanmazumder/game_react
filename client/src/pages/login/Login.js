import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { login } from "../../store/actions/authAction";
import InvalidMessage from "../../components/message/InvalidMessage";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      message: '',
      errors:{}
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.auth.errors) !== JSON.stringify(prevState.errors)
    ) {
      return {
        errors: nextProps.auth.errors,
        message: nextProps.auth.message,
      };
    } else {
      return {
        message: nextProps.auth.message,
      };
    }
  }
  changeHandaler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  submitHandaler = (event) => {
    event.preventDefault();
    let { email, password } = this.state;
    this.props.login({ email, password }, this.props.history);
  };
  render() {
    let {from}=this.props.location.state||{from:{pathname:'/dashboard'}}
    if(this.props.auth.isAuth) return <Redirect to={from} />

    let { email, password,errors,message } = this.state;
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  {/* <img
                    src={require("../../assets/images/logo.svg")}
                    alt="logo"
                  /> */}
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <InvalidMessage message={message} />
                <Form className="pt-3" onSubmit={this.submitHandaler}>
                  <Form.Group className="search-field">
                    <Form.Control
                      type="email"
                      id="email"
                      placeholder="Email"
                      size="lg"
                      name="email"
                      value={email}
                      onChange={this.changeHandaler}
                      className="h-auto"
                      isInvalid={errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      <strong>
                        {errors.email
                          ? errors.email.msg
                          : ""}
                      </strong>
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="search-field">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      size="lg"
                      name="password"
                      className="h-auto"
                      id="password"
                      value={password}
                      onChange={this.changeHandaler}
                      isInvalid={errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      <strong>
                        {errors.password
                          ? errors.password.msg
                          : ""}
                      </strong>
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button
                      type="submit"
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    >
                      SIGN IN
                    </Button>
                  </div>
                </Form>
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
export default connect(mapStateToProps, { login })(Login);
