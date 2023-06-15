const sqlite3 = require('sqlite3').verbose();
const faker = require('faker');
const { v4: uuidv4 } = require('uuid');

const db = new sqlite3.Database('./db/database.sqlite');

db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT,
    description TEXT,
    image_url TEXT,
    category TEXT,
    price_in_cents INTEGER,
    sales INTEGER,
    created_at TEXT
  );
`, (error) => {
  if (error) {
    console.error('Erro ao criar tabela:', error.message);
  } else {
    console.log('Tabela "products" criada com sucesso.');
    db.run('DELETE FROM products')
    const baseProducts = [
        { name: 'Caneca de cerâmica rústica', description: faker.lorem.paragraph(), image_url: 'https://storage.googleapis.com/xesque-dev/challenge-images/caneca-06.jpg', category: 'mugs' },
        { name: 'Camiseta not today.', description: faker.lorem.paragraph(), image_url: 'https://storage.googleapis.com/xesque-dev/challenge-images/camiseta-05.jpg', category: 't-shirts' },
        { name: 'Caneca Black Ring', description: faker.lorem.paragraph(), image_url: 'https://storage.googleapis.com/xesque-dev/challenge-images/caneca-04.jpg', category: 'mugs' },
        { name: 'Camiseta Broken Saints', description: faker.lorem.paragraph(), image_url: 'https://storage.googleapis.com/xesque-dev/challenge-images/camiseta-03.jpg', category: 't-shirts' },
        { name: 'Camiseta Outcast', description: faker.lorem.paragraph(), image_url: 'https://storage.googleapis.com/xesque-dev/challenge-images/camiseta-06.jpg', category: 't-shirts' },
        { name: 'Caneca The Grounds', description: faker.lorem.paragraph(), image_url: 'https://storage.googleapis.com/xesque-dev/challenge-images/caneca-05.jpg', category: 'mugs' },
        { name: 'Camiseta evening', description: faker.lorem.paragraph(), image_url: 'https://storage.googleapis.com/xesque-dev/challenge-images/camiseta-02.jpg', category: 't-shirts' },
        { name: 'Caneca preto fosco', description: faker.lorem.paragraph(), image_url: 'https://storage.googleapis.com/xesque-dev/challenge-images/caneca-01.jpg', category: 'mugs' },
        { name: 'Caneca Never settle', description: faker.lorem.paragraph(), image_url: 'https://storage.googleapis.com/xesque-dev/challenge-images/caneca-03.jpg', category: 'mugs' },
        { name: 'Camiseta DREAMER', description: faker.lorem.paragraph(), image_url: 'https://storage.googleapis.com/xesque-dev/challenge-images/camiseta-01.jpg', category: 't-shirts' },
        { name: 'Caneca Decaf! P&Co', description: faker.lorem.paragraph(), image_url: 'https://storage.googleapis.com/xesque-dev/challenge-images/caneca-02.jpg', category: 'mugs' },
        { name: 'Camiseta Ramones', description: faker.lorem.paragraph(), image_url: 'https://storage.googleapis.com/xesque-dev/challenge-images/camiseta-04.jpg', category: 't-shirts' }
    ];

    function generateUUID() {
      return uuidv4();
    }

    baseProducts.forEach(product => {
      const id = generateUUID();
      const created_at = new Date().toISOString();

      const query = `
        INSERT INTO products (id, name, description, image_url, category, price_in_cents, sales, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [id, product.name, product.description, product.image_url, product.category, faker.random.number(10000), faker.random.number(100), created_at];

      db.run(query, values, function (err) {
        if (err) {
          console.error('Erro ao inserir o produto:', err.message);
        } else {
          console.log('Produto inserido com sucesso. ID:', id);
        }
      });
    });
  }
});

module.exports = db;
