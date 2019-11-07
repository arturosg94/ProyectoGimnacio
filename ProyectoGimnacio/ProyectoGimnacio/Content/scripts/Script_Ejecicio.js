$(document).ready(function () {
    init();
    events();
});

function init(){
    MostrarEjercicios();
}

function events() {
    $(document).on('click', '#btn_guardar', function () {
        var nombre = $('#txt_nombre').val();
        AgregarEjercicio(nombre);
        $('#modal_agregarejercicio').modal('hide');
    })
}

function upload() {
    console.log('13');
}

//Carga la tabla inicial de los ejercicos
function CargarMaquinas() {
    console.log('se cargo los ejercicios');
    //$.ajax({
    //    url: 'Entrenamiento/CargarEjercicios',
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

function AgregarEjercicio(nombre) {
    var data = {};
    data.nombre = nombre;
    console.log(data);
    //$.ajax({
    //    url: 'Entrenamiento/AgregarEjercicio',
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