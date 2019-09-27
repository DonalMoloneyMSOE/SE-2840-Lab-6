var markerOptions = {
    position: position, // position of the push-pin
    map: map,	// the map to put the pin into
    title: bNum, // title of the pin
    //icon:'',
    //scaledSize: new google.maps.Size(10, 10), // scaled size
    icon: {
        url: "https://cdn.vectorstock.com/i/1000x1000/81/30/london-bus-icon-vector-6678130.jpg",
        scaledSize: new google.maps.Size(30, 30)
    },
    clickable: true // if true, enable info window pop-up
};
// create the push-pin marker
var marker = new google.maps.Marker(markerOptions);
markers.push(marker);
console.log(busNum);
console.log(des);
var bDesWindow = {
    title: bDes, // description
    position: position, // where to put it
};

var infoWindow = new google.maps.InfoWindow(bDesWindow);
google.maps.event.addListener(marker, "mouseover", function() {
    console.log("mouseover")
    bDesWindow.open(map);
});