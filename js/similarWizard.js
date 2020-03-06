'use strict';

(function () {
  var rankCoefficient = {
    COAT_AND_EYES: 3,
    COAT: 2,
    EYE: 1
  };

  var wizardsArr = [];


  /**
   * Сравниваем два соседних элемента в массиве магов
   * @param {*} wizard1 - Первый элемент
   * @param {*} wizard2 - Второй элемент
   * @return {number} Исходя из этого числа, понимаем, менять ли местами элементы в массиве
   */
  var namesComparator = function (wizard1, wizard2) {
    if (wizard1 > wizard2) {
      return 1;
    } else if (wizard1 < wizard2) {
      return -1;
    } else {
      return 0;
    }
  };

  /**
   * Определяем коэффициент похожести нашего мага на элемент в массиве магов
   * @param {*} wizard - Элемент в массиве магов
   * @return {number} Коэффициент похожести нашего мага на элемент в массиве магов
   */
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.setup.coatColor && wizard.colorEyes === window.setup.eyeColor) {
      rank += rankCoefficient.COAT_AND_EYES;
    } else {
      if (wizard.colorCoat === window.setup.coatColor) {
        rank += rankCoefficient.COAT;
      }
      if (wizard.colorEyes === window.setup.eyeColor) {
        rank += rankCoefficient.EYE;
      }
    }

    return rank;
  };

  /**
   * Сортируем массив волшебников по похожести на нашего мага
   * @param {*} wizards - Неотсортированный список волшебников
   * @return {object} Отсортированный массив волшебников
   */
  var updateWizards = function () {
    if (wizardsArr.length < 1) {
      wizardsArr = window.backend.wizards;
    }

    var sortedWizards = wizardsArr.sort(function (wizard1, wizard2) {
      var rankDiff = getRank(wizard2) - getRank(wizard1);
      if (rankDiff === 0) {
        rankDiff = namesComparator(wizard1.name, wizard2.name);
      }
      return rankDiff;
    });

    window.setup.wizardsAdd(sortedWizards);

    return sortedWizards;
  };


  window.similarWizard = {
    updateWizards: updateWizards
  };
})();
