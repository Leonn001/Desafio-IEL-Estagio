import { useState, useEffect } from 'react';
import axios from 'axios';
import EstudanteForm from './components/EstudanteForm';

const API_URL = "http://localhost:5082/api/estudantes";

function App() {
  const [estudantes, setEstudantes] = useState([]);
  const [busca, setBusca] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [estudanteEmEdicao, setEstudanteEmEdicao] = useState(null);
  
  useEffect(() => {
    buscarEstudantes(null);
  }, []);

  const buscarEstudantes = async (termo) => {
    try {
      const params = {};
      if (termo) { params.search = termo; }
      const response = await axios.get(API_URL, { params });
      setEstudantes(response.data);
    } catch (error) {
      console.error("Erro ao buscar estudantes:", error);
    }
  };

  const handleBuscaSubmit = (event) => {
    event.preventDefault();
    buscarEstudantes(busca);
  };

  const handleLimparBusca = () => {
    setBusca('');
    buscarEstudantes(null);
  };

  const handleExcluir = async (id) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este estudante?");
    if (confirmar) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setEstudantes(estudantesAtual => 
          estudantesAtual.filter(estudante => estudante.id !== id)
        );
      } catch (error) {
        console.error("Erro ao excluir estudante:", error);
        alert("Erro ao excluir estudante.");
      }
    }
  };

 const handleSaveEstudante = async (estudanteData) => {
    try {
      if (estudanteEmEdicao) {
        await axios.put(`${API_URL}/${estudanteEmEdicao.id}`, {
          ...estudanteData,
          id: estudanteEmEdicao.id 
        });
      } else {
        await axios.post(API_URL, estudanteData);
      }
      
      handleCloseModal();
      buscarEstudantes(busca || null);

    } catch (error) {
      console.error("Erro ao salvar estudante:", error);

      let errorMessage = "Erro ao salvar estudante. Verifique os dados e tente novamente.";

      if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
      }

      alert(errorMessage);
    }
  };

  const handleNovoEstudante = () => {
    setEstudanteEmEdicao(null); 
    setIsModalOpen(true);       
  };
  
  const handleEditarEstudante = (estudante) => {
    setEstudanteEmEdicao(estudante); 
    setIsModalOpen(true);            
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEstudanteEmEdicao(null); 
  };

  return (
    <div className="container mt-5 p-4 bg-white rounded shadow-sm" style={{ maxWidth: '1000px' }}>
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Gerenciamento de Estudantes IEL</h1>
        <button className="btn btn-primary" onClick={handleNovoEstudante}>
          Novo Estudante
        </button>
      </div>

      <form onSubmit={handleBuscaSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Pesquisar por nome, CPF, endereço..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="submit">
            Buscar
          </button>
          <button 
            className="btn btn-outline-danger" 
            type="button" 
            onClick={handleLimparBusca}
          >
            Limpar
          </button>
        </div>
      </form>


      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Endereço</th>
            <th>Data de Conclusão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {estudantes.map(estudante => (
            <tr key={estudante.id}> 
              <td>{estudante.nome}</td>
              <td>{estudante.cpf}</td>
              <td>{estudante.endereco || 'N/A'}</td>
              <td>{new Date(estudante.dataConclusao).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditarEstudante(estudante)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleExcluir(estudante.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {estudantes.length === 0 && ( <p className="text-center">Nenhum estudante cadastrado ou encontrado.</p> )}

      {isModalOpen && (
        <EstudanteForm 
          estudanteParaEditar={estudanteEmEdicao} 
          onSave={handleSaveEstudante}             
          onCancel={handleCloseModal}              
        />
      )}

    </div>
  );
}

export default App;