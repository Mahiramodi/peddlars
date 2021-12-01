let map, infoWindow, curLat = 0,
    curLong = 0,
    loc;

function success(pos) {
    var crd = pos.coords;
    curLat = crd.latitude;
    curLong = crd.longitude;
    loc = {
        lat: curLat,
        lng: curLong
    };
    console.log('Your current position is:');
    console.log(`Latitude : ${curLat}`);
    console.log(`Longitude: ${curLong}`);
    console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
};
navigator.geolocation.getCurrentPosition(success, error);

function initMap() {
    if (curLat != 0 && curLong != 0) {
        const map = new google.maps.Map(document.getElementById("map"), {
            center: {
                lat: curLat,
                lng: curLong
            },
            zoom: 15,
        });
        var marker = new google.maps.Marker({
            position: loc,
            map: map,
            title: "Current Location",
        });
        addMarker({
            lat: 29.4334,
            lng: 76.9702
        });
        addMarker({
            lat: 29.4344,
            lng: 76.9732
        });
        addMarker({
            lat: 29.4344,
            lng: 76.9772
        });

        function addMarker(cords) {
            console.log("adding markers");
            var marker = new google.maps.Marker({
                position: cords,
                map: map,
                icon: `./images/location-2955.png`
            });
            console.log(marker);
        };
    };
};