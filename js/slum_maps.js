var slumMaps = {
  initMap: function() {
    mapOptions = {
      'center': new google.maps.LatLng(window.slumMapCenterLat, window.slumMapCenterLong),
      'zoom': 12,
      'mapTypeId': google.maps.MapTypeId.SATELLITE
    };
    this.map = new google.maps.Map(document.getElementById('slum-map'), mapOptions);
  },

  drawSlums: function(data) {
    jQuery.each(data['nodes'], function(index, el) {
      var node = el.node
      var latLngs = slumMaps.shapeStringToLatLngs(node.shape);
      if (latLngs.length) {
        var slumShape = new google.maps.Polygon({
          paths: latLngs,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          map: slumMaps.map
        });
        google.maps.event.addListener(slumShape, 'click', 
      }
    });
  },

  shapeStringToLatLngs: function(shapeString) {
    if (!shapeString) {
      return [];
    }
    var pointStrings = shapeString.split(' ');
    return jQuery.map(pointStrings, function(pointString, index) {
      var measurements = pointString.split(',');
      var lng = parseFloat(measurements[0]);
      var lat = parseFloat(measurements[1]);
      return new google.maps.LatLng(lat, lng);
    });
  },

  fetchSlums: function() {
    self = this;
    jQuery.ajax({
      url: '/slum-data/' + window.slumMapCityId,
      dataType: 'json',
      success: self.drawSlums
    });
  }
}

var initializeSlumMaps = function() {
  slumMaps.initMap();
  slumMaps.fetchSlums();
}
jQuery(document).ready(initializeSlumMaps);
