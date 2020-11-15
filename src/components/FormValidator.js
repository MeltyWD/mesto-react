export default class FormValidator {
  constructor(popupSelector, validationSetting) {
    this._popupSelector = popupSelector;
    this._form = this._popupSelector.querySelector('.form');
    this._submit = this._form.querySelector('.form__submit');
    this._inputList = Array.from(this._form.querySelectorAll('.form__input'));
    this._validationSetting = validationSetting
  }

  enableValidation () {
    this._setEventListeners()
  }

  _setEventListeners () {
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(this._form, inputElement, this._validationSetting);
        this.toggleButtonState(
          this._inputList, this._submit,
          this._validationSetting
        );
      });
    });
    this.toggleButtonState(
      this._inputList, this._submit,
      this._validationSetting
    );
  };

  openCheckValidity() {
    this._inputList.forEach((inputElement) => {
      // Проверяем каждый инпут на валидность
      this._checkInputValidity(this._form, inputElement, this._validationSetting);
    });
  };

  toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(this._inputList)) {
      // сделай кнопку неактивной
      this._submit.classList.add(this._validationSetting.inactiveButtonClass);
      this._submit.disabled = true;
    } else {
      // иначе сделай кнопку активной
      this._submit.classList.remove(this._validationSetting.inactiveButtonClass);
      this._submit.disabled = false;
    }
  };

  _hasInvalidInput(inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  };

  _checkInputValidity(formElement, inputElement, rest) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        rest
      );
    } else {
      this._hideInputError(formElement, inputElement, rest);
    }
  };

  _showInputError(
    formElement,
    inputElement,
    errorMessage,
    { inputErrorClass, errorClass }
  ) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };

  _hideInputError(
    formElement,
    inputElement,
    { inputErrorClass, errorClass }
  ) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  };
}
