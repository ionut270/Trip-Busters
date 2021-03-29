let map, infoWindow;
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;
let ok = 0;


function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 15,
    });
    infoWindow = new google.maps.InfoWindow();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                infoWindow.setPosition(pos);
                infoWindow.setContent(`Your Location. <br> Lat: ${pos.lat} <br> Lng: ${pos.lng} <br>`);
                infoWindow.open(map);
                map.setCenter(pos);
                google.maps.event.addListener(map, "click", (event) => {
                    if (ok != 1) {
                        addMarker(event.latLng, map);
                        ok++;
                        infoWindow.setContent(`Your Location. <br> Lat: ${pos.lat} <br> Lng: ${pos.lng} <br> Point Selected <br> Lat: ${event.latLng.lat()} <br> Lng: ${event.latLng.lng()} <br> `);
                    }
                });
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function addMarker(location, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    new google.maps.Marker({
        position: location,
        label: labels[labelIndex++ % labels.length],
        map: map,
    });
}