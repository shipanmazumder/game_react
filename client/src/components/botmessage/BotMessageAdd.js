import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import { catgeories, gameAdd } from "./../../store/actions/gameAction";
import SuccessMessage from "./../../components/message/SuccessMessage";
import { Spinner } from './../../components/shared/Spinner';
import { withRouter } from 'react-router-dom';
class BotMessageAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      selectedOption: null,
      stateCategories: [],
      game: {
        name: "",
        game_access_token: "",
        game_short_code: "",
        game_verify_token: "",
        categoryId: "",
        description: "",
        app_secret: "",
        app_id: "",
      },
      message: "",
      errors: {},
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if(!nextProps.game.errors){
      this.setState({
        game: {
          name: "",
          game_access_token: "",
          game_short_code: "",
          game_verify_token: "",
          categoryId: "",
          description: "",
          app_secret: "",
          app_id: "",
        },
      });
    }
    if (
      JSON.stringify(nextProps.game.errors) !== JSON.stringify(prevState.errors)
    ) {
      return {
        isLoading:false,
        errors: nextProps.game.errors,
        message: nextProps.game.message,
        stateCategories: nextProps.game.categories.map((category) => ({
          value: category._id,
          label: category.name,
        })),
      };
    } else {
      return {
        isLoading:false,
        message: nextProps.game.message,
        stateCategories: nextProps.game.categories.map((category) => ({
          value: category._id,
          label: category.name,
        })),
      };
    }
  }
  async componentDidMount() {
   await this.getCategories();
  }
   submitHandaler =async (event) => {
    event.preventDefault();
    this.setState({
      isLoading:true
     })
    let { game } = this.state;
    await this.props.gameAdd(game, this.props.history);
   
  };
  changeHandaler = (event) => {
    const newState = {
      ...this.state.game,
      [event.target.name]: event.target.value,
    };
    this.setState({
      game: newState,
    });
  };
  handleChange = (selectedOption) => {
    const newState = {
      ...this.state.game,
      categoryId: selectedOption.value,
    };
    this.setState({
      selectedOption: selectedOption,
      game: newState,
    });
  };
  getCategories() {
    this.props.catgeories(this.props.history);
  }
  getGames() {
    this.props.games(this.props.history);
  }
  handleGame=()=>{
    this.props.handleGame("view");     
  }
  render() {
    let { stateCategories, selectedOption, errors, message,isLoading } = this.state;

    let {
      name,
      game_short_code,
      game_access_token,
      game_verify_token,
      app_id,
      app_secret,
      description,
    } = this.state.game;
    if(isLoading){
        return <Spinner />
      }else{
        return (
          <div>
            <div className="page-header">
              <h3 className="page-title"> Manage Game </h3>
              <nav aria-label="breadcrumb">
                <Button onClick={this.handleGame}>View Games</Button>
              </nav>
            </div>
            <div className="row">
              <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <SuccessMessage message={message} />
                    <Form className="forms-sample " onSubmit={this.submitHandaler}>
                      <div className="row">
                        <div className="col-md-4">
                          <Form.Group>
                            <label htmlFor="name">Game Name</label>
                            <Form.Control
                              type="text"
                              id="name"
                              placeholder="Game Name"
                              size="lg"
                              name="name"
                              value={name}
                              isInvalid={errors.name}
                              onChange={this.changeHandaler}
                            />
                            <Form.Control.Feedback type="invalid">
                              <strong>{errors.name ? errors.name.msg : ""}</strong>
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                        <div className="col-md-4">
                          <Form.Group>
                            <label htmlFor="game_short_code">Game Short Code</label>
                            <Form.Control
                              type="text"
                              id="game_short_code"
                              name="game_short_code"
                              value={game_short_code}
                              placeholder="Game Short Code"
                              size="lg"
                              isInvalid={errors.game_short_code}
                              onChange={this.changeHandaler}
                            />
                            <Form.Control.Feedback type="invalid">
                              <strong>
                                {errors.game_short_code
                                  ? errors.game_short_code.msg
                                  : ""}
                              </strong>
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                        <div className="col-md-4">
                          <Form.Group>
                            <label htmlFor="app_id">App ID</label>
                            <Form.Control
                              type="text"
                              id="app_id"
                              placeholder="App ID"
                              size="lg"
                              name="app_id"
                              value={app_id}
                              isInvalid={errors.app_id}
                              onChange={this.changeHandaler}
                            />
                            <Form.Control.Feedback type="invalid">
                              <strong>
                                {errors.app_id ? errors.app_id.msg : ""}
                              </strong>
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                        <div className="col-md-4">
                          <Form.Group>
                            <label htmlFor="app_secret">App Secret</label>
                            <Form.Control
                              type="text"
                              id="app_secret"
                              placeholder="App Secret"
                              size="lg"
                              name="app_secret"
                              value={app_secret}
                              isInvalid={errors.app_secret}
                              onChange={this.changeHandaler}
                            />
                            <Form.Control.Feedback type="invalid">
                              <strong>
                                {errors.app_secret ? errors.app_secret.msg : ""}
                              </strong>
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                        <div className="col-md-4">
                          <Form.Group>
                            <label htmlFor="exampleSelectGender">Category</label>
                            <Select
                            className={errors.categoryId?'is-invalid':""}
                              options={stateCategories}
                              value={selectedOption}
                              onChange={this.handleChange}
                              isInvalid={errors.categoryId}
                            />
                             <Form.Control.Feedback type="invalid">
                              <strong>
                                {errors.categoryId
                                  ? errors.categoryId.msg
                                  : ""}
                              </strong>
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                        <div className="col-md-4">
                          <Form.Group>
                            <label htmlFor="game_access_token">
                              Game Access Token
                            </label>
                            <Form.Control
                              type="text"
                              id="game_access_token"
                              placeholder="Game Access Token"
                              size="lg"
                              name="game_access_token"
                              value={game_access_token}
                              isInvalid={errors.game_access_token}
                              onChange={this.changeHandaler}
                            />
                            <Form.Control.Feedback type="invalid">
                              <strong>
                                {errors.game_access_token
                                  ? errors.game_access_token.msg
                                  : ""}
                              </strong>
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                        <div className="col-md-4">
                          <Form.Group>
                            <label htmlFor="game_verify_token">
                              Game Verify Token
                            </label>
                            <Form.Control
                              type="text"
                              id="game_verify_token"
                              placeholder="Game Verify Token"
                              size="lg"
                              name="game_verify_token"
                              value={game_verify_token}
                              isInvalid={errors.game_verify_token}
                              onChange={this.changeHandaler}
                            />
                            <Form.Control.Feedback type="invalid">
                              <strong>
                                {errors.game_verify_token
                                  ? errors.game_verify_token.msg
                                  : ""}
                              </strong>
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                        <div className="col-md-8">
                          <Form.Group>
                            <label htmlFor="description">Description</label>
                            <Form.Control
                              as="textarea"
                              id="description"
                              rows={5}
                              size="lg"
                              placeholder="Description"
                              name="description"
                              value={description}
                              isInvalid={errors.description}
                              onChange={this.changeHandaler}
                            />
                            <Form.Control.Feedback type="invalid">
                              <strong>
                                {errors.description ? errors.description.msg : ""}
                              </strong>
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                        <button type="submit" className="btn btn-primary mr-2">
                          Add Game
                        </button>
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
  game: state.game,
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, { catgeories, gameAdd })(BotMessageAdd));
