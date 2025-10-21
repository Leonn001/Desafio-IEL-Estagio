using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IelChallengeApi.Models
{
    [Table("Estudantes")] 
    public class Estudante
    {
        [Key] 
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome é obrigatório.")]
        [StringLength(100, ErrorMessage = "O nome deve ter no máximo 100 caracteres.")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "O CPF é obrigatório.")]
        [StringLength(14, MinimumLength = 11, ErrorMessage = "O CPF é inválido.")]
        public string CPF { get; set; } = string.Empty;

        [StringLength(200, ErrorMessage = "O endereço deve ter no máximo 200 caracteres.")]
        public string? Endereco { get; set; }

        [Required(ErrorMessage = "A data de conclusão é obrigatória.")]
        [DataType(DataType.Date)]
        [Display(Name = "Data de Conclusão")] 
        [Column(TypeName = "date")]
        public DateTime DataConclusao { get; set; }
    }
}