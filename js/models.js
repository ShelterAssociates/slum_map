
var MapModel = Backbone.Model.extend({
  defaults: {
    centre: new google.maps.LatLng(18.5203, 73.8567),
    zoom: 12,
  },
});
var MapModelView = Backbone.View.extend({
  initialize: function() {
    this.map = new google.maps.Map(this.el, {
      'center': this.model.get('centre'),
      'zoom': this.model.get('zoom'),
      'mapTypeId': google.maps.MapTypeId.SATELLITE
    });

    // Update the model when the map is zoomed by the user:
    google.maps.event.addListener(this.map, 'zoom_changed', function() {
      this.model.set('zoom', this.map.getZoom());
    }.bind(this));

    // update the map window when the model is changed programmatically:
    this.model.bind("change:centre", this.recentreMap, this);
    this.model.bind("change:zoom", this.zoomMap, this);
  },
  recentreMap: function(e) {
    this.map.panTo(this.model.get('centre'));
  },
  zoomMap: function(e) {
    this.map.setZoom(this.model.get('zoom'));
  }
});


var Slum = Backbone.Model.extend({
  defaults: {
    title: null,
    shape: null,
    about: null,
    drupalId: null,
    development: null,
    factsheets: null,
    photo: null,
    landOwnership: null
  },
  idAttribute: 'drupalId'
});
var Slums = Backbone.Collection.extend({
  initialize: function(models, options) {
    Backbone.Collection.prototype.initialize.call(this, models, options);
    this.options = options;
  },
  url: function() {
    return '/slum-data/' + this.options.cityId + '/' + this.options.adminId;
  },
  parse: function(response) {
    return _(response.nodes).map(function(item) {
      var node = item.node;
      return {
        shape: node.shape,
        drupalId: node.id,
        about: node.about,
        title: node.title,
        landOwnership: node.field_land_ownership,
        factsheets: node.factsheets,
        photo: node.field_photos,
        development: node.development
      }
    });
  }
});


var Ward = Backbone.Model.extend({
  defaults: {
    name: null,
    shape: null,
    drupalId: null,
    description: null,
    hovered: false,
  },
  idAttribute: 'drupalId'
});
var ElectoralWard = Ward.extend({});
var AdministrativeWard = Ward.extend({});


var Wards = Backbone.Collection.extend({
  initialize: function(models, options) {
    Backbone.Collection.prototype.initialize.call(this, models, options);
    this.options = options;
  },
  parse: function(response) {
    return _(response.nodes).map(function(item) {
      var options = _.clone(this.options.baseModelOptions || {});
      options.shape = item.node.shape;
      options.drupalId = item.node.id;
      options.description = item.node.description;
      options.name = item.node.name;
      return options;
    }.bind(this))
  }
});
var AdministrativeWards = Wards.extend({
  model: AdministrativeWard,
  url: function() {
    return '/ward-data/' + this.options.cityId;
  }
});
var ElectoralWards = Wards.extend({
  model: ElectoralWard,
  url: function() {
    return '/electoral-ward-data/' + this.options.adminId;
  }
});


var WardListView = Backbone.View.extend({
  template: '<a href="#admin/<%= drupalId %>"><%= name %></a>',
  tagName: 'li',
  events: {
    'mouseover a': 'hovered',
    'mouseout a': 'unhovered',
  },
  hovered: function(e) {
    this.model.set('hovered', true);
  },
  unhovered: function(e) {
    this.model.set('hovered', false);
  },
  render: function() {
    var content = _.template(this.template, this.model.toJSON());
    this.$el.html(content);
    return this;
  },
  tearDown: function() {
    this.undelegateEvents();
    this.remove();
  }
});
var ElectoralWardListView = WardListView.extend({
  template: '<a href="#admin/<%= adminId %>/electoral/<%= drupalId %>"><%= name %></a>'
});


