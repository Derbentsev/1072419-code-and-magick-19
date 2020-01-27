'use strict';

var CANVAS_SCORE_WIDTH = 420;
var CANVAS_SCORE_HEIGHT = 270;
var CANVAS_SCORE_X = 100;
var CANVAS_SCORE_Y = 10;
var CANVAS_SCORE_GAP = 20;
var COLUMN_GAP = 50;
var TEXT_HEIGHT = 10;
var SCORE_HEIGHT = 15;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
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

/**
 * Создаем прямоугольник-канвас
 *
 * @param {canvas} ctx - Канвас
 * @param {number} x - Координата X левой верхней точки канваса
 * @param {number} y - Координата Y левой верхней точки канваса
 * @param {text} color - Цвет канваса
 * @param {number} width - Ширина канваса
 * @param {number} height - Высота канваса
 */
var renderCloud = function (ctx, x, y, color, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var colorHsl = function (hue, saturation, lightness) {
  return 'hsl(' + hue + ',' + Math.random() * saturation + '%' + ',' + lightness + '%' + ')';
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var textOnCanvas = function (ctx, text1, text1X, text1Y, text2, text2X, text2Y) {
  ctx.fillText(text1, text1X, text1Y);
  ctx.fillText(text2, text2X, text2Y);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CANVAS_SCORE_X_WITH_GAP, CANVAS_SCORE_Y + CANVAS_SCORE_GAP, CANVAS_SCORE_COLOR, CANVAS_SCORE_WIDTH, CANVAS_SCORE_HEIGHT);
  renderCloud(ctx, CANVAS_SCORE_X, CANVAS_SCORE_Y, CANVAS_SCORE_SHADOW_COLOR, CANVAS_SCORE_WIDTH, CANVAS_SCORE_HEIGHT);

  ctx.fillStyle = CANVAS_SCORE_TEXT_COLOR;
  ctx.font = CANVAS_SCORE_TEXT_FONT;
  ctx.textBaseline = 'hanging';
  textOnCanvas(ctx, CANVAS_SCORE_TEXT_1, CANVAS_SCORE_X_WITH_GAP, CANVAS_SCORE_TEXT_1_Y, CANVAS_SCORE_TEXT_2, CANVAS_SCORE_X_WITH_GAP, CANVAS_SCORE_TEXT_2_Y);

  var maxTime = getMaxElement(times);

  names.forEach(function (name, i) {
    ctx.fillStyle = COLUMN_DEFAULT_COLOR;
    textOnCanvas(ctx, name, CANVAS_SCORE_X_WITH_GAP + (BAR_WIDTH + COLUMN_GAP) * i, CANVAS_SCORE_HEIGHT - CANVAS_SCORE_GAP, Math.round(times[i]), CANVAS_SCORE_X_WITH_GAP + (BAR_WIDTH + COLUMN_GAP) * i, CANVAS_SCORE_HEIGHT - BAR_HEIGHT - CANVAS_SCORE_GAP - TEXT_HEIGHT - SCORE_HEIGHT);
    renderCloud(ctx, CANVAS_SCORE_X_WITH_GAP + (BAR_WIDTH + COLUMN_GAP) * i, CANVAS_SCORE_HEIGHT - CANVAS_SCORE_GAP - TEXT_HEIGHT, name === 'Вы' ? COLUMN_PLAYER_COLOR : colorHsl(240, 100, 50), BAR_WIDTH, -(BAR_HEIGHT * times[i]) / maxTime);
  });
};
