# task-manager

Esta é uma aplicação web desenvolvida com NodeJS (backend), React (frontend) e MySQL (database) que permite o registro e login de usuários; e as operações CRUD para gerenciamento de tasks.

## Como Rodar a aplicação

### 1. Clonar o repositório

Usando SSH (recomendado):

```bash
git clone git@github.com:dersh0w/task-manager.git
```

Usando HTTPS:

```bash
git clone https://github.com/dersh0w/task-manager.git
```

### 2. Pré-requisitos

Antes de rodar a aplicação, deve ser feita a configuração das variáveis de ambiente.

1. Entrar na pasta database, criar um arquivo `.env` com as variáveis contidas em `.env.example`
2. Entrar na pasta backend, criar um arquivo `.env` com as variáveis contidas em `.env.example`
3. Entrar na pasta frontend, criar um arquivo `.env` com as variáveis contidas em `.env.example`

Para rodar a aplicação, é necessário ter instalado o Docker e o NodeJS.

### 3. Rodar a aplicação

Para iniciar a aplicação, deve-se seguir a ordem:

1. Database

```bash
cd database && docker compose up -d --build
```

2. Backend
   **É necessário esperar alguns segundos após a criação da database**

```bash
cd backend && docker compose up -d --build
```

3. Frontend

```bash
cd frontend && npm run dev
```

## Notas

- Dockerizar todas as aplicações em um só docker-compose.yaml
- Refatorar código
- Implementar serviços adicionais (search bar no frontend)
