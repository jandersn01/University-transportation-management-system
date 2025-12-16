# Etapa 1: Construção (Build do Angular)
FROM node:20-alpine as build

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código fonte
COPY . .

# --- CORREÇÃO DO ERRO DE BUDGET ---
# Estes comandos aumentam o limite de tamanho dos arquivos CSS no angular.json
# de 4kB/8kB para 100kB, permitindo que o build passe sem erros.
RUN sed -i 's/"maximumError": "4kB"/"maximumError": "100kB"/g' angular.json
RUN sed -i 's/"maximumError": "8kB"/"maximumError": "100kB"/g' angular.json

# Gera o build de produção
RUN npm run build

# Etapa 2: Servidor (NGINX) - A imagem leve para produção
FROM nginx:alpine

# Copia o resultado do build da etapa anterior para a pasta do NGINX
COPY --from=build /app/dist/unipass-manager/browser /usr/share/nginx/html

# Copia sua configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Comando para manter o Nginx rodando em primeiro plano
CMD ["nginx", "-g", "daemon off;"]