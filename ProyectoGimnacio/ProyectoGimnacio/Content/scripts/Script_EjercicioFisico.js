$(document).ready(function () {
    init();
    events();
});
function init() {
    MostrarMaquinas();
    MostrarEjercicios();
    MostrarMusculos();
    $('#select2-ejercicio').select2({ placeholder: "Seleccionar ejercicio" });
    $('#select2-musculo').select2({ placeholder: "Seleccionar musculo" });
    $('#select2-maquina').select2({ placeholder: "Seleccionar maquina" });
    MostrarEjercicioFisico();
}
function events() {
    $(document).on('click', '#btn_guardar', function () {
        var ejercicio = $('#select2-ejercicio').val();
        var maquina = $('#select2-maquina').val();
        var musculo = $('#select2-musculo').val();
        AgregarEjercicioFisico(ejercicio, maquina,musculo);
        $('#modal_ejerciciofisico').modal('hide');
    })

    $(document).on('click', '#btn_modalagregar', function () {
        $('#modal_ejerciciofisico').modal('show');
    })
}

function MostrarEjercicioFisico() {
    console.log('se cargo los ejercicios fisicos');
    var rsp;
    $.ajax({
        url: 'MostrarEjercicioFisico',
        type: 'POST',
        success: function (response) {
            $.each(response, function (i, item) {
                
            })
            console.log(response);
        },
        complete: function () {
        }
    })
}

function AgregarEjercicioFisico(ejercicio,maquina,musculo) {
    var data = {};
    data.EjercicioID = ejercicio;
    data.MaquinaID = maquina;
    data.MusculoID = musculo;
    console.log(data);
    $.ajax({
        url: 'AgregarEjercicioFisico',
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

function MostrarMaquinas() {
    $('#select2-maquina').val(null).trigger('change');
    console.log('se cargo las maquinas');
    var rsp;
    $.ajax({
        url: 'MostrarMaquina',
        type: 'POST',
        success: function (response) {
            $.each(response, function (i, item) {
                var data = {
                    id: item.MaquinaID,
                    text: item.Nombre
                };
                var newOption = new Option(data.text, data.id, false, false);
                $('#select2-maquina').append(newOption).trigger('change');
            })
            console.log(response);
            $('#select2-maquina').val(-1);
            $('#select2-maquina').trigger('change');
        },
        complete: function () {
        }
    })
}

function MostrarEjercicios() {
    $('#select2-ejercicio').val(null).trigger('change');
    console.log('se cargo los ejercicios');
    $.ajax({
        url: 'MostrarEjercicio',
        type: 'POST',
        success: function (response) {
            $.each(response, function (i, item) {
                var data = {
                    id: item.EjercicioID,
                    text: item.Nombre
                };
                var newOption = new Option(data.text, data.id, false, false);
                $('#select2-ejercicio').append(newOption).trigger('change');
            })
            $('#select2-ejercicio').val(-1);
            $('#select2-ejercicio').trigger('change');
            console.log(response);
        },
        complete: function () {
        }
    })
}

function MostrarMusculos() {
    $('#select2-musculo').val(null).trigger('change');
    console.log('se cargo los ejercicios');
    $.ajax({
        url: 'MostrarMusculo',
        type: 'POST',
        success: function (response) {
            $.each(response, function (i, item) {
                var data = {
                    id: item.MusculoID,
                    text: item.Nombre
                };
                var newOption = new Option(data.text, data.id, false, false);
                $('#select2-musculo').append(newOption).trigger('change');
            })
            console.log(response);
            $('#select2-musculo').val(-1);
            $('#select2-musculo').trigger('change');
        },
        complete: function () {
        }
    })
}