let propertyEl = document.querySelector(".property-container");

const apiURL = 'https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002%2C6020&purpose=%20for-rent%7Cfor-sale&hitsPerPage=25&page=0&lang=en&sort=city-level-score&rentFrequency=monthly';
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
        return res.json()
    } else {
        throw new Error("Failed to fetch data")
    }
})
.then(data => {
    // console.log(data)
    if (data && data.hits) {
        const getProperty = data.hits.map(property => {
            console.log(property)
            return `
                <div class="property-card">
                    <img src=${property.coverPhoto.url} class="property-image">
                    <p class="title-price">
                        ${property.title}
                    </p>
                    <p class="title-price">
                        AED ${property.price}
                    </p>
                    <div>
                        <img src="./assets/svg/location-dot-solid.svg" alt="location svg" class="location-svg">
                        <span class="location">
                            ${property.location[2].name}, ${property.location[1].name}
                        </span>
                    </div>
                    <div class="property-purpose">
                        ${property.purpose}
                    </div>
                </div>
            `;
        }).join('');
        propertyEl.innerHTML = getProperty;
    } else {
        throw new Error("Data format is incorrect");
    }
})
.catch(err => {
    console.error("Error fetching data", err);
    propertyEl.innerHTML = "Unable to get properties, kindly try again later";
    propertyEl.style.fontSize = "large"
})