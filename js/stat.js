'use strict';

(function () {
  var CANVAS_SCORE_WIDTH = 420;
  var CANVAS_SCORE_HEIGHT = 270;
  var CANVAS_SCORE_X = 100;
  var CANVAS_SCORE_Y = 10;
  var CANVAS_SCORE_GAP = 20;
  var COLUMN_GAP = 50;
  var TEXT_HEIGHT = 10;
  var SCORE_HEIGHT = 15;
  var COLUMN_HEIGHT = 150;
  var COLUMN_WIDTH = 40;
  var COLUMN_PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
  var COLUMN_DEFAULT_COLOR = 'black';
  var CANVAS_SCORE_TEXT_1 = 'Ура вы победили!';
  var CANVAS_SCORE_TEXT_1_Y = 30;
  var CANVAS_SCORE_TEXT_2 = 'Список результатов:';
  var CANVAS_SCORE_TEXT_2_Y = 50;
  var CANVAS_SCORE_TEXT_COLOR = '#000';
  var CANVAS_SCORE_TEXT_FONT = '16px PT Mono';
  var CANVAS_SCORE_SHADOW_COLOR = '#fff';
  var CANVAS_SCORE_COLOR = 'rgba(0, 0, 0, 0.7)';
  var CANVAS_SCORE_X_WITH_GAP = CANVAS_SCORE_X + CANVAS_SCORE_GAP;
  var COLUMN_WIDTH_WITH_GAP = COLUMN_WIDTH + COLUMN_GAP;
  var COLUMN_HEIGHT_WITH_GAP = CANVAS_SCORE_HEIGHT - CANVAS_SCORE_GAP;

  /**
   * Рендерит прямоугольную фигуру
   * @param {object} ctx - Канвас
   * @param {number} x - Координата X левой верхней точки канваса
   * @param {number} y - Координата Y левой верхней точки канваса
   * @param {text} color - Цвет канваса
   * @param {number} width - Ширина канваса
   * @param {number} height - Высота канваса
   * @return {void}
   */
  var renderRect = function (ctx, x, y, color, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  };

  /**
   * Подбирает случайный цвет для колонок с результатами
   * @return {string}
   */
  var colorHsl = function () {
    return 'hsl(240, ' + Math.random() * 100 + '%, 50%)';
  };

  /**
   * Выбирает максимальное значение из массива
   * @param {array} arr - Массив значений
   * @return {number}
   */
  var getMaxElement = function (arr) {
    var maxElement = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };

  /**
   * Рендерим оповещающий текст до результатов прохождения
   * @param {object} ctx - Канвас
   * @param {string} text1 - Первая строка текста
   * @param {number} text1X - Координата по оси X первой строки текста
   * @param {number} text1Y - Координата по оси Y первой строки текста
   * @param {string} text2 - Первая строка текста
   * @param {number} text2X - Координата по оси X первой строки текста
   * @param {number} text2Y - Координата по оси Y первой строки текста
   * @return {void}
   */
  var textOnCanvas = function (ctx, text1, text1X, text1Y, text2, text2X, text2Y) {
    ctx.fillStyle = CANVAS_SCORE_TEXT_COLOR;
    ctx.font = CANVAS_SCORE_TEXT_FONT;
    ctx.textBaseline = 'hanging';
    ctx.fillText(text1, text1X, text1Y);
    ctx.fillText(text2, text2X, text2Y);
  };

  /**
   * Рендерим колонки с результатами
   * @param {object} ctx - Канвас
   * @param {string} name - Имя игрока
   * @param {number} i - Текущая строка в массивах
   * @param {array} time - Время игрока
   * @param {number} maxTime - Максимальное время среди всех игроков
   * @return {void}
   */
  var renderColumn = function (ctx, name, i, time, maxTime) {
    ctx.fillStyle = COLUMN_DEFAULT_COLOR;
    textOnCanvas(ctx, name, CANVAS_SCORE_X_WITH_GAP + COLUMN_WIDTH_WITH_GAP * i, COLUMN_HEIGHT_WITH_GAP, Math.round(time), CANVAS_SCORE_X_WITH_GAP + COLUMN_WIDTH_WITH_GAP * i, COLUMN_HEIGHT_WITH_GAP - COLUMN_HEIGHT - TEXT_HEIGHT - SCORE_HEIGHT);
    renderRect(ctx, CANVAS_SCORE_X_WITH_GAP + COLUMN_WIDTH_WITH_GAP * i, COLUMN_HEIGHT_WITH_GAP - TEXT_HEIGHT, name === 'Вы' ? COLUMN_PLAYER_COLOR : colorHsl(), COLUMN_WIDTH, -(COLUMN_HEIGHT * time) / maxTime);
  };

  /**
   * Рендерим наполнение канваса
   * @param {object} ctx - Канвас
   * @return {void}
   */
  var fillCanvas = function (ctx) {
    renderRect(ctx, CANVAS_SCORE_X_WITH_GAP, CANVAS_SCORE_Y + CANVAS_SCORE_GAP, CANVAS_SCORE_COLOR, CANVAS_SCORE_WIDTH, CANVAS_SCORE_HEIGHT);
    renderRect(ctx, CANVAS_SCORE_X, CANVAS_SCORE_Y, CANVAS_SCORE_SHADOW_COLOR, CANVAS_SCORE_WIDTH, CANVAS_SCORE_HEIGHT);
    textOnCanvas(ctx, CANVAS_SCORE_TEXT_1, CANVAS_SCORE_X_WITH_GAP, CANVAS_SCORE_TEXT_1_Y, CANVAS_SCORE_TEXT_2, CANVAS_SCORE_X_WITH_GAP, CANVAS_SCORE_TEXT_2_Y);
  };

  /**
   * Отрисовывает окно статистики и заполняет результаты по каждому игроку
   * @param {object} ctx - Поле для отрисовки результатов, канвас
   * @param {array} names - Массив с именами игроков
   * @param {array} times - Массив с результатами игроков
   * @return {void}
   */
  window.renderStatistics = function (ctx, names, times) {
    fillCanvas(ctx);

    var maxTime = getMaxElement(times);

    names.forEach(function (name, i) {
      renderColumn(ctx, name, i, times[i], maxTime);
    });
  };
})();
