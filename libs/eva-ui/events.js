
// !!! JQUERY
if (typeof jQuery === 'undefined')
{
    throw new Error('Для работы EvaUI_Render, необходимо прежде загрузить библиотеку JQuery');
}

if (typeof READY === 'undefined')
{
    window.READY = {};
}

// !!! JQUERY last version
+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {
    throw new Error('Используйте последнию версию JQuery!!')
  }
}(jQuery);

;(function( $, window ){

    window.events = {}; // Для глобальных событий
    window.events = {

        link: function () {

            $(document).off('click', '*[click]');
            $(document).on('click', '*[click]', function (e) {
                e.preventDefault();
                var name = $(this).attr('click');
                try{
                     eval('window.' + name);
                }
                catch(er){
                    console.log( er );
                }
            });
            $(document).on('click', 'a[href^="#"]', function (e) {
                e.preventDefault();
            });
        },

        unload: function () {
            setTimeout(function () {
                $('body *[unload]').map(function (a, b) {
                    try{
                        eval('window.' + $(b).attr('unload'));
                    }
                    catch(er){
                        console.log( er );
                    }
                });
            }, 1000);
            $(document).off('click', '[unload]');
            $(document).on('click', '[unload]', function () {
                try{
                    eval('window.' + $(this).attr('unload'));
                }
                catch(er){
                    console.log( er );
                }
            });
        },

        form_action: function ()
        {

            $('body' + '*[type="submit"]').prop('disabled', false);

            $('body').off('submit');
            $('body').on('submit', 'form[action!="#"][static!=true]', function (e) {
                e.preventDefault();

                var link = $(this).attr('action') || false;
                var before = $(this).attr('before') || false;
                var requare = $(this).attr('requare') || false;
                var abort = $(this).attr('abort') || false;
                var requare_error = $(this).attr('requare_error') || 'При заполнении формы была допущена ошибка.';
                var success = $(this).attr('success') || false;
                var data_type = $(this).attr('data_type') || 'html';
                var method = ($(this).attr('method') || 'get').toLowerCase();
                var data = (function (m, e) {
                    return (m === 'get') ? e.serialize() : e.serializeArray();
                })(method, $(this));

                var form_next = function (data) {
                    if (method === 'get') {
                        window.helpers._set_url(link + '?' + data);
                        setTimeout(function () {
                            ROUTE.page_get();
                        });
                    } else {
                        window.helpers.preload(true);
                        $.ajax({
                            type: "post",
                            url: link,
                            data: data,
                            dataType: data_type,
                            context: {name: success, before: before, data: data},
                            beforeSend: function () {
                                if (this.before === false) {
                                    return true;
                                } else {
                                    return (eval('window.' + this.before))(this.data);
                                }
                            },
                            success: function (response) {
                                window.helpers.preload(false);
                                if (this.name) {
                                    (eval('window.' + this.name))(response);
                                } else {
                                    if (requare_error != 'false') {
                                        window.helpers.alert('error', requare_error);
                                    } else {
                                        var type = (response['err']) ? (response.err > 0) ? 'error' : 'success' : 'error';
                                        var mess = (response['mess']) ? response.mess : 'Данные формы были успешно отправлены.';
                                        window.helpers.alert(type, mess);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (abort != 'false') {
                                    return (eval('window.' + this.abort))( jqXHR, textStatus, errorThrown );
                                } else {
                                    window.helpers.preload(false);
                                    window.helpers.alert('error', 'Что то пошло не так...');
                                    console.log(jqXHR, textStatus, errorThrown);
                                }
                            }
                        });
                    }
                }

                if (requare !== false) {
                    (eval('window.' + requare))(data, function (status, data_response) {
                        if (status) {
                            form_next(data_response);
                        } else {
                            window.helpers.alert('error', requare_error);
                        }
                    });
                } else {
                    form_next(data);
                }
                
                return false;

            });

        }

    };

    window.events.link();
    window.events.unload();
    window.events.form_action();

    READY.events = true;

})( jQuery, window );
