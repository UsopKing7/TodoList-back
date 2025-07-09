# 📝 TODO List API

API RESTful para gestión de tareas, desarrollada con Node.js con TypeScript, Express, PostgreSQL y Prisma ORM.  
Dockerizada para facilitar el despliegue local y en producción.

----

## Tegnologias

- Node.js + Express
- PostgreSQL
- Prisma ORM
- Docker + Docker compose
- TypeScript

----

## Requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

## Instalacion local de Docker

### Clonar el repositorio 
```bash
  git clone https://github.com/UsopKing7/TodoList-back.git
  cd TodoList-back
```

### Instalacion de dependecias
```bash
  npm i
```


## Levantar contenedores y construir imágenes
```bash
  docker compose up --build
```
## Entrar al contenedor backend
```bash
  docker exec -it backend-todolist_back-1 sh
```

## Ejecutar migraciones Prisma (crear tablas, etc)
```bash
  npx prisma migrate deploy
```


## Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar este proyecto, puedes seguir estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu cambio 
3. Realiza tus cambios y haz commit de ellos 
4. Sube tus cambios a tu fork 
5. Abre un pull request desde tu fork hacia el repositorio original.

## Soporte

Si tienes problemas al utilizar este script o tienes preguntas, no dudes en abrir un **issue** en el repositorio. Nos esforzamos por responder lo antes posible y ayudar a resolver cualquier inconveniente.

## Agradecimientos

Gracias por utilizar este proyecto. Si lo encuentras útil, ¡no dudes en dejar una estrella ⭐ en GitHub!
