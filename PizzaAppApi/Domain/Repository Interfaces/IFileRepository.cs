namespace Domain.Repository_Interfaces
{
    public interface IFileRepository
    {
        bool FileExists(string filePath);
        string PathCombine(params string[] paths);
        Type ReadFromFile<Type>(string filePath);
        bool WriteToFile<Type>(string filePath, Type fileContent);
    }
}
