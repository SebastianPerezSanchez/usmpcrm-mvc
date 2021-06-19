$(document).ready(function() {
    
    /*==============Page Loader=======================*/

    $(".loader-wrapper").fadeOut("slow");

    /*===============Page Loader=====================*/

   

  
});







/*==== Sidebar toggle navigation show and hide =====*/

function toggle_menu(ele) {
    //close all ul with children class that are open except the one with the selected id
    $( '.children' ).not( document.getElementById(ele) ).slideUp("Normal");
    $( "#"+ele ).slideToggle("Normal");
    localStorage.setItem('lastTab', ele);
}

function pageLoad() {
    $.each($('.children'), function () {
        let ele = localStorage.getItem('lastTab');
        if ($(this).attr('id') == ele) {
            $( "#"+ele ).slideDown("Normal");
        }
    });
}

pageLoad();