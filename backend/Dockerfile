# Imagem base
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependência primeiro (para aproveitar o cache)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Instala dependências do sistema e Chrome
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    netcat-openbsd \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Adiciona o repositório do Chrome e instala
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && apt-get install -y google-chrome-stable && \
    rm -rf /var/lib/apt/lists/*

# Copia o entrypoint e dá permissão de execução
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Expõe a porta
EXPOSE 8000

# Comando padrão
CMD ["/app/entrypoint.sh"]