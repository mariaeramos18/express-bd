# API REST — Alunos

API REST para gerenciamento de alunos, desenvolvida com **Node.js**, **Express** e **MySQL**, com o banco rodando em container **Docker**. O projeto implementa um CRUD completo seguindo uma arquitetura em camadas.

---

## 📖 Sobre o projeto

A aplicação expõe endpoints HTTP para criar, listar, buscar, atualizar e remover alunos. Os dados são persistidos em um banco MySQL executado dentro de um container Docker, garantindo que as informações sobrevivam a reinicializações da aplicação.

O projeto foi construído em etapas:

1. **Infraestrutura** — MySQL rodando em Docker com volume para persistência
2. **Conexão** — integração do Node.js com o MySQL via `mysql2` e pool de conexões
3. **CRUD** — organização do código em camadas (Route → Controller → Repository)

---

## 🏛 Como funciona

Cada requisição HTTP percorre uma sequência de camadas, e cada uma tem uma responsabilidade única:
Requisição HTTP
↓
Route → define qual URL + método chama qual controller
↓
Controller → trata req/res, decide o status HTTP
↓
Repository → executa as consultas SQL
↓
Connection Pool → reaproveita conexões abertas com o banco
↓
MySQL → armazena os dados (dentro do Docker)

text

**O que cada camada faz:**

- **Route** — mapeia os endpoints (`GET /alunos`, `POST /alunos`, etc.) para os métodos do controller.
- **Controller** — recebe a requisição, extrai os dados (`req.params`, `req.body`), chama o repository e devolve a resposta com o status adequado (200, 201, 204, 404).
- **Repository** — concentra todo o SQL. Não conhece HTTP, só sabe conversar com o banco.
- **Pool de conexões** — mantém um conjunto de conexões abertas e reaproveita entre requisições, evitando abrir uma nova conexão a cada chamada.

Essa separação evita que um único arquivo concentre responsabilidades diferentes e facilita manutenção, testes e evolução do projeto.

---

## 📁 Estrutura
api-rest/
├── src/
│ ├── controllers/ → camada HTTP
│ ├── database/ → configuração do pool MySQL
│ ├── repositories/ → consultas SQL
│ ├── routes/ → definição dos endpoints
│ ├── app.js → configuração do Express
│ └── server.js → inicialização do servidor
│
├── docker-compose.yml → configuração do container MySQL
├── .env → credenciais (não versionado)
├── .env.example → modelo de credenciais
└── package.json

text

---

## 🌐 Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/alunos` | Cadastra um novo aluno |
| GET | `/alunos` | Lista todos os alunos |
| GET | `/alunos/:id` | Busca um aluno pelo ID |
| PUT | `/alunos/:id` | Atualiza um aluno |
| DELETE | `/alunos/:id` | Remove um aluno |

**Exemplo de requisição:**

```http
POST /alunos
Content-Type: application/json

{
  "nome": "Pedro",
  "curso": "ADS"
}
Exemplo de resposta:

json
{
  "id": 1,
  "nome": "Pedro",
  "curso": "ADS"
}
⚙️ Como executar
bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# editar .env com as credenciais

# 3. Subir o banco de dados
docker compose up -d

# 4. Rodar a aplicação
npm run dev
A API ficará disponível em http://localhost:3000.

🔐 Variáveis de ambiente
As credenciais são lidas de um arquivo .env (que não é versionado):

env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=api_user
DB_PASSWORD=api123
DB_NAME=api_rest
O arquivo .env.example serve como modelo e pode ser commitado, pois não contém senhas reais.

🐳 Docker
O banco MySQL roda em um container gerenciado pelo Docker Compose. Os dados ficam armazenados em um volume Docker, o que significa que:

Os dados persistem mesmo que o container seja removido e recriado

Apenas docker compose down -v apaga os dados permanentemente

🛠 Tecnologias
Node.js

Express

MySQL 8.4

mysql2 (com Promise API e pool de conexões)

Docker / Docker Compose

👩‍💻 Autora
Maria Eduarda Ramos Ribeiro

Projeto desenvolvido para a disciplina de Tecnologia Web II.