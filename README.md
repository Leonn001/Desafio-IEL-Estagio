# Desafio de Estágio IEL - Gerenciamento de Estudantes

Aplicação Full-Stack (C# e React) desenvolvida como solução para o teste prático de estágio na área de TI da FIEB/IEL.

## Funcionalidades Implementadas

O projeto atende a todos os requisitos solicitados:

-   **Listagem de Estudantes:** A tela principal exibe uma tabela com todos os estudantes cadastrados.
-   **Campo de Pesquisa:** Filtra a lista de estudantes em tempo real (via API) por nome, CPF ou endereço.
-   **Criação e edição de estudantes** Abre um modal para cadastro e edições, com validações de campos obrigatórios.
-   **Exclusão de Estudante:** Permite excluir um registro com uma janela de confirmação.
-   **Base de Dados:** Utiliza PostgreSQL com Entity Framework Core (Code-First) para persistência.
-   **Limite de caracteres:** Máximo de 100 caracteres para o campo Nome e 200 caracteres para o campo endereço.

**Recursos Bônus (Diferenciais):**
-   **Stack Moderna:** Uso de React (com Vite) no frontend e .NET 8 (API) no backend.
-   **Máscara e validação de CPF:** Validação do formato, duplicidade e validade matemática de CPF (`000.000.000-00`) no formulário.
-   **Edição de Estudante:** A tabela permite editar um estudante existente, reutilizando o formulário (e as validações).
-   **Arquitetura Limpa (API):** A API foi refatorada para usar uma **Camada de Serviço (Service Layer)**, separando a lógica de negócio dos Controllers (padrão SOLID).
-   **Tratamento de Erros:** A API trata erros de negócio (ex: CPF duplicado) e retorna mensagens de erro amigáveis para o frontend.
-   **UI Agradável:** Uso de Bootstrap para uma interface limpa, responsiva e com feedback visual (modais).

---

## Tecnologias Utilizadas

-   **Backend:**
    -   C# 12 e .NET 8
    -   ASP.NET Core Web API
    -   Entity Framework Core 8
    -   Padrão de Camada de Serviço (Service Layer)
    -   Swagger (para documentação da API)
-   **Frontend:**
    -   React 18 (com Vite e SWC)
    -   Axios (para chamadas de API)
    -   Bootstrap 5 (para estilização)
    -   @react-input/mask (para máscara de CPF)
-   **Banco de Dados:**
    -   PostgreSQL

---

## Como Executar o Projeto

Você precisará de (Node.js, .NET 8 SDK e PostgreSQL) instalados.

### 1. Backend (API C#)

A API roda na porta `http://localhost:5082`.

1.  Navegue até a pasta `/backend`:
    ```bash
    cd backend
    ```
2.  **Configuração do Banco:**
    -   Abra o arquivo `appsettings.json`.
    -   Altere a `DefaultConnection` para apontar para o seu servidor PostgreSQL, garantindo que o `Database=IelDb` exista e que a `Password` esteja correta.
3.  **Criar o Banco de Dados:**
    -   Rode o comando do EF Core para aplicar as *migrations* e criar as tabelas:
    ```bash
    dotnet ef database update
    ```
4.  **Rodar a API:**
    ```bash
    dotnet run
    ```
5.  A API estará rodando. Você pode acessar a documentação do Swagger em `http://localhost:5082/swagger`.

### 2. Frontend (React)

O frontend roda na porta `http://localhost:5173`.

1.  Abra **outro terminal** e navegue até a pasta `/frontend`:
    ```bash
    cd frontend
    ```
2.  **Instalar dependências:**
    ```bash
    npm install
    ```
3.  **Configuração da API:**
    -   **Importante:** Verifique em qual porta sua API está rodando (passo 1).
    -   Abra o arquivo `frontend/src/App.jsx`.
    -   Confirme se a variável `API_URL` no topo do arquivo bate com a porta da sua API.
        ```javascript
        // Exemplo:
        const API_URL = "http://localhost:5082/api/estudantes";
        ```
4.  **Rodar o Frontend:**
    ```bash
    npm run dev
    ```
5.  Abra `http://localhost:5173` no seu navegador.