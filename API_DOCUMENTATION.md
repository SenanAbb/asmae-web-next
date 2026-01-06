# API Documentation - Sistema de Artículos

Base URL: `http://localhost:3000`

## 🔐 Autenticación

### 1. Login
**POST** `/api/auth/login`

Autentica un usuario y establece una cookie HttpOnly con el token JWT.

**Body:**
```json
{
  "email": "asmae@admin.com",
  "password": "asmae-admin"
}
```

**Response 200:**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "asmae@admin.com"
  }
}
```

**Response 401:**
```json
{
  "error": "Credenciales inválidas"
}
```

---

### 2. Logout
**POST** `/api/auth/logout`

Cierra la sesión eliminando la cookie de autenticación.

**Response 200:**
```json
{
  "success": true,
  "message": "Sesión cerrada exitosamente"
}
```

---

### 3. Recuperar Contraseña
**POST** `/api/auth/forgot-password`

Genera un token de recuperación de contraseña.

**Body:**
```json
{
  "email": "asmae@admin.com"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Si el email existe, recibirás un enlace de recuperación",
  "resetToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 4. Restablecer Contraseña
**POST** `/api/auth/reset-password`

Restablece la contraseña usando el token de recuperación.

**Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "newPassword": "nueva-contraseña-segura"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Contraseña actualizada exitosamente"
}
```

**Response 400:**
```json
{
  "error": "Token inválido o expirado"
}
```

---

## 📝 Artículos (Admin - Requiere Autenticación)

**Nota:** Todas las rutas `/api/admin/*` requieren estar autenticado. La cookie HttpOnly se envía automáticamente.

### 5. Listar Artículos (Admin)
**GET** `/api/admin/articles`

**Query Parameters:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Artículos por página (default: 10)
- `search` (opcional): Búsqueda por título o excerpt
- `published` (opcional): Filtrar por estado de publicación (true/false)

**Ejemplo:** `/api/admin/articles?page=1&limit=10&search=juridico&published=true`

**Response 200:**
```json
{
  "articles": [
    {
      "id": "507f1f77bcf86cd799439011",
      "title": "Título del Artículo",
      "slug": "titulo-del-articulo",
      "excerpt": "Breve descripción del artículo...",
      "content": "<p>Contenido HTML completo...</p>",
      "coverImage": "/images/article-cover.jpg",
      "tags": ["derecho", "juridico"],
      "authorName": "Asmae Kirimov",
      "readingTime": 5,
      "published": true,
      "publishedAt": "2026-01-06T12:00:00.000Z",
      "createdAt": "2026-01-06T12:00:00.000Z",
      "updatedAt": "2026-01-06T12:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

**Response 401:**
```json
{
  "error": "No autorizado. Token no encontrado."
}
```

---

### 6. Crear Artículo (Admin)
**POST** `/api/admin/articles`

**Body:**
```json
{
  "title": "Nuevo Artículo Jurídico",
  "slug": "nuevo-articulo-juridico",
  "excerpt": "Breve descripción del artículo que aparecerá en la lista",
  "content": "<h2>Introducción</h2><p>Contenido HTML del artículo...</p>",
  "coverImage": "/images/article-cover.jpg",
  "tags": ["derecho", "sociedad", "juridico"],
  "authorName": "Asmae Kirimov",
  "readingTime": 8,
  "published": true
}
```

**Campos Requeridos:**
- `title`: Título del artículo
- `slug`: URL-friendly identifier (único)
- `excerpt`: Descripción breve
- `content`: Contenido HTML del artículo
- `authorName`: Nombre del autor

**Campos Opcionales:**
- `coverImage`: URL de la imagen de portada
- `tags`: Array de etiquetas
- `readingTime`: Tiempo de lectura en minutos (default: 5)
- `published`: Estado de publicación (default: true)

**Response 201:**
```json
{
  "success": true,
  "article": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Nuevo Artículo Jurídico",
    "slug": "nuevo-articulo-juridico",
    ...
  }
}
```

**Response 400:**
```json
{
  "error": "Ya existe un artículo con ese slug"
}
```

---

### 7. Obtener Artículo por ID (Admin)
**GET** `/api/admin/articles/{id}`

**Ejemplo:** `/api/admin/articles/507f1f77bcf86cd799439011`

**Response 200:**
```json
{
  "article": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Título del Artículo",
    ...
  }
}
```

**Response 404:**
```json
{
  "error": "Artículo no encontrado"
}
```

---

### 8. Actualizar Artículo (Admin)
**PUT** `/api/admin/articles/{id}`

**Body (todos los campos son opcionales):**
```json
{
  "title": "Título Actualizado",
  "slug": "titulo-actualizado",
  "excerpt": "Nueva descripción",
  "content": "<p>Contenido actualizado...</p>",
  "coverImage": "/images/new-cover.jpg",
  "tags": ["derecho", "actualizado"],
  "authorName": "Asmae Kirimov",
  "readingTime": 10,
  "published": false
}
```

**Response 200:**
```json
{
  "success": true,
  "article": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Título Actualizado",
    ...
  }
}
```

**Response 404:**
```json
{
  "error": "Artículo no encontrado"
}
```

---

### 9. Eliminar Artículo (Admin)
**DELETE** `/api/admin/articles/{id}`

**Ejemplo:** `/api/admin/articles/507f1f77bcf86cd799439011`

**Response 200:**
```json
{
  "success": true,
  "message": "Artículo eliminado exitosamente"
}
```

**Response 404:**
```json
{
  "error": "Artículo no encontrado"
}
```

---

## 🌐 Artículos Públicos (Sin Autenticación)

### 10. Listar Artículos Publicados
**GET** `/api/articles`

**Query Parameters:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Artículos por página (default: 10)
- `search` (opcional): Búsqueda por título o excerpt

**Ejemplo:** `/api/articles?page=1&limit=10&search=derecho`

**Response 200:**
```json
{
  "articles": [
    {
      "id": "507f1f77bcf86cd799439011",
      "title": "Título del Artículo",
      "slug": "titulo-del-articulo",
      "excerpt": "Breve descripción...",
      "coverImage": "/images/article-cover.jpg",
      "tags": ["derecho"],
      "authorName": "Asmae Kirimov",
      "readingTime": 5,
      "publishedAt": "2026-01-06T12:00:00.000Z",
      "createdAt": "2026-01-06T12:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "totalPages": 2
  }
}
```

**Nota:** Solo devuelve artículos con `published: true`

---

### 11. Obtener Artículo por Slug
**GET** `/api/articles/{slug}`

**Ejemplo:** `/api/articles/titulo-del-articulo`

**Response 200:**
```json
{
  "article": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Título del Artículo",
    "slug": "titulo-del-articulo",
    "excerpt": "Breve descripción...",
    "content": "<h2>Introducción</h2><p>Contenido completo...</p>",
    "coverImage": "/images/article-cover.jpg",
    "tags": ["derecho", "juridico"],
    "authorName": "Asmae Kirimov",
    "readingTime": 5,
    "published": true,
    "publishedAt": "2026-01-06T12:00:00.000Z",
    "createdAt": "2026-01-06T12:00:00.000Z",
    "updatedAt": "2026-01-06T12:00:00.000Z"
  }
}
```

**Response 404:**
```json
{
  "error": "Artículo no encontrado"
}
```

---

## 📋 Notas Importantes

### Autenticación
- Las rutas `/api/admin/*` requieren autenticación mediante cookie HttpOnly
- El token JWT se establece automáticamente al hacer login
- El token expira en 7 días
- Para probar en Postman, asegúrate de habilitar cookies en la configuración

### Cookies en Postman
1. Haz login primero con `POST /api/auth/login`
2. Postman guardará automáticamente la cookie `auth_token`
3. Las siguientes peticiones a rutas admin usarán esa cookie automáticamente
4. Para cerrar sesión, usa `POST /api/auth/logout`

### Slug
- El **slug** es un identificador único URL-friendly del artículo
- Ejemplo: "Nuevo Artículo Jurídico" → `nuevo-articulo-juridico`
- Se usa en la URL pública: `/articles/nuevo-articulo-juridico`
- Debe ser único en toda la base de datos

### Reading Time
- **readingTime** es el tiempo estimado de lectura en minutos
- Se calcula automáticamente en el frontend basado en el contenido
- Valor por defecto: 5 minutos

### Published
- **published** controla si el artículo es visible públicamente
- `true` (default): El artículo aparece en `/api/articles`
- `false`: Solo visible en admin, no aparece en rutas públicas
- Útil para guardar borradores antes de publicar

### Content
- El campo **content** acepta HTML completo
- Se renderizará usando `dangerouslySetInnerHTML` en el frontend
- Puedes usar cualquier etiqueta HTML: `<h1>`, `<p>`, `<strong>`, `<ul>`, etc.
- El editor TipTap generará HTML automáticamente

---

## 🧪 Flujo de Prueba Recomendado

1. **Login**: `POST /api/auth/login`
2. **Crear artículo**: `POST /api/admin/articles`
3. **Listar artículos admin**: `GET /api/admin/articles`
4. **Obtener artículo por ID**: `GET /api/admin/articles/{id}`
5. **Actualizar artículo**: `PUT /api/admin/articles/{id}`
6. **Ver artículos públicos**: `GET /api/articles`
7. **Ver artículo por slug**: `GET /api/articles/{slug}`
8. **Eliminar artículo**: `DELETE /api/admin/articles/{id}`
9. **Logout**: `POST /api/auth/logout`

---

## ⚠️ Códigos de Error Comunes

- **400**: Bad Request - Datos inválidos o faltantes
- **401**: Unauthorized - No autenticado o token inválido
- **404**: Not Found - Recurso no encontrado
- **500**: Internal Server Error - Error del servidor

---

## 🔧 Variables de Entorno Requeridas

Asegúrate de tener estas variables en tu `.env.local`:

```env
DATABASE_URL="mongodb+srv://asmae-web:asmae-web123.@cluster0.sfzj3vl.mongodb.net/asmae-web?retryWrites=true&w=majority&appName=Cluster0"
JWT_SECRET="b7a6f6f0d6c5413b9b6f3c9c4c1a53c6"
SITE_URL="http://localhost:3000"
```
