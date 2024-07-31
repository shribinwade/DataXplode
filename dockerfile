# build the angular app
FROM node as BUILD

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build


# serve the angular app with nginx
FROM nginx

EXPOSE 80
#copy the build angular app from the build stage
COPY --from=BUILD /app/dist/sidenav/browser /usr/share/nginx/html

# ENTRYPOINT [ "nginx","-g","daemon off;" ]