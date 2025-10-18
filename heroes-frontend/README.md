# 🦸 Hero Management System

Sistema completo de gerenciamento de super-heróis desenvolvido com Angular e .NET Core, implementando operações CRUD completas com interface moderna e responsiva.

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como parte de um desafio técnico para vaga de Desenvolvedor Full Stack. O sistema permite cadastrar, visualizar, editar e excluir super-heróis, associando-os a múltiplos superpoderes através de uma interface intuitiva e elegante.

### ✨ Principais Funcionalidades

- ✅ **Cadastro de heróis** com validações completas de campos obrigatórios
- ✅ **Listagem visual** de todos os heróis cadastrados com cards informativos
- ✅ **Visualização detalhada** de cada herói com todas suas informações
- ✅ **Edição de dados** com carregamento automático das informações existentes
- ✅ **Exclusão segura** com confirmação antes de remover um herói
- ✅ **Associação múltipla** de superpoderes a cada herói
- ✅ **Validação de unicidade** do nome de herói (não permite duplicatas)
- ✅ **Interface responsiva** que funciona em desktop, tablet e mobile
- ✅ **Documentação Swagger** completa da API

## 🏗️ Arquitetura e Decisões Técnicas

### Backend (.NET Core)

**Estrutura do Projeto:**

- **Controllers**: Endpoints REST seguindo boas práticas RESTful
- **Models**: Entidades do banco de dados com Data Annotations
- **DTOs**: Separação entre modelos de domínio e contratos da API
- **Data**: Contexto do Entity Framework e configuração do banco

**Decisões Importantes:**

1. **Entity Framework InMemory Database**: Optei por usar banco em memória para facilitar a execução e testes do projeto. Em produção, seria facilmente substituído por SQL Server, MySQL ou PostgreSQL.

2. **Relacionamento Many-to-Many**: Implementei explicitamente a tabela intermediária `HeroisSuperpoderes` para ter controle total sobre o relacionamento entre heróis e superpoderes.

3. **DTOs para Input**: Criei DTOs específicos para receber dados de criação/atualização, separando as responsabilidades e evitando exposição desnecessária de propriedades.

4. **Validações em Múltiplas Camadas**:

   - Data Annotations nos Models
   - Validações de negócio nos Controllers
   - Mensagens de erro descritivas e adequadas

5. **HTTP Status Codes Corretos**:

   - 200 OK para sucesso
   - 201 Created ao criar recursos
   - 204 No Content quando lista vazia
   - 404 Not Found para recursos inexistentes
   - 400 Bad Request para dados inválidos

6. **CORS Configurado**: Permite requisições do frontend Angular rodando em `localhost:4200`.

### Frontend (Angular)

**Estrutura do Projeto:**

- **Components**: Componentes standalone reutilizáveis
- **Services**: Camada de comunicação com a API
- **Models**: Interfaces TypeScript para tipagem forte
- **Routing**: Sistema de rotas para navegação entre telas

**Decisões Importantes:**

1. **Angular Standalone Components**: Utilizei a abordagem moderna de componentes standalone (sem NgModules), tornando o código mais simples e performático.

2. **Angular Material**: Escolhi o Material Design para ter componentes visuais consistentes, acessíveis e profissionais sem necessidade de criar do zero.

3. **Reactive Forms**: Implementei formulários reativos com validações síncronas e assíncronas, proporcionando melhor controle e testabilidade.

4. **Services com HttpClient**: Centralizei toda a comunicação com a API em um service dedicado, seguindo o princípio de responsabilidade única.

5. **Lazy Loading**: Os componentes são carregados sob demanda através do sistema de rotas, melhorando o tempo de carregamento inicial.

6. **Design Responsivo**: Utilizei CSS Grid e Flexbox com media queries para garantir boa experiência em todos os dispositivos.

7. **Feedback Visual**: Implementei estados de loading, mensagens de erro e confirmações para melhorar a UX.

8. **Tema Customizado**: Criei um sistema de design com variáveis CSS, gradientes e paleta de cores consistente.

## 🚀 Tecnologias Utilizadas

### Backend

- **.NET 9.0** - Framework principal
- **ASP.NET Core** - Web API
- **Entity Framework Core 9.0** - ORM
- **Entity Framework InMemory** - Banco de dados em memória
- **Swagger/OpenAPI** - Documentação da API

### Frontend

- **Angular 20.3** - Framework SPA
- **TypeScript 5.9** - Linguagem
- **Angular Material 20.2** - Biblioteca de componentes UI
- **RxJS 7.8** - Programação reativa
- **Angular Router** - Sistema de rotas

## 📦 Estrutura de Pastas

