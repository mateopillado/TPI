using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;
namespace trackerBack.Utils
{
   

    public static class PasswordHelper
    {
        public static string HashPassword(string password)
        {
            // Generar una sal aleatoria
            byte[] salt = new byte[16];
            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(salt);
            }

            // Derivar la clave usando Rfc2898DeriveBytes
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);

            // Combinar la sal y el hash
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);

            // Convertir a una cadena Base64
            return Convert.ToBase64String(hashBytes);
        }
        public static bool ValidatePassword(string password, string hashedPassword)
        {
            // Convertir el hash almacenado de Base64 a un array de bytes
            byte[] hashBytes = Convert.FromBase64String(hashedPassword);

            // Extraer la sal
            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);

            // Derivar la clave para la contraseña proporcionada
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);

            // Comparar el hash calculado con el almacenado
            for (int i = 0; i < 20; i++)
            {
                if (hashBytes[i + 16] != hash[i])
                {
                    return false; // La contraseña no es válida
                }
            }

            return true; // La contraseña es válida
        }

    }

}
