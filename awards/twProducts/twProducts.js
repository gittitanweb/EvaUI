;(function($){

	var plugin = {};

	var defaults = {

		// DOM params
		input_placeholder : 'ИД, Артикул, Наименование товара для поиска',
		input_value_default : '',
		input_classes : '',
		input_name : 'products_ids',

		icon_add : '<i class="fa fa-plus float-right pa5 mr5 px13"></i>',
		icon_remove : '<i class="fa fa-trash float-right pa5 mr5 px13"></i>',

		elms_listing : [],
		elms_searching : [],

		// QUERY params
		query_search_link : '/helper/getProductsList',
		query_SearchTextIntex : 'text',
		query_Method : 'post',

		// QUERY options
		query_limit : 10,
		query_sort : 'desc',

		lastQuery : false,
		pagination : false,

        hidden_block_result : false,

        // События
        events : {
            itemAdd : function( item, items ){
                return true;
            },
            itemRmv : function( item, items ){
                return true;
            },
            changeELM : function( product_id, type ){
                return true;
            }
        }

	};

	$.fn.twProducts = function( options ){

		if( this.length == 0 ) return this;

		if( this.length > 1 ){
			this.each(function(){$(this).twProducts( options )});
			return this;
		}

		var pr = {};
		var qXNR = false;

		var el = this;
		plugin.el = this;

		// Иннициализация
		var init = function(){
			pr.sett = $.extend( defaults, options );
			setup();
			setTimeout(function(){
				var uploadListingIDS = el.attr('data-values').split(',');
				var itemID = el.attr('data-item') || 'id';
				if( uploadListingIDS ){
					$.ajax({
						type: pr.sett.query_Method,
						url: pr.sett.query_search_link,
						data: {
							ids : [ itemID, uploadListingIDS ]
						},
						dataType : 'json',
						success: function( response ){
							pr.sett.lastQuery = response;
							pr.sett.elms_listing = response.items;
							bilder_listing( true, pr.twBlockResult, pr.sett.elms_listing, 'remove' );
						}
					});
				}
			}, 1000);
		};

		// Установка плагина
		var setup = function(){
			bilder_container();
		};

		// Оформление результатов поиска
		var run_result_search = function( LIST ){
			bilder_listing( true, pr.twBlockListing, LIST, 'add' );
		};

		// Хочет добавить или удалить из контейнера
		var changeElement = function( product_id, type ){
            var prod = helper_getArray( product_id.toString(), pr.sett.elms_searching, 'id' );
			if( product_id && type === 'add' ){
				pr.twBlockListing.find('p[data-item_id="'+product_id+'"]').remove();
                if( pr.sett.hidden_block_result !== true ){
                    if( prod !== false && !helper_getArray( product_id.toString(), pr.sett.elms_listing, 'id' ) ){
                        pr.sett.elms_listing.push( prod );
                        bilder_listing( true, pr.twBlockResult, pr.sett.elms_listing, 'remove' );
                        pr.sett.events.itemAdd( prod, pr.sett.elms_listing );
                    }
                }else{
                    pr.sett.events.itemAdd( prod, pr.sett.elms_listing );
                }
			}
			if( product_id && type === 'remove' ){
				var new_list = [];
				for ( var key in pr.sett.elms_listing ) {
					var item = pr.sett.elms_listing[key];
					if( item.id.toString() !== product_id.toString() ){
						new_list.push( item );
					}
				}
                pr.sett.events.itemRmv( prod, new_list );
				pr.sett.elms_listing = new_list;
				bilder_listing( true, pr.twBlockResult, pr.sett.elms_listing, 'remove' );
			}
			setInputPost();
		};

		// Запись значений в инпут
		var setInputPost = function(){
			var list = [];
			for ( var key in pr.sett.elms_listing ) {
				var item = pr.sett.elms_listing[key];
				list.push( item.id );
			}
			var setValue = list.join(',');
			pr.twPostListing.val( setValue );
		};

		// Поиск значения в массиве
		var helper_getArray = function ( value, array, index ){
			var r = false;
			for ( var key in array ) {
				var item = array[key];
				if( item[index] === value ){
					r = item;
					break;
				}
			}
			return r;
		};

		// Запуск процедуры запроса товаров
		var run_search = function( text ){
			var queryText = $.trim( text );
			if( queryText.length > 0 ){
				if( qXNR ) qXNR.abort();
				var postData = {};
				postData[ pr.sett.query_SearchTextIntex ] = queryText;
				postData.limit = pr.sett.query_limit;
				postData.sort = pr.sett.query_sort;
				qXNR = $.ajax({
					type: pr.sett.query_Method,
					url: pr.sett.query_search_link,
					data: postData,
					dataType : 'json',
					success: function( response ){
						pr.sett.lastQuery = response;
						pr.sett.elms_searching = response.items;
						pr.sett.pagination = ( response.pagination.length > 0 ) ? response.pagination : false;
						run_result_search( response.items );
					}
				});
			}else{
				pr.sett.lastQuery = false;
				pr.sett.pagination = false;
				pr.twBlockListing.empty();
			}
		};

		// Создать HTML контейнер для работы и повесить события
		var bilder_container = function(){
			el.empty();

			el.html('<div class="tw-products"></div>');
			pr.twProducts = el.find('div.tw-products');

            pr.twProducts.html('<div class="tw-block_search"></div>');
			pr.twBlockSearch = pr.twProducts.find('div.tw-block_search');

				pr.twBlockSearch.html('<input type="text" class="'+pr.sett.input_classes+'" value="'+pr.sett.input_value_default+'" placeholder="'+pr.sett.input_placeholder+'" />');
				pr.twInputSearch = pr.twBlockSearch.find('input');

            pr.twProducts.append('<input type="hidden" name="'+pr.sett.input_name+'" value="" /> ');
			pr.twPostListing = pr.twProducts.find('input[name="'+pr.sett.input_name+'"]');

            pr.twProducts.append('<div class="tw-block_listing" '+( pr.sett.hidden_block_result !== false ? 'style="width: 100%;"' : '' )+' ></div>');
			pr.twBlockListing = pr.twProducts.find('div.tw-block_listing');

            pr.twProducts.append('<div class="tw-block_result" '+( pr.sett.hidden_block_result !== false ? 'style="display: none;"' : '' )+'></div>');
			pr.twBlockResult = pr.twProducts.find('div.tw-block_result');

			pr.twInputSearch.on('keyup', function( event ) {
				run_search( $( this ).val() );
			});

		};

		// Создать строки в контейнерах
		var bilder_listing = function( empty, container, listing, type ){
			if( empty === true ){
				container.empty();
			}
			if( listing.length > 0 ){
        		for ( var key in listing ) {
                    var item = listing[key];
					var t = '<p class="pa5 mb1" data-item_id="'+item.id+'">';
						t += '	<span class="ff-ms-300 px15 pl10">#'+item.id+'</span>';
						t += '	<span class="ff-ms-300 px15 pl10">'+item.articul+'</span>';
						t += '	<span class="px15 pl10"><a href="/products/'+item.aliace+'" target="_blank">'+item.header+'</a></span>';
						t += '	<a href="#" data-product_id="'+item.id+'" >';
						t += '		' + pr.sett[ 'icon_' + type ];
						t += '	</a>';
						t += '</p>';
					container.append( t );
                    var itemRemove = container.find('a');
                    itemRemove.off('click');
                    itemRemove.on('click', function(){
                        var product_id = $(this).attr('data-product_id');
						changeElement( product_id, type );
                    });
				}
			}
		};

    	init();
    	return this;

    };
})(jQuery);
