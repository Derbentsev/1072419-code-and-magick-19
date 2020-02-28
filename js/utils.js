'use strict';

(function () {
  window.utils = {
    getRandomNumber: getRandomNumber
  };

  /**
   * Определяем случайное число, начиная от 0
   * @param {number} max - Максимальное целое число
   * @return {number} Случайное целое число
   */
  function getRandomNumber(max) {
    return Math.round(Math.random() * (max - 1));
  }
})();
