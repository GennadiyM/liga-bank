var utils = function () {
  var Selector = {
    BODY: '.page',
    CREDIT: '.js-credit',
    OPTION_MORTAGE: '.js-option-mortgage',
    OPTION_CASCO: '.js-option-casсo',
    OPTION_HEALTH: '.js-option-health',
  };

  window.body = document.querySelector(Selector.BODY);
  window.credit = document.querySelector(Selector.CREDIT);
  window.optionMortage = document.querySelector(Selector.OPTION_MORTAGE);
  window.optionCasco = document.querySelector(Selector.OPTION_CASCO);
  window.optionHealth = document.querySelector(Selector.OPTION_HEALTH);
};

var createElement = function (template) {
  var newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

var getStringOfNumb = function (numb) {
  var stringOfNum = numb.toString();
  return stringOfNum.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + ' ');
};

export {createElement, getStringOfNumb};
export default utils;
