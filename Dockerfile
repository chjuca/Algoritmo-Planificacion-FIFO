FROM node:12.16.3

# Puerto entorno dev
EXPOSE 4200
# Puerto livereload
EXPOSE 49153
# Puerto Test
EXPOSE 9876
# Puerto e2e
EXPOSE 49152 

RUN apt-get update

RUN mkdir /project

WORKDIR /project

COPY . .

RUN ls -al

# Instalamos angular cli en nuestra imágen
RUN npm install -g @angular/cli@8

RUN npm install --yes







