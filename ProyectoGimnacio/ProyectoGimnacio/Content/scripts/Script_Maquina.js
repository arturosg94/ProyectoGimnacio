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
    console.log('se cargo las maquinas');
}
function AgregarMaquina(nombre,fabricante) {
    var data = {};
    data.nombre = nombre;
    data.fabricante = fabricante;
    console.log(data);
    
}