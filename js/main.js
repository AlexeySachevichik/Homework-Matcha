/**
 * В КАТАЛОГЕ КАРТИНКИ ДЕЛАМ ФОНОМ
 */
var catalogImage = document.getElementsByClassName("cci-img");
var images = [];

for(var i=0; i<catalogImage.length; i++){
    images.push(catalogImage[i]);
}

for(var i=0; i<images.length; i++){
    var img = images[i];
    var parent = img.parentNode;
    var src = img.getAttribute('src');

    parent.style.cssText = "background-image:  url('"+ src + "'); \
        background-repeat: no-repeat; \
        background-position: center center; \
        background-size: cover; \
    ";
    parent.removeChild(img);
}






/**
 * ПРОИЗВОДИТЕЛЬ
 */
var manufacture = {
    i: 0,
    items: document.getElementsByClassName('ms-item'),
    wrap: document.getElementById('items'),
    left: document.getElementById('ms-left'),
    right: document.getElementById('ms-right'),
    lable: document.getElementById('lable'),

    showLable: function(){
        this.lable.innerHTML = (this.i + 1) + ' из ' + this.items.length;
    },

    hideItems: function(){
        for(var i=0; i<this.items.length; i++){
            this.items[i].style.display = 'none';
        };
    },

    showItem: function(){
        this.items[this.i].style.display = 'block';
    },

    prevItem: function(){
        if( this.i == 0) this.i = this.items.length - 1;
        else this.i--;
    },

    nextItem: function(){
        if( this.i == this.items.length - 1 ) this.i = 0;
        else this.i++;
    },

};

manufacture.hideItems();
manufacture.showItem();
manufacture.showLable();

manufacture.left.addEventListener('click', function(){
    manufacture.hideItems();
    manufacture.prevItem();
    manufacture.showItem();
    manufacture.showLable();
});

manufacture.right.addEventListener('click', function(){
    manufacture.hideItems();
    manufacture.nextItem();
    manufacture.showItem();
    manufacture.showLable();
});





/**
 * КАТАЛОГ
 */
var catalog = {
    i: 0,
    // length: 0,

    itemsAll: document.getElementsByClassName('cc-item'),
    parent: document.getElementById('catalog-content'),
    navigation: document.getElementById('c-navigation'),
    left: document.getElementById('cn-left'),
    right: document.getElementById('cn-right'),

    butonTea: document.getElementById('c-btn-tea'),
    butonIce: document.getElementById('c-btn-ice'),
    butonCook: document.getElementById('c-btn-cook'),
    butonAcces: document.getElementById('c-btn-acces'),

    itemsTea: [],
    itemsIce: [],
    itemsCook: [],
    itemsAcces: [],
    current: [],

    hideItemsAll: function(){
        this.parent.innerHTML = '';
    },

    hideNavigition: function(){
        this.navigation.style.display = 'none';
    },

    showNavigition: function(){
        this.navigation.style.display = 'flex';
    },

    categorized: function(){
        for(var i=0; i<this.itemsAll.length; i++){
            if( this.itemsAll[i].getAttribute('data-type') == 'tea' ) this.itemsTea.push(this.itemsAll[i].cloneNode(true));
            if( this.itemsAll[i].getAttribute('data-type') == 'ice' ) this.itemsIce.push(this.itemsAll[i].cloneNode(true));
            if( this.itemsAll[i].getAttribute('data-type') == 'cook' ) this.itemsCook.push(this.itemsAll[i].cloneNode(true));
            if( this.itemsAll[i].getAttribute('data-type') == 'acces' ) this.itemsAcces.push(this.itemsAll[i].cloneNode(true));
        };
    },

    initCategory: function(type){
        this.i = 0;

        if( type == 'tea' ) this.current = this.itemsTea;
        if( type == 'ice' ) this.current = this.itemsIce;
        if( type == 'cook' ) this.current = this.itemsCook;
        if( type == 'acces' ) this.current = this.itemsAcces;
    },

    showItems: function(){

        if( this.current.length == 1 ) var index = [0];
        else if( this.current.length == 2 ) var index = [0,1];
        else if( this.current.length == 3 ) var index = [0,1,2];
        else if( this.current[this.i+1] == undefined ) var index = [this.i,0,1];
        else if( this.current[this.i+2] == undefined ) var index = [this.i,this.i+1,0];
        else var index = [this.i,this.i+1,this.i+2];

        for(var n=0; n<index.length; n++){
            this.parent.appendChild( this.current[ index[n] ] );
        };
    },

    prevItem: function(){
        if( this.i == 0) this.i = this.current.length - 1;
        else this.i--;
    },

    nextItem: function(){
        if( this.i == this.current.length - 1 ) this.i = 0;
        else this.i++;
    },
};
catalog.categorized();
catalog.hideItemsAll();
catalog.initCategory('tea');
catalog.showItems();

if( catalog.itemsTea.length < 4) catalog.hideNavigition();
else catalog.showNavigition();



catalog.butonTea.addEventListener('click', function(){
    catalog.hideItemsAll();
    catalog.initCategory('tea');
    catalog.showItems();

    if( catalog.itemsTea.length < 4) catalog.hideNavigition();
    else catalog.showNavigition();
});

catalog.butonIce.addEventListener('click', function(){
    catalog.hideItemsAll();
    catalog.initCategory('ice');
    catalog.showItems();

    if( catalog.itemsIce.length < 4) catalog.hideNavigition();
    else catalog.showNavigition();
});

catalog.butonCook.addEventListener('click', function(){
    catalog.hideItemsAll();
    catalog.initCategory('cook');
    catalog.showItems();

    if( catalog.itemsCook.length < 4) catalog.hideNavigition();
    else catalog.showNavigition();
});

