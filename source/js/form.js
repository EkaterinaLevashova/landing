(function() {
    let me = {};
    let form = document.querySelector('.form-container');
    let closeButton = null;

    function onClose() {       //при клике на крестик навешивает функцию добавления класса is-hidden  
        me.close();
        closeButton.removeEventListener('click', onClose)
    }

    me.open = function() {
        form.classList.remove('is-hidden');     //убирает scss класс is-hidden

        closeButton = document.querySelector('.form__close-button');
        closeButton.addEventListener('click', onClose)      //добавляет обработчик на крестик
    };

    me.close = function() {
        form.classList.add('is-hidden');
    };

    window.form = me;
}());