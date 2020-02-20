  # ----------------
# STEP 1:
FROM node:10 as build

WORKDIR /usr/src/app
COPY . .

RUN npm install --production
RUN npm run-script build

# ----------------
# STEP 2:
FROM alpine:latest
WORKDIR /usr/src/app

# install required libs
RUN apk add --update nodejs

COPY --from=build   /usr/src/app/build/ ./build/
COPY --from=build   /usr/src/app/node_modules/ ./node_modules/
COPY --from=build   /usr/src/app/package.json ./

ENV NODE_ENV=production
ENV PORT=3000
ENV DEBUG=express:*

EXPOSE 3000
ENTRYPOINT [ "node", "build/server.js" ]
