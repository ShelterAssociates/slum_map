<?php
/**
 * @file
 * slum_maps.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function slum_maps_views_default_views() {
  $export = array();

  $view = new view;
  $view->name = 'slum_map';
  $view->description = 'Create JSON for slums categorized by taxonomy terms';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Slum Data';
  $view->core = 7;
  $view->api_version = '3.0-alpha1';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Slum Map';
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['query_comment'] = FALSE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '100';
  $handler->display->display_options['style_plugin'] = 'views_json';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['title']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['title']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = 0;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = 0;
  $handler->display->display_options['fields']['title']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['title']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['title']['alter']['html'] = 0;
  $handler->display->display_options['fields']['title']['hide_empty'] = 0;
  $handler->display->display_options['fields']['title']['empty_zero'] = 0;
  $handler->display->display_options['fields']['title']['link_to_node'] = 1;
  /* Field: Field: Shape */
  $handler->display->display_options['fields']['field_geo_polygon']['id'] = 'field_geo_polygon';
  $handler->display->display_options['fields']['field_geo_polygon']['table'] = 'field_data_field_geo_polygon';
  $handler->display->display_options['fields']['field_geo_polygon']['field'] = 'field_geo_polygon';
  $handler->display->display_options['fields']['field_geo_polygon']['label'] = 'shape';
  $handler->display->display_options['fields']['field_geo_polygon']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['field_geo_polygon']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_geo_polygon']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_geo_polygon']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_geo_polygon']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_geo_polygon']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_geo_polygon']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_geo_polygon']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_geo_polygon']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_geo_polygon']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_geo_polygon']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_geo_polygon']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_geo_polygon']['element_label_colon'] = 0;
  $handler->display->display_options['fields']['field_geo_polygon']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_geo_polygon']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_geo_polygon']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_geo_polygon']['hide_alter_empty'] = 0;
  $handler->display->display_options['fields']['field_geo_polygon']['field_api_classes'] = 0;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['nid']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['nid']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['nid']['alter']['external'] = 0;
  $handler->display->display_options['fields']['nid']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['nid']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['nid']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['nid']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['nid']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['nid']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['nid']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['nid']['alter']['html'] = 0;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['nid']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['nid']['hide_empty'] = 0;
  $handler->display->display_options['fields']['nid']['empty_zero'] = 0;
  $handler->display->display_options['fields']['nid']['hide_alter_empty'] = 0;
  $handler->display->display_options['fields']['nid']['link_to_node'] = 0;
  /* Field: Content: About */
  $handler->display->display_options['fields']['field_about']['id'] = 'field_about';
  $handler->display->display_options['fields']['field_about']['table'] = 'field_data_field_about';
  $handler->display->display_options['fields']['field_about']['field'] = 'field_about';
  $handler->display->display_options['fields']['field_about']['label'] = 'about';
  $handler->display->display_options['fields']['field_about']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['field_about']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_about']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_about']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_about']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_about']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_about']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_about']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_about']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_about']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_about']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_about']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_about']['element_label_colon'] = 1;
  $handler->display->display_options['fields']['field_about']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_about']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_about']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_about']['hide_alter_empty'] = 0;
  $handler->display->display_options['fields']['field_about']['field_api_classes'] = 0;
  /* Field: Content: Development */
  $handler->display->display_options['fields']['field_development']['id'] = 'field_development';
  $handler->display->display_options['fields']['field_development']['table'] = 'field_data_field_development';
  $handler->display->display_options['fields']['field_development']['field'] = 'field_development';
  $handler->display->display_options['fields']['field_development']['label'] = 'development';
  $handler->display->display_options['fields']['field_development']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['field_development']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_development']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_development']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_development']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_development']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_development']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_development']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_development']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_development']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_development']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_development']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_development']['element_label_colon'] = 1;
  $handler->display->display_options['fields']['field_development']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_development']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_development']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_development']['hide_alter_empty'] = 0;
  $handler->display->display_options['fields']['field_development']['settings'] = array(
    'node_reference_view_mode' => 'full',
  );
  $handler->display->display_options['fields']['field_development']['field_api_classes'] = 0;
  /* Field: Content: Factsheets */
  $handler->display->display_options['fields']['field_file']['id'] = 'field_file';
  $handler->display->display_options['fields']['field_file']['table'] = 'field_data_field_file';
  $handler->display->display_options['fields']['field_file']['field'] = 'field_file';
  $handler->display->display_options['fields']['field_file']['label'] = 'factsheets';
  $handler->display->display_options['fields']['field_file']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['field_file']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_file']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_file']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_file']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_file']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_file']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_file']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_file']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_file']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_file']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_file']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_file']['element_label_colon'] = 1;
  $handler->display->display_options['fields']['field_file']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_file']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_file']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_file']['hide_alter_empty'] = 0;
  $handler->display->display_options['fields']['field_file']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_file']['type'] = 'file_url_plain';
  $handler->display->display_options['fields']['field_file']['group_rows'] = 1;
  $handler->display->display_options['fields']['field_file']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_file']['delta_reversed'] = 0;
  $handler->display->display_options['fields']['field_file']['field_api_classes'] = 0;
  /* Field: Content: Latitude */
  $handler->display->display_options['fields']['field_latitude']['id'] = 'field_latitude';
  $handler->display->display_options['fields']['field_latitude']['table'] = 'field_data_field_latitude';
  $handler->display->display_options['fields']['field_latitude']['field'] = 'field_latitude';
  $handler->display->display_options['fields']['field_latitude']['label'] = 'latitude';
  $handler->display->display_options['fields']['field_latitude']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['field_latitude']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_latitude']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_latitude']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_latitude']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_latitude']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_latitude']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_latitude']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_latitude']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_latitude']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_latitude']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_latitude']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_latitude']['element_label_colon'] = 1;
  $handler->display->display_options['fields']['field_latitude']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_latitude']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_latitude']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_latitude']['hide_alter_empty'] = 0;
  $handler->display->display_options['fields']['field_latitude']['settings'] = array(
    'thousand_separator' => '',
    'decimal_separator' => '.',
    'scale' => '10',
    'prefix_suffix' => 1,
  );
  $handler->display->display_options['fields']['field_latitude']['field_api_classes'] = 0;
  /* Field: Content: Longitude */
  $handler->display->display_options['fields']['field_longitude']['id'] = 'field_longitude';
  $handler->display->display_options['fields']['field_longitude']['table'] = 'field_data_field_longitude';
  $handler->display->display_options['fields']['field_longitude']['field'] = 'field_longitude';
  $handler->display->display_options['fields']['field_longitude']['label'] = 'longitude';
  $handler->display->display_options['fields']['field_longitude']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['field_longitude']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_longitude']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_longitude']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_longitude']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_longitude']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_longitude']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_longitude']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_longitude']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_longitude']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_longitude']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_longitude']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_longitude']['element_label_colon'] = 1;
  $handler->display->display_options['fields']['field_longitude']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_longitude']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_longitude']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_longitude']['hide_alter_empty'] = 0;
  $handler->display->display_options['fields']['field_longitude']['settings'] = array(
    'thousand_separator' => '',
    'decimal_separator' => '.',
    'scale' => '10',
    'prefix_suffix' => 1,
  );
  $handler->display->display_options['fields']['field_longitude']['field_api_classes'] = 0;
  /* Field: Content: Ward */
  $handler->display->display_options['fields']['field_ward']['id'] = 'field_ward';
  $handler->display->display_options['fields']['field_ward']['table'] = 'field_data_field_ward';
  $handler->display->display_options['fields']['field_ward']['field'] = 'field_ward';
  $handler->display->display_options['fields']['field_ward']['label'] = 'ward';
  $handler->display->display_options['fields']['field_ward']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['field_ward']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_ward']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_ward']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_ward']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_ward']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_ward']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_ward']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_ward']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_ward']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_ward']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_ward']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_ward']['element_label_colon'] = 1;
  $handler->display->display_options['fields']['field_ward']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_ward']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_ward']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_ward']['hide_alter_empty'] = 0;
  $handler->display->display_options['fields']['field_ward']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_ward']['field_api_classes'] = 0;
  /* Field: Content: City */
  $handler->display->display_options['fields']['field_city']['id'] = 'field_city';
  $handler->display->display_options['fields']['field_city']['table'] = 'field_data_field_city';
  $handler->display->display_options['fields']['field_city']['field'] = 'field_city';
  $handler->display->display_options['fields']['field_city']['label'] = 'city';
  $handler->display->display_options['fields']['field_city']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['field_city']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_city']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_city']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_city']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_city']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_city']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_city']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_city']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_city']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_city']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_city']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_city']['element_label_colon'] = 1;
  $handler->display->display_options['fields']['field_city']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_city']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_city']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_city']['hide_alter_empty'] = 0;
  $handler->display->display_options['fields']['field_city']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_city']['field_api_classes'] = 0;
  /* Sort criterion: Content: Title */
  $handler->display->display_options['sorts']['title']['id'] = 'title';
  $handler->display->display_options['sorts']['title']['table'] = 'node';
  $handler->display->display_options['sorts']['title']['field'] = 'title';
  /* Contextual filter: Content: Has taxonomy term ID */
  $handler->display->display_options['arguments']['tid']['id'] = 'tid';
  $handler->display->display_options['arguments']['tid']['table'] = 'taxonomy_index';
  $handler->display->display_options['arguments']['tid']['field'] = 'tid';
  $handler->display->display_options['arguments']['tid']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['tid']['default_argument_skip_url'] = 0;
  $handler->display->display_options['arguments']['tid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['tid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['tid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['tid']['specify_validation'] = 1;
  $handler->display->display_options['arguments']['tid']['validate']['type'] = 'taxonomy_term';
  $handler->display->display_options['arguments']['tid']['validate_options']['vocabularies'] = array(
    'cities' => 'cities',
    'categories' => 0,
    'gallery_collections' => 0,
    'municipal_wards' => 0,
    'tags' => 0,
  );
  $handler->display->display_options['arguments']['tid']['validate_options']['transform'] = 0;
  $handler->display->display_options['arguments']['tid']['break_phrase'] = 0;
  $handler->display->display_options['arguments']['tid']['add_table'] = 0;
  $handler->display->display_options['arguments']['tid']['require_value'] = 0;
  $handler->display->display_options['arguments']['tid']['reduce_duplicates'] = 0;
  $handler->display->display_options['arguments']['tid']['set_breadcrumb'] = 0;
  /* Contextual filter: Content: Has taxonomy term ID */
  $handler->display->display_options['arguments']['tid_1']['id'] = 'tid_1';
  $handler->display->display_options['arguments']['tid_1']['table'] = 'taxonomy_index';
  $handler->display->display_options['arguments']['tid_1']['field'] = 'tid';
  $handler->display->display_options['arguments']['tid_1']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['tid_1']['summary']['format'] = 'default_summary';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 0;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'slum' => 'slum',
  );

  /* Display: Slum by City */
  $handler = $view->new_display('page', 'Slum by City', 'page');
  $handler->display->display_options['path'] = 'slum-data/%';

  /* Display: Slum by city and ward */
  $handler = $view->new_display('page', 'Slum by city and ward', 'page_1');
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Contextual filter: Content: Has taxonomy term ID */
  $handler->display->display_options['arguments']['tid']['id'] = 'tid';
  $handler->display->display_options['arguments']['tid']['table'] = 'taxonomy_index';
  $handler->display->display_options['arguments']['tid']['field'] = 'tid';
  $handler->display->display_options['arguments']['tid']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['tid']['default_argument_skip_url'] = 0;
  $handler->display->display_options['arguments']['tid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['tid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['tid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['tid']['specify_validation'] = 1;
  $handler->display->display_options['arguments']['tid']['validate']['type'] = 'taxonomy_term';
  $handler->display->display_options['arguments']['tid']['validate_options']['vocabularies'] = array(
    'cities' => 'cities',
    'categories' => 0,
    'gallery_collections' => 0,
    'municipal_wards' => 0,
    'tags' => 0,
  );
  $handler->display->display_options['arguments']['tid']['validate_options']['transform'] = 0;
  $handler->display->display_options['arguments']['tid']['break_phrase'] = 0;
  $handler->display->display_options['arguments']['tid']['add_table'] = 0;
  $handler->display->display_options['arguments']['tid']['require_value'] = 0;
  $handler->display->display_options['arguments']['tid']['reduce_duplicates'] = 0;
  $handler->display->display_options['arguments']['tid']['set_breadcrumb'] = 0;
  /* Contextual filter: Content: Has taxonomy term ID */
  $handler->display->display_options['arguments']['tid_1']['id'] = 'tid_1';
  $handler->display->display_options['arguments']['tid_1']['table'] = 'taxonomy_index';
  $handler->display->display_options['arguments']['tid_1']['field'] = 'tid';
  $handler->display->display_options['arguments']['tid_1']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['tid_1']['default_argument_skip_url'] = 0;
  $handler->display->display_options['arguments']['tid_1']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['tid_1']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['tid_1']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['tid_1']['specify_validation'] = 1;
  $handler->display->display_options['arguments']['tid_1']['validate']['type'] = 'taxonomy_term';
  $handler->display->display_options['arguments']['tid_1']['validate_options']['vocabularies'] = array(
    'municipal_wards' => 'municipal_wards',
    'categories' => 0,
    'cities' => 0,
    'gallery_collections' => 0,
    'tags' => 0,
  );
  $handler->display->display_options['arguments']['tid_1']['validate_options']['transform'] = 0;
  $handler->display->display_options['arguments']['tid_1']['break_phrase'] = 0;
  $handler->display->display_options['arguments']['tid_1']['add_table'] = 0;
  $handler->display->display_options['arguments']['tid_1']['require_value'] = 0;
  $handler->display->display_options['arguments']['tid_1']['reduce_duplicates'] = 0;
  $handler->display->display_options['arguments']['tid_1']['set_breadcrumb'] = 0;
  $handler->display->display_options['path'] = 'slum-data/%/%';
  $export['slum_map'] = $view;

  return $export;
}
