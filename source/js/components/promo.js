import Swiper from 'swiper';

var promo = function () {
  var promoSlider = document.querySelector('.js-promo');
  if (!promoSlider) {
    return false;
  }
  var promoSwiper = new Swiper('.swiper-container', {
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      bulletClass: 'promo__bullet',
      bulletActiveClass: 'promo__bullet--active',
    },
    a11y: {
      paginationBulletMessage: 'Перейти к слайду {{index}}',
    },
  });

  return promoSwiper;
};

export default promo;
