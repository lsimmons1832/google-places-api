$(document).ready(function (){
	let myData = [];
	let First = [];

	const apiKey = "";

$("body").on("click", "li", (e) => {
	console.log(e.target.innerHTML);
	loadPlaces(e.target.innerHTML).then((results) =>{
		writePlaces(results);
	}).catch((error)=> {
		console.log(error);
	});
});

$("body").on("click", ".place", (e) =>{
	let place_id = e.target.id;
	console.log(e);
	loadDetails(place_id).then((result) => {
		writeAddress(result.formatted_address)
	});
});

const loadDetails = (place_id) => {
	return new Promise((resolve,reject) =>{
		$.ajax(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${apiKey}`)
		.done((data) => resolve(data.result))
		.fail((error) => reject(error));
	});
}


	const loadPlaces = (dropdownType) => {
		return new Promise((resolve, reject) =>{
			$.ajax(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.174465,-86.767960&radius=50000&type=${dropdownType}&key=${apiKey}`)
		.done((data) => resolve(data.results))
		.fail((error) => reject(error));
	});
};	

const writeAddress = (address) => {
	let outputString = `<div>${address}</div>`;
	$("#address").html(outputString);
}

const writePlaces = (results)=>{
	let outputString = "";
	for (let i = 0; i < results.length; i++) {
		outputString += `<a href='#'><div class="place" id='${results[i].place_id}'>${results[i].name}</div></a>`;
	}
	$("#input").html(outputString);
};

});
