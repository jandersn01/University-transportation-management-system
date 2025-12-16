# ---------- Stage 1: Build Angular ----------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- Stage 2: Nginx ----------
FROM nginx:alpine

# Remove configuração padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia a configuração correta para SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ⚠️ Caminho correto do build Angular (Angular 16+)
COPY --from=build /app/dist/unipass-manager/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
