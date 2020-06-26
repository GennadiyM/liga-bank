import {createElement, getStringOfNumb} from './utils';
var PREFIX = ' рублей';

var Selector = {
  BTN_MIN: '.calculate__btn[data-target="min"]',
  BTN_PLUS: '.calculate__btn[data-target="plus"]',
  INPUT: '.calculate__input',
  ERROR: '.formArea__error'
};

var Class = {
  ERROR: 'formArea__error',
};

class Calc {
  constructor(calcParameters) {
    this.name = calcParameters.name;
    this.value = calcParameters.value;
    this.min = calcParameters.min;
    this.max = calcParameters.max;
    this.place = calcParameters.place;
    this.step = calcParameters.step;
    this.event = new Event('calc');

    this.onClick = function (evt) {
      if (evt.target === this.btnMin) {
        this.value = Math.max(this.value -= this.step, this.min);
      }
      if (evt.target === this.btnPlus) {
        this.value = Math.min(this.value += this.step, this.max);
      }
      this.input.value = this.getInputValue();
      this.input.setAttribute('value', this.getInputValue());
      this.element.dispatchEvent(this.event);
      this.element.classList.remove(Class.ERROR);
    }.bind(this);

    this.onChange = function () {

      this.value = this.input.value;

      this.element.dispatchEvent(this.event);
    }.bind(this);

    this.onBlur = function () {
      this.input.type = 'text';

      if (this.value < this.min || this.value > this.max) {
        this.input.value = this.error;
        this.value = this.min;
        this.input.setAttribute('value', this.error);
      } else {
        this.input.setAttribute('value', this.getInputValue());
        this.input.value = this.getInputValue();
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

  getInputValue() {
    var numbOfString = getStringOfNumb(this.value);
    return numbOfString + PREFIX;
  }

  getTemplate() {
    return '<div class="formArea js-calculate">' +
      '<label class="formArea__label" for="price">' + this.name + '</label>' +
      '<div class="formArea__slot">' +
      '<div class="calculate">' +
      '<button class="calculate__btn" type="button" aria-label="уменьшить" data-target="min"></button>' +
      '<div class="calculate__area">' +
      '<input class="calculate__input" id="price" type="text" value="' + this.getInputValue() + '">' +
      '</div>' +
      '<button class="calculate__btn calculate__btn--plus" type="button" data-target="plus" aria-label="увеличить"></button>' +
      '</div>' +
      '<span class="formArea__error">Некорректное значение</span>' +
      '</div>' +
      '<div class="formArea__caption">' +
      '<p>От <span>' + getStringOfNumb(this.min) + '</span> до <span>' + getStringOfNumb(this.max) + '</span> рублей</p>' +
      '</div>' +
      '</div>';
  }

  getCreateElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.error = this.element.querySelector(Selector.ERROR).innerText;
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
    this.error = null;
  }

  init() {
    this.place.insertAdjacentElement('beforeend', this.getCreateElement());
    this.input = this.element.querySelector(Selector.INPUT);
    this.btnMin = this.element.querySelector(Selector.BTN_MIN);
    this.btnPlus = this.element.querySelector(Selector.BTN_PLUS);

    this.btnMin.addEventListener('click', this.onClick);
    this.btnPlus.addEventListener('click', this.onClick);
    this.input.addEventListener('focus', this.onFocus);
  }
}

export default Calc;
