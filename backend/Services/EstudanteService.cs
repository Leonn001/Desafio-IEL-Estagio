using IelChallengeApi.Data;
using IelChallengeApi.Models;
using IelChallengeApi.Services;
using Microsoft.EntityFrameworkCore;

namespace IelChallengeApi.Services
{
    public class EstudanteService : IEstudanteService
    {
        private readonly ApplicationDbContext _context;

        public EstudanteService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Estudante>> GetEstudantesAsync(string? search)
        {
            var query = _context.Estudantes.AsQueryable();
            
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(e =>
                    e.Nome.Contains(search) ||
                    e.CPF.Contains(search) ||
                    (e.Endereco != null && e.Endereco.Contains(search))
                );
            }
            
            return await query.ToListAsync();
        }

        public async Task<Estudante?> GetEstudanteByIdAsync(int id)
        {
            return await _context.Estudantes.FindAsync(id);
        }

        public async Task<Estudante> CreateEstudanteAsync(Estudante estudante)
        {
            if (await _context.Estudantes.AnyAsync(e => e.CPF == estudante.CPF))
            {
                throw new InvalidOperationException("Este CPF já está cadastrado.");
            }

            _context.Estudantes.Add(estudante);
            await _context.SaveChangesAsync();
            return estudante;
        }

        public async Task<bool> UpdateEstudanteAsync(int id, Estudante estudante)
        {
            if (await _context.Estudantes.AnyAsync(e => e.CPF == estudante.CPF && e.Id != id))
            {
                throw new InvalidOperationException("Este CPF já pertence a outro cadastro.");
            }

            var estudanteExistente = await _context.Estudantes.FindAsync(id);

            if (estudanteExistente == null)
            {
                return false;
            }

            estudanteExistente.Nome = estudante.Nome;
            estudanteExistente.CPF = estudante.CPF;
            estudanteExistente.Endereco = estudante.Endereco;
            estudanteExistente.DataConclusao = estudante.DataConclusao;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteEstudanteAsync(int id)
        {
            var estudante = await _context.Estudantes.FindAsync(id);

            if (estudante == null)
            {
                return false;
            }

            _context.Estudantes.Remove(estudante);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}