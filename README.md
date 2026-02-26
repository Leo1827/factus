# React + Vite

Proyecto frontend construido con **React** y **Vite**, que implementa autenticación OAuth2 usando Axios y almacenamiento local de sesión.

---

## Tecnologías

- **Axios** → Cliente HTTP para consumir la API  
- **React** → Manejo de UI y estado  
- **Vite** → Bundler y entorno de desarrollo  

---

## Estructura del proyecto

    src/
    ├── features/
        ├── auth
            ├── components
            ├── hooks
            ├── pages
            ├── services
        ├── dashboard
            ├── components
            ├── pages
            ├── services
    ├── shared
        ├── api
        ├── components
        ├── storage

## Login / Autenticación

  Este proyecto implementa autenticación **OAuth2** utilizando Axios y `localStorage` para manejar la sesión del usuario.

---

## Arquitectura

### Login  
  `src/pages/Login.jsx`

**Responsabilidades:**

  - Capturar credenciales del usuario  
  - Invocar el servicio de autenticación  
  - Manejar errores de login  

---

### Servicio de Autenticación  
  `src/services/factusAuth.js`

**Responsabilidades:**

  - Comunicarse con la API Factus  
  - Enviar credenciales en formato `application/x-www-form-urlencoded`  
  - Recibir `access_token` y `refresh_token`  
  - Delegar el almacenamiento al módulo de tokens  

---

### Router principal  
  `src/app.jsx`

**Responsabilidades:**

  - Configurar React Router v6
  - Definir rutas públicas y privadas
  - Redirigir rutas desconocidas a /login

---

### PrivateRoute
  `src/shared/components/PrivateRoute.jsx`
    Protege las rutas que requieren autenticación.

**Responsabilidades:**

  - Permite acceso si el token es válido
  - Redirige a /login si no hay sesión
  - Redirige a /login si el token expiró

---

### PublicRoute
  `src/shared/components/PublicRoute.jsx`
    Evita que usuarios autenticados accedan al login.

**Responsabilidades:**

  - Permite acceso si NO hay sesión
  - Redirige a /dashboard si el usuario ya está autenticado

---

### Dashboard  
  `src/features/dashboard/pages/Dashboard.jsx`

**Responsabilidades:**

- Punto de entrada para usuarios autenticados
- Base para futuras funcionalidades del sistema

---

### Interceptor  
  `src/api/axiosClient.js`

**Responsabilidades:**

- Agregar Authorization header
- Refrescar automáticamente 
- Manejar logout si falla refresh 

---

### Manejo de Tokens  
  `src/config/tokenStorage.js`

**Responsabilidades:**

- Persistir tokens en `localStorage`  
- Calcular expiración (`expires_in`)  
- Verificar si el token está vencido  
- Permitir cerrar sesión  

---

## Flujo de autenticación

1. Usuario envía formulario de login
2. Login.jsx llama a factusAuth.login()
3. Se realiza POST a /oauth/token
4. Se reciben los tokens
5. tokenStorage.saveAuth() guarda la sesión
6. La app redirige a /dashboard
7. PrivateRoute valida acceso a rutas protegidas
8. PublicRoute bloquea el login si ya hay sesión
9. La app usa el access_token en futuras peticiones

---

## Variables de entorno requeridas

Crea un archivo `.env` en la raíz del proyecto:

    VITE_FACTUS_BASE_URL=
    VITE_FACTUS_CLIENT_ID=
    VITE_FACTUS_CLIENT_SECRET=

    ---

## ▶ Ejecución del proyecto

```bash
    npm install
    npm run dev


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).
