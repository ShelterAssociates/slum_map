<div id='right-column'>
</div>

<div id='slum-map' class='ward-shape-map'>
    <script type="text/javascript">
    <!--//--><![CDATA[//><!--
        jQuery(document).ready(function () {
          var centre = new google.maps.LatLng(<?php print $latitude ?>, <?php print $longitude ?>);
          document.ROUTER = new WardRouter({cityId: <?php print $city_id;?>, centre: centre});
          Backbone.history.start();
        });
    //--><!]]>
    </script>
</div>

<div id='info-box'>
</div>
