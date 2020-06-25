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

export default utils;
