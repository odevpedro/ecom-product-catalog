# Backlog — ecom-product-catalog

> Registro vivo do progresso do projeto. Atualizado a cada mudança de estado de uma funcionalidade.
> **Última atualização:** 2026-06-16

---

## Sobre o Projeto

API REST responsável pelo cadastro e gerenciamento de produtos do ecossistema de e-commerce — opera como fonte única da verdade para dados de produto, servindo serviços como Cart, Order e Search via HTTP.

**Versão atual:** `1.0.0`
**Repositório:** [github.com/odevpedro/ecom-product-catalog](https://github.com/odevpedro/ecom-product-catalog)
**Stack principal:** NestJS 11 / TypeScript 5.8 / PostgreSQL 15 / TypeORM 0.3

---

## Legenda

| Símbolo | Significado |
|---------|-------------|
| `[ ]`   | Pendente |
| `[~]`   | Em andamento |
| `[x]`   | Concluído |
| `P0`    | Crítico — bloqueia outras features |
| `P1`    | Alta prioridade |
| `P2`    | Média prioridade |
| `P3`    | Melhoria / nice-to-have |
| `XS` `S` `M` `L` `XL` | Estimativa de complexidade |

---

## Em Andamento

> Features atualmente sendo desenvolvidas. Idealmente, máximo de 2–3 itens simultâneos.

_Nenhum item em andamento no momento._

---

## Pendentes

> Ordenadas por prioridade. Itens de P0 e P1 devem entrar em "Em Andamento" primeiro.

| Prioridade | Feature | Estimativa | Descrição |
|------------|---------|------------|-----------|
| P1 | Paginação na listagem | M | Adicionar `?page=` e `?limit=` no GET /api/products com cursor ou offset |
| P1 | Busca por texto | M | Filtrar produtos por nome/descrição via `?q=` |
| P2 | Cache de consultas | S | Cachear listagens e buscas individuais com Redis ou TTL em memória |
| P2 | Autenticação JWT | M | Proteger endpoints de mutate (POST/PUT/DELETE) com Bearer token |
| P3 | Histórico de preços | L | Auditar mudanças de preço com tabela `price_history` |
| P3 | Soft delete | S | Adicionar coluna `deleted_at` e filtrar produtos ativos por padrão |
| P3 | Endpoint de categorias | S | GET /api/categories listando categorias distintas |

---

## Concluídas

> Features finalizadas com suas respectivas datas de conclusão e links de referência.

| Feature | Data | Entrega |
|---------|------|---------|
| Estrutura base com Clean Architecture | 2026-06-16 | Camadas core, application, infrastructure, interfaces |
| CRUD completo de produtos | 2026-06-16 | POST/GET/PUT/DELETE /api/products |
| Value Object Money | 2026-06-16 | `Money` VO com centavos inteiros e moeda ISO 3 letras |
| Validação com class-validator | 2026-06-16 | DTOs com validação declarativa nos endpoints |
| TypeORM + Migrations | 2026-06-16 | `CreateProductsTable` migration com UUID PK e UNIQUE(sku) |
| 17 testes automatizados | 2026-06-16 | 8 money VO + 4 product entity + 5 use cases (create, list) |
| Health checks + Request ID + erro padronizado | 2026-06-16 | `/health`, `/live`, `/ready`, `X-Request-ID`, envelope de erro |

---

## Bugs Conhecidos

> Problemas identificados que ainda não foram corrigidos.

_Nenhum bug reportado._

---

## Notas & Decisões Pendentes

> Pontos em aberto que precisam de decisão antes de serem desenvolvidos.

- **Estratégia de paginação:** offset ou cursor-based? Definição depende do volume esperado de produtos.

---

## Histórico de Versões

| Versão | Data | Principais entregas |
|--------|------|---------------------|
| `1.0.0` | 2026-06-16 | CRUD, Money VO, TypeORM/migrations, 17 testes, health checks |
