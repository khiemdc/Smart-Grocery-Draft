const axios = require('axios');

function saveGrocery(grocery) {
	
	return new Promise((resolve, reject) => {
		axios.post("/api/grocery", {grocery}).then(response=>{
			if (response) {
				resolve(response)
			}
		}).catch(err => {
      if (err) {
        reject(err.response.data);
      }
    });
	})
}

function getSavedGroceries() {

	return new Promise((resolve, reject)=> {
		axios.get('/api/groceries').then(response=>{
			if (response) {
				resolve(response.data)
			}
		}).catch(err=> {
			if(err) {
				reject(err.response.data);
			}
		});
	});
}

function removeGrocery(_id) {
	return new Promise((resolve, reject) => {
		axios.delete(`/api/grocery/${_id}`).then(response=>{
			if (response) {
				resolve(response.data)
			}
		}).catch(err=> {
			if(err) {
				reject(err.response.data);
			}
		});
	})
}

function incrementVotes(_id, count) {
	return new Promise((resolve, reject) => {
		axios.put(`/api/grocery/${_id}/${count}`).then(response=>{
			if (response) {
				resolve(response.data)
			}
		}).catch(err=> {
			if(err) {
				reject(err.response.data);
			}
		});
	})

}

module.exports = {
	saveGrocery,
	getSavedGroceries,
	removeGrocery,
	incrementVotes
};