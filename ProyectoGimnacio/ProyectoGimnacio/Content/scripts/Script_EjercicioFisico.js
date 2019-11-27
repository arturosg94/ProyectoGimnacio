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
    //evento para guardar nueva fila
    $(document).on('click', '#btn_guardar', function () {
        var ejercicio = $('#select2-ejercicio').val();
        var maquina = $('#select2-maquina').val();
        var musculo = $('#select2-musculo').val();
        AgregarEjercicioFisico(ejercicio, maquina,musculo);
        $('#modal_ejerciciofisico').modal('hide');
    })

    //evento modal agregar
    $(document).on('click', '#btn_modalagregar', function () {
        $('#select2-maquina').val(-1);
        $('#select2-maquina').trigger('change');
        $('#select2-musculo').val(-1);
        $('#select2-musculo').trigger('change');
        $('#select2-ejercicio').val(-1);
        $('#select2-ejercicio').trigger('change');
        $('#btn_modificar').css('display', 'none');
        $('#btn_guardar').css('display', 'block');
        $('#modal_ejerciciofisico').modal('show');
    })

    //evento para editar
    $(document).on('click', '.btn-editar', function () {
        var EjercicioFisicoID = $(this).attr('data-ejerciciofisicoid');
        var EjercicioID = $(this).attr('data-ejercicioid');
        var MaquinaID = $(this).attr('data-maquinaid');
        var MusculoID = $(this).attr('data-musculoid');
        $('#btn_modificar').css('display', 'block');
        $('#btn_guardar').css('display', 'none');
        $('#btn_modificar').attr('data-ejerciciofisicoid', EjercicioFisicoID);
        //setea los combos
        $('#select2-maquina').val(MaquinaID);
        $('#select2-maquina').trigger('change');
        $('#select2-musculo').val(MusculoID);
        $('#select2-musculo').trigger('change');
        $('#select2-ejercicio').val(EjercicioID);
        $('#select2-ejercicio').trigger('change');
        
        $('#modal_ejerciciofisico').modal('show');
    })
    $(document).on('click', '#btn_modificar', function () {
        var EjercicioFisicoID = $(this).attr('data-ejerciciofisicoid');
        var EjercicioID = $('#select2-ejercicio').val();
        var MaquinaID = $('#select2-maquina').val();
        var MusculoID = $('#select2-musculo').val();
        EditarEjercicioFisico(EjercicioFisicoID, EjercicioID, MaquinaID, MusculoID);
        $('#modal_ejerciciofisico').modal('hide');
    })

    //evento para eliminar
    $(document).on('click', '.btn-eliminar', function (e) {
        var EjercicioFisicoID = $(this).attr('data-ejerciciofisicoid');
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
                EliminarEjercicioFisico(EjercicioFisicoID);
                Swal.fire(
                  'Eliminado',
                  'El ejercicio se elimino',
                  'success'
                )
            }
        })
    })
}

function MostrarEjercicioFisico() {
    console.log('se cargo los ejercicios fisicos');
    $('#data-table-default tbody').html('');
    var row = "";
    $.ajax({
        url: 'MostrarEjercicioFisico',
        type: 'POST',
        success: function (response) {
            $.each(response, function (i, item) {
                row += '<tr class="gradeX odd" role="row">';
                row += '<td>' + item.EjercicioFisicoID + '</td>';
                row += '<td>' + item.EjercicioNombre + '</td>';
                row += '<td>' + item.MusculoNombre + '</td>';
                row += '<td>' + item.MaquinaNombre + '</td>';
                row += '<td><button type="button" class="btn btn-xs btn-warning m-r-5 m-b-5 btn-editar" data-ejerciciofisicoid="' + item.EjercicioFisicoID + '" data-ejercicioid="' + item.EjercicioID + '"data-maquinaid="' + item.MaquinaID + '"data-musculoid="' + item.MusculoID + '"><i class="fas fa-edit"></i></button><button type="button" class="btn btn-xs btn-danger m-r-5 m-b-5 btn-eliminar" data-ejerciciofisicoid="' + item.EjercicioFisicoID + '"><i class="fas fa-trash-alt"></i></button></td>';
                row += '</tr>';
            })
            $('#data-table-default tbody').append(row);
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
            $('#select2-musculo').val(-1);
            $('#select2-musculo').trigger('change');
        },
        complete: function () {
        }
    })
}

function EditarEjercicioFisico(EjercicioFisicoID, EjercicioID, MaquinaID, MusculoID) {
    var data = {};
    data.EjercicioFisicoID = EjercicioFisicoID;
    data.EjercicioID = EjercicioID;
    data.MaquinaID = MaquinaID;
    data.MusculoID = MusculoID;
    $.ajax({
        url: 'EditarEjercicioFisico',
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
                MostrarEjercicioFisico()
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
                MostrarEjercicioFisico()
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