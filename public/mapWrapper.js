var MapWrapper = function(container, coords, zoom) {
  
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom    
  });
  this.markers = [];
}
 

MapWrapper.prototype = {

  addMarker: function(coords) { // places a marker in the map before hand (without clicking the map)
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap
    });
    this.markers.push(marker);
  },

  addClickEvent: function() { // associates a click on the map to a creation of a marker
    google.maps.event.addListener(this.googleMap, "click", function(event) {
      var position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      this.addMarker(position);
    }.bind(this));
  },

  
  // addChangeEventUs: function() {
  //   google.maps.event.addDomListener(window, "change", function() {
  //     var position = {
  //       lat: 51,
  //       lng: -0.12,
  //     };
  //       this.addMarker(position);
  //     }.bind(this));
  // }

  // bounceMarkers: function() {
  //   this.markers.forEach(function(marker) {
  //     marker.setAnimation(google.maps.Animation.BOUNCE);
  //     })
  //   }
  }

