# Setup
Para rodar localmente o projeto é necessário seguir os seguintes passos:

1. Instale o Docker e o Docker compose
2. Execute o comando abaixo dentro do diretório do projeto
   
```bash
docker compose up -d
```

3. Instale as dependências e rode as migrations

```bash
npm install -y
npm run migrate
```


# APP

Find a Friend

## RFs (Requisitos funcionais)

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

## RNs (Regras de negócio)

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada
  
## RNFs (Requisitos não funcionais)

- [x] Senha do usuário deve ser criptografada
- [x] Os dados da aplicação devem estar persistidos em um banco PostgreSQL
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [x] O usuário deve ser identificado por um JWT