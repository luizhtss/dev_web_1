# Projeto para a Disciplina de Desenvolvimento de Sistemas WEB I

## Instalação

Certifique-se de ter o Node.js instalado em seu sistema. Para instalar as dependências do projeto, siga estas etapas:

1. Clone o repositório para o seu ambiente local.
2. Navegue até o diretório do projeto.
3. Execute o comando `npm install` para instalar todas as dependências.

## Uso

Para iniciar o projeto, siga estas etapas:

1. Certifique-se de estar no diretório do projeto.
2. Execute o comando `npm start` para iniciar o servidor.

## API de Produtos

A API de Produtos é um servidor que fornece várias rotas para consultar e obter informações sobre produtos. Ele se conecta a um banco de dados para recuperar os dados dos produtos e retorna as respostas em formato JSON.

### Base URL

```
http://localhost:3333
```

### Rotas

#### Listar produtos

Retorna uma lista de produtos com opções de paginação.

- **URL:** `/produtos`
- **Método:** GET

##### Parâmetros de consulta

- `page` (opcional): Número da página a ser exibida (padrão: 1).
- `limit` (opcional): Número máximo de produtos retornados por página (padrão: 12).

##### Exemplo de solicitação

```
GET /produtos?page=2&limit=10
```

##### Exemplo de resposta

```json
{
  "data": {
    "allProducts": [
      {
        "id": 1,
        "name": "Produto 1",
        "description": "Descrição do produto 1",
        "image_url": "https://example.com/produto1.jpg",
        "category": "Categoria 1",
        "price_in_cents": 1999,
        "sales": 100,
        "created_at": "2022-12-31T00:00:00Z"
      },
      {
        "id": 2,
        "name": "Produto 2",
        "description": "Descrição do produto 2",
        "image_url": "https://example.com/produto2.jpg",
        "category": "Categoria 2",
        "price_in_cents": 2999,
        "sales": 50,
        "created_at": "2023-01-01T00:00:00Z"
      },
      // mais produtos...
    ]
  }
}
```

#### Listar novidades

Retorna uma lista de produtos ordenados por vendas.

- **URL:** `/novidades`
- **Método:** GET

##### Parâmetros de consulta

- `limit` (opcional): Número máximo de produtos retornados (padrão: 12).

##### Exemplo de solicitação

```
GET /novidades?limit=5
```

##### Exemplo de resposta

```json
{
  "data": {
    "allProducts": [
      {
        "id": 1,
        "name": "Produto 1",
        "description": "Descrição do produto 1",
        "image_url": "https://example.com/produto1.jpg",
        "category": "Categoria 1",
        "price_in_cents": 1999,
        "sales": 100,
        "created_at": "2022-12-31T00:00:00Z"
      },
      {
        "id": 2,
        "name": "Produto 2",
        "description": "Descrição do produto 2",
        "image_url": "https://example.com/produto2.jpg",
        "category": "Categoria 2",
        "price_in_cents": 2999,
        "sales": 50,
        "created_at": "2023-01-01T00:00:00Z"
      },
      // mais produtos...
    ]
  }
}
```

#### Listar produtos por preço (maior para menor)

Retorna uma lista de produtos ordenados por preço em ordem dec

rescente.

- **URL:** `/preco-maior`
- **Método:** GET

##### Parâmetros de consulta

- `limit` (opcional): Número máximo de produtos retornados (padrão: 12).

##### Exemplo de solicitação

```
GET /preco-maior?limit=8
```

##### Exemplo de resposta

```json
{
  "data": {
    "allProducts": [
      {
        "id": 1,
        "name": "Produto 1",
        "description": "Descrição do produto 1",
        "image_url": "https://example.com/produto1.jpg",
        "category": "Categoria 1",
        "price_in_cents": 9999,
        "sales": 10,
        "created_at": "2022-06-01T00:00:00Z"
      },
      {
        "id": 2,
        "name": "Produto 2",
        "description": "Descrição do produto 2",
        "image_url": "https://example.com/produto2.jpg",
        "category": "Categoria 2",
        "price_in_cents": 8999,
        "sales": 20,
        "created_at": "2022-06-02T00:00:00Z"
      },
      // mais produtos...
    ]
  }
}
```

#### Listar produtos por preço (menor para maior)

Retorna uma lista de produtos ordenados por preço em ordem crescente.

- **URL:** `/preco-menor`
- **Método:** GET

