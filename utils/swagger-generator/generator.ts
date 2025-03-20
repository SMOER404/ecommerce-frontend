import { SwaggerSchema, GeneratedService, GeneratedMethod, GeneratedParameter } from './types';
import * as fs from 'fs';
import * as path from 'path';

export class SwaggerGenerator {
  private swagger: SwaggerSchema;
  private services: Map<string, GeneratedService> = new Map();

  constructor(swaggerJson: SwaggerSchema) {
    this.swagger = swaggerJson;
  }

  generate(): void {
    // Группируем методы по тегам
    Object.entries(this.swagger.paths).forEach(([path, methods]) => {
      Object.entries(methods).forEach(([method, operation]) => {
        const tags = operation.tags || ['default'];
        tags.forEach(tag => {
          if (!this.services.has(tag)) {
            this.services.set(tag, {
              name: this.toPascalCase(tag),
              methods: [],
              imports: []
            });
          }
          const service = this.services.get(tag)!;
          service.methods.push(this.generateMethod(path, method, operation));
        });
      });
    });

    // Генерируем файлы для каждого сервиса
    this.services.forEach((service, tag) => {
      this.generateServiceFile(service, tag);
    });
  }

  private generateMethod(path: string, method: string, operation: any): GeneratedMethod {
    const parameters: GeneratedParameter[] = [];
    
    // Добавляем параметры пути
    if (operation.parameters) {
      operation.parameters.forEach((param: any) => {
        parameters.push({
          name: param.name,
          type: this.getTypeFromSchema(param.schema),
          required: param.required || false,
          in: param.in,
          description: param.description
        });
      });
    }

    // Добавляем тело запроса
    if (operation.requestBody) {
      const schema = operation.requestBody.content['application/json'].schema;
      parameters.push({
        name: 'data',
        type: this.getTypeFromSchema(schema),
        required: operation.requestBody.required || false,
        in: 'body',
        description: operation.requestBody.description
      });
    }

    // Определяем тип возвращаемого значения
    const response = operation.responses['200'] || operation.responses['201'];
    const returnType = response?.content?.['application/json']?.schema
      ? this.getTypeFromSchema(response.content['application/json'].schema)
      : 'void';

    return {
      name: this.generateMethodName(operation.operationId || path, method),
      path,
      method,
      parameters,
      returnType,
      description: operation.description
    };
  }

  private generateMethodName(operationId: string, method: string): string {
    if (operationId) {
      return this.toCamelCase(operationId);
    }
    const pathParts = operationId.split('/').filter(Boolean);
    return this.toCamelCase(`${method}${pathParts.map(this.toPascalCase).join('')}`);
  }

  private getTypeFromSchema(schema: any): string {
    if (schema.$ref) {
      const refName = schema.$ref.split('/').pop();
      return this.toPascalCase(refName);
    }

    switch (schema.type) {
      case 'string':
        return 'string';
      case 'number':
        return 'number';
      case 'integer':
        return 'number';
      case 'boolean':
        return 'boolean';
      case 'array':
        return `${this.getTypeFromSchema(schema.items)}[]`;
      case 'object':
        if (!schema.properties) return 'Record<string, any>';
        return this.generateInterface(schema);
      default:
        return 'any';
    }
  }

  private generateInterface(schema: any): string {
    const properties = Object.entries(schema.properties || {}).map(([name, prop]: [string, any]) => {
      const type = this.getTypeFromSchema(prop);
      const required = schema.required?.includes(name) || false;
      return `  ${name}${required ? '' : '?'}: ${type};`;
    }).join('\n');

    return `{\n${properties}\n}`;
  }

  private generateServiceFile(service: GeneratedService, tag: string): void {
    const imports = [
      'import axios from \'axios\';',
      'import { AxiosInstance } from \'axios\';',
      ...Array.from(service.imports)
    ].join('\n');

    const methods = service.methods.map(method => this.generateMethodImplementation(method)).join('\n\n');

    const content = `${imports}

export class ${service.name}Service {
  constructor(private readonly api: AxiosInstance) {}

${methods}
}
`;

    const outputDir = path.join(process.cwd(), 'src', 'services');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(outputDir, `${this.toKebabCase(tag)}.service.ts`),
      content
    );
  }

  private generateMethodImplementation(method: GeneratedMethod): string {
    const params = method.parameters.map(param => {
      if (param.in === 'body') {
        return `data: ${param.type}`;
      }
      return `${param.name}${param.required ? '' : '?'}: ${param.type}`;
    }).join(', ');

    const axiosParams = method.parameters.map(param => {
      switch (param.in) {
        case 'path':
          return `\`${method.path.replace(`{${param.name}}`, '${' + param.name + '}')}\``;
        case 'query':
          return `{ params: { ${param.name} } }`;
        case 'body':
          return `{ data }`;
        default:
          return '';
      }
    }).filter(Boolean).join(', ');

    return `  async ${method.name}(${params}): Promise<${method.returnType}> {
    const response = await this.api.${method.method}(${axiosParams});
    return response.data;
  }`;
  }

  private toPascalCase(str: string): string {
    return str
      .split(/[-_/]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }

  private toCamelCase(str: string): string {
    return str
      .split(/[-_/]/)
      .map((word, index) => 
        index === 0 
          ? word.toLowerCase() 
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join('');
  }

  private toKebabCase(str: string): string {
    return str
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .toLowerCase();
  }
} 