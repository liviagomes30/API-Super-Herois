# 🦸 Hero Management System

Sistema completo de gerenciamento de super-heróis desenvolvido com Angular e .NET Core, implementando operações CRUD completas com interface moderna e responsiva, seguindo arquitetura em camadas com separação de responsabilidades.

## 📋 Sobre o Projeto

O sistema permite cadastrar, visualizar, editar e excluir super-heróis, associando-os a múltiplos superpoderes através de uma interface intuitiva e elegante.

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
- ✅ **Arquitetura em camadas** com Service Layer para regras de negócio

## 🏗️ Arquitetura e Decisões Técnicas

### Backend (.NET Core)

**Arquitetura em Camadas:**

O projeto foi desenvolvido seguindo o padrão de **arquitetura em camadas**, promovendo separação de responsabilidades e facilitando manutenção e testes:

```
┌─────────────────────────────────────────┐
│  Controllers (Presentation Layer)      │
│  - Recebe requisições HTTP              │
│  - Valida ModelState                    │
│  - Retorna IActionResult                │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  Services (Business Logic Layer)       │
│  - Regras de negócio                    │
│  - Validações complexas                 │
│  - Orquestração de operações            │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  Data Access Layer                      │
│  - Entity Framework (DbContext)         │
│  - Acesso ao banco de dados             │
└─────────────────────────────────────────┘
```

**Estrutura do Projeto:**

- **Controllers**: Endpoints REST que orquestram as requisições HTTP
- **Services**: Camada de lógica de negócio com validações e regras
  - `IHeroiService`: Interface do serviço (contrato)
  - `HeroiService`: Implementação com toda a lógica de negócio
  - `ServiceResult`: Objeto de retorno padronizado
- **Models**: Entidades do banco de dados com Data Annotations
- **DTOs**: Separação entre modelos de domínio e contratos da API
- **Data**: Contexto do Entity Framework e configuração do banco

**Decisões Importantes:**

1. **Service Layer Pattern**: Implementei uma camada de serviço dedicada para:

   - Centralizar regras de negócio
   - Facilitar testes unitários
   - Promover reuso de código
   - Desacoplar Controllers da lógica de negócio

2. **Dependency Injection**: Uso de interfaces (`IHeroiService`) para:

   - Facilitar mocks em testes
   - Permitir troca de implementações
   - Seguir princípios SOLID

3. **Entity Framework InMemory Database**: Banco em memória para facilitar execução e testes. Em produção, seria facilmente substituído por SQL Server, MySQL ou PostgreSQL.

4. **Relacionamento Many-to-Many**: Implementei explicitamente a tabela intermediária `HeroisSuperpoderes` para ter controle total sobre o relacionamento entre heróis e superpoderes.

5. **DTOs para Input/Output**:

   - `HeroiDto`: Para receber dados (input)
   - `HeroiResponseDto`: Para retornar dados (output)
   - Separação clara de responsabilidades

6. **Validações em Múltiplas Camadas**:

   - **Data Annotations nos DTOs**: Validações básicas de formato (`[Required]`, `[MaxLength]`, `[Range]`)
   - **Service Layer**: Regras de negócio complexas
     - Nome de herói único
     - Data de nascimento válida (não futuro, não antes de 1900, idade < 150 anos)
     - Dados físicos válidos (altura e peso > 0)
     - Superpoderes existem no banco
   - Mensagens de erro descritivas e adequadas

7. **ServiceResult Pattern**: Objeto padronizado para retorno dos serviços:

   ```csharp
   ServiceResult<Heroi> result = await _heroiService.CreateAsync(dto);
   if (!result.Success)
       return BadRequest(new { message = result.ErrorMessage });
   ```

8. **HTTP Status Codes Corretos**:

   - 200 OK para sucesso
   - 201 Created ao criar recursos
   - 204 No Content quando lista vazia
   - 404 Not Found para recursos inexistentes
   - 400 Bad Request para dados inválidos

9. **CORS Configurado**: Permite requisições do frontend Angular rodando em `localhost:4200`.

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

