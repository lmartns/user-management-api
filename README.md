# User Management API

## Apresentação da Proposta do Projeto

Este projeto é uma API de gerenciamento de usuários construída com o framework [NestJS](https://nestjs.com/). A API permite criar, atualizar, deletar e listar usuários, com a senha dos usuários sendo criptografada antes de ser armazenada no banco de dados. O projeto utiliza TypeORM para interagir com o banco de dados MySQL.

## Endpoints 🔚

### Criar Usuário

- **URL:** `/users/create`
- **Método:** `POST`
- **Body:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

- Retorno:

```json
{
  "id": "01F8MECHZX3TBDSZ7XRADM79XE",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "$2b$10$..."
}
```

### Atualizar Usuário

- **URL:** `/users/{id}`
- **Método:** `PUT`
- **Body:**

```json
{
  "name": "John Doe Updated",
  "password": "newpassword123"
}
```

- Retorno:

```json
{
  "id": "01F8MECHZX3TBDSZ7XRADM79XE",
  "name": "John Doe Updated",
  "email": "john.doe@example.com",
  "password": "$2b$10$..."
}
```

### Deletar Usuário

- **URL:** `/users/delete/{id}`
- **Método:** `DELETE`
- **Retorno:**

```json
{
  "message": "User deleted successfully"
}
```

### Listar todos os Usuários

- **URL:** `/users`
- **Método:** `GET`
- **Retorno:**

```json
{
  "users": [
    {
      "id": "01F8MECHZX3TBDSZ7XRADM79XE",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "$2b$10$..."
    },
    {
      "id": "01JCBH574YFMC2000ZGMSQ78E4",
      "name": "Julie Jacobi",
      "email": "Heidi.Hills54@hotmail.com",
      "password": "$2b$10$..."
    }
  ]
}
```

### Buscar Usuário por ID

- **URL:** `/users/{id}`
- **Método:** `GET`
- **Retorno:**

```json
{
  "id": "01F8MECHZX3TBDSZ7XRADM79XE",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "$2b$10$..."
}
```

## Estrutura do Projeto 📁

```Markdown
└── 📁src
    └── 📁database
        └── database.module.ts
    └── 📁users
        └── 📁dto
            └── create-user.dto.ts
            └── update-user.dto.ts
        └── user.controller.ts
        └── user.entity.ts
        └── user.module.ts
        └── user.service.ts
    └── 📁utils
        └── http-exception.filter.ts
    └── app.module.ts
    └── main.ts
```

## Por que não UUID? 🤔

Devido à natureza aleatória dos UUIDs, o desempenho do banco de dados pode ser prejudicado, especialmente durante as operações de INSERT. Evitamos o uso de identificadores incrementais por causa das dificuldades na migração de dados, onde a duplicação pode ocorrer facilmente. Em vez disso, optamos pelo ULID, um identificador ordenável lexicograficamente, que melhora significativamente a performance do banco de dados.

## Como Executar o Projeto 🚀

Pré-requisitos

- Node.js

| Antes de rodar o projeto, você precisa criar um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```env
DB_HOST=
DB_PORT
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
```

Instalar as dependências:

```bash
  $ npm install
```

Rodar o projeto:

```bash
  # Development
  $ npm run start

  # Watch mode
  $ npm run start:dev
```

## Referências 📚

- [The Problem with Using a UUID Primary Key in MySQL](https://planetscale.com/blog/the-problem-with-using-a-uuid-primary-key-in-mysql)
- [Project structure](https://docs.nestjs.com/modules)
- [Exception Filter](https://docs.nestjs.com/exception-filters)
- [TypeORM](https://typeorm.io/)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)
