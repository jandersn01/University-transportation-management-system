FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 🔍 DEBUG: mostrar exatamente o que foi gerado
RUN echo "===== DIST CONTENT =====" \
 && ls -R /app/dist || true

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# DEBUG: copiar TUDO para ver se algo chega
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
