using Newtonsoft.Json;
using PruebaSoftkaU.Utilidades;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PruebaSoftkaU.Models
{
    public class Registro
    {
        [Required]
        public string Nombre { get;set; }
        [Required]
        public int Puntaje { get;set; }        
        public DateTime FechaRegistro { get; set; }
        private readonly string path = HttpContext.Current.Server.MapPath("~/") + "LocalDB\\registros.json";
        public List<Registro> Listar()
        {
            
            string registro = JsonFile.ObtenerArchivoJson(path);
            List<Registro> lista = new List<Registro>();
            lista = JsonConvert.DeserializeObject<List<Registro>>(registro);
            return lista;
        }
        public void AgregarRegistro(Registro registro)
        {
            var historial = Listar();
            historial.Add(registro);
            JsonFile.GuardarArchivoJson(path, JsonConvert.SerializeObject(historial));
        }
    }
}