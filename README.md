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
    ├── api/
    ├── services/
    ├── hooks/
    ├── pages/
    ├── components/
    └── config/

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
2. `Login.jsx` llama a `factusAuth.login()`  
3. Se realiza `POST` a `/oauth/token`  
4. Se reciben los tokens  
5. `tokenStorage.saveAuth()` guarda la sesión  
6. La app utiliza el `access_token` para futuras peticiones  

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
