<div id='slum-map'>
    <script type="text/javascript">
    <!--//--><![CDATA[//><!--
    jQuery(document).ready(function () {
        slumMapConstants.FILE_PATH = "<?php print $path ?>";
        center = slumMapUtils.centerOfShapeStr(<?php print "'$ward_shape'"?>);
        slumMap = new SlumMap(center, 13);
        slumMap.addWard(<?php print "'$ward_shape'"?>);
        slumMap.addSlums(<?php print "$city_id, $ward_id" ?>);
    });
    //--><!]]>
    </script>
</div>
