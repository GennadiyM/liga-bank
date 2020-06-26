import Calc from './calc';

var Selector = {
  CONTAINER_CREDIT_SUMMER: '.js-credit-container',
  MAIN_CALC_CONTAINER: '.js-main-calc-container',
};

var containerCalc = document.querySelector(Selector.MAIN_CALC_CONTAINER);

var credit = function (target, parameters) {
  var value = parseInt(parameters.startValue, 10);
  var min = parseInt(parameters.min, 10);
  var max = parseInt(parameters.max, 10);
  var step = parseInt(parameters.step, 10);
  var percent = parseInt(parameters.startPercent, 10);
  var rateMin = parseFloat(parameters.rateMin);
  var rateMax = parseFloat(parameters.rateMax);
  var rateThreshold = parseInt(parameters.rateThreshold, 10);
  var valueError = parseInt(parameters.valueError, 10);
  var minTerm = parseInt(parameters.minTerm, 10);
  var maxTerm = parseInt(parameters.maxTerm, 10);
  var stepTerm = parseInt(parameters.stepTerm, 10);
  var optionValue = parseInt(parameters.optionValue, 10);
  var optionStatus = parameters.optionStatus;
  var optionName = parameters.optionName;
  var calcName = parameters.calcName;
  var resultName = parameters.resultName;
  var infoName = parameters.infoName;
  var totalName = parameters.totalName;
  var totalSummerName = parameters.totalSummerName;
  var prefixTerm = parameters.prefixTerm;

  var calcParameters = {
    name: calcName,
    value: value,
    min: min,
    max: max,
    place: containerCalc,
    step: parseInt(parameters.step, 10),
  };

  var summerCalc = new Calc(calcParameters);

  summerCalc.init();
};

export {credit};
