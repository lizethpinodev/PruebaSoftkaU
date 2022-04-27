using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PruebaSoftkaU.Models
{
    public class Pregunta
    {
        public int Id { get; set; }
        public string Enunciado { get; set; }
        public List<string> Opciones { get; set; }
        public string Respuesta { get; set; }
        public int Puntaje { get; set; }
    }
}