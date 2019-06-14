
// !!! JQUERY
if (typeof jQuery === 'undefined')
{
    throw new Error('Для работы EvaShopping, необходимо прежде загрузить библиотеку JQuery');
}

if ( typeof READY === 'undefined' )
{
    window.READY = {};
}

// !!! JQUERY last version
+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {
    throw new Error('Используйте последнию версию JQuery!!')
  }
  if( !$.cookie || !$.toJSON )
  {
    throw new Error('Подключите библиотеку Cookie и/или Json !!')
  }
}(jQuery);

;(function( $, window ){

	var defaults = {

        // Время хранения в днях
        dom_cartExpires : 7,

        // Елемент для вывода кол-ва наименований
        dom_cartCount : '.countShiping',

        // Елемент для вывода кол-ва наименований( Если ноль )
        dom_cartCount_empty : '0',

        // Елемент для вывода кол-ва товаров
        dom_cartCountProducts : false,

        // Елемент для вывода кол-ва товаров( Если ноль )
        dom_cartCountProducts_empty : '0',

        // Елемент для вывода общей стоимости
        dom_cartAllPrice : false,

        // Елемент для вывода общей стоимости( Если ноль )
        dom_cartAllPrice_empty : '',

        // Символика и обозначение валюты
        cart_sumbol : 'руб.',
        cart_current_sumbol : 'RUB',

        // Название валюты [1,2,6]
        cart_current : ['рубль', 'рубля', 'рублей'],

        // Что сделать после того как товар был добавлен в корзину
        callback_cart_added : function( params )
        {
            console.log('callback_cart_added', params);
            helpers.alert( 'success', [
                params.title, ' добавлен в спосок покупок в кол-ве:', params.item.qty, 'на сумму:', (params.item.summa / 100), window.EVA.cart_sumbol
            ].join(' '));
        },

        // Что сделать после того как товар был добавлен в корзину
        callback_cart_seted : function( params )
        {
            console.log('callback_cart_seted', params);
            if( helpers.in_array( params.method.toString(), ['set', 'updateCount' ], false, false ) !== false )
            {
                helpers.alert('success', [
                    'Для товара', params.item.title, 'установленно кол-во:', params.item.qty, 'на сумму:', (params.item.summa / 100), window.EVA.cart_sumbol
                ].join(' '));
            }

            if( helpers.in_array( params.method.toString(), ['add'], false, false ) !== false )
            {
                helpers.alert('success', [
                    params.item.title, 'добавлен. Установленно кол-во:', params.item.qty, 'на сумму:', (params.item.summa / 100), window.EVA.cart_sumbol
                ].join(' ') );
            }

        },

        // Что сделать после того как товар был удалён из корзины
        callback_cart_removed : function( params )
        {
            console.log('callback_cart_removed', params);
            helpers.alert('success', [
                params.item.title, 'удалён из списка покупок'
            ].join(' '));
        },

        // Что сделать после того как товар был удалён из корзины
        callback_cart_all_removed : function( params )
        {
            console.log('callback_cart_all_removed', params);
            helpers.alert('success', 'Список покупок - полностью очищен');
        }

	};

    $.fn.EvaShopping = function( options ){

        if( this.length > 1 ){
            throw new Error('EvaUI, необходимо вызвать лишь единожды, не чаще!');
            return false;
        }

		var THIS = this;

        var props = $.extend( defaults, options );

        window.CART = false;

        // Инициализация объекта
        var cart_init = function()
        {

            window.CART =
            {

                LIST : [],

                // Сервисная информация
                service_data : function()
                {
                    var items =
                    {
                        tovarov: 0,
                        prices_cop: 0,
                        prices_rub: 0,
                        counts: 0
                    };

                    var list = this.list(false);
                    if ( list.length > 0 )
                    {
                        for ( var key in list )
                        {
                            var val = list[key];
                            items.counts = Number( items.counts ) + Number( val.qty );
                            items.prices_cop = Number( items.prices_cop ) + Number( val.price ) * Number( val.qty );
                            items.prices_rub = Number( items.prices_rub ) + Number( ( Number( val.price ) *  Number( val.qty ) ) / 100 );
                            items.tovarov++;
                        }
                    }

                    return items;

                },

                // Создание контейнера
                create : function()
                {

                    if( $.cookie('shooping') === undefined )
                    {
                        $.cookie( 'shooping', '[]', {
                            expires: props.dom_cartExpires,
                            path: '/'
                        });
                    }

                    this.LIST = $.cookie('shooping');

                },

                // Обновляет табло информации
                header_update: function ()
                {

                    // Получение сервисной информации
                    var items = this.service_data();

                    // Кол-во наименований
                    if (  props.dom_cartCount !== false )
                    {
                        if( items.tovarov > 0 )
                        {
                            $( props.dom_cartCount ).text( items.tovarov );
                        }
                        else
                        {
                            $( props.dom_cartCount ).text( props.dom_cartCount_empty );
                        }
                    }

                    // Кол-во товаров
                    if (  props.dom_cartCountProducts !== false )
                    {
                        if( items.counts > 0 )
                        {
                            $( props.dom_cartCountProducts ).text( items.counts );
                        }
                        else
                        {
                            $( props.dom_cartCountProducts ).text( props.dom_cartCountProducts_empty );
                        }
                    }

                    // Общая сумма
                    if (  props.dom_cartAllPrice !== false )
                    {
                        if( items.prices_cop > 0 )
                        {
                            $( props.dom_cartAllPrice ).text( helpers.price_format( items.prices_rub, ',', '.', 2 ) );
                        }
                        else
                        {
                            $( props.dom_cartAllPrice ).text( props.dom_cartAllPrice_empty );
                        }
                    }

                },

                // Список товаров в хранилище
                /*
                    CART.list(function( e ){
                        console.log( e );
                    });
                */
                list : function( callFnc )
                {
                    var callFnc = callFnc || false;

                    // Если нет куки- создать её )
                    this.create();

                    // Получить список избранных товаров
                    var response = [];
                    var ARRAY_LIST = $.parseJSON( this.LIST );
                    if( ARRAY_LIST.length > 0 )
                    {
                        for (var key in ARRAY_LIST)
                        {
                            var val = ARRAY_LIST[key];
                            var x = ( window.helpers._type_of(val) === 'object')?val:$.parseJSON(val);
                            response.push(x);
                        }
                    }

                    // Возврат списка
                    if ( callFnc )
                    {
                        callFnc(response);
                    }
                    else
                    {
                        return response;
                    }

                },

                // Перезапись новых установок в массив
                setValues : function( values )
                {

                    // Перезапись массива данных
                    $.cookie( 'shooping', window.helpers._convert_value( values ), {
                        expires: props.dom_cartExpires,
                        path: '/'
                    });

                    // Обновить табло
                    this.header_update();

                },

                // Обработка параметров
                /**
                    Параметры:
                    ---
                    id : ИД товара
                    title : Название товара
                    price : Цена !! В КОПЕЙКАХ !!
                    qty : Кол-во ( По умолчанию - 1)
                    elm : Елемент у которого нужно изьять кол-во ( '#PROD_101' )
                    orig : {} // Дополнительные данные
                    --
                */
                getParams : function( params, callback )
                {

                    var this_ = this;
                    var params = params || false;
                    var callback = callback || false;
                    var data = {};

                    if ( params != false )
                    {

                        var ID = ( params['id'] ) ? params.id : false;
                        var TITLE = ( params['title'] ) ? params.title : false;
                        var PRICE = ( params['price'] ) ? params.price : 0;
                        var ORIG = ( params['orig'] ) ? params.orig : false;
                        var ELM = ( params['elm'] ) ? params.elm : false;
                        var QTY = ( params['qty'] ) ? params.qty : 1;
                        if( ELM !== false && $(ELM) )
                        {
                            var QTY = Number( $(ELM).val() );
                        }

                    }
                    else
                    {
                        console.log('CART::add', 'Не хватает параметов для добавления в корзину' );
                    }

                    if( ID !== false && TITLE !== false )
                    {
                        data['ID'] = ID;
                        data['TITLE'] = TITLE;
                        data['PRICE'] = PRICE;
                        data['ORIG'] = ORIG;
                        data['QTY'] = QTY;
                    }
                    else
                    {
                        console.log('CART::add', 'ОБЯЗАТЕЛЬНЫЕ параметры - отсутствуют' );
                    }

                    if( callback !== false )
                    {
                        callback( data );
                    }
                    else
                    {
                        return data;
                    }

                },

                // Добавить к количеству
                // CART.add({id : 12,title : 'Product A',price : 10000, qty: 1});
                add : function( params, callback )
                {

                    var this_ = this;
                    var callback = callback || false;
                    var list = this.list(false);

                    this.getParams( params || false, function( c ){
                        if( c !== false )
                        {

                            if ( list.length > 0 && helpers.in_array( c.ID.toString(), list, 'id', false ) )
                            {

                                // Если там такое значение существует
                                for ( var key in list )
                                {
                                    var val = list[key];
                                    if ( val.id.toString() === c.ID.toString() && c.QTY > 0 )
                                    {
                                        list[key].qty = Number( val.qty ) + Number( c.QTY );
                                        list[key].summa = Number( list[key].qty ) * Number( list[key].price );
                                    }
                                }

                                // Вызов пользовательских функций
                                props.callback_cart_seted({
                                    item : helpers.in_array( c.ID.toString(), list, 'id', true ),
                                    method : 'add'
                                });

                            }
                            else
                            {

                                // Добавление
                                list.push({
                                    id: c.ID,
                                    title: c.TITLE,
                                    qty: c.QTY,
                                    price: c.PRICE,
                                    summa: Number(c.QTY) * Number(c.PRICE),
                                    orig: c.ORIG
                                });

                                // Вызов пользовательских функций
                                props.callback_cart_added({
                                    item : helpers.in_array( c.ID.toString(), list, 'id', true ),
                                    method : 'add'
                                });

                            }

                            this_.setValues( list );

                        }
                    });

                    if( callback !== false )
                    {
                        callback( list, 'add' );
                    }
                    else
                    {
                        return true;
                    }

                },

                // Установить кол-во
                // CART.set({id : 12,title : 'Product A',price : 10000, qty: 2});
                set : function( params, callback )
                {

                    var this_ = this;
                    var callback = callback || false;
                    var list = this.list(false);

                    this.getParams( params || false, function( c ){
                        if( c !== false )
                        {
                            if ( list.length > 0 && helpers.in_array( c.ID.toString(), list, 'id', false ) )
                            {

                                // Если там такое значение существует
                                for ( var key in list )
                                {
                                    var val = list[key];
                                    if ( val.id.toString() === c.ID.toString() && c.QTY > 0 )
                                    {
                                        list[key].qty = Number( c.QTY );
                                        list[key].summa = Number( c.QTY ) * Number( list[key].price );
                                    }
                                }

                                // Вызов пользовательских функций
                                props.callback_cart_seted({
                                    item : helpers.in_array( c.ID.toString(), list, 'id', true ),
                                    method : 'set'
                                });

                            }
                            else
                            {

                                // Добавление
                                list.push({
                                    id: c.ID,
                                    title: c.TITLE,
                                    qty: c.QTY,
                                    price: c.PRICE,
                                    summa: Number(c.QTY) * Number(c.PRICE),
                                    orig: c.ORIG
                                });

                                // Вызов пользовательских функций
                                props.callback_cart_added({
                                    item : helpers.in_array( c.ID.toString(), list, 'id', true ),
                                    method : 'set'
                                });

                            }
                            this_.setValues( list );
                        }
                    });

                    if( callback !== false )
                    {
                        callback( list, 'set' );
                    }
                    else
                    {
                        return true;
                    }

                },

                // Переключатель состояния [Добавить или Удалить]
                // CART.toggle({id : 1,title : 'Product A',price : 10000});
                toggle : function( params, callback )
                {

                    var this_ = this;
                    var callback = callback || false;
                    var list = this.list(false);

                    this.getParams( params || false, function( c ){
                        if( c !== false )
                        {
                            if ( list.length > 0 && helpers.in_array( c.ID.toString(), list, 'id', false ) )
                            {
                                // Если там такое значение существует - УДАЛИТЬ
                                this_.remove( c.ID, function( l ){
                                    this_.setValues( l );
                                });
                            }
                            else
                            {

                                // Добавление
                                list.push({
                                    id: c.ID,
                                    title: c.TITLE,
                                    qty: c.QTY,
                                    price: c.PRICE,
                                    summa: Number(c.QTY) * Number(c.PRICE),
                                    orig: c.ORIG
                                });

                                // Вызов пользовательских функций
                                props.callback_cart_added({
                                    item : helpers.in_array( c.ID.toString(), list, 'id', true ),
                                    method : 'toggle'
                                });

                                this_.setValues( list );
                            }

                        }
                    });

                    if( callback !== false )
                    {
                        callback( list, 'toggle' );
                    }
                    else
                    {
                        return true;
                    }

                },

                // Удаление товара из хранилища
                // CART.remove( 12 );
                remove: function ( ID, callFnc )
                {

                    var this_ = this;
                    var newList = [];
                    var callFnc = callFnc || false;

                    var list = this.list ( false );
                    if ( list.length > 0 )
                    {

                        var removeItem = helpers.in_array( ID.toString(), list, 'id', true );

                        for (var key in list)
                        {
                            var val = list[key];
                            if ( val.id.toString() !== ID.toString() )
                            {
                                newList.push(val);
                            }
                        }

                        this_.setValues( newList );

                        props.callback_cart_removed({
                            item : removeItem,
                            method : 'remove'
                        });

                    }

                    if ( callFnc )
                    {
                        callFnc( newList );
                    }
                    else
                    {
                        return newList;
                    }

                },

                // Очистить всю корзину
                // CART.removeAll();
                removeAll: function ( callFnc )
                {

                    var list = this.list ( false );
                    var callFnc = callFnc || false;

                    this.setValues([]);
                    props.callback_cart_all_removed({
                        items : list,
                        method : 'removeAll'
                    });

                    if (callFnc)
                    {
                        callFnc([]);
                    }
                    else
                    {
                        return [];
                    }

                },

                // Обновление кол-ва едениц
                // CART.updateCount( 12, 120 );
                updateCount: function ( ID, count, callFnc )
                {

                    var this_ = this;
                    var callFnc = callFnc || false;

                    if ( count < 1 )
                    {
                        count = 1;
                    }

                    var list = this.list(false);
                    if ( list.length > 0 && helpers.in_array( ID.toString(), list, 'id', false ) )
                    {

                        // Если там такое значение существует
                        for ( var key in list )
                        {
                            var val = list[key];
                            if ( val.id.toString() === ID.toString() )
                            {
                                list[key].qty = Number( count );
                                list[key].summa = Number( count ) * Number( list[key].price );
                            }
                        }

                        this_.setValues( list );

                        // Вызов пользовательских функций
                        props.callback_cart_seted({
                            item : helpers.in_array( ID.toString(), list, 'id', true ),
                            method : 'updateCount'
                        });

                        if (callFnc)
                        {
                            callFnc( list );
                        }
                        else
                        {
                            return list;
                        }

                    }

                    return true;

                }

            };

            CART.header_update();

            // Сигнал о готовности сотрудничать
            READY.cart = true;

        };

        var e = setInterval(function () {
    		if( READY.helpers !== false )
            {
                clearInterval(e);
                cart_init();
            }
        }, 10);

        setTimeout(function(){
            if( READY.helpers !== false )
            {
                console.info('EvaShopping похоже не смогл дождаться инициализации необходимого компонента HELPERS ;(');
            }
        }, 10000);

    };

})( jQuery, window );
