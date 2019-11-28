var TablaMaquina = $('#tabla_maquina').DataTable({
    "language": {
        "emptyTable": "No hay maquina",
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
function init(){
    MostrarMaquinas();
}
function events() {
    //evento modal agregar  
    $(document).on('click', '#btn_agregar', function () {
        $('#txt_nombre').val('');
        $('#txt_fabricante').val('');
        $('#btn_modificar').css('display', 'none');
        $('#btn_guardar').css('display', 'block');
        $('#modal_agregarmaquina').modal('show');
        //$('#modal_agregarmaquina').modal('hide');
    })

    //evento para guardar nueva fila
    $(document).on('click', '#btn_guardar', function () {
        var nombre = $('#txt_nombre').val();
        var fabricante = $('#txt_fabricante').val();
        AgregarMaquina(nombre,fabricante);
        $('#modal_agregarmaquina').modal('hide');
    })

    //evento para editar
    $(document).on('click', '.btn-editar', function () {
        var MaquinaID = $(this).attr('data-maquinaID');
        var Nombre = $(this).attr('data-nombre');
        var Fabricante = $(this).attr('data-fabricante');
        $('#btn_modificar').css('display', 'block');
        $('#btn_modificar').attr('data-maquinaID', MaquinaID);
        $('#txt_nombre').val(Nombre);
        $('#txt_fabricante').val(Fabricante);
        //$('#btn_modificar').attr('data-nombre', Nombre);
        $('#btn_guardar').css('display', 'none');
        $('#modal_agregarmaquina').modal('show');
    })
    $(document).on('click', '#btn_modificar', function () {
        var MaquinaID = $(this).attr('data-maquinaID');
        var Nombre = $('#txt_nombre').val();
        var Fabricante = $('#txt_fabricante').val();
        EditarMaquina(MaquinaID, Nombre, Fabricante);
        $('#modal_agregarmaquina').modal('hide');
    })

    //evento para eliminar
    $(document).on('click', '.btn-eliminar', function (e) {
        var MaquinaID = $(this).attr('data-maquinaID');
        e.preventDefault();
        Swal.fire({
            title: 'ELIMINAR',
            text: '¿Estas seguro de eliminar?',
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                EliminarMaquina(MaquinaID);
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

//Carga la tabla inicial de las maquinas
function MostrarMaquinas() {
    TablaMaquina.clear().draw();
    $.ajax({
        url: 'MostrarMaquina',
        type: 'POST',
        success: function (response) {
            $.each(response, function (i, item) {
                ////    //$('#select-function').append('<option value="' + item.JobCode + '">' + item.JobName + '</option>')
                ////    console.log(item.EjercicioID,item.Nombre,item.Imagen);
                //row += '<tr class="gradeX odd" role="row">';
                //row += '<td>' + item.MaquinaID + '</td>';
                //row += '<td>' + item.Nombre + '</td>';
                //row += '<td>' + item.Fabricante + '</td>';
                //row += '<td><button type="button" class="btn btn-xs btn-warning m-r-5 m-b-5 btn-editar" data-maquinaid="' + item.MaquinaID + '" data-nombre="' + item.Nombre + '" data-fabricante="' + item.Fabricante +'"><i class="fas fa-edit"></i></button><button type="button" class="btn btn-xs btn-danger m-r-5 m-b-5 btn-eliminar" data-maquinaid="' + item.MaquinaID + '"><i class="fas fa-trash-alt"></i></button></td>';
                //row += '</tr>';
                TablaMaquina.row.add([item.MaquinaID, item.Nombre, item.Fabricante, '<button type="button" class="btn btn-xs btn-warning m-r-5 m-b-5 btn-editar" data-maquinaid="' + item.MaquinaID + '" data-nombre="' + item.Nombre + '"><i class="fas fa-edit"></i></button><button type="button" class="btn btn-xs btn-danger m-r-5 m-b-5 btn-eliminar" data-maquinaid="' + item.MaquinaID + '"><i class="fas fa-trash-alt"></i></button>']).draw();
            })
            //$('#data-table-default tbody').append(row);
            console.log(response);
        },
        complete: function () {
        }
    })
}
function AgregarMaquina(nombre, fabricante) {
    var data = {};
    data.nombre = nombre;
    data.fabricante = fabricante;
    console.log(data);
    $.ajax({
        url: 'AgregarMaquina',
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
                MostrarMaquinas();
            } else {
                $.gritter.add({
                    title: 'Error',
                    text: response[0].Mensaje,
                    //class_name: 'gritter-light'
                });
            }
            console.log(response);
        },
        complete: function () {
        }
    })
}

function EditarMaquina(MaquinaID, nombre, fabricante) {
    var data = {};
    data.MaquinaID = MaquinaID;
    data.Nombre = nombre;
    data.Fabricante = fabricante;
    console.log(data);
    $.ajax({
        url: 'EditarMaquina',
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
                MostrarMaquinas();
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

function EliminarMaquina(MaquinaID) {
    var data = {};
    data.MaquinaID = MaquinaID;
    $.ajax({
        url: 'EliminarMaquina',
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
                MostrarMaquinas();
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