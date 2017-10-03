import React, { Component } from 'react';
import { Media, Image, Button } from 'react-bootstrap';
import FlipMove from 'react-flip-move';
import moment from 'moment';

import helpers from '../utils/helpers'; 

//client side socket connection
import io from 'socket.io-client'; 
const socket = io(); 

export default class ResultsListItems extends Component {

	constructor(props){
		super(props);
		this.state = {
			groceries: []
		}
	}

	componentWillMount() {
		this.setState({groceries: [...this.props.groceries]})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({groceries: [...nextProps.groceries]});
	}

	toggleSave(grocery, imgSrc, index){
		
		helpers.saveGrocery({title: grocery.headline.main, url: grocery.web_url, imgsrc: imgSrc, pubdate: grocery.pub_date, snippet: grocery.snippet})
		.then(response=> {
			//good place to emit new saved article message
			socket.emit('save-event', {grocery: response.data});
			//copy articles to new array to change array then update state
			let revisedGroceries = this.state.groceries.slice();
			//add property to this article to notify user that the article was saved
			revisedGroceries[index]['saved'] = true;
			this.setState({groceries: [...revisedGroceries]});
			//add a delay before deleting article from results
			setTimeout(()=>{
				revisedGroceries.splice(index, 1);
				this.setState({groceries: [...revisedGroceries]})
			}, 1000); 
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
					
						{this.state.groceries.map((grocery, index)=> {
								
								const multimedia = grocery.multimedia;
								const srcIndex = multimedia.findIndex(e => e.subtype==='thumbnail');
								let imgSrc = srcIndex === -1 ?  'https://placehold.it/75x75?text=No+Image' : `https://www.nytimes.com/${multimedia[srcIndex].url}`;
								
								let saved = <i className="fa fa-bookmark" aria-hidden="true"></i>;
								if(grocery.hasOwnProperty('saved')) {
									saved = grocery.saved ? 'Saved' : <i className="fa fa-bookmark" aria-hidden="true"></i>;
								}

								return (
									<Media.ListItem key={index}>
										<Media.Left>
											<a href={grocery.web_url} target="_blank">
												<Image src={imgSrc} alt={`Image for ${grocery.headline.main}`} height={75} width={75}/>
											</a>
										</Media.Left>
										<Media.Body>
											<Media.Heading>
												<a href={grocery.web_url} target='_blank'>{grocery.headline.main}</a>
											</Media.Heading>
											<p>{grocery.snippet}</p>
											<p>{moment(grocery.pub_date).format('LLLL')}</p>
										</Media.Body>
										<Media.Right>

											<Button bsStyle='primary' onClick={function() {this.toggleSave(grocery, imgSrc, index)}.bind(this)}>
												{saved}
											</Button>
	
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
						<p><em>Please search for another term for better results.</em></p>
					</Media.Body>
				</Media>
			)
		}
	}
}