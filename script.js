let propertyEl = document.querySelector(".property-container");
let openModal = null; 

const apiURL = 'https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=16&page=0&lang=en&sort=city-level-score&rentFrequency=monthly';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '305660672cmshd09142b332e0e07p139f55jsn4e13048fda0d',
		'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
	}
};

fetch(apiURL, options)
.then(res => {
    if (res.ok) {
        return res.json()
    } else {
        throw new Error("Failed to fetch data")
    }
})
.then(data => {
    mapProperty(data);
})
.catch(err => {
    console.error("Error fetching data", err);
    propertyEl.innerHTML = "Unable to get properties, kindly try again later";
    propertyEl.style.fontSize = "large"
});

function mapProperty(data) {
    if (data && data.hits) {
        const getProperty = data.hits.map((property, index) => {
            return createPropertyCard(property, index);
        }).join('');
        propertyEl.innerHTML = getProperty;
        attachEventListeners(data.hits);
    } else {
        throw new Error("Data format is incorrect");
    }
    
}

function createPropertyCard(property, index) {
    return `
        <div class="property-card" data-index="${index}">
            <div class="cover-photo">
                <img src=${property.coverPhoto.url} class="property-image">
                <div class="property-purpose">${property.purpose}</div>
            </div>
            <p class="title-price">${property.title}</p>
            <p class="title-price">AED ${property.price}</p>
            <div>
                <img src="./assets/svg/location-dot-solid.svg" alt="location svg" class="location-svg">
                <span class="location">${property.location[2].name}, ${property.location[1].name}</span>
            </div> 
            <div class="property-modal">
                <div class="property-content">
                    <!-- Property details go here -->
                    <span class="close-modal">&times;</span>
                </div>
            </div>                  
        </div>
    `;
}

function attachEventListeners(properties) {
    const propertyCards = document.querySelectorAll(".property-card")
    propertyCards.forEach((card, index) => {
        card.addEventListener("click", () => {
            displayPropertyModal(properties[index], card);
        });
    });
}

function displayPropertyModal(property, card) {
    const propertyModal = card.querySelector(".property-modal");
    const propertyContent = card.querySelector(".property-content");

    propertyContent.innerHTML = `
        <div class="cover-photo">
        <img src=${property.coverPhoto.url} class="property-image">
        <div class="property-purpose">${property.purpose}</div>
        </div>
        <p class="title-price">${property.title}</p>
        <p class="details">Rooms: ${property.rooms}</p>
        <p class="details">Baths: ${property.baths}</p>
        <p class="details">Rent: ${property.rentFrequency}</p>
        <p class="details">Price: <strong>AED ${property.price}</strong></p>
        <p class="details">Agent Contact: ${property.phoneNumber.mobile}</p>
        <div>
            <img src="./assets/svg/location-dot-solid.svg" alt="location svg" class="location-svg">
            <span class="location">${property.location[3].name}, ${property.location[2].name}</span>
        </div>
        <span class="close-modal">&times;</span>
    `;
    
    if (openModal) {
        openModal.style.display = "none";
    }

    propertyModal.style.display = "block";
    openModal = propertyModal;
}

// Close the modal when the close button is clicked (inside a specific modal)
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("close-modal")) {
        const propertyModal = event.target.closest(".property-modal");
        if (propertyModal) {
            propertyModal.style.display = "none";
            openModal = null;
        }
    }
});

// Close the modal when the user clicks outside of it (outside any modal)
document.addEventListener("click", (event) => {
    if (event.target === document.querySelector(".property-container")) {
        if (openModal) {
            openModal.style.display = "none";
            openModal = null;
        }
    }
});

// Prevent clicks inside the modal from closing it (inside any modal)
propertyEl.addEventListener("click", (event) => {
    if (event.target.classList.contains("property-modal")) {
        event.stopPropagation();
    }
});