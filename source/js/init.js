$(function(){
	var i = 1;
	var slidemassiv=$('.slider__content').children();

	$('.btn').on('click', function(event){
		$('.overlay').css('display','block');

		$('.popup-window').css('display','block');

		$('body').toggleClass('no-scroll');
	});

	$('.overlay').on('click', function(event){
		$('.overlay').css('display','none');

		$('.popup-window').css('display','none');
		$('.popup_img').css('display','none');

		$('body').toggleClass('no-scroll');
	});

	$('.img__close').on('click',function(event){
		$('.overlay').css('display','none');
		
		$('.popup_img').css('display','none');

		$('body').toggleClass('no-scroll');
	});


	//mobile-menu
	$('.main-nav__burger').on('click', function(event){
		$('.main-header').toggleClass('active');

		if ($('.main-header').hasClass('active')) {
			$('.main-nav__burger img').attr('src','img/close.png');
		}
		else {
			$('.main-nav__burger img').attr('src','img/burger.png');
		}

	});
	

	// slider

	var Count;
		if (document.body.clientWidth <= '767') {
			Count = 1;
		}

		else if ((document.body.clientWidth > '767') && (document.body.clientWidth <= '1199')) {
			Count = 2;
		}

		else if (document.body.clientWidth > '1200') {
			Count = 3;
		}	


	$(window).resize(function(){
		if (document.body.clientWidth <= '767') {
			Count = 1;
		}

		else if ((document.body.clientWidth > '767') && (document.body.clientWidth <= '1199')) {
			Count = 2;
		}

		else if (document.body.clientWidth > '1200') {
			Count = 3;
		}	
		
	});

	const deepShit = new Siema({
	  selector: '.slider__content',
	  perPage: Count
	});
	const deepprev = document.querySelector('.slider-nav__btn--left');
	const deepnext = document.querySelector('.slider-nav__btn--right');

	deepprev.addEventListener('click', () => deepShit.prev());
	deepnext.addEventListener('click', () => deepShit.next());

	// создание пагинатора
	var countSlidersAll=$('.slide').length;

	var paginatorListEl = document.createElement('ul');
	paginatorListEl.classList.add('portfolio__paginator');
	paginatorListEl.classList.add('paginator');

	//функция создания кнопок 

	function createPaginatorBtn(slideNumber) {
		//создаем переменную с элементом кнопки
		var paginatorBtnEl = document.createElement('button');
		//присваеваем класс стиля
		paginatorBtnEl.classList.add('paginator__btn');
		//первому элементу присваиваем класс активной кнопки
		if (slideNumber==0) {
			paginatorBtnEl.classList.add('paginator__btn--active')
		}
        //добавляем обработчик события на кнопку
		paginatorBtnEl.addEventListener('click', function(){
			deepShit.goTo(slideNumber);
			//элемент становится активным при клике, поэтому присваиваем ему соотвествующий класс
			currentClassControler(this);
		});

		return paginatorBtnEl
	}

	//функция создания элемента списка

	function createPaginatorListItemEl() {
		//создаем переменную с элементом списка
		var paginatorListItemEl = document.createElement('li');
		//присваиваем класс элемента списка
		paginatorListItemEl.classList.add('paginator__item'); 

		return paginatorListItemEl
	}

	//в зависимости от кол-ва слайдов создаем пагинатор
	for (var i = 0; i < countSlidersAll; i++) {
		//на каждом этапе цикла создаем переменную с элементом списка и кнопкой внутри него
		var paginatorListItemEl = createPaginatorListItemEl();
		var paginatorBtnEl =  createPaginatorBtn(i);
		//вставляем созданные элементы в список
		paginatorListItemEl.appendChild(paginatorBtnEl);
		paginatorListEl.appendChild(paginatorListItemEl);

	}

	//вставляем созданный пагинатор
	$('.slider').after(paginatorListEl);
	//получаем текущий активный элемент
	var elementWithCurrentClass = document.querySelector('.paginator__btn--active');

	//функция присвоения класса активного элемента 
	function currentClassControler(el) {
		//удаляем класс активного элемента с предыдущего текущего элемента
		elementWithCurrentClass.classList.remove('paginator__btn--active');
		//присваиваем класс активного элемента 
		el.classList.add('paginator__btn--active');
		//присваиваем новое значение переменной текущего активного элемента
		elementWithCurrentClass = el;
	}	

	//открытие картинки слайдера в окне поп-ап
	$('.slide__image img').on('click', function(){
		$('.overlay').css('display','block');
		$('body').toggleClass('no-scroll');
		$('.popup_img').css('display','block');

		var src = $(this).attr('src');
		var alt = $(this).attr('alt');
		var title = $(this).attr('title');

		$('.popup_img .img__content').attr('src',src);
		$('.popup_img .img__content').attr('alt',alt);
		$('.popup_img .img__content').attr('title',title);

		$('.popup_img h2').html(''+alt+'');

	});

	var curSlide=deepShit.currentSlide;
	var countSlidersAll=$('.slide').length;

	$('.popup_img .img__content').on('click',function(){
		var src;
		var alt ;
		var title;

		if (curSlide==countSlidersAll-1) {
			src = $('.slide__image img').eq(0).attr('src');
			alt = $('.slide__image img').eq(0).attr('alt');
			title = $('.slide__image img').eq(0).attr('title');	

			$('button.paginator__btn').eq(0).addClass('paginator__btn--active');
			$('button.paginator__btn').eq(countSlidersAll-1).removeClass('paginator__btn--active');

			deepShit.goTo(0);
			curSlide = 0;
			console.log(0);
		}
		else {
			src = $('.slide__image img').eq(curSlide+1).attr('src');
			alt = $('.slide__image img').eq(curSlide+1).attr('alt');
			title = $('.slide__image img').eq(curSlide+1).attr('title');

			$('button.paginator__btn').eq(curSlide+1).addClass('paginator__btn--active');
			$('button.paginator__btn').eq(curSlide).removeClass('paginator__btn--active');
			
			deepShit.goTo(curSlide+1);
			curSlide++;
			console.log(curSlide);
			
		}

		$('.popup_img .img__content').attr('src',src);
		$('.popup_img .img__content').attr('alt',alt);
		$('.popup_img .img__content').attr('title',title);
		$('.popup_img h2').html(''+alt+'');
		

	});

	$('.img_prev').on('click', function(event) {	
		var src;
		var alt ;
		var title;

		if (curSlide==0) {

			src = $('.slide__image img').eq(countSlidersAll-1).attr('src');
			alt = $('.slide__image img').eq(countSlidersAll-1).attr('alt');
			title = $('.slide__image img').eq(countSlidersAll-1).attr('title');
			
			$('button.paginator__btn').eq(countSlidersAll-1).addClass('paginator__btn--active');
			$('button.paginator__btn').eq(0).removeClass('paginator__btn--active');

			deepShit.goTo(countSlidersAll-1);
			curSlide = countSlidersAll-1;
			console.log(curSlide);
			
		}
		else {
			src=$('.slide__image img').eq(curSlide-1).attr('src');			
			alt=$('.slide__image img').eq(curSlide-1).attr('alt');			
			title=$('.slide__image img').eq(curSlide-1).attr('title');
			
			$('button.paginator__btn').eq(curSlide-1).addClass('paginator__btn--active');
			$('button.paginator__btn').eq(curSlide).removeClass('paginator__btn--active');

			deepShit.goTo(curSlide-1);
			curSlide = curSlide-1;
			console.log(curSlide);
			
		}

		$('.popup_img .img__content').attr('src',src);
		$('.popup_img .img__content').attr('alt',alt);
		$('.popup_img .img__content').attr('title',title);
		$('.popup_img h2').html(''+alt+'');
			
	});

	$('.img_next').on('click', function(event) {
		var src;
		var alt ;
		var title;
		
		if (curSlide==countSlidersAll-1) {
			src = $('.slide__image img').eq(0).attr('src');
			alt = $('.slide__image img').eq(0).attr('alt');
			title = $('.slide__image img').eq(0).attr('title');	

			$('button.paginator__btn').eq(0).addClass('paginator__btn--active');
			$('button.paginator__btn').eq(countSlidersAll-1).removeClass('paginator__btn--active');

			deepShit.goTo(0);
			curSlide = 0;
			console.log(0);	
		}
		else {

			src = $('.slide__image img').eq(curSlide+1).attr('src');
			alt = $('.slide__image img').eq(curSlide+1).attr('alt');
			title = $('.slide__image img').eq(curSlide+1).attr('title');
			
			$('button.paginator__btn').eq(curSlide+1).addClass('paginator__btn--active');
			$('button.paginator__btn').eq(curSlide).removeClass('paginator__btn--active');

			deepShit.goTo(curSlide+1);
			curSlide++;
			console.log(curSlide);
		}

		$('.popup_img .img__content').attr('src',src);
		$('.popup_img .img__content').attr('alt',alt);
		$('.popup_img .img__content').attr('title',title);
		$('.popup_img h2').html(''+alt+'');
		
	});


});