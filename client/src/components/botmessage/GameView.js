import React, { Component } from "react";
import { connect } from "react-redux";
import { games } from "./../../store/actions/gameAction";
import SuccessMessage from "./../../components/message/SuccessMessage";
import { Spinner } from "./../../components/shared/Spinner";
import { Card } from "react-bootstrap";
import { withRouter } from "react-router-dom";
class GameView extends Component {
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
      games: nextProps.game.games,
    };
  }
  async componentDidMount() {
    await this.getGames();
  }
  getGames() {
    this.props.games(this.props.history);
  }
  viewBotMessage = (value) => {
    this.props.botMessageView(value);
  };
  addBotMessage = (value) => {
    this.props.botMessageAdd(value);
  };
  updateGame = (value) => {
    this.props.updateGame(value);
    this.props.handleBotMessage("edit");
  };
  render() {
    let { message, games } = this.state;
    if (this.props.game.isLoading) {
      return <Spinner />;
    } else {
      return (
        <div>
          <div className="page-header">
            <h3 className="page-title"> View Games </h3>
          </div>
          <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <SuccessMessage message={message} />
                  <div className='row'>
                    <div className="col-md-12">
                    {games.length > 0 ? (
                        games.map((value, index) => (
                        <div className="col-sm-4" style={{float:'left'}} key={index}>
                            <Card>
                            <Card.Body>
                                <Card.Title className='text-center'>{value.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted text-center">
                                {value.game_short_code}
                                </Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted text-center">
                                {value.categoryId.name}
                                </Card.Subtitle>
                                <Card.Link href="#" onClick={()=>this.viewBotMessage(value._id)}>View Message</Card.Link>
                                <Card.Link href="#"  onClick={()=>this.addBotMessage(value._id)}>Add Message</Card.Link>
                            </Card.Body>
                            </Card>
                        </div>
                        ))
                    ) : (
                        <div className="col-md-12">
                            No Game Found
                        </div>
                    )}
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
}
const mapStateToProps = (state) => ({
  game: state.game,
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, { games })(GameView));
