var utils = function () {
  window.Selector = {
    BODY: '.page',
    CREDIT: '.js-credit',
    BTN_MIN: '.calculate__btn[data-target="min"]',
    BTN_PLUS: '.calculate__btn[data-target="plus"]',
    RANGE: '.range__btn',
    RANGE_SCALE: '.range__scale',
    RANGE_INFO_LEFT: '.range__captionLeft',
    RANGE_INFO_RIGHT: '.range__captionRight',
    RANGE_BAR: '.range__bar',
    SUMMER_CALC: '.js-main-calc',
    PAYMENT_CALC: '.js-payment-calc',
    TERM_CALC: '.js-term-calc',
    INPUT: '.calculate__input',
    OPTION_INPUT: '.option__input'
  };

  window.Class = {
    FORM_SHOW: 'credit--formShow',
  };

  window.body = document.querySelector(window.Selector.BODY);
  window.credit = document.querySelector(window.Selector.CREDIT);
};

var getStringOfNumb = function (numb) {
  var stringOfNum = numb.toString();
  return stringOfNum.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + ' ');
};

export {getStringOfNumb};
export default utils;