```
project/
├── HeroesAPI/                          # Backend .NET Core
│   ├── Controllers/                    # Endpoints da API
│   │   ├── HeroisController.cs        # CRUD de heróis
│   │   └── SuperpoderesController.cs  # Listagem de superpoderes
│   ├── DTOs/                          # Data Transfer Objects
│   │   ├── HeroiDto.cs               # DTO para input
│   │   └── HeroiResponseDto.cs       # DTO para output
│   ├── Data/                          # Configuração do EF Core
│   │   └── AppDbContext.cs           # Contexto do banco
│   ├── Models/                        # Entidades do domínio
│   │   ├── Heroi.cs
│   │   ├── Superpoder.cs
│   │   └── HeroiSuperpoder.cs
│   └── Program.cs                     # Configuração da aplicação
│
└── heroes-frontend/                    # Frontend Angular
    ├── src/
    │   ├── app/
    │   │   ├── components/            # Componentes da UI
    │   │   │   ├── hero-list/        # Listagem de heróis
    │   │   │   ├── hero-detail/      # Detalhes do herói
    │   │   │   └── hero-form/        # Formulário (criar/editar)
    │   │   ├── models/               # Interfaces TypeScript
    │   │   │   ├── heroi.model.ts
    │   │   │   ├── heroi-dto.model.ts
    │   │   │   └── superpoder.model.ts
    │   │   ├── services/             # Serviços
    │   │   │   └── hero.service.ts   # Comunicação com API
    │   │   ├── app.routes.ts         # Configuração de rotas
    │   │   └── app.config.ts         # Configuração da aplicação
    │   ├── styles.css                # Estilos globais
    │   └── index.html                # HTML principal
    └── angular.json                   # Configuração do Angular
```

## 🗄️ Modelo de Dados

### Diagrama ER

```
┌─────────────────┐         ┌──────────────────────┐         ┌─────────────────┐
│     Herois      │         │ HeroisSuperpoderes   │         │  Superpoderes   │
├─────────────────┤         ├──────────────────────┤         ├─────────────────┤
│ Id (PK)         │────┐    │ HeroiId (FK)         │    ┌────│ Id (PK)         │
│ Nome            │    └───<│ SuperpoderId (FK)    │>───┘    │ Superpoder      │
│ NomeHeroi       │         └──────────────────────┘         │ Descricao       │
│ DataNascimento  │              (Chave Composta)            └─────────────────┘
│ Altura          │
│ Peso            │
└─────────────────┘
```

### Entidades

**Herois**

- `Id` (int) - Chave primária, auto-incremento
- `Nome` (nvarchar(120)) - Nome real do herói
- `NomeHeroi` (nvarchar(120)) - Nome de super-herói (único)
- `DataNascimento` (datetime2) - Data de nascimento
- `Altura` (float) - Altura em metros
- `Peso` (float) - Peso em quilogramas

**Superpoderes**

- `Id` (int) - Chave primária, auto-incremento
- `Superpoder` (nvarchar(50)) - Nome do superpoder
- `Descricao` (nvarchar(250)) - Descrição do superpoder

**HeroisSuperpoderes** (Tabela de Relacionamento)

- `HeroiId` (int) - FK para Herois
- `SuperpoderId` (int) - FK para Superpoderes
- Chave primária composta por ambos os campos

## 🔧 Instalação e Configuração

### Pré-requisitos

