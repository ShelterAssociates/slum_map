var slumMapUtils = {
  /*
   * Parse a space-separated string of coordinates into 
   * an array of LatLng objects.
   */
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

  centerOfShapeStr: function(shapeStr) {
    var latLngs = slumMapUtils.shapeStringToLatLngs(shapeStr);
    if (latLngs.length) {
      return slumMapUtils.centerOfLatLngs(latLngs);
    }
  },

  centerOfLatLngs: function(latLngs) {
    var totalLat = 0; var totalLng = 0;
    var measures = 0;
    jQuery.each(latLngs, function(index, latLng) {
      lat = latLng.lat(); lng = latLng.lng();
      if (lat && lng) {
        measures += 1;
        totalLat += lat;
        totalLng += lng;
      }
    });
    return new google.maps.LatLng(totalLat / measures, 
        totalLng / measures);
  },

  /**
   * Create the info window text for a particular slum.
   */
  slumText: function(slum) {
    var text = '<div class="slum-info-window">';
    text += '<img src="' + slum.field_photos + '" />';
    text += '<h3>' + slum.title + '</h3>';
    text += '<p>' + slum.about + '</p>';

    if (slum.factsheets) {
      text += '<ul class="factsheet-list">';
      jQuery.each(slum.factsheets.split(','), function(index, factsheet) {
        text += '<li><a href="' + factsheet + '">Factsheet</a></li>';
      });
      text += '</ul>';
    }
    return text + '</div>';
  },

  electoralWardColour: function(wardId) {
    wardId = wardId % 5;
    switch(wardId) {
      case 0: return '#c1eaa0';
      case 1: return '#98b7de';
      case 2: return '#d76688';
      case 3: return '#efd0a0';
    }
    return '#efd0a0';
  }
}

slumMapConstants = {
  SLUM_ZINDEX: 1000,
  ADMIN_ZINDEX: 500,
  ELECTORAL_ZINDEX: 750,
  SLUM_COLOUR: "#FF0000",
  NO_DATA: "This information is currently unavailable",

  WARD_COLOUR_1: '#9ad867', // green
  WARD_COLOUR_2: '#638cc0', // blue
  WARD_COLOUR_3: '#d76688', // red
  WARD_COLOUR_4: '#e2b46b', // orange
};

adminWardColourMap = {
  "16": slumMapConstants.WARD_COLOUR_1,
  "18": slumMapConstants.WARD_COLOUR_2,
  "115": slumMapConstants.WARD_COLOUR_4,
  "118": slumMapConstants.WARD_COLOUR_1,
  "128": slumMapConstants.WARD_COLOUR_4,
  "134": slumMapConstants.WARD_COLOUR_3,
  "140": slumMapConstants.WARD_COLOUR_1,
  "146": slumMapConstants.WARD_COLOUR_2,
  "152": slumMapConstants.WARD_COLOUR_1,
  "159": slumMapConstants.WARD_COLOUR_4,
  "167": slumMapConstants.WARD_COLOUR_3,
  "173": slumMapConstants.WARD_COLOUR_1,
  "179": slumMapConstants.WARD_COLOUR_3,
  "186": slumMapConstants.WARD_COLOUR_4,
  "193": slumMapConstants.WARD_COLOUR_2,
}

