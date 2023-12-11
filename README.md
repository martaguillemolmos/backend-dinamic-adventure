# <h1 align="center">README -  Dinamic Adventure </h1>
__<p align="center">Proyecto Final - Full Stack Developer Bootcamp en GeeksHubs Academy </p>__

<p>
   <div align="center">
      <img src="./src/img_readme/cabecera.jpg" width="90%">
   </div>    
</p>


### 📋 Contenido del Readme

<details> <summary>Accede al contenido del Readme</summary>

- <a href="#🚀-descripción"><h4>🚀 Descripción</h4></a>
- <a href="#🎯-objetivo"><h4>🎯 Objetivo</h4></a>
- <a href="#🛠️-tecnologías-utilizadas"><h4>🛠️ Tecnologías utilizadas</h4></a>
- <a href="#📉-diagrama-de-la-base-de-datos"><h4>📉 Diagrama de la base de datos</h4></a>
- <a href="#💡endpoints"><h4>💡 Endpoints</h4></a>
- <a href="#⚙️-instrucciones-de-uso"><h4>⚙️ Instrucciones de uso</h4></a>
- <a href="#📅-organización"><h4>📅 Organización</h4></a>
- <a href="#👏-agradecimientos"><h4>👏 Agradecimientos</h4></a>
- <a href="#🌟-mejoras"><h4>🌟 Mejoras</h4></a>
- <a href="#📧-contacto"><h4>📧 Contacto</h4></a>
</details>


## 🚀 Descripción

Este proyecto del Bootcamp Full Stack está enfocado en backend de una empresa de deportes de aventura llamada Dinamic Adventure, haciendo uso de tecnologías como Node.js, TypeScript, Express, MySQL, GIT y GitHub.  El desarrollo de este proyecto se basa en una base de datos relacional gestionada con TypeORM.
 
La aplicación busca superar las limitaciones actuales de la plataforma, transformándola en una herramienta completa que no solo permite a los usuarios visualizar las actividades, sino que permite reservar y también optimiza la gestión interna, reduciendo significativamente la carga administrativa.El enfoque principal es crear un backend eficiente y escalable que permita a los usuarios visualizar y reservar actividades de manera óptima.

<div align="center">
      <img src="./src/img_readme/plataforma-previa.gif" style="max-width: 100%">
      <em>Vista de la plataforma previa al proyecto</em>
   </div>


## 🎯 Objetivo

El proyecto de Dinamic Adventure tiene como objetivo principal desarrollar un sistema backend sólido y completo destinado a gestionar las actividades de turismo activo. Los objetivos específicos son los siguientes:

- **Desarrollar una API robusta**: Crear una API escalable y segura que permita a los usuarios interactuar con el sistema de reservas, facilitando tanto a los clientes como a los empleados la gestión eficiente de las actividades.

- **Gestión de usuarios:** Implementar funciones completas para administrar los usuarios, abarcando desde el registro hasta la actualización de datos personales. Esto garantiza una experiencia de usuario fluida y personalizada.

- **Gestión de reservas:** Facilitar a los clientes la visualización, modificación y cancelación de sus reservas, optimizando el proceso y mejorando la experiencia del usuario.

- **Optimización interna:** Automatizar la gestión de las actividades y estados de las reservas. 

En resumen, el proyecto tiene como objetivo principal la creación de un sistema completo de gestión de actividades para Dinamic Adventure, asegurando una experiencia de usuario intuitiva y segura tanto para clientes como para la empresa.


## 🛠️ Tecnologías Utilizadas
Para desarrollar este proyecto, he hecho uso de las siguientes tecnologías:

<div align="center">
<a href="https://www.mysql.com/">
    <img src= "https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white"/>
</a>
<a href="https://www.expressjs.com/">
    <img src= "https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/>
</a>
<a href="https://nodejs.org/es/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>
<a href="https://www.typescriptlang.org/">
    <img src= "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
</a>
  <a href="https://git-scm.com/">
    <img width="9%" src="https://www.vectorlogo.zone/logos/git-scm/git-scm-ar21.svg"/>
</a>
  <a href="https://www.postman.com/">
    <img src="https://cdn.worldvectorlogo.com/logos/postman.svg" width="30"/>
</a>
</div>

## 📉 Diagrama de la base de datos

<p>
   <div align="center">
      <img src="./src/img_readme/reverse-engineer.png" style="max-width: 100%">
   </div>    
   <div align="center">
    <em>Diseño de base de datos</em>
    </div>  
</p>


## 💡Endpoints

