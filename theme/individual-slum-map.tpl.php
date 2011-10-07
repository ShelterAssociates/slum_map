<div id='slum-map' class='individual-slum-map'>
    <script type="text/javascript">
    <!--//--><![CDATA[//><!--
    jQuery(document).ready(function () {
        center = slumMapUtils.centerOfShapeStr(<?php print "'$slum_shape'"?>);
        slumMap = new SlumMap(center, 17);
        slumMap.addNonClickableSlum(<?php print "'$slum_shape'"?>);
    });
    //--><!]]>
    </script>
</div>
