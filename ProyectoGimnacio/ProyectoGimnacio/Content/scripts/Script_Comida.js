var ArrayDetalleComida = new Array();

var TablaDetalle = $('#tabla_detalle').DataTable({
    paging: false,
    searching: false,
    ordering: false,
    "language": {
        "emptyTable": "Sin Registros",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ filas",
        "infoEmpty": "Sin filas"
    }
});

var TablaComida = $('#tabla_comida').DataTable({
    "language": {
        "emptyTable": "Sin Registros",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ filas",
        "infoEmpty": "Sin filas",
        "sLengthMenu": "Mostrar _MENU_ filas",
        "sSearch": "Buscar"
    }
});

$('#select2-alimento').select2({
    ajax: {
        url: 'MostrarAlimento',
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
                        id: obj.AlimentoID,
                        text: obj.Nombre,
                        calorias: obj.Calorias,
                        proteinas: obj.Proteinas,
                        grasas: obj.Grasas,
                        carbohidratos: obj.Carbohidratos
                    };
                })
            };
        },
        cache: false
    },
   // minimumInputLength: 3,
    tags: true,
    placeholder: 'Selecciona un Alimento'
});

$(document).ready(function () {
    init();
    events();
});

function init() {
    //$('#select2-alimento').select2({ placeholder: "Selecciona alimento" });
    //MostrarAlimento();
    MostrarComidas();
}

function events() {
    //agregar comida nueva
    $(document).on('click', '#btn_agregar', function () {
        $('#txt_nombre').val('');
        $('#select2-alimento').val(-1);
        $('#select2-alimento').trigger('change');

        $('#btn_modificar').css('display', 'none');
        $('#btn_guardar').css('display', 'block');
        TablaDetalle.clear().draw();
        ArrayDetalleComida = new Array();
        CalcularValorNutricional();
        $('#modal_agregarcomida').modal('show');
    })

    //guardar comida nueva
    $(document).on('click', '#btn_guardar', function () {
        var nombre = $('#txt_nombre').val();
        if (ArrayDetalleComida.length == 0 || nombre == '') {
            $.gritter.add({
                title: 'ADEVERTENCIA',
                text: 'Faltan Datos'//response[0].Mensaje
            });
            return;
        }
        AgregarComida(nombre);
        $('#modal_agregarcomida').modal('hide');
    })

    //evento para agregar un alimento al detalle de la comida
    $(document).on('click', '#btn_agregardetalle', function () {
        var Alimento = $('#select2-alimento').select2('data')[0];
        var AlimentoID = Alimento.id;
        var AlimentoNombre = Alimento.text;
        var Calorias = Alimento.calorias;
        var Proteinas = Alimento.proteinas;
        var Carbohidratos = Alimento.carbohidratos;
        var Grasas = Alimento.grasas;

        var ExisteAlimento = false;

        $.each(ArrayDetalleComida, function (i, item) {
            if (item.AlimentoID == AlimentoID) {
                ExisteAlimento = true;
                return;
            }
        });

        if (ExisteAlimento == false) {
            ArrayDetalleComida.push({
                AlimentoID: AlimentoID,
                Calorias: Calorias,
                Proteinas: Proteinas,
                Carbohidratos: Carbohidratos,
                Grasas: Grasas
            });
            TablaDetalle.row.add([AlimentoNombre, Proteinas, Carbohidratos, Grasas, Calorias, '<button type="button" class="btn btn-xs btn-danger m-r-5 m-b-5 btn-eliminardetalle"><i class="fas fa-trash-alt"></i></button>']).draw();
            CalcularValorNutricional();
        } else {
            $.gritter.add({
                title: 'ERROR',
                text: 'El alimento ya existe en el detalle'//response[0].Mensaje
            });
        }

    })

    //evento para editar
    $(document).on('click', '.btn-editar', function () {
        $('#txt_nombre').val('');
        $('#select2-alimento').val(-1);
        $('#select2-alimento').trigger('change');
        ArrayDetalleComida = new Array();
        var ComidaID = $(this).attr('data-comidaid');
        var Nombre = $(this).attr('data-nombre');
        $('#btn_modificar').css('display', 'block');
        $('#btn_modificar').attr('data-comidaid', ComidaID);
        $('#txt_nombre').val(Nombre);
        $('#btn_guardar').css('display', 'none');
        MostrarDetalleComida(ComidaID);
        $('#modal_agregarcomida').modal('show');
    })
    //actualiza la cabecera de la comida y elimina su detalle para despues insertar el detalle actualizado
    $(document).on('click', '#btn_modificar', function () {
        var ComidaID = $(this).attr('data-comidaid');
        var Nombre = $('#txt_nombre').val();
        if (ArrayDetalleComida.length == 0 || Nombre == '') {
            $.gritter.add({
                title: 'ADEVERTENCIA',
                text: 'Faltan Datos'//response[0].Mensaje
            });
            return;
        }
        EditarComida(ComidaID, Nombre);
        $('#modal_agregarcomida').modal('hide');
    })

    //evento para eliminar
    $(document).on('click', '.btn-eliminar', function (e) {
        var ComidaID = $(this).attr('data-comidaid');
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
                EliminarComida(ComidaID);
                Swal.fire(
                  'Eliminado',
                  'La comida se elimino',
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
                var tableRow = TablaDetalle.row($(this).parents('tr'));
                TablaDetalle.row(tableRow).remove().draw();
                var Indice = tableRow[0][0];
                ArrayDetalleComida.splice(Indice, 1);
                CalcularValorNutricional();
                Swal.fire(
                  'Eliminado',
                  'El alimento se elimino',
                  'success'
                )
            }
        })
    })
}

