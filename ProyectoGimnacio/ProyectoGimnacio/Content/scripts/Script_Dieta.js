var ArrayDetalleDieta = new Array();

var TablaDetalle = $('#tabla_dietadetalle').DataTable({
    paging: false,
    searching: false,
    ordering: false,
    "language": {
        "emptyTable": "Sin Registros",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ filas",
        "infoEmpty": "Sin filas"
    }
});

var TablaDieta = $('#tabla_dieta').DataTable({
    "language": {
        "emptyTable": "Sin Registros",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ filas",
        "infoEmpty": "Sin filas",
        "sLengthMenu": "Mostrar _MENU_ filas",
        "sSearch": "Buscar"
    }
});

$('#select2-comida').select2({
    ajax: {
        url: 'MostrarComida',
        dataType: 'json',
        delay: 250,
        data: function (params) {
            return {
                q: params.term,
                page: params.page
            };
        },
        processResults: function (data) {
            return {
                results: $.map(data, function (obj) {
                    return {
                        id: obj.ComidaID,
                        text: obj.Nombre
                    };
                })
            };
        },
        cache: false
    },
    // minimumInputLength: 3,
    tags: true,
    placeholder: 'Selecciona un Comida'
});

$('#select2-horario').select2({
    ajax: {
        url: 'MostrarHorario',
        dataType: 'json',
        delay: 250,
        data: function (params) {
            return {
                q: params.term,
                page: params.page
            };
        },
        processResults: function (data) {
            return {
                results: $.map(data, function (obj) {
                    return {
                        id: obj.HorarioID,
                        text: obj.Nombre
                    };
                })
            };
        },
        cache: false
    },
    // minimumInputLength: 3,
    tags: true,
    placeholder: 'Selecciona un Horario'
});

$(document).ready(function () {
    
    init();
    events();
});

function init() {
    MostrarDietas();
}


function events() {
    //agregar dieta nueva
    $(document).on('click', '#btn_agregar', function () {
        $('#txt_nombre').val('');
        $('#select2-comida').val(-1);
        $('#select2-comida').trigger('change');
        $('#select2-horario').val(-1);
        $('#select2-horario').trigger('change');
        $('#btn_modificar').css('display', 'none');
        $('#btn_guardar').css('display', 'block');
        ArrayDetalleDieta = new Array();
        $('#modal_agregardieta').modal('show');
    })


    $(document).on('click', '#btn_guardar', function () {
        var nombre = $('#txt_nombre').val();
        if (ArrayDetalleDieta.length == 0 || nombre == '') {
            $.gritter.add({
                title: 'ADEVERTENCIA',
                text: 'Faltan Datos'//response[0].Mensaje
            });
            return;
        }
        AgregarDieta(nombre);
        $('#modal_agregardieta').modal('hide');
    })

    //evento para agregar un alimento al detalle de la comida
    $(document).on('click', '#btn_agregardetalle', function () {
        var Comida = $('#select2-comida').select2('data')[0];
        var Horario = $('#select2-horario').select2('data')[0];
        var ComidaID = Comida.id;
        var ComidaNombre = Comida.text;
        var HorarioID = Horario.id;
        var HorarioNombre = Horario.text;

        var ExisteDietaDetalle = false;

        $.each(ArrayDetalleDieta, function (i, item) {
            if (item.ComidaID == ComidaID && item.HorarioID == HorarioID) {
                ExisteDietaDetalle = true;
                return;
            }
        });

        if (ExisteDietaDetalle == false) {
            ArrayDetalleDieta.push({
                ComidaID: ComidaID,
                HorarioID: HorarioID
            });
            TablaDetalle.row.add([ComidaNombre, HorarioNombre, '<button type="button" class="btn btn-xs btn-danger m-r-5 m-b-5 btn-eliminardetalle"><i class="fas fa-trash-alt"></i></button>']).draw();
        } else {
            $.gritter.add({
                title: 'ERROR',
                text: 'Los datos ya existe en el detalle'//response[0].Mensaje
            });
        }
    })

    //evento para eliminar el detalle de la dieta creada
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
                var tableRow = TablaDetalle.row($(this).parents('tr'));
                TablaDetalle.row(tableRow).remove().draw();
                var Indice = tableRow[0][0];
                ArrayDetalleDieta.splice(Indice, 1);
                Swal.fire(
                  'Eliminado',
                  'El detalle se elimino',
                  'success'
                )
            }
        })
    })

    //evento para editar
    $(document).on('click', '.btn-editar', function () {
        $('#txt_nombre').val('');
        $('#select2-comida').val(-1);
        $('#select2-comida').trigger('change');
        $('#select2-horario').val(-1);
        $('#select2-horario').trigger('change');
        ArrayDetalleDieta = new Array();
        var DietaID = $(this).attr('data-dietaid');
        var Nombre = $(this).attr('data-nombre');
        $('#btn_modificar').css('display', 'block');
        $('#btn_modificar').attr('data-dietaid', DietaID);
        $('#txt_nombre').val(Nombre);
        $('#btn_guardar').css('display', 'none');
        MostrarDetalleDieta(DietaID);
        $('#modal_agregardieta').modal('show');
    })

    //evento para eliminar
    $(document).on('click', '.btn-eliminar', function (e) {
        var DietaID = $(this).attr('data-dietaid');
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
                EliminarDieta(DietaID);
                Swal.fire(
                  'Eliminado',
                  'La comida se elimino',
                  'success'
                )
            }
        })
    })
}

