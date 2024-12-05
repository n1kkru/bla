import validator from 'validator'

import { inputmaskInit } from '../libs/inputmask/inputmask'

class InputValidator {
  constructor(input) {
    this.el = input
    this.value = input.value
    this.el.addEventListener('input', () => {
      this.value = this.el.value
    })
    if (input.getAttribute('data-validate') !== 'data-validate')
      this.type = input.getAttribute('data-validate')
    else this.type = input.getAttribute('type')
    this.minlength = input.getAttribute('minlength')
    this.required = input.required
    this.isValid = true
    this.afterSubmit = false
    this.errorMessage = input.getAttribute('data-error-message')
    if (input.dataset.errorContainer) {
      this.errorContainer = document.querySelector(
        `[data-error-container=${input.dataset.errorContainer}]`
      )
      this.errorContainer.classList.add('input-ui__error')
    } else this.errorContainer = input.parentNode.querySelector('[data-error-container]')
  }

  validate() {
    if (!this.afterSubmit) {
      this.afterSubmit = true
      this.el.addEventListener('input', () => {
        this.validate()
      })
    }
    const valid = this.checkValid()
    this.#switchError(this.errorMessage)

    return valid
  }

  checkValid() {
    if (this.value !== '') {
      if (this.#checkMinLength()) {
        const myValueText = this.value.replace(/['\s_\-]/g, '')
        const myPhone = this.value.replace(/\D/g, '')

        switch (
          this.type // Тут добавляем нужную нам валидацию, если строк много то выносим в отдельную функцию
        ) {
          case 'email':
            this.isValid = validator.isEmail(this.value)
            break

          case 'text':
            this.isValid = validator.isAlpha(myValueText, 'ru-RU')
            // this.isValid = validator.isAlpha(this.value);
            break

          case 'tel':
            if (myPhone.length < 11) {
              this.isValid = false
              break
            }
            this.isValid = validator.isMobilePhone(myPhone)
            break

          default:
            break
        }
        this.errorMessage = this.el.getAttribute('data-error-message')
      }
    } else if (this.required) {
      this.isValid = false
      this.errorMessage = 'Это поле не может быть пустым' // Тут можно добавить сообщение, по типу - это поле не может быть пустым
    }
    return this.isValid
  }

  #checkMinLength() {
    if (this.minlength && this.value.length < parseInt(this.minlength)) {
      this.isValid = false
      this.errorMessage = 'Минимальное число символов ' + this.minlength
      return false
    }
    return true
  }

  #switchError(message) {
    if (!this.isValid) {
      this.errorContainer.classList.add('input-ui__error_visible') // Добавить стили для ошибки в соответствии с проектом
      this.errorContainer.innerHTML = message
    } else {
      this.errorContainer.classList.remove('input-ui__error_visible')
      this.errorContainer.innerHTML = ''
    }
  }
}

export const validateFormInit = () => {
  window.isValidFormByElement = isValidFormByElement
  const forms = document.querySelectorAll('form')
  if (!forms) return

  inputmaskInit()

  forms.forEach(form => {
    const inputs = form.querySelectorAll('[data-validate]')
    const formId = form.dataset.formId

    form.addEventListener('submit', e => {
      e.preventDefault()
      let isValidForm = true

      inputs.forEach(input => {
        const inputValidator = new InputValidator(input)

        if (!inputValidator.validate()) isValidForm = false
      })

      // заменить или убрать
      if (isValidForm) {
        switch (formId) {
          case 'main-form':
            //Вызов ответов под форму
            console.log('Form send')
            break

          default:
            break
        }
      } else {
        console.log(new Error('Form no send'))
      }
    })
  })
}

function isValidFormByElement(form) {
  const inputs = form.querySelectorAll('[data-validate]')
  let isValidForm = true
  inputs.forEach(input => {
    const inputValidator = new InputValidator(input)
    if (!inputValidator.checkValid()) isValidForm = false
  })
  return isValidForm
}
