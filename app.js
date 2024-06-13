const express = require("express");
const mysql = require('mysql2');
const os = require("os");
const retry = require('retry');
require('dotenv').config();

const app = express();

function connectWithRetry() {
  const operation = retry.operation({ retries: 5, factor: 2, minTimeout: 1000 });

  operation.attempt((currentAttempt) => {
    console.log(`Tentativa de conexão ao banco de dados: ${currentAttempt}`);
    const connection = mysql.createConnection({
      host: process.env.DB_HOST ?? "localhost",
      port: 3306,
      user: 'user',
      password: '1234',
      database: 'api'
    });

    connection.connect((error) => {
      if (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        if (operation.retry(error)) {
          return;
        }
        return;
      }
      console.log('Conexão ao banco de dados bem-sucedida.');
      
      // Defina as rotas aqui, após a conexão ser bem-sucedida
      app.get("/consulta-dados", (req, res) => {
        const query = "SELECT * FROM pessoa";
        connection.query(query, (error, results) => {
          if (error) {
            console.error('Erro ao executar a consulta:', error);
            return res.status(500).json({ error: 'Erro ao consultar dados.' });
          }
          res.json(results);
        });
      });

      app.get("/", (req, res) => {
        res.status(200).json({ message: "Olá" });
      });

      app.get("/liveness", (req, res) => {
        res.status(200).json({
          message: "Meu app está vivo!",
          path: process.cwd(),
          gid: process.getegid(),
          uid: process.geteuid(),
          date: new Date().getTime()
        });
      });

      app.get("/readiness", (req, res) => {
        res.status(200).json({
          message: "Meu app está pronto!",
          platform: os.platform(),
          freemem: os.freemem(),
          homedir: os.homedir(),
          date: new Date().getTime()
        });
      });

      const port = 3001;
      app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
      });
    });
  });
}

connectWithRetry();

module.exports = app;
