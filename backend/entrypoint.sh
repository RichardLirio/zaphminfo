#!/bin/sh

echo "🔁 Aguardando o banco de dados estar pronto..."

# Espera até o MySQL estar acessível (substitua 'db' pelo nome correto do serviço no docker-compose)
until nc -z db 3306; do
  sleep 1
done

echo "✅ Banco de dados disponível!"

# Entra na pasta da aplicação
cd /app

# Roda migrations apenas se houver pendências
if npx sequelize-cli db:migrate:status | grep -q 'down'; then
  echo "🛠 Executando migrations..."
  npx sequelize-cli db:migrate
  echo "🌱 Executando seeds..."
  npx sequelize-cli db:seed:all
else
  echo "⚠️  Migrations já aplicadas. Pulando etapa de setup do banco."
fi

# Inicia o backend
echo "🚀 Iniciando o servidor..."
npm start