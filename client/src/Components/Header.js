import React from 'react';
import { Jumbotron} from 'react-bootstrap';
import '../styles/page-header.css';

export default () => {
	return (
		<Jumbotron bsClass='page-header'>
        <a href="#" target="_blank">
          	<img src="assets/images/smart-grocer.gif" alt="Smart Grocer"/></a>
        <h1>Make a Healthy Grocery List</h1>
    </Jumbotron>
  )
}