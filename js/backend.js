'use strict';

(function () {
  var SAVE_URL = 'https://js.dump.academy/code-and-magick';
  var LOAD_URL = 'https://js.dump.academy/code-and-magick/data';

  /**
   * Действия при загрузке формы на сервер
   * @param {object} xhr - XMLHttpRequest
   * @param {object} onLoad - Функция, которая запускается при корректной загрузке
   * @param {object} onError - Функция, которая запускается при некорректной загрузке
   * @return {void}
   */
  var onLoadData = function (xhr, onLoad, onError) {
    return function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };
  };

  /**
   * Действия при ошибке при загрузке формы на сервер
   * @param {object} onError - Функция, которая запускается при некорректной загрузке
   * @return {void}
   */
  var onErrorLoadData = function (onError) {
    return function () {
      onError('Произошла ошибка соединения');
    };
  };

  /**
   * Действия при таймауте при загрузке формы на сервер
   * @param {object} xhr - XMLHttpRequest
   * @param {object} onError - Функция, которая запускается при некорректной загрузке
   * @return {void}
   */
  var onTimeoutLoadData = function (xhr, onError) {
    return function () {
      onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
    };
  };

  /**
   * Загрузка данных с сервера
   * @param {object} onLoad - Функция, которая будет вызываться, если данные загружены
   * @param {object} onError - Функция, которая будет вызываться, если возникла ошибка при загрузке
   * @return {void}
   */
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 5000;

    xhr.addEventListener('load', onLoadData(xhr, onLoad, onError));
    xhr.addEventListener('error', onErrorLoadData(onError));
    xhr.addEventListener('timeout', onTimeoutLoadData(xhr, onError));

    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  /**
   * Отправка данных на сервер
   * @param {object} data - Данные формы, которые необходимо отправить
   * @param {object} onLoad - Функция, которая будет вызываться, если данные отправлены
   * @param {object} onError - Функция, которая будет вызываться, если возникла ошибка при загрузке
   * @return {void}
   */
  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', onLoad);
    xhr.addEventListener('error', onErrorLoadData(onError));

    xhr.open('POST', SAVE_URL);
    xhr.send(data);
  };


  window.backend = {
    save: save,
    load: load
  };
})();
