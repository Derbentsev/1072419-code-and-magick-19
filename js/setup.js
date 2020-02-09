'use strict';

var WIZARD_COUNT = 4;
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var wizards = [];

var similarList = document.querySelector('.setup-similar-list');
var userDialog = document.querySelector('.setup');
var setupWizardWindow = userDialog.querySelector('.setup-similar');
var setupWizardCloseButton = userDialog.querySelector('.setup-close');
var setupWizardOpenButton = document.querySelector('.setup-open');
var avatarImage = setupWizardOpenButton.querySelector('img');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var setupPlayer = userDialog.querySelector('.setup-player');
var setupWizardCoat = setupPlayer.querySelector('.wizard-coat');
var setupWizardCoatInput = setupPlayer.querySelector('input[name="coat-color"]');
var setupWizardEyes = setupPlayer.querySelector('.wizard-eyes');
var setupWizardEyesInput = setupPlayer.querySelector('input[name="eyes-color"]');
var setupFireball = document.querySelector('.setup-fireball-wrap');

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
  var wizardClone = similarWizardTemplate.cloneNode(true);

  wizardClone.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardClone.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardClone.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

  return wizardClone;
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

  similarList.appendChild(fragment);
};

/**
 * Открываем окно настройки персонажа
 * @return {void}
 */
var openSetupWindow = function () {
  userDialog.classList.remove('hidden');

  createEventListenersCloseSetupWindow();
  removeEventListenersOpenSetupWindow();
};

/**
 * Открываем окно настройки персонажа по нажатию ENTER
 * @param {object} evt - Событие нажатия
 * @return {void}
 */
var onAvatarPressEnter = function (evt) {
  if (evt.key === ENTER_KEY) {
    openSetupWindow();
  }
};

/**
 * Закрываем окно настройки персонажа
 * @return {void}
 */
var closeSetupWindow = function () {
  userDialog.classList.add('hidden');

  createEventListenersOpenSetupWindow();
  removeEventListenersCloseSetupWindow();
};

/**
 * Закрываем окно настройки персонажа при нажатии клавиши ESC
 * @param {object} evt - Нажатие на клавиатуре
 * @return {void}
 */
var onPopupPressEsc = function (evt) {
  if (evt.key === ESC_KEY && !evt.target.matches(['input'])) {
    closeSetupWindow();
  }
};

/**
 * Закрываем окно настройки персонажа при нажатии клавиши ENTER
 * @param {object} evt - Нажатие на клавиатуре
 * @return {void}
 */
var onPopupPressEnter = function (evt) {
  if (evt.key === ENTER_KEY && evt.target === setupWizardCloseButton) {
    closeSetupWindow();
  }
};

/**
 * Создаем обработчики событий открытия окна настройки персонажа
 * @return {void}
 */
var createEventListenersOpenSetupWindow = function () {
  avatarImage.addEventListener('click', openSetupWindow);
  avatarImage.addEventListener('keydown', onAvatarPressEnter);
};

/**
 * Создаем обработчики событий закрытия окна настройки персонажа
 * @return {void}
 */
var createEventListenersCloseSetupWindow = function () {
  document.addEventListener('keydown', onPopupPressEsc);
  setupWizardCloseButton.addEventListener('click', closeSetupWindow);
  setupWizardCloseButton.addEventListener('keydown', onPopupPressEnter);
};

/**
 * Удаляем обработчики событий открытия окна настройки персонажа
 * @return {void}
 */
var removeEventListenersOpenSetupWindow = function () {
  avatarImage.removeEventListener('click', openSetupWindow);
  avatarImage.removeEventListener('keydown', onAvatarPressEnter);
};

/**
 * Удаляем обработчики событий закрытия окна настройки персонажа
 * @return {void}
 */
var removeEventListenersCloseSetupWindow = function () {
  document.removeEventListener('keydown', onPopupPressEsc);
  setupWizardCloseButton.removeEventListener('click', closeSetupWindow);
  setupWizardCloseButton.removeEventListener('keydown', closeSetupWindow);
};

/**
 * Меняем цвет мантии
 * @return {void}
 */
var changeColorCoat = function () {
  var coatColor = COAT_COLOR[getRandomNumber(COAT_COLOR.length)];
  setupWizardCoat.style.fill = coatColor;
  setupWizardCoatInput.value = coatColor;
};

/**
 * Меняем цвет глаз
 * @return {void}
 */
var changeEyesColor = function () {
  var eyeColor = EYE_COLOR[getRandomNumber(EYE_COLOR.length)];
  setupWizardEyes.style.fill = eyeColor;
  setupWizardEyesInput.value = eyeColor;
};

/**
 * Меняем цвет фаерболла
 * @return {void}
 */
var changeFireballColor = function () {
  var fireballColor = FIREBALL_COLOR[getRandomNumber(FIREBALL_COLOR.length)];
  setupFireball.style.backgroundColor = fireballColor;
  setupFireball.value = fireballColor;
};

/**
 * Создаем обработчики событий клика на персонаже в окне Настройки
 * @return {void}
 */
var createEventListenersPlayerColor = function () {
  setupWizardCoat.addEventListener('click', changeColorCoat);
  setupWizardEyes.addEventListener('click', changeEyesColor);
  setupFireball.addEventListener('click', changeFireballColor);
};


setupWizardWindow.classList.remove('hidden');
createEventListenersOpenSetupWindow();
createEventListenersPlayerColor();
createWizards();
wizardAdd();
similarList.classList.remove('hidden');
