FROM node:10.16.3

ENV HOME = /app

RUN mkdir ${HOME}
WORKDIR ${HOME}
COPY . ${HOME}

# Instalamos angular cli en nuestra imágen
RUN npm install -g @angular/cli && npm cache clean --force



# Puerto entorno dev
EXPOSE 4200
# Puerto livereload
EXPOSE 49153
# Puerto Test
EXPOSE 9876
# Puerto e2e
EXPOSE 49152 


RUN npm install
RUN npm run build