let propertyEl = document.querySelector(".property-container");

const apiURL = 'https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=8&page=0&lang=en&sort=city-level-score&rentFrequency=monthly';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '305660672cmshd09142b332e0e07p139f55jsn4e13048fda0d',
// 		'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
// 	}
// };

// try {
// 	const response =  fetch(url, options);
// 	const result =  response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }

fetch(apiURL, {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '305660672cmshd09142b332e0e07p139f55jsn4e13048fda0d',
		'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
	}
})
.then(res => {
    if (res.ok) {
        res.json()
    } else {
        propertyEl.textContent = "Unable to get properties, kindly try again later"
    }
})
.then(data => {
    const getProperty = data.hits.map(property => {
        `
            <div class="property-card">
                <img src=${property.coverPhoto.url} class="property-image">
                <p class="title-price">${property.title}</p>
                <p class="title-price">${property.price}</p>
                <div>
                    <img src="./assets/svg/location-dot-solid.svg" alt="location svg" class="location-svg">
                    <span class="location">${property.location[0].name}</span>
                </div>
            </div>
        `.join('')
    propertyEl.innerHTML = getProperty;
    })
})
.catch(err => console.error(err))