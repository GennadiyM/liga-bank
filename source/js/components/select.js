import $ from 'jquery';
import 'select2';
import {CreditController} from './credit';

var select = function () {
  var Selector = {
    CREDIT: '.js-credit',
    CREDIT_RESULT: '.js-credit-result',
    CREDIT_FORM: '.credit__box--form',
    CREDIT_SUMMER: '.js-credit-summer',
    CREDIT_INFO: '.js-credit-info',
    SELECT_INPUT: '.js-select',
    ELEMENT_SLOT: '.element__slot',
    CONTAINER_CREDIT_SUMMER: '.js-credit-container',
    MAIN_CALC_CONTAINER: '.js-main-calc-container',
  };

  var Class = {
    MORTGAGE_SHOW: 'credit--mortgage',
    CAR_SHOW: 'credit--car',
    CONSUMER_SHOW: 'credit--consumer',
    FORM_SHOW: 'credit--formShow',
  };

  var selectInput = document.querySelector(Selector.SELECT_INPUT);

  if (!window.credit) {
    return false;
  }

  var selectSlot = selectInput.closest(Selector.ELEMENT_SLOT);
  var creditBlock = document.querySelector(Selector.CREDIT);
  var credit = new CreditController();
  credit.init();

  $(selectInput).select2({
    minimumResultsForSearch: Infinity,
    width: 'off',
    theme: 'bank',
    dropdownParent: $(selectSlot),
    placeholder: selectInput.getAttribute('name'),
  });

  $(selectInput).on('select2:select', function () {
    var target = selectInput.value;
    var checkedOption = document.querySelector('option[value=' + target + ']');
    var calcParameters = checkedOption.dataset;

    creditBlock.classList.remove(Class.CAR_SHOW);
    creditBlock.classList.remove(Class.MORTGAGE_SHOW);
    creditBlock.classList.remove(Class.CONSUMER_SHOW);
    creditBlock.classList.add('credit--' + target);
    credit.set(target);
    credit.setMainParameters(calcParameters);
  });

  return selectInput;
};

export default select;
