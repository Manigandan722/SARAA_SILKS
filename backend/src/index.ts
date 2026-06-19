import path from 'path';
import fs from 'fs';

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: any }) {
    try {
      console.log('Strapi bootstrap starting...');
      
      // Give public role access to find/findOne for products/categories and create for orders
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' }
      });
      
      if (publicRole) {
        const roleId = publicRole.id;
        const permissions = [
          { action: 'api::product.product.find', role: roleId },
          { action: 'api::product.product.findone', role: roleId },
          { action: 'api::category.category.find', role: roleId },
          { action: 'api::category.category.findone', role: roleId },
          { action: 'api::order.order.create', role: roleId }
        ];
        for (const p of permissions) {
          const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
            where: { action: p.action, role: p.role }
          });
          if (!existing) {
            await strapi.db.query('plugin::users-permissions.permission').create({ data: p });
            console.log(`Granted permission for ${p.action}`);
          }
        }
      } else {
        console.log('Public role not found');
      }

      // Check if we need to seed
      const productCount = await strapi.documents('api::product.product').count();
      if (productCount < 20) {
        console.log('Fewer than 20 products found, re-seeding...');

        // Clear existing categories and products to avoid duplicates
        await strapi.db.query('api::product.product').deleteMany({ where: {} });
        await strapi.db.query('api::category.category').deleteMany({ where: {} });
        console.log('Cleared old products and categories.');

        // Helper to upload images programmatically
        const uploadImage = async (imageName: string) => {
          const filePath = path.join(process.cwd(), 'public', imageName);
          if (!fs.existsSync(filePath)) {
            console.log(`Seed image not found at: ${filePath}`);
            return null;
          }
          
          // Check if already in DB
          const existing = await strapi.db.query('plugin::upload.file').findOne({
            where: { name: imageName }
          });
          if (existing) {
            console.log(`Reusing existing uploaded image: ${imageName}`);
            return existing;
          }
          
          const stats = fs.statSync(filePath);
          const fileData = {
            filepath: filePath,
            originalFilename: imageName,
            mimetype: 'image/png',
            size: stats.size,
          };
          
          const uploaded = await strapi.plugin('upload').service('upload').upload({
            data: {},
            files: fileData
          });
          
          console.log(`Uploaded seed image: ${imageName}`);
          return uploaded[0];
        };

        // Upload all images
        const imageMap: any = {};
        for (const name of ['saree.png', 'chudithar.png', 'nighty.png', 'menswear.png', 'kidswear.png']) {
          try {
            const fileObj = await uploadImage(name);
            if (fileObj) {
              imageMap[name] = fileObj.id; // or documentId, let's keep database ID or documentId depending on Strapi v5 usage
            }
          } catch (e) {
            console.error(`Failed to upload ${name}:`, e);
          }
        }

        // Seed 8 Categories
        const categoriesList = [
          { name: 'Sarees', slug: 'sarees' },
          { name: 'Chudithar', slug: 'chudithar' },
          { name: "Women's Nighties (Own Manufacturing)", slug: 'nighties' },
          { name: "Women's Wear", slug: 'women-s-wear' },
          { name: "Men's Wear", slug: 'men-s-wear' },
          { name: 'Dhoti Collection', slug: 'dhoti-collection' },
          { name: 'Kids Wear', slug: 'kids-wear' },
          { name: 'Newborn Baby Dress', slug: 'newborn-baby-dress' }
        ];

        const categoryDbMap: any = {};
        for (const cat of categoriesList) {
          const createdCat = await strapi.documents('api::category.category').create({
            data: {
              name: cat.name,
              slug: cat.slug,
              publishedAt: new Date()
            }
          });
          categoryDbMap[cat.slug] = createdCat.documentId;
          console.log(`Created category: ${cat.name}`);
        }

        // Seed 20 products
        const productsList = [
          { title: 'Kanchipuram Silk Saree', price: 5499, sku: 'SAR-KAN-001', categorySlug: 'sarees', imageName: 'saree.png', description: 'Exquisite Kanchipuram silk saree featuring traditional copper and gold zari borders, handwoven with ultimate precision.' },
          { title: 'Banarasi Brocade Saree', price: 6999, sku: 'SAR-BAN-002', categorySlug: 'sarees', imageName: 'saree.png', description: 'Luxurious Banarasi silk saree adorned with intricate floral brocade and rich golden pallu.' },
          { title: 'Coimbatore Soft Cotton Saree', price: 1899, sku: 'SAR-COT-003', categorySlug: 'sarees', imageName: 'saree.png', description: 'Lightweight soft cotton saree from Coimbatore, perfect for daily elegance and summer comfort.' },
          { title: 'Designer Georgette Saree', price: 2499, sku: 'SAR-GEO-004', categorySlug: 'sarees', imageName: 'saree.png', description: 'Chic georgette saree featuring delicate copper border work, ideal for evening parties.' },
          
          { title: 'Anarkali Embroidered Chudithar', price: 2199, sku: 'CHD-ANA-005', categorySlug: 'chudithar', imageName: 'chudithar.png', description: 'Flared Anarkali chudithar suit with detailed golden embroidery on premium georgette fabric.' },
          { title: 'Daily Wear Cotton Salwar Suit', price: 899, sku: 'CHD-COT-006', categorySlug: 'chudithar', imageName: 'chudithar.png', description: 'Soft breathable cotton salwar kameez set, optimized for premium comfort all day long.' },
          { title: 'Party Wear Georgette Suit', price: 2799, sku: 'CHD-GEO-007', categorySlug: 'chudithar', imageName: 'chudithar.png', description: 'Glamorous georgette salwar suit with heavy sequence and zari embroidery details.' },
          
          { title: 'Comfort Fit Floral Cotton Nighty', price: 499, sku: 'NYT-FLO-008', categorySlug: 'nighties', imageName: 'nighty.png', description: 'Own manufactured pure cotton printed nighty. Relaxed fit, long-lasting fabric, direct from Coimbatore.' },
          { title: 'Premium Printed Feeding Nighty', price: 599, sku: 'NYT-FED-009', categorySlug: 'nighties', imageName: 'nighty.png', description: 'Convenient and comfortable cotton maternity feeding nighty with zipper detailing.' },
          { title: 'Pure Cotton Batik Print Nighty', price: 550, sku: 'NYT-BAT-010', categorySlug: 'nighties', imageName: 'nighty.png', description: 'Beautiful handmade batik print cotton nightwear, manufactured in-house for high quality.' },
          
          { title: 'Ethnic Cotton Kurti', price: 799, sku: 'WMN-KRT-011', categorySlug: 'women-s-wear', imageName: 'chudithar.png', description: 'Stylish straight-cut cotton kurti with neck embroidery, perfect for office and casual wear.' },
          { title: 'Silk Short Kurti', price: 1199, sku: 'WMN-SHR-012', categorySlug: 'women-s-wear', imageName: 'chudithar.png', description: 'Premium silk short kurti with bell sleeves and elegant thread work details.' },
          
          { title: 'Traditional Silk Kurta', price: 1499, sku: 'MEN-KRT-013', categorySlug: 'men-s-wear', imageName: 'menswear.png', description: 'Classic men\'s silk blend kurta, features elegant collar and soft shine suitable for weddings.' },
          { title: 'Premium Cotton Wedding Kurta', price: 1999, sku: 'MEN-WED-014', categorySlug: 'men-s-wear', imageName: 'menswear.png', description: 'Exquisite jacquard cotton kurta with fine embroidery on neckline and sleeves.' },
          
          { title: 'Pure Silk Dhoti with Gold Zari Border', price: 1299, sku: 'DHT-SLK-015', categorySlug: 'dhoti-collection', imageName: 'menswear.png', description: 'Traditional South Indian pure silk dhoti with a thick gold zari border, perfect for festivals.' },
          { title: 'Cotton Dhoti and Angavastram Set', price: 899, sku: 'DHT-COT-016', categorySlug: 'dhoti-collection', imageName: 'menswear.png', description: 'Premium cotton dhoti paired with matching angavastram shawl for formal traditional ceremonies.' },
          
          { title: 'Traditional Pattu Pavadai for Girls', price: 1199, sku: 'KID-PAT-017', categorySlug: 'kids-wear', imageName: 'kidswear.png', description: 'Vibrant silk pattu pavadai lehenga set for young girls, detailed with traditional gold zari work.' },
          { title: 'Kids Silk Sherwani Set', price: 1499, sku: 'KID-SHR-018', categorySlug: 'kids-wear', imageName: 'kidswear.png', description: 'Charming silk sherwani suit for boys, comes with contrasting churidar pants.' },
          
          { title: 'Newborn Organic Cotton Jumpsuits Pack of 3', price: 699, sku: 'NBN-JMP-019', categorySlug: 'newborn-baby-dress', imageName: 'kidswear.png', description: 'Ultra-soft organic cotton jumpsuits for newborn babies, pack of 3 gentle pastel designs.' },
          { title: 'Soft Cotton Baby Rompers', price: 450, sku: 'NBN-RMP-020', categorySlug: 'newborn-baby-dress', imageName: 'kidswear.png', description: 'Premium quality daily wear cotton baby rompers with snap button closure for easy changing.' }
        ];

        for (const p of productsList) {
          const categoryId = categoryDbMap[p.categorySlug];
          const imageId = imageMap[p.imageName];
          const createdProduct = await strapi.documents('api::product.product').create({
            data: {
              title: p.title,
              price: p.price,
              sku: p.sku,
              description: p.description,
              category: categoryId,
              image: imageId
            }
          });
          await strapi.documents('api::product.product').publish({
            documentId: createdProduct.documentId
          });
          console.log(`Created & Published product: ${p.title}`);
        }
        console.log('Database seeding successfully finished!');
      } else {
        console.log(`Found ${productCount} products, skipping seed.`);
      }
    } catch (e) {
      console.error('Bootstrap failed:', e);
    }
  },
};
