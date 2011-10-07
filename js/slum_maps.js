slumMapConstants = {
  SLUM_COLOUR: "#FF0000",
  WARD_COLOUR: "#FFFFFF",
};

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
  addWard: function(wardShapeStr) {
    new SlumMapMarker(this, wardShapeStr, slumMapConstants.WARD_COLOUR, false)
  },

  addNonClickableSlum: function(slumShapeStr) {
    new SlumMapMarker(this, slumShapeStr, slumMapConstants.SLUM_COLOUR, false)
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
   * fetch ward data
   */
  addWards: function(cityId) {
    jQuery.ajax({
      url: '/ward-data/' + cityId,
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
  var colour = slumMapUtils.wardNameToColour(ward.name);
  if (latLngs.length) {
    this.slumShape = new google.maps.Polygon({
      paths: latLngs,
      clickable: true,
      strokeColor: colour,
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: colour,
      fillOpacity: 0.35,
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

  wardNameToColour: function(name) {
    switch (name) {
      case 'Bibwewadi Ward': 
        return '#EA7525';
      case 'Aundh Ward': 
        return '#392C13';
      case 'Bhavani Peth Ward': 
        return '#4A748C';
      default:
        return '#0D1B24';
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
}

