<?php
/*
Plugin Name: 🎊 Confettis
Description: Balance des confettis lors de l'enregistrement ou la publication d'un post.
Version: 1.0
Author: Melvin Lemoine
Author URI: https://melvin.studio
*/

function confetti_plugin_enqueue_script($hook)
{
    // Vérifie que l'on est sur la page d'édition d'un post
    if ($hook != 'post.php' && $hook != 'post-new.php') {
        return;
    }

    // Injecte le script de confettis
    wp_enqueue_script('confetti-js', 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js', array(), '1.5.1', true);

    // Injecte notre script personnalisé
    wp_enqueue_script('confetti-custom-js', plugin_dir_url(__FILE__) . 'confetti.js', array('jquery'), '1.0', true);
}

add_action('admin_enqueue_scripts', 'confetti_plugin_enqueue_script');
