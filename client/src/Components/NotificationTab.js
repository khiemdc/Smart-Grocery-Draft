import React, { Component } from 'react';

import '../styles/notification-tab.css';
import MediaCard from './MediaCard';

//client side socket connection
import io from 'socket.io-client'; 
const socket = io(); 

export default class NotificationTab extends Component {
	constructor(props) {
		super(props);
		this.state={
			tabExpanded: false,
			newGrocery: {}
		}
		socket.on('new-save', payload => this.updateSavedGroceries(payload));
		
	}

	updateSavedGroceries(payload) {
    this.setState({newGrocery: payload.grocery.grocery, tabExpanded: true});
    setTimeout(() => this.setState({tabExpanded: false}), 2500);
  }

  //since update function will open tab, 
  //move away from a toggle function to prevent tab being stuck in open position
  handleMouseEnter() {
  	this.setState({tabExpanded: true});
  }

  handleMouseLeave() {
    this.setState({tabExpanded: false});
  }

  render() {
  	const expanse = this.state.tabExpanded ? 50 : 0;
  	return (
  		<div 
  			className='notification-tab' 
  			style={{width: `${expanse}%`}} 
  			onMouseEnter={this.handleMouseEnter.bind(this)}
  			onMouseLeave={this.handleMouseLeave.bind(this)}
  		>
  			<MediaCard grocery={this.state.newGrocery}/>
  		</div>
  	);
  }
}