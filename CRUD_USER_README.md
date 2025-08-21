# CRUD de Usuario - API Endpoints

Este documento describe los endpoints disponibles para el CRUD completo de usuarios en la aplicación.

## Endpoints Disponibles

### 1. Crear Usuario
- **Método:** POST
- **Ruta:** `/users`
- **Body:**
```json
{
  "name": "Nombre del Usuario"
}
```
- **Respuesta exitosa:**
```json
{
  "statusCode": 200,
  "data": {
    "id": "uuid-generado",
    "name": "Nombre del Usuario"
  },
  "message": "Usuario creado exitosamente"
}
```

### 2. Obtener Usuario por ID
- **Método:** GET
- **Ruta:** `/users/{id}`
- **Parámetros:** `id` en la URL
- **Respuesta exitosa:**
```json
{
  "statusCode": 200,
  "data": {
    "id": "uuid-del-usuario",
    "name": "Nombre del Usuario"
  },
  "message": "Usuario encontrado exitosamente"
}
```

### 3. Obtener Todos los Usuarios
- **Método:** GET
- **Ruta:** `/users`
- **Respuesta exitosa:**
```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "uuid-1",
      "name": "Usuario 1"
    },
    {
      "id": "uuid-2",
      "name": "Usuario 2"
    }
  ],
  "message": "Se encontraron 2 usuarios",
  "count": 2
}
```

### 4. Actualizar Usuario
- **Método:** PUT
- **Ruta:** `/users/{id}`
- **Parámetros:** `id` en la URL
- **Body:**
```json
{
  "name": "Nuevo Nombre"
}
```
- **Respuesta exitosa:**
```json
{
  "statusCode": 200,
  "data": {
    "id": "uuid-del-usuario",
    "name": "Nuevo Nombre"
  },
  "message": "Usuario actualizado exitosamente"
}
```

### 5. Eliminar Usuario
- **Método:** DELETE
- **Ruta:** `/users/{id}`
- **Parámetros:** `id` en la URL
- **Respuesta exitosa:**
```json
{
  "statusCode": 200,
  "data": {
    "id": "uuid-del-usuario"
  },
  "message": "Usuario eliminado exitosamente"
}
```

## Estructura de la Arquitectura Hexagonal

### Domain Layer
- **Entities:** `User` - Entidad principal del usuario
- **Repositories:** `IUserRepository` - Interfaz para operaciones de persistencia
- **Models:** `UserModel` - Modelo de DynamoDB

### Application Layer
- **Use Cases:**
  - `CreateUserUseCase` - Crear usuario
  - `GetUserUseCase` - Obtener usuario por ID
  - `GetAllUsersUseCase` - Obtener todos los usuarios
  - `UpdateUserUseCase` - Actualizar usuario
  - `DeleteUserUseCase` - Eliminar usuario

### Infrastructure Layer
- **Adapters:** `DynamoUserRepository` - Implementación con DynamoDB
- **Container:** Configuración de inyección de dependencias

### Interface Layer
- **HTTP Router:** Manejo de rutas HTTP
- **Use Cases HTTP:** Adaptadores para la capa HTTP

## Manejo de Errores

Todos los endpoints incluyen manejo de errores robusto:

- **400 Bad Request:** Datos de entrada inválidos
- **404 Not Found:** Usuario no encontrado
- **500 Internal Server Error:** Errores del servidor

## Ejemplos de Uso

### Crear un usuario
```bash
curl -X POST https://your-api-gateway-url/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Juan Pérez"}'
```

### Obtener un usuario
```bash
curl -X GET https://your-api-gateway-url/users/123e4567-e89b-12d3-a456-426614174000
```

### Actualizar un usuario
```bash
curl -X PUT https://your-api-gateway-url/users/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{"name": "Juan Carlos Pérez"}'
```

### Eliminar un usuario
```bash
curl -X DELETE https://your-api-gateway-url/users/123e4567-e89b-12d3-a456-426614174000
```

## Notas Importantes

1. **La tabla DynamoDB debe existir** antes de usar estos endpoints
2. **Los IDs se generan automáticamente** usando UUID v4
3. **Todos los endpoints incluyen logging** para debugging
4. **La validación de datos** se realiza en la capa de aplicación
5. **Los errores se manejan de forma consistente** en toda la aplicación
