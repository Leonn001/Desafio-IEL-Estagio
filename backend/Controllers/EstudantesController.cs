using Microsoft.AspNetCore.Mvc;
using IelChallengeApi.Models;
using IelChallengeApi.Services;

namespace IelChallengeApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstudantesController : ControllerBase
    {
        private readonly IEstudanteService _estudanteService;

        public EstudantesController(IEstudanteService estudanteService)
        {
            _estudanteService = estudanteService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Estudante>>> GetEstudantes(
            [FromQuery] string? search)
        {
            var estudantes = await _estudanteService.GetEstudantesAsync(search);
            return Ok(estudantes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Estudante>> GetEstudante(int id)
        {
            var estudante = await _estudanteService.GetEstudanteByIdAsync(id);

            if (estudante == null)
            {
                return NotFound(); 
            }

            return Ok(estudante);
        }

        [HttpPost]
        public async Task<ActionResult<Estudante>> PostEstudante(Estudante estudante)
        {
            try
            {
                var novoEstudante = await _estudanteService.CreateEstudanteAsync(estudante);
                
                return CreatedAtAction(nameof(GetEstudante), new { id = novoEstudante.Id }, novoEstudante);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Ocorreu um erro interno ao criar o estudante." });
            }
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEstudante(int id, Estudante estudante)
        {
            if (id != estudante.Id)
            {
                return BadRequest("O ID da URL não corresponde ao ID do estudante.");
            }

            try
            {
                var sucesso = await _estudanteService.UpdateEstudanteAsync(id, estudante);

                if (!sucesso)
                {
                    return NotFound();
                }
                
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Ocorreu um erro interno ao atualizar o estudante." });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEstudante(int id)
        {
            var sucesso = await _estudanteService.DeleteEstudanteAsync(id);

            if (!sucesso)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}