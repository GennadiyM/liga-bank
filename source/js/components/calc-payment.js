import {getStringOfNumb} from './utils';

var Selector = {
  INPUT: '.calculate__input',
  BTN_MIN: '.calculate__btn[data-target="min"]',
  BTN_PLUS: '.calculate__btn[data-target="plus"]',
  RANGE: '.range__btn',
  RANGE_INFO: '.range__captionLeft',
  RANGE_BAR: '.range__bar',
};

var Class = {
  ERROR: 'formArea__error',
};

class CalcPayment {
  constructor(block, value) {
    this.element = block;
    this.event = new Event('calc');
    this.input = this.element.querySelector(Selector.INPUT);
    this.sumCredit = parseInt(value, 10);
    this.percent = parseInt(this.input.dataset.percent,10);
    this.value = parseInt(value,10) * this.percent / 100;
    this.min = parseInt(value,10) * this.percent / 100;
    this.prefix = this.input.dataset.prefix;
    this.input.value = this.getInputValueString();
    this.rangeStep = parseInt(this.input.dataset.rangeStep,10);
    this.range = this.element.querySelector(Selector.RANGE);
    this.rangeInfo = this.element.querySelector(Selector.RANGE_INFO);
    this.rangeBar = this.element.querySelector(Selector.RANGE_BAR);
    this.rangeParameters = {};

    this.onChange = function () {
      this.value = Math.max(this.input.value, this.min);
      this.input.setAttribute('value', this.value);
      this.input.value = this.value;
      this.element.dispatchEvent(this.event);
      this.getRangeInfo();
    }.bind(this);

    this.onBlur = function () {
      this.input.type = 'text';
      this.input.setAttribute('value', this.getInputValueString());
      this.input.value = this.getInputValueString();
      this.input.removeEventListener('blur', this.onBlur);
      this.input.removeEventListener('change', this.onChange);
      this.getRangeInfo();
    }.bind(this);

    this.onFocus = function () {
      this.element.classList.remove(Class.ERROR);
      this.input.type = 'number';
      this.input.value = this.value;
      this.input.setAttribute('step', this.value * this.rangeStep / 100);
      this.input.setAttribute('value', this.value);
      this.input.addEventListener('blur', this.onBlur);
      this.input.addEventListener('change', this.onChange);
    }.bind(this);

    this.onMouseUp = function (evt) {
      evt.preventDefault();

      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseup', this.onMouseUp);
    }.bind(this);

    this.onMouseDownRange = function (evt) {
      if (evt.which !== 1) {
        return;
      }
      this.rangeParameters.widthRangeBar = this.rangeBar.clientWidth;
      this.rangeParameters.widthRange = this.range.clientWidth;
      this.rangeParameters.maxRangeStyle = Math.round((this.rangeParameters.widthRangeBar - this.rangeParameters.widthRange) * 100 / this.rangeParameters.widthRangeBar);
      this.rangeParameters.rangeBarLeftCoordinates = this.rangeBar.getBoundingClientRect().x;
      this.rangeParameters.rangeStartCoordinates = this.range.getBoundingClientRect().x;
      this.rangeParameters.rangeStartShift = this.rangeParameters.rangeStartCoordinates - this.rangeParameters.rangeBarLeftCoordinates;

      this.rangeParameters.rangeClickCoordinate = evt.offsetX;
      this.rangeParameters.mouseStartPos = this.rangeParameters.rangeStartCoordinates + this.rangeParameters.rangeClickCoordinate;
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
    }.bind(this);

    this.onMouseMove = function (evt) {
      evt.preventDefault();

      this.rangeParameters.mouseShift = evt.clientX - this.rangeParameters.mouseStartPos;
      this.rangeParameters.rangePercent = Math.round((this.rangeParameters.rangeStartShift + this.rangeParameters.mouseShift) * 100 / this.rangeParameters.widthRangeBar);

      this.rangeParameters.styleValue = Math.max(Math.min(this.rangeParameters.rangePercent, this.rangeParameters.maxRangeStyle), 0);
      console.log(this.rangeParameters.styleValue);
      console.log(this.roundTo5(this.rangeParameters.styleValue));

      // this.getShiftRange(this.rangeParameters.styleValue)
      this.getShiftRange(this.roundTo5(this.rangeParameters.styleValue));


    }.bind(this);
  }

  getShiftRange(value) {
    this.range.style.left = value + '%';
  }

  roundTo5(num) {
    return Math.round(num / this.rangeStep) * this.rangeStep * 1.1;
  }

  setMaxPayment(value) {
    this.maxPayment = value;
  }

  getInputValueString() {
    var numbOfString = getStringOfNumb(this.value);
    return numbOfString + ' ' + this.prefix;
  }

  getInputValueNum() {
    return this.value;
  }

  getMinPercent() {
    return this.percent;
  }

  init() {
    this.input.addEventListener('focus', this.onFocus);
    this.range.addEventListener('mousedown', this.onMouseDownRange);
  }

  destroy() {
    this.input.removeEventListener('focus', this.onFocus);
  }

  getInterestPercentPayment() {
    return this.value / this.sumCredit * 100;
  }

  getRangeInfo() {
    this.rangeInfo.innerText = Math.round(this.getInterestPercentPayment());
  }

  set(value) {
    this.sumCredit = parseInt(value, 10);
    this.value = parseInt(value,10) * this.percent / 100;
    this.min = parseInt(value,10) * this.percent / 100;
    this.input.value = this.getInputValueString();
  }
}

export default CalcPayment;
