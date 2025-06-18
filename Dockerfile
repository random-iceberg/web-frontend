##
# Stage: common steps
##

FROM node:22-alpine AS base
WORKDIR /app
# Copy package spec and lock files separately before `npm install`
# so to allow docker to cache the `npm install` layer
COPY package*.json .
RUN npm install --omit dev
COPY . .

##
# Stage: development container with the react part
##

FROM base AS dev-react
RUN apk add rsync
RUN apk add dos2unix
COPY ./container/dev-entrypoint.sh /entrypoint.sh
RUN dos2unix /entrypoint.sh
ENTRYPOINT [ "sh", "/entrypoint.sh" ]
CMD [ "npm", "start" ]

##
# Stage: development container with the nginx part
##

FROM nginx:stable-alpine AS dev-nginx
COPY nginx.dev.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

##
# Stage: production build of the React app
##

FROM base AS builder
RUN npm run build

##
# Stage: production container
##

FROM nginx:stable-alpine AS prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
