<div id='slum-map'>
    <script type="text/javascript">
    <!--//--><![CDATA[//><!--
    jQuery(document).ready(function () {
        center = new google.maps.LatLng(<?php print $latitude ?>, <?php print $longitude ?>);
        slumMap = new SlumMap(center, <?php print $path ?>, <?php print $tid ?>);
    });
    //--><!]]>
    </script>
</div>
