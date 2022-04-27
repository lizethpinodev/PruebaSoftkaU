using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace PruebaSoftkaU.Utilidades
{
    public static class JsonFile
    {
        public static string ObtenerArchivoJson(string path)
        {
            string text;
            var fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
            using (var streamReader = new StreamReader(fileStream, Encoding.UTF8))
            {
                text = streamReader.ReadToEnd();
            }
            return text;
        }
        public static void GuardarArchivoJson(string path, string content)
        {
            File.Delete(path);
            File.WriteAllText(path, content); 
        }
    }
}