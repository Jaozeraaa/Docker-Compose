-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS api;

-- Seleciona o banco de dados
USE api;

-- Criação da tabela
CREATE TABLE IF NOT EXISTS pessoa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  idade INT NOT NULL
);

-- Inserção de dados de exemplo
INSERT INTO pessoa (nome, idade) VALUES 
('João', 30),
('Maria', 25),
('Pedro', 35);
