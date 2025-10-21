using IelChallengeApi.Models;

namespace IelChallengeApi.Services
{
    public interface IEstudanteService
    {
        Task<IEnumerable<Estudante>> GetEstudantesAsync(string? search);
        Task<Estudante?> GetEstudanteByIdAsync(int id); 
        Task<Estudante> CreateEstudanteAsync(Estudante estudante);
        Task<bool> UpdateEstudanteAsync(int id, Estudante estudante);
        Task<bool> DeleteEstudanteAsync(int id);
    }
}