using Newtonsoft.Json;
using PruebaSoftkaU.Utilidades;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace PruebaSoftkaU.Models
{
    public class Categoria
    {
        public int Nivel { get; set; }
        public string NombreCategoria { get; set; }
        public List<Pregunta> Preguntas { get; set; }
        //Obtener Todos
        public List<Categoria> Listar()
        {
            string path = HttpContext.Current.Server.MapPath("~/") + "LocalDB\\db.json";
            string db = JsonFile.ObtenerArchivoJson(path);
            ListaCategorias lista = new ListaCategorias();
            lista = JsonConvert.DeserializeObject<ListaCategorias>(db);
            return lista.Categorias;
        }
        //Obtener por Nivel
        public Categoria ObtenerXNivel(int nivel)
        {
            return Listar().FirstOrDefault(x => x.Nivel == nivel);
        }

    }
    public class ListaCategorias
    {
        public List<Categoria> Categorias { get; set; }
    }
}