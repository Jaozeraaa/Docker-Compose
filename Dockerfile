# Use a imagem base do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e o package-lock.json (se presente)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código do projeto
COPY . .

# Expõe a porta na qual a aplicação irá rodar
EXPOSE 3001

# Define o comando para iniciar a aplicação
CMD ["npm", "start"]


