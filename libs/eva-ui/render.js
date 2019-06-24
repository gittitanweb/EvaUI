
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

        debug : false,

        bodyPrefix : '.eva ',

        // Правила для отслеживания
        rules :
        {
            px : { // Название класса ( Без тире и точеек )
                action : 'font-size: ', // Правило
                value : true, // Значение строка / true ( Заменить за значение )
                prefix : 'px', // Измерение
                end : ' !important;', // Концовка
            },
            pa : {
                action : 'padding: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            pt : {
                action : 'padding-top: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            pb : {
                action : 'padding-bottom: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            pl : {
                action : 'padding-left: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            pr : {
                action : 'padding-right: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            ma : {
                action : 'margin: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            mt : {
                action : 'margin-top: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            mb : {
                action : 'margin-bottom: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            ml : {
                action : 'margin-left: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            mr : {
                action : 'margin-right: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            mt_ : {
                action : 'margin-top: -',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            mb_ : {
                action : 'margin-bottom: -',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            ml_ : {
                action : 'margin-left: -',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            mr_ : {
                action : 'margin-right: -',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            t : {
                action : 'top: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            b : {
                action : 'bottom: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            l : {
                action : 'left: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            r : {
                action : 'right: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            t_ : {
                action : 'top: -',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            b_ : {
                action : 'bottom: -',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            l_ : {
                action : 'left: -',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            r_ : {
                action : 'right: -',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            btrr : {
                action : 'border-top-right-radius: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            btlr : {
                action : 'border-top-left-radius: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            bblr : {
                action : 'border-bottom-left-radius: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            bbrr : {
                action : 'border-bottom-right-radius: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            bw : {
                action : 'border-width: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            btw : {
                action : 'border-top-width: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            bbw : {
                action : 'border-bottom-width: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            blw : {
                action : 'border-left-width: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            brw : {
                action : 'border-right-width: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            br : {
                action : 'border-radius: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            btr : {
                action : 'border-top-radius: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            bbr : {
                action : 'border-bottom-radius: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            blr : {
                action : 'border-left-radius: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            brr : {
                action : 'border-right-radius: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            w : {
                action : 'width: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            miw : {
                action : 'min-width: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            maw : {
                action : 'max-width: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            h : {
                action : 'height: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            mih : {
                action : 'min-height: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            mah : {
                action : 'max-height: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            lh : {
                action : 'line-height: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            ls : {
                action : 'letter-spacing: ',
                value : true,
                prefix : 'px',
                end : ' !important;',
            },
            zi : {
                action : 'z-index: ',
                value : true,
                prefix : '',
                end : ' !important;',
            },
            c_hex : {
                action : 'color: #',
                value : false,
                prefix : '',
                end : ' !important;',
            },
            bg_hex : {
                action : 'background-color: #',
                value : false,
                prefix : '',
                end : ' !important;',
            },
            rot : {
                action : 'transform: rotate(',
                value : true,
                prefix : 'deg)',
                end : ' !important;',
            },
            rot_ : {
                action : 'transform: rotate(-',
                value : true,
                prefix : 'deg)',
                end : ' !important;',
            },
            opac : {
                action : 'opacity: 0.',
                value : true,
                prefix : '',
                end : ' !important;',
            }
        },

        // Сформированные правила
        rendered :
        {
            all : {},
            xs : {},
            sm : {},
            md : {},
            lg : {},
            xl : {}
        },

        // Адаптивная сетка
        responsive :
        {
            '-xs-' : ['xs','screen and (max-width:544px)'],
            '-sm-' : ['sm','(min-width:544px)'],
            '-md-' : ['md','(min-width:768px)'],
            '-lg-' : ['lg','(min-width:992px)'],
            '-xl-' : ['xl','(min-width:1200px)']
        },

        // Сделать что то после формирования
        onload : false

    };

    $.fn.EvaUI_Render = function( options )
    {

        if( this.length > 1 )
        {
            throw new Error('EvaUI_Render, необходимо вызвать лишь единожды, не чаще!');
            return false;
        }

        var THIS = this;
        var Eva_Render = {};

        // Иннициализация Евы
        var init = function()
        {

            // +tag style
            $( 'head' ).append('<style id="eva"></style>');
            $( 'body' ).addClass('eva');

            // Настройки
            Eva_Render.options = $.extend( true, defaults, options );

            // Сигнал о подключении режима обслуживания
            if( is_debug() || Eva_Render.options.debug === true )
            {
                debug_mode();
            }

            // Установка свойств
            setup();

            // Сигнал о готовности сотрудничать
            READY.render = true;

        };

        // Режим разработки?
        var is_debug = function()
        {
            return (((window.location.search).replace('?', '').split('&')).indexOf("debug") > -1);
        };

        // Проверить наличие
        var _in_arr = function( value, values )
        {
            var value = value.toString();
            var math = false;
            for (var k in values)
            {
                var v = values[k];
                if( v.toString() === value )
                {
                    math = true;
                    break;
                }
            }
            return math
        };

        // Найти в строке подстроку и вернуть остаток или false
        var _fsubparse = function( find, parent, item )
        {
            var back = false,
                find = ($.trim( find.toLowerCase() )).toString(),
                parent = ($.trim( parent.toLowerCase() )).toString();

            back = ( parent.indexOf( find.toString() ) == 0 ) ? parent.substr( find.length ) : back;

            // Исключение случайных совпадений
            var math_1 = false;
            var math_10 = ( back !== false && back[0] != '-' ) ? false : true;
            if( item.value !== false )
            {
                var math_11 = ( back !== false && $.isNumeric( back[1] ) !== true ) ? false : true;
            }
            else
            {
                var math_11 = true;
            }
            if( math_10 === true && math_11 === false )
            {
                math_1 = true;
            }

            if( item.value !== false )
            {
                var math_2 = ( back !== false && $.isNumeric( back[0] ) !== true ) ? false : true;
            }
            else
            {
                var math_2 = true;
            }

            if( math_1 === false && math_2 === false )
            {
                back = false;
            }

            return back;
        };

        // Разпарсить правила и собрать обьект для парсинга
        var _get_classes = function( classes )
        {

            //var classes = string.split(' ');

            for (var key in classes)
            {
                var val = classes [key];

                for (var k1 in Eva_Render.options.rules )
                {
                    var item = Eva_Render.options.rules [k1];

                    var value = _fsubparse( k1, val, item );
                    var responsive = 'all';

                    if( value !== false )
                    {
                        for ( var resp in Eva_Render.options.responsive )
                        {
                            var respVal = Eva_Render.options.responsive [resp];
                            var value2 = _fsubparse( resp, value, item );
                            if( value2 !== false )
                            {
                                responsive = respVal[0];
                                value = value2;
                                break;
                            }
                        }

                        if( Eva_Render.options.rendered[ responsive ][ k1 ] === undefined )
                        {
                            Eva_Render.options.rendered[ responsive ][ k1 ] = {
                                option : item,
                                index : k1,
                                values : []
                            };
                        }

                        if( !_in_arr( value, Eva_Render.options.rendered[ responsive ][ k1 ].values) )
                        {
                            Eva_Render.options.rendered[ responsive ][ k1 ].values.push( value );
                        }

                    }

               }
            }

            return true;
        };

        // Сбор необходимых свойств со всей страницы
        var parse_page = function( callback )
        {

            var callback = callback || false;
            var _all = Object.keys(Eva_Render.options.rules).length, _index = 0;

            var elms2 = [];
            for (var e_cl in Eva_Render.options.rules )
            {
                var elms = $('[class *="'+e_cl+'"]');
                elms.map(function( i, e ){
                    var t = $( e ).attr('class');
                    var classes = t.split(' ');
                    for( var ckey in classes)
                    {
                        var clas = classes[ckey];
                        if( clas.length > 1 )
                        {
                            elms2.push( clas );
                        }
                    }
                });
                _index++;
            }

            if( callback !== false )
            {
                // var e_callback = setInterval(function(){
                //     if( _all == _index )
                //     {

                        var arr = elms2.filter((x, i, a) => a.indexOf(x) == i);
                        _get_classes( arr );

                        // clearInterval( e_callback );

                        callback( true );
            //
            //         }
            //     }, 20);
            }

            return true;
        };

        // Сформировать EvaUI
        var render_eva = function()
        {

            var t = "\n\n";

            // all
            for ( var resp2 in Eva_Render.options.rendered['all'] )
            {
                var v2 = Eva_Render.options.rendered['all'][ resp2 ];
                for ( var k3 in v2.values )
                {
                    var v3 = v2.values[ k3 ];
                    t += [ Eva_Render.options.bodyPrefix + '.' + v2.index + v3, '{ ', v2.option.action + v3 + v2.option.prefix, v2.option.end, ' }' ].join('') + "\n";
                }
            }
            t += "\n\n";

            for ( var resp in Eva_Render.options.responsive )
            {
                var respVal = Eva_Render.options.responsive [resp];
                t += '@media ' + respVal[1] + "\n" + '{ ' + "\n";
                    for ( var resp2 in Eva_Render.options.rendered[ respVal[0] ] )
                    {
                        var v2 = Eva_Render.options.rendered[ respVal[0] ][ resp2 ];
                        for ( var k3 in v2.values )
                        {
                            var v3 = v2.values[ k3 ];
                            t += "\t" + [ Eva_Render.options.bodyPrefix + '.' + v2.index + resp + v3, '{ ', v2.option.action + v3 + v2.option.prefix, v2.option.end, ' }' ].join('') + "\n";
                        }
                    }
                t += '}' + "\n\n";
            }

            return t;

        };

        // Рендеринг
        var setup = function ( callback )
        {

            var callback = callback || false;

            // Сбор необходимых свойств со всей страницы
            parse_page(function(){

                // Получение всех свойств
                var style = render_eva();

                // Запись/Перезапись в стили браузера
                $('style#eva').html( style );

                // Обратная связь
                if( callback !== false )
                {
                    callback();
                }else if( Eva_Render.options.onload !== false )
                {
                    Eva_Render.options.onload();
                }

            });
        };

        // Режим разработки
        var debug_mode = function()
        {

            // Кнопка перезапуска
            $("body").append('<a class="btn zi9999 btn-primary btn-sm px15 br3 pos-fixed b10 l10 c-white px15" data-role="eva-reload"><i class="fa fa-refresh"></i></a>')

            // Что то изменилось в древе...
            $("body a[data-role=eva-reload]").on("click", function (e) {

                var elm_i = $(this).find('i');
                    elm_i.addClass('fa-spin');

                // Перерендерить классы евы
                setup(function(){
                    setTimeout(function(){
                        elm_i.removeClass('fa-spin');
                    },300);
                });

            });

            $('body a[data-role=eva-reload]').append('<div class="bg-white pa2 pos-fixed zi9999 b10 l45 pt5 pb5 pl7 pr7 br2"><span class="px12 mb0"><span class="hidden-sm-up color-inherit">XS</span><span class="hidden-md-up hidden-xs-down">SM</span><span class="hidden-lg-up hidden-sm-down">MD</span><span class="hidden-xl-up hidden-md-down">LG</span><span class="hidden-lg-down">XL</span></span></div>');

        };

        init();
        return this;

    };

})( jQuery, window );
