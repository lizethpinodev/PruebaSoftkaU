var urlBase = "https://localhost:44317/api/Aplicacion/";

function obtenerPreguntaxNivel(nivel) {
    return new Promise(function (resolve, reject) {
        getAjax(urlBase + "PreguntaXCategoria?nivel=" + nivel).then(function (result) {
            resolve = result;
            resolve.Opciones = resolve.Opciones.sort(() => .5 - Math.random());
            $("#nivel" + nivel + " > [name='enunciado']").attr("id", result.Id);
            $("#nivel" + nivel + " > [name='enunciado']").html(result.Enunciado);
            $("#nivel" + nivel + "A").next().find("[name='value']").html(resolve.Opciones[0]);
            $("#nivel" + nivel + "B").next().find("[name='value']").html(resolve.Opciones[1]);
            $("#nivel" + nivel + "C").next().find("[name='value']").html(resolve.Opciones[2]);
            $("#nivel" + nivel + "D").next().find("[name='value']").html(resolve.Opciones[3]);
            puntuacionFutura = parseInt(resolve.Puntaje);
        });

    });
}

function validarRespuesta(elem) {
    $(elem).attr("disabled", "disabled");
    let level = elem.name.substring(elem.name.length - 1);
    let idPregunta = $("#nivel" + level + " > [name='enunciado']").attr("id");
    let opcion = $("[name='nivel" + level + "']:checked").next().find("[name='value']").html();
    let url = urlBase + "ValidarRespuesta?nivel=" + level + "&idPregunta=" + idPregunta + "&opcion=" + opcion;
    getAjax(url).then(function (result) {
        if (result) {
            puntuacionActual += parseInt(puntuacionFutura);
            alert("Muy bien. Has ganado: " + puntuacionFutura + " puntos.\nTu puntaje ahora es: " + puntuacionActual + " puntos.");
            $('.btn-next').show();
            $('.btn-exit').attr("disabled", "disabled");
            if (level == 5) {
                registrarPuntaje(puntuacionActual);
                alert("Felicitaciones has superado exitosamente este reto con una puntuación de: " + puntuacionActual + " puntos.");
                location.reload();
            }
        }
        else {
            alert("Lo sentimos. Has fallado en responder. Vuelve a intentarlo");
            registrarPuntaje(0);
            location.reload();
        }
        return false;
    });
}

function abandonar() {
    if (confirm('¿Seguro quieres abandonar el reto?')) {
        registrarPuntaje(puntuacionActual);
        alert("Hasta luego " + $("#nombre").val() + "Se ha registrado tu puntaje: " + puntuacionActual + " puntos.");
        puntuacionActual = 0;
        location.reload();
    }
}

function registrarPuntaje(puntaje) {
    let registro = {
        Nombre: $("#nombre").val(),
        Puntaje: puntaje,
        Fecha: Date.now()
    }
    postAjax(urlBase + "GuardarPuntaje", registro);
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
function postAjax(url, dato) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            data: JSON.stringify(dato),
            url: url,
            contentType: "application/json",
            success: function (data) {
                resolve(data);
            }
        });
    });
}

var nivel = 0;
var puntuacionActual = 0;
var puntuacionFutura = 0;

$(document).ready(function () {
    $(".btn-iniciar").click(function (e) {
        $(".btn-next").click();
    });
    $("input:radio").change(function (e) {
        if ($(this).is(":checked"))
            $("input:button[name='" + this.name + "']").removeAttr('disabled');
    });
    $('.wizard-navigation').click(false);
});