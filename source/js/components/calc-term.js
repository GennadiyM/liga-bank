import {getStringOfNumb} from './utils';

var Selector = {
  INPUT: '.calculate__input',
};

var Class = {
  ERROR: 'formArea__error',
};

class CalcTerm {
  constructor(block) {
    this.element = block;
    this.event = new Event('calc');
    this.input = this.element.querySelector(Selector.INPUT);
    this.min = parseInt(this.input.dataset.min, 10);
    this.max = parseInt(this.input.dataset.min, 10);
    this.value = this.min;
    this.prefix = this.input.dataset.prefix.split(',');
    this.rangeStep = parseInt(this.input.dataset.rangeStep, 10);

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
    this.getCurrentPrefix();
    var numbOfString = getStringOfNumb(this.value);
    return numbOfString + ' ' + this.currentPrefix;
  }

  getCurrentPrefix() {
    var count = this.value % 100;
    if (count >= 5 && count <= 20) {
      this.currentPrefix = this.prefix[2];
    } else {
      count = count % 10;
      if (count === 1) {
        this.currentPrefix = this.prefix[0];
      } else if (count >= 2 && count <= 4) {
        this.currentPrefix = this.prefix[1];
      } else {
        this.currentPrefix = this.prefix[2];
      }
    }
  }

  init() {
    this.input.addEventListener('focus', this.onFocus);
  }

  destroy() {
    this.input.removeEventListener('focus', this.onFocus);
  }
}

export default CalcTerm;
