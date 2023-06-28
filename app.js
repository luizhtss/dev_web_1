// Importar as dependências
const express = require('express');
const db = require('./db/database');
const cors = require('cors');
const bcrypt = require('bcrypt');

// Criar uma instância do aplicativo Express
const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());

// Rota para cadastro do usuário.
app.post('/registrar', (req, res) => {
  const { user, password } = req.body;
  // Verificar se o usuário e a senha foram fornecidos
  if (!user || !password) {
    res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
    return;
  }
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Erro ao gerar o hash da senha:', err);
      res.status(500).json({ error: 'Erro ao registrar o usuário' });
      return;
    }

    const query = `
      INSERT INTO users (user, password_hash)
      VALUES (?, ?)
    `;

    db.run(query, [user, hash], function(err) {
      if (err) {
        console.error('Erro ao inserir o usuário:', err);
        res.status(500).json({ error: 'Erro ao registrar o usuário' });
      } else {
        res.json({ message: 'Usuário registrado com sucesso' });
      }
    });
  });
});

// Rota para logar.
app.post('/logar', (req, res) => {
  console.log(req.body)
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
    return;
  }

  const query = `
    SELECT *
    FROM users
    WHERE user = ?
  `;

  db.get(query, [username], (err, row) => {
    if (err) {
      console.error('Erro ao consultar o usuário:', err);
      res.status(500).json({ error: 'Erro ao autenticar o usuário' });
      return;
    }

    if (!row) {
      res.status(401).json({ error: 'Usuário não encontrado' });
      return;
    }

    bcrypt.compare(password, row.password_hash, (err, result) => {
      if (err) {
        console.error('Erro ao comparar as senhas:', err);
        res.status(500).json({ error: 'Erro ao autenticar o usuário' });
        return;
      }

      if (result) {
        res.json({ message: 'Autenticado com sucesso!' });
      } else {
        res.status(401).json({ error: 'Senha incorreta' });
      }
    });
  });
});

// Rota para listar produtos
app.get('/produtos', (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  const offset = (page - 1) * limit;
  const tipoProduto = req.query.tipo;

  // Consulta para obter produtos ordenados por vendas, considerando o filtro de tipo se fornecido
  let query = `
    SELECT *
    FROM products
  `;

  const queryParams = [];

  if (tipoProduto) {
    query += `WHERE category = ? `;
    queryParams.push(tipoProduto);
  }

  query += `ORDER BY sales DESC LIMIT ? OFFSET ?`;
  queryParams.push(limit, offset);

  // Executar a consulta no banco de dados
  db.all(query, queryParams, (err, rows) => {
    if (err) {
      console.error('Erro ao obter os produtos:', err.message);
      res.status(500).json({ error: 'Erro ao obter os produtos' });
    } else {
      // Mapeamento dos resultados.
      const allProducts = rows.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description,
        image_url: row.image_url,
        category: row.category,
        price_in_cents: row.price_in_cents,
        sales: row.sales,
        created_at: row.created_at
      }));

      // Enviar a resposta JSON com os produtos
      res.json({ data: { allProducts } });
    }
  });
});

// Rota para listar produtos mais recentes
app.get('/novidades', (req, res) => {
  const limit = req.query.limit || 12;
  const tipoProduto = req.query.tipo;

  // Consulta para obter produtos, considerando o filtro de tipo se fornecido
  let query = `
    SELECT *
    FROM products
  `;

  const queryParams = [];

  if (tipoProduto) {
    query += `WHERE category = ? `;
    queryParams.push(tipoProduto);
  }

  query += `ORDER BY created_at DESC LIMIT ?`;
  queryParams.push(limit);
  console.log(queryParams)
  console.log(tipoProduto)
  // Executar a consulta no banco de dados
  db.all(query, queryParams, (err, rows) => {
    if (err) {
      console.error('Erro ao obter os produtos:', err.message);
      res.status(500).json({ error: 'Erro ao obter os produtos' });
    } else {
      // Mapeamento dos resultados.
      const allProducts = rows.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description,
        image_url: row.image_url,
        category: row.category,
        price_in_cents: row.price_in_cents,
        sales: row.sales,
        created_at: row.created_at
      }));

      // Enviar a resposta JSON com os produtos
      res.json({ data: { allProducts } });
    }
  });
});

