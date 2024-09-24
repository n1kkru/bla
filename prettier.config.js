/*
Документация: https://prettier.io/docs/en/options.html
*/

const config = {
	// Желательная максимальная длина строки(не фиксированная, а рекомендуемая) | Default: 80
	printWidth: 100,

	// Количество пробелов для каждого уровня отступа | Default: 2
	tabWidth: 2,

	// Использовать табуляцию вместо пробелов | Default: false
	useTabs: false,

	// Добавлять точку с запятой в конце каждой инструкции | Default: true
	semi: false,

	// Использовать одинарные кавычки вместо двойных | Default: true
	singleQuote: true,

	// Когда оборачивать свойства объекта в кавычки | Default: "as-needed" | "<as-needed|consistent|preserve>"
	quoteProps: "as-needed",

	// Добавлять запятые в конце в массивах, объектах и тд | Default: "all" | "<all|es5|none>"
	trailingComma: "none",

	// Добавлять пробелы между скобками в объектных литералах | Default: true
	// { foo: bar } / {foo: bar}
	bracketSpacing: true,

	// Оставлять закрывающую ">" на последней строке многострочного открывающего тега вместо переноса на новую строку(не применимо к самозакрывающимся тегам) | Default: false
	bracketSameLine: false,

	// Оборачивать единственный параметр стрелочной функции в скобки | Default: "always" | "<always|avoid>"
	arrowParens: "avoid",

	// Указать глобальную чувствительность к пробелам для HTML, Vue, Angular и Handlebars | Default: "css" | "<css|strict|ignore>"
	htmlWhitespaceSensitivity: "css",

	// Применять один атрибут для каждой строки в HTML, Vue и JSX | Default: false
	singleAttributePerLine: true
}

export default config;
