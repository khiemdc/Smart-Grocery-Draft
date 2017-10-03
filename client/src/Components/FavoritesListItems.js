import React, { Component } from 'react';
import { Media, Image, Button, Badge } from 'react-bootstrap';
import FlipMove from 'react-flip-move';
import moment from 'moment';

import helpers from '../utils/helpers';
import '../styles/fav-list-item-buttons.css' 

//client side socket connection
import io from 'socket.io-client'; 
const socket = io(); 

export default class FavoritesListItems extends Component {

	constructor(props){
		super(props);
		this.state = {
			groceries: []
		}
		
		socket.on('new-delete', () => this.refreshSavedGroceries());

		socket.on('new-vote', () => this.refreshSavedGroceries());

		this.refreshSavedGroceries = this.refreshSavedGroceries.bind(this);
		this.sortGroceries = this.sortGroceries.bind(this);
	}

	refreshSavedGroceries() {
		helpers.getSavedGroceries()
    .then(response => {
    	this.setState({groceries: [...this.sortGroceries(response)]})
    }).catch(err=>{
			if(err) {
				console.error(err);
				//this is a great place to show an error on screen
			}
		});
	}

	componentWillMount() {
		this.setState({groceries: [...this.sortGroceries(this.props.groceries)]})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({groceries: [...this.sortGroceries(nextProps.groceries)]})
	}

	toggleDelete(_id, index) {
		
		helpers.removeGrocery(_id)
		.then(response=> {
			socket.emit('remove-event', {deleted: true})
			//copy articles to new array to change array then update state
			let revisedGroceries = this.state.groceries.slice();
			//add property to this article to notify user that the article was saved
			revisedGroceries[index]['deleted'] = true;

			this.setState({groceries: [...revisedGroceries]});
			
			revisedGroceries.splice(index, 1);
			setTimeout(()=>this.setState({groceries: [...revisedGroceries]}), 1000);

		}).catch(err=>{
			if(err) {
				console.error(err);
				//this is a great place to show an error on screen
			}
		});
	}

	sortGroceries(groceries) {
		return groceries.sort((a, b)=> a.likes < b.likes ? 1 : -1);
	}

	handleClick(count, _id){
		// const _id = e.target.parentNode.attributes.name.value;
		// const count = e.target.parentNode.attributes.value.value;
		helpers.incrementVotes(_id, count)
		.then(response => {
			socket.emit('vote-event', {_id, count});
			//copy state to update attribute of one element
			let revisedGroceries = this.state.groceries.slice();
			//update likes on returned object
			revisedGroceries[revisedGroceries.findIndex(e=> e._id === _id)].likes = response.doc.likes;
			//set new state
			this.setState({groceries: [...this.sortGroceries(revisedGroceries)]});
		}).catch(err=>{
			if(err) {
				console.error(err);
				//this is a great place to show an error on screen
			}
		});
	}

	render() {
		if(this.state.groceries.length > 0 ) {
			return (
				<Media.List>			
					<FlipMove duration={1500} easing='ease-in-out' maintainContainerHeight={true}>
						{this.state.groceries.map((grocery, index) => {
								
								let deleted = <i className="fa fa-times" aria-hidden="true"></i>;
								if(grocery.hasOwnProperty('deleted')) {
									deleted = grocery.deleted ? 'Deleted' : <i className="fa fa-times" aria-hidden="true"></i>;
								}

								return (
									<Media.ListItem key={index}>
										<Media.Left>
											<a href={grocery.url} target="_blank">
												<Image src={grocery.imgsrc} alt={`Image for ${grocery.title}`} height={75} width={75}/>
											</a>
										</Media.Left>
										<Media.Body>
											<Media.Heading>
												<a href={grocery.url} target='_blank'>{grocery.title}</a>
											</Media.Heading>
											<p>{grocery.snippet}</p>
											<p>{moment(grocery.pubdate).format('LLLL')}</p>
										</Media.Body>
										<Media.Right>
											<div className='button-list'>

												<div className='button-list--left'>											
												
													<Button  bsStyle='default' bsSize='xsmall' onClick={function() {this.handleClick(1, grocery._id)}.bind(this)}>
														<i className="fa fa-chevron-up"></i>
													</Button>

													<Badge className='button-list__button--middle'>{grocery.likes}</Badge>

													<Button bsStyle='default' bsSize='xsmall' onClick={function() {this.handleClick(-1, grocery._id)}.bind(this)}>
															<i className="fa fa-chevron-down"></i>
													</Button>
												</div>

												<div className='button-list--right'>

													<Button bsStyle='primary' onClick={function() {this.toggleDelete(grocery._id, index)}.bind(this)}>
															{deleted} <i>remove</i>
													</Button>
												</div>

											</div>
	
										</Media.Right>
										<hr/>
									</Media.ListItem>
								)
							})
						}
					</FlipMove>
				</Media.List>
				
			);

		} else {

			return (
				<Media>
					<Media.Body>
						<p><em>Please add an grocery to the Saved Groceries list by first completing a search then clicking on the bookmark icon.</em></p>
					</Media.Body>
				</Media>
			)
		}
	}
}