import React, {Component} from 'react';
import { FormGroup, FormControl, ControlLabel, Glyphicon, Button, Collapse } from 'react-bootstrap';

import PanelHeading from './PanelHeading';

export default class SearchForm extends Component {
	constructor(props) {
		super(props);
		this.reset = this.reset.bind(this)
		this.state = {
			searchTerms: '',
			startYear: undefined,
			endYear: undefined,
			numRecords: 10,
			open: false,
			currentYear: undefined
		};
	}

	componentWillMount() {
		const currentYear = new Date().getFullYear();
		this.setState({currentYear});
	}

  componentWillReceiveProps(nextProps) {
    this.setState({open: nextProps.open});
    if(!nextProps.open) {
      this.reset(null);
    }
  }

	toggleExpand(e) {
		this.setState({open: !this.state.open});
	}

	handleInputChange(e){
		this.setState({searchTerms:e.target.value})
	}

	handleStartYearChange(e){
		this.setState({startYear: e.target.value});
	}

	handleEndYearChange(e){
		this.setState({endYear: e.target.value});
	} 
	
	handleSubmit(e) {
		e.preventDefault();
		const searchTerms = this.state.searchTerms.trim().replace(' ', "+");

		const queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerms}&fq=source:(The+New+York+Times)&api-key=${process.env.NYT_API || '4bbabbfc37dd4786914ca930e35dd905'}`;
		
    this.props.callFetch(queryURL);
		
	}

	handleSelect(e) {
		this.setState({numRecords: e.target.value});
	}

	reset(e) {
		this.setState({searchTerms: '', numRecords: 10});
	}

	render() {
		
		return (
			<div className="panel panel-default">

        <PanelHeading toggle={this.toggleExpand.bind(this)} glyph='search' title='Search Your Meal'/>
        
        <Collapse in={this.state.open}>
        	<div className="panel-body">

          	<form onSubmit={this.handleSubmit.bind(this)}>

              <FormGroup>
                <ControlLabel className='pull-left'>Search Term:</ControlLabel>
                <FormControl
                	type="text" 
                	placeholder="Anything" 
                	value={this.state.searchTerms}
                	onChange={this.handleInputChange.bind(this)}
                />
              </FormGroup>
        
              <FormGroup controlId="formControlsSelect">
                <ControlLabel className='pull-left'>Number of Records to Retrieve</ControlLabel>
                <FormControl componentClass="select" onChange={this.handleSelect.bind(this)}>
                  <option>10</option>
                  <option>5</option>
                  <option>1</option>
                </FormControl>
              </FormGroup>

            
              <Button type="submit" className='pull-left'>
              	<Glyphicon glyph='search'>&nbsp;Search</Glyphicon>              	
              </Button>
              
              <Button	type="reset" className="pull-left" onClick={this.reset}>
              	<Glyphicon glyph='trash'>&nbsp;Clear</Glyphicon>
              </Button>
            
            </form>
        </div>
      </Collapse>
    </div>

		)


	}


}