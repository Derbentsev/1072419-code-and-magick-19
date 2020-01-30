'use strict';

var wizardCount = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
document.querySelector('.setup-similar-list').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomNumber = function (max) {
  return Math.round(Math.random() * (max - 1));
};

var wizards = [];
var createWizards = function () {
  for (var i = 0; i < wizardCount; i++) {
    var b = {
      name: WIZARD_NAMES[getRandomNumber(WIZARD_NAMES.length)],
      surname: WIZARD_SURNAMES[getRandomNumber(WIZARD_SURNAMES.length)],
      coatColor: COAT_COLOR[getRandomNumber(COAT_COLOR.length)],
      eyeColor: EYE_COLOR[getRandomNumber(EYE_COLOR.length)]
    };
    wizards.push(b);
  }
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;
  return wizardElement;
};

var wizardAdd = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

createWizards();
wizardAdd();
userDialog.querySelector('.setup-similar').classList.remove('hidden');
