'use strict';

var mifApp = angular.module('mifApp', ["mifAppDepend"]);

mifApp.controller('MifCtrl', ['$scope', '$http', 'api', function ($scope, $http, api)
{

    // Запрашиваем и получаем данные нашей модели, с описанием книг. Данные нужны, для добавления списка книг на страницу, и их перемещения.
    $http.get('books/books.json').success(function(data) {
        $scope.books = data;
    });

    // Модель данных, в json для демонстрационных целей.
    $scope.$watch('books', function(books) {
        $scope.modelAsJson = angular.toJson(books, true);
    }, true);

    // Функционал добавления еще 4 книг на страницу, в случайном порядке.
    // Запрашиваем и получаем данные модели, с описанием книг. Для добавления их по кнопке - "Еще несколько книг". Данные сортируются.
    $http.get('books/booksSort.json').success(function(data) {
            $scope.booksSort = data;
    });
    // Функция показа, отсортированного массива книг.
    $scope.addBook = function() {
        // Показываем заголовок над добавленными книгами и сам блок с новыми книгами, делаем видимым.
        angular.element(".heading__sort").css({'display' : 'block'});
        angular.element(".book__boxMain").css({'opacity' : '1'});

        // Функция сортировки массива, в случайном порядке
        function compareRandom(a, b) {
            return Math.random() - 0.5;
        }

        // Сортируем массив книг
        $scope.sortBooks = $scope.booksSort.sort(compareRandom);
    }

    // Функционал переворачивания изображения Скраффи на 360 градусов, при клике на кнопку "Купить за...".
    $scope.rotate = angular.element("#scraffi");
    $scope.button = angular.element(".book__button");

    // Функция переворачивания картинки туда и обратно, на 360 градусов, ее увеличения и уменьшения
    $scope.buyBook = function() {
        var css = {
            '-webkit-transition' : 'all 1.5s linear 0s',
	        '-moz-transition' : 'all 1.5s linear 0s',
	        '-o-transition' : 'all 1.5s linear 0s',
	        'transition' : 'all 1.5s linear 0s',

            '-webkit-transform' : 'rotate(360deg)',
	        '-moz-transform' : 'rotate(360deg)',
	        '-ms-transform' : 'rotate(360deg)',
	        '-o-transform' : 'rotate(360deg)',
	        'transform' : 'rotate(360deg)',
            'width' : '100px'

        },
        css_back = {
            '-webkit-transition' : 'all 1.5s linear 0s',
	        '-moz-transition' : 'all 1.5s linear 0s',
	        '-o-transition' : 'all 1.5s linear 0s',
	        'transition' : 'all 1.5s linear 0s',

            '-webkit-transform' : 'rotate(-360deg)',
	        '-moz-transform' : 'rotate(-360deg)',
	        '-ms-transform' : 'rotate(-360deg)',
	        '-o-transform' : 'rotate(-360deg)',
	        'transform' : 'rotate(-360deg)',
            'width' : '70px'

        };

        $scope.rotate.css(css);
        $scope.button.mouseleave(function(){$scope.rotate.css(css_back);});
    }

    // Функция анимации, перелистывания картинок с эффектом глаза голубя, при наведении курсора, на книгу "История земли".
    $scope.animation = function() {
        var iid;
        var imgSrc = [
            "assets/images/eyeStage1.png", "assets/images/eyeStage1.png",
            "assets/images/eyeStage1.png", "assets/images/eyeStage2.png", "assets/images/eyeStage3.png", "assets/images/eyeStage4.png", "assets/images/eyeStage5.png", "assets/images/eyeStage6.png",
            "assets/images/eyeStage6.png", "assets/images/eyeStage5.png", "assets/images/eyeStage4.png", "assets/images/eyeStage3.png", "assets/images/eyeStage2.png", "assets/images/eyeStage1.png"
        ];
        var curImg = 0;

        angular.element(".book__eye").bind('mouseover', function() {
            iid = setInterval(function() {
                curImg < imgSrc.length-1 ? ++curImg : curImg = 0;
                angular.element("#eyeStage_img").attr("src", imgSrc[curImg]);
            }, 200);
        });

        angular.element(".book__eye").bind('mouseout', function() { clearInterval(iid); curImg = 0; this.src=imgSrc[0]});
    }

    $scope.placeholder = "Поиск, скорее всего не работает";
}]);