FROM node:12.16.3

# Puerto entorno dev
EXPOSE 4200
# Puerto livereload
EXPOSE 49153
# Puerto Test
EXPOSE 9876
# Puerto e2e
EXPOSE 49152 

RUN apt update

# Instalamos angular cli en nuestra imágen
RUN npm install -g @angular/cli@8

RUN mkdir /project

COPY . /project/

WORKDIR /project

RUN npm install --yes






