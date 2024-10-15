# Back-end FIAP Blog

Este é um projeto desenvolvido para o Tech Challenge da segunda fase do curso de pós graduação em desenvolvimento full stack da universidade FIAP. O mesmo consiste na criação de uma API back-end em Node.js para o gerenciamento de um blogging dinâmico, que possibilita aos alunos visualizar uma lista de posts e ler postagens específicas e oferece para aos
professores a possibilidade de criar, editar, listar e excluir postagens.

## 🛠️ Tecnologias utilizadas

- Node.js
- Mongoose
- MongoDB Atlas
- Docker
- Jest

## 💻 Pré-requisitos

Antes de iniciar, verifique se seu computador possui instalado:

- [Node.js](https://nodejs.org/pt);
- [Docker](https://docs.docker.com/desktop/install/windows-install/);
- [WSL](https://learn.microsoft.com/pt-br/windows/wsl/install);

## 🔧 Instalação

Para executar o back-end do blog, siga estas etapas, utilizando seu terminal preferido:

```bash
# Clonar repositório:
git clone https://github.com/HeloiseSantos/fiap-blog-backend.git

# Acessar pasta do projeto
cd fiap-blog-backend

# Abrir projeto no editor de código:
code .

# Instalar dependências
npm install
```

## 🚀 Executar projeto localmente

```bash
# Levantar server local
npm start
```

Com o projeto rodando na porta 3000 [http://localhost:3001], é possível utilizá-lo com ferramentas de acesso a APIs REST, como o [Insomnia](https://insomnia.rest/download) ou [Postman](https://www.postman.com/).

Rotas da aplicação:

- Criar novo post (POST): `/posts`
- Listar todos os posts (GET): `/posts`
- Pesquisa de posts por palavras chave (GET): `/posts/search`
- Selecionar post por id (GET): `/posts/:id`
- Editar post (PUT): `/posts/:id`
- Deletar post (DELETE): `/posts/:id`

## 📦 Executar projeto no Docker

```bash
# Subir container a partir do Dockerfile
docker build -t fiap-blog-backend:latest
docker run -d -p 3000:3000 <image id>
```

## ⚙️ Executar testes unitários

```bash
# Executar testes unitários e cobertura
npm test
```

## 🌐 Publicação na nuvem (Deploy)

A API está implantada e disponível para uso no seguinte endereço:

https://fiap-blog-backend-latest.onrender.com

Você pode utilizar este link para acessar os endpoints da API diretamente ou através de ferramentas como o [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/)

## 🧑🏻‍💻👩🏻‍💻 Colaboradores

Grupo 31, composto por:

- Heloíse Silva Santos - https://github.com/HeloiseSantos
- Jonas de Andrade Zuazo Moreira - https://github.com/jmoreira7

Para mais detalhes sobre os endpoints e sua implementação, visite a documentação da API, disponível em: .
