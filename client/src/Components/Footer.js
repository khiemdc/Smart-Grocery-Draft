import React from 'react';
import '../styles/footer.css';

export default () => {

	const date = new Date().getFullYear();
	return (
		<footer className="footer text-center">
	    <span>Copyright&nbsp;
	    	<i className="fa fa-copyright" aria-hidden="true"></i>
	    	{date}&nbsp;project 3
	    </span>
		</footer>
	)
}