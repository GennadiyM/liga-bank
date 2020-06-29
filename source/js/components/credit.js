import Calc from './calc';
import PaymentCalc from './calc-payment';
import TermCalc from './calc-term';
import ResultCredit from './result-credit';

var Selector = {
  MORTGAGE_CONTAINER: '.credit__slide--mortgage',
  CAR_CONTAINER: '.credit__slide--car',
  CONSUMER_CONTAINER: '.credit__slide--consumer',
  MAIN_CALC: '.js-main-calc',
  PAYMENT_CALC: '.js-payment-calc',
  TERM_CALC: '.js-term-calc',
  INPUT: '.calculate__input',
  OPTION: '.js-option',
  OPTION_INPUT: '.option__input'
};

class CreditController {
  constructor() {
    this.mortgageBlocks = {
      mainCalc: document.querySelector(Selector.MORTGAGE_CONTAINER + ' ' + Selector.MAIN_CALC),
      paymentCalc: document.querySelector(Selector.MORTGAGE_CONTAINER + ' ' + Selector.PAYMENT_CALC),
      termCalc: document.querySelector(Selector.MORTGAGE_CONTAINER + ' ' + Selector.TERM_CALC),
      optionInput: document.querySelector(Selector.MORTGAGE_CONTAINER + ' ' + Selector.OPTION_INPUT),
    };
    this.carBlocks = {
      mainCalc: document.querySelector(Selector.CAR_CONTAINER + ' ' + Selector.MAIN_CALC),
      paymentCalc: document.querySelector(Selector.CAR_CONTAINER + ' ' + Selector.PAYMENT_CALC),
      termCalc: document.querySelector(Selector.CAR_CONTAINER + ' ' + Selector.TERM_CALC),
    };
    this.consumerBlocks = {
      mainCalc: document.querySelector(Selector.CONSUMER_CONTAINER + ' ' + Selector.MAIN_CALC),
      termCalc: document.querySelector(Selector.CONSUMER_CONTAINER + ' ' + Selector.TERM_CALC),
    };

    this.onMainCalc = function () {
      this.value = this[this.target].MainCalc.getInputValueNum();
      if (this[this.target].PaymentCalc) {
        this[this.target].PaymentCalc.set(this.value);
      }
      // this.result.setResultValue(this[this.target].MainCalc.getInputValueString());
    }.bind(this);

    this.onChangeMortgageOption = function () {
      this.getMortgageSumCredit();
    }.bind(this);
  }

  getMortgageSumCredit() {
    this.mortgage.bonus = this.mortgageBlocks.optionInput.checked ? parseInt(this.mortgageBlocks.optionInput.dataset.bonus, 10) : 0;
    this.sumCredit = this.value - this.mortgage.bonus;
  }

  getMortgageCalcInit() {
    this.mortgage = {
      MainCalc: new Calc(this.mortgageBlocks.mainCalc),
      TermCalc: new TermCalc(this.mortgageBlocks.termCalc),
    };
    this.mortgageBlocks.mainCalc.addEventListener('calc', this.onMainCalc);
    this.value = this.mortgage.MainCalc.getInputValueNum();
    this.mortgage.PaymentCalc = new PaymentCalc(this.mortgageBlocks.paymentCalc, this.value);
    this.getMortgageSumCredit();
    this.mortgageBlocks.optionInput.addEventListener('change', this.onChangeMortgageOption);
  }

  getCarCalcInit() {
    this.car = {
      MainCalc: new Calc(this.carBlocks.mainCalc),
      TermCalc: new TermCalc(this.carBlocks.termCalc),
    };
    this.carBlocks.mainCalc.addEventListener('calc', this.onMainCalc);
    this.value = this.car.MainCalc.getInputValueNum();
    this.car.PaymentCalc = new PaymentCalc(this.carBlocks.paymentCalc, this.value);
  }

  getConsumerCalcInit() {
    this.consumer = {
      MainCalc: new Calc(this.consumerBlocks.mainCalc),
      TermCalc: new TermCalc(this.consumerBlocks.termCalc),
    };
    this.consumerBlocks.mainCalc.addEventListener('calc', this.onMainCalc);
    this.value = this.consumer.MainCalc.getInputValueNum();
  }

  setMainParameters(parameters) {
    this.mainParameters = parameters;
  }

  set(target) {
    if (!this.target) {
      if (this[target].MainCalc) {
        this[target].MainCalc.init();
      }
      if (this[target].PaymentCalc) {
        this[target].PaymentCalc.init();
      }
      if (this[target].TermCalc) {
        this[target].TermCalc.init();
      }
    } else {
      if (this[this.target].MainCalc) {
        this[this.target].MainCalc.destroy();
      }
      if (this[this.target].PaymentCalc) {
        this[this.target].PaymentCalc.destroy();
      }
      if (this[this.target].TermCalc) {
        this[this.target].TermCalc.destroy();
      }
      if (this[target].MainCalc) {
        this[target].MainCalc.init();
      }
      if (this[target].PaymentCalc) {
        this[target].PaymentCalc.init();
      }
      if (this[target].TermCalc) {
        this[target].TermCalc.init();
      }
    }
    this.target = target;
  }

  setResult() {
    if (!this.result) {
      this.result = new ResultCredit(this.mainParameters, this[this.target].MainCalc.getInputValueString(), 45, 30, 45);
    }
    this.result.renderValue(this.mainParameters);
  }

  init() {
    this.getMortgageCalcInit();
    this.getCarCalcInit();
    this.getConsumerCalcInit();
  }
}

export {CreditController};
