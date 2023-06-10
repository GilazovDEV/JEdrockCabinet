$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const sign = urlParams.get('sign');
    const id = urlParams.get('id');

    $("#buy-btn").click(function() {
        if (!sign || !id) {
            return alert('Данные для транзакции не были получены, купить проходку не получится!');
        }
        $("#modal").fadeIn();
    });

    $(".close, #modal").click(function() {
        $("#modal").fadeOut();
    });

    $(".modal-content").click(function(e) {
        e.stopPropagation();
    });

    $("#submit-btn").click(function() {
        const nickname = $("#nickname").val();
        const phone = $("#phone").val();
        const email = $("#email").val();

        if (!nickname) {
            return alert('Заполните поле ника!');
        }
        if (!phone) {
            return alert('Заполните поле контактов!');
        }
        if (!email) {
            return alert('Заполните поле почты!');
        }
        const sum = 75

        const data = [
            {
                name: "Проходка JEdrock",
                count: 1,
                price: 75.00,
                type: "commodity"
            }
        ];
          
        const json = JSON.stringify(data);
        const cashitems = btoa(unescape(encodeURIComponent(json)));

        const payLinc = `https://unitpay.ru/pay/441192-bb72d?sum=${sum}&account=${id}&desc=Проходка JEdrock&signature=${sign}&customerEmail=${encodeURIComponent(email)}&customerPhone=${encodeURIComponent(phone)}&cashItems=${cashitems}`.replaceAll(' ', '%20')

        // POST запрос
        $.ajax({
            url: 'https://pay.uniworlds.fun/api/',
            method: 'POST',
            data: {
                nickname: nickname,
                phone: phone,
                email: email,
                id: id
            },
            success: function(response) {
                console.log(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });

        window.open(payLinc);
    });
});