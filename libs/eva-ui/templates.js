
// !!! JQUERY
if (typeof jQuery === 'undefined')
{
    throw new Error('Для работы EvaTemplates, необходимо прежде загрузить библиотеку JQuery');
}

if ( typeof READY === 'undefined' )
{
    window.READY = {};
}

if ( typeof MEM === 'undefined' )
{
    window.MEM = [];
}

// !!! JQUERY last version
+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {
    throw new Error('Используйте последнию версию JQuery!!')
  }
}(jQuery);

;(function( $, window ){

	var defaults = {
        // Отгрузка каркасов
        getTplDownload : '/helper/get_tpl_data'
	};

    $.fn.EvaTemplates = function( options ){

        if( this.length > 1 ){
            throw new Error('EvaUI, необходимо вызвать лишь единожды, не чаще!');
            return false;
        }

		var THIS = this;

        var props = $.extend( defaults, options );

        window.TPL = false; // Помощьник для работы с шаблонизатором

        window.MEM['TPL'] = { tpl_list : [] };

        // Инициализация объекта
        var tpl_init = function()
        {
            window.TPL = {

                GET_TPL: function (_NAME_, _DATA_, _RESPONSE_)
                {

                    var _name_ = _NAME_ || false;
                    var _data_ = _DATA_ || false;
                    var RESPONSE = _RESPONSE_ || false;

                    if (_name_) {
                        var patt = window.helpers.in_array(_name_, MEM.TPL.tpl_list, 'name', true);
                        if (patt === false) {
                            $.ajax({
                                type: "post",
                                url: props.getTplDownload,
                                data: {
                                    tpl_name: _name_
                                },
                                async: true,
                                context: {
                                    name: _name_
                                },
                                success: function ( response ) {
                                    var save = {
                                        name: _name_,
                                        modify: window.helpers._get_date(),
                                        rend: response
                                    };
                                    MEM.TPL.tpl_list.push(save);
                                    var html = TPL.TPL_TRANSFORM(response, _data_);
                                    if (RESPONSE)  RESPONSE(html);

                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    window.helpers.alert('error', ' Ошибка сервера. ');
                                }
                            });

                        } else {
                            var html = TPL.TPL_TRANSFORM( patt.rend, _data_ );
                            if (RESPONSE)  RESPONSE(html);
                        }
                    }

                },

                TPL_TRANSFORM: function ( tpl_name, array_data, completted )
                {

                    var string = tpl_name || false;
                    var data = array_data || {};
                    var completted = completted || false;

                    var return_html = '';

                    if (string.length > 0) {
                        var template = twig({
                            data: string
                        });
                        data.GLOBAL = window.GLOBAL;
                        var return_html = template.render(data);
                    }
                    if (completted) {
                        completted(return_html);
                    } else {
                        return return_html;
                    }
                }

            };

            // Сигнал о готовности сотрудничать
            READY.tpl = true;

        };

        var e = setInterval(function () {
    		if( READY.helpers !== false )
            {
                clearInterval(e);
                tpl_init();
            }
        }, 10);

        setTimeout(function(){
            if( READY.helpers !== false )
            {
                console.info('EvaTemplates похоже не смогл дождаться инициализации необходимого компонента HELPERS ;(');
            }
        }, 10000);

    };

})( jQuery, window );
