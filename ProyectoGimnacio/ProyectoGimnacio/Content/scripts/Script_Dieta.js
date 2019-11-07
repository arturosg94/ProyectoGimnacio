$(document).ready(function () {
    
    init();
    events();
});

function init() {
    $('#select2-comida').select2({ placeholder: "Selecciona Comida" });
    $('#select2-horario').select2({ placeholder: "Selecciona Horario" });
    MostrarDietas();
}


function events() {
    $(document).on('click', '#btn_agregar', function () {
        var comidaID = $('#select2-comida').val();
        var horarioID = $('#select2-horario').val();
        Agregar(comidaID, horarioID);
    })

    $(document).on('click', '#btn_guardar', function () {
        var nombre = $('#txt_nombre').val();
        AgregarDieta(nombre, alimentoID, horarioID);
        $('#modal_agregardieta').modal('hide');
    })
}

function MostrarDietas() {
    console.log('se cargo las dietas');
    $.ajax({
        url: 'Nutricion/MostrarDietas',
        type: 'POST',
        success: function (response) {
            $.each(response, function (i, item) {
                $('#select-function').append('<option value="' + item.JobCode + '">' + item.JobName + '</option>')
            })
        },
        complete: function () {
        }
    })
}

function Agregar(comidaID,horarioID) {
    var data = {};
    data.comidaID = comidaID;
    data.horaioID = horarioID;
    console.log(data);
    $.ajax({
        url: 'Agregar',
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

function AgregarDieta(nombre, comidaID, horaioID) {
    var data = {};
    data.nombre = nombre;
    data.comidaID = comidaID;
    data.horarioID = horarioID;
    console.log(data);
    $.ajax({
        url: 'AgregarDieta',
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

