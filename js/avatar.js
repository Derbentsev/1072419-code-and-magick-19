'use strict';

(function () {
  var FILES_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var configListener = {
    once: true
  };

  var fileChooser = document.querySelector('.upload input[type=file]');
  var avatar = document.querySelector('.setup-user-pic');


  /**
   * Меняем аватарку на выбранную, если она соответствует заданному формату
   * @return {void}
   */
  var onAvatarChange = function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILES_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatar.src = reader.result;
      }, configListener);

      reader.readAsDataURL(file);
    }
  };

  /**
   * Добавляем обработчик события на изменения аватара
   * @return {void}
   */
  var addAvatarListener = function () {
    fileChooser.addEventListener('change', onAvatarChange);
  };

  /**
   * Удаляем обработчик события на изменения аватара
   * @return {void}
   */
  var removeAvatarListener = function () {
    fileChooser.removeEventListener('change', onAvatarChange);
  };


  window.avatar = {
    addAvatarListener: addAvatarListener,
    removeAvatarListener: removeAvatarListener
  };
})();
