import $ from 'jquery';
import 'select2';

var select = function () {
  var CLASS_CREDIT = 'credit--';

  var Selector = {
    SELECT_INPUT: '.js-select',
    ELEMENT_SLOT: '.element__slot',
    NAME_CALC: '.js-name-calc',
    NAME_RESULT: '.js-name-result',
    NAME_FORM: '.js-name-form',
    TARGET_FORM: '.js-target-form',
    NAME_INFO: '.js-name-info',
    MIN: '.js-min',
    MAX: '.js-min',
    MIN_TERM: '.js-min-term',
    MAX_TERM: '.js-max-term',
    MIN_INITIAL: '.js-min-initial',
  };

  var Class = {
    CREDIT_OPEN: 'credit--open',
  };

  var ClassCredit = {
    MORTGAGE: 'credit--mortgage',
    CAR: 'credit--car',
    CONSUMER: 'credit--consumer',
  };

  var selectInput = document.querySelector(Selector.SELECT_INPUT);

  if (!window.credit) {
    return false;
  }

  var nameCalc = window.credit.querySelector(Selector.NAME_CALC);
  var nameResult = window.credit.querySelector(Selector.NAME_RESULT);
  var nameForm = window.credit.querySelector(Selector.NAME_FORM);
  var targetForm = window.credit.querySelector(Selector.TARGET_FORM);
  var nameInfo = window.credit.querySelector(Selector.NAME_INFO);
  var selectSlot = selectInput.closest(Selector.ELEMENT_SLOT);

  $(selectInput).select2({
    minimumResultsForSearch: Infinity,
    width: 'off',
    theme: 'bank',
    dropdownParent: $(selectSlot),
    placeholder: selectInput.getAttribute('name'),
  });

  $(selectInput).on('select2:select', function () {
    var checkedOption = document.querySelector('option[value=' + selectInput.value + ']');

    var calcParameters = {
      nameCalc: checkedOption.dataset.nameCalc,
      nameResult: checkedOption.dataset.nameResult,
      nameForm: checkedOption.dataset.nameForm,
      targetForm: checkedOption.dataset.targetForm,
      min: checkedOption.dataset.min,
      max: checkedOption.dataset.max,
      minTerm: checkedOption.dataset.minTerm,
      maxTerm: checkedOption.dataset.maxTerm,
      minInitial: checkedOption.dataset.minInitial,
      stepTerm: checkedOption.dataset.stepTerm,
      minRate: checkedOption.dataset.minRate,
      maxRate: checkedOption.dataset.maxRate,
      prefix: checkedOption.dataset.prefix,
    };

    console.log(calcParameters);

    window.credit.classList.add(Class.CREDIT_OPEN);
    window.credit.classList.remove(ClassCredit.MORTGAGE);
    window.credit.classList.remove(ClassCredit.CAR);
    window.credit.classList.remove(ClassCredit.CONSUMER);
    window.credit.classList.add(CLASS_CREDIT + selectInput.value);
    window.credit.dataset.target = selectInput.value;

    nameCalc.innerHTML = calcParameters.nameCalc;
    nameResult.innerHTML = calcParameters.nameResult;
    nameInfo.innerHTML = calcParameters.nameInfo;
    targetForm.innerHTML = calcParameters.targetForm;
    nameForm.value = calcParameters.nameForm;
  });

  return selectInput;
};

export default select;
