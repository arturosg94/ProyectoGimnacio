$(document).ready(function () {
    init();
    events();
});
function init() {
    $('#select2-ejercicio').select2({ placeholder: "Seleccionar ejercicio" });
    $('#select2-musculo').select2({ placeholder: "Seleccionar muscculo" });
    $('#select2-maquina').select2({ placeholder: "Seleccionar maquina" });
}
function events() {
    $(document).on('click', '#btn_guardar', function () {
        var ejercicio = $('#select2-ejercicio').val();
        var maquina = $('#select2-maquina').val();
        AgregarMaquina(nombre, fabricante);
        $('#modal_agregarmaquina').modal('hide');
    })
}

function MostrarMaquinas() {
    console.log('se cargo las maquinas');
}
function AgregarMaquina(nombre, fabricante) {
    var data = {};
    data.nombre = nombre;
    data.fabricante = fabricante;
    console.log(data);

}