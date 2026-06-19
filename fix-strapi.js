const fs = require('fs');
const path = require('path');

const apis = ['product', 'category'];

apis.forEach(api => {
  const cPathJS = path.join(__dirname, `backend/src/api/${api}/controllers/${api}.js`);
  const rPathJS = path.join(__dirname, `backend/src/api/${api}/routes/${api}.js`);
  const sPathJS = path.join(__dirname, `backend/src/api/${api}/services/${api}.js`);

  if(fs.existsSync(cPathJS)) fs.unlinkSync(cPathJS);
  if(fs.existsSync(rPathJS)) fs.unlinkSync(rPathJS);
  if(fs.existsSync(sPathJS)) fs.unlinkSync(sPathJS);

  const controller = `import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreController('api::${api}.${api}');`;
  fs.writeFileSync(path.join(__dirname, `backend/src/api/${api}/controllers/${api}.ts`), controller);

  const route = `import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreRouter('api::${api}.${api}');`;
  fs.writeFileSync(path.join(__dirname, `backend/src/api/${api}/routes/${api}.ts`), route);

  const service = `import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreService('api::${api}.${api}');`;
  fs.writeFileSync(path.join(__dirname, `backend/src/api/${api}/services/${api}.ts`), service);
});
console.log("Fixed to TS");
