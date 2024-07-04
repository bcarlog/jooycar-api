# Jooycar API

Esta es la API de Jooycar. A continuación se detallan los pasos para ejecutar la aplicación usando Docker y también cómo ejecutarla localmente.

## Requisitos
 * Docker
 * Node.js (mínimo versión 20)

## Ejecución usando Docker

### 1. Crear una red Docker

Primero, crea una red Docker para que los contenedores puedan comunicarse entre sí.

```bash
docker network create jooycar-network
```

### 2. Ejecutar MongoDB en la red Docker
Ejecuta MongoDB en la red Docker que acabas de crear.

```bash
docker run --name jooycar-db -d -p 27017:27017 --network jooycar-network mongo
```

 * --name jooycar-db: Asigna el nombre jooycar-db al contenedor.
 * -d: Ejecuta el contenedor en segundo plano.
 * -p 27017:27017: Mapea el puerto 27017 del contenedor al puerto 27017 de tu máquina host.
 * --network jooycar-network: Conecta el contenedor a la red jooycar-network.

### 3. Construir la imagen Docker para la API
Construye la imagen Docker para tu aplicación Node.js.

```bash
docker build -t jooycar-api .
```
 * -t jooycar-api: Etiqueta la imagen como jooycar-api.

### 4. Ejecutar la API en la red Docker
Ejecuta tu aplicación Node.js en la red Docker que creaste.

```bash
docker run --name jooycar-api -p 3000:3000 --network jooycar-network -e MONGO_URL="mongodb://jooycar-db:27017/jooycar" jooycar-api
```
 * --name jooycar-api: Asigna el nombre jooycar-api al contenedor.
 * -p 3000:3000: Mapea el puerto 3000 del contenedor al puerto 3000 de tu máquina host.
 * --network jooycar-network: Conecta el contenedor a la red jooycar-network.
 * -e MONGO_URL="mongodb://jooycar-db:27017/jooycar": Define la variable de entorno MONGO_URL para conectar a MongoDB.



## Ejecución local
### 1. Requisitos previos
Asegúrate de tener Node.js (mínimo versión 20) instalado en tu máquina.

### 2. Clonar el repositorio
Clona este repositorio en tu máquina local.

```bash
git clone https://github.com/tu-usuario/jooycar-api.git
cd jooycar-api
```

### 3. Instalar dependencias
Instala las dependencias del proyecto.

```bash
npm install
```

### 4. Ejecutar MongoDB localmente
Asegúrate de tener MongoDB ejecutándose en tu máquina local.

### 5. Ejecutar la aplicación
Para ejecutar la aplicación en modo desarrollo:

```bash
npm run dev
```


Para ejecutar la aplicación en modo producción:

```bash
npm start
```

Para ejecutar las pruebas:

```bash
npm test
```
