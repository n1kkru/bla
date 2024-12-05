### Как пользоваться Валидатором:**

*В контейнере с инпутом должен быть контейнер с атрибутом data-error-container (если его не будет, то передать инпуту этот атрибутом с айдишником)

- Валидатор собирает все формы по тегу form
- Обязательный атрибут у формы - novalidate

- Обязательный атрибут у инпута - data-validate='text' (вместо text пишите свой типа инпута)
- Обязательный атрибут у инпута - data-error-message (текст ошибки)
- Обязательный атрибут для телефона - data-mask-phone
- Если нужен контейнер под ошибку не в оболочке с инпутом, то указываем контейнеру data-error-container="айди контейнера под ошибку" (если не указать, будет искать контейнер внутри родителя инпута)

*Валидация на самих инпутах на ввод символов начнет работать только после первой попытки отправки формы, до первого сабмита ошибки не будут подсвечиваться, чтобы не мешать пользователю


```+rem-input(type='tel',data-input='',data-mask-phone='',placeholder='+7 (___) ___-__-__',name='phone',minlength='3',required='',data-validate='tel',data-error-message='Заполните поле')```


```
mixin rem-input(name)
  .input-ui.custom-placeholder(data-input-parent='')
    input(data-input='',data-validate='',required='',name=name ? name : '')&attributes(attributes)
    .ui-input__error(data-error-container='')
```



### Настройка config для форматирования scss

- установить расширение Prettier
- добавить в `.settings.json` следующий код:

```
"stylelint.validate": ["css", "less", "postcss", "scss"],
"prettier.singleQuote": true,
"prettier.jsxSingleQuote": true,
"prettier.semi": false,
"[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
"[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
    "source.fixAll.stylelint": "explicit"
  },
```
