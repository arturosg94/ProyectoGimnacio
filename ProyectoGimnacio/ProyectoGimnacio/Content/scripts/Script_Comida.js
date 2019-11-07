$(document).ready(function () {
    init();
    events();
});

function init() {
    $('#select2-alimento').select2({ placeholder: "Selecciona alimento" });
    MostrarComidas();
}

function events() {
    $(document).on('click', '#btn_agregar', function () {
        var alimentoID = $('#select2-alimento').val();
        AgregarAlimento(alimentoID);
        //insertar en la tabla el alimento seleccionado
    })

    $(document).on('click', '#btn_guardar', function () {
        var nombre = $('#txt_nombre').val();
        AgregarComida(nombre, alimentoID);
        $('#modal_agregarcomida').modal('hide');
    })
}

//Carga la tabla inicial de los alimentos
function MostrarComidas() {
    console.log('se cargo las comidas');
    $.ajax({
        url: 'Nutricion/MostrarComidas',
        type: 'POST',
        success: function (response) {
            $.each(response, function (i, item) {
                $('#select-function').append('<option value="' + item.JobCode + '">' + item.JobName + '</option>')
            })
        },
        complete: function(){
        }
    })
}

function AgregarAlimento(alimentoID) {
    var data = {};
    data.alimentoID = alimentoID;
    console.log(data);
    $.ajax({
        url: 'AgregarAlimento',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response[0].Valor == '1') {
                $.gritter.add({
                    title: ':)',
                    text: response[0].Mensaje,
                    class_name: 'gritter-light'
                });
            } else {
                $.gritter.add({
                    title: 'Error',
                    text: response[0].Mensaje,
                    class_name: 'gritter-light'
                });
            }
            console.log(response);
        },
        complete: function () {
        }
    })
}

function AgregarComida(nombre,alimentoID) {
    var data = {};
    data.nombre = nombre;
    data.alimentoID = alimentoID;
    console.log(data);
    $.ajax({
        url: 'AgregarComida',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response[0].Valor == '1') {
                $.gritter.add({
                    title: ':)',
                    text: response[0].Mensaje,
                    class_name: 'gritter-light'
                });
            } else {
                $.gritter.add({
                    title: 'Error',
                    text: response[0].Mensaje,
                    class_name: 'gritter-light'
                });
            }
            console.log(response);
        },
        complete: function () {
        }
    })
}