// Функция включения валидации всех форм
export function enableValidation(settings) {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach((form) => {
    _setEventListeners(form, settings);
  });
}

// Функция очистки ошибок валидации
export function clearValidation(form, settings) {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const submitButton = form.querySelector(settings.submitButtonSelector);

  inputs.forEach((input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    _hideInputError(errorElement, input, settings);
    input.setCustomValidity("");
  });

  _toggleButtonState(inputs, submitButton, settings);
}

// Приватные функции модуля
function _setEventListeners(form, settings) {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const submitButton = form.querySelector(settings.submitButtonSelector);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      _checkInputValidity(form, input, settings);
      _toggleButtonState(inputs, submitButton, settings);
    });
  });

  form.addEventListener("reset", () => {
    setTimeout(() => {
      _toggleButtonState(inputs, submitButton, settings);
    }, 0);
  });

  _toggleButtonState(inputs, submitButton, settings);
}

function _checkInputValidity(form, input, settings) {
  const errorElement = form.querySelector(`.${input.id}-error`);

  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }

  if (!input.validity.valid) {
    _showInputError(errorElement, input, settings);
  } else {
    _hideInputError(errorElement, input, settings);
  }
}

function _showInputError(errorElement, input, settings) {
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(settings.errorClass);
  input.classList.add(settings.inputErrorClass);
}

function _hideInputError(errorElement, input, settings) {
  if (errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove(settings.errorClass);
  }
  input.classList.remove(settings.inputErrorClass);
}

function _toggleButtonState(inputs, button, settings) {
  const isValid = inputs.every((input) => input.validity.valid);

  if (isValid) {
    button.classList.remove(settings.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(settings.inactiveButtonClass);
    button.disabled = true;
  }
}
