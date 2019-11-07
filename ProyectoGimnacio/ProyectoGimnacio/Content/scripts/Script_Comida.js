﻿$(document).ready(function () {
    init();
    events();
});

function init() {
    $('#select2-alimento').select2({ placeholder: "Selecciona alimento" });
    MostrarComidas();
}

function events() {
    $(document).on('click', '#btn_agregar', function () {
        var nombre = $('#txt_nombre').val();
        var alimentoID = $('#select2-alimento').val();
        AgregarAlimento(nombre,alimentoID);
        $('#modal_agregaralimentos').modal('hide');
    })
}

//Carga la tabla inicial de los alimentos
function MostrarComidas() {
    console.log('se cargo las comidas');
    //$.ajax({
    //    url: 'Nutricion/MostrarComidas',
    //    type: 'POST',
    //    success: function (response) {
    //        $.each(response, function (i, item) {
    //            $('#select-function').append('<option value="' + item.JobCode + '">' + item.JobName + '</option>')
    //        })
    //    },
    //    complete: function(){
    //    }
    //})
}

function AgregarAlimento(nombre,alimentoID) {
    var data = {};
    data.nombre = nombre;
    data.alimentoID = alimentoID;
    console.log(data);
    //$.ajax({
    //    url: 'Nutricion/AgregarComidas',
    //    type: 'POST',
    //    data: data,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (response) {
    //        $.each(response, function (i, item) {
    //            //$('#select-function').append('<option value="' + item.JobCode + '">' + item.JobName + '</option>')
    //        })
    //    },
    //    complete: function(){
    //    }
    //})
}