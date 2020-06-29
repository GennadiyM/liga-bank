import {getStringOfNumb} from './utils';

var Selector = {
  BTN_MIN: '.calculate__btn[data-target="min"]',
  BTN_PLUS: '.calculate__btn[data-target="plus"]',
  INPUT: '.calculate__input',
  ERROR: '.formArea__error'
};

var Class = {
  ERROR: 'formArea__error',
};

class RangeCalc {
  constructor(block) {
    this.element = block;
    this.event = new Event('calc');
    this.input = this.element.querySelector(Selector.INPUT);
    this.value = parseInt(this.input.dataset.value,10);
    this.min = parseInt(this.input.dataset.min,10);
    this.max = parseInt(this.input.dataset.max,10);
    this.step = parseInt(this.input.dataset.step,10);
    this.prefix = this.input.dataset.prefix;
    this.error = this.input.dataset.errorMessage;
    this.btnMin = this.element.querySelector(Selector.BTN_MIN);
    this.btnPlus = this.element.querySelector(Selector.BTN_PLUS);

    this.onClick = function (evt) {
      if (evt.target === this.btnMin) {
        this.value = Math.max(this.value -= this.step, this.min);
        this.input.dataset.value = this.value;
      }
      if (evt.target === this.btnPlus) {
        this.value = Math.min(this.value += this.step, this.max);
        this.input.dataset.value = this.value;
      }
      this.input.value = this.getInputValueString();
      this.input.setAttribute('value', this.getInputValueString());
      this.element.dispatchEvent(this.event);
      this.element.classList.remove(Class.ERROR);
    }.bind(this);

    this.onChange = function () {

      this.value = this.input.value;
      this.input.dataset.value = this.value;

      this.element.dispatchEvent(this.event);
    }.bind(this);

    this.onBlur = function () {
      this.input.type = 'text';

      if (this.value < this.min || this.value > this.max) {
        this.input.value = this.error;
        this.value = this.min;
        this.input.setAttribute('value', this.error);
      } else {
        this.input.setAttribute('value', this.getInputValueString());
        this.input.value = this.getInputValueString();
      }
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

  getInputValueNum() {
    return parseInt(this.input.dataset.value,10);
  }

  init() {
    this.btnMin.addEventListener('click', this.onClick);
    this.btnPlus.addEventListener('click', this.onClick);
    this.input.addEventListener('focus', this.onFocus);
  }

  destroy() {
    this.btnMin.removeEventListener('click', this.onClick);
    this.btnPlus.removeEventListener('click', this.onClick);
    this.input.removeEventListener('focus', this.onFocus);
  }
}

export default RangeCalc;
