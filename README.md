## 🚀 API Disruptive Technical Test

Bienvenido a la **API Disruptive Technical Test**. Esta API está construida con **Node.js**, **Express**, **MongoDB**, **Mongoose** y **Docker**. Aquí encontrarás todo lo que necesitas para comenzar a utilizarla de manera rápida y sencilla.

## 📦 Instalación de Dependencias

Para comenzar, asegúrate de tener **Node.js** y **npm** instalados en tu máquina. Luego, instala las dependencias necesarias ejecutando el siguiente comando:

```bash
npm i
```

## 🐳 Levantar Contenedor Docker

Una vez que las dependencias estén instaladas, puedes levantar el contenedor de Docker con el siguiente comando:

```bash
npm run docker:up
```

Esto iniciará tu entorno de desarrollo en un contenedor aislado.

## 🚀 Levantar la Aplicación

Con el contenedor en funcionamiento, ahora puedes levantar la aplicación ejecutando (Levantará en el puerto 5000 por defecto):

```bash
npm run start
```

La API estará disponible y lista para recibir solicitudes.

## 🧪 Ejecutar Pruebas Unitarias

Es importante asegurarse de que todo funcione correctamente. Puedes correr las pruebas unitarias utilizando el siguiente comando:

```bash
npm run test
```

Esto ejecutará todas las pruebas definidas en tu proyecto y te permitirá verificar el correcto funcionamiento de la API.

## ⬇️ Bajar el Contenedor

Cuando hayas terminado de trabajar, puedes bajar el contenedor de Docker con el siguiente comando:

```bash
npm run docker:down
```

Esto detendrá y eliminará el contenedor, liberando los recursos utilizados.

---

¡Gracias por usar la **API Disruptive Technical Test**! Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue en el repositorio.
