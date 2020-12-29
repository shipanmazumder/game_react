import React from 'react';
import { Alert } from 'react-bootstrap';

function InvalidMessage(props){
    if(props.message){
      return (
        <Alert variant='danger'>
          {props.message}
        </Alert>
      )
    }else{
      return "";
    }
  }
export default InvalidMessage;