##### Parâmetros de consulta

- `limit` (opcional): Número máximo de produtos retornados (padrão: 12).

##### Exemplo de solicitação

```
GET /preco-menor?limit=6
```

##### Exemplo de resposta

```json
{
  "data": {
    "allProducts": [
      {
        "id": 1,
        "name": "Produto 1",
        "description": "Descrição do produto 1",
        "image_url": "https://example.com/produto1.jpg",
        "category": "Categoria 1",
        "price_in_cents": 1999,
        "sales": 100,
        "created_at": "2022-12-31T00:00:00Z"
      },
      {
        "id": 2,
        "name": "Produto 2",
        "description": "Descrição do produto 2",
        "image_url": "https://example.com/produto2.jpg",
        "category": "Categoria 2",
        "price_in_cents": 2999,
        "sales": 50,
        "created_at": "2023-01-01T00:00:00Z"
      },
      // mais produtos...
    ]
  }
}
```

#### Listar produtos mais vendidos

Retorna uma lista de produtos ordenados por vendas em ordem decrescente.

- **URL:** `/mais-vendidos`
- **Método:** GET

##### Parâmetros de consulta

- `limit` (opcional): Número máximo de produtos retornados (padrão: 12).

##### Exemplo de solicitação

```
GET /mais-vendidos?limit=10
```

##### Exemplo de resposta

```json
{
  "data": {
    "allProducts": [
      {
        "id": 1,
        "name": "Produto 1",
        "description": "Descrição do produto 1",
       

 "image_url": "https://example.com/produto1.jpg",
        "category": "Categoria 1",
        "price_in_cents": 1999,
        "sales": 100,
        "created_at": "2022-12-31T00:00:00Z"
      },
      {
        "id": 2,
        "name": "Produto 2",
        "description": "Descrição do produto 2",
        "image_url": "https://example.com/produto2.jpg",
        "category": "Categoria 2",
        "price_in_cents": 2999,
        "sales": 50,
        "created_at": "2023-01-01T00:00:00Z"
      },
      // mais produtos...
    ]
  }
}
```

#### Listar produtos da categoria "Mugs"

Retorna uma lista de produtos da categoria "Mugs" ordenados pela data de criação em ordem decrescente.

- **URL:** `/mugs`
- **Método:** GET

##### Parâmetros de consulta

- `limit` (opcional): Número máximo de produtos retornados (padrão: 12).

##### Exemplo de solicitação

```
GET /mugs?limit=4
```

##### Exemplo de resposta

```json
{
  "data": {
    "allProducts": [
      {
        "id": 1,
        "name": "Produto 1",
        "description": "Descrição do produto 1",
        "image_url": "https://example.com/produto1.jpg",
        "category": "Mugs",
        "price_in_cents": 1999,
        "sales": 100,
        "created_at": "2023-06-10T00:00:00Z"
      },
      {
        "id": 2,
        "name": "Produto 2",
        "description": "Descrição do produto 2",
        "image_url": "https://example.com/produto2.jpg",
        "category": "Mugs",
        "price_in_cents": 2999,
        "sales": 50,
        "created_at": "2023-06-09T00:00:00Z"
      },
      // mais produtos...
    ]
  }
}
```

#### Listar produtos da categoria "T-shirts"

Retorna uma lista de produtos da categoria "T-shirts" ordenados pela data de criação em ordem decrescente.

- **URL:** `/t-shirts`
- **Método:** GET

##### Parâmetros de consulta

- `limit` (opcional): Número máximo de produtos retornados (padrão: 12).

##### Exemplo de solicitação

```
GET /t-shirts?limit=3
```

##### Exemplo de resposta

```json
{
  "data": {
    "allProducts": [
      {
        "id": 1,
        "name": "Produto 1",
        "description": "Descrição do produto 1",
        "image_url": "https://example.com/produto1.jpg",
        "category": "T-shirts",
        "price_in_cents": 1999,
        "sales": 100,
        "created_at": "2023-06-10T00:00:00Z"
      },
      {
        "id": 2,
        "name": "Produto 2",
        "description": "Descrição do produto 2",
        "image_url": "https://example.com/produto2.jpg",
        "category": "T-shirts",
        "price_in_cents":

 2999,
        "sales": 50,
        "created_at": "2023-06-09T00:00:00Z"
      },
      // mais produtos...
    ]
  }
}
```