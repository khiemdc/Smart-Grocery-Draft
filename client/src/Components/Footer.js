import React from 'react';
import '../styles/footer.css';

export default () => {

	const date = new Date().getFullYear();
	return (
		<footer className="footer text-center">
	    <span>Copyright&nbsp;
	    	<i className="fa fa-copyright" aria-hidden="true"></i>
	    	{date}&nbsp;Team
	    </span>
	    <div>
	    	<a href="https://github.com/khiemdc/" target="_blank">
	    		<i className="fa fa-github" aria-hidden="true"></i>
	    	</a>
	    </div>
		</footer>
	)
}