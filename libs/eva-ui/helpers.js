
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

    if( !window[READY] ) window[READY] = {};

    // Сигнал о готовности сотрудничать
    READY.helpers = true;

})( jQuery, window );
