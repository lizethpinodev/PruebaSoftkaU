var urlBase = "https://localhost:44317/api/Aplicacion/";

function obtenerPreguntaxNivel(nivel) {
    return new Promise(function (resolve, reject) {
        getAjax(urlBase + "PreguntaXCategoria?nivel=" + nivel).then(function (result) {
            resolve = result;
            resolve.Opciones = resolve.Opciones.sort(() => .5 - Math.random());
            $("#nivel" + nivel + " > [name='enunciado']").html(result.Enunciado);
            $("#nivel" + nivel + "A").next().find("[name='value']").html(resolve.Opciones[0]);
            $("#nivel" + nivel + "B").next().find("[name='value']").html(resolve.Opciones[1]);
            $("#nivel" + nivel + "C").next().find("[name='value']").html(resolve.Opciones[2]);
            $("#nivel" + nivel + "D").next().find("[name='value']").html(resolve.Opciones[3]);

        });

    });
}

function getAjax(url) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: url,
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json");
            },
            success: function (data) {
                resolve(data);
            }
        });
    });
}

var nivel = 0;



$(document).ready(function () {
});