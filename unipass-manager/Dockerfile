# Etapa 1: Construção (Build do Angular)
FROM node:20-alpine as build

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código fonte
COPY . .

# Gera o build de produção
RUN npm run build

# Etapa 2: Servidor (NGINX) - A imagem leve para produção
FROM nginx:alpine

# Copia o resultado do build da etapa anterior para a pasta do NGINX
# O caminho /browser é crucial para o Angular 17+
COPY --from=build /app/dist/unipass-manager/browser /usr/share/nginx/html

# Copia sua configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Comando para manter o Nginx rodando em primeiro plano
CMD ["nginx", "-g", "daemon off;"]