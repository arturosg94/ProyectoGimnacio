$(document).ready(function () {
    function init() {
        events();
    }
    function events() {
        $(document).on('submit', '#form-login', function (e) {
            e.preventDefault();
            var data = {};
            var DNI = $('#txt_dni').val();
            var password = $('#txt_contraseña').val();
            if (DNI == '' || password == '') {
                if (data.Username == '') {
                    $("#error-message").show();
                    $("#message").text('Ingrese DNI.')
                    return;
                }
                if (data.Password == '') {
                    $("#login-error").show();
                    $("#message").text('Ingrese Contraseña.')
                    return;
                }

                //$("#form-login").parsley().validate();
                //return;
            }
            data.DNI = DNI;
            data.Password = password;
            //window.location.href='DashBoard';
            $.ajax({
                url: 'Home/LoginUser',
                data: data,
                type: 'post',
                success: function (response) {
                    //if (response == true) {
                    //    var data = {};
                    //    var rol;
                    //    data.UserNetName = $("#username").val();
                    //    $.ajax({
                    //        type: "POST",
                    //        url: "Home/CountRolesByUser",
                    //        data: JSON.stringify(data),
                    //        contentType: "application/json; charset=utf-8",
                    //        dataType: "json",
                    //        async: false,
                    //        success: function (response) {
                    //            if (response[0].CountR > 1) {
                    //                Roles_List();

                    //                setTimeout(function () { $('#modal-roles').modal('show'); }, 300);
                    //            } else {
                    //                AcessSystem_ByRol(data.UserNetName);
                    //            }
                    //        }
                    //    })
                    //} else {
                    //    $("#error-message").removeAttr('hidden');
                    //    $("#error-message").show('');
                    //    $("#message").text('Datos de Acceso no validos.');
                    //}
                    if (response=='1') {
                        window.location.href = 'home';
                    } else {

                    }
                    console.log(response);
                }
            });

        })
    }

    init();

})