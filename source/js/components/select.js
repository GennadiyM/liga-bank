import $ from 'jquery';
import 'select2';
import {credit} from './credit';

var select = function () {
  var Selector = {
    SELECT_INPUT: '.js-select',
    ELEMENT_SLOT: '.element__slot',
    CONTAINER_CREDIT_SUMMER: '.js-credit-container',
    MAIN_CALC_CONTAINER: '.js-main-calc-container',
  };

  var selectInput = document.querySelector(Selector.SELECT_INPUT);

  if (!window.credit) {
    return false;
  }

  var selectSlot = selectInput.closest(Selector.ELEMENT_SLOT);
  var creditSummerContainer = document.querySelector(Selector.CONTAINER_CREDIT_SUMMER);
  var mainCalcContainer = document.querySelector(Selector.MAIN_CALC_CONTAINER);

  $(selectInput).select2({
    minimumResultsForSearch: Infinity,
    width: 'off',
    theme: 'bank',
    dropdownParent: $(selectSlot),
    placeholder: selectInput.getAttribute('name'),
  });

  $(selectInput).on('select2:select', function () {
    var checkedOption = document.querySelector('option[value=' + selectInput.value + ']');
    var calcParameters = checkedOption.dataset;

    credit(selectInput.value, calcParameters);
  });

  return selectInput;
};

export default select;
