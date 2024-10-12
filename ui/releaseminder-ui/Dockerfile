FROM --platform=linux/amd64 node:20.17.0-alpine3.20 AS builder

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm@9.12.1

RUN pnpm install --frozen-lockfile

COPY . .

ARG BUILD_ENV="prod"

RUN pnpm run build:${BUILD_ENV}


FROM --platform=linux/x86_64 nginx:1.27.2-alpine3.20

WORKDIR /app

COPY --from=builder /app/dist/releaseminder-ui/browser /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d

EXPOSE 80
