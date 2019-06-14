/*!
 * FormBack script
 */


if (typeof jQuery === 'undefined')
{
  throw new Error('Для работы плагина, необходимо прежде загрузить библиотеку JQuery');
}

+function ($)
{
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {
    throw new Error('Используйте последнию версию JQuery!!')
  }
}(jQuery);

;(function( $, window )
{

	var defaults = {
        plugins : ['select', 'input_text', 'input_password', 'input_numeric']
	};

	$.fn.FormBack = function( options )
    {

        if( this.length > 1 )
        {
            throw new Error('FormBack, необходимо вызвать лишь единожды, не чаще!');
            return false;
        }

		var THIS = this;
        var Fm = {};

        // Готовность модулей к сотрудничеству
        window.READY = {};

		// Иннициализация Евы
		var init = function()
        {
			Fm.sett = $.extend( defaults, options );
            setup();
		};

        // Установка событий
        var setup = function()
        {

            if( Fm.sett.plugins.indexOf( 'select' ) != -1 )
            {
                mod_select();
                READY.select = true;
            }

            if( Fm.sett.plugins.indexOf( 'input_text' ) != -1 )
            {
                mod_input_text();
                READY.input_text = true;
            }

            if( Fm.sett.plugins.indexOf( 'input_password' ) != -1 )
            {
                mod_input_password();
                READY.input_password = true;
            }

            if( Fm.sett.plugins.indexOf( 'input_numeric' ) != -1 )
            {
                mod_input_numeric();
                READY.input_numeric = true;
            }

        };

        // Работа с селектами на странице
        var mod_select = function()
        {
            $('select').map(function( i, e ){
                $( e ).wrap( '<div class="fb_select"></div>' );
            });
        }

        // Работа с селектами на странице
        var mod_input_password = function()
        {
            $('input[type=password]').map(function( i, e ){
                $( e ).wrap( '<div class="fb_input_password"></div>' );
            });
        }

        // Работа с селектами на странице
        var mod_input_text = function()
        {
            $('input[type=text]').map(function( i, e ){
                $( e ).wrap( '<div class="fb_input_text"></div>' );
            });
        }

        // Работа с селектами на странице
        var mod_input_numeric = function()
        {
            $('input[type=numeric]').map(function( i, e ){
                $( e ).wrap( '<div class="fb_input_numeric"></div>' );
            });
        }

    	init();
    	return this;

    };

}( jQuery, window ));
