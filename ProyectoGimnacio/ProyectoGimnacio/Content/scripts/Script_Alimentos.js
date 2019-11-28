var TablaAlimentos = $('#tabla_alimentos').DataTable({
    "language": {
        "emptyTable": "No hay alimentos",
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
    MostrarAlimento();
}

function events() {
    //evento modal agregar  
    $(document).on('click', '#btn_agregar', function () {
        $('#txt_nombre').val('');
        $('#txt_calorias').val('');
        $('#txt_proteinas').val('');
        $('#txt_grasa').val('');
        $('#txt_carbohidratos').val('');
        $('#btn_modificar').css('display', 'none');
        $('#btn_guardar').css('display', 'block');
        $('#modal_agregaralimento').modal('show');
        //$('#modal_agregaralimento').modal('hide');
    })

    //evento para guardar nueva fila
    $(document).on('click', '#btn_guardar', function () {
        var nombre = $('#txt_nombre').val();
        var calorias = $('#txt_calorias').val(); 
        var proteinas = $('#txt_proteinas').val();
        var grasa = $('#txt_grasa').val();
        var carbohidratos = $('#txt_carbohidratos').val();
        AgregarAlimento(nombre, calorias, proteinas, grasa, carbohidratos);
        $('#modal_agregaralimento').modal('hide');
    })

    //evento para editar
    $(document).on('click', '.btn-editar', function () {
        var AlimentoID = $(this).attr('data-alimentoID');
        var Nombre = $(this).attr('data-nombre');
        var Calorias = $(this).attr('data-calorias');
        var Proteinas = $(this).attr('data-proteinas');
        var Grasa = $(this).attr('data-grasa');
        var Carbohidratos = $(this).attr('data-carbohidratos');
        $('#btn_modificar').css('display', 'block');
        $('#btn_modificar').attr('data-alimentoID', AlimentoID);
        $('#txt_nombre').val(Nombre);
        $('#txt_calorias').val(Calorias);
        $('#txt_proteinas').val(Proteinas);
        $('#txt_grasa').val(Grasa);
        $('#txt_carbohidratos').val(Carbohidratos);
        //$('#btn_modificar').attr('data-nombre', Nombre);
        $('#btn_guardar').css('display', 'none');
        $('#modal_agregaralimento').modal('show');
    })

    $(document).on('click', '#btn_modificar', function () {
        var AlimentoID = $(this).attr('data-alimentoID');
        var Nombre = $('#txt_nombre').val();
        var Calorias = $('#txt_calorias').val();
        var Proteinas = $('#txt_proteinas').val();
        var Grasa = $('#txt_grasa').val();
        var Carbohidratos = $('#txt_carbohidratos').val();
        EditarAlimento(AlimentoID, Nombre, Calorias, Proteinas, Grasa, Carbohidratos);
        $('#modal_agregaralimento').modal('hide');
    })

    //evento para eliminar
    $(document).on('click', '.btn-eliminar', function (e) {
        var AlimentoID = $(this).attr('data-alimentoID');
        e.preventDefault();
        Swal.fire({
            title: 'ELIMINAR',
            text: '¿Estas seguro de eliminar?',
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                EliminarAlimento(AlimentoID);
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
            }
        })
    })
}

function upload() {
    console.log('13');
}

//Carga la tabla inicial de alimento
function MostrarAlimento() {
    TablaAlimentos.clear().draw();
    $.ajax({
        url: 'MostrarAlimento',
       type: 'POST',
        success: function (response) {
            $.each(response, function (i, item) {
                ////$('#select-function').append('<option value="' + item.JobCode + '">' + item.JobName + '</option>')
                //row += '<tr class="gradeX odd" role="row">';
                //row += '<td>' + item.AlimentoID + '</td>';
                //row += '<td>' + item.Nombre + '</td>';
                //row += '<td>' + item.Calorias + '</td>';
                //row += '<td>' + item.Proteinas + '</td>';
                //row += '<td>' + item.Grasas + '</td>';
                //row += '<td>' + item.Carbohidratos + '</td>';
                //row += '<td>' + item.Peso + '</td>';
                //row += '<td><button type="button" class="btn btn-xs btn-warning m-r-5 m-b-5 btn-editar" data-alimentoid="' + item.AlimentoID + '" data-nombre="' + item.Nombre + '" data-calorias="' + item.Calorias + '" data-proteinas="' + item.Proteinas + '" data-grasa="' + item.Grasas + '" data-carbohidratos="' + item.Carbohidratos + '"><i class="fas fa-edit"></i></button><button type="button" class="btn btn-xs btn-danger m-r-5 m-b-5 btn-eliminar" data-alimentoid="' + item.AlimentoID + '"><i class="fas fa-trash-alt"></i></button></td>';
                //row += '</tr>';
                TablaAlimentos.row.add([item.AlimentoID, item.Nombre, item.Calorias, item.Proteinas, item.Grasas, item.Carbohidratos, item.Peso, '<button type="button" class="btn btn-xs btn-warning m-r-5 m-b-5 btn-editar" data-alimentoid="' + item.AlimentoID + '" data-nombre="' + item.Nombre + '" data-calorias="' + item.Calorias + '" data-proteinas="' + item.Proteinas + '" data-grasas="' + item.Grasa + '" data-carbohidratos="' + item.Carbohidratos +'"><i class="fas fa-edit"></i></button><button type="button" class="btn btn-xs btn-danger m-r-5 m-b-5 btn-eliminar" data-alimentoid="' + item.AlimentoID + '"><i class="fas fa-trash-alt"></i></button>']).draw();

            })
            console.log(response);
        },

        complete: function(){
        }   
    })
}

function AgregarAlimento(nombre, calorias, proteinas, grasa, carbohidratos) {
    var data = {};
    data.nombre = nombre;
    data.calorias = calorias;
    data.proteinas = proteinas;
    data.grasa = grasa;
    data.carbohidratos = carbohidratos;
    console.log(data);
    $.ajax({
        url: 'AgregarAlimento',
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

function EditarAlimento(AlimentoID, nombre, calorias, proteinas, grasa, carbohidratos) {
        var data = {};
        data.AlimentoID = AlimentoID;
        data.Nombre = nombre;
        data.Calorias = calorias;
        data.Proteinas = proteinas;
        data.Grasas = grasa;
        data.Carbohidratos = carbohidratos;
        console.log(data);
        $.ajax({
            url: 'EditarAlimento',
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

function EliminarAlimento(AlimentoID) {
        var data = {};
        data.AlimentoID = AlimentoID;
        $.ajax({
            url: 'EliminarAlimento',
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