<details>
<summary>/user</summary>
<br>

1. Registro.
    - Descripción: Crear un nuevo usuario, recuperando la información de los campos requeridos a través del body. Y, se genera un registro en la base de datos de un nuevo usuario con el rol de "user".

            POST localhost:4000/user/register

        Body:

             JSON
            {
               "name": "Marta",
               "surname": "Guillem Olmos",
               "phome":627840804,
               "email": "martaguillem@outlook.es",
               "password": "123456"
            }
        
2. Login.
    - Descripción: Al acceder, nos devuelve un token a través del body que utilizaremos más tarde en las rutas habilitadas para los usuarios.

            POST localhost:4000/user 

        Body:

             JSON
            {
                "email": "martaguillem@outlook.es",
                "password": "123456"
            }


3. Perfil.
    - Descripción: Obtener un usuario por el id del token que hemos obtenido con el Login.

            GET localhost:4000/user/profile  

        Auth:

            Auth : User 
            Barer token : Token
 
        
       
4. Obtener todos los usuarios.
    - Descripción: Obtener los datos de todos los usuarios.

            GET localhost:4000/user

</details>


## ⚙️ Instrucciones de uso

1. Clona este repositorio en tu máquina local usando el siguiente comando: `git clone [URL del repositorio]`.
2. A continuación instala todas las dependencias con el comando `npm install`.
3. Conectamos nuestro repositorio con la base de datos mediante las credenciales en el archivo db.ts o, en este caso, con las variables de entorno que se encuentran en el archivo .env.example.

  
        PORT = 
            
        DB_TYPE = 
        DB_HOST =
        DB_PORT = 
        DB_USERNAME =
        DB_PASSWORD = 
        DB_NAME = 

        JWT_SECRET = 
    
4. Crea el archivo .env e indica las variables anteriores.

5. Ejecutamos las migraciones mediante el comando `npx typeorm-ts-node-commonjs migration:run -d ./src/db.ts` 
6. Si estamos en desarrollo, lo hacemos funcionar y actualizarse en tiempo real mediante el comando `npm run dev`
7. Si queremos compilar usamos el comando `npm run build`
8. Si estamos en producción, lo ponemos en marcha con el comando `npm run start`
9. Usamos los endpoints almacenados en la carpeta http para usar las distintas funcionalidades que se han diseñado.
10. Importar endpoints con Postman.
- En la carpeta /http se encuentra el archivo para importar todas las rutas a través de Postman:
<div align="center">
    <img src="./database/image/Acceder_Archivo_Postman.gif" style="max-width: 70%;" width="500">
</div>
<div align="center">
<em>Acceder al archivo de Postman</em>
</div>

- Por último, importa el documento en Postman.
<div align="center">
<img src="./database/image/Postman_Import.gif" style="max-width: 70%;" width="500">
</div>
<div align="center">
<em>Importamos el documento en Postman.</em>
</div>


## 📅 Organización
Para llevar a cabo este proyecto he utilizado las siguientes herramientas:
- <strong>Trello 🖇️</strong>

<div align="center">
    <img src="./src/img_readme/trello.gif" style="max-width: 70%;" width="500">
   </div>
<div align="center">
   <em>Disposición del tablón,</em>
      <a href = "https://trello.com/invite/b/2sgYNf7n/ATTI9b0d30dde3135781a2a8f2e3c74126694B79607A/proyecto-final-bootcamp-full-stack-devoloper">accede a él en Trello.</a>
</div>
<br>
- <strong>Ramas en el repositorio</strong> 🪴

- La estructura del respositorio está compuesta por cinco ramas:
    - <strong>Master</strong>: Rama principal del proyecto.
    - <strong>Dev</strong>: Rama en la que se combinan los trabajos de las otras ramas y se testean antes de pasarse a producción.
<div align="center">
    <img src="./src/img_readme/branches-git.png" style="max-width: 70%;" width="500">
   </div>
<div align="center">
   <em>Repositorio de GitHub</em>
</div>

## 👏 Agradecimientos
Este proyecto es el reflejo de todos los conocimientos que hemos adquirido hasta la fecha en el BootCamp FullStack Developer.

## 🌟 Mejoras


## 📧 Contacto
Contacta conmigo por correo electrónico [martaguillem@outlook.es](mailto:martaguillem@outlook.es). Además, puedes seguirme en:
  
 - [GitHub]((https://github.com/martaguillemolmos))   | [LinkedIn](https://www.linkedin.com/in/marta-guillem-olmos-b26b9b293/)
