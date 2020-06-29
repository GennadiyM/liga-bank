var Selector = {
  RESULT: '.js-credit-result',
  RESULT_MAIN: '.js-result-main',
  RESULT_INFO: '.js-result-info',
  RESULT_INFO_NAME: '.js-result-info-name',
  RESULT_MAIN_NAME: '.js-result-name .grayBox__caption',
  RESULT_VALUE: '.js-result-name .grayBox__value',
  RESULT_PERCENT: '.js-result-percent .grayBox__value',
  RESULT_PAYMENT: '.js-result-payment .grayBox__value',
  RESULT_INCOME: '.js-result-income .grayBox__value',
};


class ResultCredit {
  constructor(parameters, summerValue, payment, percent, income) {
    this.nameResult = parameters.nameResult;
    this.resultValue = summerValue;
    this.payment = payment;
    this.percent = percent;
    this.income = income;
    this.result = document.querySelector(Selector.RESULT);
    this.resultMainContainer = this.result.querySelector(Selector.RESULT_MAIN);
    this.resultMainNameContainer = this.result.querySelector(Selector.RESULT_MAIN_NAME);
    this.resultValueContainer = this.result.querySelector(Selector.RESULT_VALUE);
    this.resulPercentContainer = this.result.querySelector(Selector.RESULT_PERCENT);
    this.resultPaymentContainer = this.result.querySelector(Selector.RESULT_PAYMENT);
    this.resultIncomeContainer = this.result.querySelector(Selector.RESULT_INCOME);
    this.resultInfoContainer = this.result.querySelector(Selector.RESULT_INFO);
    this.resultInfoNameContainer = this.result.querySelector(Selector.RESULT_INFO_NAME);
  }

  setResultValue(value) {
    this.resultValue = value;
    this.resultValueContainer.innerHTML = this.resultValue;
  }

  setResultPayment(value) {
    this.payment = value;
    this.resultPaymentContainer.innerHTML = this.payment;
  }

  renderValue(parameters) {
    this.nameResult = parameters.nameResult;
    this.resultMainNameContainer.innerHTML = this.nameResult;
    this.resultValueContainer.innerHTML = this.resultValue;
    this.resulPercentContainer.innerHTML = this.percent;
    this.resultPaymentContainer.innerHTML = this.payment;
    this.resultIncomeContainer.innerHTML = this.income;
  }
}

export default ResultCredit;
