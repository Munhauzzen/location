$(function () {

  $('.gac-reviews-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: false,
        }
      }
    ]
  });


  const anchors = document.querySelectorAll('a[href*="#"]')

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const blockID = anchor.getAttribute('href').substr(1)

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  }

  $('select').styler();
  $('.epiic-apply-form__checkbox').styler();

  $('.gac-drop-down__list a').each(function () {
    if ((window.location.pathname.indexOf($(this).attr('href'))) > -1) {
      $(this).addClass('gac-active');
    }
  });
  $('.gac-menu__link a').each(function () {
    if ((window.location.pathname.indexOf($(this).attr('href'))) > -1) {
      $(this).addClass('gac-active');
    }
  });

  $('.gac-formats__tabs .gac-tab').on('click', function (event) {
    var id = $(this).attr('data-id');
    $('.gac-formats__tabs').find('.gac-tab-item').removeClass('gac-active-tab').hide();
    $('.gac-active[tab-content]').removeClass('gac-active').hide();
    $('.gac-formats__tabs .gac-tabs').find('.gac-tab').removeClass('gac-active');
    $(this).addClass('gac-active');
    $('#' + id).addClass('gac-active-tab').fadeIn();
    $('[tab-content="' + id + '"]').addClass('gac-active').fadeIn();
    return false;
  });

  $(".gac-faq__list .gac-faq__text").hide().prev().click(function () {
    $(this).parents(".gac-faq__list").find(".gac-faq__text").not(this).slideUp().prev().removeClass("active");
    $(this).next().not(":visible").slideDown().prev().addClass("active");
  });


});

// Scripts for WP
jQuery(document).ready(function ($) {
  'use strict';
  var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

  /* Init dots */
  $('.gac-reviews--home .gac-reviews-slider__text').shave(108, { character: '...' });
  $('.gac-reviews--talent .gac-reviews-slider__text').shave(162, { character: '...' });

  /* Animate Scroll */
  $('.gac-scroll-to-btn').on('click', function () {
    $('html, body').animate({
      scrollTop: Math.abs(document.getElementById('book-input').offsetTop)
    }, 2000);
  });

  /* Menu columns */
  $('.gac-col-1').wrapAll('<div class="gac-footer-nav__col"/>');
  $('.gac-col-2').wrapAll('<div class="gac-footer-nav__col"/>');
  $('.gac-col-3').wrapAll('<div class="gac-footer-nav__col"/>');
  $('.gac-col-4').wrapAll('<div class="gac-footer-nav__col"/>');

  $('.gac-menu--mobile .gac-mobile-col-1').wrapAll('<div class="gac-menu__item-col"/>');
  $('.gac-menu--mobile .gac-mobile-col-2').wrapAll('<div class="gac-menu__item-col"/>');
  $('.gac-menu--mobile .gac-mobile-col-3').wrapAll('<div class="gac-menu__item-col"/>');
  /* Menu columns */

  /* Custom select */
  $(document).on('click', function (e) {
    if (!$(e.target).parents().hasClass('gac-select')) {
      $('.gac-select').removeClass('gac-clicked');
    }
  });
  $('.gac-select-value').on('click', function () {
    $(this).closest('.gac-select').toggleClass('gac-clicked');
  });
  $('.gac-select-list span').on('click', function () {
    if ($(this).hasClass('gac-active')) {
      return;
    }
    $(this).closest('.gac-select-list').find('span.gac-active').removeClass('gac-active');
    $(this).addClass('gac-active');
    $(this).closest('.gac-select').find('.gac-select-value').text($(this).text());
    $(this).closest('form').find('[name="format"]').val($(this).data('value'));
    $(this).closest('.gac-select').removeClass('gac-clicked gac-invalid');
  });
  var callback = function (el) {
    if (el.hasClass('gac-invalid')) {
      el.removeClass('gac-invalid')
    }
  };
  $('#gac-email, #email, #proof-email').on('keypress', function () {
    callback($(this));
  });
  $('#gac-email, #email, #proof-email').on('change', function () {
    callback($(this));
  });
  /* Custom select */
  /* Forms on submit */
  $('#gac-try-us-form').on('submit', function (e) {
    e.preventDefault();

    if ($('#gac-format').val() === '') {
      $('.gac-select').addClass('gac-invalid');
    }
    if (!(re.test($('#gac-email').val().toLowerCase()))) {
      $('#gac-email').addClass('gac-invalid');
    }

    if (!$('.gac-select, #gac-email').hasClass('gac-invalid')) {
      var url = $(this).serialize();
      if ($('#gac-format').val() === 'subscriptions') {
        url = url.replace('format=', '');
      }
      window.location.href = 'https://app.getacopywriter.com/order/new?' + url;
    }
  });
  $('#gac-header-form').on('submit', function (e) {
    e.preventDefault();

    if (!(re.test($('#email').val().toLowerCase()))) {
      $('#email').addClass('gac-invalid');
    }
    if (!$('#email').hasClass('gac-invalid')) {
      window.location.href = 'https://app.getacopywriter.com/order/new?' + $(this).serialize();
    }
  });
  $('#gac-proof-form').on('submit', function (e) {
    e.preventDefault();

    if ($('#proof-format').val() === '') {
      $('#proof-select').addClass('gac-invalid');
    }
    if (!(re.test($('#proof-email').val().toLowerCase()))) {
      $('#proof-email').addClass('gac-invalid');
    }

    if (!$('#proof-select, #proof-email').hasClass('gac-invalid')) {
      window.location.href = 'https://app.getacopywriter.com/order/new?proofreading&' + $(this).serialize();
    }
  });
  $('input[type="file"], select').styler();
  $('.epiic-work__tabs--mobile').on('click', function () {
    $('.epiic-work__tabs--mobile').toggleClass('epiic-active');
  });
});