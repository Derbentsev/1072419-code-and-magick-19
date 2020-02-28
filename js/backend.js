'use strict';

(function () {
  var SUCCESS_STATUS = 200;
  var TIMEOUT = 5000;
  var RESPONSE_TYPE = 'json';
  var ERROR_MESSAGE = 'Произошла ошибка соединения';
  var TIMEOUT_MESSAGE = 'Запрос не успел выполнится за ';
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
      if (xhr.status === SUCCESS_STATUS) {
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
      onError(ERROR_MESSAGE);
    };
  };

  var createTimeoutMessage = function (xhr) {
    return TIMEOUT_MESSAGE + xhr.timeout + 'мс';
  };

  /**
   * Действия при таймауте при загрузке формы на сервер
   * @param {object} xhr - XMLHttpRequest
   * @param {object} onError - Функция, которая запускается при некорректной загрузке
   * @return {void}
   */
  var onTimeoutLoadData = function (xhr, onError) {
    return function () {
      onError(createTimeoutMessage(xhr));
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
    xhr.responseType = RESPONSE_TYPE;
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', onLoadData(xhr, onLoad, onError), {once: true});
    xhr.addEventListener('error', onErrorLoadData(onError), {once: true});
    xhr.addEventListener('timeout', onTimeoutLoadData(xhr, onError), {once: true});

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
    xhr.responseType = RESPONSE_TYPE;

    xhr.addEventListener('load', onLoad, {once: true});
    xhr.addEventListener('error', onErrorLoadData(onError), {once: true});

    xhr.open('POST', SAVE_URL);
    xhr.send(data);
  };


  window.backend = {
    save: save,
    load: load
  };
})();
