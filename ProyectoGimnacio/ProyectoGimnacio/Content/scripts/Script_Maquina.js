$(document).ready(function () {
    init();
    events();
});
function init() {
    MostrarMaquinas();
}
function events() {
    $(document).on('click', '#btn_guardar', function () {
        var nombre = $('#txt_nombre').val();
        var fabricante = $('#txt_fabricante').val();
        AgregarMaquina(nombre,fabricante);
        $('#modal_agregarmaquina').modal('hide');
    })
}

function MostrarMaquinas() {
    $('#data-table-default tbody').html('');
    console.log('se cargo las maquinas');
    var row = "";
    var rsp;
    $.ajax({
        url: 'MostrarMaquina',
        type: 'POST',
        success: function (response) {
            $.each(response, function (i, item) {
                //    //$('#select-function').append('<option value="' + item.JobCode + '">' + item.JobName + '</option>')
                //    console.log(item.EjercicioID,item.Nombre,item.Imagen);
                row += '<tr class="gradeX odd" role="row">';
                row += '<td>' + item.MaquinaID + '</td>';
                row += '<td>' + item.Nombre + '</td>';
                row += '<td>' + item.Fabricante + '</td>';
                row += '</tr>';
            })
            $('#data-table-default tbody').append(row);
            console.log(response);
        },
        complete: function () {
        }
    })
}
function AgregarMaquina(nombre,fabricante) {
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
                    class_name: 'gritter-light'
                });
                MostrarMaquinas();
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