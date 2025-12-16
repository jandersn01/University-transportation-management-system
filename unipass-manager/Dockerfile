# Etapa 1: Construção (Build)
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

# Etapa 2: Servidor (NGINX)
FROM nginx:alpine

# Copia o resultado do build para a pasta do NGINX
# ATENÇÃO: Verifique se o nome da pasta em dist/ é 'unipass-manager' mesmo. 
# Se no seu angular.json o "outputPath" for diferente, ajuste aqui.
COPY --from=build /app/dist/unipass-manager/browser /usr/share/nginx/html

# Copia configuração personalizada do Nginx (opcional, mas recomendado para Angular)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80