catalog.butonAcces.addEventListener('click', function(){
    catalog.hideItemsAll();
    catalog.initCategory('acces');
    catalog.showItems();

    if( catalog.itemsAcces.length < 4) catalog.hideNavigition();
    else catalog.showNavigition();
});

catalog.left.addEventListener('click', function(){
    catalog.hideItemsAll();
    catalog.prevItem();
    catalog.showItems();
});

catalog.right.addEventListener('click', function(){
    catalog.hideItemsAll();
    catalog.nextItem();
    catalog.showItems();
});





/**
 * ПЛАВНЫЙ СКРОЛЛИНГ НА СТРАНИЦЕ
 */
var anchors = document.querySelectorAll('a[href*="#"]');
for (var anchor of anchors) {
    anchor.addEventListener('click', function(e){
        e.preventDefault();

        var sectionId = e.target.getAttribute('href');

        document.querySelector('' + sectionId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};




/**
 * КНОПКА МЕНЮ НА МАЛЕНЬКИХ ЭКРАНАХ
 */
var menu = {
    buttonMenu: document.getElementById('btn-menu'),
    wrapperMenu: document.getElementById('menu'),

    hideMenu: function(){
        this.wrapperMenu.style.display = 'none';
    },

    showMenu: function(){
        this.wrapperMenu.style.display = 'block';
    },

};

menu.buttonMenu.addEventListener('click', function(){
    if(menu.wrapperMenu.style.display == 'none' || menu.wrapperMenu.style.display == '') menu.showMenu();
    else if(menu.wrapperMenu.style.display == 'block') menu.hideMenu();
});

window.addEventListener('click', function(e){
    if( menu.wrapperMenu.style.display == 'block' && e.target != menu.buttonMenu && !e.target.classList.contains('line') ) menu.hideMenu();
});





/**
 * ПАРАЛАКС ЭФФЕКТ
 */
var parallax = {

    // Необходимые переменные
    scrolling: false,
    mouseWheelActive: false,
    count: 0,
    mouseDelta: 0,

    // Элементы использующие паралакс
    leafs: [
                document.getElementById("l-02"),
                document.getElementById("l-03"),
                document.getElementById("l-04"),
                document.getElementById("l-05"),
                document.getElementById("l-06"),
                document.getElementById("l-07"),
                document.getElementById("l-08"),
                document.getElementById("l-09")
           ],

    // Список доступных свойств
    transform: [
                    "transform",
                    "msTransform",
                    "webkitTransform",
                    "mozTransform",
                    "oTransform"
               ],

    // Для кроссбраузерности выбираем нужную технологию
    transformProperty: function(){
        for(var i=0; i<this.transform.length; i++){

            // Проверяем, используется ли стилевое свойство браузером
            // Все доступные свойства доступны в document.body.style
            // Все названия стилей используют camelCase
            if( typeof document.body.style[this.transform[i]] != "undefined" ){
                return this.transform[i];
            };
        };
        return null;
    },

    // В зависимости от браузера выбираем технологию
    requestAnimationFrame: window.requestAnimationFrame ||
                           window.mozRequestAnimationFrame ||
                           window.webkitRequestAnimationFrame ||
                           window.msRequestAnimationFrame,

    mouseScroll: function(e){
        this.mouseWheelActive = true;

        // Отменяем стандартное поведение прокрутки страницы
        if( e.preventDefault ){
            e.preventDefault();
        };

        // e.wheelDelta - разница на которое прокрутили колесо мыши
        // Это необходимо для замеледления по отношению к
        // реальному скроллингу страницы
        if( e.wheelDelta ){
            this.mouseDelta = e.wheelDelta / 320;
        }
        else if( e.detail ){
            this.mouseDelta = -e.detail / 3;
        };
    },

    // Смещаем элемент на указанное кол-во пикселей
    setTransform: function( element, yPosition){
        // При 3D трансформации включается аппаратное ускорение
        element.style[this.transformProperty()] = "translate3d(0, " + yPosition + "px, 0)";
    },

    // Получаем значение на которое прокрутили страницу 
    // от верхнего края страницы до верхней границы окна
    getScrollPosition: function(){
        if( document.documentElement.scrollTop == 0 ){
            return document.body.scrollTop;
        }
        else{
            return document.documentElement.scrollTop;
        };
    },

    animationLoop: function(){

        // console.log(this.scrolling);

        // Если в данный момент скролиться страница
        // это может быть и тачпад
        if( this.scrolling ){

            // Для каждого элемента паралакса установим смещение
            for( var i=0; i<parallax.leafs.length; i++ ){

                parallax.setTransform( parallax.leafs[i], -1 * parallax.getScrollPosition() / 10 );
            };

            // Полсе прокрутки установим false
            this.scrolling = false;
        };

        // Если крутиться колесо мыши
        if( this.mouseWheelActive ){
            window.scrollBy(0, -this.mouseDelta * 10);
            this.count++;

            if( this.count > 20 ){
                this.count = 0;
                this.mouseDelta = 0;
                this.mouseWheelActive = false;
            };
        };

        // Перерендеринг страницы
        // используется для анимации улучшеной для глаза
        requestAnimationFrame(parallax.animationLoop);
    },

    setup: function(){

        // Если колесо мыши крутиться
        window.addEventListener("scroll", function(){
            this.scrolling = true;
        }, false);

        // Для кроссбраузерности добавляем еще два слушателя
        window.addEventListener("mousewhell", this.mouseScroll, false);
        window.addEventListener("DOMMouseScroll", this.mouseScroll, false);

        // Цикл анимации
        this.animationLoop();
    },

};
// Запускаем паралакс
parallax.setup();