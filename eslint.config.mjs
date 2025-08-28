import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    ignores: ['node_modules'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      // Основные правила стиля Airbnb (выборка):
      semi: ['error', 'always'], // 1. точка с запятой обязательна
      quotes: ['error', 'single', { avoidEscape: true }], // 2. использование одинарных кавычек
      indent: ['error', 2, { SwitchCase: 1 }], // 3. отступ - 2 пробела
      // 'max-len': ['error', { code: 100, ignoreUrls: true }], // 4. max длина строки - 100 символов
      camelcase: ['error', { properties: 'always' }], // 5. camelCase для идентификаторов
      'no-var': 'error', // 6. запрет var
      'prefer-const': 'error', // 7. предпочитать const, если переменная не переназначается
      'no-empty': ['error', { allowEmptyCatch: true }], // 8. запрет на объявление пустых блоков
      // 'no-console': ['warn', { allow: ['warn', 'error'] }], // 9. запрет console.log()
      'no-use-before-define': ['error', { functions: false, classes: true }], // 10. использование функций после объявления
      'comma-dangle': ['error', 'always-multiline'], // 11. использовать trailing commas
      'space-before-function-paren': ['error', 'never'], // 12. без пробелов перед функцией
      'keyword-spacing': ['error', { before: true, after: true }], // 13. пробелы после if и while
      'object-curly-spacing': ['error', 'always'], // 14. пробелы внутри фигурных скобок
      'prefer-arrow-callback': 'error', // 15. стрелочные функции вместо function
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
]);
