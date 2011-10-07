<div id='slum-map' class='ward-shape-map'>
    <script type="text/javascript">
    <!--//--><![CDATA[//><!--
    jQuery(document).ready(function () {
        center = new google.maps.LatLng(<?php print $latitude ?>, <?php print $longitude ?>);
        slumMap = new SlumMap(center, 12);
        slumMap.addWards(<?php print $city_id;?>);
    });
    //--><!]]>
    </script>
</div>
