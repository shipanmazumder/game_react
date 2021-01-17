import React, { Component } from "react";
import { connect } from "react-redux";
import { games } from "./../../store/actions/gameAction";
import SuccessMessage from "./../../components/message/SuccessMessage";
import { Spinner } from "./../../components/shared/Spinner";
import { Button, Table } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import { getBotMessage } from './../../store/actions/botMessageAction';
class BotMessageView extends Component {
  constructor() {
    super();
    this.state = {
      game_id: "",
      message: "",
      botMessages: []
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      message: "",
      botMessages: nextProps.botMessage.botMessages
    };
  }
  async componentDidMount() {
    await this.getBotMessage();
  }
  getBotMessage() {
    this.props.getBotMessage(this.props.history,this.props.game_id);
  }
  viewGames=()=>{
    this.props.viewGames();     
  }
  updateGame=(value)=>{
    this.props.updateGame(value);     
  }
  render() {
    let { message,botMessages } = this.state;
    if (this.props.botMessage.isLoading) {
        return <Spinner />;
      } else {
        return (
          <div>
            <div className="page-header">
              <h3 className="page-title"> View Bot Messages </h3>
              <nav aria-label="breadcrumb">
                <Button onClick={this.viewGames}>View Games</Button>
              </nav>
            </div>
            <div className="row">
              <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <SuccessMessage message={message} />
                    <Table striped bordered responsive="sm">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Sub Title</th>
                          <th>Button Title</th>
                          <th>Message Time</th>
                          <th>Image Url</th>
                          <th>Data</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {botMessages.length > 0
                          ? botMessages.map((value, index) => (
                              <tr key={index}>
                                <td>{++index}</td>
                                <td>{value.title}</td>
                                <td>{value.subTitle}</td>
                                <td>{value.buttonTitle}</td>
                                <td>{value.messageTime}</td>
                                <td>{value.imageUrl}</td>
                                <td>{value.data}</td>
                                <td>
                                  <Button onClick={()=>this.updateGame(value)}>Edit</Button>
                                </td>
                              </tr>
                            ))
                          :  <tr>
                          <td colSpan="8">No Message Found</td>
                        </tr>}
                      </tbody>
                    </Table>
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
  botMessage: state.botMessage
});

export default withRouter(connect(mapStateToProps, { getBotMessage })(BotMessageView));
