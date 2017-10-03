import React from 'react';
import { Jumbotron} from 'react-bootstrap';
import '../styles/page-header.css';


export default () => {
	return (
		<Jumbotron bsClass='page-header'>
      <h1><i className="fa fa-newspaper-o" aria-hidden="true"></i>
				Make a Healthy Grocery List</h1>
      <div className="page-header__badge">
          <a href="#" target="_blank">
          	<img src="assets/images/smart-grocer.gif" alt="Smart Grocer"/></a>
      </div>
    </Jumbotron>
  )
}