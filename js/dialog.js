'use strict';

(function () {
  var setupWindow = window.setup.setupWindow;
  var avatarOnPopup = setupWindow.querySelector('.upload');

  var isDragged = false;

  var startCoords;

function onMouseMove(coords) {
    return function mouseMove (moveEvt) {
      moveEvt.preventDefault();
      isDragged = true;

      var shift = {
        x: coords.x - moveEvt.clientX,
        y: coords.y - moveEvt.clientY
      };

      coords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupWindow.style.top = (setupWindow.offsetTop - shift.y) + 'px';
      setupWindow.style.left = (setupWindow.offsetLeft - shift.x) + 'px';
    };
  }

  var onClickPreventDefault = function (clickEvt) {
    clickEvt.preventDefault();
    avatarOnPopup.removeEventListener('click', onClickPreventDefault);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove(startCoords));
    document.removeEventListener('mouseup', onMouseUp);

    if (isDragged) {
      avatarOnPopup.addEventListener('click', onClickPreventDefault);
    }
  };

  avatarOnPopup.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', onMouseMove(startCoords));
    document.addEventListener('mouseup', onMouseUp);
  });
})();
