import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import '../styles/searchResults.css';

import PanelHeading from './PanelHeading';
import ResultsListItems from './ResultsListItems';

export default class SearchResults extends Component {

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

			<div className="searchResults">
				<PanelHeading toggle={this.toggleExpand.bind(this)} glyph='list-alt' title='Search Results'/>
        <Collapse in={this.state.open}>
        	<div className="panel-body">
        		<ResultsListItems groceries={this.state.groceries}/>
        	</div>
        </Collapse>
    	</div>

		)
	}

}