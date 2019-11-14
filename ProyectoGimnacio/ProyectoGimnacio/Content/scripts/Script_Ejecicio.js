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
function MostrarEjercicios() {
    $('#data-table-default tbody').html('');
    console.log('se cargo los ejercicios');
    var row="";
    $.ajax({
        url: 'MostrarEjercicio',
        type: 'POST',
        success: function (response) {
            $.each(response, function (i, item) {
            //    //$('#select-function').append('<option value="' + item.JobCode + '">' + item.JobName + '</option>')
            //    console.log(item.EjercicioID,item.Nombre,item.Imagen);
                row += '<tr class="gradeX odd" role="row">';
                row += '<td>' + item.EjercicioID + '</td>';
                row += '<td>' + item.Imagen + '</td>';
                row += '<td>' + item.Nombre + '</td>';
                row += '</tr>';
            })
            $('#data-table-default tbody').append(row);
            console.log(response);
        },
        complete: function(){
        }
    })
}

function AgregarEjercicio(nombre) {
    var data = {};
    data.Nombre = nombre;
    data.Imagen = "Imagen";
    console.log(data);
    $.ajax({
        url: 'AgregarEjercicio',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response[0].Valor=='1') {
                $.gritter.add({
                    title: ':)',
                    text: response[0].Mensaje,
                    //class_name: 'gritter-light'
                });
            } else {
                $.gritter.add({
                    title: 'Error',
                    text: response[0].Mensaje
                    //class_name: 'gritter-light'
                });
            }
            console.log(response);
        },
        complete: function(){
        }
    })
}