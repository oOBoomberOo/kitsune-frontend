FROM node:22

ARG VITE_OPENAPI_URL

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm ci

COPY . /app

RUN npm run build

CMD ["node", "build"]