var MapShape = Backbone.View.extend({
  initialize: function() {
    this.options.mapModel.on('change:zoom', this.zoomChanged, this);

    this.latLngs = slumMapUtils.shapeStringToLatLngs(this.model.get('shape'));
    this.centre = slumMapUtils.centerOfLatLngs(this.latLngs);
    var colour = this.getColour();
    if (this.latLngs.length) {
      this.shape = new google.maps.Polygon({
        paths: this.latLngs,
        clickable: this.getClickable(),
        strokeColor: colour,
        strokeOpacity: 1,
        strokeWeight: 1.5,
        fillColor: colour,
        fillOpacity: 0.45,
        zIndex: this.getZIndex(),
        map: this.options.mapView.map
      });
    }
    this.customize();
  },
  customize: function() {
  },
  getClickable: function() {
    return true;
  },
  zoomChanged: function(e) {
    var z = e.changed.zoom;
    var showShape = (z >= this.options.lowerZoom) && (z <= this.options.upperZoom);
    this.shape.setVisible(showShape);
  },
  tearDown: function() {
    this.model.off("selected", this.modelWasSelected, this);
    this.model.off("change:hovered", this.modelHoveredChanged, this);
    this.options.mapModel.off("change:zoom", this.zoomChanged, this);
    this.shape.setVisible(false);
    // TODO: map will probably still be referring to polygon here. need to do more...
    this.shape = null;
  }
});


var WardMapShape = MapShape.extend({
  getColour: function() {
    return adminWardColourMap[this.model.get('drupalId')];
  },
  getZIndex: function() {
    return slumMapConstants.ADMIN_ZINDEX;
  },
  customize: function() {
    this.model.bind("selected", this.modelWasSelected, this);
    this.model.bind("change:hovered", this.modelHoveredChanged, this);

    var options = {
      map: this.options.mapView.map, 
      position: this.centre,
      text: '',
      minZoom: 10,
      maxZoom: 15
    };
    var wardLabel = new MapLabel(options);
    google.maps.event.addListener(this.shape, 'mouseover', function(event) {
      wardLabel.text = this.model.get('name');
      wardLabel.changed('text');
    }.bind(this));
    google.maps.event.addListener(this.shape, 'mouseout', function(event) {
      wardLabel.text = '';
      wardLabel.changed('text');
    }.bind(this));
    google.maps.event.addListener(this.shape, 'click', this.clicked.bind(this));
  },
  modelHoveredChanged: function(e) {
    var fillOpacity = (e.changed.hovered) ? 0.65 : 0.45;
    this.shape.setOptions({fillOpacity: fillOpacity});
  },
  modelWasSelected: function(e) {
    this.options.mapModel.set('centre', this.centre);
    this.options.mapModel.set('zoom', 13);
  },
  clicked: function(e) {
    ROUTER.navigate('admin/' + this.model.get('drupalId'), true);
  }
});
var ElectoralWardMapShape = WardMapShape.extend({
  getColour: function() {
    return slumMapUtils.electoralWardColour(this.model.get('drupalId'));
  },
  getZIndex: function() {
    return slumMapConstants.ELECTORAL_ZINDEX;
  },
  clicked: function(e) {
    ROUTER.navigate('admin/' + this.model.get('adminId') +
      '/electoral/' + this.model.get('drupalId'), true);
  }
});


var SlumMapShape = MapShape.extend({
  getColour: function() {
    return slumMapConstants.SLUM_COLOUR;
  },
  getZIndex: function() {
    return slumMapConstants.SLUM_ZINDEX;
  },
  customize: function() {
    google.maps.event.addListener(this.shape, 'click', function(event) {
      new SlumInfoView({el: this.options.infoEl, model: this.model}).render();
    }.bind(this));
  }
});


var InfoView = Backbone.View.extend({
  render: function() {
    this.$el.empty();
    var content = this.getContent();
    this.$el.html(content);
    return this;
  },
  getContent: function() {
    return _.template(this.template, this.model.toJSON());
  }
});
AdminWardInfoView = InfoView.extend({
  template: "<h3><%= name %></h3><p><%= description %></p>"
});
ElectoralWardInfoView = InfoView.extend({
  template: "<h3><%= name %></h3><p><%= description %></p>"
});
SlumInfoView = InfoView.extend({
  getContent: function() {
    template = '<div>' +
      '<img src="<%= photo %>" />' +
      '<h3><%= title %></h3>' +
      '<p><%= about %></p>';
    if (this.model.get('factsheets')) {
      template += '<ul class="factsheet-list">';
      _.each(this.model.get('factsheets').split(','), function(factsheet) {
        template += '<li><a href="' + factsheet + '">Factsheet</a></li>';
      });
      template += '</ul>';
    }
    template += '</div>';
    return _.template(template, this.model.toJSON());
  }
});


