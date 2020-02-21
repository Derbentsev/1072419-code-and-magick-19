'use strict';

(function () {
  window.utilis = {
    getRandomNumber = getRandomNumber
  };

  /**
   * Определяем случайное число, начиная от 0
   * @param {number} max - Максимальное целое число
   * @return {number} Случайное целое число
   */
  var getRandomNumber = function (max) {
    return Math.round(Math.random() * (max - 1));
  };
})();
