var NUMBER_CASE = 10;
var LENGHT_NUMBER_CASE = 4;

var Prefix = {
  CURRENCY: ' рублей',
  PERCENT: '%',
};

var Selector = {
  RESULT: '.js-result',
  RESULT_MAIN: '.js-result-main',
  RESULT_INFO: '.js-result-info',
  RESULT_SUMMER_NAME: '.js-result-main .grayBox__caption',
  RESULT_SUMMER_VALUE: '.js-result-main .grayBox__value',
  RESULT_RATE_VALUE: '.js-result-rate .grayBox__value',
  RESULT_PAYMENT_VALUE: '.js-result-payment .grayBox__value',
  RESULT_INCOME_VALUE: '.js-result-income .grayBox__value',
  RESULT_INFO_NAME: '.js-result-info-name',
  RESULT_INFO_TRESHOLD: '.js-result-treshold',
  RESULT_BTN: '.js-result-btn',
  FORM_CONTAINER: '.js-result-form',
  FORM_NUMBER: '.js-result-form-number .formArea__input',
  FORM_TARGET: '.js-result-form-target .formArea__input',
  FORM_SUMMER_NAME: '.js-result-form-summer .formArea__label',
  FORM_SUMMER_VALUE: '.js-result-form-summer .formArea__input',
  FORM_PAYMENT_VALUE: '.js-result-form-payment .formArea__input',
  FORM_TERM_VALUE: '.js-result-form-term .formArea__input',
  FORM_CLIENT: '.js-result-form-client',
  FORM_PHONE: '.js-result-form-phone',
  FORM_EMAIL: '.js-result-form-email',
  FORM_BTN: '.js-result-form-submit',
};


class ResultCredit {
  constructor() {
    this.removedFlag = false;
    this.result = document.querySelector(Selector.RESULT);
    this.blocks = {
      form: {
        container: document.querySelector(Selector.FORM_CONTAINER),
        number: document.querySelector(Selector.FORM_NUMBER),
        target: document.querySelector(Selector.FORM_TARGET),
        summerName: document.querySelector(Selector.FORM_SUMMER_NAME),
        summerValue: document.querySelector(Selector.FORM_SUMMER_VALUE),
        paymentValue: document.querySelector(Selector.FORM_PAYMENT_VALUE),
        termValue: document.querySelector(Selector.FORM_TERM_VALUE),

        client: document.querySelector(Selector.FORM_CLIENT),
        phone: document.querySelector(Selector.FORM_PHONE),
        email: document.querySelector(Selector.FORM_EMAIL),
        btn: document.querySelector(Selector.FORM_BTN),
      },
      main: {
        container: this.result.querySelector(Selector.RESULT_MAIN),
        summerName: this.result.querySelector(Selector.RESULT_SUMMER_NAME),
        summerValue: this.result.querySelector(Selector.RESULT_SUMMER_VALUE),
        rateValue: this.result.querySelector(Selector.RESULT_RATE_VALUE),
        paymentValue: this.result.querySelector(Selector.RESULT_PAYMENT_VALUE),
        incomeValue: this.result.querySelector(Selector.RESULT_INCOME_VALUE),
        btn: this.result.querySelector(Selector.RESULT_BTN),
      },
      info: {
        container: this.result.querySelector(Selector.RESULT_INFO),
        name: this.result.querySelector(Selector.RESULT_INFO_NAME),
        treshold: this.result.querySelector(Selector.RESULT_INFO_TRESHOLD),
      },
    };

    this.onClickBtnResult = function () {
      this.getValueForm();
      window.credit.classList.toggle(window.Class.FORM_SHOW, true);

    }.bind(this);
  }

  set(parameters) {
    this.parameters = {
      income: parameters.income,
      monthPayment: parameters.monthPayment,
      rate: parameters.rate,
      summer: parameters.summer,
      paymentThreshold: parameters.paymentThreshold,
      term: parameters.term,
      summerString: parameters.summerString
    };
    this.parameters.startPayment = parameters.startPayment ? parameters.startPayment : false;
  }

  getHtmlResult() {
    this.blocks.main.summerValue.innerHTML = this.parameters.summer + Prefix.CURRENCY;
    this.blocks.main.rateValue.innerHTML = this.parameters.rate + Prefix.PERCENT;
    this.blocks.main.paymentValue.innerHTML = this.parameters.monthPayment + Prefix.CURRENCY;
    this.blocks.main.incomeValue.innerHTML = this.parameters.income + Prefix.CURRENCY;
  }

  getNumberCase() {
    var stringNumber = NUMBER_CASE.toString();
    do {
      stringNumber = '0' + stringNumber;
    } while (stringNumber.length < LENGHT_NUMBER_CASE);
    return stringNumber;
  }

  getValueForm() {
    this.blocks.form.summerValue.setAttribute('value', this.parameters.summerString);
    this.blocks.form.paymentValue.setAttribute('value', this.parameters.startPayment);
    this.blocks.form.termValue.setAttribute('value', this.parameters.term);
    this.blocks.form.number.setAttribute('value', this.getNumberCase());
    this.blocks.form.summerValue.value = this.parameters.summerString;
    this.blocks.form.paymentValue.value = this.parameters.startPayment;
    this.blocks.form.termValue.value = this.parameters.term;
    this.blocks.form.number.value = this.getNumberCase();
  }

    renderResult(parameters) {
    this.set(parameters);
    if (this.parameters.summer > this.parameters.paymentThreshold) {
      if (!this.removedFlag) {
        this.removedFlag = true;
        this.removedBlock = this.result.removeChild(this.blocks.info.container);
        this.getHtmlResult();
      } else {
        if (this.removedBlock === this.blocks.main.container) {
          this.result.insertAdjacentElement('beforeend', this.removedBlock);
          this.removedBlock = this.result.removeChild(this.blocks.info.container);
          this.removedFlag = true;
          this.getHtmlResult();
        } else {
          this.getHtmlResult();
        }
      }
    } else {
      if (!this.removedFlag) {
        this.removedFlag = !this.removedFlag;
        this.removedBlock = this.result.removeChild(this.blocks.main.container);
      } else {
        if (this.removedBlock === this.blocks.info.container) {
          this.result.insertAdjacentElement('beforeend', this.removedBlock);
          this.removedBlock = this.result.removeChild(this.blocks.main.container);
          this.removedFlag = true;
        }
      }
    }
  }

  setText(parameters) {
    this.textParemeters = {
      nameInfo: parameters.nameInfo,
      nameResult: parameters.nameResult,
      formTarget: parameters.formTarget,
      formSummerName: parameters.formSummerName,
      tresholdInfo: parameters.tresholdInfo,
    };
    if (this.textParemeters.nameInfo && this.textParemeters.tresholdInfo) {
      this.blocks.info.name.innerHTML = this.textParemeters.nameInfo;
      this.blocks.info.treshold.innerHTML = this.textParemeters.tresholdInfo;
    }
    this.blocks.info.name.innerHTML = this.textParemeters.nameInfo;
    this.blocks.info.treshold.innerHTML = this.textParemeters.tresholdInfo;
    this.blocks.main.summerName.innerHTML = this.textParemeters.nameResult;
    this.blocks.form.target.value = this.textParemeters.formTarget;
    this.blocks.form.target.setAttribute('value', this.textParemeters.formTarget);
    this.blocks.form.summerName.innerHTML = this.textParemeters.formSummerName;
  }

  init() {
    this.blocks.main.btn.addEventListener('click', this.onClickBtnResult);
  }

}
export {ResultCredit};