// Rota para listar produtos por preço maior
app.get('/preco-maior', (req, res) => {
  const limit = req.query.limit || 12;
  const tipoProduto = req.query.tipo;

  // Consulta para obter produtos, considerando o filtro de tipo se fornecido
  let query = `
    SELECT *
    FROM products
  `;

  const queryParams = [];

  if (tipoProduto) {
    query += `WHERE category = ? `;
    queryParams.push(tipoProduto);
  }

  query += `ORDER BY price_in_cents DESC LIMIT ?`;
  queryParams.push(limit);

  // Executar a consulta no banco de dados
  db.all(query, queryParams, (err, rows) => {
    if (err) {
      console.error('Erro ao obter os produtos:', err.message);
      res.status(500).json({ error: 'Erro ao obter os produtos' });
    } else {
      // Mapeamento dos resultados.
      const allProducts = rows.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description,
        image_url: row.image_url,
        category: row.category,
        price_in_cents: row.price_in_cents,
        sales: row.sales,
        created_at: row.created_at
      }));

      // Enviar a resposta JSON com os produtos
      res.json({ data: { allProducts } });
    }
  });
});

// Rota para listar produtos por preço menor
app.get('/preco-menor', (req, res) => {
  const limit = req.query.limit || 12;
  const tipoProduto = req.query.tipo;

  // Consulta para obter produtos, considerando o filtro de tipo se fornecido
  let query = `
    SELECT *
    FROM products
  `;

  const queryParams = [];

  if (tipoProduto) {
    query += `WHERE category = ? `;
    queryParams.push(tipoProduto);
  }

  query += `ORDER BY price_in_cents ASC LIMIT ?`;
  queryParams.push(limit);

  // Executar a consulta no banco de dados
  db.all(query, queryParams, (err, rows) => {
    if (err) {
      console.error('Erro ao obter os produtos:', err.message);
      res.status(500).json({ error: 'Erro ao obter os produtos' });
    } else {
      // Mapeamento dos resultados.
      const allProducts = rows.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description,
        image_url: row.image_url,
        category: row.category,
        price_in_cents: row.price_in_cents,
        sales: row.sales,
        created_at: row.created_at
      }));

      // Enviar a resposta JSON com os produtos
      res.json({ data: { allProducts } });
    }
  });
});

// Rota para listar produtos de uma categoria específica (mugs)
app.get('/mugs', (req, res) => {
  const limit = req.query.limit || 12;

  // Consulta para obter produtos de uma categoria específica (mugs) ordenados por data de criação
  const query = `
    SELECT *
    FROM products
    WHERE category = ?
    ORDER BY created_at DESC
    LIMIT ?
  `;

  // Executar a consulta no banco de dados
  db.all(query, ["mugs", limit], (err, rows) => {
    if (err) {
      console.error('Erro ao obter os produtos:', err.message);
      res.status(500).json({ error: 'Erro ao obter os produtos' });
    } else {
      // Mapeamento dos resultados
      const allProducts = rows.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description,
        image_url: row.image_url,
        category: row.category,
        price_in_cents: row.price_in_cents,
        sales: row.sales,
        created_at: row.created_at
      }));

      // Enviar a resposta JSON com os produtos
      res.json({ data: { allProducts } });
    }
  });
});

// Rota para listar produtos de uma categoria específica (t-shirts)
app.get('/t-shirts', (req, res) => {
  const limit = req.query.limit || 12;

  // Consulta para obter produtos de uma categoria específica (t-shirts) ordenados por data de criação
  const query = `
    SELECT *
    FROM products
    WHERE category = ?
    ORDER BY created_at DESC
    LIMIT ?
  `;

  // Executar a consulta no banco de dados
  db.all(query, ["t-shirts", limit], (err, rows) => {
    if (err) {
      console.error('Erro ao obter os produtos:', err.message);
      res.status(500).json({ error: 'Erro ao obter os produtos' });
    } else {
      // Mapeamento dos resultados.
      const allProducts = rows.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description,
        image_url: row.image_url,
        category: row.category,
        price_in_cents: row.price_in_cents,
        sales: row.sales,
        created_at: row.created_at
      }));

      // Enviar a resposta JSON com os produtos
      res.json({ data: { allProducts } });
    }
  });
});

// Rota para buscar produtos pelo nome
app.get('/buscar', (req, res) => {
  const limit = req.query.limit || 12;
  console.log(req.query);
  // Obter o parâmetro de consulta 'nome' da URL
  const productName = req.query.nome;

  // Consulta para obter produtos que correspondem ao nome fornecido
  const query = `
    SELECT *
    FROM products
    WHERE name LIKE ?
    LIMIT ?
  `;

  // Executar a consulta no banco de dados
  db.all(query, [`%${productName}%`, limit], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err.message);
      res.status(500).json({ error: 'Erro ao buscar produtos' });
    } else {
      const matchedProducts = rows.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description,
        image_url: row.image_url,
        category: row.category,
        price_in_cents: row.price_in_cents,
        sales: row.sales,
        created_at: row.created_at
      }));

      // Enviar a resposta JSON com os produtos correspondentes
      res.json({ data: { matchedProducts } });
    }
  });
});


// Iniciar o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
