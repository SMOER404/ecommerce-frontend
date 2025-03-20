export interface SwaggerSchema {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
  };
  paths: {
    [path: string]: {
      [method: string]: SwaggerOperation;
    };
  };
  components?: {
    schemas?: {
      [name: string]: SwaggerSchemaDefinition;
    };
  };
}

export interface SwaggerOperation {
  summary?: string;
  description?: string;
  operationId?: string;
  parameters?: SwaggerParameter[];
  requestBody?: SwaggerRequestBody;
  responses: {
    [code: string]: SwaggerResponse;
  };
  tags?: string[];
}

export interface SwaggerParameter {
  name: string;
  in: 'query' | 'path' | 'header' | 'cookie';
  required?: boolean;
  schema: SwaggerSchemaDefinition;
  description?: string;
}

export interface SwaggerRequestBody {
  required?: boolean;
  content: {
    [contentType: string]: {
      schema: SwaggerSchemaDefinition;
    };
  };
}

export interface SwaggerResponse {
  description: string;
  content?: {
    [contentType: string]: {
      schema: SwaggerSchemaDefinition;
    };
  };
}

export interface SwaggerSchemaDefinition {
  type: string;
  properties?: {
    [name: string]: SwaggerSchemaDefinition;
  };
  required?: string[];
  items?: SwaggerSchemaDefinition;
  enum?: string[];
  format?: string;
  $ref?: string;
  nullable?: boolean;
}

export interface GeneratedService {
  name: string;
  methods: GeneratedMethod[];
  imports: string[];
}

export interface GeneratedMethod {
  name: string;
  path: string;
  method: string;
  parameters: GeneratedParameter[];
  returnType: string;
  description?: string;
}

export interface GeneratedParameter {
  name: string;
  type: string;
  required: boolean;
  in: 'query' | 'path' | 'header' | 'cookie' | 'body';
  description?: string;
} 