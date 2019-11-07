﻿$(document).ready(function () {
    init();
    events();
});

function init() {
    MostrarAlimentos();
}

function events() {
    $(document).on('click', '#btn_guardar', function () {
        var nombre = $('#txt_nombre').val();
        var proteinas = $('#txt_proteinas').val();
        var grasa = $('#txt_grasa').val();
        var carbohidratos = $('#txt_carbohidratos').val();
        AgregarAlimentos(nombre,proteinas,grasa,carbohidratos);
        $('#modal_agregaralimentos').modal('hide');
    })
}

//Carga la tabla inicial de los alimentos
function MostrarAlimentos() {
    console.log('se cargo los alimentos');
    $.ajax({
        url: 'Nutricion/MostrarAlimentos',
       type: 'POST',
        success: function (response) {
            $.each(response, function (i, item) {
                //$('#select-function').append('<option value="' + item.JobCode + '">' + item.JobName + '</option>')
                
            })
        },
        complete: function(){
        }
    })
}

function AgregarAlimentos(nombre,proteinas,grasa,carbohidratos) {
    var data = {};
    data.nombre = nombre;
    data.proteinas = proteinas;
    data.grasa = grasa;
    data.carbohidratos=carbohidratos;
    console.log(data);
    $.ajax({
        url: 'AgregarAlimentos',
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