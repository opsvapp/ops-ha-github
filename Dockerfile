
########################################
##  _           _  _     _            ##
## | |__  _  _ (_)| | __| | ___  _ _  ##
## | '_ \| || || || |/ _` |/ -_)| '_| ##
## |_.__/ \_,_||_||_|\__,_|\___||_|   ##
########################################
# base image
FROM node:12.18 as builder

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
# COPY package.json /usr/src/app/package.json
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli@11.1.2

# add app
COPY . .

#generate build
RUN npm run prod

############################
##                     _  ##
##  _ __  _ _  ___  __| | ##
## | '_ \| '_|/ _ \/ _` | ##
## | .__/|_|  \___/\__,_| ##
## |_|                    ##
############################
# base image
FROM nginx:1.15.9-alpine

# copy artifact build from the 'build environment'
COPY --from=builder  /usr/src/app/dist/opsha /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY ./dist/ /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]