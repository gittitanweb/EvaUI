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
