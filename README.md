# Meu Projeto Docker Compose

Esta aplicação utiliza Docker Compose para configurar um ambiente de trabalho com MySQL e Node.js.

- Serviços

1.*MySQL*:
   - Porta: 3306
   - Usuário: user
   - Senha: (sem senha)
   - Banco de Dados: api
   - Carga Inicial: O banco de dados é populado com os dados do arquivo `carga.sql` durante a execução do `docker-compose up`.

2.*Node.js*:
   - Porta: 4040 (mapeada para 3001 no contêiner)
   - Endereço: http://localhost:4040
   - Conexão com MySQL: Configurada via variáveis de ambiente no `docker-compose.yml`
   - O serviço Node.js conecta-se ao MySQL e faz a leitura dos dados.

- Como Executar

1. Navegue até o diretório do projeto.
2. Execute `docker-compose up`.
3. A aplicação Node.js estará acessível em http://localhost:4040.


- Abra a URL http://localhost:3001/consulta-dados
- Abra a URL http://localhost:3001/liveness
- Abra a URL http://localhost:3001/readiness
