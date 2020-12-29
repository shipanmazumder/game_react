import React, { Component } from "react";
import ViewGame from "../../components/game/ViewGame";
import AddGame from './../../components/game/AddGame';
import UpdateGame from './../../components/game/UpdateGame';
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdd:false,
      isEdit:false,
      isView:true,
    };
  }
  handleGame=(action)=>{
    this.setState({
      isAdd:action==="add"?true:false,
      isEdit:action==="edit"?true:false,
      isView:action==="view"?true:false
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
          isEdit?<UpdateGame handleGame={this.handleGame} />:""
        }
        {
          isView?<ViewGame handleGame={this.handleGame} />:""
        }
      </div>
    );
  }
}
export default (Game);
