import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import '../styles/favoritesList.css';

import PanelHeading from './PanelHeading';
import FavoritesListItems from './FavoritesListItems';

export default class FavoritesList extends Component {

	constructor(props) {
		super(props);
		this.state={
			open: false,
			groceries: []
		}
	}

	componentWillReceiveProps(nextProps) {
    this.setState({open: nextProps.open, groceries: [...nextProps.groceries]});
  }

  toggleExpand() {
		this.setState({open: !this.state.open});
	}

	render() {

		return (

			<div className="favoritesList">
				<PanelHeading toggle={this.toggleExpand.bind(this)} glyph='fire' title='Grocery List'/>
        <Collapse in={this.state.open}>
        	<div className="panel-body">
        		<FavoritesListItems groceries={this.state.groceries}/>
        	</div>
        </Collapse>
    	</div>

		)
	}

}