/**
 * Banco de perguntas do TESTE 2 — orquestrador.
 *
 * Define o global `ALL` consumido pela app (em teste2.html), concatenando os
 * arrays exportados por cada ficheiro em `assets/js/data/questions2/`.
 *
 * Matéria: slides #06–#10 (Threads, Sistema de Ficheiros, Dispositivos de
 * Armazenamento, Gestão de Memória, Memória Virtual).
 *
 * Para editar perguntas: vai ao ficheiro do tópico em causa.
 */
/* eslint-disable no-undef */

const ALL = [].concat(
  Q_THREADS,                      // Threads (28)
  Q_SISTEMA_FICHEIROS,            // Sistema de Ficheiros (36)
  Q_DISPOSITIVOS_ARMAZENAMENTO,   // Dispositivos de Armazenamento (28)
  Q_GESTAO_MEMORIA,               // Gestão de Memória (40)
  Q_MEMORIA_VIRTUAL,              // Memória Virtual (36)
);
