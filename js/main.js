( function( $ ) {
    "use strict";

    var mistectvo = window.mistectvo || {};



    mistectvo.pageLoader = function(){

        setTimeout(function() {

            $('.content-loader').fadeOut(800, function(){
                $(this).remove();
            });

           
            $('#video-background').trigger('play');

        }, 400);

    },

   

    mistectvo.magnificPopup = function(){

        
        $('.zoom').magnificPopup({
            type: 'image'
        });

        
        $('.btn-popup').magnificPopup({
            type: 'inline',
        });

    },

   

    mistectvo.selectReplacer = function(){

        $('select').each(function() {
            var $select = $(this),
                $ul = $('<ul></ul>').addClass('select-replacer'),
                $hiddenInput = $('<input type="hidden" name="' + $select.attr('name') + '" value="' + $select.val() + '">');

            $select.after($ul);
            $ul.after($hiddenInput);

            $select.children('option').each(function(){
                var $that = $(this),
                    $li = $('<li data-value="' + $that.val()+'">' + $that.text() + '</li>');
                if ( $that.attr('class') != undefined ) {
                    $li.addClass($that.attr('class'));
                }
                $ul.append($li);
            });

            $ul.children('li').not(':first').hide();

            $ul.children('li').on('click',function(){
                var $clickedLi = $(this),
                    dataValue = $clickedLi.data('value');
                $clickedLi.prependTo($ul.toggleClass('open')).nextAll().toggle();
                $hiddenInput.val(dataValue);
                $('.hidden-field').removeClass('show').find('input').removeClass('required');
                $('#' + $clickedLi.attr('class')).addClass('show').find('input').addClass('required');
            });

            $select.remove();

            
            $(document).on('click',function(e){

                if ( ! $ul.find(e.target).length ) {
                    $ul.removeClass('open').children('li').not(':first').hide();

                }

            });

        });

    },

  

    mistectvo.toggle = function(){

        $('.open .content-toggle').show();
        $('.title-toggle').on('click',function(e){
            e.preventDefault();

            var $that = $(this),
                $toggle = $that.parent(),
                $contentToggle = $that.next(),
                $accordion = $that.parents('.accordion');

            if ( $accordion.length > 0 ) {
                $accordion.find('.content-toggle').slideUp('normal', function(){
                    $(this).parent().removeClass('open');
                });
                if ( $that.next().is(':hidden') ) {
                    $contentToggle.slideDown('normal', function(){
                        $toggle.addClass('open');
                    });
                }
            } else {
                $contentToggle.slideToggle('normal', function(){
                    $toggle.toggleClass('open');
                });
            }
        });

    },

   

    mistectvo.tabs = function(){

        $('.title-tab:first-child').addClass('selected-tab');
        $('.title-tab').on('click',function(e){
            e.preventDefault();

            var $that = $(this),
                $tabParent = $that.parents('.tabs'),
                idTab = $that.find('a').attr('href');

            if ( ! $that.hasClass('selected-tab') ) {
                $tabParent.find('.tab').hide().removeClass('open');
                $tabParent.find('.title-tab').removeClass('selected-tab');
                $that.addClass('selected-tab');
                $(idTab).fadeIn().addClass('open');
            }

        });

    },

   

    mistectvo.portfolio = {

        init : function(){

            this.layout();
            this.filters();
            this.infoItems();

        },

       
        layout : function(){

            $('.works').imagesLoaded( function() {
                $('.works').isotope();
            });

        },

        filters : function(){

            $('.filters').on( 'click', 'a', function(e) {
                e.preventDefault();

                var $that = $(this),
                    filterValue = $that.attr('data-filter');

                $('.filters a').removeClass('light');
                $that.addClass('light');
                $('.works').isotope({ filter: filterValue });
            });

        },

      
        infoItems : function(){

            $('.info-link').on('click',function(e){
                e.preventDefault();

                var $that = $(this),
                    $extraItem = $that.parents('.work-thumb').next('.info-work');

                if ($extraItem.length > 0) {
                    $extraItem.slideToggle( 200, function(){
                        $(this).parents('.work').toggleClass('opened');
                        $('.works').isotope('layout');
                    });
                }

            });

        }

    },

  

    mistectvo.scrollToSection = function(){

        $('.one-page #nav-menu a[href^="#"]').on('click',function (e) {
            e.preventDefault();

            var target = this.hash,
                $section = $(target);

            $(this).parent().addClass('selected');
            $('html, body').stop().animate({
                scrollTop: $section.offset().top - 79
            }, 900, 'swing', function () {
                window.location.hash = target;
            });
            $('body').removeClass('open');
            $('#nav-menu').find('li').removeClass('show');

        });

    },


    mistectvo.scrollHighlight = function(){

        var scrollPosition = $(window).scrollTop();

        if ( $('body').hasClass('one-page') ) {

            if (scrollPosition >= 200) {

                $('.section').each(function() {

                    var $link = $('#nav-menu a[href="#' + $(this).attr('id') +'"');
                    if ( $link.length && $(this).position().top <= scrollPosition + 80) {
                        $('#nav-menu li').removeClass('selected');
                        $link.parent().addClass('selected');
                    }
                });

            } else {

                $('#nav-menu li').removeClass('selected');

            }
        }

    },

  

    mistectvo.mobileMenu = {

        init : function(){

            this.toggleMenu();
            this.addClassParent();
            this.addRemoveClasses();

        },

        
        toggleMenu : function() {

            var self = this,
                $body = $('body');

            $('#nav-toggle').click(function(e){
                e.preventDefault();

                if ( $body.hasClass('open') ) {
                    $body.removeClass('open');
                    $('#nav-menu').find('li').removeClass('show');
                } else {
                    $body.addClass('open');
                    self.showSubmenu();
                }

            });

        },

     
        addClassParent : function() {

            $('#nav-menu').find('li > ul').each(function(){
                $(this).parent().addClass('parent');
            });

        },

      
        addRemoveClasses : function() {

            var $nav = $('#nav-menu');

            if ( $(window).width() < 992 ) {
                $nav.addClass('mobile');
            } else {
                $('body').removeClass('open');
                $nav.removeClass('mobile').find('li').removeClass('show');
            }

        },

      
        showSubmenu : function() {

            $('#nav-menu').find('a').each(function(){

                var $that = $(this);

                if ( $that.next('ul').length ) {
                    $that.one('click', function(e) {
                        e.preventDefault();
                        $(this).parent().addClass('show');
                    });
                }

            });

        }

    },

  

    mistectvo.stickyMenu = function(){

        if ($(window).scrollTop() > 50) {
            $('body').addClass('sticky');
        } else {
            $('body').removeClass('sticky');

        }

    },


    mistectvo.contactsBar = function(){

        if ($(window).scrollTop() + $(window).height() > $('footer').offset().top) {
            $('#contacts-bar').fadeOut('fast');
        } else {
            $('#contacts-bar').fadeIn('fast');
        }

    },

    

    mistectvo.backgrounds = function(){

        $.each( config.backgrouns, function( key, value ) {

            var $el = $(key),
                $overlay = $('<div class="bg-overlay"></div>');

            if ( value.img != null ) {
                $el.addClass('bg').css('background-image', 'url(' + value.img + ')').prepend($overlay);
            }

            if ( value.overlay != null && !value.disableOverlay ) {
                $el.find('.bg-overlay').remove();
            }

            if ( value.overlayOpacity != null ) {
                $el.find('.bg-overlay').css('opacity', value.overlayOpacity);
            }

            if ( value.overlayColor != null ) {
                $el.find('.bg-overlay').css('background-color', value.overlayColor);
            }

            if ( value.pattern != null && value.pattern ) {
                $el.addClass('pattern');
            }

            if ( value.position != null ) {
               $el.css('background-position', value.position);
            }

            if ( value.bgCover != null ) {
                $el.css('background-size', value.bgCover);
            }

            if ( value.parallax != null && value.parallax ) {
                $el.addClass('plx');
            }

        });

    },

  

    mistectvo.parallax = function(){

        $('.plx').each(function() {
            $(this).parallax('50%', 0.5);
        });

    },

    

    mistectvo.flexslider = function(){

        $('.flexslider').each(function(){
            var $that = $(this),
                animationType = ( typeof $that.data('animation') !== 'undefined' ) ? $that.data('animation') : 'slide',
                autoplay = ( typeof $that.data('autoplay') !== 'undefined' ) ? $that.data('autoplay') : false;

            $that.flexslider({
                slideshow : autoplay,
                pauseOnHover : true,
                animation : animationType,
                prevText: '',
                nextText: '',
            });
        });

    },

    

    mistectvo.forms = function(){

        
        var emailValidator = function(email){

            var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            var valid = emailReg.test(email);

            return valid;
        };

       
        $('form').append('<div class="form-msg" style="display:none"><span></span><a href="#"></a></div>');

        $('form').submit(function(e){
            e.preventDefault();

            var $that = $(this),
                checkEmpty = false,
                formMessages = config.formMessages,
                $msgForm = $that.find('.form-msg'),
                $msgText = $msgForm.find('span'),
                emailField = $that.find('input[name="email"]').val(),
                postData = $that.serialize();

            $msgForm.removeClass('fail success');
            $msgText.text('');

            
            $that.find('.required').each(function() {
                if($.trim($(this).val()) === '' || $(this).is(':checkbox:not(:checked)') ) {
                    checkEmpty = true;
                }
            });

           
            if ( checkEmpty ) {
                $msgText.text(formMessages.emptyFields).parent().addClass('fail').fadeIn('fast');
                return false;
            }

           
            if ( ! emailValidator(emailField) ) {
                $msgText.text(formMessages.failEmail).parent().addClass('fail').fadeIn('fast');
                return false;
            }

            $that.find('.submit').after('<span class="form-loader" />');

            
            $.post($that.attr('action'), postData, function(result){
                if (result == 'success') {
                    $msgText.text(formMessages.sent);               
                    $that.trigger('reset');                         
                } else {
                    $msgText.text(formMessages.fail);              
                }
            }).fail(function() {
                $msgText.text(formMessages.fail);                   
            }).always(function(result) {
                $that.find('.form-loader').remove();
                $msgForm.addClass(result).fadeIn('fast');           
            });

        });

       
        $(document).on('click','.form-msg a', function(){

            $(this).parent().fadeOut();

            if ( $('.form-msg').hasClass('success') ) {
                $.magnificPopup.close();
            }

            return false;
        });

    };

    

    $(document).ready(function(){

        mistectvo.magnificPopup();
        mistectvo.selectReplacer();
        mistectvo.toggle();
        mistectvo.tabs();
        mistectvo.portfolio.init();
        mistectvo.scrollToSection();
        mistectvo.mobileMenu.init();
        mistectvo.forms();
        mistectvo.backgrounds();
        mistectvo.parallax();

    });

    
    $(window).load(function() {

        mistectvo.pageLoader();
        mistectvo.flexslider();

    });

   
    $(window).resize(function() {

        mistectvo.portfolio.layout();
        mistectvo.mobileMenu.addRemoveClasses();

    });

    
    $(window).scroll(function() {

        mistectvo.stickyMenu();
        mistectvo.scrollHighlight();
        mistectvo.contactsBar();

    });

} )( jQuery );

			$(function(){
			if ($(window).scrollTop()>="200") $("#ToTop").fadeIn("slow")
			$(window).scroll(function(){
			if ($(window).scrollTop()<="200") $("#ToTop").fadeOut("slow")
			else $("#ToTop").fadeIn("slow")
			});
			$("#ToTop").click(function(){$("html,body").animate({scrollTop:0},"slow")})
		});
		