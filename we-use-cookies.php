<?php

/*
Plugin Name: We Use Cookies
Description: Let your visitors know that your website uses cookies.
Version: 2.0.0
Plugin URI: https://mediumrare.dev/
Author: Medium Rare
Author URI: https://mediumrare.dev/
Text Domain: we-use-cookies
Domain Path: /languages
*/

if ( !defined( 'ABSPATH' ) )
    exit;

/**
 * CSS.
 */

add_action( 'wp_enqueue_scripts', function () {
    if ( apply_filters( 'wuc_css', true ) )
        wp_enqueue_style( 'we-use-cookies', plugin_dir_url( __FILE__ ).'we-use-cookies.min.css', [], '2.0.0', 'all' );
});

/**
 * HTML.
 */

add_action( 'wp_footer', function () {
    $message = apply_filters( 'wuc_message', 'We use cookies.' );
    $classes = apply_filters( 'wuc_classes', 'bottom center' );
    $more_info_page_id = apply_filters( 'wuc_more_info_page_id', false );
?>
<div id="wuc" class="<?=$classes;?>" style="display: none;">
    <p class="wuc__message"><?php _e( $message, 'we-use-cookies' ); ?></p>
    <ul class="wuc__buttons">
        <li><button class="wuc__btn wuc__btn--primary" onclick="wuc_accept();"><?php _e( 'OK', 'we-use-cookies' ); ?></button></li>
<?php if ( $more_info_page_id ): ?>
        <li><a href="<?=get_permalink( $more_info_page_id );?>" class="wuc__btn wuc__btn--secondary"><?php _e( 'More info', 'we-use-cookies' ); ?></a></li>
<?php endif; ?>
    </ul>
</div>
<script><?=file_get_contents( __DIR__.'/we-use-cookies.min.js' );?></script>
<?php
});

/**
 * Translations.
 */

add_action( 'init', function () {
    load_plugin_textdomain( 'we-use-cookies', false, 'we-use-cookies/languages' );
});

