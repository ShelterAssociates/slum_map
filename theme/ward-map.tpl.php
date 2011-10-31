<div id='slum-map' class='ward-map'>
    <script type="text/javascript">
    <!--//--><![CDATA[//><!--
    jQuery(document).ready(function () {
        center = slumMapUtils.centerOfShapeStr(<?php print "'$ward_shape'"?>);
        slumMap = new SlumMap(center, 13);
        slumMap.addWard(<?php print "'$ward_shape', $ward_id" ?>);
        slumMap.addWards(<?php print $ward_id ?>, true);
        slumMap.addSlums(<?php print "$city_id, $ward_id" ?>);
        console.log('done');
    });
    //--><!]]>
    </script>
</div>