- [.NET SDK 9.0+](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- [Angular CLI 20+](https://angular.io/cli)

### Backend (.NET Core)

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd project/HeroesAPI
```

2. **Restaure as dependências**

```bash
dotnet restore
```

3. **Execute a aplicação**

```bash
dotnet run
```

A API estará disponível em `http://localhost:5150`

**Swagger UI**: Acesse `http://localhost:5150` para visualizar e testar os endpoints da API.

### Frontend (Angular)

1. **Navegue até a pasta do frontend**

```bash
cd heroes-frontend
```

2. **Instale as dependências**

```bash
npm install
```

3. **Execute a aplicação**

```bash
ng serve
```

A aplicação estará disponível em `http://localhost:4200`

## 📡 API Endpoints

### Heróis

#### `GET /api/herois`

Retorna a lista de todos os heróis cadastrados.

**Resposta de Sucesso (200):**

```json
[
  {
    "id": 1,
    "nome": "Bruce Wayne",
    "nomeHeroi": "Batman",
    "dataNascimento": "1980-02-19T00:00:00",
    "altura": 1.88,
    "peso": 95.0,
    "superpoderes": [
      {
        "id": 1,
        "superpoder": "Super Força",
        "descricao": "Força sobre-humana"
      }
    ]
  }
]
```

**Resposta Sem Conteúdo (204):**
Quando não há heróis cadastrados.

---

#### `GET /api/herois/{id}`

Retorna um herói específico pelo ID.

**Parâmetros:**

- `id` (int) - ID do herói

**Resposta de Sucesso (200):**

```json
{
  "id": 1,
  "nome": "Bruce Wayne",
  "nomeHeroi": "Batman",
  "dataNascimento": "1980-02-19T00:00:00",
  "altura": 1.88,
  "peso": 95.0,
  "superpoderes": [...]
}
```

**Resposta de Erro (404):**

```json
{
  "message": "Herói com ID 999 não encontrado"
}
```

---

#### `POST /api/herois`

Cria um novo herói.

**Body:**

```json
{
  "nome": "Bruce Wayne",
  "nomeHeroi": "Batman",
  "superpoderesIds": [1, 3, 7],
  "dataNascimento": "1980-02-19T00:00:00",
  "altura": 1.88,
  "peso": 95.0
}
```

**Validações:**

- Todos os campos são obrigatórios
- `nome` e `nomeHeroi`: máximo 120 caracteres
- `nomeHeroi` deve ser único
- `superpoderesIds`: deve conter pelo menos 1 superpoder
- `altura`: entre 0.01 e 10.0
- `peso`: entre 0.1 e 1000.0

**Resposta de Sucesso (201):**
Retorna o herói criado com o ID gerado.

**Resposta de Erro (400):**

```json
{
  "message": "Já existe um herói chamado 'Batman'"
}
```

---

#### `PUT /api/herois/{id}`

Atualiza um herói existente.

**Parâmetros:**

- `id` (int) - ID do herói

**Body:** Mesmo formato do POST

**Resposta de Sucesso (200):**

```json
{
  "message": "Herói atualizado com sucesso",
  "heroi": {...}
}
```

**Resposta de Erro (404):**

```json
{
  "message": "Herói com ID 999 não encontrado"
}
```

**Resposta de Erro (400):**

```json
{
  "message": "O nome 'Superman' já está em uso"
}
```

---

#### `DELETE /api/herois/{id}`

Remove um herói.

**Parâmetros:**

- `id` (int) - ID do herói

**Resposta de Sucesso (200):**

```json
{
  "message": "Herói 'Batman' excluído com sucesso"
}
```

**Resposta de Erro (404):**

```json
{
  "message": "Herói com ID 999 não encontrado"
}
```

---

### Superpoderes

#### `GET /api/superpoderes`

Retorna a lista de todos os superpoderes disponíveis.

**Resposta de Sucesso (200):**

```json
[
  {
    "id": 1,
    "superpoder": "Super Força",
    "descricao": "Força sobre-humana"
  },
  {
    "id": 2,
    "superpoder": "Voo",
    "descricao": "Capacidade de voar"
  }
]
```

## 🎨 Interface do Usuário

### Tela de Listagem

- Grid responsivo de cards
- Visualização rápida de informações principais
- Ações: Ver detalhes, Editar, Excluir
- Design com gradientes e Material Design

### Tela de Detalhes

- Informações completas do herói
- Grid de dados pessoais
- Lista visual de superpoderes
- Cálculo automático de idade
- Botões para editar ou excluir

### Formulário de Cadastro/Edição

- Validações em tempo real
- Seleção múltipla de superpoderes
- Date picker para data de nascimento
- Campos numéricos com máscaras
- Mensagens de erro claras
- Feedback visual durante o envio

## ✅ Validações Implementadas

### Backend

- ✅ Campos obrigatórios
- ✅ Tamanho máximo de strings
- ✅ Ranges numéricos (altura e peso)
- ✅ Unicidade do nome de herói
- ✅ Validação de IDs na edição/exclusão
- ✅ Verificação de superpoderes existentes

### Frontend

- ✅ Validações de formulário reativo
- ✅ Mensagens de erro descritivas
- ✅ Desabilitação de botões durante submit
- ✅ Confirmação antes de excluir
- ✅ Feedback visual de loading
- ✅ Tratamento de erros da API

## 🧪 Testes

### Testando a API com Swagger

1. Acesse `http://localhost:5150`
2. Explore todos os endpoints disponíveis
3. Teste cada operação CRUD diretamente pela interface

### Testando o Frontend

1. Acesse `http://localhost:4200`
2. Navegue pelas diferentes telas
3. Teste todas as operações CRUD
4. Verifique a responsividade em diferentes tamanhos de tela

## 🔐 Segurança e Boas Práticas

- ✅ CORS configurado corretamente
- ✅ Validações em múltiplas camadas
- ✅ DTOs para evitar over-posting
- ✅ Tratamento adequado de exceções
- ✅ Mensagens de erro sem exposição de detalhes internos
- ✅ Código limpo e organizado
- ✅ Separação de responsabilidades

**Qualquer dúvida sobre decisões técnicas ou implementação, estou à disposição para explicar!** 🚀
