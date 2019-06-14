
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

	var defaults = {
        // Конфигурация сайта
        urlGetConfig : '/helper/getConfigurations',
        // Языковые настройки сайта
        urlGetLang : '/helper/getLanguageSettings',
	};

    $.fn.EvaConfig = function( options ){

        if( this.length > 1 ){
            throw new Error('EvaUI, необходимо вызвать лишь единожды, не чаще!');
            return false;
        }

		var THIS = this;

        // Суперглобальный объект
        window.GLOBAL = {

            CONFIG : {}, // Параметры конфигурации сайта

            LANG : {}, // Языковые настройки

            USER : {}, // Данные авторизационного пользовтеля

            URL : window.location.origin,

            config_libs_path : '',
            config_scripts_path : '',
            config_styles_path : '',
            config_images_path : '',
            config_views_path : '',
            threme_folders : ''

        };

        var props = $.extend( defaults, options );

        window.configurations = {}; // Для глобальных событий
        window.configurations = {

            getConfig : function()
            {
                if( !sessionStorage.getItem('config') )
                {
                    return false;
                }else if( sessionStorage.getItem('config') )
                {
                    var _config = sessionStorage.getItem('config');
                    window.GLOBAL.CONFIG = $.parseJSON( _config );
                    return true;
                }
            },

            uploadConfig : function()
            {
                $.get( props.urlGetConfig , function( config ) {
                    window.GLOBAL.CONFIG = config;
                        window.GLOBAL.config_libs_path = config.config_libs_path;
                        window.GLOBAL.config_scripts_path = config.config_scripts_path;
                        window.GLOBAL.config_styles_path = config.config_styles_path;
                        window.GLOBAL.config_images_path = config.config_images_path,
                        window.GLOBAL.config_views_path = config.config_views_path;
                        window.GLOBAL.threme_folders = config.threme_folders;
                    sessionStorage.setItem('config', window.helpers._convert_value(config));
                    return true;
                }, "json");
            },

            getLang : function()
            {
                if( !sessionStorage.getItem('lang') )
                {
                    return false;
                }
                else if( sessionStorage.getItem('lang') )
                {
                    var _config = sessionStorage.getItem('lang');
                    window.GLOBAL.LANG = $.parseJSON( _config );
                    return true;
                }
            },

            uploadLang : function()
            {
                $.get( props.urlGetLang , function( response )
                {
                    window.GLOBAL.LANG = response;
                    sessionStorage.setItem('lang', window.helpers._convert_value(response));
                    return true;
                }, "json");
            }

        };

        READY.configurations = true;

    };

})( jQuery, window );
