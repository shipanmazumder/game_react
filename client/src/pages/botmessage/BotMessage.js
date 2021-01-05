import React, { Component } from "react";
import ViewGame from "../../components/game/ViewGame";
import AddGame from './../../components/game/AddGame';
import UpdateGame from './../../components/game/UpdateGame';
class BotMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdd:false,
      isEdit:false,
      isView:true,
      game:{}
    };
  }
  handleGame=(action)=>{
    this.setState({
      isAdd:action==="add"?true:false,
      isEdit:action==="edit"?true:false,
      isView:action==="view"?true:false
    });
  }
  updateGame=(value)=>{
   this.setState({
     game:value,
    isAdd:false,
    isEdit:true,
    isView:false
  });
  }
  render() {
    let { isAdd,isEdit,isView } = this.state;
    return (
      <div>
        {
          isAdd?<AddGame handleGame={this.handleGame}/>:""
        }
        {
          (isEdit&&this.state.game!=="")?<UpdateGame updateGame={this.state.game} handleGame={this.handleGame}/>:""
        }
        {
          isView?<ViewGame  updateGame={this.updateGame} handleGame={this.handleGame} />:""
        }
      </div>
    );
  }
}
export default (BotMessage);