function MostrarDietas() {
    TablaDieta.clear().draw();
    $.ajax({
        url: 'MostrarDieta',
        type: 'POST',
        success: function (response) {
            $.each(response, function (i, item) {
                TablaDieta.row.add([item.DietaID, item.Nombre, '<button type="button" class="btn btn-xs btn-warning m-r-5 m-b-5 btn-editar" data-dietaid="' + item.DietaID + '" data-nombre="' + item.Nombre + '"><i class="fas fa-edit"></i></button><button type="button" class="btn btn-xs btn-danger m-r-5 m-b-5 btn-eliminar" data-dietaid="' + item.DietaID + '"><i class="fas fa-trash-alt"></i></button>']).draw();
            })
        },
        complete: function () {
        }
    })
}

//Carga el detalle de la dieta
function MostrarDetalleDieta(DietaID) {
    TablaDetalle.clear().draw();
    var data = {};
    data.DietaID = DietaID;
    $.ajax({
        url: 'MostrarDetalleDieta',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $.each(response, function (i, item) {
                TablaDetalle.row.add([item.NombreComida, item.NombreHorario, '<button type="button" class="btn btn-xs btn-danger m-r-5 m-b-5 btn-eliminardetalle"><i class="fas fa-trash-alt"></i></button>']).draw();
                ArrayDetalleDieta.push({
                    ComidaID: item.ComidaID,
                    HorarioID: item.HorarioID,
                });
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

function AgregarDieta(nombre) {
    var data = {};
    data.nombre = nombre;
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
                var DietaID = response[0].Mensaje;
                $.each(ArrayDetalleDieta, function (i, item) {
                    AgregarDetalleDieta(DietaID, item.ComidaID, item.HorarioID);
                });
            } else {
                $.gritter.add({
                    title: 'Error',
                    text: response[0].Mensaje,
                    class_name: 'gritter-light'
                });
            }
            console.log(response);
            MostrarDietas();
        },
        complete: function () {
        }
    })
}

function AgregarDetalleDieta(DietaID, ComidaID, HorarioID) {
    var data = {};
    data.DietaID = DietaID;
    data.ComidaID = ComidaID;
    data.HorarioID = HorarioID;
    $.ajax({
        url: 'AgregarDetalleDieta',
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

function EditarDieta(DietaID, Nombre) {
    var data = {};
    data.DietaID = DietaID;
    data.Nombre = Nombre;
    $.ajax({
        url: 'EditarDieta',
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
                $.each(ArrayDetalleDieta, function (i, item) {
                    AgregarDetalleDieta(DietaID, item.ComidaID, item.HorarioID);
                });
            } else {
                $.gritter.add({
                    title: 'Error',
                    text: response[0].Mensaje
                    //class_name: 'gritter-light'
                });
            }
            console.log(response);
            MostrarDietas();
        },
        complete: function () {
        }
    })
}

function EliminarDieta(DietaID) {
    var data = {};
    data.DietaID = DietaID;
    $.ajax({
        url: 'EliminarDieta',
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
                MostrarDietas();
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

