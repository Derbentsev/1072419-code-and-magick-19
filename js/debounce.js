'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300;

  /**
   * Устанавливаем задержку перед выполнением функции
   * @param {object} func - Функция, которую будем выполнять после задержки
   * @return {void}
   */
  var setTimeout = function (func) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        func.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.debounce = {
    setTimeout: setTimeout
  };
})();
