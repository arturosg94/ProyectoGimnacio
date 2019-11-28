﻿var ArrayDetalleRutina = new Array();
var tablaDetalle = $('#tabla_detalle').DataTable({
    paging: false,
    searching: false,
    ordering: false,
    "language": {
        "emptyTable": "Ingrese un ejercico",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ filas",
        "infoEmpty": "Sin filas"
    }
});

var TablaRutina = $('#tabla_rutina').DataTable({
    "language": {
        "emptyTable": "No hay rutinas",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ filas",
        "infoEmpty": "Sin filas",
        "sLengthMenu": "Mostrar _MENU_ filas",
        "sSearch": "Buscar"
    }
});

$(document).ready(function () {
    init();
    events();
});
function init() {
    MostrarRutina();
    MostrarNivelRutina();
    MostrarTipoRutina();
    MostrarEjercicioFisico();
    $('#select2-nivelrutina').select2({ placeholder: "Seleccionar nivel de rutina" });
    $('#select2-tiporutina').select2({ placeholder: "Seleccionar tipo de rutina" });
    $('#select2-ejerciciofisico').select2({ placeholder: "Seleccionar ejercicio fisico" });
    $('#table_detalle').DataTable();
}

function events() {
    //evento modal agregar
    $(document).on('click', '#btn_agregar', function () {
        $('#txt_nombre').val('');
        $('#txt_series').val('');
        $('#txt_repeticiones').val('');
        $('#txt_peso').val('');
        $('#txt_descanso').val('');
        $('#select2-nivelrutina').val(-1);
        $('#select2-nivelrutina').trigger('change');
        $('#select2-tiporutina').val(-1);
        $('#select2-tiporutina').trigger('change');
        $('#select2-ejerciciofisico').val(-1);
        $('#select2-ejerciciofisico').trigger('change');
        $('#btn_modificar').css('display', 'none');
        $('#btn_guardar').css('display', 'block');
        tablaDetalle.clear().draw();
        ArrayDetalleRutina = new Array();
        $('#modal_rutina').modal('show');
    })

    //evento para guardar nueva nueva rutina
    $(document).on('click', '#btn_guardar', function () {
        //var nombre = $('#txt_nombre').val();
        //AgregarEjercicio(nombre);
        //$('#modal_agregarejercicio').modal('hide');

        //var data = tablaDetalle.rows().data();
        //console.log(data);
        var Nombre = $('#txt_nombre').val();
        var NivelRutinaID = $('#select2-nivelrutina').val();
        var TipoRutinaID = $('#select2-tiporutina').val();

        AgregarRutina(Nombre, NivelRutinaID, TipoRutinaID);
        $('#modal_rutina').modal('hide');
    })

    //evento para agregar un ejercicio fisico al detalle de la rutina
    $(document).on('click', '#btn_agregardetalle', function () {
        var EjercicioFisico = $('#select2-ejerciciofisico').select2('data');
        var EjercicioFisicoID = EjercicioFisico[0].id;
        var EjercicioFisicoNombre = EjercicioFisico[0].text;
        var Series = $('#txt_series').val();
        var Repeticiones = $('#txt_repeticiones').val();
        var Peso = $('#txt_peso').val();
        var Descanso = $('#txt_descanso').val();

        var ExisteEjercicio = false;

        $.each(ArrayDetalleRutina, function (i, item) {
            if (item.EjercicioFisicoID == EjercicioFisicoID) {
                ExisteEjercicio = true;
                return;
            }
        });

        if (ExisteEjercicio == false) {
            ArrayDetalleRutina.push({
                EjercicioFisicoID: EjercicioFisicoID,
                EjercicioFisicoNombre: EjercicioFisicoNombre,
                Series: Series,
                Repeticiones: Repeticiones,
                Peso: Peso,
                Descanso: Descanso
            });
            tablaDetalle.row.add([EjercicioFisicoNombre, Series, Repeticiones, Peso, Descanso, '<button type="button" class="btn btn-xs btn-danger m-r-5 m-b-5 btn-eliminardetalle"><i class="fas fa-trash-alt"></i></button>']).draw();
        } else {
            $.gritter.add({
                title: 'ERROR',
                text: 'El ejercicio fisico ya existe en el detalle'//response[0].Mensaje
            });
        }

    })

    //evento para editar
    $(document).on('click', '.btn-editar', function () {
        $('#txt_series').val('');
        $('#txt_repeticiones').val('');
        $('#txt_peso').val('');
        $('#txt_descanso').val('');
        ArrayDetalleRutina = new Array();
        var RutinaID = $(this).attr('data-rutinaid');
        var Nombre = $(this).attr('data-nombre');
        var TipoRutinaID = $(this).attr('data-tiporutinaid');
        var NivelRutinaID = $(this).attr('data-nivelrutinaid');
        $('#btn_modificar').css('display', 'block');
        $('#btn_modificar').attr('data-rutinaid', RutinaID);
        $('#txt_nombre').val(Nombre);
        $('#select2-nivelrutina').val(NivelRutinaID);
        $('#select2-nivelrutina').trigger('change');
        $('#select2-tiporutina').val(TipoRutinaID);
        $('#select2-tiporutina').trigger('change');
        $('#select2-ejerciciofisico').val(-1);
        $('#select2-ejerciciofisico').trigger('change');
        $('#btn_guardar').css('display', 'none');
        MostrarDetalleRutina(RutinaID);
        $('#modal_rutina').modal('show');
    })
    //actualiza la cabecera de la rutina y elimina su detalle para despues insertar el detalle actualizado
    $(document).on('click', '#btn_modificar', function () {
        var RutinaID = $(this).attr('data-rutinaid');
        var Nombre = $('#txt_nombre').val();
        var NivelRutinaID = $('#select2-nivelrutina').val();
        var TipoRutinaID = $('#select2-tiporutina').val();
        EditarRutina(RutinaID, Nombre, NivelRutinaID, TipoRutinaID);
        $('#modal_rutina').modal('hide');
    })

    //evento para eliminar
    $(document).on('click', '.btn-eliminar', function (e) {
        var RutinaID = $(this).attr('data-rutinaid');
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
                EliminarRutina(RutinaID);
                Swal.fire(
                  'Eliminado',
                  'La rutina se elimino',
                  'success'
                )
            }
        })
    })

    //evento para eliminar el detalle de la rutina creada
    $(document).on('click', '.btn-eliminardetalle', function (e) {
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
                var tableRow = tablaDetalle.row($(this).parents('tr'));
                tablaDetalle.row(tableRow).remove().draw();
                var Indice = tableRow[0][0];
                ArrayDetalleRutina.splice(Indice,1);
                Swal.fire(
                  'Eliminado',
                  'El ejercicio se elimino',
                  'success'
                )
            }
        })
    })

    $(document).on('keyup', '.solo-numeros', function () {
        this.value = (this.value + '').replace(/[^0-9.]/g, '');
    });
}

