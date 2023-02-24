#### Ambiente

- **Sistema Operativo:** Ubuntu 20.04 LTS
- **Node:** v17.7.2
- **Nvm:** 0.38.0
- **Npm:** 8.5.2



#### Levantar Proyecto

- **Instalar dependencias** `npm install`
- **Correr Migraciones** `npx sequelize-cli db:migrate`
- **Ejecutar Proyecto** `npm start`
- **Correr Seeders** `npx sequelize-cli db:seed:all`

- **Levantar Proyecto** `npm start`



#### Rutas Auth

##### Registro

```bash
Host: http://127.0.0.1:8080/api/auth
Method: POST
Params: {
    "name": "bruno Rey",
    "username": "bruno.rey",
    "password": "12345",
    "repeat_password": "12345"
}
Response: Catch Or Object User
```

**Login**

```bash
Host: http://localhost:8080/api/auth/login
Method: POST
Params: {
    "username": "bruno.rey",
    "password": "12345"
}
Response: {
    "status": "success",
    "message": "Acceso Correcto.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5MzMyMjEwLCJleHAiOjE2NDk0MTg2MTB9.gQ8i9N1w-sKjBzc9N95PhdG8i4QwTNPRy25_Xu_g2RU",
    "data": {
        "user": {
            "id": 1,
            "name": "Rey bruno",
            "email": null,
            "username": "bruno.rey",
            "password": null,
            "api_token": null,
            "state": true,
            "createdAt": "2022-04-05T12:38:05.000Z",
            "updatedAt": "2022-04-05T12:38:05.000Z"
        }
    }
}
```

**Verificar Cookie**

```bash
Host: http://localhost:8080/api/auth/me
Method: GET
Params: {}
Response: {
    "currentUser": {
        "id": 1,
        "name": "Rey bruno",
        "email": null,
        "username": "bruno.rey",
        "password": null,
        "api_token": null,
        "state": true,
        "createdAt": "2022-04-05T12:38:05.000Z",
        "updatedAt": "2022-04-05T12:38:05.000Z"
    }
}
```
