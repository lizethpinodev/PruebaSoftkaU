using PruebaSoftkaU.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PruebaSoftkaU.Controllers
{
    public class AplicacionController : ApiController
    {
        private readonly Categoria categoria = new Categoria();
        [HttpGet]
        public IHttpActionResult ObtenerCategorias()
        {
            return Ok(categoria.Listar());
        }
        [HttpGet]
        public IHttpActionResult CategoriaXNivel(int nivel)
        {
            return Ok(categoria.ObtenerXNivel(nivel));
        }
        [HttpGet]
        public IHttpActionResult PreguntaXCategoria(int nivel)
        {
            var preguntas = categoria.ObtenerXNivel(nivel).Preguntas;
            Random random = new Random();
            int id = random.Next(1, 5);
            return Ok(preguntas.Select(x => new Pregunta { Id = x.Id, Enunciado = x.Enunciado, Opciones = x.Opciones }).FirstOrDefault(x => x.Id == id));
        }
        [HttpGet]
        public IHttpActionResult ValidarRespuesta(int nivel, int idPregunta, string opcion)
        {
            bool continuar = false;
            var categorias = categoria.Listar();
            if (categorias.FirstOrDefault(x => x.Nivel == nivel).Preguntas.FirstOrDefault(x => x.Id == idPregunta).Respuesta == opcion)
            {
                continuar = true;
            }
            return Ok(continuar);
        }
    }
}
