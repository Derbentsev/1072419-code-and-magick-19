'use strict';

var CLOUD_WIDTH = 420; // ширина канваса
var CLOUD_HEIGHT = 270; // высота канваса
var CLOUD_X = 100; // координата левой верхней точки канваса по оси X
var CLOUD_Y = 10; // координата левой верхней точки канваса по оси Y
var GAP = 10; // отступ от края канваса
var FONT_GAP = 15;
var TEXT_WIDTH = 50;
var BAR_HEIGHT = 150; // высота колонки с результатом
var BAR_WIDTH = 40; // ширина колонки с результатом
/* var barWidth = CLOUD_WIDTH - GAP - TEXT_WIDTH - GAP; */

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
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

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 0, 10);
  ctx.fillText('Список результатов:', 0, 30);

  var maxTime = getMaxElement(times);

  /*   for (var i = 0; i < names.length; i++) {
      ctx.fillText(names[i], CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP + (GAP + BAR_HEIGHT) * i);
      ctx.fillRect(CLOUD_X + GAP + TEXT_WIDTH, CLOUD_Y + GAP + (GAP + BAR_HEIGHT) * i, (barWidth * times[i]) / maxTime, BAR_HEIGHT);
    } */

  for (var i = 0; i < names.length; i++) {
    /* ctx.fillText(names[i], CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP + (GAP + BAR_HEIGHT) * i); */
    ctx.fillRect(CLOUD_X + GAP + TEXT_WIDTH, CLOUD_Y + GAP + (GAP + BAR_HEIGHT) * i, (BAR_WIDTH * times[i]) / maxTime, BAR_HEIGHT);
  }
};
