'use strict';

(function () {
  var setupWindow = window.setup.setupWindow;
  var avatarOnPopup = setupWindow.querySelector('.upload');

  var isDragged = false;

  var startCoords;

  /**
   * При движении мыши
   * @param {*} moveEvt - Событие движения мышкой
   * @return {void}
   */
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    isDragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setupWindow.style.top = (setupWindow.offsetTop - shift.y) + 'px';
    setupWindow.style.left = (setupWindow.offsetLeft - shift.x) + 'px';
  };

  /**
   * При клике мышкой
   * @param {*} clickEvt - Событие клика мышкой
   * @return {void}
   */
  var onMouseClick = function (clickEvt) {
    clickEvt.preventDefault();
    avatarOnPopup.removeEventListener('click', onMouseClick);
  };

  /**
   * При нажатии мышкой
   * @param {*} downEvt - Событие нажатия мышкой
   * @return {void}
   */
  var onMouseDown = function (downEvt) {
    startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  /**
   * При отпускании кнопки мышки
   * @param {*} upEvt - Событие кнопки мышки
   * @return {void}
   */
  var onMouseUp = function (upEvt) {
    if (isDragged) {
      isDragged = false;
      upEvt.preventDefault();
      avatarOnPopup.addEventListener('click', onMouseClick);
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  avatarOnPopup.addEventListener('mousedown', onMouseDown);
})();
