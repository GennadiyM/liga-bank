var Prefix = {
  CURRENCY: ' рублей',
  PERCENT: '%',
};

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
  constructor(parameters) {
    this.result = document.querySelector(Selector.RESULT);
    this.resultMain = this.result.removeChild(this.result.querySelector(Selector.RESULT_MAIN));
    this.resultInfo = this.result.removeChild(this.result.querySelector(Selector.RESULT_INFO));
    this.resultMainNameContainer = this.resultMain.querySelector(Selector.RESULT_MAIN_NAME);
    this.resultValueContainer = this.resultMain.querySelector(Selector.RESULT_VALUE);
    this.resulPercentContainer = this.resultMain.querySelector(Selector.RESULT_PERCENT);
    this.resultPaymentContainer = this.resultMain.querySelector(Selector.RESULT_PAYMENT);
    this.resultIncomeContainer = this.resultMain.querySelector(Selector.RESULT_INCOME);
    this.resultInfoNameContainer = this.resultInfo.querySelector(Selector.RESULT_INFO_NAME);
    this.nameResult = parameters.nameResult;
    this.resultMainNameContainer.innerHTML = this.nameResult;
  }

  renderValue(parameters) {
    this.result.innerHTML = '';
    if (parameters.value < parameters.maxPayment) {
      this.resultValueContainer.innerHTML = Math.round(parameters.summer) + Prefix.CURRENCY;
      this.resulPercentContainer.innerHTML = (parameters.rate * 100 * 12).toFixed(2) + Prefix.PERCENT;
      this.resultPaymentContainer.innerHTML = Math.round(parameters.monthPayment) + Prefix.CURRENCY;
      this.resultIncomeContainer.innerHTML = Math.round(parameters.income) + Prefix.CURRENCY;
      this.result.insertAdjacentElement('beforeend', this.resultMain);
    } else {
      this.result.insertAdjacentElement('beforeend', this.resultInfo);
    }
  }

  getInfo() {
    this.result.insertAdjacentElement('beforeend', this.resultInfo);
    this.removeElement = this.result.removeChild(this.resultMain);
  }
}

export default ResultCredit;