//Carga la tabla inicial de las rutinas
function MostrarRutina() {
    //$('#data-table-default tbody').html('');
    TablaRutina.clear().draw();
    $.ajax({
        url: 'MostrarRutina',
        type: 'POST',
        success: function (response) {
            $.each(response, function (i, item) {
                //    //$('#select-function').append('<option value="' + item.JobCode + '">' + item.JobName + '</option>')
                //    console.log(item.EjercicioID,item.Nombre,item.Imagen);
                //row += '<tr class="gradeX odd" role="row">';
                //row += '<td>' + item.EjercicioID + '</td>';
                //row += '<td>' + item.Imagen + '</td>';
                //row += '<td>' + item.Nombre + '</td>';
                //row += '<td><button type="button" class="btn btn-xs btn-warning m-r-5 m-b-5 btn-editar" data-ejercicioid="' + item.EjercicioID + '" data-nombre="' + item.Nombre + '"><i class="fas fa-edit"></i></button><button type="button" class="btn btn-xs btn-danger m-r-5 m-b-5 btn-eliminar" data-ejercicioid="' + item.EjercicioID + '"><i class="fas fa-trash-alt"></i></button></td>';
                //row += '</tr>';
                TablaRutina.row.add([item.RutinaID, item.Nombre, item.NivelRutinaNombre, item.TipoRutinaNombre, '<button type="button" class="btn btn-xs btn-warning m-r-5 m-b-5 btn-editar" data-rutinaid="' + item.RutinaID + '" data-nombre="' + item.Nombre + '" data-tiporutinaid="' + item.TipoRutinaID + '" data-nivelrutinaid="' + item.NivelRutinaID + '"><i class="fas fa-edit"></i></button><button type="button" class="btn btn-xs btn-danger m-r-5 m-b-5 btn-eliminar" data-rutinaid="' + item.RutinaID + '"><i class="fas fa-trash-alt"></i></button>']).draw();
            })
            //$('#data-table-default tbody').append(row);
            console.log(response);
        },
        complete: function () {
        }
    })
}

