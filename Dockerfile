FROM node:12.16.3

# Instalamos angular cli en nuestra imágen
RUN npm install -g @angular/cli@8 && npm cache clean --force

RUN apt update

#RUN adduser --disabled-password --gecos '' newuser \
 #   && adduser newuser sudo \
  #  && echo '%sudo ALL=(ALL:ALL) ALL' >> /etc/sudoers

RUN mkdir /app

#RUN chown newuser $HOME
#USER newuser 

WORKDIR /app
RUN pwd
RUN ls -al
COPY . /app/

RUN ls -al

# Puerto entorno dev
EXPOSE 4200
# Puerto livereload
EXPOSE 49153
# Puerto Test
EXPOSE 9876
# Puerto e2e
EXPOSE 49152 


RUN npm cache clean --force
# RUN npm install --yes
CMD [ "npm", "install", "--yes" ]






