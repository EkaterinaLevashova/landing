(function() {
    let openFormButton = document.querySelector('.arrow-down');

    if(openFormButton) {
        openFormButton.addEventListener('click', function(e) {
            e.preventDefault(); //действие по умолчанию (в данном случае переход нка страницу #)
            form.open();
        })
    }
}());