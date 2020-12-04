<?php

/**
 * Plugin Name: We Use Cookies
 * Description: Let your visitors know that your website uses cookies.
 * Version: 0.1.0
 * Plugin URI: https://timbr.dev/
 * Author: Tim Brugman
 * Author URI: https://timbr.dev/
 * Text Domain: we-use-cookies
 */

if ( !defined( 'ABSPATH' ) )
    exit;

/**
 * Cookie already set? Do nothing.
 */

if ( isset( $_COOKIE['i_accept_cookies'] ) )
    return;

/**
 * JS & CSS.
 */

add_action( 'wp_enqueue_scripts', function () {

    wp_enqueue_script( 'we-use-cookies', plugin_dir_url( __FILE__ ).'we-use-cookies.min.js', [], '0.1.0', true );

    if ( apply_filters( 'wuc_css', true ) )
        wp_enqueue_style( 'we-use-cookies', plugin_dir_url( __FILE__ ).'we-use-cookies.min.css', [], '0.1.0', 'all' );
});

/**
 * HTML.
 */

add_action( 'wp_footer', function () {

    $message = 'We use cookies.';
    $message = apply_filters( 'wuc_message', $message );

    $classes = 'bottom center';
    $classes = apply_filters( 'wuc_classes', $classes );

    $more_info_page_id = apply_filters( 'wuc_more_info_page_id', false );
?>
<div id="we-use-cookies" class="<?=$classes;?>">
    <p class="message"><?php _e( $message, 'we-use-cookies' ); ?></p>
    <ul class="buttons">
        <li><a href="#" class="primary" onclick="return wuc_accept_cookies();"><?php _e( 'OK', 'we-use-cookies' ); ?></a></li>
<?php if ( $more_info_page_id ): ?>
        <li><a href="<?=get_permalink( $more_info_page_id );?>" class="secondary"><?php _e( 'More info', 'we-use-cookies' ); ?></a></li>
<?php endif; ?>
    </ul>
</div>
<?php
});

