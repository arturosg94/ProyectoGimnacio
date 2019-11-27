$(document).ready(function () {
    init();
    events();
});
function init(){
    MostrarEjercicios();
}
function events() {
    //evento modal agregar
    $(document).on('click', '#btn_agregar', function () {
        $('#txt_nombre').val('');
        $('#btn_modificar').css('display', 'none');
        $('#btn_guardar').css('display', 'block');
        $('#modal_agregarejercicio').modal('show');
        //$('#modal_agregarejercicio').modal('hide');
    })

    //evento para guardar nueva fila
    $(document).on('click', '#btn_guardar', function () {
        var nombre = $('#txt_nombre').val();
        AgregarEjercicio(nombre);
        $('#modal_agregarejercicio').modal('hide');
    })

    //evento para editar
    $(document).on('click', '.btn-editar', function () {
        var EjercicioID = $(this).attr('data-ejercicioID');
        var Nombre = $(this).attr('data-nombre');
        $('#btn_modificar').css('display', 'block');
        $('#btn_modificar').attr('data-ejercicioID', EjercicioID);
        $('#txt_nombre').val(Nombre);
        //$('#btn_modificar').attr('data-nombre', Nombre);
        $('#btn_guardar').css('display', 'none');
        $('#modal_agregarejercicio').modal('show');
    })
    $(document).on('click', '#btn_modificar', function () {
        var EjercicioID = $(this).attr('data-ejercicioID');
        var Nombre = $('#txt_nombre').val();
        EditarEjercicio(EjercicioID, Nombre);
        $('#modal_agregarejercicio').modal('hide');
    })

    //evento para eliminar
    $(document).on('click', '.btn-eliminar', function (e) {
        var EjercicioID = $(this).attr('data-ejercicioID');
        e.preventDefault();
        Swal.fire({
            title: 'ELIMINAR',
            text: '¿Estas seguro de eliminar?',
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                EliminarEjercicio(EjercicioID);
                Swal.fire(
                  'Eliminado',
                  'El ejercicio se elimino',
                  'success'
                )
            }
        })
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
                row += '<td><button type="button" class="btn btn-xs btn-warning m-r-5 m-b-5 btn-editar" data-ejercicioid="' + item.EjercicioID + '" data-nombre="' + item.Nombre + '"><i class="fas fa-edit"></i></button><button type="button" class="btn btn-xs btn-danger m-r-5 m-b-5 btn-eliminar" data-ejercicioid="' + item.EjercicioID + '"><i class="fas fa-trash-alt"></i></button></td>';
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
                MostrarEjercicios();
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

function EditarEjercicio(EjercicioID,nombre) {
    var data = {};
    data.EjercicioID = EjercicioID;
    data.Nombre = nombre;
    data.Imagen = "Imagen";
    console.log(data);
    $.ajax({
        url: 'EditarEjercicio',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response[0].Valor == '1') {
                $.gritter.add({
                    title: ':)',
                    text: response[0].Mensaje,
                    //class_name: 'gritter-light'
                });
                MostrarEjercicios();
            } else {
                $.gritter.add({
                    title: 'Error',
                    text: response[0].Mensaje
                    //class_name: 'gritter-light'
                });
            }
            console.log(response);
        },
        complete: function () {
        }
    })
}

function EliminarEjercicio(EjercicioID) {
    var data = {};
    data.EjercicioID = EjercicioID;
    $.ajax({
        url: 'EliminarEjercicio',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response[0].Valor == '1') {
                $.gritter.add({
                    title: ':)',
                    text: response[0].Mensaje,
                    //class_name: 'gritter-light'
                });
                MostrarEjercicios();
            } else {
                $.gritter.add({
                    title: 'Error',
                    text: response[0].Mensaje
                    //class_name: 'gritter-light'
                });
            }
        },
        complete: function () {
        }
    })
}