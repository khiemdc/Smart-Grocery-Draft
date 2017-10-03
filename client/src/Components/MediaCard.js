import React from 'react';
import { Media, Image } from 'react-bootstrap';

import '../styles/notification-tab.css';

export default props => {
	if(props.grocery.title) {
		return (
			<Media>
				<Media.Left>
					<a href={props.grocery.url} target="_blank">
						<Image src={props.grocery.imgsrc} alt={`Image for ${props.grocery.title}`} height={75} width={75}/>
					</a>
				</Media.Left>
				<Media.Body>
					<Media.Heading>
						<p>New Grocery Recently Saved</p>
					</Media.Heading>
						<a href={props.grocery.url} target='_blank' className='notification-tab--truncate'>{props.grocery.title}</a>
				</Media.Body>
			</Media>
		)
	} else {
		return (
			<Media>
				<p><em>No recently saved groceries. Please search for an grocery and click on the bookmark icon to save a new grocery to read later.</em></p>
			</Media>
		)
	}
}