import { useState, useEffect } from 'react';
import { InputMask } from '@react-input/mask'; 

function EstudanteForm({ estudanteParaEditar, onSave, onCancel }) {
  
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    endereco: '',
    dataConclusao: ''
  });
  
  useEffect(() => {
    if (estudanteParaEditar) {
      setFormData({
        nome: estudanteParaEditar.nome,
        cpf: estudanteParaEditar.cpf,
        endereco: estudanteParaEditar.endereco || '',
        dataConclusao: new Date(estudanteParaEditar.dataConclusao).toISOString().split('T')[0]
      });
    } else {
      setFormData({
        nome: '',
        cpf: '',
        endereco: '',
        dataConclusao: ''
      });
    }
  }, [estudanteParaEditar]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.nome || !formData.cpf || !formData.dataConclusao) {
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              {estudanteParaEditar ? 'Editar Estudante' : 'Novo Estudante'}
            </h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit} id="estudante-form">
              <div className="mb-3">
                <label htmlFor="nome" className="form-label">Nome *</label>
                <input type="text" className="form-control" id="nome" name="nome" value={formData.nome} onChange={handleChange} maxLength="100" required />
              </div>

              <div className="mb-3">
                <label htmlFor="cpf" className="form-label">CPF *</label>
                <InputMask mask="___.___.___-__" replacement={{ _: /\d/ }} className="form-control" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label htmlFor="endereco" className="form-label">Endereço</label>
                <input type="text" className="form-control" id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} maxLength="200" />
              </div>

              <div className="mb-3">
                <label htmlFor="dataConclusão" className="form-label">Data de Conclusão *</label>
                <input type="date" className="form-control" id="dataConclusao" name="dataConclusao" value={formData.dataConclusao} onChange={handleChange} required />
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
            <button type="submit" className="btn btn-primary" form="estudante-form">Salvar</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default EstudanteForm;