const fs = require('fs');
const path = require('path');

const apis = ['product', 'category'];

apis.forEach(api => {
  const dirs = [
    `backend/src/api/${api}`,
    `backend/src/api/${api}/content-types`,
    `backend/src/api/${api}/content-types/${api}`,
    `backend/src/api/${api}/controllers`,
    `backend/src/api/${api}/routes`,
    `backend/src/api/${api}/services`
  ];

  dirs.forEach(d => {
    const dirPath = path.join(__dirname, d);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });

  const controller = `'use strict';\nconst { createCoreController } = require('@strapi/strapi').factories;\nmodule.exports = createCoreController('api::${api}.${api}');`;
  fs.writeFileSync(path.join(__dirname, `backend/src/api/${api}/controllers/${api}.js`), controller);

  const route = `'use strict';\nconst { createCoreRouter } = require('@strapi/strapi').factories;\nmodule.exports = createCoreRouter('api::${api}.${api}');`;
  fs.writeFileSync(path.join(__dirname, `backend/src/api/${api}/routes/${api}.js`), route);

  const service = `'use strict';\nconst { createCoreService } = require('@strapi/strapi').factories;\nmodule.exports = createCoreService('api::${api}.${api}');`;
  fs.writeFileSync(path.join(__dirname, `backend/src/api/${api}/services/${api}.js`), service);
});

// Write schemas
const categorySchema = {
  kind: "collectionType",
  collectionName: "categories",
  info: { singularName: "category", pluralName: "categories", displayName: "Category" },
  options: { draftAndPublish: false },
  attributes: {
    name: { type: "string", required: true },
    slug: { type: "uid", targetField: "name", required: true },
    products: { type: "relation", relation: "oneToMany", target: "api::product.product", mappedBy: "category" }
  }
};
fs.writeFileSync(path.join(__dirname, `backend/src/api/category/content-types/category/schema.json`), JSON.stringify(categorySchema, null, 2));

const productSchema = {
  kind: "collectionType",
  collectionName: "products",
  info: { singularName: "product", pluralName: "products", displayName: "Product" },
  options: { draftAndPublish: true },
  attributes: {
    title: { type: "string", required: true },
    description: { type: "text" },
    price: { type: "decimal", required: true },
    sku: { type: "string", unique: true },
    category: { type: "relation", relation: "manyToOne", target: "api::category.category", inversedBy: "products" }
  }
};
fs.writeFileSync(path.join(__dirname, `backend/src/api/product/content-types/product/schema.json`), JSON.stringify(productSchema, null, 2));

console.log("Strapi APIs created successfully");
