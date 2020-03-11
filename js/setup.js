'use strict';

(function () {
  var WIZARD_COUNT = 4;
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  var INSERT_ELEMENT_STYLE = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red';
  var INSERT_ELEMENT_STYLE_POSITION = 'absolute';
  var INSERT_ELEMENT_LEFT = 0;
  var INSERT_ELEMENT_RIGHT = 0;
  var INSERT_ELEMENT_FONT_SIZE = '30px';
  var INSERT_ELEMENT_POSITION = 'afterbegin';

  var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var similarList = document.querySelector('.setup-similar-list');
  var userDialog = document.querySelector('.setup');
  var form = userDialog.querySelector('.setup-wizard-form');
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

  var coatColor;
  var eyeColor;


  /**
   * Копируем вёрстку мага из шаблона и добавляем свои свойства к цвету и имени
   * @param {object} wizard - Объект-маг из массива магов
   * @return {object} Возвращаем объект-вёрстку мага
   */
  var renderWizard = function (wizard) {
    var wizardClone = similarWizardTemplate.cloneNode(true);

    wizardClone.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardClone.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardClone.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardClone;
  };

  /**
   * Добавляем магов одного за другим к вёрстке
   * @param {object} wizards - Отсортированный массив волшебников
   * @return {void}
   */
  var wizardsAdd = function (wizards) {
    while (similarList.firstChild) {
      similarList.removeChild(similarList.firstChild);
    }

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARD_COUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarList.appendChild(fragment);
  };

  /**
   * Открываем окно настройки персонажа
   * @return {void}
   */
  var openSetupWindow = function () {
    userDialog.classList.remove('hidden');
    userDialog.style.top = '';
    userDialog.style.left = '';

    form.addEventListener('submit', onFormSubmit);

    createEventListenersCloseSetupWindow();
    removeEventListenersOpenSetupWindow();

    window.avatar.addAvatarListener();
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

    form.removeEventListener('submit', onFormSubmit);

    createEventListenersOpenSetupWindow();
    removeEventListenersCloseSetupWindow();

    window.avatar.removeAvatarListener();
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

  var onColorChange = window.debounce.setTimeout(function () {
    window.similarWizard.updateWizards();
  });


  /**
   * Меняем цвет мантии
   * @return {void}
   */
  var changeColorCoat = function () {
    coatColor = COAT_COLOR[window.utils.getRandomNumber(COAT_COLOR.length)];
    setupWizardCoat.style.fill = coatColor;
    setupWizardCoatInput.value = coatColor;
    window.setup.coatColor = coatColor;
    onColorChange();
  };

  /**
   * Меняем цвет глаз
   * @return {void}
   */
  var changeEyesColor = function () {
    eyeColor = EYE_COLOR[window.utils.getRandomNumber(EYE_COLOR.length)];
    setupWizardEyes.style.fill = eyeColor;
    setupWizardEyesInput.value = eyeColor;
    window.setup.eyeColor = eyeColor;
    onColorChange();
  };

  /**
   * Меняем цвет фаерболла
   * @return {void}
   */
  var changeFireballColor = function () {
    var fireballColor = FIREBALL_COLOR[window.utils.getRandomNumber(FIREBALL_COLOR.length)];
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

  /**
   * Обрабатываем ошибки, которые пришли с сервера при загрузке списка волшебников
   * @param {string} errorMessage - Сообщение об ошибке
   * @return {void}
   */
  var onErrorWizardsLoad = function (errorMessage) {
    var node = document.createElement('div');
    node.style = INSERT_ELEMENT_STYLE;
    node.style.position = INSERT_ELEMENT_STYLE_POSITION;
    node.style.left = INSERT_ELEMENT_LEFT;
    node.style.right = INSERT_ELEMENT_RIGHT;
    node.style.fontSize = INSERT_ELEMENT_FONT_SIZE;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(INSERT_ELEMENT_POSITION, node);
  };

  /**
   * Действия при отправке формы
   * @param {object} evt - Событие отправки формы
   * @return {void}
   */
  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), closeSetupWindow, onErrorWizardsLoad);
  };


  window.setup = {
    setupWindow: userDialog,
    wizardsAdd: wizardsAdd,
    colorCoat: coatColor,
    eyeColor: eyeColor
  };


  setupWizardWindow.classList.remove('hidden');
  createEventListenersOpenSetupWindow();
  createEventListenersPlayerColor();
  similarList.classList.remove('hidden');
  window.backend.load(wizardsAdd, onErrorWizardsLoad);
})();
