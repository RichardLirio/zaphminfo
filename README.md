# 📱 Zaphminfo - Sistema de Atendimento via WhatsApp

Zaphminfo é uma aplicação de **atendimento multiusuário via WhatsApp**, projetada para empresas que desejam gerenciar conversas com clientes em tempo real, com múltiplos atendentes conectados simultaneamente à mesma instância do WhatsApp.

A aplicação permite que operadores acessem e respondam mensagens via painel web, integrando automação, controle de atendimentos e monitoramento das conversas.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** + **Express** (Backend)
- **ReactJS** (Frontend)
- **MySQL** (Banco de Dados)
- **Sequelize** (ORM)
- **Socket.IO** (Comunicação em tempo real)
- **Docker + Docker Compose** (Ambiente isolado e fácil de rodar)
- **Nginx + Let's Encrypt** (opcional para produção com HTTPS)

---

## 📦 Pré-requisitos

- Docker e Docker Compose instalados em sua máquina.
- Uma conta no Docker Hub (caso queira fazer push das imagens).
- Opcional: domínio configurado para uso em produção com HTTPS.

---

## 📥 Clonando o repositório

```bash
git clone https://github.com/RichardLirio/zaphminfo
cd zaphminfo

# Backend
cd backend
cp .env.example .env
cd ..

# Frontend
cd frontend
cp .env.example .env
cd ..

🐳 Subindo a aplicação com Docker
Após clonar o repositório, basta executar:

docker-compose up -d

Esse comando irá:

Criar os containers do banco de dados, backend e frontend.

Aplicar as migrations e seeds automaticamente via Sequelize.

Iniciar a aplicação no ambiente de desenvolvimento.

Aguarde alguns segundos e acesse:

http://localhost:8080


🧠 Sobre a Aplicação
📱 Atendimento via WhatsApp: conecte seu número e centralize o suporte ao cliente.

👨‍💼 Multiusuário: vários atendentes podem interagir com clientes em tempo real.

💬 Mensagens em tempo real: via integração com Socket.IO.

🗂️ Controle de atendimentos: veja histórico de conversas e status de atendimentos.

🔐 Login e controle de usuários: acesso protegido para operadores.

🔒 HTTPS (opcional)
Se desejar rodar a aplicação com HTTPS e domínio real, recomendamos configurar um proxy reverso com Nginx e certificados Lets Encrypt.

Fale conosco para um exemplo de produção com isso pronto.

📁 Estrutura dos Diretórios
bash
Copiar
Editar
zaphminfo/
├── backend/     # API Node.js
├── frontend/    # Aplicação React
└── docker-compose.yml

🤝 Contribuição
Contribuições são bem-vindas!
Abra uma issue ou envie um PR com melhorias ou correções.

📄 Licença
Este projeto está sob a licença MIT.

