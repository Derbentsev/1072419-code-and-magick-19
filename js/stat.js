'use strict';

var CLOUD_WIDTH = 420; // ширина канваса
var CLOUD_HEIGHT = 270; // высота канваса
var CLOUD_X = 100; // координата левой верхней точки канваса по оси X
var CLOUD_Y = 10; // координата левой верхней точки канваса по оси Y
var GAP = 20; // отступ от края канваса
var COLUMN_GAP = 50; // расстояние между колонками
var TEXT_HEIGHT = 10; //высота имени
var SCORE_HEIGHT = 15; //высота цифр-результатов
var BAR_HEIGHT = 150; // высота колонки с результатом
var BAR_WIDTH = 40; // ширина колонки с результатом

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
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, 30);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, 50);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = 'black';
    ctx.fillText(names[i], CLOUD_X + GAP + (BAR_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + (BAR_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - BAR_HEIGHT - GAP - TEXT_HEIGHT - SCORE_HEIGHT);
    ctx.fillStyle = names[i] == 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + Math.random() * 100 + '%, 50%)';
    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - GAP - TEXT_HEIGHT, BAR_WIDTH, -(BAR_HEIGHT * times[i]) / maxTime);
  }
};
