'use strict';

var WIZARD_COUNT = 4;

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var wizards = [];

var similarListElement = document.querySelector('.setup-similar-list');
var userDialog = document.querySelector('.setup');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

userDialog.querySelector('.setup-similar').classList.remove('hidden');
userDialog.classList.remove('hidden');

/**
 * Определяем случайное число, начиная от 0
 * @param {number} max - Максимальное целое число
 * @return {number} Случайное целое число
 */
var getRandomNumber = function (max) {
  return Math.round(Math.random() * (max - 1));
};

/**
 * Создаем объект-мага и добавляем его в массив магов
 * @return {void}
 */
var createWizards = function () {
  for (var i = 0; i < WIZARD_COUNT; i++) {
    wizards.push({
      name: WIZARD_NAMES[getRandomNumber(WIZARD_NAMES.length)],
      surname: WIZARD_SURNAMES[getRandomNumber(WIZARD_SURNAMES.length)],
      coatColor: COAT_COLOR[getRandomNumber(COAT_COLOR.length)],
      eyeColor: EYE_COLOR[getRandomNumber(EYE_COLOR.length)]
    });
  }
};

/**
 * Копируем вёрстку мага из шаблона и добавляем свои свойства к цвету и имени
 * @param {object} wizard - Объект-маг из массива магов
 * @return {object} Возвращаем объект-вёрстку мага
 */
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

  return wizardElement;
};

/**
 * Добавляем магов одного за другим к вёрстке
 * @return {void}
 */
var wizardAdd = function () {
  var fragment = document.createDocumentFragment();

  wizards.forEach(function (item) {
    fragment.appendChild(renderWizard(item));
  });

  similarListElement.appendChild(fragment);
};


createWizards();
wizardAdd();
document.querySelector('.setup-similar-list').classList.remove('hidden');
