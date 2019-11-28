$(document).ready(function () {
    function init() {
        events();
    }
    function events() {
        $(document).on('submit', '#form-login', function (e) {
            e.preventDefault();
            var data = {};
            var DNI = $('#txt_dni').val();
            var contraseña = $('#txt_contraseña').val();
            data.DNI = DNI;
            data.Contraseña = contraseña;
            if (DNI == '' || contraseña == '') {
                if (data.DNI == '') {
                    $("#error-message").show();
                    $("#message").text('Ingrese DNI.')
                    return;
                }
                if (data.Contraseña == '') {
                    $("#login-error").show();
                    $("#message").text('Ingrese Contraseña.')
                    return;
                }

                //$("#form-login").parsley().validate();
                //return;
            }
            
            //window.location.href='DashBoard';
            $.ajax({
                url: 'Home/ValiUsuario',
                data: data,
                type: 'post',
                success: function (response) {
                    console.log(response);
                    if (response[0].Valor=='1') {
                        window.location.href = 'home';
                    } else if (response[0].Valor == '2') {
                        $.gritter.add({
                            title: 'Error',
                            text: response[0].Mensaje,
                            sticky: false,
                            class_name: 'gritter-error',
                            time: ''
                        });
                        $('#txt_contraseña').val('');
                        $('#txt_contraseña').focus();
                    } else {
                        $.gritter.add({
                            title: 'Error',
                            text: response[0].Mensaje,
                            sticky: false,
                            class_name: 'gritter-error',
                            time: ''
                        });
                        $('#txt_contraseña').val('');
                        $('#txt_dni').val('');
                        $('#txt_dni').focus();
                    }
                    
                }
            });
        })

        $(document).on('keyup', '.solo-numeros', function () {
            this.value = (this.value + '').replace(/[^0-9]/g, '');
        });
    }

    init();



})