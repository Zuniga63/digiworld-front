# Prueba técnica DIGIWORLD Front-End

Creación de una aplicación web usando el framework de VUE para la creación de tareas por parte de profesores y estudiantes previamente registrados y autenticados.

## Página de Inicio de sesion
![image](https://user-images.githubusercontent.com/50376585/195969422-b68697b6-a9cd-461b-9839-029e43f16979.png)

## Página de registro
![image](https://user-images.githubusercontent.com/50376585/195969473-082de9f2-240d-44b9-a9d4-191d36179499.png)

## Verificación de Email
![image](https://user-images.githubusercontent.com/50376585/195969615-094b737c-9299-4719-be7d-fa178c1e5c1e.png)

## Home
![image](https://user-images.githubusercontent.com/50376585/195969543-9aea2802-3b4d-4419-8cf8-2842fc393cd2.png)

## Procedimiento de uso

1. Si el usuario no está autenticado, este será redirigido a la página de inicio de sesión en donde procederá a ingresar sus credenciales de acceso.

2. Si no se encuentra registrado, lo puede hacer desde el enlace al final del formulario el cual lo redirige a la página de registro. Donde podrá ingresar sus datos y establecer si es un profesor o un estudiante. 

3. Si el registro fue exitoso la plataforma lo redirige a la página de inicio de sesión, donde se le pedirán nuevamente sus credenciales, nombre de usuario y contraseña. 

4. Después de la autenticación será movido a una antesala donde se verificará su correo electrónico y si todo va bien podrá acceder a la página del Home.

5. Finalmente aquí podrá ver el listado de tareas realizadas por el profesor/estudiante y registrar nuevas tareas en la plataforma.


## Sobre la APP

Para la construcción de esta aplicación se utilizó la plantilla recomendada por la documentación de VUE  que implementa un motor de Vite para la compilación del código, junto con la librería de vue router para visualizar las diferentes vistas. También se utilizó la libreŕia de axios para la comunicación con el servidor del back y se integró con tailwind css para la maquetación.

## Como Intalarlo

### Back-end
1. Se clona el repositorio del Back con el siguiente comando `git clone https://github.com/Backend1-Digiworld/PRUEBA-BACKEND`
2. Se accede a la carpeta del proyecto con `cd PRUEBA-BACKEND`
3. Se instalan las dependencias `npm install`
4. Se corre el servidor en modo local y desarrollo `npm run start:dev`
5. Esto montará el servidor en la ruta **http://localhost:3000**
6. La documentación se podrá ver en **http://localhost:3000/api**

### Front-end
1. Se clona este repositorio con el comando `git clone https://github.com/Zuniga63/digiworld-front.git`
2. Se accede a la carpeta `cd digiworld-front`
3. Se instala las dependencias con `npm install`
4. Se crea el archivo .env.local con el siguiente comando `cp .env.example .env.local`
5. Se escribe la dirección del servidor en la variable  VITE_BACK_END_URL
6. finalmente se ejecuta el comando "**`npm run dev`**" para correr el proyecto.

