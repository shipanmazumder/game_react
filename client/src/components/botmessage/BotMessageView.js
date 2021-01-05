import React, { Component } from "react";
import { connect } from "react-redux";
import { games } from "./../../store/actions/gameAction";
import SuccessMessage from "./../../components/message/SuccessMessage";
import { Spinner } from "./../../components/shared/Spinner";
import { Button, Table } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
class BotMessageView extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      games: [],
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      message: "",
      games: nextProps.game.games
    };
  }
  async componentDidMount() {
    await this.getGames();
  }
  getGames() {
    this.props.games(this.props.history);
  }
  handleGame=()=>{
    this.props.handleGame("add");     
  }
  updateGame=(value)=>{
    this.props.updateGame(value);    
    this.props.handleGame("edit");    
  }
  render() {
    let { message,games } = this.state;
    if (this.props.game.isLoading) {
        return <Spinner />;
      } else {
        return (
          <div>
            <div className="page-header">
              <h3 className="page-title"> View Games </h3>
              <nav aria-label="breadcrumb">
                <Button onClick={this.handleGame}>Add New Game</Button>
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
                          <th>Name</th>
                          <th>Short Code</th>
                          <th>App ID</th>
                          <th>Category</th>
                          <th>Description</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {games.length > 0
                          ? games.map((value, index) => (
                              <tr key={index}>
                                <td>{++index}</td>
                                <td>{value.name}</td>
                                <td>{value.game_short_code}</td>
                                <td>{value.app_id}</td>
                                <td>{value.categoryId.name}</td>
                                <td>{value.description}</td>
                                <td>
                                  <Button onClick={()=>this.updateGame(value)}>Edit</Button>
                                </td>
                              </tr>
                            ))
                          :  <tr>
                          <td colSpan="7">No Game Found</td>
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
  game: state.game,
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, { games })(BotMessageView));
