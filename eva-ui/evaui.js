/*!
 * EvaUI v1.0.0
 */

 
if (typeof jQuery === 'undefined') {
  throw new Error('Для работы EvaUI, необходимо прежде загрузить библиотеку JQuery');
}

+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {
    throw new Error('Используйте последнию версию JQuery!!')
  }
}(jQuery);

if (typeof Twig === 'undefined') {
  throw new Error('Для работы EvaUI, необходимо прежде загрузить библиотеку Twig');
}

;(function( $, window ){
    
	var defaults = {    
        // Отгрузка каркасов
        getTplDownload : '/helper/get_tpl_data',        
        // Конфигурация сайта
        urlGetConfig : '/helper/getConfigurations',        
        // Языковые настройки сайта
        urlGetLang : '/helper/getLanguageSettings',        
        // Избранное :: Еллемент для окраски
        dom_favoritesIcon : '.event-favorites-btn',        
        // Избранное :: Еллемент для вывода кол-ва эллементов в избранном
        dom_fvrCount : '.event-favorites-count',        
        // Избранное :: Еллемент для вывода кол-ва эллементов в избранном( Если ноль )
        dom_fvrCount_empty : '0',        
        // Корзина :: Еллемент для вывода кол-ва наименований
        dom_cartCount : '.countShiping',        
        // Корзина :: Еллемент для вывода кол-ва наименований( Если ноль )
        dom_cartCount_empty : '0',        
        // Корзина :: Еллемент для вывода кол-ва товаров
        dom_cartCountProducts : false,        
        // Корзина :: Еллемент для вывода кол-ва товаров( Если ноль )
        dom_cartCountProducts_empty : '0',        
        // Корзина :: Еллемент для вывода общей стоимости
        dom_cartAllPrice : false,        
        // Корзина :: Еллемент для вывода общей стоимости( Если ноль )
        dom_cartAllPrice_empty : '',
        
        // Что сделать после того как товар был добавлен в корзину
        callback_cart_added : function( listing ){
            helpers.alert('success', 'Вы успешно обновили содержимое корзины!');
            CART.header_update();
        },
        
        // Что сделать после того как товар был удалён из корзины
        callback_cart_removed : function( listing ){
            helpers.alert('success', 'Вы успешно обновили содержимое корзины!');
            CART.header_update();
        },
        
        // Нужный функционал
        plugins : ['events', 'configurations', 'tpl', 'cart', 'favorites'],
        
        render_css : true,
        render_css_setting : {
            
            // Настройки файла стилей
            params : {
                all : '1',
                param : []
            },
            
            // Адаптивная сетка
            responsive : [
                { w : '',       s : 'all'},
                { w : '-xs-',   s : 'screen and (max-width:544px)'},
                { w : '-sm-',   s : '(min-width:544px)'},
                { w : '-md-',   s : '(min-width:768px)'},
                { w : '-lg-',   s : '(min-width:992px)'},
                { w : '-xl-',   s : '(min-width:1200px)'}
            ],
            
            // Настройка классов
            classes : [            
                { name : 'px',    action : 'font-size: ',       min : 8, max : 70,      step_one_max : 1,     step_value : 1,   step_size : 1  },    
                { name : 'h',     action : 'height: ',          min : 0, max : 900,     step_one_max : 30,    step_value : 1,   step_size : 10 },
                { name : 'w',     action : 'width: ',           min : 0, max : 1200,    step_one_max : 30,    step_value : 1,   step_size : 10 },
            
                { name : 'mih',   action : 'min-height: ',      min : 0, max : 900,     step_one_max : 10,    step_value : 1,   step_size : 10 },
                { name : 'miw',   action : 'min-width: ',       min : 0, max : 1200,    step_one_max : 10,    step_value : 1,   step_size : 10 },
            
                { name : 'mah',   action : 'max-height: ',      min : 0, max : 900,     step_one_max : 10,    step_value : 1,   step_size : 10 },
                { name : 'maw',   action : 'max-width: ',       min : 0, max : 1200,    step_one_max : 10,    step_value : 1,   step_size : 10 },
                
                { name : 'ma',    action : 'margin: ',          min : 0, max : 50,      step_one_max : 30,    step_value : 1,   step_size : 10 },
                { name : 'mt',    action : 'margin-top: ',      min : 0, max : 50,      step_one_max : 30,    step_value : 1,   step_size : 10 },
                { name : 'mb',    action : 'margin-bottom: ',   min : 0, max : 50,      step_one_max : 30,    step_value : 1,   step_size : 10 },
                { name : 'ml',    action : 'margin-left: ',     min : 0, max : 50,      step_one_max : 30,    step_value : 1,   step_size : 10 },
                { name : 'mr',    action : 'margin-right: ',    min : 0, max : 50,      step_one_max : 30,    step_value : 1,   step_size : 10 },
            
                { name : 'pa',    action : 'padding: ',         min : 0, max : 50,      step_one_max : 30,    step_value : 1,   step_size : 10 },
                { name : 'pt',    action : 'padding-top: ',     min : 0, max : 50,      step_one_max : 30,    step_value : 1,   step_size : 10 },
                { name : 'pb',    action : 'padding-bottom: ',  min : 0, max : 50,      step_one_max : 30,    step_value : 1,   step_size : 10 },
                { name : 'pl',    action : 'padding-left: ',    min : 0, max : 50,      step_one_max : 30,    step_value : 1,   step_size : 10 },
                { name : 'pr',    action : 'padding-right: ',   min : 0, max : 50,      step_one_max : 30,    step_value : 1,   step_size : 10 },
                
                { name : 'lh',    action : 'line-height: ',     min : 0, max : 50,      step_one_max : 30,    step_value : 1,   step_size : 10 }                
            ]
            
        }
        
	};   
    
	$.fn.EvaUI = function( options ){	
        
        if( this.length > 1 ){
            throw new Error('EvaUI, необходимо вызвать лишь единожды, не чаще!');
            return false;	
        }

		var THIS = this;
        var Eva = {};
                
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
        
        // Родительский эллемент для AJAX манипуляций
        window.DOM = {
            parent : ' body '
        };
        
        // Для установки региональных событий
        window.Ev = {}; 
        
        // Обьект для хранения промежуточных данных
        window.MEM = {}; 
                    
        // Готовность модулей к сотрудничеству
        window.READY = {
            helpers : false,
            cart : false,
            events : false,
            favorites : false,
            tpl : false,
            configurations : false
        };
        
		// Иннициализация Евы
		var init = function(){ 
			Eva.sett = $.extend( defaults, options );
            setup();
            
            if( Eva.sett.render_css !== false ){
                render_css();
            }
            
		};	
        
        // Установка событий
        var setup = function(){
            
            mod_helpers();
            READY.helpers = true;
            
            if( Eva.sett.plugins.indexOf( 'events' ) != -1 ){
                mod_events();
                READY.events = true;
            }
            
            if( Eva.sett.plugins.indexOf( 'configurations' ) != -1 ){
                mod_configurations();
                READY.configurations = true;
            }
            
            if( Eva.sett.plugins.indexOf( 'tpl' ) != -1 ){
                mod_tpl();
                READY.tpl = true;
            }
            
            if( Eva.sett.plugins.indexOf( 'cart' ) != -1 ){
                mod_cart();
                READY.cart = true;
            }
            
            if( Eva.sett.plugins.indexOf( 'favorites' ) != -1 ){
                mod_favorites();
                READY.favorites = true;
            }
            
        };
                
        // Загрузка модуля инструментариев
        var mod_helpers = function(){
            window.helpers = {}; // Инструментарий ( Набор полезных функций )
            window.helpers = {
                    
                // извлеч только цифры из строки
                getNumeric : function( string ){
                    return parseInt(string.replace(/\D+/g,""));
                },
                
                // Найти значение в массиве
                in_array : function (value, array, index, response){
                    var response = response || false;
                    var index = index || false;
                    for(var i = 0; i < array.length; i++){
                        var variabled = (!index)?array[i]:array[i][index];
                        if(variabled == value){
                            if(response){
                                return array[i];
                            }else{
                                return true;
                            }
                        } 
                    }
                    return false;
                },
                
                // Найти значение в массиве
                helper_id_ids : function ( array, index, unic ){
                    var response = [];
                    for(var i = 0; i < array.length; i++){
                        var variabled = array[i][index];
                        if( unic ){
                            if( !helpers.in_array( variabled, response, false, false ) ){
                                response.push( variabled );
                            }
                        }else{
                            response.push( variabled );
                        }
                    }
                    return response;
                },
                
                // Найти и вернуть индекс результата поиска
                inKey_array : function( value, array, index, response){
                    var response = response || false;
                    var index = index || false;
                    for(var i = 0; i < array.length; i++){
                        var variabled = (!index)?array[i]:array[i][index];
                        if(variabled == value){
                            if(response){
                                return i;
                            }else{
                                return true;
                            }
                        } 
                    }
                    return false;
                },
                
                // Собрать в массиве нужные данные
                query_array : function (value, array, index){
                    var complete = complete || false;
                    var ind = index || false;
                    var new_arr = [];
                    for(var i = 0; i < array.length; i++){
                        if(array[i][ind] === value){
                            new_arr.push(array[i]);
                        }
                    }
                    return new_arr;
                },
                
                // Найти данные и что то сделать с результатом
                procedure_array : function( value, array, index, complete ){
                    var complete = complete || false;
                    var index = index || false;
                    for(var i = 0; i < array.length; i++){
                        var variabled = (!index)?array[i]:array[i][index];
                        if(variabled === value){
                            complete(array[i]);
                        } 
                    }
                    return false;
                },
                
                // Найти и удалить значение из масива
                remove_array : function( value, array, index ){
                    var complete = complete || false;
                    var index = index || false;
                    var irem = false;
                        array.find(( $e, $i ) => {
                            var variabled = (!index)?$e:$e[index];
                            if( variabled === value ){
                                irem = $i;
                            }
                        });
                    array.splice(irem, 1);
                    return array;
                },
                
                // Получить дату unixtimestamp
                _get_date : function (){
                    return Math.round(new Date().getTime()/1000.0);
                },
                
                // Проверить поле на соответствие
                validate : function ( type, string ){
                    if(type == 'email'){
                        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                        return pattern.test(string);
                    }
                    if(type == 'fio'){
                        var pattern = new RegExp(/^[а-яА-ЯёЁa-zA-Z\s]+$/ig);
                        return pattern.test(string);
                    }
                    if(type == 'integer'){
                        var pattern = new RegExp(/^[\d]+$/g);
                        return pattern.test(string);
                    }
                    if(type == 'phone'){
                        var pattern = new RegExp(/^([+]?[0-9\s-\(\)]{3,25})*$/i);
                        return pattern.test(string);
                    }
                    if(type == 'string_plus'){
                        var pattern = new RegExp(/^[a-zA-Z][a-zA-Z0-9-_]+$/ig);
                        return pattern.test(string);
                    }
                    if(type == 'string_cylric'){
                        var pattern = new RegExp(/^[а-яА-ЯёЁa-zA-Z0-9-_\s\.\,]+$/ig);
                        return pattern.test(string);
                    }
                    if(type == 'string_cylric_plus'){
                        var pattern = new RegExp(/^[а-яА-ЯёЁa-zA-Z0-9-_\s\.\,\/]+$/ig);
                        return pattern.test(string);
                    }
                    if(type == 'login'){
                        var pattern = new RegExp(/^[a-zA-Z][a-zA-Z0-9-_\.]{2,20}$/);
                        return pattern.test(string);
                    }
                    if(type == 'password'){
                        var pattern = new RegExp(/^[a-zA-Z0-9]{2,20}$/ig);
                        return pattern.test(string);
                    }
                    if(type == 'number'){
                        var pattern = new RegExp(/^\.[0-9]+$/ig);
                        return pattern.test(string);
                    }
                    if( type == 'price' ){
                        var err = 0;
                        var pattern1 = new RegExp(/^[\d]+$/g);
                        var pattern2 = new RegExp(/^[\d]+[.][\d]+$/g);
                        var pattern3 = new RegExp(/^[\d]+[,][\d]+$/g);
                        if(!pattern1.test(string)) err++;
                        if(!pattern2.test(string)) err++;
                        if(!pattern3.test(string)) err++;
                        return (err < 3)?true:false;
                    }
                    if( type === 'http' ){
                        var pattern = new RegExp('^(?:(?:ht|f)tps?://)?(?:[\\-\\w]+:[\\-\\w]+@)?(?:[0-9a-z][\\-0-9a-z]*[0-9a-z]\\.)+[a-z]{2,6}(?::\\d{1,5})?(?:[?/\\\\#][?!^$.(){}:|=[\\]+\\-/\\\\*;&~#@,%\\wА-Яа-я]*)?');
                        return pattern.test(string);
                    }
                },
                
                // Обвести красным эллемент формы на некоторое время
                formDanger : function( selector, sec, option ){
                    var sec = sec || 5000;
                    var option = option || {};
                    $( selector ).css('outline', '2px solid red');
                    setTimeout(function(){
                        $( selector ).css('outline', 'none');
                    }, sec);
                },
                
                // Прелоадер
                preload : function( change ){
                    var change = change || false;
                    var hiddenClass = 'hidden-xs-up';
                    var blockLoader = '#block_loader';
                    if( change ){
                        $( blockLoader ).removeClass( hiddenClass );
                    }else{
                        $( blockLoader ).addClass( hiddenClass );
                    }
                },
                
                // Уведомление
                alert : function ( type, mess, completed ){        
                    var completed = completed || false;
                    var type = type || 'error';
                    var mess = mess || 'Системная ошибка';        
                    if( type === 'success' ){
                        window.toastr.options = {
                            closeButton : true,
                            debug : false,
                            progressBar : true,
                            positionClass : "toast-bottom-full-width",
                            onclick : true,
                            showDuration : "400",
                            hideDuration : "1000",
                            timeOut : "7000",
                            extendedTimeOut : "1000",
                            showEasing : "swing",
                            hideEasing : "linear",
                            showMethod : "fadeIn",
                            hideMethod : "fadeOut"
                        };            
                        window.toastr.success( mess );
                        if( completed ) completed();            
                    }
                    if( type === 'error' ){
                        window.toastr.options = {
                            closeButton : true,
                            debug : false,
                            progressBar : true,
                            positionClass : "toast-bottom-full-width",
                            onclick : true,
                            showDuration : "400",
                            hideDuration : "1000",
                            timeOut : "7000",
                            extendedTimeOut : "1000",
                            showEasing : "swing",
                            hideEasing : "linear",
                            showMethod : "fadeIn",
                            hideMethod : "fadeOut"
                        };            
                        window.toastr.error( mess );
                        if( completed ) completed();
                    }
                },
                    
                // Сформатировать цену
                price_format : function ( _number, separ, decpo, decim ){
                    var decimal = decim || 2;
                    var separator = separ || ' ';
                    var decpoint = decpo || '.';
                    var format_string = '# ';
                    var r = parseFloat( _number );
                    var exp10 = Math.pow( 10, decimal );
                    r = Math.round( r * exp10 ) / exp10;
                    rr = Number(r).toFixed(decimal).toString().split('.');
                    b = rr[0].replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1"+separator);
                    r = ( rr[1]? b+ decpoint +rr[1]:b );
                    return format_string.replace('#', r);
                },
                
                // Установить урл в браузере
                _set_url : function( string ){
                    history.pushState(null, null, window.location.protocol +'//' + window.location.host + string );
                },
                
                // Установить свой тайтл
                _set_title : function( string ){
                    $('title').html( string );
                },
                
                // Получить рандомную строку
                _get_rand : function(){
                    var result = '';
                    var words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
                    var max_position = words.length - 1;
                    for( i = 0; i < 5; ++i ) {
                        position = Math.floor ( Math.random() * max_position );
                        result = result + words.substring(position, position + 1);
                    }
                    var a = new Date().getTime();
                    var b = Math.floor(Date.now() / 1000); 
                    return result + b;
                },
                
                // ДД/ММ/ГГГГ_ЧЧ:ММ:СС to Unix
                _get_date_is_string : function ( date ){
                    var d = {
                        d: (date.slice(0,2))?date.slice(0,2):'00',
                        me: (date.slice(3,5))?date.slice(3,5):'00',
                        y: (date.slice(6,10))?date.slice(6,10):'0000',
                        h: (date.slice(11,13))?date.slice(11,13):'00',
                        mi: (date.slice(14,16))?date.slice(14,16):'00',
                        s: (date.slice(17,19))?date.slice(17,19):'00'
                    };

                    var toDate = new Date();
                    var a = toDate.getTimezoneOffset() / 60;
                    toDate.setDate(d.d);
                    toDate.setMonth(d.me - 1);
                    toDate.setFullYear(d.y);
                    toDate.setHours(d.h);
                    toDate.setMinutes(d.mi);
                    toDate.setSeconds(d.s);
                    return Math.floor(toDate.valueOf()/1000);
                },

                // Секунды в таймер
                _timer_convert : function( countdown ) {
                    var countdown = (function (countdown){
                        var countdown = countdown || false;
                        if(countdown){
                            if(countdown > 0){
                                return countdown;
                            }else{
                                return false;
                            }
                        }else{
                            return false;
                        }
                    })(countdown);
                    if(countdown){
                        var secs = countdown % 60;
                        var countdown1 = (countdown - secs) / 60;
                        var mins = countdown1 % 60;
                        countdown1 = (countdown1 - mins) / 60;
                        var hours = countdown1 % 24;
                        var days = (countdown1 - hours) / 24;
                        return {
                            d: (days < 10)?'0'+days:days,
                            h: (hours < 10)?'0'+hours:hours,
                            m: (mins < 10)?'0'+mins:mins,
                            s: (secs < 10)?'0'+secs:secs
                        };
                    }else{
                        return false;
                    }
                },

                // преобразовать в base64
                b64_enc : function ( data ){

                    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                    var o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';
                    do { 
                            o1 = data.charCodeAt(i++);
                            o2 = data.charCodeAt(i++);
                            o3 = data.charCodeAt(i++);
                            bits = o1<<16 | o2<<8 | o3;
                            h1 = bits>>18 & 0x3f;
                            h2 = bits>>12 & 0x3f;
                            h3 = bits>>6 & 0x3f;
                            h4 = bits & 0x3f;
                            enc += b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
                    } while (i < data.length);
                    switch( data.length % 3 ){
                            case 1:
                                    enc = enc.slice(0, -2) + '==';
                            break;
                            case 2:
                                    enc = enc.slice(0, -1) + '=';
                            break;
                    }


                    enc.replace('+', '-');
                    enc.replace('/', '_');
                    enc.replace('=', ',');

                    return enc;

                },

                // преобразовать из base64
                b64_dec : function ( data ){

                    data.replace('-', '+');
                    data.replace('_', '/');
                    data.replace(',', '=');

                    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                    var o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';
                    do {
                            h1 = b64.indexOf(data.charAt(i++));
                            h2 = b64.indexOf(data.charAt(i++));
                            h3 = b64.indexOf(data.charAt(i++));
                            h4 = b64.indexOf(data.charAt(i++));
                            bits = h1<<18 | h2<<12 | h3<<6 | h4;
                            o1 = bits>>16 & 0xff;
                            o2 = bits>>8 & 0xff;
                            o3 = bits & 0xff;
                            if (h3 == 64)	  enc += String.fromCharCode(o1);
                            else if (h4 == 64) enc += String.fromCharCode(o1, o2);
                            else			   enc += String.fromCharCode(o1, o2, o3);
                    } while (i < data.length);
                    return enc;
                },
                
                // Найти и удалить из массива и вернуть обновленный массив
                remove_array : function( value, array, index, callback ){
                    var callback = callback || false;
                    var response = response || false;
                    var index = index || false;
                    var narr = [];
                    for(var i = 0; i < array.length; i++){
                        var variabled = (!index)?array[i]:array[i][index];
                        if(variabled !== value){
                            narr.push(array[i]);
                        } 
                    }
                    if(callback){
                        callback ( narr );
                    }else{
                        return narr;
                    }
                },
                
                // Раобрать GET параметры на компоненты
                GET_parse: function (query) {
                    var pars = (query != null ? query : "").replace(/&+/g, "&").split('&'),
                        par, key, val, re = /^([\w]+)\[(.*)\]/i, ra, ks, ki, i = 0,
                        params = {};
                    while ((par = pars.shift()) && (par = par.split('=', 2))) {
                        i = 0;
                        key = decodeURIComponent(par[0]);
                        val = decodeURIComponent(par[1] || "").replace(/\+/g, " ");
                        if (ra = re.exec(key)) {
                            ks = ra[1];
                            if (!(ks in params)) {
                                params[ks] = {};
                            }
                            ki = (ra[2] != "") ? ra[2] : i++;
                            params[ks][ki] = val;
                            continue;
                        }
                        params[key] = val;
                    }
                    return params;
                },
                
                // Вырезать все теги из строки
                clear_tag : function ( t ){
                    return t.replace(/<\/?[^>]+>/g,'');
                },
                
                // Установить КУКУ
                set_cookie : function ( name, value, lavel ){
                    var lav = lavel || 30;
                    $.cookie(name, value, {
                        expires: parseInt(lav),
                        path: "/"
                    });
                    return true;
                },
                
                // Получить КУКУ
                get_cookie : function ( name ){
                    return ($.cookie(name))?$.cookie(name):false;
                },
                
                // Удалить КУКУ
                remove_cookie : function ( name ){
                    $.cookie(name, null, {
                        expires: 1,
                        path: "/"
                    });
                },
                
                // Разобрать УРЛ на компоненты
                parseURL : function ( url ){
                    url = url || {};
                    var pattern = "^(([^:/\\?#]+):)?(//(([^:/\\?#]*)(?::([^/\\?#]*))?))?([^\\?#]*)(\\?([^#]*))?(#(.*))?$";
                    var rx = new RegExp(pattern);
                    var parts = rx.exec(url);
                    var url_ret = {};
                    url_ret.href = parts[0] || "";
                    url_ret.protocol = parts[1] || "";
                    url_ret.host = parts[4] || "";
                    url_ret.hostname = parts[5] || "";
                    url_ret.port = parts[6] || "";
                    url_ret.pathname = parts[7] || "/";
                    url_ret.search = parts[8] || "";
                    url_ret.hash = parts[10] || "";
                    return url_ret;
                },
                
                // Конвертировать значение в строку - что бы это небыло
                _convert_value : function ( value ){
                    var to = this._type_of(value);
                    if(to){
                        return this._value_convert( value, to );
                    }else{
                        return false;
                    }
                },
                
                _type_of : function ( math ){
                    var _typeof = 'string';
                    if(typeof math === 'function') _typeof = 'function';
                    if(typeof math === 'object') _typeof = 'object';
                    if(typeof math === 'number') _typeof = 'number';
                    return _typeof;
                },
                
                _value_convert : function ( _value , _typeof ){
                    var response = _value;
                        if(_typeof === 'function') response = $.toJSON(_value);
                        if(_typeof === 'object') response = $.toJSON(_value);
                        if(_typeof === 'number') response = _value;
                    return response;
                }
                
            };
        };
        
        // Загрузка и запуск событий
        var mod_events = function(){
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
                        $(DOM.parent + ' *[unload]').map(function (a, b) {
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

                form_action: function () {

                    $(DOM.parent + '*[type="submit"]').prop('disabled', false);

                    $(DOM.parent).off('submit');
                    $(DOM.parent).on('submit', 'form[action!="#"][static!=true]', function (e) {
                        e.preventDefault();

                        var link = $(this).attr('action') || false;
                        var before = $(this).attr('before') || false;
                        var requare = $(this).attr('requare') || false;
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
                                        window.helpers.preload(false);
                                        window.helpers.alert('error', 'Что то пошло не так...');
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
            
        };
        
        // Загрузка конфигураций и языковых настроек
        var mod_configurations = function(){
                        
            window.configurations = {
                
                getConfig : function(){
                    if( !sessionStorage.getItem('config') ){
                        return false;
                    }else if( sessionStorage.getItem('config') ){
                        var _config = sessionStorage.getItem('config'); 
                        window.GLOBAL.CONFIG = $.parseJSON( _config );
                        return true;
                    }
                },
                
                uploadConfig : function(){
                    $.get( Eva.sett.urlGetConfig , function( config ) {
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
                
                getLang : function(){
                    if( !sessionStorage.getItem('lang') ){
                        return false;
                    }else if( sessionStorage.getItem('lang') ){
                        var _config = sessionStorage.getItem('lang'); 
                        window.GLOBAL.LANG = $.parseJSON( _config );
                        return true;
                    }
                },
                
                uploadLang : function(){
                    $.get( Eva.sett.urlGetLang , function( response ) {
                        window.GLOBAL.LANG = response;
                        sessionStorage.setItem('lang', window.helpers._convert_value(response));
                        return true;
                    }, "json");
                }
            
            };
            
            if( window.configurations.getLang() !== true ){
                window.configurations.uploadLang();
            }

            if( window.configurations.getConfig() !== true ){
                window.configurations.uploadConfig();
            }
            
        };
        
        // Модуль для работы с шаблонами
        var mod_tpl = function(){
            window.TPL = false; // Помощьник для работы с шаблонизатором
            window.MEM['TPL'] = { tpl_list : [] };
            
            window.TPL = {
                
                GET_TPL: function (_NAME_, _DATA_, _RESPONSE_) {

                    var _name_ = _NAME_ || false;
                    var _data_ = _DATA_ || false;
                    var RESPONSE = _RESPONSE_ || false;

                    if (_name_) {
                        var patt = window.helpers.in_array(_name_, MEM.TPL.tpl_list, 'name', true);
                        if (patt === false) {
                            $.ajax({
                                type: "post",
                                url: Eva.sett.getTplDownload,
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

                TPL_TRANSFORM: function ( tpl_name, array_data, completted ) {

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
            
        };
        
        // Модуль для работы с карзиной заказов
        var mod_cart = function(){
            window.CART = false; // Работа с корзиной заказов
            window.CART = {
                    
                // Сервисная информация
                service_data : function(){
                    var items = {
                        tovarov: 0,
                        prices_cop: 0,
                        prices_rub: 0,
                        counts: 0
                    };
                    var list = this.list(false);
                    if (list.length > 0) {
                        for (var key in list) {
                            var val = list[key];
                            items.counts = Number( items.counts ) + Number( val.qty );
                            items.prices_cop = Number( items.prices_cop ) + Number( val.price ) * Number( val.qty );
                            items.prices_rub = Number( items.prices_rub ) + Number( ( Number( val.price ) *  Number( val.qty ) ) / 100 );
                            items.tovarov++;
                        }
                    }
                    return items;
                },
                
                // Обновляет табло информации
                header_update: function () {
                    
                    var items = this.service_data();
                    
                    // Кол-во наименований
                    if (  Eva.sett.dom_cartCount !== false ) {
                        if( items.tovarov > 0 ){
                            $( Eva.sett.dom_cartCount ).text( items.tovarov );
                        }else{
                            $( Eva.sett.dom_cartCount ).text( Eva.sett.dom_cartCount_empty );
                        }
                    }
                    
                    // Кол-во товаров
                    if (  Eva.sett.dom_cartCountProducts !== false ) {
                        if( items.counts > 0 ){
                            $( Eva.sett.dom_cartCountProducts ).text( items.counts );
                        }else{
                            $( Eva.sett.dom_cartCountProducts ).text( Eva.sett.dom_cartCountProducts_empty );
                        }
                    }
                    
                    // Общая сумма
                    if (  Eva.sett.dom_cartAllPrice !== false ) {
                        if( items.prices_cop > 0 ){
                            $( Eva.sett.dom_cartAllPrice ).text( helpers.price_format( items.prices_rub, ',', '.', 2 ) );
                        }else{
                            $( Eva.sett.dom_cartAllPrice ).text( Eva.sett.dom_cartAllPrice_empty );
                        }
                    }
                    
                },
                
                // Список товаров в хранилище
                list: function ( callFnc ) {
                    var callFnc = callFnc || false;
                    var response = [];
                    if (localStorage.getItem('cart') === 'undefined')    localStorage.setItem('cart', '[]');
                    if (!localStorage.getItem('cart'))    localStorage.setItem('cart', '[]');
                    var _cart = localStorage.getItem('cart');
                    var cart = $.parseJSON(_cart);
                    if (cart.length > 0) {
                        for (var key in cart) {
                            var val = cart[key];
                            var x = ( window.helpers._type_of(val) === 'object') ? val : $.parseJSON(val);
                            response.push(x);
                        }
                    }
                    if (callFnc) {
                        callFnc(response);
                    } else {
                        return response;
                    }
                },

                // Добавление товара в хранилище
                /**
                    Параметры:
                    ---
                    id : ИД товара
                    title : Название товара
                    price : Цена !! В КОПЕЙКАХ !!
                    qty : { // Если false - Один товар
                        type : 'fixed', // 'fixed' - Фиксированное значение / 'plus' - Добавить кол-во к текущему
                        input : false,  // Значение из Поля с указанным атрибутом либо false
                        value : false  // 0 - Удалить товар.
                    },
                    orig : {} // Дополнительные данные
                    --
                */    
                add: function ( AddItem ) {

                    var AddItem = AddItem || false;

                    if (AddItem != false) {

                        var list = this.list(false);

                        var ID = (AddItem['id']) ? AddItem.id : false;
                        var TITLE = (AddItem['title']) ? AddItem.title : false;
                        var PRICE = (AddItem['price']) ? AddItem.price : 0;
                        var QTY = (AddItem['qty']) ? AddItem.qty : 1;
                        var ORIG = (AddItem['orig']) ? AddItem.orig : false;

                        var math = 0;
                        if (list.length > 0) {
                            for (var key in list) {
                                var val = list[key];
                                if (val.id.toString() === ID.toString()) {

                                    var issetQTY = false;
                                    if( QTY.value < 0 ){ QTY.value = 0; }

                                    if( QTY.type === 'fixed' ){
                                        if( QTY.value ){
                                            list[key].qty = QTY.value;
                                        }else{
                                            list[key].qty = ( $( QTY.input ) ) ? Number( $( QTY.input ).val()) : 1;
                                        }
                                        issetQTY = true;
                                    }

                                    if( QTY.type === 'plus' ){
                                        if( QTY.value ){
                                            list[key].qty = Number( val.qty ) + Number( QTY.value );
                                        }else{
                                            list[key].qty = ( $( QTY.input ) ) ? val.qty + Number( $( QTY.input ).val()) : val.qty + ( QTY.value ) ? QTY.value : 1;
                                        }
                                        issetQTY = true;
                                    }
                                    
                                    if (issetQTY === false) {
                                        list[key].qty = 1;
                                    }
                                    
                                    math = 1;
                                    
                                }
                            }
                        }

                        if (math < 1) {

                            var addQty = 1;

                            if (QTY.value != false) {
                                addQty = QTY.value;
                            }

                            if (QTY.input) {
                                addQty = ($(QTY.input)) ? $(QTY.input).val() : addQty;
                            }

                            list.push({
                                id: ID,
                                title: TITLE,
                                qty: Number(addQty),
                                price: PRICE,
                                orig: ORIG
                            });
                        }

                        localStorage.setItem('cart', window.helpers._convert_value(list));
                        this.header_update();
                        
                        Eva.sett.callback_cart_added( list );

                    }
                },
                
                // Удаление товара из хранилища
                remove: function ( ID, callFnc ) {
                    var callFnc = callFnc || false;
                    var list = this.list(false);
                    var newList = [];
                    
                    if (list.length > 0) {
                        for (var key in list) {
                            var val = list[key];
                            if (val.id.toString() !== ID.toString()) {
                                newList.push(val);
                            }
                        }
                        localStorage.setItem('cart', window.helpers._convert_value(newList));
                        this.header_update();
                        Eva.sett.callback_cart_removed( newList );
                    }
                    
                    if (callFnc) {
                        callFnc( newList );
                    } else {
                        return newList;
                    }
                },
                
                // Обновление кол-ва едениц
                updateCount: function ( ID, count, callFnc ) {

                    var callFnc = callFnc || false;

                    if (count < 1) {
                        CART.remove( ID, function (list) {
                            localStorage.setItem('cart', window.helpers._convert_value(list));
                            if (callFnc !== false) {
                                callFnc(list);
                            }
                        });
                    } else {

                        var list = [];
                        var list = this.list(false);
                        if (list.length > 0) {
                            for (var key in list) {
                                var val = list[key];
                                if (val.id.toString() === ID.toString()) {
                                    list[key].qty = count;
                                }
                            }
                        }

                        localStorage.setItem('cart', window.helpers._convert_value(list));
                        if (callFnc !== false)  callFnc(list);

                    }
                    this.header_update();
                },
                
                // Очистить всю корзину
                removeAll: function ( callFnc ) {
                    var callFnc = callFnc || false;
                    var list = [];
                    localStorage.setItem('cart', window.helpers._convert_value(list));
                    this.header_update();
                    helpers.alert('success', 'Корзина пустая'); 
                    if (callFnc) {
                        callFnc( []);
                    } else {
                        return [];
                    }
                }

            };

        };
        
        // Модуль для работы со списком избранных товаров
        var mod_favorites = function(){
        
            window.FAVORITES = false;
            
            window.FAVORITES = {
            
                // Список избранных эллементов
                LIST : [],
                
                // Окрасить индикатор-иконку
                updateFavoritesActive: function(){
                    var LIST = this.list();                    
                    var e = setInterval(function(){
                        if( $( Eva.sett.dom_favoritesIcon ).length ){
                            clearInterval(e);
                            if( LIST.length > 0 ){
                                $( Eva.sett.dom_favoritesIcon ).addClass('active');
                            }else{
                                $( Eva.sett.dom_favoritesIcon ).removeClass('active');
                            }
                        }
                    }, 20);                    
                },
                
                // Пометить индикаторы на странице
                updateCheckFavorites : function(){
                    var LIST = this.list();
                     var e = setInterval(function(){
                         if( $( Eva.sett.dom_fvrCount ).length && $( '.favorites-checked' ).length ){
                            clearInterval(e);
                            $( DOM.parent + ' *[data-favorites-id]').map(function( i, e ){
                                $(e).removeClass('favorites-checked');
                                var check = helpers.in_array( Number($(e).attr('data-favorites-id')), LIST, 'essence_id', false);
                                if( check ){
                                    $(e).addClass('favorites-checked');
                                }                                          
                            });        
                            if (  Eva.sett.dom_fvrCount !== false ) {
                                if( LIST.length > 0 ){
                                    $( Eva.sett.dom_fvrCount ).text( LIST.length );
                                }else{
                                    $( Eva.sett.dom_fvrCount ).text( Eva.sett.dom_fvrCount_empty );
                                }
                            } 
                        }
                    }, 20);       
                },
                
                // Добавить / Убрать из избранного
                checkChange : function( id, type ){
                    var checked = $( DOM.parent + ' .event-favorites-check[data-favorites-id="'+id+'"]').hasClass('favorites-checked');
                    if( checked !== false ){
                        // Есть в избраном = убрать его оттуда
                        $( DOM.parent + ' .event-favorites-check[data-favorites-id="'+id+'"]').removeClass('favorites-checked');
                        FAVORITES.remove( id, function(){                   
                            if( Ev.favorites ){
                                Ev.favorites.update_list();
                            }                    
                        });                
                    }else{
                        // Нет в избраном = добавить его туда
                        $( DOM.parent + ' .event-favorites-check[data-favorites-id="'+id+'"]').addClass('favorites-checked');
                        FAVORITES.add( type, id, function(){
                            FAVORITES.updateCheckFavorites();
                        });
                    }
                    
                    FAVORITES.updateFavoritesActive();
                    FAVORITES.updateCheckFavorites();
                    
                },
                
                // Создание контейнера
                create : function(){
                    if( ! localStorage.getItem('favorites') )  localStorage.setItem('favorites', '[]');
                    this.LIST = localStorage.getItem('favorites'); 
                },
                
                // Полчить список обьектов
                list : function(){
                    this.create();
                    var response = [];
                    var ARRAY_LIST = $.parseJSON( this.LIST );
                    if( ARRAY_LIST.length > 0 ){
                        for (var key in ARRAY_LIST) {
                            var val = ARRAY_LIST[key];
                            var x = ( window.helpers._type_of(val) === 'object')?val:$.parseJSON(val);
                            response.push(x);
                        } 
                    }
                    return response;
                },
                
                // Добавить обьект в избранное
                add : function ( type, essence_id, callback ){
                    var callback = callback || false;
                    this.create();
                    var ARRAY_LIST = this.list();
                    if( !window.helpers.in_array( essence_id.toString(), ARRAY_LIST, 'essence_id', false ) ){
                        ARRAY_LIST.push(window.helpers._convert_value({
                            type : type,
                            essence_id : essence_id
                        }));
                    }
                    localStorage.setItem('favorites', window.helpers._convert_value( ARRAY_LIST ));
                    FAVORITES.updateCheckFavorites();
                    if( callback !== false ){
                        callback( essence_id );
                    }else{
                        return true;
                    }    
                },
                
                // Удалить обьект из избранного
                remove : function ( essence_id, callback ){
                    var callback = callback || false;
                    window.helpers.remove_array( essence_id, this.list(), 'essence_id', function( new_array_avorites ){
                        localStorage.setItem('favorites', window.helpers._convert_value( new_array_avorites ));
                    });
                    if( callback !== false ){
                        callback( essence_id );
                    }else{
                        return true;
                    }                
                }
                
            };

            FAVORITES.updateFavoritesActive();
            FAVORITES.updateCheckFavorites();
            
        };
        
        // Создать CSS и загрузить его
        render_css = function(){
            var sett = Eva.sett.render_css_setting;
            
            var responsive = sett.responsive;
            var classes = sett.classes;
            var br = "";
            var t = '';
            var c = sett.params;
            
            for (var k in responsive) {
                var v = responsive[k];
                t += ' @media ' + v.s + '{ ';
                    for (var ck in classes) {
                    var cl = classes[ck];
                        if( window.helpers.in_array( cl.name, c.param, false, false ) || c.all == '1' ){
                            i = cl.min;
                            while( i <= cl.max ){
                                t += [".eva .", cl.name, v.w,  i, "{ ", cl.action,  i, "px !important; }", br].join('');
                                i = ( cl.step_size == 1 ) ? i+1 : ( i < cl.step_one_max ) ? i+cl.step_value : i + cl.step_size;
                            } 
                        }
                    }
                t += '}' + br;
            }                
            
            t += ' .eva .outline{outline:1px solid silver;}.eva .select_none{user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;-webkit-touch-callout:none;-webkit-user-select:none;}.eva .italic{font-style:italic;}.eva .fw100{font-weight:100;}.eva .fw200{font-weight:200;}.eva .fw300{font-weight:300;}.eva .fw400{font-weight:400;}.eva .fw500{font-weight:500;}.eva .fw600{font-weight:600;}.eva .fw700{font-weight:700;}.eva .fw800{font-weight:800;}.eva .fw900{font-weight:900;}.eva .up_text{text-transform:uppercase;}.eva .underline{text-decoration:underline;}.eva .hover_underline:hover{cursor:pointer;text-decoration:underline;}.eva .cut_text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-bottom:3px;}.eva .pointer:hover{cursor:pointer;}.eva .ovhidden{overflow:hidden;}.eva .ovauto{overflow:auto;} ';
            
            $( 'head' ).append('<style>' + t + '</style>');
            $( 'body' ).addClass('eva');
        };
        
    	init();
    	return this;
      
    };
    
}( jQuery, window ));