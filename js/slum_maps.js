/*
 * slumMap is an object that contains all the functionality related
 * to drawing the map and populating it with polygons/info windows.
 */
var SlumMap = function (center, filePath, cityId, wardId) {
  this.center = center;
  this.cityId = cityId;
  this.wardId = wardId;

  // create a single infoWindow which will be redrawn with various slums' data
  // as they are clicked.
  this.infoWindow = new google.maps.InfoWindow();

  this.init();
  this.fetchSlums();
};

SlumMap.prototype = {
  /*
   * Draw the map centered on the given location. Fetch contents 
   * and populate.
   */
  init: function() {
    mapOptions = {
      'center': this.center,
      'zoom': 12,
      'mapTypeId': google.maps.MapTypeId.SATELLITE
    };
    this.map = new google.maps.Map(document.getElementById('slum-map'), mapOptions);
  },

  /*
   * Called with json data retrieved from the slum-data api. Draws
   * polygons for each slum and stores the data for later display.
   */
  drawSlums: function(data) {
    this.slums = {};
    jQuery.each(data['nodes'], function(index, el) {
      var slum = el.node;
      // store this slum against its nid so we can retrieve it later
      this.slums[slum.nid] = slum;

      // creat a clickable polygon overlay for each slum
      var latLngs = slumMap.shapeStringToLatLngs(slum.shape);
      if (latLngs.length) {
        var slumShape = new google.maps.Polygon({
          paths: latLngs,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          map: this.map
        });

        // store the corresponding nid on the polygon
        slumShape['slum_id'] = slum.nid;
        var thiz = this;
        google.maps.event.addListener(slumShape, 'click', function(event) {
          // retrieve slum based on data stored on the polygon object
          var slum = thiz.slums[this.slum_id];
          thiz.infoWindow.setContent(thiz.slumText(slum));
          thiz.infoWindow.setPosition(event.latLng);
          thiz.infoWindow.open(thiz.map);
        });
      }
    }.bind(this));
  },

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

  /**
   * Create the info window text for a particular slum.
   */
  slumText: function(slum) {
    var text = '<div class="slum-info-window">';
    text += '<img src="' + window.slumMapFilePath + '/logo.jpg" />';
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

  /**
   * fetch slum data. if successful, send the data to the 
   * drawSlums method.
   */
  fetchSlums: function() {
    jQuery.ajax({
      url: '/slum-data/' + this.cityId,
      dataType: 'json',
      success: this.drawSlums.bind(this)
    });
  }
}

