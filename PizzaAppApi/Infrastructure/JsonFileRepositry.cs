using Domain.Repository_Interfaces;
using Newtonsoft.Json;
using System.IO;

namespace Infrastructure
{
    public class JsonFileRepositry : IFileRepository
    {
        public bool FileExists(string filePath)
        {
            return File.Exists(filePath);
        }

        public Type ReadFromFile<Type>(string filePath)
        {
            Type typeData;
            using (var fileStream = File.OpenRead(filePath))
            using (StreamReader reader = new StreamReader(fileStream))
            using (JsonTextReader jsonReader = new JsonTextReader(reader))
            {
                JsonSerializer ser = new JsonSerializer();
                typeData = ser.Deserialize<Type>(jsonReader);
            }
            return typeData;
        }

        public bool WriteToFile<Type>(string filePath, Type fileContent)
        {
            bool isWriteComplete = false;
            using (var fileStream = !FileExists(filePath) ? File.Create(filePath) : File.OpenWrite(filePath))
            using (StreamWriter writer = new StreamWriter(fileStream))
            using (JsonTextWriter jsonWriter = new JsonTextWriter(writer))
            {
                JsonSerializer ser = new JsonSerializer();
                ser.Serialize(jsonWriter, fileContent);
                jsonWriter.Flush();
            }
            isWriteComplete = true;
            return isWriteComplete;
        }

        public string PathCombine(params string[] paths)
        {
            return Path.Combine(paths);
        }
    }
}
