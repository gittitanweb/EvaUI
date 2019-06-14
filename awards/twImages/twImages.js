;(function ($) {
    var plugin = {};
    var defaults = {

        // ОБЩИЕ НАСТРОЙКИ
        item_id: false,
        multiple: true,
        no_image: '/uploads/no-photo.png',
        image_remove_link: false,
        image_remove_data: {},
        image_src: '/uploads/products/{{item_id}}/',

        // DOM & HTML
        input_id_file: 'files', // ID шник поля загрузки
        input_name_file: 'file', // NAME поля загрузки

        // Эллементы дизайна
        a_trigger_file_classes: 'tw-btn',
        a_file_text: 'Выбрать фото',
        item_upload_text_default: 'Основное',
        item_upload_text_remove: 'Удалить',
        a_helper_text: 'Выберите необходимые файлы, и нажмите "Открыть"',

        // CallBlack
        getPhotos: function (listing) {}

    };
    $.fn.twImages = function (options) {

        if (this.length == 0)
            return this;

        // support mutltiple elements
        if (this.length > 1) {
            this.each(function () {
                $(this).twImages(options)
            });
            return this;
        }

        var images = {};
        var el = this;
        plugin.el = this;

        var init = function () {
            images.settings = $.extend(defaults, options);
            images.settings.image_src = images.settings.image_src.replace('{{item_id}}', images.settings.item_id);
            images.listing = [];
            setup();
        };

        // Построение плагина
        var setup = function () {
            // Загрузка списка картинок
            el.find('input[type="hidden"]').each(function () {
                images.listing.push({
                    src: $(this).attr('data-src'),
                    upload_name: $(this).attr('data-upload_name'),
                    server_name: $(this).attr('data-server_name'),
                    default: $(this).attr('data-image_default'),
                    size: $(this).attr('data-image_size'),
                    type: $(this).attr('data-image_type'),
                    server_uploads: true
                });
            });
            // Построение контейнера
            bilder_wrapper();
        };

        // Загрузка фоток в массив
        var handleFileSelect = function (evt) {
            var files = evt.target.files;
            var upload_end = false;
            for (var i = 0, f; f = files[i]; i++) {
                if (!f.type.match('image.*')) {
                    continue;
                }
                var reader = new FileReader();
                reader.onload = (function (f) {
                    return function (e) {
                        var math = false;
                        for (var key in images.listing) {
                            var val = images.listing[key];
                            if (escape(f.name) === val.upload_name) {
                                math = true;
                            }
                        }
                        var f_size = (f.size / 1024) / 1024;
                        if (f_size > 4) {
                            showMessage('error', 'Изображение "' + escape(f.name) + '" имеет слишком большой размер. ');
                        } else {
                            if (math !== true) {
                                images.listing.push({
                                    server_name: random() + (function (t) {
                                        if (t === 'image/jpeg' || t === 'image/JPEG')
                                            return '.jpg';
                                        if (t === 'image/png' || t === 'image/PNG')
                                            return '.png';
                                        if (t === 'image/jpg' || t === 'image/JPG')
                                            return '.jpg';
                                        if (t === 'image/gif' || t === 'image/GIF')
                                            return '.gif';
                                    })(f.type),
                                    upload_name: escape(f.name),
                                    default: '0',
                                    type: f.type,
                                    size: f.size.toString(),
                                    server_uploads: false,
                                    src: e.target.result
                                });
                            }
                        }
                    }
                })(f);
                reader.readAsDataURL(f);
                // дождался пока файлы все прокрутятся...
                if (i === (files.length - 1)) {
                    upload_end = true;
                }
            }
            ;
            var endUpload = setInterval(function () {
                if (upload_end == true) {
                    clearInterval(endUpload);
                    // --------------------------
                    multiple_block();
                    resetDefault();

                    setTimeout(function () {
                        renderImages()
                    }, 300);
                }
            }, 1000);
        };

        // Перестройка списка фото
        var renderImages = function () {
            //console.log( 'RENDER!!', images.listing );
            bilder_images();
        };

        // Устанавливает основное фото по умолчанию, если оно не стоит
        var resetDefault = function () {
            var okeyDefault = false;
            for (var key in images.listing) {
                var val = images.listing [key];
                if (val.default == '1') {
                    okeyDefault = true;
                }
            }
            if (okeyDefault === false && images.listing.length > 0) {
                var newPhotoList = [];
                for (var key in images.listing) {
                    var val = images.listing [key];
                    if (key < 1) {
                        val.default = '1';
                    }
                    newPhotoList.push(val);
                }
                images.listing = newPhotoList;
                bilder_images();
            }
        };

        // Удалить фото  ( Нажатие на кнопку )
        var imageRemove = function (image_name) {
            var newPhotoList = [];
            for (var key in images.listing) {
                var val = images.listing [key];
                if (image_name !== val.server_name) {
                    newPhotoList.push(val);
                }
            }
            images.listing = newPhotoList;
            resetDefault();
            setTimeout(function () {
                renderImages();
            }, 250);

            actionImageRemove(image_name);
            images.settings.getPhotos(images.listing);
        };

        // Явное удаление фото
        var actionImageRemove = function (image_name) {
            if (images.settings.image_remove_link !== false) {
                $.ajax({
                    type: "post",
                    url: images.settings.image_remove_link,
                    data: {
                        photo: image_name,
                        path: images.settings.image_src,
                        data: images.settings.image_remove_data
                    }
                });
            }
        }

        // Делает фото основным
        var imageDefault = function (image_name) {
            var newPhotoList = [];
            for (var key in images.listing) {
                var val = images.listing [key];
                if (image_name === val.server_name) {
                    val.default = '1';
                } else {
                    val.default = '0';
                }
                newPhotoList.push(val);
            }
            images.listing = newPhotoList;
            bilder_images();
        };

        // Блокиратор мультизагрузки
        var multiple_block = function () {
            if (images.settings.multiple !== true && images.listing.length > 1) {
                var definedPhoto = false;
                var last = images.listing[ images.listing.length - 1 ];
                var removed = images.listing.slice(0, -1);
                var last = images.listing.slice(-1);
                last[0].default = '1';
                if (removed.length > 0) {
                    for (var key in removed) {
                        var val = removed[key];
                        actionImageRemove(val.server_name);
                    }
                }
                images.listing = last;
            }
        };

        // Вывести сообщение
        var showMessage = function (type, message) {
            alert(message);
        };

        // Получить рандомную строку
        var random = function () {
            var result = '';
            var words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
            var max_position = words.length - 1;
            for (i = 0; i < 5; ++i) {
                position = Math.floor(Math.random() * max_position);
                result = result + words.substring(position, position + 1);
            }
            var a = new Date().getTime();
            var b = Math.floor(Date.now() / 1000);
            return result + b;
        };

        // HTML Контейнер
        var bilder_wrapper = function () {
            el.empty();
            el.html('<div class="twWrapper"></div>');
            images.twWrapper = el.find('div.twWrapper');
            images.twWrapper.html('<div class="twPhotos"></div>');
            images.twPhotos = images.twWrapper.find('div.twPhotos');
            images.twWrapper.append('<div class="twUpload"></div>');
            images.twUpload = images.twWrapper.find('div.twUpload');
            images.twUpload.append('<input type="file" id="' + images.settings.input_id_file + '" name="' + images.settings.input_name_file + '[]" style="display: none;" multiple />');
            images.twUpload.append('<a href="#" class="' + images.settings.a_trigger_file_classes + '" >' + images.settings.a_file_text + '</a>');
            images.twUpload.append('<span class="twHelperText">' + images.settings.a_helper_text + '</span>');
            images.input_file = images.twUpload.find('input[type="file"]');
            images.input_trigger = images.twUpload.find('a');
            images.input_trigger.on('click', function () {
                images.input_file.trigger('click')
            });
            document.getElementById(images.settings.input_id_file).addEventListener('change', handleFileSelect, false);
            renderImages();

        };

        // HTML Картинки
        var bilder_images = function () {
            images.twPhotos.empty()
            if (images.listing.length > 0) {
                for (var key in images.listing) {
                    var image = images.listing[key];
                    var t = '<div class="tw-photo-item">';
                    t += '  <div class="tw-image-block">';
                    t += '      <img src="' + image.src + '">';
                    t += '  </div>';
                    t += '  <div class="tw-photo-tools">';
                    t += '      <a href="#" class="tw-image-default ' + (image.default == '1' ? 'active' : '') + '" data-server_name="' + image.server_name + '" >' + images.settings.item_upload_text_default + '</a>';
                    t += '      <a href="#" class="tw-image-remove" data-server_name="' + image.server_name + '" >' + images.settings.item_upload_text_remove + '</a>';
                    t += '  </div>';
                    t += '</div>';
                    images.twPhotos.append(t);
                    var itemRemove = images.twPhotos.find('.tw-image-remove');
                    itemRemove.off('click');
                    itemRemove.on('click', function () {
                        imageRemove($(this).attr('data-server_name'));
                    });
                    var itemDefault = images.twPhotos.find('.tw-image-default');
                    itemDefault.off('click');
                    itemDefault.on('click', function () {
                        imageDefault($(this).attr('data-server_name'));
                    });
                }
                images.settings.getPhotos(images.listing);
            }
            return true;
        };

        init();
        return this;

    };
})(jQuery);
