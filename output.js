/**
 * Banco de perguntas — orquestrador.
 *
 * Define o global `ALL` consumido pela app, concatenando os arrays
 * exportados por cada ficheiro em `assets/js/data/questions/`.
 *
 * Para editar perguntas: vai ao ficheiro do tópico em causa.
 * Para acrescentar um tópico novo:
 *   1. cria o ficheiro `assets/js/data/questions/<slug>.js` com o array Q_<SLUG>.
 *   2. adiciona o `<script src=…>` em `index.html` antes deste ficheiro.
 *   3. acrescenta o nome aqui em baixo.
 *   4. (opcional) regista cor em `assets/js/data/topic-colors.js`
 *      e ordem em `TOPIC_ORDER` em `assets/js/ui/topic-filter.js`.
 */
/* eslint-disable no-undef */

const ALL = [].concat(
  Q_LINGUAGEM_C, // Linguagem C (44)
  Q_CONCEITOS_BASICOS, // Conceitos Básicos (35)
  Q_I_O_E_INTERRUPCOES, // I/O e Interrupções (21)
  Q_SYSTEM_CALLS, // System Calls (17)
  Q_PROCESSOS, // Processos (76)
  Q_IPC, // IPC (34)
  Q_ESCALONAMENTO, // Escalonamento (67)
  Q_SINCRONIZACAO, // Sincronização (67)
  Q_DEADLOCKS, // Deadlocks (37)
  Q_EXAME_PARTE_III, // Exame · Parte III (48)
  Q_EXAME_PARTE_V, // Exame · Parte V (6)
  Q_EXAME_PARTE_II, // Exame · Parte II (29)
  Q_EXAME_PARTE_IV, // Exame · Parte IV (19)
  Q_EXAME_PARTE_I, // Exame · Parte I (2)
  Q_EXAME_PARTE_VI, // Exame · Parte VI (2)
  Q_TREINO_FORK, // Treino · fork() (8)
  Q_TREINO_PIPES, // Treino · Pipes (8)
  Q_TREINO_SCHEDULING, // Treino · Scheduling (8)
  Q_TREINO_SINAIS, // Treino · Sinais (10)
);
