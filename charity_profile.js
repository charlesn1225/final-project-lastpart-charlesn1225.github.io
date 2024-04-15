document.addEventListener('DOMContentLoaded', function () {
    // Target the volunteer button more specifically
    const volunteerButton = document.getElementById('volunteer-button');
    const volunteerForm = document.getElementById('volunteer-form');

    // Toggle the form display on button click
    volunteerButton.addEventListener('click', function() {
        volunteerForm.style.display = volunteerForm.style.display === 'block' ? 'none' : 'block';
    });

    const moreInfoButton = document.getElementById('more-info-button');
    const moreInfoContent = document.getElementById('more-info');

    // Toggle the display of more info content on button click
    moreInfoButton.addEventListener('click', () => {
        moreInfoContent.style.display = moreInfoContent.style.display === 'block' ? 'none' : 'block';
    });

    const charityName = document.querySelector('h2');
    let hoverInfoDiv = null;  // Initialize a variable to hold the dynamically created div
    
    // Show additional info when hovering over the charity name
    charityName.addEventListener('mouseover', () => {
        hoverInfoDiv = document.createElement('div');
        hoverInfoDiv.textContent = 'More detailed info about the charity...';
        document.body.appendChild(hoverInfoDiv);
    });

    // Remove the additional info when not hovering over
    charityName.addEventListener('mouseout', () => {
        if (hoverInfoDiv) {
            document.body.removeChild(hoverInfoDiv);
            hoverInfoDiv = null;  // Reset the variable to ensure it's clean for the next hover event
        }
    });

    // Initialize Google Maps with multiple charity locations
    initMap();
});

const locations = [
    { lat: 38.6270, lng: -90.1994, name: "Christian Friends of New Americans", info: "Supporting immigrant and refugee integration." },
    { lat: 38.6297, lng: -90.1989, name: "YMCA Literacy Programs", info: "Helping improve literacy among children and teens." },
    // Add more locations as needed
];

// Function to initialize Google Maps and add markers
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,  // Adjust the zoom level to encompass all markers
        center: { lat: 38.6270, lng: -90.1994 }  // Center of the map
    });

    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.name
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<h3>${location.name}</h3><p>${location.info}</p>`
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}

// Error handling for Google Maps script loading failure
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'SCRIPT' && e.target.src.includes('googleapis')) {
        console.error('Failed to load Google Maps script!');
        document.getElementById('map').innerHTML = 'Failed to load the map. Please try again later.';
    }
});
