(function($) {

  'use strict';

  $(document).ready(function(){

    var $custom_css_blocks = $('.blahlab_plexar_custom_css');

    for (var i = 0; i < $custom_css_blocks.length; i++) {
      $custom_css_blocks[i]

      var code = $($custom_css_blocks[i]).html().replace('<!--', '').replace('-->', '');
      var style_elem = '<style type="text/css">' + code + '</style>';
      $('head').append(style_elem);
      $($custom_css_blocks[i]).remove();

    }


    var $custom_js_blocks = $('.blahlab_plexar_custom_js');
    for (var i = 0; i < $custom_js_blocks.length; i++) {
      $custom_js_blocks[i]

      var code = $($custom_js_blocks[i]).html().replace('<!--', '').replace('-->', '');
      var js_elem = '<script type="text/js">' + code + '</script>';
      $('head').append(js_elem);
      $($custom_js_blocks[i]).remove();

    }

    // $('#comments-form input[type=submit]').addClass('button boxed black');


    // $('#load_more_posts').on('click', function(e) {
    //   var load_more_button = this;

    //   e.preventDefault();

    //   if ($(this).hasClass('disabled')) {
    //     return false;
    //   }

    //   $(this).addClass('disabled');

    //   $.post(
    //     ajaxurl,
    //     {
    //       page: $(load_more_button).data('page'),
    //       action: 'blahlab_widget_ajax_blog_posts',
    //       widget_action: 'load_more_posts'
    //     },
    //     function(data){
    //       var data = $.parseJSON(data);

    //       $('.posts').append(data['posts']);

    //       $(load_more_button).data('page', data['page']);
    //       $(load_more_button).removeClass('disabled');

    //       if(!data['posts']) {
    //         $(load_more_button).html('No more').addClass('disabled');
    //       }

    //     }
    //   );

    // });


    // $('.search-submit').addClass('button boxed black small');
    // $('.search-form').addClass('dark');


  });

})(jQuery)