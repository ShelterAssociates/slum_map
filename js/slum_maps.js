/*
 * SlumMap is a class that contains all the functionality related
 * to drawing the map and populating it with polygons/info windows.
 */
var SlumMap = function (center, zoom) {
  this.center = center;

  // create a single infoWindow which will be redrawn with various slums' data
  // as they are clicked.
  this.infoWindow = new google.maps.InfoWindow({
    maxWidth: 400
  });

  mapOptions = {
    'center': this.center,
    'zoom': zoom || 13,
    'mapTypeId': google.maps.MapTypeId.SATELLITE
  };
  this.map = new google.maps.Map(document.getElementById('slum-map'), mapOptions);
};

SlumMap.prototype = {
  addWard: function(wardShapeStr, wardId) {
    var colour = slumMapUtils.wardColour(wardId);
    new SlumMapMarker(this, wardShapeStr, colour, false);
  },

  addNonClickableSlum: function(slumShapeStr) {
    new SlumMapMarker(this, slumShapeStr, slumMapConstants.SLUM_COLOUR, false);
  },

  /**
   * fetch slum data. if successful, send the data to the 
   * callback method to be added to the map.
   */
  addSlums: function(cityId, wardId) {
    jQuery.ajax({
      url: '/slum-data/' + cityId + ((wardId) ? '/' + wardId : ''),
      dataType: 'json',
      success: function(data) {
        jQuery.each(data['nodes'], function(index, el) {
          new SlumMapMarker(this, el.node.shape, slumMapConstants.SLUM_COLOUR, el.node);
        }.bind(this));
      }.bind(this)
    });
  },

  /**
   * Fetch ward data. If electoral is true, we want electoral
   * wards. Otherwise, municipal. 
   */
  addWards: function(id, electoral) {
    if (electoral) 
      url = '/electoral-ward-data/' + id;
    else
      url = '/ward-data/' + id;

    jQuery.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        jQuery.each(data['nodes'], function(index, el) {
          new ClickableWardMarker(this, el.node);
        }.bind(this));
      }.bind(this)
    });
  }

};

/**
 * A SlumMapMarker instance marks a polygon on a SlumMap instance.
 */
var SlumMapMarker = function (slumMap, shape, colour, data) {
  this.slumMap = slumMap;
  this.data = data;
  var latLngs = slumMapUtils.shapeStringToLatLngs(shape);
  var clickable = !!data;
  if (latLngs.length) {
    this.slumShape = new google.maps.Polygon({
      paths: latLngs,
      clickable: clickable,
      strokeColor: colour,
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: colour,
      fillOpacity: 0.35,
      map: slumMap.map
    });

    if (clickable) {
      google.maps.event.addListener(this.slumShape, 'click', function(event) {
        slumMap.infoWindow.setContent(slumMapUtils.slumText(data));
        slumMap.infoWindow.setPosition(event.latLng);
        slumMap.infoWindow.open(slumMap.map);
      });
    }
  }
};
SlumMapMarker.prototype = {
  // add instance methods here
};

/**
 * A SlumMapMarker instance marks a polygon on a SlumMap instance.
 */
var ClickableWardMarker = function (slumMap, ward) {
  this.slumMap = slumMap;
  var latLngs = slumMapUtils.shapeStringToLatLngs(ward.shape);
  var colour = slumMapUtils.wardColour(ward.id);
  if (latLngs.length) {
    this.slumShape = new google.maps.Polygon({
      paths: latLngs,
      clickable: true,
      strokeColor: colour,
      strokeOpacity: 1,
      strokeWeight: 1.5,
      fillColor: colour,
      fillOpacity: 0.45,
      map: slumMap.map
    });

    google.maps.event.addListener(this.slumShape, 'click', function(event) {
        window.location = '/taxonomy/term/' + ward.id;
    });
  }
};

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
      var totalLat = 0;
      var totalLng = 0;
      jQuery.each(latLngs, function(index, latLng) {
        totalLat += latLng.lat();
        totalLng += latLng.lng();
      });
      return new google.maps.LatLng(totalLat / latLngs.length, 
          totalLng / latLngs.length);
    }
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

  wardColour: function(wardId) {
    wardId = wardId % 5;
    switch(wardId) {
      case 0: return slumMapConstants.WARD_COLOUR_0;
      case 1: return slumMapConstants.WARD_COLOUR_1;
      case 2: return slumMapConstants.WARD_COLOUR_2;
      case 3: return slumMapConstants.WARD_COLOUR_3;
      case 4: return slumMapConstants.WARD_COLOUR_4;
    }
    return slumMapConstants.WARD_COLOUR_4;
  }
}

slumMapConstants = {
  SLUM_COLOUR: "#FF0000",
  WARD_COLOUR: "#FFFFFF",
  WARD_COLOUR_0: '#FF66FF',
  WARD_COLOUR_1: '#FFFF00',
  WARD_COLOUR_2: '#66FF66',
  WARD_COLOUR_3: '#66CCFF',
  WARD_COLOUR_4: '#6666FF',
};