//Carga la rutina par a ver los ejercicios fisicos
function MostrarDetalleRutina(RutinaID) {
    //$('#data-table-default tbody').html('');
    tablaDetalle.clear().draw();
    var data = {};
    data.RutinaID = RutinaID;
    $.ajax({
        url: 'MostrarDetalleRutina',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $.each(response, function (i, item) {
                //    //$('#select-function').append('<option value="' + item.JobCode + '">' + item.JobName + '</option>')
                //    console.log(item.EjercicioID,item.Nombre,item.Imagen);
                //row += '<tr class="gradeX odd" role="row">';
                //row += '<td>' + item.EjercicioID + '</td>';
                //row += '<td>' + item.Imagen + '</td>';
                //row += '<td>' + item.Nombre + '</td>';
                //row += '<td><button type="button" class="btn btn-xs btn-warning m-r-5 m-b-5 btn-editar" data-ejercicioid="' + item.EjercicioID + '" data-nombre="' + item.Nombre + '"><i class="fas fa-edit"></i></button><button type="button" class="btn btn-xs btn-danger m-r-5 m-b-5 btn-eliminar" data-ejercicioid="' + item.EjercicioID + '"><i class="fas fa-trash-alt"></i></button></td>';
                //row += '</tr>';
                tablaDetalle.row.add([item.EjercicioFisicoNombre, item.Series, item.Repeticiones, item.Peso, item.Descanso, '<button type="button" class="btn btn-xs btn-danger m-r-5 m-b-5 btn-eliminardetalle"><i class="fas fa-trash-alt"></i></button>']).draw();
                ArrayDetalleRutina.push({
                    EjercicioFisicoID: item.EjercicioFisicoID,
                    EjercicioFisicoNombre: item.EjercicioFisicoNombre,
                    Series: item.Series,
                    Repeticiones: item.Repeticiones,
                    Peso: item.Peso,
                    Descanso: item.Descanso
                });
            })
            //$('#data-table-default tbody').append(row);
            console.log(response);
        },
        complete: function () {
        }
    })
}

function AgregarRutina(Nombre, NivelRutinaID, TipoRutinaID) {
    var data = {};
    data.Nombre = Nombre;
    data.NivelRutinaID = NivelRutinaID;
    data.TipoRutinaID = TipoRutinaID;
    console.log(data);
    $.ajax({
        url: 'AgregarRutina',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response[0].Valor == '1') {
                $.gritter.add({
                    title: ':)',
                    text: 'Rutina Agregada'//response[0].Mensaje
                });
                var RutinaID = response[0].Mensaje;
                
                $.each(ArrayDetalleRutina, function (i, item) {
                    AgregarRutinaDetalle(RutinaID,item.EjercicioFisicoID, item.Series, item.Repeticiones, item.Peso, item.Descanso);
                });
            } else {
                $.gritter.add({
                    title: 'Error',
                    text: response[0].Mensaje
                });
            }
            console.log(response);
            MostrarRutina();
        },
        complete: function () {
        }
    })
}

