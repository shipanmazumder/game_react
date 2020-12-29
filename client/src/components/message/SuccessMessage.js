import React from 'react';
import { Alert } from 'react-bootstrap';

function SuccessMessage(props){
    if(props.message){
      return (
        <Alert variant='success'>
          {props.message}
        </Alert>
      )
    }else{
      return "";
    }
  }
export default SuccessMessage;