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



RUN mkdir /project

COPY . /project/

WORKDIR /project

# add `/proejct/node_modules/.bin` to $PATH
ENV PATH /project/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /project/package.json

RUN npm install --yes

# Instalamos angular cli en nuestra imágen
RUN npm install -g @angular/cli@8





