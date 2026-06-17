# ecom-product-catalog

> Catálogo de produtos para plataforma de e-commerce — gerencia o cadastro, consulta e atualização de produtos com suporte a categorias e precificação.

[![License](https://img.shields.io/github/license/odevpedro/ecom-product-catalog?style=flat-square)](./LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/odevpedro/ecom-product-catalog?style=flat-square)](https://github.com/odevpedro/ecom-product-catalog/commits/master)

---

## Sobre o Projeto

API REST responsável pelo cadastro e gerenciamento de produtos do ecossistema de e-commerce. Opera como fonte única da verdade (source of truth) para dados de produto — nome, descrição, SKU, preço, categoria e estoque — servindo os demais serviços (Cart, Order) via HTTP.

Faz parte de um ecossistema **polyglot** de microserviços, onde cada serviço usa uma linguagem diferente (NestJS/TypeScript, Express, FastAPI, Go, Spring Boot).

---

## Stack & Arquitetura

| Camada        | Tecnologia                          |
|---------------|--------------------------------------|
| Runtime       | Node.js 22                           |
| Framework     | NestJS 11.1                          |
| Linguagem     | TypeScript 5.8                       |
| Banco de dados| PostgreSQL 15                        |
| ORM           | TypeORM 0.3                          |
| Validação     | class-validator                      |
| Infra         | Docker + Docker Compose              |
| CI/CD         | GitHub Actions                       |
| Testes        | Jest + ts-jest                       |

> Padrão arquitetural: **Clean Architecture** com separação em camadas `core (domain) → application → infrastructure → interfaces (presentation)`.

---

## Estrutura de Pastas

```
src/
├── main.ts                                    # Entrypoint
├── app.module.ts                              # Módulo raiz NestJS
├── core/
│   ├── entities/product.entity.ts             # Entidade de domínio
│   ├── value-objects/money.vo.ts              # Value Object: Money (cents + currency)
│   └── exceptions/domain.exception.ts         # Exceção base de domínio
├── application/
│   ├── ports/product-repository.port.ts       # Interface do repositório
│   └── use-cases/                             # Create, List, Update, Delete
├── infrastructure/
│   ├── config/                                # DataSource + database.config
│   └── persistence/
│       ├── models/product.model.ts            # TypeORM model
│       ├── repositories/product.repository.ts # Implementação do repositório
│       └── migrations/                        # Migrations do banco
├── interfaces/
│   ├── controllers/                           # ProductController, HealthController
│   └── dtos/                                  # CreateProductDto, UpdateProductDto
├── filters/http-exception.filter.ts           # Error handler padronizado
└── interceptors/request-id.interceptor.ts     # X-Request-ID
```

---

## Como Rodar Localmente

### Pré-requisitos

- Docker + Docker Compose
- Node.js 22

### Setup

```bash
cp .env.example .env
docker compose up -d postgres-catalog
npm install
npm run start:dev
```

A API estará disponível em `http://localhost:3001`.

### Variáveis de Ambiente

| Variável       | Descrição                              | Valor padrão (dev)                                          |
|----------------|----------------------------------------|-------------------------------------------------------------|
| `PORT`         | Porta do servidor                      | `3001`                                                      |
| `DATABASE_URL` | URL de conexão com o PostgreSQL        | `postgresql://ecom:ecom@localhost:5431/ecom_catalog`        |
| `NODE_ENV`     | Ambiente de execução                   | `development`                                               |

---

## Testes

```bash
npm test
```

**17 cenários:**
| Suite                          | Arquivo                                  | Cenários |
|--------------------------------|------------------------------------------|----------|
| Unitários (value objects)      | `core/value-objects/money.vo.spec.ts`    | 8        |
| Unitários (entidades)          | `core/entities/product.entity.spec.ts`   | 4        |
| Unitários (use cases)          | `application/use-cases/*.spec.ts`        | 5        |

---

## API — Endpoints

| Método | Rota                  | Descrição                        |
|--------|-----------------------|----------------------------------|
| GET    | `/health`             | Health check                     |
| GET    | `/live`               | Liveness probe                   |
| GET    | `/ready`              | Readiness probe                  |
| POST   | `/api/products`       | Cria um novo produto             |
| GET    | `/api/products`       | Lista produtos (`?category=`)    |
| GET    | `/api/products/:id`   | Busca produto por ID             |
| PUT    | `/api/products/:id`   | Atualiza produto                 |
| DELETE | `/api/products/:id`   | Remove produto (204)             |

---

## Documentação Técnica

| Documento                                        | Descrição                                 |
|--------------------------------------------------|-------------------------------------------|
| [Fluxos de Funcionalidades](./docs/system-feature-flows.md) | Fluxo interno de cada feature |
| [Modelo de Dados](./docs/data-model.md)          | Entidades, relacionamentos e enums        |
| [Backlog](./backlog.md)                          | Status de desenvolvimento                 |

---

## Status do Projeto

```
[x] Estrutura base com Clean Architecture
[x] CRUD completo de produtos
[x] Value Object Money (cents + currency)
[x] Validação com class-validator
[x] TypeORM + migrations
[x] 17 testes automatizados
[x] Health checks + Request ID + erro padronizado
```

---

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](./LICENSE) para mais informações.

---

<p align="center">
  Feito com foco em qualidade por <a href="https://github.com/odevpedro">@odevpedro</a>
</p>
