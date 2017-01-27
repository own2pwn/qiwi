jQuery(document).ready(function($) {

  function change_bg_img_css (tag, img_url_first, img_url_second) {
    $(tag).hover(function() {
      $(this).css({"background-image": img_url_first});
    }, function() {
      $(this).css({"background-image": img_url_second});
    });
  }


  $( "a" ).click(function( event ) {
    event.preventDefault();
  });


  var tog_src_arrow = [
    "img/user-collapse-down.svg",  // down image
    "img/user-collapse-up.svg"   // up image
  ];
  $(".top_bar_user_collapse img").click(function(){
    this.src = tog_src_arrow[ this.src.match('user-collapse-down') ? 1 : 0 ];
  });


  $(".top_bar_collapsed_button").click(function() {
    var tog_top = 60 * $(".top_bar_row").length;
    var check_display = $("#top_bar_collapsed_rows").css("display");
    if (check_display != "block") { 
      $("#top_bar_collapsed_rows").addClass('active');  
      $(".top_menu").animate({top: tog_top}, 350);
      $(".main_container").animate({"margin-top": tog_top + 10}, 350);
      $(".top_bar_msgs").fadeIn(350);
    } else {
      $("#top_bar_collapsed_rows").removeClass('active');
      $(".top_menu").animate({top: 60}, 350);
      $(".main_container").animate({"margin-top": 70}, 350);
      $(".top_bar_msgs").fadeOut(350);
    }
    $("#top_bar_collapsed_rows").slideToggle(350);
  });


  var tog_src_cat = [
    "img/menu-proj.jpg",
    "img/menu-proj-close.jpg"
  ];
  $(".top_menu_projects").click(function(){
    var image =  $(".top_menu_projects img").attr("src");
    temp_image = tog_src_cat[ image.match('img/menu-proj.jpg') ? 1 : 0 ];
    $(".top_menu_projects img").attr({src: temp_image});
  }); 

  var tog_src_cat_mobile = [
    "img/menu-proj-mobile.png",
    "img/menu-proj-mobile-close.png"
  ];
  $(".top_menu_projects_mobile").click(function(){
    var image =  $(".top_menu_projects_mobile img").attr("src");
    temp_image = tog_src_cat_mobile[ image.match('img/menu-proj-mobile.png') ? 1 : 0 ];
    $(".top_menu_projects_mobile img").attr({src: temp_image});
  }); 



  function top_menu_handle() {
    var window_width = $(window).width();
    var top_bar = $(".top_bar");
    if (window_width > 767 && top_bar.length == 1) {
      var sticky_position = 60;
    } else {
      var sticky_position = 0;
    }
    if ($("#top_bar_collapsed_rows").hasClass('active')) {
      sticky_position = 60 * $(".top_bar_row").length;
    }
    var scroll = $(window).scrollTop();
    if (scroll > sticky_position) {
      $('.top_menu').css({position: 'fixed', top: '0', left: '0'});
    } else {
      $('.top_menu').css({position: '', top: sticky_position, left: ''});
    }
  }
  // check position on page load
  top_menu_handle();
  // check position on scrolling
  $(window).on("load resize scroll", function () {
    top_menu_handle();
  });


  // show categories menu
  $(".top_menu_projects").click(function() {
    if ($(".top_carousel_caption").length) {
      var current_slide_caption = $(".item.top_carousel_item.active .top_carousel_caption");
      var top_carousel_caption_position = current_slide_caption.offset().left;
      if (top_carousel_caption_position < 350) {
        current_slide_caption.stop().animate({left: 45 + 350 - top_carousel_caption_position}, 350);
      } else {
        current_slide_caption.stop().animate({left: 45}, 350);
      }
    }
    $(".top_menu_categories").stop().animate({width:'toggle'},350);
  });
  $(".top_menu_categories_element")
    .mouseenter(function() {
      var image = $(this).css("background-image").replace("orange", "white");
      $(this).css({"background-image": image});
    })
    .mouseleave(function() {
      var image = $(this).css("background-image").replace("white", "orange");
      $(this).css({"background-image": image});
    });

  // show categories menu mobile
  $(".top_menu_projects_mobile").click(function() {
    $(".top_menu_categories").stop().animate({width:'toggle'},350);
  });
  $(".top_menu_categories_element")
    .mouseenter(function() {
      var image = $(this).css("background-image").replace("orange", "white");
      $(this).css({"background-image": image});
    })
    .mouseleave(function() {
      var image = $(this).css("background-image").replace("white", "orange");
      $(this).css({"background-image": image});
    });

  var tog_src_carousel_left = [
    "img/carousel-left-white.svg",
    "img/carousel-left-orange.svg"
  ];
  $(".top_carousel_control.left img")
    .mousedown(function(){
      this.src = tog_src_carousel_left[ this.src.match('carousel-left-white') ? 1 : 0 ];
    })
    .mouseup(function(){
      this.src = tog_src_carousel_left[0];
    });
  var tog_src_carousel_right = [
    "img/carousel-right-white.svg",
    "img/carousel-right-orange.svg"
  ];
  $(".top_carousel_control.right img")
    .mousedown(function(){
      this.src = tog_src_carousel_right[ this.src.match('carousel-right-white') ? 1 : 0 ];
    })
    .mouseup(function(){
      this.src = tog_src_carousel_right[0];
    });


  var lastScrollTop = 0;

  $(window).scroll(function (event) {
    $hand_speed = 10;
    if(navigator.userAgent.toLowerCase().indexOf('msie') > -1){
      $hand_speed = 150;
    }
    var st = $(this).scrollTop();
    var top_check = parseInt($(".top_carousel_2_slide_hand").css("top"));
    var mult = .3;
    if (top_check > 300) {
       mult = 0;
    }
    if (st > lastScrollTop) {
      // alert(top_check);
      $('.top_carousel_2_slide_hand').stop().animate({top: st * mult}, $hand_speed); 
    } else {
      $('.top_carousel_2_slide_hand').stop().animate({top: st * mult}, $hand_speed);
    }
    lastScrollTop = st;
  });


  function is_scrolled_view (elem, detect_height) {
    if ($(elem).length) {

      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();

      var elemTop = $(elem).offset().top + detect_height;
      var elemBottom = elemTop + $(elem).height();

      return (elemTop <= docViewBottom);
    }
    return false
  }

  $(window).scroll(function() {

    $window_width = $(window).width();

    if ($window_width > 767) {

      $padd_1 = "1.5%";
      $padd_2 = "6%";

      if ($window_width < 1151) {
        $padd_1 = "6%";
        $padd_2 = "1.5%";
      }

      $(".project_card_block.right_to_animate").each(function(index, el) {
        var temp = is_scrolled_view($(this), 60);
        if (temp) { $(this).stop().animate({ "padding-left": "3.5%" }, 450); }
        else { $(this).stop().animate({ "padding-left": "6%" }, 450); }
      });
      $(".project_card_block.left_to_animate").each(function(index, el) {
        var temp = is_scrolled_view($(this), 60);
        if (temp) { $(this).stop().animate({ "padding-left": "3.5%" }, 450); }
        else { $(this).stop().animate({ "padding-left": "1.5%" }, 450); }
      });

      var animate_1 = is_scrolled_view(".project_card_block.first_to_animate", 60);
      if (animate_1) { $('.project_card_block.first_to_animate').stop().animate({ "padding-left": "3.5%" }, 450); } 
      else { $('.project_card_block.first_to_animate').stop().animate({ "padding-left": "6%" }, 450); }

      var animate_2 = is_scrolled_view(".project_card_block.second_to_animate", 60);
      if (animate_2) { $('.project_card_block.second_to_animate').stop().animate({ "padding-left": "3.5%" }, 450); } 
      else { $('.project_card_block.second_to_animate').stop().animate({ "padding-left": $padd_1 }, 450); }

      var animate_3 = is_scrolled_view(".project_card_block.third_to_animate", 60);
      if (animate_3) { $('.project_card_block.third_to_animate').stop().animate({ "padding-left": "3.5%" }, 450); } 
      else { $('.project_card_block.third_to_animate').stop().animate({ "padding-left": $padd_2 }, 450); }

      var animate_4 = is_scrolled_view(".project_card_block.fourth_to_animate", 60);
      if (animate_4) { $('.project_card_block.fourth_to_animate').stop().animate({ "padding-left": "3.5%" }, 450); } 
      else { $('.project_card_block.fourth_to_animate').stop().animate({ "padding-left": "6%" }, 450); }

      var animate_5 = is_scrolled_view(".project_card_block.fifth_to_animate", 60);
      if (animate_5) { $('.project_card_block.fifth_to_animate').stop().animate({ "padding-left": "3.5%" }, 450); } 
      else { $('.project_card_block.fifth_to_animate').stop().animate({ "padding-left": "1.5%" }, 450); }

      var animate_6 = is_scrolled_view("#completed_projects_carousel .project_card_block.sixth_to_animate", 60);
      if (animate_6) { $('#completed_projects_carousel .project_card_block.sixth_to_animate').stop().animate({ "padding-left": "3.5%" }, 450); } 
      else { $('#completed_projects_carousel .project_card_block.sixth_to_animate').stop().animate({ "padding-left": "6%" }, 450); }

      var animate_7 = is_scrolled_view(".container-fluid.subscribe_container", 60);
      if (animate_7) { $('.container-fluid.subscribe_container').stop().animate({ "padding-top": "0%" }, 450); } 
      else { $('.container-fluid.subscribe_container').stop().animate({ "padding-top": "4%" }, 450); }

      var animate_8 = is_scrolled_view(".category_slider_animation", 50);
      if (animate_8) { $('.category_slider_animation').stop().animate({ "padding-top": "0%" }, 450); } 
      else { $('.category_slider_animation').stop().animate({ "padding-top": "2.5%" }, 450); }
    }
  });



  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $('.second_block_right_item span').stop().animate({ opacity: '1', top: "10%" }, 350);
    } else {
        $('.second_block_right_item span').stop().animate({ opacity: '0', top: "5%" }, 350);
    }
  });


  $( window ).resize(function() {
    var window_width = $(window).width();
    if (window_width <= 1150 && window_width > 900) {
      $(".square_cards_item_bar").stop().fadeOut(100);
      $(".square_cards_item_description").stop().fadeOut(100);
      $(".square_cards_item_mask").stop().animate({ "height": "100", "margin-top": "220" }, 100);
    } else if (window_width <= 900 && window_width > 750) {
      $(".square_cards_item_bar").stop().fadeOut(100);
      $(".square_cards_item_description").stop().fadeOut(100);
      $(".square_cards_item_mask").stop().animate({ "height": "80", "margin-top": "165" }, 100);
    } else if (window_width > 1150) {
      $(".square_cards_item_description").stop().fadeOut(100);
      $(".square_cards_item_mask").stop().animate({ "height": "165", "margin-top": "285" }, 100);
      $(".square_cards_item_bar").stop().fadeIn(100);
    } else {
      $(".square_cards_item_mask").stop().animate({ "height": "245", "margin-top": "0" }, 100);
      $(".square_cards_item_bar").stop().fadeIn(100);
    }
  });
  var timeoutId;
  $(".square_cards_item_mask").hover(function() {
    var temp_mask = $(this);
    var temp_description = $(this).find(".square_cards_item_description");
    var temp_status_bar = $(this).find(".square_cards_item_bar");
    if (!timeoutId) {
      timeoutId = window.setTimeout(function() {
        timeoutId = null;
        $(temp_mask).addClass('active');
        $(temp_mask).stop().animate({ "height": "100%", "margin-top": "0" }, 300);
        $(temp_description).stop().fadeIn(300);
        var window_width = $(window).width();
        if (window_width < 1151) {
          $(temp_status_bar).stop().fadeIn(300);
        }
      }, 100);
    }
  },
  function () {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
    } else {
      var window_width = $(window).width();
      $(".square_cards_item_mask").removeClass('active');
      if (window_width <= 1150 && window_width > 900) {
        $(".square_cards_item_bar").stop().fadeOut(300);
        $(".square_cards_item_description").stop().fadeOut(300);
        $(".square_cards_item_mask").stop().animate({ "height": "100", "margin-top": "220" }, 300);
      } else if (window_width <= 900  && window_width > 750) {
        $(".square_cards_item_bar").stop().fadeOut(100);
        $(".square_cards_item_description").stop().fadeOut(100);
        $(".square_cards_item_mask").stop().animate({ "height": "80", "margin-top": "165" }, 300);
      } else if (window_width > 1150) {
        $(".square_cards_item_description").stop().fadeOut(300);
        $(".square_cards_item_mask").stop().animate({ "height": "165", "margin-top": "285" }, 300);
      } else {
        $(".square_cards_item_mask").stop().animate({ "height": "245", "margin-top": "0" }, 100);
        $(".square_cards_item_bar").stop().fadeIn(100);
      }
    }
  });

  if ($("#category_slider").length) {

    var window_width = $(window).width();
    var slide_margin = 20;
    if (window_width < 1370) {
      slide_margin = 10;
    }
    $cat_slider = $("#category_slider").lightSlider({  
      item: 4,
      autoWidth: true,
      slideMove: 1, // slidemove will be 1 if loop is true
      slideMargin: slide_margin,
      pager: false,
    });

    $(window).resize(function() {
      if ($cat_slider.lightSlider != null) {
        $cat_slider.destroy();
      }
      var window_width = $(window).width();
      if (window_width < 1370 && window_width > 900) {
        $cat_slider =  $("#category_slider").lightSlider({
          item: 4,
          autoWidth: true,
          slideMove: 1, // slidemove will be 1 if loop is true
          slideMargin: 10,
          pager: false,
        });
      } else if (window_width <= 900) {
        $cat_slider =  $("#category_slider").lightSlider({
          item: 3,
          autoWidth: true,
          slideMove: 1, // slidemove will be 1 if loop is true
          slideMargin: 10,
          pager: false,
        });
      } else {
        $cat_slider = $("#category_slider").lightSlider({
          item: 4,
          autoWidth: true,
          slideMove: 1, // slidemove will be 1 if loop is true
          slideMargin: 20,
          pager: false,
        });
      }
    }); 

    $(".categories_carousel_button.prev").click(function() {
      $(".categories_carousel .lSPrev").trigger( "click" );
    });
    $(".categories_carousel_button.next").click(function() {
      $(".categories_carousel .lSNext").trigger( "click" );
    });
  }


  var window_width = $(window).width();
  if (window_width < 1151) {
    var temp_1 = $(".container-fluid.promotion_container").detach();
    $(".container-fluid.project_card_video_left").after(temp_1);

    var temp_2 = $(".card_2 .project_card_background").detach();
    $(".card_2 .row").prepend(temp_2);

    var temp_3 = $(".card_3 .project_card_background").detach();
    $(".card_3 .row").append(temp_3);

    var temp_4 = $(".container-fluid.subscribe_container").detach();
    $(".container-fluid.project_card.card_3").after(temp_4);
  }
  $(window).resize(function() {
    var window_width = $(window).width();
    if (window_width < 1151) {
      var temp_1 = $(".container-fluid.promotion_container").detach();
      $(".container-fluid.project_card_video_left").after(temp_1);

      var temp_2 = $(".card_2 .project_card_background").detach();
      $(".card_2 .row").prepend(temp_2);

      var temp_3 = $(".card_3 .project_card_background").detach();
      $(".card_3 .row").append(temp_3);

      var temp_4 = $(".container-fluid.subscribe_container").detach();
      $(".container-fluid.project_card.card_3").after(temp_4);
    } else {
      var temp_1 = $(".container-fluid.promotion_container").detach();
      $(".container-fluid.project_card.card_3").after(temp_1);

      var temp_2 = $(".card_2 .project_card_background").detach();
      $(".card_2 .row").append(temp_2);

      var temp_3 = $(".card_3 .project_card_background").detach();
      $(".card_3 .row").prepend(temp_3);

      var temp_4 = $(".container-fluid.subscribe_container").detach();
      $(".container-fluid.project_card.card_5").after(temp_4);
    } 
  });


  $(".top_menu_item").each(function(index, el) {
    var temp = $(this).width();
    $(this).css('width', temp + 5);
  });

  $(".project_card_menu_second .menu_item").each(function(index, el) {
    var temp = $(this).width();
    $(this).css('width', temp + 5);
  });

  $(".favorites_top_menu .menu_item").each(function(index, el) {
    var temp = $(this).width();
    $(this).css('width', temp + 5);
  });



  var window_width = $(window).width();
  if (window_width <= 767) {
    var footer_3 = $(".footer_block.third").detach();
    $(".footer_block.first").after(footer_3);
  }



  $(".filter_button.categories").click(function() {
    if ($(".categories_filter_list").hasClass('opened')) {
      $(".categories_filter_list").stop().animate({"height": "toggle"}, 300);
      $(".filter_button.categories").css("background-image", "url(img/cats-filter-down.svg)");
      $(".categories_filter_list").removeClass('opened');
    } else {
      $(".categories_filter_list").addClass('opened')
      $(".categories_filter_list").stop().animate({"height": "toggle"}, 300);
      $(".filter_button.categories").css("background-image", "url(img/cats-filter-up.svg)");
    }
  });
  $(".filter_button.cities").click(function() {
    if ($(".cities_filter_list").hasClass('opened')) {
      $(".cities_filter_list").stop().animate({"height": "toggle"}, 300);
      $(".filter_button.cities").css("background-image", "url(img/cats-filter-down.svg)");
      $(".cities_filter_list").removeClass('opened');
    } else {
      $(".cities_filter_list").addClass('opened')
      $(".cities_filter_list").stop().animate({"height": "toggle"}, 300);
      $(".filter_button.cities").css("background-image", "url(img/cats-filter-up.svg)");
    }
  });
  $(document).click(function(e) {
    var class_clicked = e.target.className;
    var menu_classes = [
      "filter_button categories",
      "filter_button cities",
      "category_name active",
      // "category_name"
    ]
    if ($.inArray(class_clicked, menu_classes) == -1 && $(".categories_filter_list").hasClass('opened')) {
      $(".categories_filter_list").stop().animate({"height": "toggle"}, 300);
      $(".filter_button.categories").css("background-image", "url(img/cats-filter-down.svg)");
      $(".categories_filter_list").removeClass('opened');      
    }
    if ($.inArray(class_clicked, menu_classes) == -1 && $(".cities_filter_list").hasClass('opened')) {
      $(".cities_filter_list").stop().animate({"height": "toggle"}, 300);
      $(".filter_button.cities").css("background-image", "url(img/cats-filter-down.svg)");
      $(".cities_filter_list").removeClass('opened');      
    }
  });


  $(".categories_filter_list .category_name").click(function(event) {
    var get_text = $(this).text();
    $(".filter_button.categories").text(get_text);
  });
  $(".cities_filter_list .category_name").click(function(event) {
    var get_text = $(this).text();
    $(".filter_button.cities").text(get_text);
  });


  change_bg_img_css(".footer_social_icon.facebook", "url(img/facebook-icon-orange.svg)", "url(img/facebook-icon-blue.svg)");
  change_bg_img_css(".footer_social_icon.twitter", "url(img/twitter-icon-orange.svg)", "url(img/twitter-icon-blue.svg)");
  change_bg_img_css(".footer_social_icon.instagram", "url(img/instagram-icon-orange.svg)", "url(img/instagram-icon-blue.svg)");
  change_bg_img_css(".footer_social_icon.gplus", "url(img/gplus-icon-orange.svg)", "url(img/gplus-icon-blue.svg)");

  change_bg_img_css(".card_star", "url(img/card-star-orange.svg)", "url(img/card-star.svg)");
  change_bg_img_css(".card_heart", "url(img/card-heart-orange.svg)", "url(img/card-heart.svg)");

  change_bg_img_css(".card_head_left .social .icon.facebook", "url(img/card-header-facebook-orange.svg)", "url(img/card-header-facebook.svg)");
  change_bg_img_css(".card_head_left .social .icon.twitter", "url(img/card-header-twitter-orange.svg)", "url(img/card-header-twitter.svg)");
  change_bg_img_css(".card_head_left .social .icon.vkontakte", "url(img/card-header-vkontakte-orange.svg)", "url(img/card-header-vkontakte.svg)");



  $card_images_slider = $('#card_images_slider').lightSlider({
    autoWidth:true,
    centerSlide:true,
    loop:true,
    pager:false,
    slideMargin: 20,
    controls: false,
    responsive : [{
      breakpoint:900,
      settings: {
        slideMargin: 0,
      }
    }],
    onSliderLoad: function() {
      $('#card_images_slider').removeClass('cS-hidden');
    } 
  });  
  $('.project_card_images_block .carousel_button.prev').on('click', function () {
      $card_images_slider.goToPrevSlide();
  });
  $('.project_card_images_block .carousel_button.next').on('click', function () {
      $card_images_slider.goToNextSlide();
  });


  function centered_slider() {
    var window_width = $(window).width();
    var marg_left = "-35px";
    if (window_width < 1440) {
      marg_left = "-" + (35 + 1440 - window_width) / 2 + "px"; 
    }
    $(".project_card_images_block .lSSlideOuter").css('margin-left', marg_left);
  }

  function centered_three_images() {
    var window_width = $(window).width();
    var marg_left = "0";
    if (window_width <= 750) {
      marg_left = (750 - window_width) / 2; 
    }
    $(".project_card_images_mobile .images_block").css({'margin-left': "-"+marg_left+"px", 'width': window_width + marg_left });
  }

  centered_three_images();
  centered_slider();
  $(window).on('resize load', function(event) {
    centered_slider();
    centered_three_images();
  });



  $("#diagram_block .columns .item div").each(function(index, el) {
    $(this).hover(function() {

      var window_width = $(window).width();

      var padd_left = "100px";
      var marg_left = "-37px";

      if (window_width < 1180) {
        var padd_left = "70px";
        var marg_left = "-47px";
      }

      $(this).css('box-shadow', '-1px 6px 22px rgba(0, 0, 0, 0.5)');
      var item_number = $(this).attr('class');
      var to_action_title = $("#diagram_block .values").find('.item.' + item_number + ' .title');
      var to_action_circle = $("#diagram_block .values").find('.item.' + item_number + ' .circle');
      var to_action_description = $("#diagram_block .values").find('.item.' + item_number + ' .description');

      to_action_title.css({"font-size": "30px", "line-height": "27px", "font-family": "GothamProBold", "margin-top": "-10px", "padding-left": padd_left});
      to_action_circle.css({"width": "25px", "height": "25px", "margin-left": marg_left});
      to_action_description.css({"padding-left": padd_left});

    }, function() {
      $(this).css('box-shadow', 'none');
      $("#diagram_block .values .item .title, #diagram_block .values .item .circle, #diagram_block .values .item .description").each(function(index, el) {
        $(this).removeAttr('style');
      });
    });
  });


  var card_team_slider = $('#card_team_slider').lightSlider({
    loop:false,
    pager:false,
    slideMargin: 20,
    controls: false,
    item:4,
    slideMove: 4,
    responsive : [{
      breakpoint:1300,
      settings: {
        item:3,
        slideMove:3,
        slideMargin: 10,
      }
    }],
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
  });  
  $('.project_card_team_block .carousel_button.prev').on('click', function () {
      card_team_slider.goToPrevSlide();
  });
  $('.project_card_team_block .carousel_button.next').on('click', function () {
      card_team_slider.goToNextSlide();
  });

  var card_investor_slider = $('#card_investor_slider').lightSlider({
    loop:false,
    pager:false,
    slideMargin: 20,
    controls: false,
    item:4,
    slideMove: 4,
    responsive : [{
      breakpoint:1300,
      settings: {
        item:3,
        slideMove:3,
        slideMargin: 10,
      }
    }],
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
  });  
  $('.project_card_investor_block .carousel_button.prev').on('click', function () {
      card_investor_slider.goToPrevSlide();
  });
  $('.project_card_investor_block .carousel_button.next').on('click', function () {
      card_investor_slider.goToNextSlide();
  });


  var card_news_slider_large = $('#card_news_slider_large').lightSlider({
    loop:false,
    pager:false,
    slideMargin: 20,
    controls: false,
    item:3,
    slideMove: 3,
    // enableDrag: true,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
  });  
  $('.project_card_news_block.large .carousel_button.prev').on('click', function () {
      card_news_slider_large.goToPrevSlide();
  });
  $('.project_card_news_block.large .carousel_button.next').on('click', function () {
      card_news_slider_large.goToNextSlide();
  });

  var card_news_slider_small = $('#card_news_slider_small').lightSlider({
    loop:false,
    pager:false,
    slideMargin: 20,
    controls: false,
    item:2,
    slideMove: 2,
    enableDrag: false,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
  });  
  $('.project_card_news_block.small .carousel_button.prev').on('click', function () {
      card_news_slider_small.goToPrevSlide();
  });
  $('.project_card_news_block.small .carousel_button.next').on('click', function () {
      card_news_slider_small.goToNextSlide();
  });


  $(".project_card_news_block .item .news_card").hover(function() {
    $(this).find(".hover_part").stop().animate({"height": "100%"}, 200);
    $(this).find(".text").stop().fadeIn(400);
    $(this).find(".img").css('background-image', 'url(img/news-msgs-blue.svg)');
    $(this).find(".main_part").css('color', '#0023a0');
  }, function() {
    $(this).find(".hover_part").stop().animate({"height": "0"}, 200);
    $(this).find(".text").stop().fadeOut(200);
    $(this).find(".img").css('background-image', '');
    $(this).find(".main_part").css('color', '');
  });


  var card_interested_slider = $('#card_interested_slider').lightSlider({
    loop:false,
    pager:false,
    slideMargin: 20,
    controls: false,
    item:3,
    slideMove: 3,
    enableDrag: true,
    responsive : [{
      breakpoint:1150,
      settings: {
        item:2,
        slideMove:2,
      }
    }],
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
  });  
  $('.project_card_interested_block .carousel_button.prev').on('click', function () {
      card_interested_slider.goToPrevSlide();
  });
  $('.project_card_interested_block .carousel_button.next').on('click', function () {
      card_interested_slider.goToNextSlide();
  });


  $("#diagram_block .values .show_all").click(function(event) {
    $window_width = $(window).width();
    $height_arr = ["282","452"];
    if ($window_width < 750) {
      $height_arr = ["501","770"];
    }

    if ($(this).hasClass('active')) {
      $("#diagram_block .values").stop().animate({"height": $height_arr[0]}, 100);
      $("#diagram_block .values .item.to_hide").stop().fadeOut(200);
      $(this).find('span').stop().fadeIn(200);
      $(this).css('background-image', '');
      $(this).removeClass('active');
    } else {
      $(this).addClass('active');
      $("#diagram_block .values").stop().animate({"height": $height_arr[1]}, 100);
      $("#diagram_block .values .item.to_hide").stop().fadeIn(300);
      $(this).find('span').stop().fadeOut(200);
      $(this).css('background-image', 'url(img/arrow-up-blue.svg)');
    }
  });




  var top_carousel = $('#top_carousel').lightSlider({
    loop:true,
    pager:false,
    slideMargin: 0,
    controls: false,
    item:1,
    slideMove: 1,
    enableDrag: true,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    onSliderLoad: function (el) {
      top_carousel.goToSlide(2); 
    },
  });  
  $('.top_carousel .carousel_button.prev').on('click', function () {
      top_carousel.goToPrevSlide();
  });
  $('.top_carousel .carousel_button.next').on('click', function () {
      top_carousel.goToNextSlide();
  });

  var second_block_carousel = $('#second_block_carousel').lightSlider({
    loop:true,
    pager:false,
    slideMargin: 0,
    controls: false,
    item:1,
    slideMove: 1,
    enableDrag: true,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    onSliderLoad: function (el) {
      second_block_carousel.goToSlide(2); 
    },
  });  
  $('.second_block_carousel .carousel_button.prev').on('click', function () {
      second_block_carousel.goToPrevSlide();
  });
  $('.second_block_carousel .carousel_button.next').on('click', function () {
      second_block_carousel.goToNextSlide();
  });
  
  var completed_projects_carousel = $('#completed_projects_carousel').lightSlider({
    loop:true,
    pager:false,
    slideMargin: 0,
    controls: false,
    item:1,
    slideMove: 1,
    enableDrag: true,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    onSliderLoad: function (el) {
      completed_projects_carousel.goToSlide(2); 
    },
  });  
  $('.completed_projects_carousel .carousel_button.prev').on('click', function () {
      completed_projects_carousel.goToPrevSlide();
  });
  $('.completed_projects_carousel .carousel_button.next').on('click', function () {
      completed_projects_carousel.goToNextSlide();
  });  

  
  var newbies_carousel_mobile = $('#newbies_carousel_mobile').lightSlider({
    loop:true,
    pager:false,
    slideMargin: 0,
    controls: false,
    item:1,
    slideMove: 1,
    enableDrag: true,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    onSliderLoad: function (el) {
      newbies_carousel_mobile.goToSlide(2); 
    },
  });  
  $('.newbies_carousel_mobile .carousel_button.prev').on('click', function () {
      newbies_carousel_mobile.goToPrevSlide();
  });
  $('.newbies_carousel_mobile .carousel_button.next').on('click', function () {
      newbies_carousel_mobile.goToNextSlide();
  });

  
  var interesting_carousel_mobile = $('#interesting_carousel_mobile').lightSlider({
    loop:true,
    pager:false,
    slideMargin: 0,
    controls: false,
    item:1,
    slideMove: 1,
    enableDrag: true,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    onSliderLoad: function (el) {
      interesting_carousel_mobile.goToSlide(2); 
    },
  });  
  $('.interesting_carousel_mobile .carousel_button.prev').on('click', function () {
      interesting_carousel_mobile.goToPrevSlide();
  });
  $('.interesting_carousel_mobile .carousel_button.next').on('click', function () {
      interesting_carousel_mobile.goToNextSlide();
  });
  
  var after_cats_carousel_mobile = $('#after_cats_carousel_mobile').lightSlider({
    loop:true,
    pager:false,
    slideMargin: 0,
    controls: false,
    item:1,
    slideMove: 1,
    enableDrag: true,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    onSliderLoad: function (el) {
      after_cats_carousel_mobile.goToSlide(2); 
    },
  });  
  $('.after_cats_carousel_mobile .carousel_button.prev').on('click', function () {
      after_cats_carousel_mobile.goToPrevSlide();
  });
  $('.after_cats_carousel_mobile .carousel_button.next').on('click', function () {
      after_cats_carousel_mobile.goToNextSlide();
  });



  // $(".card_mobile_menu_item").each(function(index, el) {
  //   if (!$(this).hasClass('collapsed')) {
  //     // $(this).css({"box-shadow": "0 2px 11px rgba(0, 0, 0, 0.08)", "font-weight": "700"});
  //   } 
  // });

  // $(window).on('load resize', '.selector', function(event) {
  //   $window_width = $(window).width();
  //   if ($window_width < 750 && !$budget) {
  //     $budget = $(".container-fluid.project_card_budget").detach();
  //     $(".panel_body_budget").append($budget);
  //   }
  // });


  function setup_search_filter(filter_id, arrow_down, arrow_up) {

    var menu_list = $(filter_id + " .menu_list");
    var menu_item = $(filter_id + " .item");
    var current_name = $(filter_id + " .filter_name");

    current_name.click(function(event) {
      if ($(this).hasClass('active')) {
        menu_list.stop().animate({height : "toggle"}, 300);
        $(this).removeClass('active');
        $(this).css({'background-image': arrow_down,'background-color': '', 'color': ''});
      } else {
        menu_list.stop().animate({height : "toggle"}, 300);
        $(this).addClass('active');
        $(this).css({'background-image': arrow_up,'background-color': '#ffa000', 'color': 'white'});
      }
    });

    menu_item.click(function(event) {
      var temp = $(this).text();
      current_name.text(temp);
      menu_list.stop().animate({height : "toggle"}, 300);
      current_name.removeClass('active');
      current_name.css({'background-image': arrow_down,'background-color': '', 'color': ''});
    });
  }

  setup_search_filter("#sort_by", "url(img/arrow-down-blue.svg)", "url(img/arrow-up-white.svg)"); 
  setup_search_filter("#category", "url(img/arrow-down-blue.svg)", "url(img/arrow-up-white.svg)"); 
  setup_search_filter("#cities", "url(img/arrow-down-blue.svg)", "url(img/arrow-up-white.svg)"); 
  setup_search_filter("#favorites_menu", "url(img/arrow-down-white.svg)", "url(img/arrow-up-white.svg)"); 

  $(document).click(function(e) {
    var class_clicked = e.target.className;
    var filter_classes = [
      "filter_name active",
      "filter item",
      "filter_name",
    ]
    if ($.inArray(class_clicked, filter_classes) == -1) {
      $(".search_filters_group .menu_list").stop().slideUp(300);
      $(".search_filters_group .filter_name").css({'background-image': '','background-color': '', 'color': ''});
      $(".search_filters_group .filter_name").removeClass('active');      
    }
  });



  $(".search_filters .title_low").click(function(event) {
    var window_width = $(window).width();
    var filter_block = $(".search_filters");
    var filters_group = $(".search_filters_group");
    var height_to_animate = "240";
    if (window_width <= 740) {
      height_to_animate = "381";
      if ($(this).hasClass('active')) {
        $(".search_filters .title_low span").show(100);
        $(this).removeClass('active');
      } else {
        $(".search_filters .title_low span").hide(100);
        $(this).addClass('active');
      }

    }
    if (window_width < 1000) {
      if (filter_block.hasClass('active')) {
        filter_block.stop().animate({"height": "60"}, 300);
        filters_group.hide(100);
        filter_block.removeClass('active');
        $(this).css({'background-image': 'url(img/arrow-down-blue.svg)', "background-size": ""});
      } else {
        filters_group.show(100);
        filter_block.stop().animate({"height": height_to_animate}, 300);
        filter_block.addClass('active');
        $(this).css({'background-image': 'url(img/cross-blue.svg)', "background-size": "13px 13px"});
      }
    }    
  });

  $(window).resize(function(event) {
    var window_width = $(window).width();
    if (window_width > 1000) {
      $(".search_filters").css('height', '90');
      $(".search_filters_group").css('display', 'block');
    } else {
      $(".search_filters").css('height', '').removeClass('active');
      $(".search_filters_group").css('display', '');
      $(".search_filters .title_low").css('background-image', '');
    }
  });



  var window_width = $(window).width();
  var divider = $(".container-fluid.search_result_header").detach();
  if (window_width < 760) {
    $(".main_container").prepend(divider);
  } else {
    $(".container-fluid.search_filters").after(divider);
  }
  $(window).on('resize', function(event) {
    var window_width = $(window).width();
    var divider = $(".container-fluid.search_result_header").detach();
    if (window_width < 760) {
      $(".main_container").prepend(divider);
    } else {
      $(".container-fluid.search_filters").after(divider);
    }

  });


  $(".project_card_menu_second .menu_item").click(function(event) {
    var anchor = $(this).attr("class");
    anchor = anchor.substr(anchor.indexOf("anchor-") + 7);
    document.querySelector('.title.anchor-' + anchor).scrollIntoView({ behavior: 'smooth' });
  });



  // ---------------------------
  // SEARCH DESKTOP
  // ---------------------------

  $(".top_menu_search img").click(function() {
    $(".top_menu_search input").stop().animate({width:'toggle'},350);
    $(".top_menu_search input").val("");
    $(".top_menu_search .autofill .autofill_item a").hide(100);
  });

  function search_width () {
    var window_width = $(window).width();
    var temp = $(".top_menu_logo").width() + $(".top_menu_projects").width();
    $(".top_menu_search input").css("width", $(".top_menu_search").offset().left - temp - 70);
    $(".top_menu_search .autofill").css({"width": $(".top_menu_search").offset().left - temp - 70, "left": temp + 55});
  }
  
  if ($(".top_menu_search").length) {
    search_width();
    $(window).on('resize scroll', function() {
      search_width();
    });
  }

  $("#search").keyup(function(){
    // Retrieve the input field text and reset the count to zero
    var filter = $(this).val(), counter = 0;

    // Loop through the comment list
    $(".top_menu_search .autofill .autofill_item a").each(function(){

      if (filter.length > 0 && filter != " "){
        // If the list item does not contain the text phrase fade it out
        if ($(this).text().search(new RegExp(filter, "i")) < 0) {
          $(this).hide();
        } else {
          $(this).css('display', 'block');
        }
      } else {
      $(this).hide();
      }

      if ($(this).css("display") == "block") { counter++ }           
    });

    $(".top_menu_search .autofill .autofill_item a").click(function(event) {
      var temp = $(this).text();
      $("#search").val(temp);
      $(".top_menu_search .autofill").css({"padding-top": "0", "padding-bottom": "0"});
      $(".top_menu_search .autofill .autofill_item a").css("display", "none");
    });
    
    if (counter > 0) {
      $(".top_menu_search .autofill").css({"padding-top": "22px", "padding-bottom": "22px"});
    } else {
      $(".top_menu_search .autofill").css({"padding-top": "0", "padding-bottom": "0"});
    }

  });

  $(document).click(function(e) {
    var class_clicked = e.target.className;
    var search_classes = [
      "autofill_link",
      "autofill_item",
      "autofill",
    ]
    if ($.inArray(class_clicked, search_classes) == -1 ) {
      $(".top_menu_search .autofill").css({"padding-top": "0", "padding-bottom": "0"});
      $(".top_menu_search .autofill .autofill_item a").css("display", "none");
    }
  });


  // ---------------------------
  // SEARCH MOBILE
  // ---------------------------

  $(".top_menu_mobile .search").click(function() {
    $(".mobile_search_input_block").stop().animate({"height": "toggle"}, 300);
    $(".top_menu_mobile input").val("");
    $(".top_menu_mobile .mobile_autofill .mobile_autofill_item a").hide(100);
  });

  $("#mobile_search").keyup(function(){
    // Retrieve the input field text and reset the count to zero
    var filter = $(this).val(), counter = 0;

    // Loop through the comment list
    $(".top_menu_mobile .mobile_autofill .mobile_autofill_item a").each(function(){

      if (filter.length > 0 && filter != " "){
        // If the list item does not contain the text phrase fade it out
        if ($(this).text().search(new RegExp(filter, "i")) < 0) {
          $(this).hide();
        } else {
          $(this).css('display', 'block');
        }
      } else {
      $(this).hide();
      }

      if ($(this).css("display") == "block") { counter++ }           
    });

    $(".top_menu_mobile .mobile_autofill .mobile_autofill_item a").click(function(event) {
      var temp = $(this).text();
      $("#mobile_search").val(temp);
      $(".top_menu_mobile .mobile_autofill").css({"padding-top": "0", "padding-bottom": "0"});
      $(".top_menu_mobile .mobile_autofill .mobile_autofill_item a").css("display", "none");
    });
    
    if (counter > 0) {
      $(".top_menu_mobile .mobile_autofill").css({"padding-top": "22px", "padding-bottom": "22px"});
    } else {
      $(".top_menu_mobile .mobile_autofill").css({"padding-top": "0", "padding-bottom": "0"});
    }

  });

  $(document).click(function(e) {
    var class_clicked = e.target.className;
    var search_classes = [
      "mobile_autofill_link",
      "mobile_autofill_item",
      "mobile_autofill",
    ]
    if ($.inArray(class_clicked, search_classes) == -1 ) {
      $(".top_menu_mobile .mobile_autofill").css({"padding-top": "0", "padding-bottom": "0"});
      $(".top_menu_mobile .mobile_autofill .mobile_autofill_item a").css("display", "none");
    }
  });



  function project_card_header() {

    var window_width = $(window).width();
    var collapsed_container = $(".project_card_head .card_head_left .to_collapse");
    var left_part = $(".project_card_head .card_head_left");
    var avatar_block = $(".project_card_head .card_head_left .avatar");
    var avatar_image = $(".project_card_head .card_head_left .avatar img");
    var avatar_text = $(".project_card_head .card_head_left .avatar span");

    if (window_width <= 990) {
      left_part.unbind("click");
      left_part.click(function(event) {
        if (!$(this).hasClass("active")) {
          $(this).addClass('active');
          $(this).stop().animate({"width": "274"}, 100);
          $(this).css({"background-position": "95% 50%", "background-image": "url(img/arrow-left-orange.svg)"});
          collapsed_container.stop().fadeIn(100);
          avatar_text.stop().fadeIn(100);
          avatar_block.css({"padding-top": "29px"});
          avatar_image.css({"width": "71", "height": "71"});
        } else {
          $(this).removeClass('active');
          $(this).stop().animate({"width": "78"}, 100);
          $(this).css({"background-position": "50% 50%", "background-image": ""});
          collapsed_container.stop().fadeOut(100);
          avatar_text.stop().fadeOut(100);
          avatar_block.css({"padding-top": ""});
          avatar_image.css({"width": "", "height": ""});
        }
      });
    } else {
      left_part.unbind("click");
      left_part.removeClass('active');
      left_part.css({"width": "", "background-position": "", "background-image": ""});
      collapsed_container.css({"display": ""});
      avatar_text.css("display", "");
      avatar_block.css("padding-top", "");
      avatar_image.css({"height": "", "width": ""});
      return 1
    }

  }
  project_card_header();
  $(window).resize(function(event) {
    project_card_header();
  });



  $(".project_card_comments_container .comment.left .message .hider").click(function(event) {
    var window_width = $(window).width();
    if (window_width > 750) {
      var height = $(this).next().height() + 71 + 55;
      var height_closed = 196;
    } else {
      var height = $(this).next().height() + 71 + 100;
      var height_closed = 300;
    }
    
    var image_arrow = $(this).find("img");
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $(this).parent().animate({"height": height}, 200);
      image_arrow.attr('src', 'img/arrow-up-blue.svg');
    } else {
      $(this).removeClass('active');
      $(this).parent().animate({"height": height_closed}, 200);
      image_arrow.attr('src', 'img/arrow-down-blue.svg');
    }
  });
  $(window).resize(function(event) {
    $(".project_card_comments_container .comment.left .message .hider").removeClass('active');
    $(".project_card_comments_container .comment.left .message .hider").parent().css('height', '');
    $(".project_card_comments_container .comment.left .message .hider img").attr('src', 'img/arrow-down-blue.svg');
  });


 
 $(".favorites_delete_modal .close, .favorites_delete_modal .mask, .favorites_delete_modal .button_type_6").click(function(event) {
   $(".favorites_delete_modal").hide(100);
 });

 var block_after_delete = '<div class="favorite_deleted"><div class="text">Проект был успешно убран из избранного.&nbsp;<span>Отменить</span></div></div>';

 $(".favorite_items .search_results .item .content .star").click(function(event) {

    var modal_window = $(".favorites_delete_modal");
    modal_window.show(100);

    var favorite_item = $(this).parent().parent();
    favorite_item.before(block_after_delete);
    favorite_item.hide(200);

    var favorite_deleted_block = favorite_item.prev();
    var favorite_undo_button = favorite_item.prev().find('span');
    favorite_undo_button.unbind("click");
    favorite_undo_button.click(function(event) {
      favorite_item.show(200);
      favorite_deleted_block.remove();
    });

    modal_window.find('.button_type_4').unbind("click");
    modal_window.find('.button_type_4').click(function(event) {
      favorite_undo_button.trigger('click');
      modal_window.hide(100);
    });

 });


});

