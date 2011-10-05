<?php
/**
 * @file
 * slum_maps.features.inc
 */

/**
 * Implements hook_views_api().
 */
function slum_maps_views_api() {
  list($module, $api) = func_get_args();
  if ($module == "views" && $api == "views_default") {
    return array("version" => "3.0");
  }
}

/**
 * Implements hook_node_info().
 */
function slum_maps_node_info() {
  $items = array(
    'development' => array(
      'name' => t('Development'),
      'base' => 'node_content',
      'description' => t('Describes a Shelter Associates development to house slum residents.'),
      'has_title' => '1',
      'title_label' => t('Name'),
      'help' => '',
    ),
    'slum' => array(
      'name' => t('Slum'),
      'base' => 'node_content',
      'description' => t('Describes a slum, including factsheets and geographic data.'),
      'has_title' => '1',
      'title_label' => t('Slum Name'),
      'help' => '',
    ),
  );
  return $items;
}
