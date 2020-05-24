# Algoritmo-Planificacion-FIFO

Repositorio Destinado a la Elaboracion del proyecto de Sistemas Operativos IB

  

## Levantar el cliente de angular

### Usando Docker

1. Clonar el repositorio

2. Debes contruir la imagen, para ello dirígete a la carpeta raiz del proyecto y allí escribe:
```
docker-compose build
```
3. Esta imagen no se han isntalado aún las dependenias, para instalarlas introduce el comando:
```
docker-compose run client-angular npm install --yes
```
4. Ahora si simplementee puedes escribir el siguiente comando para levantar el proyecto
```
docker-compose up
```

Nota: Para detener el cliente presiona las teclas `Ctrl+C`

### Usando Angular

1. Clonar el repositorio

2. Borrar la carpeta ```package-lock``` que esta en la carpeta raiz

3. En la carpeta raiz del proyecto, abrir un terminal y escribir  ```npm install```

4.Ahora para levantar el proyecto, simplementee escribir ```ng serve``` y el proyecto estara acorriendo en el puerto ```:4200```

Nota: Para detener el cliente presiona las teclas `Ctrl+C`
