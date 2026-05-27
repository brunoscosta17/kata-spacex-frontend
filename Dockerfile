# ─── Estágio 1: Build ───
FROM node:20-alpine AS build
WORKDIR /app

# Copia os arquivos de definição de dependências primeiro (otimização de cache do Docker)
COPY package*.json ./
RUN npm ci

# Copia o restante do código fonte
COPY . .

# Compila a aplicação Angular para produção
RUN npm run build -- --configuration=production

# ─── Estágio 2: Servidor de Produção ───
FROM nginx:alpine

# Copia a configuração customizada do Nginx que suporta SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia a build compilada do estágio anterior para o diretório padrão do Nginx
# angular.json define o projeto como "spaceX_kata"
COPY --from=build /app/dist/spaceX_kata /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
