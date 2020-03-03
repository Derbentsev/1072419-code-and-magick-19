'use strict';

(function () {
  var wizardsArr = [];
  var coatColor;
  var eyeColor;

  /**
   * Определяем коэффициент похожести нашего мага на элемент в массиве магов
   * @param {*} wizard - Элемент в массиве магов
   * @return {number} Коэффициент похожести нашего мага на элемент в массиве магов
   */
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor && wizard.colorEyes === eyeColor) {
      rank += 3;
    } else {
      if (wizard.colorCoat === coatColor) {
        rank += 2;
      }
      if (wizard.colorEyes === eyeColor) {
        rank += 1;
      }
    }

    return rank;
  };

  /**
   * Сортируем массив волшебников по похожести на нашего мага
   * @param {*} wizards - Неотсортированный список волшебников
   * @return {object} Отсортированный массив волшебников
   */
  var updateWizards = function (wizards) {
    if (wizardsArr.length < 1) {
      wizardsArr = wizards;
    }

    var sortedWizards = wizardsArr.sort(function (wizard1, wizard2) {
      var rankDiff = getRank(wizard2) - getRank(wizard1);
      if (rankDiff === 0) {
        rankDiff = namesComparator(wizard1.name, wizard2.name);
      }
      return rankDiff;
    });

    return sortedWizards;
  };
})();