//Carga la tabla inicial de los alimentos
function MostrarComidas() {
    TablaComida.clear().draw();
    $.ajax({
        url: 'MostrarComida',
        type: 'POST',
        success: function (response) {
            $.each(response, function (i, item) {
                TablaComida.row.add([item.ComidaID, item.Nombre, item.Proteinas, item.Carbohidratos, item.Grasas, item.Calorias, '<button type="button" class="btn btn-xs btn-warning m-r-5 m-b-5 btn-editar" data-comidaid="' + item.ComidaID + '" data-nombre="' + item.Nombre + '"><i class="fas fa-edit"></i></button><button type="button" class="btn btn-xs btn-danger m-r-5 m-b-5 btn-eliminar" data-comidaid="' + item.ComidaID + '"><i class="fas fa-trash-alt"></i></button>']).draw();
            })
        },
        complete: function(){
        }
    })
}

//Carga el detalle de la comida, los alimentos
function MostrarDetalleComida(ComidaID) {
    //$('#data-table-default tbody').html('');
    TablaDetalle.clear().draw();
    var data = {};
    data.ComidaID = ComidaID;
    $.ajax({
        url: 'MostrarDetalleComida',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $.each(response, function (i, item) {
                TablaDetalle.row.add([item.AlimentoNombre, item.Proteinas, item.Carbohidratos, item.Proteinas, item.Grasas, '<button type="button" class="btn btn-xs btn-danger m-r-5 m-b-5 btn-eliminardetalle"><i class="fas fa-trash-alt"></i></button>']).draw();
                ArrayDetalleComida.push({
                    AlimentoID: item.AlimentoID,
                    Calorias: item.Calorias,
                    Proteinas: item.Proteinas,
                    Carbohidratos: item.Carbohidratos,
                    Grasas: item.Grasas
                });
            })
            console.log(response);
            CalcularValorNutricional();
        },
        complete: function () {
        }
    })
}

function AgregarComida(nombre) {
    var data = {};
    data.nombre = nombre;
    $.ajax({
        url: 'AgregarComida',
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
                var ComidaID = response[0].Mensaje;
                $.each(ArrayDetalleComida, function (i, item) {
                    AgregarDetalleComida(ComidaID, item.AlimentoID);
                });
            } else {
                $.gritter.add({
                    title: 'Error',
                    text: response[0].Mensaje,
                    class_name: 'gritter-light'
                });
            }
            console.log(response);
            MostrarComidas();
        },
        complete: function () {
        }
    })
}

function AgregarDetalleComida(ComidaID, AlimentoID) {
    var data = {};
    data.ComidaID = ComidaID;
    data.AlimentoID = AlimentoID;
    $.ajax({
        url: 'AgregarDetalleComida',
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

function EditarComida(ComidaID, Nombre) {
    var data = {};
    data.ComidaID = ComidaID;
    data.Nombre = Nombre;
    $.ajax({
        url: 'EditarComida',
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
                $.each(ArrayDetalleComida, function (i, item) {
                    AgregarDetalleComida(ComidaID, item.AlimentoID);
                });
            } else {
                $.gritter.add({
                    title: 'Error',
                    text: response[0].Mensaje
                    //class_name: 'gritter-light'
                });
            }
            console.log(response);
            MostrarComidas();
        },
        complete: function () {
        }
    })
}

function EliminarComida(ComidaID) {
    var data = {};
    data.ComidaID = ComidaID;
    $.ajax({
        url: 'EliminarComida',
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
                MostrarComidas();
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

function MostrarAlimento() {
    $('#select2-alimento').val(null).trigger('change');
    $.ajax({
        url: 'MostrarAlimento',
        type: 'POST',
        success: function (response) {
            $.each(response, function (i, item) {
                var data = {
                    id: item.AlimentoID,
                    text: item.Nombre,
                    calorias: item.Calorias,
                    proteinas: item.Proteinas
                };
                var newOption = new Option(data.text, data.id,data.calorias,data.proteinas, false, false);
                $('#select2-alimento').append(newOption).trigger('change');
            })
            $('#select2-alimento').val(-1);
            $('#select2-alimento').trigger('change');
            console.log(response);
        },
        complete: function () {
        }
    })
}

function CalcularValorNutricional() {
    var TotalProteinas = 0;
    var TotalCarbohidratos = 0;
    var TotalGrasas = 0;
    var TotalCalorias = 0;
    if (ArrayDetalleComida.length != 0) {
        $.each(ArrayDetalleComida, function (i, item) {
            TotalProteinas += item.Proteinas;
            TotalCarbohidratos += item.Carbohidratos;
            TotalGrasas += item.Grasas;
            TotalCalorias += item.Calorias;
        });
    }
    $('#txt_totalproteinas').html(TotalProteinas);
    $('#txt_totalcarbohidratos').html(TotalCarbohidratos);
    $('#txt_totalgrasas').html(TotalGrasas);
    $('#txt_totalcalorias').html(TotalCalorias);
    
}