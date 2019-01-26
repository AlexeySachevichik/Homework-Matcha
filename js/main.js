/**
 * В КАТАЛОГЕ КАРТИНОКИ ДЕЛАМ ФОНОМ
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