8. **Tema Customizado**: Criei um sistema de design com variáveis CSS, gradientes e paleta de cores consistente inspirada em quadrinhos.

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
│   │   ├── HeroisController.cs        # CRUD de heróis (orquestração)
│   │   └── SuperpoderesController.cs  # Listagem de superpoderes
│   ├── Services/                       # Camada de lógica de negócio
│   │   ├── Interfaces/
│   │   │   └── IHeroiService.cs       # Contrato do serviço
│   │   ├── HeroiService.cs            # Implementação das regras de negócio
│   │   └── ServiceResult.cs           # Objeto de retorno padronizado
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
- `superpoderesIds`: deve conter pelo menos 1 superpoder e todos devem existir no banco
- `dataNascimento`: não pode ser no futuro, não pode ser antes de 1900, idade não pode ser superior a 150 anos
- `altura`: entre 0.01 e 10.0 metros, deve ser maior que zero
- `peso`: entre 0.1 e 1000.0 kg, deve ser maior que zero

**Resposta de Sucesso (201):**
Retorna o herói criado com o ID gerado.

**Resposta de Erro (400):**

```json
{
  "message": "Já existe um herói chamado 'Batman'"
}
```

```json
{
  "message": "O peso deve ser maior que zero"
}
```

```json
{
  "message": "A data de nascimento não pode ser no futuro"
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
- Lista visual de superpoderes com ícones dinâmicos
- Cálculo automático de idade
- Botões para editar ou excluir

### Formulário de Cadastro/Edição

- Validações em tempo real
- Seleção múltipla de superpoderes com checkboxes
- Date picker para data de nascimento (formato brasileiro DD/MM/AAAA)
- Campos numéricos com máscaras
- Mensagens de erro claras e descritivas
- Feedback visual durante o envio

## ✅ Validações Implementadas

### Backend - Data Annotations (DTOs)

- ✅ Campos obrigatórios (`[Required]`)
- ✅ Tamanho máximo de strings (`[MaxLength]`)
- ✅ Ranges numéricos básicos (`[Range]`)

### Backend - Service Layer (Regras de Negócio)

- ✅ **Unicidade do nome de herói**: Verifica se já existe outro herói com o mesmo nome
- ✅ **Validação de data de nascimento**:
  - Não pode ser no futuro
  - Não pode ser antes de 01/01/1900
  - Idade não pode ser superior a 150 anos
- ✅ **Validação de dados físicos**:
  - Altura deve ser maior que zero
  - Altura deve estar entre 0.01m e 10m
  - Peso deve ser maior que zero
  - Peso deve estar entre 0.1kg e 1000kg
- ✅ **Validação de superpoderes**:
  - Deve ter pelo menos um superpoder
  - Todos os superpoderes informados devem existir no banco
- ✅ **Validação de IDs**: Verifica se o herói existe antes de editar/excluir

### Frontend

- ✅ Validações de formulário reativo (Angular Reactive Forms)
- ✅ Mensagens de erro descritivas em português
- ✅ Desabilitação de botões durante submit
- ✅ Confirmação visual antes de excluir
- ✅ Feedback visual de loading
- ✅ Tratamento de erros da API com mensagens amigáveis

## 🧪 Testes

### Testando a API com Swagger

1. Acesse `http://localhost:5150`
2. Explore todos os endpoints disponíveis
3. Teste cada operação CRUD diretamente pela interface

**Testes Recomendados:**

- ✅ Criar herói com dados válidos
- ✅ Tentar criar herói com nome duplicado (deve falhar)
- ✅ Tentar criar herói com peso = 0 (deve falhar)
- ✅ Tentar criar herói com data no futuro (deve falhar)
- ✅ Tentar criar herói sem superpoderes (deve falhar)
- ✅ Listar todos os heróis
- ✅ Buscar herói por ID válido
- ✅ Buscar herói por ID inválido (deve retornar 404)
- ✅ Atualizar herói existente
- ✅ Excluir herói existente

### Testando o Frontend

1. Acesse `http://localhost:4200`
2. Navegue pelas diferentes telas
3. Teste todas as operações CRUD
4. Verifique a responsividade em diferentes tamanhos de tela

## 🔐 Segurança e Boas Práticas

- ✅ **CORS configurado** corretamente para permitir apenas origem específica
- ✅ **Validações em múltiplas camadas** (DTO + Service)
- ✅ **DTOs** para evitar over-posting e exposição desnecessária de dados
- ✅ **Service Layer** para centralizar regras de negócio
- ✅ **Dependency Injection** com interfaces para facilitar testes e manutenção
- ✅ **Tratamento adequado de exceções** com mensagens descritivas
- ✅ **Mensagens de erro** sem exposição de detalhes internos do sistema
- ✅ **Código limpo e organizado** seguindo princípios SOLID
- ✅ **Separação de responsabilidades** (Controller → Service → Data Access)
- ✅ **HTTP Status Codes semânticos** para comunicação clara da API
