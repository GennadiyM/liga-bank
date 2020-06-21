var popupLogin = function () {
  var Selector = {
    BTN_OPEN_POPUP: '.js-login-open',
    POPUP: '.js-login-popup',
    BTN_CLOSE_POPUP: '.js-login-close',
    BTN_SHOW_PASSWORD: '.js-password-show',
    AREA_PASSWORD: '.js-area-password',
    AREA_LOGIN: '.js-area-login',
    OVERLAY: '.js-overlay',
    BTN_SUBMIT: '.js-login-submit',
    FORM_AREA: '.formArea'
  };

  var Class = {
    POPUP_SHOW: 'popup--show',
    OVERLAY_SHOW: 'overlay--show',
    AREA_ERROR: 'formArea--error',
  };

  var Keydown = {
    ENTER: 13,
    ESC: 27,
  };

  var popup = document.querySelector(Selector.POPUP);
  var btnOpenPopup = document.querySelector(Selector.BTN_OPEN_POPUP);

  if (!popup || !btnOpenPopup) {
    return;
  }

  var btnClosePopup = popup.querySelector(Selector.BTN_CLOSE_POPUP);
  var btnSubmitPopup = popup.querySelector(Selector.BTN_SUBMIT);
  var overlay = document.querySelector(Selector.OVERLAY);
  var areaPassword = popup.querySelector(Selector.AREA_PASSWORD);
  var inputPassword = areaPassword.querySelector('input');
  var areaLogin = popup.querySelector(Selector.AREA_LOGIN);
  var inputLogin = areaLogin.querySelector('input');
  var btnShowPassword = popup.querySelector(Selector.BTN_SHOW_PASSWORD);
  var inputs = popup.querySelectorAll('input');

  var storageName = localStorage.getItem('name');
  var storagePassword = localStorage.getItem('password');
  var statusPassword = true;

  var onFocusInput = function (evt) {
    var focusInput = evt.target;
    var formAreaFocusInput = focusInput.closest(Selector.FORM_AREA);
    formAreaFocusInput.classList.toggle(Class.AREA_ERROR, false);
  };

  var addEventListener = function (element) {
    element.addEventListener('focus', onFocusInput);
  };

  var removeEventListener = function (element) {
    element.removeEventListener('focus', onFocusInput);
  };

  var getFocusInput = function () {
    inputLogin.focus();

    if (storageName) {
      inputLogin.value = storageName;
      inputPassword.focus();
    }
    if (storagePassword) {
      inputPassword.value = storagePassword;
      inputLogin.focus();
    }
  };

  var onClickBtnShowPopup = function (env) {
    env.preventDefault();
    popup.classList.add(Class.POPUP_SHOW);
    overlay.classList.add(Class.OVERLAY_SHOW);
    btnOpenPopup.removeEventListener('click', onClickBtnShowPopup);
    btnClosePopup.addEventListener('click', onClosePopup);
    btnShowPassword.addEventListener('click', onClickBtnShowPassword);
    overlay.addEventListener('click', onClosePopup);
    window.addEventListener('keydown', onWindowKeydown);
    btnSubmitPopup.addEventListener('click', onClickBtnSubmit);
    getFocusInput();
    inputs.forEach(function (currentValue) {
      addEventListener(currentValue);
    });
  };

  var getClosePopup = function () {
    popup.classList.remove(Class.POPUP_SHOW);
    overlay.classList.remove(Class.OVERLAY_SHOW);
    statusPassword = true;
    switchShowPassword();
    btnShowPassword.removeEventListener('click', onClickBtnShowPassword);
    btnOpenPopup.addEventListener('click', onClickBtnShowPopup);
    btnClosePopup.removeEventListener('click', onClosePopup);
    inputs.forEach(function (currentValue) {
      removeEventListener(currentValue);
    });
  };

  var onClosePopup = function (env) {
    env.preventDefault();

    getClosePopup();
  };

  var switchShowPassword = function () {
    inputPassword.type = statusPassword ? 'password' : 'text';
  };

  var onClickBtnShowPassword = function (env) {
    env.preventDefault();
    statusPassword = !statusPassword;
    switchShowPassword();
  };

  var onWindowKeydown = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === Keydown.ESC) {
      getClosePopup();
    }
    window.removeEventListener('keydown', onWindowKeydown);
  };

  var onClickBtnSubmit = function (evt) {
    storageName = localStorage.setItem('name', inputLogin.value);
    storagePassword = localStorage.setItem('password', inputPassword.value);

    if (!inputPassword.value || !inputLogin.value) {
      evt.preventDefault();
      if (!inputPassword.value) {
        areaPassword.classList.add(Class.AREA_ERROR);
      }
      if (!inputLogin.value) {
        areaLogin.classList.add(Class.AREA_ERROR);
      }
    }
  };

  btnOpenPopup.addEventListener('click', onClickBtnShowPopup);
};

export default popupLogin;