function AgregarRutinaDetalle(RutinaID, EjercicioFisicoID, Series, Repeticiones, Peso, Descanso) {
    var data = {};
    data.RutinaID = RutinaID;
    data.EjercicioFisicoID = EjercicioFisicoID;
    data.Series = Series;
    data.Repeticiones = Repeticiones;
    data.Peso = Peso;
    data.Descanso = Descanso;
    $.ajax({
        url: 'AgregarDetalleRutina',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response[0].Valor == '1') {
            //    $.gritter.add({
            //        title: ':)',
            //        text: response[0].Mensaje
            //    });
            } else {
                //$.gritter.add({
                //    title: 'Error',
                //    text: response[0].Mensaje
                //});
            }
            console.log(response);
        },
        complete: function () {
            //MostrarRutina();
        }
    })
}

function MostrarNivelRutina() {
    $('#select2-nivelrutina').val(null).trigger('change');
    console.log('se cargo los ejercicios');
    $.ajax({
        url: 'MostrarNivelRutina',
        type: 'POST',
        success: function (response) {
            $.each(response, function (i, item) {
                var data = {
                    id: item.NivelRutinaID,
                    text: item.Nombre
                };
                var newOption = new Option(data.text, data.id, false, false);
                $('#select2-nivelrutina').append(newOption).trigger('change');
            })
            $('#select2-nivelrutina').val(-1);
            $('#select2-nivelrutina').trigger('change');
            console.log(response);
        },
        complete: function () {
        }
    })
}

function MostrarTipoRutina() {
    $('#select2-tiporutina').val(null).trigger('change');
    console.log('se cargo los ejercicios');
    $.ajax({
        url: 'MostrarTipoRutina',
        type: 'POST',
        success: function (response) {
            $.each(response, function (i, item) {
                var data = {
                    id: item.TipoRutinaID,
                    text: item.Nombre
                };
                var newOption = new Option(data.text, data.id, false, false);
                $('#select2-tiporutina').append(newOption).trigger('change');
            })
            $('#select2-tiporutina').val(-1);
            $('#select2-tiporutina').trigger('change');
            console.log(response);
        },
        complete: function () {
        }
    })
}

function MostrarEjercicioFisico() {
    $('#select2-ejerciciofisico').val(null).trigger('change');
    $.ajax({
        url: 'MostrarEjercicioFisico',
        type: 'POST',
        success: function (response) {
            $.each(response, function (i, item) {
                var data = {
                    id: item.EjercicioFisicoID,
                    text: item.EjercicioNombre + '-' +item.MaquinaNombre
                };
                var newOption = new Option(data.text, data.id, false, false);
                $('#select2-ejerciciofisico').append(newOption).trigger('change');
            })
            $('#select2-ejerciciofisico').val(-1);
            $('#select2-ejerciciofisico').trigger('change');
            console.log(response);
        },
        complete: function () {
        }
    })
}

function EliminarRutina(RutinaID) {
    var data = {};
    data.RutinaID = RutinaID;
    $.ajax({
        url: 'EliminarRutina',
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
                MostrarRutina();
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

function EditarRutina(RutinaID, Nombre, NivelRutinaID, TipoRutinaID) {
    var data = {};
    data.RutinaID = RutinaID;
    data.Nombre = Nombre;
    data.NivelRutinaID = NivelRutinaID;
    data.TipoRutinaID = TipoRutinaID;
    console.log(data);
    $.ajax({
        url: 'EditarRutina',
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
                $.each(ArrayDetalleRutina, function (i, item) {
                    AgregarRutinaDetalle(RutinaID, item.EjercicioFisicoID, item.Series, item.Repeticiones, item.Peso, item.Descanso);
                });
            } else {
                $.gritter.add({
                    title: 'Error',
                    text: response[0].Mensaje
                    //class_name: 'gritter-light'
                });
            }
            console.log(response);
            MostrarRutina();
        },
        complete: function () {
        }
    })
}