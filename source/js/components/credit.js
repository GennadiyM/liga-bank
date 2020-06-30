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
    // this.carBlocks = {
    //   mainCalc: document.querySelector(Selector.CAR_CONTAINER + ' ' + Selector.MAIN_CALC),
    //   paymentCalc: document.querySelector(Selector.CAR_CONTAINER + ' ' + Selector.PAYMENT_CALC),
    //   termCalc: document.querySelector(Selector.CAR_CONTAINER + ' ' + Selector.TERM_CALC),
    // };
    // this.consumerBlocks = {
    //   mainCalc: document.querySelector(Selector.CONSUMER_CONTAINER + ' ' + Selector.MAIN_CALC),
    //   termCalc: document.querySelector(Selector.CONSUMER_CONTAINER + ' ' + Selector.TERM_CALC),
    // };

    this.onMainCalc = function () {
      this.value = this.MainCalc.getInputValueNum();
      this.getMinPayment();
      this.getInnerMortgageParameters();
      this.Result.renderValue(this.getResultParameters());
      this.PaymentCalc.set(this.value);
    }.bind(this);

    this.onPaymentCalc = function () {
      this.payment = this.PaymentCalc.getInputValueNum();
      this.getInnerMortgageParameters();
      this.Result.renderValue(this.getResultParameters());
    }.bind(this);

    this.onChangeMortgageOption = function () {
      this.getInnerMortgageParameters();
      this.PaymentCalc.setMaxPayment(this.maxPayment);
      this.getMinPayment();
      this.Result.renderValue(this.getResultParameters());
    }.bind(this);
  }

  getMortgageCalcInit() {
    this.MainCalc = new Calc(this.mortgageBlocks.mainCalc);
    this.MainCalc.init();
    this.TermCalc = new TermCalc(this.mortgageBlocks.termCalc);
    this.TermCalc.init();
    this.value = this.MainCalc.getInputValueNum();
    this.PaymentCalc = new PaymentCalc(this.mortgageBlocks.paymentCalc, this.value);
    this.PaymentCalc.init();
    this.minPercentPayment = this.PaymentCalc.getMinPercent();
  }

  getInnerMortgageParameters() {
    this.payment = this.PaymentCalc.getInputValueNum();
    this.getMortgageSumAndMaxPayment();
    this.percentPayment = this.PaymentCalc.getInterestPercentPayment();
    this.term = this.TermCalc.getInputValueInMonth();
    this.interestRate = (this.percentPayment < this.rateTreshold) ? (this.rateMax / 12) / 100 : (this.rateMin / 12) / 100;
  }

  getMortgageSumAndMaxPayment() {
    this.bonus = this.mortgageBlocks.optionInput.checked ? parseInt(this.mortgageBlocks.optionInput.dataset.bonus, 10) : 0;
    this.sumCredit = this.value - this.bonus - this.payment;
    this.maxPayment = this.sumCredit - this.paymentThreshold;
  }

  getMinPayment() {
    this.minPayment = this.sumCredit * this.minPercentPayment / 100;
  }

  getMonthPayment() {
    return Math.round(this.sumCredit * (this.interestRate + (this.interestRate / (Math.pow(this.interestRate + 1, this.term) - 1))));
  }

  getIncome() {
    return this.getMonthPayment() * 100 / 45;
  }

  getMortgageEventListener() {
    this.mortgageBlocks.mainCalc.addEventListener('calc', this.onMainCalc);
    this.mortgageBlocks.paymentCalc.addEventListener('calc', this.onPaymentCalc);
    this.mortgageBlocks.optionInput.addEventListener('change', this.onChangeMortgageOption);
  }

  getResultStartParameters() {
    return {
      nameForm: this.parameters.nameForm,
      nameInfo: this.parameters.nameInfo,
      nameResult: this.parameters.nameResult,
    };
  }

  getResultParameters() {
    return {
      summer: this.sumCredit,
      rate: this.interestRate,
      monthPayment: this.getMonthPayment(),
      income: this.getIncome(),
      value: this.PaymentCalc.getInputValueNum(),
      maxPayment: this.maxPayment,
    };
  }

  setMainParameters(parameters) {
    this.parameters = parameters;
    this.nameForm = parameters.nameForm;
    this.nameInfo = parameters.nameInfo;
    this.nameResult = parameters.nameResult;
    this.targetForm = parameters.targetForm;
    this.paymentThreshold = parseInt(this.parameters.paymentThreshold, 10);
    this.rateTreshold = parseInt(this.parameters.rateTreshold, 10);
    this.income = parseInt(this.parameters.income, 10);
    this.rateMin = parseFloat(this.parameters.rateMin);
    this.rateMax = parseFloat(this.parameters.rateMax);
  }

  init() {
    this.getMortgageCalcInit();
    this.getInnerMortgageParameters();
    this.PaymentCalc.setMaxPayment(this.maxPayment);
    this.getMortgageEventListener();
    this.Result = new ResultCredit(this.getResultStartParameters());
    this.Result.renderValue(this.getResultParameters());
  }
}

export {CreditController};
