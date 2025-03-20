import * as fs from 'fs';
import * as path from 'path';
import { SwaggerGenerator } from '../utils/swagger-generator/generator';

async function main() {
  try {
    // Читаем Swagger JSON
    const swaggerPath = path.join(process.cwd(), 'swagger.json');
    const swaggerJson = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));

    // Создаем генератор
    const generator = new SwaggerGenerator(swaggerJson);

    // Генерируем сервисы
    generator.generate();

    console.log('✅ Сервисы успешно сгенерированы');
  } catch (error) {
    console.error('❌ Ошибка при генерации сервисов:', error);
    process.exit(1);
  }
}

main(); 