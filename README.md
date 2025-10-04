# Imagine App

Aplicación web de gestión de proyectos y tareas, construida con **React**, **TypeScript**, **Axios** y **Context API**, consumiendo una API RESTful (Laravel / Node.js).  

Permite:

- Registro y login de usuarios  
- Gestión de proyectos (listar, crear, actualizar, eliminar)  
- Gestión de tareas por proyecto (listar, crear, actualizar, marcar como completadas, eliminar)  
- Comentarios en tareas  
- Manejo de usuarios logueados con Context API  
- Tipado completo con TypeScript  

---

## Tecnologías

- React 18+  
- TypeScript  
- Axios  
- React Router v6  
- Context API para manejo de usuario  

---

## Estructura del proyecto

src/
├─ api/
│ └─ api.ts # Instancia de Axios con interceptor de token
├─ contexts/
│ └─ AuthContext.tsx # Context API para usuario logueado
├─ pages/
│ ├─ Login.tsx
│ ├─ Register.tsx
│ ├─ Projects.tsx
│ ├─ ProjectTasks.tsx
│ └─ TaskDetail.tsx
├─ types/
│ ├─ models.ts # Modelos: User, Project, Task, Comment
│ ├─ requests.ts # Tipos de Requests
│ └─ responses.ts # Tipos de Responses
└─ consts/
└─ consts.ts # URL base de la API


---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/jesusagamez2045/imagine-web.git
cd imagine-web

npm install

npm run dev
```

