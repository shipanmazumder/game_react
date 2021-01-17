import React, { Component } from "react";
import GameView from "../../components/botmessage/GameView";
import BotMessageAdd from "../../components/botmessage/BotMessageAdd";
import BotMesageUpdate from "../../components/botmessage/BotMesageUpdate";
import BotMessageView from './../../components/botmessage/BotMessageView';

class BotMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdd: false,
      isEdit: false,
      isView: true,
      isBotMessageView: false,
      game_id: "",
    };
  }
  botMessageView = (game_id) => {
    this.setState({
      game_id: game_id,
      isAdd: false,
      isEdit: false,
      isView: false,
      isBotMessageView: true
    });
  };
  botMessageAdd = (game_id) => {
    this.setState({
      game_id: game_id,
      isAdd: true,
      isEdit: false,
      isView: false,
      isBotMessageView: false
    });
  };
  viewGames=()=>{
    this.setState({
      isAdd: false,
      isEdit: false,
      isView: true,
      isBotMessageView: false
    });
  }
  render() {
    let { isAdd, isEdit, isView,isBotMessageView } = this.state;
    return (
      <div>
        {isAdd ? <BotMessageAdd viewGames={this.viewGames} game_id={this.state.game_id} botMessageAdd={this.botMessageAdd} /> : ""}
        {isBotMessageView ? <BotMessageView viewGames={this.viewGames} game_id={this.state.game_id} /> : ""}
        {isEdit && this.state.game !== "" ? (
          <BotMesageUpdate
          />
        ) : (
          ""
        )}
        {isView ? (
          <GameView
          botMessageAdd={this.botMessageAdd}
          botMessageView={this.botMessageView}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default BotMessage;
