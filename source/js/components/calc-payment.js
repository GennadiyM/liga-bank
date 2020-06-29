import {getStringOfNumb} from './utils';

var Selector = {
  INPUT: '.calculate__input',
  BTN_MIN: '.calculate__btn[data-target="min"]',
  BTN_PLUS: '.calculate__btn[data-target="plus"]',
};

var Class = {
  ERROR: 'formArea__error',
};

class CalcPayment {
  constructor(block, value) {
    this.element = block;
    this.event = new Event('calc');
    this.input = this.element.querySelector(Selector.INPUT);
    this.percent = parseInt(this.input.dataset.percent,10);
    this.value = parseInt(value,10) * this.percent / 100;
    this.min = parseInt(value,10) * this.percent / 100;
    this.prefix = this.input.dataset.prefix;
    this.input.value = this.getInputValueString();
    this.rangeStep = parseInt(this.input.dataset.rangeStep,10);

    this.onChange = function () {
      this.value = this.input.value;
      this.element.dispatchEvent(this.event);
      this.input.value = this.getInputValueString();
    }.bind(this);

    this.onBlur = function () {
      this.input.type = 'text';
      this.input.value = this.getInputValueString();
      this.input.removeEventListener('blur', this.onBlur);
      this.input.removeEventListener('change', this.onChange);
    }.bind(this);

    this.onFocus = function () {
      this.element.classList.remove(Class.ERROR);
      this.input.type = 'number';
      this.input.value = this.value;
      this.input.setAttribute('value', this.value);
      this.input.addEventListener('blur', this.onBlur);
      this.input.addEventListener('change', this.onChange);
    }.bind(this);
  }

  getInputValueString() {
    var numbOfString = getStringOfNumb(this.value);
    return numbOfString + ' ' + this.prefix;
  }

  init() {
    this.input.addEventListener('focus', this.onFocus);
  }

  destroy() {
    this.input.removeEventListener('focus', this.onFocus);
  }

  set(value) {
    this.value = parseInt(value,10) * this.percent / 100;
    this.min = parseInt(value,10) * this.percent / 100;
    this.input.value = this.getInputValueString();
  }
}

export default CalcPayment;
