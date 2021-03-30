let map, infoWindow;
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;
let ok = 0;
let origin;
let destination;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 15,
    });
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();


    //const locationButton = document.createElement("button");
    // locationButton.textContent = "Pan to Current Location";
    // locationButton.classList.add("custom-map-control-button");
    // map.controls[google.maps.ControlPosition.TOP_CENTER].push(
    //    locationButton
    // );
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
                        origin = { lat: pos.lat, lng: pos.lng };
                        destination = { lat: event.latLng.lat(), lng: event.latLng.lng() };
                        const sendPos1 = `${pos.lat},${pos.lng}`;
                        const sendPos2 = `${event.latLng.lat()},${event.latLng.lng()}`;
                        //locationButton.href = `/directions?id1=${pos}&id2=${event.latLng}`;
                        calculateAndDisplayRoute(directionsService, directionsRenderer);
                        document.getElementById("mode").addEventListener("change", () => {
                            calculateAndDisplayRoute(directionsService, directionsRenderer);
                        });
                        directionsRenderer.setMap(map);

                        let xhr = new XMLHttpRequest();
                        xhr.open('GET', `/directions?id1=${sendPos1}&id2=${sendPos2}`, true);

                        xhr.responseType = 'text';
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.send();

                        xhr.onload = function() {

                            if (xhr.status != 200) {
                                alert(`Error ${xhr.status}: ${xhr.statusText}`);
                            } else {
                                document.getElementById("instructions").innerHTML = xhr.responseText;
                            }
                        }

                        // xmlHttp.open("GET", `/directions?id1=${sendPos1}&id2=${sendPos2}`, true); // true for asynchronous 
                        //  xmlHttp.send(null);
                        // document.getElementById("instructions").innerHTML = xmlHttp.responseText;
                        //console.log("+", xmlHttp.responseText);



                        //locationButton.addEventListener("click", () => {

                        //});
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

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    const selectedMode = document.getElementById("mode").value;
    directionsService.route({
            origin: origin,
            destination: destination,
            // Note that Javascript allows us to access the constant
            // using square brackets and a string value as its
            // "property."
            travelMode: google.maps.TravelMode[selectedMode],
        },
        (response, status) => {
            if (status == "OK") {
                directionsRenderer.setDirections(response);
            } else {
                window.alert("Directions request failed due to " + status);
            }
        }
    );
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