var CollectionView = Backbone.View.extend({
  initialize: function() {
    this.memberViews = _([]);
    this.collection.bind('reset', this.render, this);
  },
  viewForModel: function(model) {
    return this.memberViews.find(function(view) {
      return view.model == model;
    });
  },
  tearDown: function() {
    this.memberViews.each(function(memberView) {
      if (memberView.tearDown != undefined) {
        memberView.tearDown();
      }
    });
    this.memberViews = _([]);
  },
  render: function() {
    jQuery(this.el).empty();

    var viewClass = this.options.memberViewClass;

    this.collection.each(function(member) {
      var attrs = _.clone(this.options.viewOptions);
      attrs.model = member;
      this.memberViews.push(new viewClass(attrs));
    }.bind(this));

    if (this.el) {
      this.memberViews.each(function(memberView) {
        $(this.el).append(memberView.render().el);
      }.bind(this));
    }

    return this;
  }
});

var WardRouter = Backbone.Router.extend({
  routes: {
    '': 'setUpCity',
    'admin/:adminId': 'adminWard',
    'admin/:adminId/electoral/:electoralId': 'electoralWard'
  },
  initialize: function(options) {
    this.cityId = options.cityId;
    this.mapModel = new MapModel();
    this.mapView = new MapModelView({el: jQuery('#slum-map'), model: this.mapModel}).render();
    this.infoEl = jQuery('#info-box');
  },
  createCollectionView: function(cls, coll, el, viewOptions) {
    viewOptions = viewOptions || {};
    viewOptions.mapModel = this.mapModel;
    viewOptions.mapView = this.mapView;
    return new CollectionView({
      memberViewClass: cls,
      collection: coll,
      el: el,
      viewOptions: viewOptions
    });
  },
  setUpCity: function() {
    this.adminWards = new AdministrativeWards([], {cityId: this.cityId});

    this.adminWardList = this.createCollectionView(WardListView,
        this.adminWards, jQuery('#ward-list'));
    this.adminWardShapes = this.createCollectionView(WardMapShape,
        this.adminWards, null, {lowerZoom: 1, upperZoom: 12});
    this.adminWards.fetch();

    this.adminWards.on('reset', function() {this.trigger('cityDone')}, this);
  },

  doAfterCitySetUp: function(callback) {
    if (this.adminWards == undefined) {
      this.setUpCity();
      this.on('cityDone', callback, this);
    } else {
      callback();
    }
  },

  adminWard: function(adminId) {
    this.doAfterCitySetUp(function() {
      var adminWard = this.adminWards.get(adminId);
      adminWard.trigger('selected');

      new AdminWardInfoView({el: this.infoEl, model: adminWard}).render();

      this.displayElectoralWards(adminWard);
      this.displaySlums(adminWard);
    }.bind(this));
  },

  displaySlums: function(adminWard) {
    if (this.slums != undefined) {
      this.slumShapes.tearDown();
    }
    var adminId = adminWard.get('drupalId');
    this.slums = new Slums([], {cityId: this.cityId, adminId: adminId});
    this.slums.fetch();
    var viewOptions = {
      lowerZoom: 13,
      upperZoom: 20,
      infoEl: this.infoEl
    };
    this.slumShapes = this.createCollectionView(SlumMapShape,
        this.slums, null, viewOptions);
  },

  displayElectoralWards: function(adminWard) {
    if (this.electoralWards != undefined) {
      this.electoralWardShapes.tearDown();
      this.electoralWardList.tearDown();
    }
    var adminId = adminWard.get('drupalId');
    this.electoralWards = new ElectoralWards([],
      {adminId: adminId, baseModelOptions: {adminId: adminId}});

    var subListEl = jQuery('<ul/>');
    this.adminWardList.viewForModel(adminWard).$el.append(subListEl);

    this.electoralWardList = this.createCollectionView(ElectoralWardListView,
        this.electoralWards, subListEl);
    this.electoralWardShapes = this.createCollectionView(ElectoralWardMapShape,
        this.electoralWards, null, {lowerZoom: 12, upperZoom: 20});
    this.electoralWards.fetch();
  },

  electoralWard: function(adminWardId, electoralWardId) {
    this.doAfterCitySetUp(function() {
      var electoralWard = this.electoralWards.get(electoralWardId);
      new ElectoralWardInfoView({el: this.infoEl, model: electoralWard}).render();
    }.bind(this));
  },
});

jQuery(document).ready(function () {
  ROUTER = new WardRouter({cityId: 14});
  Backbone.history.start();
});
