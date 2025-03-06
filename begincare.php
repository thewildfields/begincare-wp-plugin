<?php
/**
 * Plugin Name:       Begincare
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            The Wild Fields
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       begincare
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_begincare_block_init() {
	register_block_type( __DIR__ . '/build/providers-search' );
	register_block_type( __DIR__ . '/build/providers-display' );
}
add_action( 'init', 'create_block_begincare_block_init' );

add_action( 'admin_menu', '___bgp__register_admin_menu');

function ___bgp__register_admin_menu(){
	add_menu_page( 'API Settings', 'BeginCare', 'manage_options', 'begincare', '___bgp__begincare_callback' );
}

function ___bgp__begincare_callback(){
	require_once plugin_dir_path( __FILE__ ) . '/inc/menupage.php';
}

function ___bgc__enqueue_frontend_assets() {
	wp_enqueue_script(
		'api-key',
		'https://maps.googleapis.com/maps/api/js?key=AIzaSyAcE41Vjv5yIZN-vaXmc3oyVyPH1ksE3zE&libraries=places',
		null,
		null,
	);
}

add_action('wp_enqueue_scripts', '___bgc__enqueue_frontend_assets');