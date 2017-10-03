import React, { Component } from 'react';

import Header from './Components/Header';
import Footer from './Components/Footer';
import SearchForm from './Components/SearchForm';
import SearchResults from './Components/SearchResults';
import FavoritesList from './Components/FavoritesList';
import NotificationTab from './Components/NotificationTab';

import helpers from './utils/helpers'; 

//client side socket connection
import io from 'socket.io-client'; 
const socket = io(); 

class App extends Component {
	constructor(props) {
		super(props);
		this.state={
			formOpen: false,
			resultsOpen: false,
			favoritesOpen: false,
			groceries: [],
			favoriteGroceries: [],
			newGrocery: {}
		}
		socket.on('new-save', () => this.getSavedGroceries());
		this.getSavedGroceries = this.getSavedGroceries.bind(this);
	}

	componentWillMount() {
		this.getSavedGroceries();
	}

	getSavedGroceries() {
		helpers.getSavedGroceries()
    .then(response => {
    	this.setState({favoriteGroceries: [...response], favoritesOpen: true})
    }).catch(err=>{
			if(err) {
				console.error(err);
				//this is a great place to show an error on screen
			}
		});
	}

	getGroceries(queryURL){
		fetch(queryURL)
		.then(response => response.json())
		.then(data => this.setState({formOpen: false, resultsOpen: true, groceries:[...data.response.docs]}));
	}

  render() {
    return (
      <div className="App">
        <div className="container">

        	<Header/>

        	<NotificationTab/>

	        <SearchForm 
	        	open={this.state.formOpen} 
	        	callFetch={this.getGroceries.bind(this)}
	        />

	        <SearchResults 
	        	open={this.state.resultsOpen} 
	        	groceries={this.state.groceries} 
	        />

	        <FavoritesList
	        	open={this.state.favoritesOpen}
	        	groceries={this.state.favoriteGroceries}
	        />

	      </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
