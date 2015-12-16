// Функция конструктор, возвращающая объект с необходимыми параметрами, для отслеживания drag-and-drop-перемещения блоков с картинками.
var ApiService = function()
{

    var dragSrcEl = null;

    ApiService.prototype.handleDragStart = function(e) {
        this.style.opacity = '0.3';

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    ApiService.prototype.handleDragOver = function (e) {
        this.style.opacity = '1';

        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }

            e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

            return false;
    }

    ApiService.prototype.handleDragEnter = function(e) {
        // this / e.target is the current hover target.
        this.classList.add('over');
    }

    ApiService.prototype.handleDragLeave = function(e) {
        this.classList.remove('over');  // this / e.target is previous target element.
    }

    ApiService.prototype.handleDrop = function(e) {

        if (e.stopPropagation) {
            e.stopPropagation();
        }

        if (dragSrcEl != this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
        }

        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    ApiService.prototype.handleDragEnd = function(e) {
        this.style.opacity = '1';

        [].forEach.call(cols, function (col) {
            col.classList.remove('over');
        });
    }

    var cols = document.querySelectorAll('#book__boxs .book__box');
    [].forEach.call(cols, function(col) {
        col.addEventListener('dragstart', ApiService.prototype.handleDragStart, false);
        col.addEventListener('dragenter', ApiService.prototype.handleDragEnter, false);
        col.addEventListener('dragover', ApiService.prototype.handleDragOver, false);
        col.addEventListener('dragleave', ApiService.prototype.handleDragLeave, false);
        col.addEventListener('drop', ApiService.prototype.handleDrop, false);
        col.addEventListener('dragend', ApiService.prototype.handleDragEnd, false);
    });
}
    
var apiInstance = new ApiService();
mifApp.factory('api', function() { return apiInstance });