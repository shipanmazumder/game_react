import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form } from "react-bootstrap";
import SuccessMessage from "./../../components/message/SuccessMessage";
import { Spinner } from "./../../components/shared/Spinner";
import { withRouter } from "react-router-dom";
import { botMessageAdd } from "../../store/actions/botMessageAction";

class BotMessageAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      botMessage: {
        title: "",
        subTitle: "",
        buttonTitle: "",
        imageUrl: "",
        messageTime: "",
        position: "",
        data: "",
      },
      message: "",
      errors: {},
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.botMessage.errors) !==
      JSON.stringify(prevState.errors)
    ) {
      return {
        isLoading: false,
        errors: nextProps.botMessage.errors,
        message: nextProps.botMessage.message,
      };
    } else {
      return {
        isLoading: false,
        message: nextProps.botMessage.message,
      };
    }
  }
  async componentDidMount() {
    this.setState({
      isLoading:false
    })
  }
  viewGames = () => {
    this.props.viewGames();
  };
  submitHandaler = async (event) => {
    event.preventDefault();
    this.setState({
      isLoading: true,
    });
    let { botMessage } = this.state;
    await this.props.botMessageAdd(
      botMessage,
      this.props.game_id,
      this.props.history
    );
    this.setState({
      message:"Bot Message Add Success",
    });
  };
  changeHandaler = (event) => {
    const newState = {
      ...this.state.botMessage,
      [event.target.name]: event.target.value,
    };
    this.setState({
      botMessage: newState,
    });
  };

  viewGames = () => {
    this.props.viewGames();
  };
  render() {
    let { errors, message, isLoading } = this.state;

    let {
      title,
      subTitle,
      buttonTitle,
      imageUrl,
      messageTime,
      position,
      data,
    } = this.state.botMessage;
    if (isLoading) {
      return <Spinner />;
    } else {
      return (
        <div>
          <div className="page-header">
            <h3 className="page-title"> Add Bot Message </h3>
            <nav aria-label="breadcrumb">
              <Button onClick={this.viewGames}>View Games</Button>
            </nav>
          </div>
          <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <SuccessMessage message={message} />
                  <Form
                    className="forms-sample "
                    onSubmit={this.submitHandaler}
                  >
                    <div className="row">
                      <div className="col-md-4">
                        <Form.Group>
                          <label htmlFor="title">Title</label>
                          <Form.Control
                            type="text"
                            id="title"
                            placeholder="Title"
                            size="lg"
                            name="title"
                            value={title}
                            isInvalid={errors.title}
                            onChange={this.changeHandaler}
                          />
                          <Form.Control.Feedback type="invalid">
                            <strong>
                              {errors.title ? errors.title.msg : ""}
                            </strong>
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group>
                          <label htmlFor="subTitle">Sub Title</label>
                          <Form.Control
                            type="text"
                            id="subTitle"
                            name="subTitle"
                            value={subTitle}
                            placeholder="Sub Title"
                            size="lg"
                            isInvalid={errors.subTitle}
                            onChange={this.changeHandaler}
                          />
                          <Form.Control.Feedback type="invalid">
                            <strong>
                              {errors.subTitle ? errors.subTitle.msg : ""}
                            </strong>
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group>
                          <label htmlFor="buttonTitle">Button Title</label>
                          <Form.Control
                            type="text"
                            id="buttonTitle"
                            placeholder="Button Title"
                            size="lg"
                            name="buttonTitle"
                            value={buttonTitle}
                            isInvalid={errors.buttonTitle}
                            onChange={this.changeHandaler}
                          />
                          <Form.Control.Feedback type="invalid">
                            <strong>
                              {errors.buttonTitle ? errors.buttonTitle.msg : ""}
                            </strong>
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group>
                          <label htmlFor="imageUrl">Image URL</label>
                          <Form.Control
                            type="text"
                            id="imageUrl"
                            placeholder="Image URL"
                            size="lg"
                            name="imageUrl"
                            value={imageUrl}
                            isInvalid={errors.imageUrl}
                            onChange={this.changeHandaler}
                          />
                          <Form.Control.Feedback type="invalid">
                            <strong>
                              {errors.imageUrl ? errors.imageUrl.msg : ""}
                            </strong>
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group>
                          <label htmlFor="messageTime">Message Time</label>
                          <Form.Control
                            type="text"
                            id="messageTime"
                            placeholder="Message Time"
                            size="lg"
                            name="messageTime"
                            value={messageTime}
                            isInvalid={errors.messageTime}
                            onChange={this.changeHandaler}
                          />
                          <Form.Control.Feedback type="invalid">
                            <strong>
                              {errors.messageTime ? errors.messageTime.msg : ""}
                            </strong>
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group>
                          <label htmlFor="position">Position</label>
                          <Form.Control
                            type="text"
                            id="position"
                            placeholder="Position"
                            size="lg"
                            name="position"
                            value={position}
                            isInvalid={errors.position}
                            onChange={this.changeHandaler}
                          />
                          <Form.Control.Feedback type="invalid">
                            <strong>
                              {errors.position ? errors.position.msg : ""}
                            </strong>
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                      <div className="col-md-12">
                        <Form.Group>
                          <label htmlFor="data">Data</label>
                          <Form.Control
                            as="textarea"
                            id="data"
                            rows={5}
                            size="lg"
                            placeholder="Data"
                            name="data"
                            value={data}
                            isInvalid={errors.data}
                            onChange={this.changeHandaler}
                          />
                          <Form.Control.Feedback type="invalid">
                            <strong>
                              {errors.data ? errors.data.msg : ""}
                            </strong>
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                      <div className="col-md-12">
                        <button type="submit" className="btn btn-primary mr-2">
                          Add Bot Message
                        </button>
                      </div>
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
}
const mapStateToProps = (state) => ({
  botMessage: state.botMessage,
  auth: state.auth,
});

export default withRouter(
  connect(mapStateToProps, { botMessageAdd })(BotMessageAdd)
);
