
window.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.querySelector('.hamburger'),
        nav = document.querySelector('.nav'),
        navItem = document.querySelectorAll('.nav__item');

    //Открытие/закрытие меню 
    hamburger.addEventListener('click', () => {
        if (nav.classList.contains('nav_active')) {
            nav.classList.remove('nav_active');
            document.body.style.overflow = ''; 
        } else {
            nav.classList.add('nav_active');
            document.body.style.overflow = 'hidden';
        }
        
    });
    //Закрытие меню по нажатию на ссылку
    navItem.forEach(item => {
        item.addEventListener('click', (e) => {
            if(e.target && e.target.classList.contains('nav__item-link')) {
                nav.classList.remove('nav_active');
                document.body.style.overflow = '';
            }
        });
    });

    const modal = document.querySelector('.modal'),
        modalClose = document.querySelector('.modal__close'),
        modalSuccess = document.querySelector('.modal__success'),
        modalError = document.querySelector('modal__error');

    modal.addEventListener('click', (e) => {
        if(e.target && e.target == modalClose) {
            modal.style.display = 'none';
        }
    });

    

    //Отправка данных на сервер
    function send (event, php){
        console.log("Отправка запроса");
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        var req = new XMLHttpRequest();
        req.open('POST', php, true);
        req.onload = function() {
            if (req.status >= 200 && req.status < 400) {
            json = JSON.parse(this.response); // internet explorer 11
                console.log(json);
                
                // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
                if (json.result == "success") {
                    // Если сообщение отправлено
                    alert("Сообщение отправлено");
                    // modal.style.display = 'flex';
                    // modalSuccess.style.display = 'block';
                } else {
                    // Если произошла ошибка
                    alert("Ошибка. Сообщение не отправлено");
                    // modalSuccess.style.display = '';
                    // modalError.style.display = 'block';
                }
            // Если не удалось связаться с php файлом
            } else {alert("Ошибка сервера. Номер: "+req.status);}}; 

        // Если не удалось отправить запрос. Стоит блок на хостинге
        req.onerror = function() {alert("Ошибка отправки запроса");};
        req.send(new FormData(event.target));
    }
});

