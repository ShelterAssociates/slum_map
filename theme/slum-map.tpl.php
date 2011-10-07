<div id='slum-map'>
    <script type="text/javascript">
    <!--//--><![CDATA[//><!--
    jQuery(document).ready(function () {
        slumMapConstants.FILE_PATH = "<?php print $path ?>";
        center = new google.maps.LatLng(<?php print $latitude ?>, <?php print $longitude ?>);
        slumMap = new SlumMap(center, 14);
        slumMap.addSlums(<?php print $city_id; if (isset($ward_id)) print ", $ward_id" ?>);
    });
    //--><!]]>
    </script>
</div>
