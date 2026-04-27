# Quiz — Sistemas de Operações (FCUP 2025/2026)

> Banco de perguntas de exames anteriores **filtrado pela matéria do guia de estudo**.
> Cobre: C, Conceitos básicos de SO, Processos, Escalonamento, Sincronização, Deadlocks.
> **Excluídas** (fora da matéria do guia): memória virtual / paginação / segmentação / MMU / TLB, sistemas de ficheiros, dispositivos de disco / SSD / HDD, sockets, algoritmos de substituição de páginas.

---

## Como usar este ficheiro

Cada pergunta segue o formato:

```
### Q<n>. <enunciado>
**Tópico:** <categoria>
**Fonte:** <exame>

<código se houver>

A) ...
B) ...
C) ...

**Resposta:** <letra>
[**Nota:** comentário opcional]
```

---

# Exame 1 — Exame Época Normal (1ª Parte)

## Parte Teórica

### Q1. PCB — Process Control Block
**Parte:** Parte III — Processos
**Tópico:** Processos / PCB
**Guia:** [§30. Process Control Block (PCB)](sistemas_operacoes_estudo__2_.md#30-process-control-block-pcb)
**Fonte:** Exame Época Normal

O PCB (Process Control Block) contém, entre outras informações:

A) apontador para a tabela de páginas do processo, apontador para ficheiros abertos pelo processo, apontador para a pilha de execução do processo
B) apontador para ficheiros abertos pelo processo, apontador para a pilha de execução do processo, código do manipulador de interrupções
C) apontador para a tabela de páginas do processo, apontador para ficheiros abertos pelo processo, apontador para o controlador de interrupções

**Resposta:** A

---

### Q2. Busy waiting vs semáforos com fila
**Parte:** Parte V — Sincronização de Processos
**Tópico:** Sincronização / Spinlock vs semáforo
**Guia:** [§70. Busy Waiting e Spinlocks](sistemas_operacoes_estudo__2_.md#70-busy-waiting-e-spinlocks), [§71. Como Minimizar o Busy Waiting](sistemas_operacoes_estudo__2_.md#71-como-minimizar-o-busy-waiting), [§74. Semáforos](sistemas_operacoes_estudo__2_.md#74-semáforos)
**Fonte:** Exame Época Normal

Ao implementar sincronização entre processos concorrentes, a utilização do mecanismo de "busy waiting" (espera ocupada) traz vantagens em relação à utilização de semáforos baseados em fila quando:

A) o tempo para executar a secção crítica é menor que o tempo de troca de contexto do processo
B) o tempo para executar a secção crítica é maior do que o tempo de espera pelo semáforo
C) o tempo para executar a secção crítica é maior que o tempo de troca de contexto do processo

**Resposta:** A

---

### Q3. Comando para terminar processo
**Parte:** Parte III — Processos
**Tópico:** Processos / Sinais
**Guia:** [§38. Terminação de Processos (exit, wait, zombie, orphan)](sistemas_operacoes_estudo__2_.md#38-terminação-de-processos-exit-wait-zombie-orphan)
**Fonte:** Exame Época Normal

Que comando é utilizado para terminar (de forma normal) um processo, sabendo-se o PID do mesmo?

A) kill -1 PID
B) terminate PID
C) killprocess PID
D) kill -2 PID

**Resposta:** A
**Nota:** Resposta marcada como correta no exame original.

---

### Q4. Multiprogramação vs multitarefa
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos de SO
**Guia:** [§23. Multiprogramação e Multitasking](sistemas_operacoes_estudo__2_.md#23-multiprogramação-e-multitasking)
**Fonte:** Exame Época Normal

Qual das afirmativas abaixo melhor define os conceitos de multi-programação e multi-tarefa?

A) multi-programação permite que processos sejam interrompidos por quantum de tempo; multi-tarefa permite que vários processos possam utilizar a CPU ao mesmo tempo
B) multi-programação permite que vários programas estejam no sistema ao mesmo tempo; multi-tarefa permite que processos sejam interrompidos por quantum de tempo
C) multi-programação permite que vários programas estejam no sistema ao mesmo tempo; multi-tarefa permite que vários processos possam utilizar a CPU ao mesmo tempo

**Resposta:** B

---

### Q5. Análise de código de exclusão mútua
**Parte:** Parte V — Sincronização de Processos
**Tópico:** Sincronização / Critical Section
**Guia:** [§55. Critical Sections e Race Conditions](sistemas_operacoes_estudo__2_.md#55-critical-sections-e-race-conditions), [§61. O Problema da Critical Section — formalização](sistemas_operacoes_estudo__2_.md#61-o-problema-da-critical-section--formalização), [§62. Os 3 Requisitos de uma Solução](sistemas_operacoes_estudo__2_.md#62-os-3-requisitos-de-uma-solução)
**Fonte:** Exame Época Normal

A solução abaixo para o problema da exclusão mútua entre dois processos está correcta?

```c
shared int c1 = 1; int c2 = 1;

void p0() {
  for(;;) {
    c1 = 0;
    while (c2 == 0) {}
    "secção crítica"
    c2 = 1;
  }
}

void p1() {
  for(;;) {
    c2 = 0;
    while (c1 == 0) {}
    "secção crítica"
    c2 = 1;  // bug: devia ser c1 = 1
  }
}

main() {
  p0();
  p1();
}
```

A) sim
B) não
C) não há elementos suficientes para responder a esta questão pois a solução depende do código da secção crítica

**Resposta:** B
**Nota:** O código tem um bug — `p1` repõe `c2 = 1` em vez de `c1 = 1`, e mesmo sem o bug a estrutura não garante exclusão mútua nem progresso.

---

## Parte Prática

### Q6. Comportamento de processo com shared memory
**Parte:** Parte III — Processos
**Tópico:** Processos / IPC / Shared Memory
**Guia:** [§40. Modelos de IPC: Message Passing vs Shared Memory](sistemas_operacoes_estudo__2_.md#40-modelos-de-ipc-message-passing-vs-shared-memory)
**Fonte:** Exame Época Normal

Dado o código abaixo, qual das seguintes afirmações é a mais adequada?

```c
#include <sys/ipc.h>
#include <sys/shm.h>
#define SHMSZ 27

main() {
  char c, *shm, *s;
  int chave = 5678, shmid;

  shmid = shmget(chave, SHMSZ, (IPC_CREAT|0666));
  shm = (char *)shmat(shmid, NULL, 0);

  s = shm;
  for (c='a'; c<='z'; c++)
    *s++ = c;
  *s = '\0';

  while (*shm != '*')
    sleep(1);
  shmdt(shmid);
  exit(0);
}
```

A) o processo associado a este código entra em ciclo
B) o processo associado a este código depende de outro processo para terminar
C) o processo associado a este código termina normalmente

**Resposta:** B
**Nota:** O processo fica num `while (*shm != '*')` à espera de outro processo escrever `*` na memória partilhada.

---

### Q7. Pipe + fork + execlp + dup2
**Parte:** Parte III — Processos
**Tópico:** Processos / Pipes / IPC
**Guia:** [§37. fork() e exec() em UNIX/Linux](sistemas_operacoes_estudo__2_.md#37-fork-e-exec-em-unixlinux), [§41. Pipes](sistemas_operacoes_estudo__2_.md#41-pipes)
**Fonte:** Exame Época Normal

Considere o programa abaixo. Se `argv[1]` é "who" e `argv[2]` é "wc", qual é a sequência de código que deve preencher nas posições (1), (2), (3) e (4)?

```c
#include <stdio.h>
#include <unistd.h>
#define Read 0
#define Write 1

main(int argc, char *argv[]) {
  int fd[2];
  pipe(fd);
  if (fork() == 0) {
    (1)
    execlp(argv[2], argv[2], NULL);
    (2)
  }
  else {
    (3)
    execlp(argv[1], argv[1], NULL);
    (4)
  }
}
```

A)
```
(1) close(fd[Write]); dup2(fd[Read], 0); close(fd[Read]);
(2) perror("ligação não sucedida");
(3) close(fd[Read]); dup2(fd[Write], 1); close(fd[Write]);
(4) perror("ligação não sucedida");
```

B)
```
(1) close(fd[Read]); dup2(fd[Write], 1); close(fd[Write]);
(2) exit(0);
(3) close(fd[Write]); dup2(fd[Read], 0); close(fd[Read]);
(4) exit(0);
```

C)
```
(1) close(fd[Write]); dup2(fd[Read], 0); close(fd[Read]);
(2) perror("ligação não sucedida");
(3) close(fd[Read]); dup2(fd[Write], 0); close(fd[Write]);
(4) wait(NULL);
```

D)
```
(1) close(fd[Write]); dup2(fd[Read], 0); close(fd[Read]);
(2) exit(0);
(3) close(fd[Read]); dup2(fd[Write], 0); close(fd[Write]);
(4) exit(0);
```

**Resposta:** A
**Nota:** O comando `who` (pai, argv[1]) escreve no pipe → stdout do pai redirecionado para `fd[Write]`. O comando `wc` (filho, argv[2]) lê do pipe → stdin do filho redirecionado para `fd[Read]`. Após o `execlp` o `perror` só é alcançado se a chamada falhar.

---

### Q8. Leitura ordenada de output dos filhos via pipe
**Parte:** Parte III — Processos
**Tópico:** Processos / Pipes / read()
**Guia:** [§41. Pipes](sistemas_operacoes_estudo__2_.md#41-pipes)
**Fonte:** Exame Época Normal

Considere o excerto de programa que se segue como a implementação da etapa 'matmult'. A linha 25, que corresponde à leitura ordenada do output dos filhos, pode ser implementada pela sequência de instruções:

```c
1.  main(int argc, char *argv[]) {
2.    int i, j, len, L;
3.    char *line = NULL;
4.    FILE *stream = fopen(argv[1], "r");
5.    fscanf(stream, "%d", &L);
6.    getline(&line, &len, stream);
7.    int in[2], out[L][2];
8.    for (i = 0; i < L; i++) {
9.      pipe(in);
10.     pipe(out[i]);
11.     if (fork() != 0) {
12.       close(out[i][WRITE]);
13.       getline(&line, &len, stream);
14.       // escrita na pipe de stdin do filho
15.     } else {
16.       for (j = 0; j <= i; j++)
17.         close(out[j][READ]);
18.       // redireccionamento do stdout do filho
19.       // redireccionamento do stdin do filho
20.       // execução do comando vecmult
21.     }
22.   }
23.   for (i = 0; i < L; i++) {
24.     char buf[100];
25.     // leitura ordenada do output dos filhos
26.   }
27. }
```

A) `fscanf(out[i][READ], "%s", buf); printf("%s", buf);`
B) `while ((j = fscanf(out[i][READ], "%s", buf)) != 0) { buf[j] = 0; printf("%s", buf); }`
C) `while ((j = read(out[i][READ], buf, 100)) != 0) { buf[j] = 0; printf("%s", buf); }`
D) `j = read(out[i][READ], buf, 100); buf[j] = 0; printf("%s", buf);`

**Resposta:** C
**Nota:** `read()` recebe um file descriptor (int), `fscanf` recebe um `FILE*`. Como `out[i][READ]` é um descritor de inteiro, é preciso usar `read()`. O `while` permite ler todo o output do filho até EOF (quando `read` retorna 0).

---

### Q9. Diagrama de processos com fork() em loop
**Parte:** Parte III — Processos
**Tópico:** Processos / fork()
**Guia:** [§37. fork() e exec() em UNIX/Linux](sistemas_operacoes_estudo__2_.md#37-fork-e-exec-em-unixlinux)
**Fonte:** Exame Época Normal

A representação gráfica que melhor retrata a implementação abaixo é (assuma que P é um processo e que cada barra vertical representa uma descendência):

```c
main() {
  int i, n = 4, ID;
  for (i = 1; i < n; i++)
    if ((ID = fork()) == 0)
      break;
  fprintf(stderr,"proc(%ld) com pai(%ld)\n", (long)getpid(), (long)getppid());
}
```

A) Uma cadeia linear: P → P → P (3 processos em sequência)
B) Um pai com 4 filhos directos (árvore com fan-out 4)
C) Um pai com 3 filhos directos (árvore com fan-out 3)
D) Uma cadeia linear: P → P → P → P (4 processos em sequência)

**Resposta:** C
**Nota:** O `break` no filho impede que o filho continue o loop e crie mais processos. Apenas o pai continua a iterar e cria 3 filhos (i=1, 2, 3). Resultado: pai com 3 filhos directos.

---

### Q10. Ordem de escrita entre pai e filho
**Parte:** Parte III — Processos
**Tópico:** Processos / Concorrência / Indeterminismo
**Guia:** [§37. fork() e exec() em UNIX/Linux](sistemas_operacoes_estudo__2_.md#37-fork-e-exec-em-unixlinux)
**Fonte:** Exame Época Normal

Seja o seguinte programa:

```c
#include <stdio.h>

main() {
  int i;
  if (fork() == 0)
    for (i=0; i<5; i++) {
      printf("Proc1: %d\n", i);
      sleep(2);
    }
  else
    for (i=0; i<5; i++) {
      printf("Proc2: %d\n", i);
      sleep(3);
    }
}
```

A) a ordem de escrita dos processos é determinada e o processo pai sempre escreve antes do processo filho
B) a ordem de escrita dos processos é determinada e o processo filho intercala as escritas com o processo pai
C) a ordem de escrita dos processos é determinada e o processo filho sempre escreve antes do processo pai
D) a ordem de escrita dos processos é indeterminada

**Resposta:** D

---

# Exame 2 — Exame Época Normal (3 de Julho de 2020)

## Geral

### Q11. O que é um sistema operativo
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos de SO
**Guia:** [§17. O que é um Sistema Operativo?](sistemas_operacoes_estudo__2_.md#17-o-que-é-um-sistema-operativo)
**Fonte:** Exame 03/07/2020

Um sistema operativo é um programa que:

A) executa permanentemente num computador e gere os recursos de hardware para os utilizadores.
B) verifica periodicamente o estado do hardware e gera avisos para a substituição de componentes.
C) permite o arranque do computador ("bootstrap") e depois transfere o controlo para o utilizador.

**Resposta:** A

---

### Q12. BIOS
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos / Boot
**Guia:** [§24. Arranque do Computador (Boot)](sistemas_operacoes_estudo__2_.md#24-arranque-do-computador-boot)
**Fonte:** Exame 03/07/2020

O "Basic Input/Output System" (BIOS) de um computador é:

A) a parte do sistema operativo que lida com toda a interacção com os dispositivos de I/O.
B) a componente do sistema operativo que lida apenas com dispositivos de I/O mais simples.
C) um programa que carrega o "kernel" do sistema operativo para memória no arranque do computador.

**Resposta:** C

---

### Q13. Application Programmer Interface (API)
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos / System calls
**Guia:** [§28. Chamadas ao Sistema (System Calls)](sistemas_operacoes_estudo__2_.md#28-chamadas-ao-sistema-system-calls)
**Fonte:** Exame 03/07/2020

Uma "Application's Programmer Interface" (API) é:

A) uma interface gráfica oferecida por alguns sistemas operativos que proporciona aos programadores um ambiente mais amigável de desenvolvimento.
B) um conjunto de exemplos de aplicações fornecidas com o sistema operativo e que facilitam a escrita de novas aplicações pelos programadores.
C) uma especificação de um conjunto de funções disponíveis para o programador, incluindo os nomes, tipos dos parâmetros e tipos dos valores de retorno.

**Resposta:** C

---

### Q14. Multiprogramming vs multitasking — processos longos sem interrupção
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos / Multiprogramming
**Guia:** [§23. Multiprogramação e Multitasking](sistemas_operacoes_estudo__2_.md#23-multiprogramação-e-multitasking)
**Fonte:** Exame 03/07/2020

Um sistema operativo que executa, num único processador, vários processos longos e computacionalmente intensivos sem interrupção:

A) é bom para "multiprogramming" mas não para "multitasking".
B) é bom para "multitasking" mas não para "multiprogramming".
C) não é bom para "multitasking" nem para "multiprogramming".

**Resposta:** A
**Nota:** Multiprogramming maximiza utilização de CPU (ter vários no sistema), multitasking maximiza tempo de resposta (alternância via quantum). Sem interrupções não há multitasking.

---

### Q15. printf vs write (Standard C Library)
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** C / Bibliotecas / System calls
**Guia:** [§13. Bibliotecas em C](sistemas_operacoes_estudo__2_.md#13-bibliotecas-em-c), [§28. Chamadas ao Sistema (System Calls)](sistemas_operacoes_estudo__2_.md#28-chamadas-ao-sistema-system-calls)
**Fonte:** Exame 03/07/2020

A relação entre a chamada `printf` da Standard C Library e a chamada ao sistema `write` é:

A) cada invocação da função `printf` despoleta uma chamada ao sistema `write`.
B) o `printf` usa buffers em memória para escrever temporariamente e só quando certas condições se verificam é que chama o `write`.
C) o `printf` invoca o `write` apenas quando o processo termina.

**Resposta:** B

---

## Processos

### Q16. Função do loader
**Parte:** Parte III — Processos
**Tópico:** Processos / Criação
**Guia:** [§35. Criação de Processos](sistemas_operacoes_estudo__2_.md#35-criação-de-processos)
**Fonte:** Exame 03/07/2020

A função do programa "loader" do sistema operativo é:

A) gerar código binário executável para uma arquitectura de microprocessador a partir de código em linguagem C.
B) transferir um binário executável para memória transformando-o num processo com espaço de endereçamento e PCB.
C) identificar funções sem código binário associado, localizá-las em bibliotecas e gerar um binário executável.

**Resposta:** B

---

### Q17. Process Control Block (PCB)
**Parte:** Parte III — Processos
**Tópico:** Processos / PCB
**Guia:** [§30. Process Control Block (PCB)](sistemas_operacoes_estudo__2_.md#30-process-control-block-pcb)
**Fonte:** Exame 03/07/2020

O "Process Control Block" (PCB) é:

A) uma estrutura de dados onde é mantida informação sobre o estado de execução de um processo.
B) o bloco de código do sistema operativo responsável pelo controlo da execução dos processos.
C) um controlador que gere a fila de processos que esperam por tempo de execução.

**Resposta:** A

---

### Q18. Context switch
**Parte:** Parte III — Processos
**Tópico:** Processos / Context switch
**Guia:** [§34. Context Switch](sistemas_operacoes_estudo__2_.md#34-context-switch)
**Fonte:** Exame 03/07/2020

Num "context switch", o sistema operativo:

A) troca o processo corrente pelo processo seguinte sem guardar ou carregar qualquer tipo de informação contida nos registos ou PCBs.
B) guarda os valores dos registos no PCB do processo que sai e carrega os registos com os valores guardados no PCB do processo que entra.
C) guarda os valores dos registos no PCB do processo que entra e carrega os registos com os valores guardados no PCB do processo que sai.

**Resposta:** B

---

### Q19. Hardware/software para escalonamento preemptivo
**Parte:** Parte IV — Escalonamento
**Tópico:** Escalonamento / Preemption
**Guia:** [§44. Decisões de Escalonamento — Preemptivo vs Não-Preemptivo](sistemas_operacoes_estudo__2_.md#44-decisões-de-escalonamento--preemptivo-vs-não-preemptivo), [§25. Interrupções](sistemas_operacoes_estudo__2_.md#25-interrupções)
**Fonte:** Exame 03/07/2020

A implementação de algoritmos de escalonamento "preemptive" obrigou a inovações específicas no hardware e software, por exemplo:

A) inibição de interrupções durante a execução de porções críticas de código.
B) a utilização de espaços de endereçamento individuais para os processos.
C) técnicas para libertar blocos grandes de memória.

**Resposta:** A
**Nota:** O hardware timer e a capacidade de inibir/permitir interrupções foram fundamentais para implementar preempção segura.

---

### Q20. Round-Robin com quantum 3 (4 processos)
**Parte:** Parte IV — Escalonamento
**Tópico:** Escalonamento / Round Robin
**Guia:** [§47. Round Robin (RR)](sistemas_operacoes_estudo__2_.md#47-round-robin-rr)
**Fonte:** Exame 03/07/2020

O tempo médio de espera com o algoritmo "Round-Robin" (RR) e quantum de 3 para a configuração seguinte (pares (processo, tempo de execução)) da fila ready: (P1,21) - (P2,6) - (P3,11) - (P4,3) é:

A) 26.3
B) 19.2
C) 15.5

**Resposta:** C
**Nota:** Cálculo (todos chegam em t=0): completion P1=41, P2=18, P3=32, P4=12. Waiting = (20+12+21+9)/4 = 62/4 = 15.5.

---

### Q21. Shortest Remaining Time First (SRTF)
**Parte:** Parte IV — Escalonamento
**Tópico:** Escalonamento / SRTF
**Guia:** [§49. Shortest-Remaining-Time-First (SRTF)](sistemas_operacoes_estudo__2_.md#49-shortest-remaining-time-first-srtf)
**Fonte:** Exame 03/07/2020

O tempo médio de espera com o algoritmo SRTF para a configuração seguinte — tuplos (processo, instante de chegada, tempo de execução) — (P1,0,17) - (P2,3,6) - (P3,5,2) - (P4,6,5) é:

A) 5.0
B) 8.5
C) 12.2

**Resposta:** A
**Nota:** Cálculo: P3 (5→7), P2 (3→5 e 7→11), P4 (11→16), P1 (0→3 e 16→30). Waiting = (13+2+0+5)/4 = 20/4 = 5.0.

---

### Q22. Estrutura de dados do CFS
**Parte:** Parte IV — Escalonamento
**Tópico:** Escalonamento / CFS
**Guia:** [§53. Completely Fair Scheduler (CFS) — Linux](sistemas_operacoes_estudo__2_.md#53-completely-fair-scheduler-cfs--linux)
**Fonte:** Exame 03/07/2020

O "Completely Fair Scheduler" (CFS) organiza os processos:

A) em filas simples;
B) em filas múltiplas;
C) numa árvore binária.

**Resposta:** C
**Nota:** O CFS usa uma red-black tree (árvore binária balanceada) ordenada por virtual runtime.

---

### Q23. EDF e RMS
**Parte:** Parte IV — Escalonamento
**Tópico:** Escalonamento / Real-time
**Guia:** [§50. Priority Scheduling](sistemas_operacoes_estudo__2_.md#50-priority-scheduling)
**Fonte:** Exame 03/07/2020

Os algoritmos "Earliest Deadline First" (EDF) e/ou "Rate Monotonic Scheduling" (RMS) são utilizados em sistemas operativos que executam tarefas:

A) de tempo-real.
B) interactivas.
C) intensivas.

**Resposta:** A

---

## Programação de Sistema

### Q24. Programa fopen + fgetc + fputc
**Parte:** Parte I — Linguagem C
**Tópico:** C / Bibliotecas / I/O em ficheiros
**Guia:** [§13. Bibliotecas em C](sistemas_operacoes_estudo__2_.md#13-bibliotecas-em-c)
**Fonte:** Exame 03/07/2020

O programa seguinte recebe o nome de dois ficheiros como argumentos e:

```c
int main(int argc, char* argv[]) {
  FILE* fp1 = fopen(argv[1], "r");
  FILE* fp2 = fopen(argv[2], "w");
  if(fp1 == NULL) { /* error action */ }
  if(fp2 == NULL) { /* error action */ }
  while( (ch = fgetc(fp1)) != EOF)
    fputc(f2,ch);
  fclose(fp2);
  fclose(fp1);
  return 0;
}
```

A) substitui o conteúdo do primeiro pelo o do segundo.
B) substitui o conteúdo do segundo pelo o do primeiro.
C) concatena o conteúdo do primeiro ao do segundo.

**Resposta:** B
**Nota:** Lê de fp1 (modo "r") e escreve em fp2 (modo "w" → trunca/reescreve). Logo, o segundo ficheiro fica com o conteúdo do primeiro.

---

### Q25. Quantos PIDs imprime fork x4
**Parte:** Parte III — Processos
**Tópico:** Processos / fork()
**Guia:** [§37. fork() e exec() em UNIX/Linux](sistemas_operacoes_estudo__2_.md#37-fork-e-exec-em-unixlinux)
**Fonte:** Exame 03/07/2020

Quantos identificadores de processos são imprimidos pelo programa seguinte?

```c
int main() {
  fork();
  fork();
  fork();
  fork();
  printf("%d\n", getpid());
  return 0;
}
```

A) 16.
B) 8.
C) 4.

**Resposta:** A
**Nota:** Cada `fork()` duplica o número de processos. 2^4 = 16 processos no total, cada um imprime o seu PID.

---

### Q26. execvp com construção de args
**Parte:** Parte III — Processos
**Tópico:** Processos / exec
**Guia:** [§37. fork() e exec() em UNIX/Linux](sistemas_operacoes_estudo__2_.md#37-fork-e-exec-em-unixlinux)
**Fonte:** Exame 03/07/2020

O seguinte programa:

```c
int main(int argc, char* argv[]) {
  char* args[8];
  int i;
  for(i = 0; i < argc - 1; i++)
    args[i] = argv[i+1];
  args[i] = NULL;
  execvp(args[0], args);
  return 0;
}
```

A) executa o programa dado em argv[1] com os argumentos em argv[2], etc.
B) executa o programa dado em argv[0] com os argumentos em argv[1], etc.
C) falha sempre na execução da chamada ao sistema execvp e retorna 0.

**Resposta:** A
**Nota:** O loop copia argv[1..] para args[0..]. `args[0] = argv[1]` é o programa a executar; argumentos seguintes vêm de argv[2..].

---

### Q27. Pipe + dup2 com fork (cmd1 | cmd2)
**Parte:** Parte III — Processos
**Tópico:** Processos / Pipes
**Guia:** [§37. fork() e exec() em UNIX/Linux](sistemas_operacoes_estudo__2_.md#37-fork-e-exec-em-unixlinux), [§41. Pipes](sistemas_operacoes_estudo__2_.md#41-pipes)
**Fonte:** Exame 03/07/2020

O programa seguinte:

```c
char* cmd1[] = {"ls", "-l", NULL};
char* cmd2[] = {"wc", "-l", NULL};

int main (int argc, char* argv[]) {
  int fd[2];
  pid_t pid;
  if (pipe(fd) < 0) { /* pipe error */ }
  if ((pid = fork()) < 0) { /* fork error */ }
  if (pid > 0) {
    close(fd[0]);
    dup2(fd[1], STDOUT_FILENO);
    if (execvp(cmd1[0], cmd1) < 0) { /* exec error */ }
  } else {
    close(fd[1]);
    dup2(fd[0], STDIN_FILENO);
    if (execvp(cmd2[0], cmd2) < 0) { /* exec error */ }
  }
}
```

A) executa cmd1 e cmd2 independentemente nos processos pai e filho, respectivamente.
B) executa cmd1 no processo pai passando o seu output como input para cmd2 executado no processo filho.
C) executa cmd1 no processo pai recebendo como input o output de cmd2 executado no processo filho.

**Resposta:** B
**Nota:** Pai (pid > 0) redireciona stdout para fd[1] (write-end) e executa `ls -l`. Filho redireciona stdin para fd[0] (read-end) e executa `wc -l`. Equivale a `ls -l | wc -l`.

---

### Q28. Sinais SIGKILL, SIGINT, SIGHUP
**Parte:** Parte III — Processos
**Tópico:** Processos / Sinais
**Guia:** [§38. Terminação de Processos (exit, wait, zombie, orphan)](sistemas_operacoes_estudo__2_.md#38-terminação-de-processos-exit-wait-zombie-orphan)
**Fonte:** Exame 03/07/2020

O programa seguinte termina:

```c
static void handler1() { printf("caught SIGKILL\n"); }
static void handler2() { printf("caught SIGINT\n"); }
static void handler3() { printf("caught SIGHUP\n"); }

int main(int argc, char* argv[]) {
  if (signal(SIGKILL, handler1) == SIG_ERR) { /* signal error */ }
  if (signal(SIGINT, handler2) == SIG_ERR) { /* signal error */ }
  if (signal(SIGHUP, handler3) == SIG_ERR) { /* signal error */ }
  for ( ; ; )
    pause();
}
```

A) quando recebe qualquer um dos sinais SIGKILL, SIGINT e SIGHUP.
B) apenas quando recebe os sinais SIGKILL ou SIGINT.
C) apenas quando recebe o sinal SIGKILL.

**Resposta:** C
**Nota:** SIGKILL não pode ser apanhado nem ignorado — sempre termina o processo. SIGINT e SIGHUP são tratados pelos handlers e o processo volta ao `pause()`.

---

# Exame 3 — Teste 15 Abril 2010

### Q29. Multiprogramação e segurança de memória
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos / Proteção
**Guia:** [§23. Multiprogramação e Multitasking](sistemas_operacoes_estudo__2_.md#23-multiprogramação-e-multitasking), [§27. Proteção do CPU e Operação Dual-Mode](sistemas_operacoes_estudo__2_.md#27-proteção-do-cpu-e-operação-dual-mode)
**Fonte:** Teste 15/04/2010

Em um sistema que suporta multiprogramação e time-sharing, vários utilizadores podem compartilhar o sistema simultaneamente. Se este suporte não for bem implementado, esta situação pode gerar vários problemas de segurança. Um possível problema de segurança pode ser:

A) processos podem invadir a área de memória de outros processos
B) processos podem executar em modo não protegido
C) processos podem utilizar a CPU de forma caótica

**Resposta:** A

---

### Q30. Mecanismo de interrupções (trap / software interrupt)
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos / Interrupts / System calls
**Guia:** [§25. Interrupções](sistemas_operacoes_estudo__2_.md#25-interrupções), [§28. Chamadas ao Sistema (System Calls)](sistemas_operacoes_estudo__2_.md#28-chamadas-ao-sistema-system-calls)
**Fonte:** Teste 15/04/2010

O mecanismo de interrupções (trap ou software interrupt) é fundamental para:

A) executar funções de sistema.
B) executar processos de sistema em modo-batch.
C) implementar uma TLB (Translation Lookaside Buffer).

**Resposta:** A
**Nota:** Uma system call é implementada via trap (interrupção de software) que muda para kernel mode.

---

### Q31. Função de execl()
**Parte:** Parte III — Processos
**Tópico:** Processos / exec
**Guia:** [§37. fork() e exec() em UNIX/Linux](sistemas_operacoes_estudo__2_.md#37-fork-e-exec-em-unixlinux)
**Fonte:** Teste 15/04/2010

A função de sistema `execl()` permite substituir o programa do processo que executa a função por um outro; isto acontece porque:

A) se altera todo o contexto do processo.
B) se modifica o segmento de dados e texto do processo.
C) se cria um processo filho que vai executar o novo programa dado como argumento na função execl().

**Resposta:** B
**Nota:** O `exec` substitui o address-space (text + data + heap + stack) mas mantém o PCB (mesmo PID). Não cria processo novo.

---

### Q32. Código que resolve exclusão mútua entre 2 processos
**Parte:** Parte V — Sincronização de Processos
**Tópico:** Sincronização / Critical Section
**Guia:** [§55. Critical Sections e Race Conditions](sistemas_operacoes_estudo__2_.md#55-critical-sections-e-race-conditions), [§63. Tentativas falhadas (variável lock e turn)](sistemas_operacoes_estudo__2_.md#63-tentativas-falhadas-variável-lock-e-turn), [§64. Solução de Peterson](sistemas_operacoes_estudo__2_.md#64-solução-de-peterson)
**Fonte:** Teste 15/04/2010

Qual dos seguintes códigos resolve o problema de exclusão mútua sobre uma região crítica, entre 2 processos, de forma correta?

A) Código (1) — usa variável `turn`:
```
int turn;
turn = 1;
proc(int i) {
  while (TRUE) {
    compute;
    while (turn != i);   // espera a vez
    <zona crítica>;
    turn = (i+1) mod 2;
  }
}
```

B) Código (2) — usa flag, testa antes de set:
```
boolean flag[2];
flag[0] = flag[1] = FALSE;
proc(int i) {
  while (TRUE) {
    compute;
    while (flag[(i+1) mod 2]);  // espera enquanto outro tem flag
    flag[i] = TRUE;
    <zona crítica>;
    flag[i] = FALSE;
  }
}
```

C) Código (3) — usa flag, set antes de testar:
```
boolean flag[2];
flag[0] = flag[1] = FALSE;
proc(int i) {
  while (TRUE) {
    compute;
    flag[i] = TRUE;
    while (flag[(i+1) mod 2]);  // espera enquanto outro tem flag
    <zona crítica>;
    flag[i] = FALSE;
  }
}
```

**Resposta:** A
**Nota:** (1) garante exclusão mútua via alternância estrita (mas viola progresso se o outro nunca quiser entrar). (2) tem race condition: ambos podem ver flag=FALSE, setar flag=TRUE e entrar. (3) pode dar deadlock: ambos setam flag=TRUE e ficam à espera mutuamente. De entre as opções, apenas (1) garante exclusão mútua.

---

### Q33. Função kill()
**Parte:** Parte III — Processos
**Tópico:** Processos / Sinais
**Guia:** [§38. Terminação de Processos (exit, wait, zombie, orphan)](sistemas_operacoes_estudo__2_.md#38-terminação-de-processos-exit-wait-zombie-orphan)
**Fonte:** Teste 15/04/2010

A função de sistema `kill()` serve:

A) para enviar sinais explícitos a um processo filho.
B) apenas para terminar um processo filho.
C) para terminar o processo que invoca a função.

**Resposta:** A
**Nota:** Apesar do nome, `kill()` envia qualquer sinal a um processo (não apenas SIGTERM/SIGKILL). Pode ser usado a qualquer processo, não só filhos.

---

### Q34. Unix em modo kernel não-preemptivo
**Parte:** Parte IV — Escalonamento
**Tópico:** Conceitos básicos / Kernel mode / Real-time
**Guia:** [§44. Decisões de Escalonamento — Preemptivo vs Não-Preemptivo](sistemas_operacoes_estudo__2_.md#44-decisões-de-escalonamento--preemptivo-vs-não-preemptivo), [§50. Priority Scheduling](sistemas_operacoes_estudo__2_.md#50-priority-scheduling)
**Fonte:** Teste 15/04/2010

Considere a seguinte frase: "O Unix não é um sistema adequado para aplicações de tempo real porque um processo executando em modo kernel não pode ser interrompido". Esta afirmativa é falsa ou verdadeira?

A) falsa.
B) verdadeira.
C) não há dados suficientes para responder a esta questão.

**Resposta:** B
**Nota:** Em Unix tradicional, o kernel é não-preemptivo. Isto torna os tempos de resposta imprevisíveis e portanto inadequado para sistemas de tempo real.

---

### Q35. fork() em loop — quantos filhos
**Parte:** Parte III — Processos
**Tópico:** Processos / fork()
**Guia:** [§37. fork() e exec() em UNIX/Linux](sistemas_operacoes_estudo__2_.md#37-fork-e-exec-em-unixlinux)
**Fonte:** Teste 15/04/2010

A instrução `fork()` cria um processo filho. Suponha que executou o código abaixo. Podemos dizer que:

```c
for (i=0; i<2; i++)
  if (fork()==0) {
    escreve(i);
  }
```

A) foram criados 3 processos filho
B) foram criados 5 processos filho
C) foram criados 4 processos filho

**Resposta:** A
**Nota:** i=0: pai faz fork → 1 filho. Pai e filho continuam com i=1. i=1: pai faz fork → 1 filho; o filho original (com i=1) faz fork → 1 filho. Total: 1 + 2 = 3 filhos.

---

### Q36. Instruções privilegiadas (modo kernel)
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos / Dual-mode
**Guia:** [§27. Proteção do CPU e Operação Dual-Mode](sistemas_operacoes_estudo__2_.md#27-proteção-do-cpu-e-operação-dual-mode)
**Fonte:** Teste 15/04/2010

Quais destas instruções devem ser executadas em modo privilegiado?

A) Modificar o valor do relógio, ler valor do relógio, desligar interrupções
B) Mudar de modo utilizador para modo kernel, desligar interrupções
C) Limpar a memória, modificar o valor do relógio

**Resposta:** A
**Nota:** Modificar o relógio do sistema e desligar interrupções são instruções privilegiadas. (A leitura do relógio em si normalmente não é privilegiada, mas a opção A é a mais correcta entre as três.)

---

### Q37. Função wait()
**Parte:** Parte III — Processos
**Tópico:** Processos / wait
**Guia:** [§38. Terminação de Processos (exit, wait, zombie, orphan)](sistemas_operacoes_estudo__2_.md#38-terminação-de-processos-exit-wait-zombie-orphan)
**Fonte:** Teste 15/04/2010

A função de sistema `wait()` permite uma forma limitada de comunicação entre processos pai e filho, nomeadamente:

A) permite que o pai espere até que um filho em concreto termine.
B) permite que o pai espere até que um filho termine.
C) permite que o filho sincronize com o pai esperando que este termine.

**Resposta:** B
**Nota:** `wait()` bloqueia o pai até que QUALQUER filho termine. Para esperar por um filho específico usa-se `waitpid()`.

---

### Q38. fork() com if/else e escrita
**Parte:** Parte III — Processos
**Tópico:** Processos / fork()
**Guia:** [§37. fork() e exec() em UNIX/Linux](sistemas_operacoes_estudo__2_.md#37-fork-e-exec-em-unixlinux)
**Fonte:** Teste 15/04/2010

A instrução `fork()` cria um processo filho. Suponha que executou o código abaixo:

```c
if (fork() != 0) x = 2; else x = 3;
escreve(x);
```

A) o processo pai escreve o valor 2 e o processo filho escreve o valor 3
B) o processo pai escreve o valor 3 e o processo filho escreve o valor 2
C) apenas o processo pai escreve o valor da variável x.

**Resposta:** A
**Nota:** No pai, `fork()` retorna o PID do filho (≠ 0) → `x = 2`. No filho, `fork()` retorna 0 → `x = 3`.

---

### Q39. Instrução atómica para sincronização
**Parte:** Parte V — Sincronização de Processos
**Tópico:** Sincronização / Atomic operations
**Guia:** [§56. Operações Atómicas](sistemas_operacoes_estudo__2_.md#56-operações-atómicas), [§66. Instruções Atómicas — test_and_set e compare_and_swap](sistemas_operacoes_estudo__2_.md#66-instruções-atómicas--test_and_set-e-compare_and_swap)
**Fonte:** Teste 15/04/2010

Uma instrução que verifique e modifique uma posição de memória de forma atómica:

A) é fundamental para implementar sincronização entre processos
B) não é necessária para implementar sincronização entre processos
C) torna a implementação da sincronização entre processos mais fácil

**Resposta:** A
**Nota:** Operações atómicas como `test_and_set` e `compare_and_swap` são o bloco de construção fundamental de mutexes e semáforos em sistemas multiprocessador.

---

### Q40. DMA — Direct Memory Access
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos / I/O / DMA
**Guia:** [§26. Dispositivos de I/O e DMA](sistemas_operacoes_estudo__2_.md#26-dispositivos-de-io-e-dma)
**Fonte:** Teste 15/04/2010

O uso de DMA (Direct Memory Access) tem o efeito de:

A) Reduzir o número de vezes que os dados passam no bus do sistema.
B) Reduzir a intervenção do SO na operação de I/O
C) Facilitar o acesso directo dos processos à memória da máquina.

**Resposta:** B
**Nota:** Com DMA o controlador transfere dados directamente para/da memória, gerando apenas uma interrupção por bloco em vez de o CPU mover cada byte.

---

## Parte Prática (matmult)

### Q41. matmult — escrita na pipe de stdin do filho
**Parte:** Parte III — Processos
**Tópico:** Processos / Pipes
**Guia:** [§41. Pipes](sistemas_operacoes_estudo__2_.md#41-pipes)
**Fonte:** Teste 15/04/2010

A linha 14, que corresponde à escrita na pipe de stdin do filho, pode ser implementada pela sequência de instruções:

```c
// Contexto: após fork(), no ramo do PAI; pipe `in` foi criado antes do fork
// Pai já fechou out[i][WRITE] e leu uma linha com getline()
```

A) `close(in[READ]); write(in[WRITE], line, len); close(in[WRITE]);`
B) `close(in[WRITE]); write(in[READ], line, len); close(in[READ]);`
C) `close(in[READ]); fprintf(in[WRITE], "%s", line); close(in[WRITE]);`
D) `close(in[WRITE]); fprintf(in[READ], "%s", line); close(in[READ]);`

**Resposta:** A
**Nota:** O pai escreve na ponta `WRITE` da pipe → fecha a ponta `READ` que não usa, escreve com `write()` (que aceita file descriptor), e fecha `WRITE` quando termina. `fprintf` não funciona com file descriptor inteiro (precisa de `FILE*`).

---

### Q42. matmult — redireccionamento do stdout do filho
**Parte:** Parte III — Processos
**Tópico:** Processos / dup2
**Guia:** [§41. Pipes](sistemas_operacoes_estudo__2_.md#41-pipes)
**Fonte:** Teste 15/04/2010

A linha 18, que corresponde ao redireccionamento do stdout do filho, pode ser implementada pela sequência de instruções:

A) `dup2(out[i][WRITE], 1); close(out[i][WRITE]);`
B) `dup2(out[i][WRITE], 0); close(out[i][WRITE]);`
C) `dup2(1, out[i][WRITE]); close(out[i][WRITE]);`
D) `dup2(0, out[i][WRITE]); close(out[i][WRITE]);`

**Resposta:** A
**Nota:** `dup2(oldfd, newfd)` faz com que `newfd` passe a referir-se ao mesmo recurso que `oldfd`. Para redirecionar stdout (fd 1) para a pipe, o argumento `newfd` deve ser 1, e `oldfd` o write-end da pipe.

---

### Q43. matmult — redireccionamento do stdin do filho
**Parte:** Parte III — Processos
**Tópico:** Processos / dup2
**Guia:** [§41. Pipes](sistemas_operacoes_estudo__2_.md#41-pipes)
**Fonte:** Teste 15/04/2010

A linha 19, que corresponde ao redireccionamento do stdin do filho, pode ser implementada pela sequência de instruções:

A) `close(in[WRITE]); dup2(in[READ], STDIN_FILENO); close(in[READ]);`
B) `close(in[WRITE]); dup2(STDIN_FILENO, in[READ]); close(in[READ]);`
C) `close(in[READ]); dup2(in[WRITE], STDIN_FILENO); close(in[WRITE]);`
D) `close(in[READ]); dup2(STDIN_FILENO, in[WRITE]); close(in[WRITE]);`

**Resposta:** A
**Nota:** O filho lê da ponta `READ`. Fecha-se `WRITE` (não usado), faz-se `dup2(in[READ], STDIN_FILENO)` para redirecionar stdin. Depois fecha-se `in[READ]` original (já temos cópia em fd 0).

---

### Q44. matmult — execução do comando vecmult
**Parte:** Parte III — Processos
**Tópico:** Processos / exec
**Guia:** [§37. fork() e exec() em UNIX/Linux](sistemas_operacoes_estudo__2_.md#37-fork-e-exec-em-unixlinux)
**Fonte:** Teste 15/04/2010

A linha 20, que corresponde à execução do comando `vecmult`, pode ser implementada pela sequência de instruções:

A) `execl("./vecmult", "vecmult", argv[2], NULL);`
B) `execl("vecmult", "vecmult", argv[2], NULL);`
C) `execl("./vecmult", "vecmult", argv[2]);`
D) `execl("vecmult", "vecmult", argv[2]);`

**Resposta:** A
**Nota:** `execl` precisa do path completo (".//vecmult" para programa local, ou usar `execlp` para procurar no PATH). A lista de argumentos termina sempre com `NULL`. O primeiro argumento é o path; o segundo em diante são os `argv` do novo programa, com `argv[0]` por convenção igual ao nome.

---

### Q45. matmult — leitura ordenada do output dos filhos
**Parte:** Parte III — Processos
**Tópico:** Processos / Pipes / read
**Guia:** [§41. Pipes](sistemas_operacoes_estudo__2_.md#41-pipes)
**Fonte:** Teste 15/04/2010

A linha 25, que corresponde à leitura ordenada do output dos filhos, pode ser implementada pela sequência de instruções:

A) `while ((j = read(out[i][READ], buf, 100)) != 0) { buf[j] = 0; printf("%s", buf); }`
B) `j = read(out[i][READ], buf, 100); buf[j] = 0; printf("%s", buf);`
C) `while ((j = fscanf(out[i][READ], "%s", buf)) != 0) { buf[j] = 0; printf("%s", buf); }`
D) `fscanf(out[i][READ], "%s", buf); printf("%s", buf);`

**Resposta:** A
**Nota:** `read` recebe file descriptor (int); `fscanf` precisa de `FILE*`. O `while` lê em loop até EOF (read retorna 0). A leitura única (B) pode falhar se o output não couber em 100 bytes.

---

# Exame 4 — Teste 1

### Q46. O que é um sistema operativo
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos de SO
**Guia:** [§17. O que é um Sistema Operativo?](sistemas_operacoes_estudo__2_.md#17-o-que-é-um-sistema-operativo)
**Fonte:** Teste 1

Um sistema operativo é um programa que:

A) corre permanentemente num computador e gere os recursos de hardware para os utilizadores.
B) verifica periodicamente o estado do hardware e gera avisos para a substituição de componentes.
C) permite o arranque do computador ("bootstrap") e depois transfere o controlo para o utilizador.

**Resposta:** A

---

### Q47. iOS, Android e UNIX
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos / História do SO
**Guia:** [§17. O que é um Sistema Operativo?](sistemas_operacoes_estudo__2_.md#17-o-que-é-um-sistema-operativo)
**Fonte:** Teste 1

Qual a relação entre os sistemas operativos iOS e Android com o UNIX?

A) não existe nenhuma relação entre os dois sistemas operativos e o UNIX.
B) o iOS descende do BSD UNIX via MACOS X, o Android foi desenhado de raíz.
C) ambos descendem de sistemas UNIX, o BSD UNIX e o Linux, respectivamente.

**Resposta:** C
**Nota:** iOS deriva de Darwin/macOS (com base em BSD). Android usa o kernel Linux como base.

---

### Q48. Multiprogramming vs multitasking — processos longos
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos / Multiprogramming
**Guia:** [§23. Multiprogramação e Multitasking](sistemas_operacoes_estudo__2_.md#23-multiprogramação-e-multitasking)
**Fonte:** Teste 1

Um sistema operativo que executa, num único processador, vários processos longos e computacionalmente intensivos sem interrupção:

A) é bom para "multiprogramming" mas não para "multitasking".
B) é bom para "multitasking" mas não para "multiprogramming".
C) não é bom para "multitasking" nem para "multiprogramming".

**Resposta:** A

---

### Q49. BIOS
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos / Boot
**Guia:** [§24. Arranque do Computador (Boot)](sistemas_operacoes_estudo__2_.md#24-arranque-do-computador-boot)
**Fonte:** Teste 1

O "Basic Input/Output System" (BIOS) de um computador é:

A) a parte do sistema operativo que lida com toda a interacção com os dispositivos de I/O.
B) a componente do sistema operativo que lida apenas com dispositivos de I/O mais simples.
C) um programa que carrega o "kernel" do sistema operativo para memória no arranque do computador.

**Resposta:** C

---

### Q50. Loader
**Parte:** Parte III — Processos
**Tópico:** Processos / Criação
**Guia:** [§35. Criação de Processos](sistemas_operacoes_estudo__2_.md#35-criação-de-processos)
**Fonte:** Teste 1

A função do programa "loader" do sistema operativo é:

A) gerar código binário executável para uma arquitectura de microprocessador a partir de código em linguagem C.
B) transferir um binário executável para memória transformando-o num processo com espaço de endereçamento e PCB.
C) identificar funções sem código binário associado, localizá-las em bibliotecas e gerar um binário executável.

**Resposta:** B

---

### Q51. PCB
**Parte:** Parte III — Processos
**Tópico:** Processos / PCB
**Guia:** [§30. Process Control Block (PCB)](sistemas_operacoes_estudo__2_.md#30-process-control-block-pcb)
**Fonte:** Teste 1

O "Process Control Block" (PCB) é:

A) uma estrutura de dados onde é mantida informação sobre o estado de execução de um processo.
B) o bloco de código do sistema operativo responsável pelo controlo da execução dos processos.
C) para além da fila "ready", a outra fila de processos que esperam por tempo de microprocessador.

**Resposta:** A

---

### Q52. Context switch
**Parte:** Parte III — Processos
**Tópico:** Processos / Context switch
**Guia:** [§34. Context Switch](sistemas_operacoes_estudo__2_.md#34-context-switch)
**Fonte:** Teste 1

Num "context switch", o sistema operativo:

A) troca o processo corrente pelo processo seguinte sem guardar ou carregar qualquer tipo de informação contida nos registos ou PCBs.
B) guarda os valores dos registos no PCB do processo que sai e carrega os registos com os valores guardados no PCB do processo que entra.
C) guarda os valores dos registos no PCB do processo que entra e carrega os registos com os valores guardados no PCB do processo que sai.

**Resposta:** B

---

### Q53. fork() x5 — quantos PIDs
**Parte:** Parte III — Processos
**Tópico:** Processos / fork()
**Guia:** [§37. fork() e exec() em UNIX/Linux](sistemas_operacoes_estudo__2_.md#37-fork-e-exec-em-unixlinux)
**Fonte:** Teste 1

Quantos identificadores de processos são imprimidos pelo programa que se segue?

```c
int main() {
  fork();
  fork();
  fork();
  fork();
  fork();
  printf("%d\n", getpid());
  return 0;
}
```

A) 32.
B) 5.
C) 6.

**Resposta:** A
**Nota:** 2^5 = 32 processos no total, cada um imprime o seu PID.

---

### Q54. Processo orfão
**Parte:** Parte III — Processos
**Tópico:** Processos / Terminação
**Guia:** [§38. Terminação de Processos (exit, wait, zombie, orphan)](sistemas_operacoes_estudo__2_.md#38-terminação-de-processos-exit-wait-zombie-orphan)
**Fonte:** Teste 1

Se um processo P termina sem esperar pelo término de um processo filho Q:

A) Q não sofre qualquer alteração no seu estado e continua a executar.
B) Q torna-se um processo "zombie", sendo eliminado pelo processo "init".
C) Q torna-se um processo orfão, sendo adoptado pelo processo "init".

**Resposta:** C
**Nota:** Quando o pai morre antes do filho, o filho fica orphan e é re-parented pelo `init` (PID 1). Zombie é o caso oposto: filho terminou e pai não fez wait.

---

### Q55. API
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos / System calls
**Guia:** [§28. Chamadas ao Sistema (System Calls)](sistemas_operacoes_estudo__2_.md#28-chamadas-ao-sistema-system-calls)
**Fonte:** Teste 1

Uma "Application's Programmer Interface" (API) é:

A) uma interface gráfica oferecida por alguns sistemas operativos que proporciona aos programadores um ambiente mais amigável de desenvolvimento.
B) um conjunto de exemplos de aplicações fornecidas com o sistema operativo e que facilitam a escrita de novas aplicações pelos programadores.
C) uma especificação de um conjunto de funções disponíveis para o programador, incluindo os nomes, tipos dos parâmetros e tipos dos valores de retorno.

**Resposta:** C

---

### Q56. Pipes — direcionalidade
**Parte:** Parte III — Processos
**Tópico:** Processos / IPC / Pipes
**Guia:** [§41. Pipes](sistemas_operacoes_estudo__2_.md#41-pipes)
**Fonte:** Teste 1

As "pipes" são um exemplo de mecanismo de comunicação entre processos suportados pelo "kernel" do UNIX. A troca de informação é:

A) bidirecional, entre dois quaisquer processos.
B) unidirecional, entre dois quaisquer processos.
C) unidirecional, entre processos pai-filho.

**Resposta:** C
**Nota:** Anonymous pipes são unidirecionais (`fd[0]` para leitura, `fd[1]` para escrita) e só funcionam entre processos com ascendência comum (tipicamente pai-filho), pois os file descriptors são herdados via `fork()`.

---

### Q57. execvp com construção de args
**Parte:** Parte III — Processos
**Tópico:** Processos / exec
**Guia:** [§37. fork() e exec() em UNIX/Linux](sistemas_operacoes_estudo__2_.md#37-fork-e-exec-em-unixlinux)
**Fonte:** Teste 1

O seguinte programa:

```c
int main(int argc, char* argv[]) {
  char* args[8];
  int i;
  for(i = 0; i < argc - 1; i++)
    args[i] = argv[i+1];
  args[i] = NULL;
  execvp(args[0], args);
  return 0;
}
```

A) executa o programa dado em argv[1] com os argumentos em argv[2], etc.
B) executa o programa dado em argv[0] com os argumentos em argv[1], etc.
C) falha sempre na execução da chamada ao sistema "execvp" e retorna 0.

**Resposta:** A

---

### Q58. CPU bursts vs I/O bursts
**Parte:** Parte IV — Escalonamento
**Tópico:** Escalonamento / CPU-I/O burst
**Guia:** [§43. Ciclo CPU-I/O Burst](sistemas_operacoes_estudo__2_.md#43-ciclo-cpu-io-burst)
**Fonte:** Teste 1

Tipicamente, um processo executa:

A) alternando entre "bursts" de microprocessador e de I/O.
B) com um "burst" de microprocessador, o I/O é todo no fim.
C) todo o I/O no início, seguido de "burst" de microprocessador.

**Resposta:** A

---

### Q59. Imagem de evento em escalonamento preemptivo
**Parte:** Parte III — Processos
**Tópico:** Processos / Context switch
**Guia:** [§34. Context Switch](sistemas_operacoes_estudo__2_.md#34-context-switch)
**Fonte:** Teste 1

A imagem que se segue representa um evento fundamental num algoritmo de escalonamento "pre-emptive":

```
process P0          operating system          process P1
─────────                                      ─────────
executing │  interrupt or system call
          ├─────────────► save state into PCB₀
                                                  ┐
                                                  │ idle
                                                  │
                          reload state from PCB₁  ┘
                          ─────────────────────► executing
   ┐                                                │
   │ idle           interrupt or system call        │
   │                ◄───── save state into PCB₁ ────┤
   │
   │                reload state from PCB₀
   ┘ ◄───────────── ─────────────────────►
executing
```

O SO alterna entre P0 e P1: cada vez que há uma interrupção ou system call, **guarda** o estado do processo corrente no seu PCB e **carrega** o estado do próximo processo do PCB dele.

A) um "backup" do sistema.
B) uma operação de I/O.
C) um "context switch".

**Resposta:** C

---

### Q60. Interacção com o kernel UNIX
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos / System calls
**Guia:** [§28. Chamadas ao Sistema (System Calls)](sistemas_operacoes_estudo__2_.md#28-chamadas-ao-sistema-system-calls)
**Fonte:** Teste 1

A figura representa a estrutura de um sistema operativo UNIX:

```
┌─────────────────────────────────────────────────────────┐
│                      (the users)                        │
├─────────────────────────────────────────────────────────┤
│   shells and commands  ·  compilers and interpreters    │
│                    system libraries                     │
├═════════════════════════════════════════════════════════┤
│              system-call interface to the kernel        │  ◄── interface
├─────────────────────────────────────────────────────────┤
│  signals terminal    │   file system     │  CPU         │
│  handling            │   swapping block  │  scheduling  │
│  character I/O       │   I/O system      │  page replmt │  kernel
│  terminal drivers    │   disk/tape drv.  │  virtual mem │
├─────────────────────────────────────────────────────────┤
│              kernel interface to the hardware           │
├─────────────────────────────────────────────────────────┤
│  terminal controllers │ device controllers │ memory     │
│  terminals            │ disks and tapes    │ controllers│
└─────────────────────────────────────────────────────────┘
```

Como se faz a interacção com o "kernel"?

A) através de funções designadas por "system calls".
B) através de bibliotecas como a "Standard C Library".
C) um utilizador nunca interage directamente com o "kernel".

**Resposta:** A

---

### Q61. printf vs write (Standard C Library)
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** C / Bibliotecas / System calls
**Guia:** [§13. Bibliotecas em C](sistemas_operacoes_estudo__2_.md#13-bibliotecas-em-c), [§28. Chamadas ao Sistema (System Calls)](sistemas_operacoes_estudo__2_.md#28-chamadas-ao-sistema-system-calls)
**Fonte:** Teste 1

A relação entre o "printf" e a chamada ao sistema "write" é:

A) cada invocação da função "printf" despoleta de imediato uma chamada ao sistema "write".
B) o "printf" usa buffers em memória para escrever temporariamente e quando enchem chama o "write".
C) o "printf" invoca a chamada ao sistema "write" apenas quando o processo corrente termina.

**Resposta:** B

---

### Q62. Hardware/software para escalonamento preemptivo
**Parte:** Parte IV — Escalonamento
**Tópico:** Escalonamento / Preemption
**Guia:** [§44. Decisões de Escalonamento — Preemptivo vs Não-Preemptivo](sistemas_operacoes_estudo__2_.md#44-decisões-de-escalonamento--preemptivo-vs-não-preemptivo), [§25. Interrupções](sistemas_operacoes_estudo__2_.md#25-interrupções)
**Fonte:** Teste 1

A implementação de algoritmos de escalonamento "pre-emptive" obrigou a inovações específicas no hardware e software, por exemplo:

A) inibição de interrupções durante a execução de porções críticas de código.
B) a utilização de espaços de endereçamento individuais para os processos.
C) técnicas como o "Direct Memory Access" para transferir blocos grandes de dados.

**Resposta:** A

---

### Q63. Round-Robin com quantum 5
**Parte:** Parte IV — Escalonamento
**Tópico:** Escalonamento / Round Robin
**Guia:** [§47. Round Robin (RR)](sistemas_operacoes_estudo__2_.md#47-round-robin-rr)
**Fonte:** Teste 1

O tempo médio de espera para a seguinte configuração de processos (P1-P2-P3-P4) na fila ready, com Round-Robin (RR) e quantum de 5, é:

| Process | Burst-Time |
|---------|------------|
| P1      | 21         |
| P2      | 6          |
| P3      | 11         |
| P4      | 3          |

A) 21.33
B) 19.25
C) 12.74

**Resposta:** B
**Nota:** Cálculo (todos chegam em t=0): completion P1=41, P2=24, P3=35, P4=18. Waiting = (20+18+24+15)/4 = 77/4 = 19.25.

---

### Q64. SRTF com tempos de chegada
**Parte:** Parte IV — Escalonamento
**Tópico:** Escalonamento / SRTF
**Guia:** [§49. Shortest-Remaining-Time-First (SRTF)](sistemas_operacoes_estudo__2_.md#49-shortest-remaining-time-first-srtf)
**Fonte:** Teste 1

O tempo médio de espera na fila para a seguinte configuração de processos com SRTF é:

| Process | Arrival-Time | Burst-Time |
|---------|--------------|------------|
| P1      | 0            | 8          |
| P2      | 1            | 4          |
| P3      | 2            | 9          |
| P4      | 3            | 5          |

A) 6.50
B) 7.25
C) 9.35

**Resposta:** A
**Nota:** Sequência: P1 (0→1), P2 (1→5), P4 (5→10), P1 (10→17), P3 (17→26). Waiting = (9+0+15+2)/4 = 26/4 = 6.5.

---

### Q65. CFS — estrutura de dados
**Parte:** Parte IV — Escalonamento
**Tópico:** Escalonamento / CFS
**Guia:** [§53. Completely Fair Scheduler (CFS) — Linux](sistemas_operacoes_estudo__2_.md#53-completely-fair-scheduler-cfs--linux)
**Fonte:** Teste 1

O "Completely Fair Scheduler" (CFS), utilizado no kernel do Linux, organiza os processos:

A) em filas simples;
B) em filas múltiplas;
C) numa árvore binária.

**Resposta:** C

---

### Q66. EDF e RMS
**Parte:** Parte IV — Escalonamento
**Tópico:** Escalonamento / Real-time
**Guia:** [§50. Priority Scheduling](sistemas_operacoes_estudo__2_.md#50-priority-scheduling)
**Fonte:** Teste 1

Tipicamente, os algoritmos "Earliest Deadline First" (EDF) e/ou "Rate Monotonic Scheduling" (RMS) são utilizados em sistema operativos que executam processos associados a tarefas:

A) de tempo-real.
B) interactivas.
C) intensivas.

**Resposta:** A

---

### Q67. Programa fopen + fread + fwrite
**Parte:** Parte I — Linguagem C
**Tópico:** C / Bibliotecas / I/O em ficheiros
**Guia:** [§13. Bibliotecas em C](sistemas_operacoes_estudo__2_.md#13-bibliotecas-em-c)
**Fonte:** Teste 1

O seguinte programa recebe o nome de dois ficheiros como argumentos e:

```c
int main(int argc, char* argv[]) {
  FILE* fp1 = fopen(argv[1], "w");
  if(fp1 == NULL) { /* error action */ }
  FILE* fp2 = fopen(argv[2], "r");
  if(fp2 == NULL) { /* error action */ }
  int bytes_read;
  char buffer[BUFFER_SIZE];
  while( (bytes_read = fread(buffer, 1, BUFFER_SIZE, fp2)) != 0)
    fwrite(buffer, 1, bytes_read, fp1);
  fclose(fp2);
  fclose(fp1);
  return EXIT_SUCCESS;
}
```

A) substitui o conteúdo do primeiro pelo do segundo.
B) substitui o conteúdo do segundo pelo do primeiro.
C) concatena o conteúdo do segundo com o do primeiro.

**Resposta:** A
**Nota:** fp1 está aberto em "w" (truncado para escrita), fp2 em "r" (leitura). Lê-se de fp2 e escreve-se em fp1 → o primeiro ficheiro fica com o conteúdo do segundo.

---

### Q68. fork() — endereços virtuais iguais com valores diferentes
**Parte:** Parte III — Processos
**Tópico:** Processos / fork() / Address space
**Guia:** [§29. Conceito de Processo](sistemas_operacoes_estudo__2_.md#29-conceito-de-processo), [§37. fork() e exec() em UNIX/Linux](sistemas_operacoes_estudo__2_.md#37-fork-e-exec-em-unixlinux)
**Fonte:** Teste 1

Como explica que o seguinte programa dê valores distintos para a variável "val" que está localizada no mesmo endereço?

```c
int main(int argc, char* argv[]) {
  pid_t pid;
  int val;
  pid = fork();
  if (pid == 0) {
    val = 0;
    printf(" child: val = %d, at addr = %p\n", val, &val);
    return EXIT_SUCCESS;
  } else {
    val = 1;
    wait(NULL);
    printf("parent: val = %d, at addr = %p\n", val, &val);
    return EXIT_SUCCESS;
  }
}

/* Output:
   child:  val = 0, at addr = 0x7ffeef275a38
   parent: val = 1, at addr = 0x7ffeef275a38 */
```

A) há um erro no programa, depois do "fork" os endereços têm de ser diferentes.
B) "val" é alterada na memória física no mesmo endereço em instantes diferentes.
C) os espaços de endereçamento dos processos são iguais e o endereço é virtual.

**Resposta:** C
**Nota:** Após `fork()`, pai e filho têm address spaces virtualmente idênticos (mesmos endereços virtuais para as mesmas variáveis), mas as suas páginas de data/heap/stack são privadas (com COW). O endereço impresso é virtual; o endereço físico subjacente é diferente.

---

# Exame 5 — Teste 2 (Teoria) — perguntas dentro da matéria

> A grande maioria deste exame é sobre memória virtual e sistemas de ficheiros (fora do guia). Apenas as perguntas elegíveis foram incluídas.

### Q69. Round-Robin vs SJF — tempo médio de espera
**Parte:** Parte IV — Escalonamento
**Tópico:** Escalonamento / RR vs SJF
**Guia:** [§47. Round Robin (RR)](sistemas_operacoes_estudo__2_.md#47-round-robin-rr), [§48. Shortest-Job-First (SJF) e Previsão do Próximo Burst](sistemas_operacoes_estudo__2_.md#48-shortest-job-first-sjf-e-previsão-do-próximo-burst)
**Fonte:** Teste 2 (Teoria)

Assuma a seguinte ordem de chegada de processos no sistema (números mais baixos de prioridade indicam alta prioridade):

| #  | Tempo de chegada | Tempo de execução | Prioridade |
|----|------------------|-------------------|------------|
| P0 | 0.0              | 1                 | 4          |
| P1 | 0.2              | 0.5               | 1          |
| P2 | 1.0              | 2                 | 2          |
| P3 | 1.5              | 1                 | 3          |

A seguinte afirmação é verdadeira:

A) o algoritmo round-robin com quantum de tempo igual a 1 tem um tempo médio de espera maior do que o algoritmo SJF (Shortest Job First)
B) o algoritmo que utiliza prioridades vai escalonar os jobs na seguinte ordem: P1, P2, P3 e P0
C) o algoritmo round-robin com quantum de tempo igual a 1 executa estes processos em menos tempo do que o algoritmo SJF (Shortest Job First)
D) o algoritmo que utiliza prioridades vai escalonar os jobs na seguinte ordem: P0, P3, P2 e P1

**Resposta:** A
**Nota:** SJF é óptimo para tempo médio de espera quando todos os jobs estão disponíveis ao mesmo tempo. RR introduz overhead de context switch e tipicamente tem maior tempo médio de espera que SJF.

---

### Q70. Readers-Writers — variante e prioridade
**Parte:** Parte V — Sincronização de Processos
**Tópico:** Sincronização / Readers-Writers
**Guia:** [§79. Problemas Clássicos — Readers and Writers](sistemas_operacoes_estudo__2_.md#79-problemas-clássicos--readers-and-writers)
**Fonte:** Teste 2 (Teoria)

Considere a seguinte implementação do problema dos leitores e escritores:

```
semáforo mutex = 1;
semáforo bd = 1;
int num_leitores = 0;

escritor() {
  while (true) {
    produz_dado();
    down(&bd);
    escreve_dado_bd();
    up(&bd);
  }
}

leitor() {
  while (true) {
    down(&mutex);
    num_leitores++;
    if (num_leitores == 1) down(&bd);
    up(&mutex);
    le_dado();
    down(&mutex);
    num_leitores--;
    if (num_leitores == 0) up(&bd);
    up(&mutex);
    processa_dado_lido();
  }
}
```

Esta implementação dá prioridade:

A) aos leitores
B) aos escritores
C) a muitos escritores
D) igual aos leitores e escritores

**Resposta:** A
**Nota:** Esta é a variante "readers-preference". Enquanto houver pelo menos um leitor activo, o `bd` está ocupado e os escritores não podem entrar — pode causar starvation dos escritores.

---

### Q71. Tempo de resposta (response time)
**Parte:** Parte IV — Escalonamento
**Tópico:** Escalonamento / Critérios
**Guia:** [§45. Critérios de Escalonamento](sistemas_operacoes_estudo__2_.md#45-critérios-de-escalonamento)
**Fonte:** Teste 2 (Teoria)

O que é o tempo de resposta (response time) de um processo?

A) tempo de execução de um processo que é interactivo
B) tempo para obter todas as respostas
C) tempo de execução de um processo que executa em "batch"
D) tempo para obter a primeira resposta

**Resposta:** D
**Nota:** Response time = tempo desde a submissão até produzir a primeira resposta (não confundir com turnaround time, que é o tempo total).

---

# Exame 6 — Teste de Escolha Múltipla (1º Teste)

### Q72. SO multiprogramado e utilização do CPU
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos / Multiprogramação
**Guia:** [§23. Multiprogramação e Multitasking](sistemas_operacoes_estudo__2_.md#23-multiprogramação-e-multitasking)
**Fonte:** Teste Escolha Múltipla

Um SO multiprogramado melhora a utilização do CPU porque se pode:

A) Executar vários processos no mesmo instante
B) Executar vários processos de diferentes utilizadores
C) Atribuir o CPU a um outro processo caso o processo corrente tenha de ser suspenso

**Resposta:** C
**Nota:** Multiprogramação maximiza utilização do CPU permitindo que, quando um processo está bloqueado (e.g. à espera de I/O), outro processo passe a usar o CPU. (No exame original a opção A está marcada, mas a definição técnica correcta de multiprogramação corresponde a C — ter vários processos em memória ao mesmo tempo *para* que o CPU seja atribuído a outro quando um bloqueia.)

---

### Q73. Quando pode acontecer um deadlock
**Parte:** Parte VI — Deadlocks
**Tópico:** Deadlocks
**Guia:** [§81. Caracterização de Deadlock — 4 Condições Necessárias](sistemas_operacoes_estudo__2_.md#81-caracterização-de-deadlock--4-condições-necessárias)
**Fonte:** Teste Escolha Múltipla

Um encravamento (deadlock) pode acontecer quando se tem 2 ou mais processos:

A) A tentarem ler ou escrever num mesmo disco
B) A tentarem aceder a recursos não interrompíveis (no preemption)

**Resposta:** B
**Nota:** "No preemption" é uma das 4 condições necessárias para deadlock (juntamente com mutual exclusion, hold and wait e circular wait).

---

### Q74. Descritor de ficheiros em UNIX/C
**Parte:** Parte III — Processos
**Tópico:** Processos / Pipes / File descriptors
**Guia:** [§41. Pipes](sistemas_operacoes_estudo__2_.md#41-pipes)
**Fonte:** Teste Escolha Múltipla

Um descritor de ficheiros em Unix é representado em C por:

A) Um inteiro
B) Um apontador para estrutura
C) Uma estrutura

**Resposta:** A
**Nota:** Em UNIX, file descriptors são pequenos inteiros não-negativos (0=stdin, 1=stdout, 2=stderr). `pipe(int fd[2])` devolve dois inteiros.

---

### Q75. fork() com if/else (resposta livre)
**Parte:** Parte III — Processos
**Tópico:** Processos / fork()
**Guia:** [§37. fork() e exec() em UNIX/Linux](sistemas_operacoes_estudo__2_.md#37-fork-e-exec-em-unixlinux)
**Fonte:** Teste Escolha Múltipla

A instrução `fork()` cria um processo filho. Suponha então que se executou o seguinte código:

```c
x = 1;
if (fork() == 0)
  x = 2;
else
  x = 3;
```

Após a instrução if-else podemos dizer que:

A) O processo pai tem valor 3 e o processo filho tem valor 2
B) O processo pai tem valor 2 e o processo filho tem valor 3
C) Ambos têm valor 1
D) O valor é indeterminado

**Resposta:** A
**Nota:** No filho, `fork()` retorna 0 → entra no `if` → `x=2`. No pai, `fork()` retorna o PID do filho (≠ 0) → entra no `else` → `x=3`.

---

### Q76. Modo kernel
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos / Dual-mode
**Guia:** [§27. Proteção do CPU e Operação Dual-Mode](sistemas_operacoes_estudo__2_.md#27-proteção-do-cpu-e-operação-dual-mode)
**Fonte:** Teste Escolha Múltipla

O modo kernel de operações num SO é responsável por:

A) Proteger o acesso aos recursos do sistema
B) Executar os processos de Sistema
C) Executar os processos de utilizador

**Resposta:** A

---

### Q77. Efeito do DMA (1)
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos / I/O / DMA
**Guia:** [§26. Dispositivos de I/O e DMA](sistemas_operacoes_estudo__2_.md#26-dispositivos-de-io-e-dma)
**Fonte:** Teste Escolha Múltipla

O uso de DMA tem o efeito de:

A) Reduzir o nº de vezes que os dados passam no bus do sistema
B) Reduzir a intervenção do SO nas operações de I/O
C) Facilitar o acesso directo dos processos à memória da máquina

**Resposta:** B

---

### Q78. wait() — comunicação pai/filho
**Parte:** Parte III — Processos
**Tópico:** Processos / wait
**Guia:** [§38. Terminação de Processos (exit, wait, zombie, orphan)](sistemas_operacoes_estudo__2_.md#38-terminação-de-processos-exit-wait-zombie-orphan)
**Fonte:** Teste Escolha Múltipla

A função `wait()` do sistema permite uma forma limitada de comunicação entre processos pai e filho, nomeadamente:

A) Permite que o pai espere até que um filho em concreto termine
B) Permite que o pai espere até que um filho termine

**Resposta:** B
**Nota:** `wait()` espera por qualquer filho. Para esperar por um filho específico usa-se `waitpid()`.

---

### Q79. dup2 e redireccionamento de output
**Parte:** Parte III — Processos
**Tópico:** Processos / Pipes / dup2
**Guia:** [§41. Pipes](sistemas_operacoes_estudo__2_.md#41-pipes)
**Fonte:** Teste Escolha Múltipla

A implementação de redireccionamento de output de um comando para um ficheiro requer o uso da função do sistema `dup2` para:

A) Associar o descritor de ficheiro ao descritor 0 (input)
B) Associar o descritor de ficheiro ao descritor 1 (output)
C) Duplicar o valor do descritor

**Resposta:** B
**Nota:** stdout é o file descriptor 1. `dup2(novo_fd, 1)` faz com que o fd 1 passe a apontar para o `novo_fd` — efectivamente redireciona o stdout.

---

### Q80. Qual NÃO é condição para deadlock
**Parte:** Parte VI — Deadlocks
**Tópico:** Deadlocks / 4 condições
**Guia:** [§81. Caracterização de Deadlock — 4 Condições Necessárias](sistemas_operacoes_estudo__2_.md#81-caracterização-de-deadlock--4-condições-necessárias)
**Fonte:** Teste Escolha Múltipla

Qual das seguintes não é condição para que se verifique um encravamento (deadlock):

A) Posse exclusiva de um recurso por um processo
B) Espera por atribuição de um recurso
C) Cadeia de espera circular de processos e recursos

**Resposta:** A
**Nota:** As 4 condições de deadlock são: mutual exclusion, hold-and-wait, no preemption, circular wait. "Posse exclusiva" (= mutual exclusion) é uma das condições, mas a marcação no exame original aponta esta como sendo a "não-condição" — provavelmente por se interpretar que "posse exclusiva" sozinha (sem hold-and-wait) não basta para deadlock. As outras duas opções correspondem mais directamente a hold-and-wait e circular wait.

---

### Q81. Como proteger acesso aos recursos
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos / Dual-mode
**Guia:** [§27. Proteção do CPU e Operação Dual-Mode](sistemas_operacoes_estudo__2_.md#27-proteção-do-cpu-e-operação-dual-mode)
**Fonte:** Teste Escolha Múltipla

Num SO é indispensável proteger o acesso aos recursos ou hardware. Tal é conseguido:

A) Usando-se dois modos distintos de operação: User e Kernel
B) Usando-se dois tipos de processos: de Sistema e de Utilizadores
C) Gerando-se interrupts por operação de I/O

**Resposta:** A

---

### Q82. Multiprogramação/time-sharing — problemas de segurança
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos / Proteção de memória
**Guia:** [§23. Multiprogramação e Multitasking](sistemas_operacoes_estudo__2_.md#23-multiprogramação-e-multitasking), [§27. Proteção do CPU e Operação Dual-Mode](sistemas_operacoes_estudo__2_.md#27-proteção-do-cpu-e-operação-dual-mode)
**Fonte:** Teste Escolha Múltipla

Num sistema que suporta multiprogramação e time-sharing, vários utilizadores podem compartilhar o sistema simultaneamente. Se este suporte não for bem implementado, esta situação pode causar vários problemas de segurança. Um possível problema de segurança pode ser:

A) Processos podem invadir a área de memória de outros processos
B) Processos podem executar em modo não protegido
C) Processos podem utilizar a CPU de forma caótica

**Resposta:** A

---

### Q83. Função kill()
**Parte:** Parte III — Processos
**Tópico:** Processos / Sinais
**Guia:** [§38. Terminação de Processos (exit, wait, zombie, orphan)](sistemas_operacoes_estudo__2_.md#38-terminação-de-processos-exit-wait-zombie-orphan)
**Fonte:** Teste Escolha Múltipla

A função do sistema `kill()` serve:

A) Para enviar sinais explícitos a um processo filho
B) Para terminar um processo
C) Para activar o handler de sinais

**Resposta:** A
**Nota:** `kill()` envia qualquer sinal a qualquer processo (não apenas filhos). O nome é histórico — antes só envidava SIGTERM.

---

### Q84. execl() — substitui programa
**Parte:** Parte III — Processos
**Tópico:** Processos / exec
**Guia:** [§37. fork() e exec() em UNIX/Linux](sistemas_operacoes_estudo__2_.md#37-fork-e-exec-em-unixlinux)
**Fonte:** Teste Escolha Múltipla

A função de sistema `execl()` permite substituir o programa do processo que executa a função por um outro; isto acontece porque:

A) Se altera todo o contexto do processo
B) Se modifica o segmento de dados e texto do processo
C) Se cria um processo filho que vai executar o novo programa

**Resposta:** B

---

### Q85. fork() em loop com escrita
**Parte:** Parte III — Processos
**Tópico:** Processos / fork()
**Guia:** [§37. fork() e exec() em UNIX/Linux](sistemas_operacoes_estudo__2_.md#37-fork-e-exec-em-unixlinux)
**Fonte:** Teste Escolha Múltipla

A instrução `fork()` cria um processo filho. Suponha que executou o código abaixo. Podemos dizer que:

```c
for (i=0; i<2; i++)
  if (fork() == 0)
    escreve(i);
```

A) Cria 3 processos filhos
B) Cria 4 processos filhos
C) Cria 5 processos filhos

**Resposta:** A
**Nota:** i=0: pai faz fork → 1 filho. Pai e filho continuam para i=1. i=1: 2 processos fazem fork → 2 filhos. Total = 1 + 2 = 3 filhos.

---

### Q86. Instrução atómica
**Parte:** Parte V — Sincronização de Processos
**Tópico:** Sincronização / Atomic operations
**Guia:** [§56. Operações Atómicas](sistemas_operacoes_estudo__2_.md#56-operações-atómicas), [§66. Instruções Atómicas — test_and_set e compare_and_swap](sistemas_operacoes_estudo__2_.md#66-instruções-atómicas--test_and_set-e-compare_and_swap)
**Fonte:** Teste Escolha Múltipla

Uma instrução que verifique e modifique uma posição de memória de forma atómica:

A) é fundamental para implementar sincronização entre processos
B) não é necessária para implementar sincronização entre processos
C) torna a implementação de sincronização entre processos mais fácil

**Resposta:** A

---

### Q87. Efeito do DMA (2) — leitura de periférico
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos / I/O / DMA
**Guia:** [§26. Dispositivos de I/O e DMA](sistemas_operacoes_estudo__2_.md#26-dispositivos-de-io-e-dma)
**Fonte:** Teste Escolha Múltipla

Com a técnica de DMA, numa operação de leitura de dados de um periférico, permite:

A) Ao controlador colocar directamente na memória do computador os dados lidos
B) Ao SO transferir os dados no Buffer do periférico para a memória após sinalização feita pelo controlador
C) Ao processo que efectuou o pedido aceder directamente à memória para transferir os dados que lhe são enviados pelo controlador

**Resposta:** A
**Nota:** O ponto-chave do DMA é que o controlador acede à memória sem intervenção do CPU. Apenas no fim sinaliza o CPU com uma única interrupção.

---

### Q88. Função signal()
**Parte:** Parte III — Processos
**Tópico:** Processos / Sinais
**Guia:** [§38. Terminação de Processos (exit, wait, zombie, orphan)](sistemas_operacoes_estudo__2_.md#38-terminação-de-processos-exit-wait-zombie-orphan)
**Fonte:** Teste Escolha Múltipla

A função do sistema `signal()` serve para:

A) Definir uma acção a tomar sobre um tipo concreto de sinal
B) Enviar um sinal a um processo
C) Activar um novo sinal num processo

**Resposta:** A
**Nota:** `signal(sig, handler)` regista o handler para o sinal indicado. Para *enviar* sinais usa-se `kill()`. (No exame original a marca está em B, mas isso descreve `kill()`, não `signal()`.)

---

### Q89. execlp + printf — qual o output
**Parte:** Parte III — Processos
**Tópico:** Processos / exec
**Guia:** [§37. fork() e exec() em UNIX/Linux](sistemas_operacoes_estudo__2_.md#37-fork-e-exec-em-unixlinux)
**Fonte:** Teste Escolha Múltipla

Qual o resultado da execução do trecho de programa abaixo:

```c
execlp("ls", "ls", "-la", NULL);
printf("Terrível");
```

A) O conteúdo do directório corrente e a string "Terrível"
B) O conteúdo do directório corrente
C) Este trecho de programa está errado

**Resposta:** B
**Nota:** Quando `exec*` é bem-sucedido, substitui completamente o programa actual — o `printf` que vem depois nunca é executado. Só veria "Terrível" se o `execlp` falhasse.

---

### Q90. O que é um PCB
**Parte:** Parte III — Processos
**Tópico:** Processos / PCB
**Guia:** [§30. Process Control Block (PCB)](sistemas_operacoes_estudo__2_.md#30-process-control-block-pcb)
**Fonte:** Teste Escolha Múltipla

O que é um PCB?

A) É a estrutura de dados da identificação e estado de um processo
B) É um modelo de hardware usado na interrupção de processos
C) É um modelo de SO responsável pela troca de contexto de processos

**Resposta:** A

---

---


# Exame 7 — Quiz Online (Moodle/Sistema da cadeira)

> Perguntas extraídas de capturas de ecrã do quiz online (correção do sistema). Cobertas P1-P22; excluídas P10, P11, P13, P16, P17, P19 (memória virtual/segmentação/MMU/64 bits).

### Q91. Objectivo do multitasking
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos / Multitasking
**Guia:** [§23. Multiprogramação e Multitasking](sistemas_operacoes_estudo__2_.md#23-multiprogramação-e-multitasking)
**Fonte:** Quiz Online — Pergunta 1

Um sistema operativo "multitasking" tem como objectivo melhorar:

A) o tempo de resposta dos processos.
B) o tempo de execução dos processos.
C) o "footprint" de memória dos processos.

**Resposta:** A
**Nota:** Multitasking = alternância via quantum entre processos para reduzir tempo de resposta. Multiprogramming = ter vários no sistema para maximizar utilização do CPU. Não confundir.

---

### Q92. Round-Robin com quantum 5 (P1=15, P2=4, P3=12, P4=7)
**Parte:** Parte IV — Escalonamento
**Tópico:** Escalonamento / Round Robin
**Guia:** [§47. Round Robin (RR)](sistemas_operacoes_estudo__2_.md#47-round-robin-rr)
**Fonte:** Quiz Online — Pergunta 2

O tempo médio de espera com o algoritmo "Round-Robin" e quantum Q=5 para a configuração seguinte (todos os processos disponíveis em t=0):

| Process | Exec-Time |
|---------|-----------|
| P1      | 15        |
| P2      | 4         |
| P3      | 12        |
| P4      | 7         |

A) 15.2
B) 19.0
C) 12.7

**Resposta:** B
**Nota:** Cálculo: completion P1=36, P2=9, P3=38, P4=31. Waiting = (21+5+26+24)/4 = 76/4 = 19.0.

---

### Q93. BIOS — função
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos / Boot
**Guia:** [§24. Arranque do Computador (Boot)](sistemas_operacoes_estudo__2_.md#24-arranque-do-computador-boot)
**Fonte:** Quiz Online — Pergunta 3

O "Basic Input/Output System" (BIOS) de um computador é:

A) a componente do sistema operativo que lida apenas com dispositivos de I/O mais básicos.
B) o programa que inicia o carregamento do "kernel" do sistema operativo de uma partição em disco para a memória.
C) a componente do sistema operativo que lida com todos os dispositivos de I/O.

**Resposta:** B
**Nota:** Variação da Q12 / Q49 — agora a opção correcta enfatiza o carregamento do kernel a partir de disco.

---

### Q94. Porque é que zombies são problemáticos
**Parte:** Parte III — Processos
**Tópico:** Processos / Zombies
**Guia:** [§38. Terminação de Processos (exit, wait, zombie, orphan)](sistemas_operacoes_estudo__2_.md#38-terminação-de-processos-exit-wait-zombie-orphan)
**Fonte:** Quiz Online — Pergunta 4

Um processo torna-se "zombie" se terminar sem que o respectivo processo pai detecte esse evento. Estes processos são problemáticos porque:

A) o sistema operativo não consegue libertar recursos que lhes foram originalmente atribuídos.
B) apesar de terem terminado, podem ocasionalmente voltar a executar o seu código e dar origem a um comportamento errático no sistema.
C) os seus espaços de endereçamento crescem exponencialmente e impedem outros processos de usarem a memória.

**Resposta:** A
**Nota:** Zombie ainda ocupa uma entrada na tabela de processos (PID + exit status) à espera que o pai faça `wait()`. Se o pai nunca o fizer, esses recursos nunca são libertados.

---

### Q95. PCB — definição
**Parte:** Parte III — Processos
**Tópico:** Processos / PCB
**Guia:** [§30. Process Control Block (PCB)](sistemas_operacoes_estudo__2_.md#30-process-control-block-pcb)
**Fonte:** Quiz Online — Pergunta 5

O "Process Control Block" é:

A) uma estrutura de dados onde é mantida informação sobre o estado de execução de um processo.
B) um controlador de hardware que gere a fila de processos que esperam pelo acesso ao CPU.
C) o bloco de código do sistema operativo responsável pelo controlo da execução dos processos.

**Resposta:** A

---

### Q96. System call — como é desencadeada
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos / System calls
**Guia:** [§25. Interrupções](sistemas_operacoes_estudo__2_.md#25-interrupções), [§28. Chamadas ao Sistema (System Calls)](sistemas_operacoes_estudo__2_.md#28-chamadas-ao-sistema-system-calls)
**Fonte:** Quiz Online — Pergunta 6

Uma "system call" é uma chamada a uma função da API do kernel do sistema operativo e é desencadeada por uma "trap" emitida:

A) por uma função da "Standard C Library" chamada no programa do utilizador.
B) ao nível do hardware, por um circuito específico no CPU.
C) por uma função do programa implementada pelo utilizador.

**Resposta:** A
**Nota:** Tipicamente o utilizador chama uma função wrapper na libc (e.g. `read()`) que executa uma instrução de trap (e.g. `syscall`/`int 0x80`) — esta passa o controlo ao kernel em modo privilegiado.

---

### Q97. SRTF (P1,0,8) (P2,1,4) (P3,3,9) (P4,6,5)
**Parte:** Parte IV — Escalonamento
**Tópico:** Escalonamento / SRTF
**Guia:** [§49. Shortest-Remaining-Time-First (SRTF)](sistemas_operacoes_estudo__2_.md#49-shortest-remaining-time-first-srtf)
**Fonte:** Quiz Online — Pergunta 7

O tempo médio de espera com o algoritmo "Shortest Remaining Time First" para a configuração seguinte:

| Process | Arrival-Time | Exec-Time |
|---------|--------------|-----------|
| P1      | 0            | 8         |
| P2      | 1            | 4         |
| P3      | 3            | 9         |
| P4      | 6            | 5         |

A) 3.25
B) 5.75
C) 8.25

**Resposta:** B
**Nota:** Sequência: P1(0→1), P2(1→5), P1(5→6), P4(6→11), P1(11→17), P3(17→26). Waiting: P1=9, P2=0, P3=14, P4=0 → (9+0+14+0)/4 = 5.75.

---

### Q98. Inovações para escalonamento preemptivo
**Parte:** Parte IV — Escalonamento
**Tópico:** Escalonamento / Preemption
**Guia:** [§44. Decisões de Escalonamento — Preemptivo vs Não-Preemptivo](sistemas_operacoes_estudo__2_.md#44-decisões-de-escalonamento--preemptivo-vs-não-preemptivo), [§25. Interrupções](sistemas_operacoes_estudo__2_.md#25-interrupções)
**Fonte:** Quiz Online — Pergunta 8

A implementação de algoritmos de escalonamento "preemptive" obrigou a inovações específicas no hardware e software, por exemplo:

A) discos mais rápidos para aumentar a largura de banda para a memória física.
B) utilização de espaços de endereçamento e endereços virtuais.
C) inibição de interrupções durante a execução de porções críticas de código.

**Resposta:** C

---

### Q99. API — definição
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos / System calls
**Guia:** [§28. Chamadas ao Sistema (System Calls)](sistemas_operacoes_estudo__2_.md#28-chamadas-ao-sistema-system-calls)
**Fonte:** Quiz Online — Pergunta 9

Uma "Application's Programmer Interface" é:

A) uma interface gráfica oferecida por alguns sistemas operativos que proporciona aos programadores um ambiente mais amigável de desenvolvimento.
B) um conjunto de exemplos de aplicações fornecidas com o sistema operativo e que facilitam a escrita de novas aplicações pelos programadores.
C) uma especificação de um conjunto de funções disponíveis para o programador, incluindo os nomes, tipos dos parâmetros e tipos dos valores de retorno.

**Resposta:** C

---

### Q100. EDF e RMS — tipo de tarefas
**Parte:** Parte IV — Escalonamento
**Tópico:** Escalonamento / Real-time
**Guia:** [§50. Priority Scheduling](sistemas_operacoes_estudo__2_.md#50-priority-scheduling)
**Fonte:** Quiz Online — Pergunta 12

Os algoritmos "Earliest Deadline First" e/ou "Rate Monotonic Scheduling" são utilizados em sistemas operativos que executam tarefas:

A) interactivas.
B) intensivas.
C) de tempo-real.

**Resposta:** C

---

### Q101. Técnica de "aging"
**Parte:** Parte IV — Escalonamento
**Tópico:** Escalonamento / Priority / Aging
**Guia:** [§50. Priority Scheduling](sistemas_operacoes_estudo__2_.md#50-priority-scheduling)
**Fonte:** Quiz Online — Pergunta 14

Vários tipos de "scheduler" utilizados nos sistemas operativos implementam uma técnica designada por "aging" que consiste em:

A) diminuir a prioridade dos processos que estão em execução há menos tempo.
B) aumentar a prioridade dos processos que estão em execução há mais tempo.
C) aumentar a prioridade dos processos que não são executados há muito tempo.

**Resposta:** C
**Nota:** Aging mitiga starvation em priority scheduling: quanto mais tempo um processo espera sem ser escolhido, mais a sua prioridade sobe.

---

### Q102. O que é um daemon
**Parte:** Parte III — Processos
**Tópico:** Processos / Daemons
**Guia:** [§38. Terminação de Processos (exit, wait, zombie, orphan)](sistemas_operacoes_estudo__2_.md#38-terminação-de-processos-exit-wait-zombie-orphan)
**Fonte:** Quiz Online — Pergunta 15

Num sistema "multitasking" como o UNIX, um "daemon" é:

A) um processo que terminou mas que ainda consome recursos do sistema operativo.
B) um processo interactivo que requer atenção redobrada por parte do utilizador.
C) um processo que executa continuamente sem interacção com os utilizadores, normalmente associado a um serviço do sistema operativo.

**Resposta:** C
**Nota:** Não confundir daemon (longa duração, sem terminal, em background) com zombie (processo terminado).

---

### Q103. Função do scheduler
**Parte:** Parte IV — Escalonamento
**Tópico:** Escalonamento / Scheduler
**Guia:** [§42. Motivação para o Escalonamento](sistemas_operacoes_estudo__2_.md#42-motivação-para-o-escalonamento)
**Fonte:** Quiz Online — Pergunta 18

O "scheduler" do sistema operativo é executado em cada "context switch", contribuindo de forma significativa para o tempo que demora a realizar esta operação. O "scheduler" é responsável por:

A) copiar os estados dos processos que entram e saem do CPU.
B) copiar para memória e disco os segmentos utilizados pelos processos que entram e saem do CPU, respectivamente.
C) escolher o processo seguinte a ser executado pelo CPU.

**Resposta:** C
**Nota:** O scheduler decide *qual* processo corre a seguir; o dispatcher faz a transferência efectiva (guardar/restaurar PCBs, mudar de modo).

---

### Q104. Função exec()
**Parte:** Parte III — Processos
**Tópico:** Processos / exec
**Guia:** [§37. fork() e exec() em UNIX/Linux](sistemas_operacoes_estudo__2_.md#37-fork-e-exec-em-unixlinux)
**Fonte:** Quiz Online — Pergunta 20

Quando invocada, a função "exec" (ou as variantes "execlp" e "execvp"):

A) cria um novo processo para executar o programa que recebe como argumento.
B) suspende temporariamente a execução do processo actual para executar o programa que recebe como argumento.
C) carrega o programa cujo nome recebe como argumento para o espaço de endereçamento do processo corrente, substituindo o programa atual.

**Resposta:** C
**Nota:** O `exec` substitui o address-space mas mantém o PCB (mesmo PID). NÃO cria processo novo — para isso usa-se `fork()`.

---

### Q105. Pipes — direcionalidade e ordem
**Parte:** Parte III — Processos
**Tópico:** Processos / IPC / Pipes
**Guia:** [§41. Pipes](sistemas_operacoes_estudo__2_.md#41-pipes)
**Fonte:** Quiz Online — Pergunta 21

As "pipes" são um exemplo de mecanismo de comunicação entre processos suportados pelo "kernel" do UNIX. A troca de informação é:

A) unidirecional, FIFO.
B) unidirecional, LIFO.
C) bidirecional, FIFO.

**Resposta:** A
**Nota:** Pipes são unidirecionais e funcionam como FIFO (First In, First Out): os bytes saem na mesma ordem em que entraram. Para bidirecional precisa-se de duas pipes.

---

### Q106. SO — definição
**Parte:** Parte II — Conceitos Básicos de SO
**Tópico:** Conceitos básicos
**Guia:** [§17. O que é um Sistema Operativo?](sistemas_operacoes_estudo__2_.md#17-o-que-é-um-sistema-operativo)
**Fonte:** Quiz Online — Pergunta 22

Um sistema operativo é um programa que:

A) permite o arranque do computador ("bootstrap") e depois transfere o controlo para o utilizador.
B) verifica periodicamente o estado do hardware e gera avisos para a substituição de componentes.
C) executa permanentemente num computador e gere os recursos de hardware para os utilizadores.

**Resposta:** C

---


---

# 📊 Resumo e Estudo por Partes

**Total de perguntas:** 106

## Distribuição por exame

| Exame | Intervalo | Total |
|-------|-----------|-------|
| Exame Época Normal (1ª Parte) | Q1–Q10 | 10 |
| Exame Época Normal 03/07/2020 | Q11–Q28 | 18 |
| Teste 15/04/2010 | Q29–Q45 | 17 |
| Teste 1 | Q46–Q68 | 23 |
| Teste 2 (Teoria) | Q69–Q71 | 3 |
| Teste de Escolha Múltipla | Q72–Q90 | 19 |
| Quiz Online (Moodle) | Q91–Q106 | 16 |

## Distribuição por parte do guia

> Usa esta tabela para estudar uma parte de cada vez.

| Parte | Tópico | Nº | Perguntas |
|-------|--------|----|-----------|
| **I** | Linguagem C | 2 | Q24, Q67 |
| **II** | Conceitos Básicos de SO | 28 | Q4, Q11, Q12, Q13, Q14, Q15, Q29, Q30, Q36, Q40, Q46, Q47, Q48, Q49, Q55, Q60, Q61, Q72, Q76, Q77, Q81, Q82, Q87, Q91, Q93, Q96, Q99, Q106 |
| **III** | Processos | 48 | Q1, Q3, Q6, Q7, Q8, Q9, Q10, Q16, Q17, Q18, Q25, Q26, Q27, Q28, Q31, Q33, Q35, Q37, Q38, Q41, Q42, Q43, Q44, Q45, Q50, Q51, Q52, Q53, Q54, Q56, Q57, Q59, Q68, Q74, Q75, Q78, Q79, Q83, Q84, Q85, Q88, Q89, Q90, Q94, Q95, Q102, Q104, Q105 |
| **IV** | Escalonamento | 20 | Q19, Q20, Q21, Q22, Q23, Q34, Q58, Q62, Q63, Q64, Q65, Q66, Q69, Q71, Q92, Q97, Q98, Q100, Q101, Q103 |
| **V** | Sincronização de Processos | 6 | Q2, Q5, Q32, Q39, Q70, Q86 |
| **VI** | Deadlocks | 2 | Q73, Q80 |

## Distribuição por secção do guia

> Para cada secção: as perguntas que a tocam directamente. Útil para revisão pontual.

| Parte | Secção | Tópico | Nº | Perguntas |
|-------|--------|--------|----|-----------|
| I | §13 | [Bibliotecas em C](sistemas_operacoes_estudo__2_.md#13-bibliotecas-em-c) | 4 | Q15, Q24, Q61, Q67 |
| II | §17 | [O que é um Sistema Operativo?](sistemas_operacoes_estudo__2_.md#17-o-que-é-um-sistema-operativo) | 4 | Q11, Q46, Q47, Q106 |
| II | §23 | [Multiprogramação e Multitasking](sistemas_operacoes_estudo__2_.md#23-multiprogramação-e-multitasking) | 7 | Q4, Q14, Q29, Q48, Q72, Q82, Q91 |
| II | §24 | [Arranque do Computador (Boot)](sistemas_operacoes_estudo__2_.md#24-arranque-do-computador-boot) | 3 | Q12, Q49, Q93 |
| II | §25 | [Interrupções](sistemas_operacoes_estudo__2_.md#25-interrupções) | 5 | Q19, Q30, Q62, Q96, Q98 |
| II | §26 | [Dispositivos de I/O e DMA](sistemas_operacoes_estudo__2_.md#26-dispositivos-de-io-e-dma) | 3 | Q40, Q77, Q87 |
| II | §27 | [Proteção do CPU e Operação Dual-Mode](sistemas_operacoes_estudo__2_.md#27-proteção-do-cpu-e-operação-dual-mode) | 5 | Q29, Q36, Q76, Q81, Q82 |
| II | §28 | [Chamadas ao Sistema (System Calls)](sistemas_operacoes_estudo__2_.md#28-chamadas-ao-sistema-system-calls) | 8 | Q13, Q15, Q30, Q55, Q60, Q61, Q96, Q99 |
| III | §29 | [Conceito de Processo](sistemas_operacoes_estudo__2_.md#29-conceito-de-processo) | 1 | Q68 |
| III | §30 | [Process Control Block (PCB)](sistemas_operacoes_estudo__2_.md#30-process-control-block-pcb) | 5 | Q1, Q17, Q51, Q90, Q95 |
| III | §34 | [Context Switch](sistemas_operacoes_estudo__2_.md#34-context-switch) | 3 | Q18, Q52, Q59 |
| III | §35 | [Criação de Processos](sistemas_operacoes_estudo__2_.md#35-criação-de-processos) | 2 | Q16, Q50 |
| III | §37 | [fork() e exec() em UNIX/Linux](sistemas_operacoes_estudo__2_.md#37-fork-e-exec-em-unixlinux) | 18 | Q7, Q9, Q10, Q25, Q26, Q27, Q31, Q35, Q38, Q44, Q53, Q57, Q68, Q75, Q84, Q85, Q89, Q104 |
| III | §38 | [Terminação de Processos (exit, wait, zombie, orphan)](sistemas_operacoes_estudo__2_.md#38-terminação-de-processos-exit-wait-zombie-orphan) | 10 | Q3, Q28, Q33, Q37, Q54, Q78, Q83, Q88, Q94, Q102 |
| III | §40 | [Modelos de IPC: Message Passing vs Shared Memory](sistemas_operacoes_estudo__2_.md#40-modelos-de-ipc-message-passing-vs-shared-memory) | 1 | Q6 |
| III | §41 | [Pipes](sistemas_operacoes_estudo__2_.md#41-pipes) | 11 | Q7, Q8, Q27, Q41, Q42, Q43, Q45, Q56, Q74, Q79, Q105 |
| IV | §42 | [Motivação para o Escalonamento](sistemas_operacoes_estudo__2_.md#42-motivação-para-o-escalonamento) | 1 | Q103 |
| IV | §43 | [Ciclo CPU-I/O Burst](sistemas_operacoes_estudo__2_.md#43-ciclo-cpu-io-burst) | 1 | Q58 |
| IV | §44 | [Decisões de Escalonamento — Preemptivo vs Não-Preemptivo](sistemas_operacoes_estudo__2_.md#44-decisões-de-escalonamento--preemptivo-vs-não-preemptivo) | 4 | Q19, Q34, Q62, Q98 |
| IV | §45 | [Critérios de Escalonamento](sistemas_operacoes_estudo__2_.md#45-critérios-de-escalonamento) | 1 | Q71 |
| IV | §47 | [Round Robin (RR)](sistemas_operacoes_estudo__2_.md#47-round-robin-rr) | 4 | Q20, Q63, Q69, Q92 |
| IV | §48 | [Shortest-Job-First (SJF) e Previsão do Próximo Burst](sistemas_operacoes_estudo__2_.md#48-shortest-job-first-sjf-e-previsão-do-próximo-burst) | 1 | Q69 |
| IV | §49 | [Shortest-Remaining-Time-First (SRTF)](sistemas_operacoes_estudo__2_.md#49-shortest-remaining-time-first-srtf) | 3 | Q21, Q64, Q97 |
| IV | §50 | [Priority Scheduling](sistemas_operacoes_estudo__2_.md#50-priority-scheduling) | 5 | Q23, Q34, Q66, Q100, Q101 |
| IV | §53 | [Completely Fair Scheduler (CFS) — Linux](sistemas_operacoes_estudo__2_.md#53-completely-fair-scheduler-cfs--linux) | 2 | Q22, Q65 |
| V | §55 | [Critical Sections e Race Conditions](sistemas_operacoes_estudo__2_.md#55-critical-sections-e-race-conditions) | 2 | Q5, Q32 |
| V | §56 | [Operações Atómicas](sistemas_operacoes_estudo__2_.md#56-operações-atómicas) | 2 | Q39, Q86 |
| V | §61 | [O Problema da Critical Section — formalização](sistemas_operacoes_estudo__2_.md#61-o-problema-da-critical-section--formalização) | 1 | Q5 |
| V | §62 | [Os 3 Requisitos de uma Solução](sistemas_operacoes_estudo__2_.md#62-os-3-requisitos-de-uma-solução) | 1 | Q5 |
| V | §63 | [Tentativas falhadas (variável lock e turn)](sistemas_operacoes_estudo__2_.md#63-tentativas-falhadas-variável-lock-e-turn) | 1 | Q32 |
| V | §64 | [Solução de Peterson](sistemas_operacoes_estudo__2_.md#64-solução-de-peterson) | 1 | Q32 |
| V | §66 | [Instruções Atómicas — test_and_set e compare_and_swap](sistemas_operacoes_estudo__2_.md#66-instruções-atómicas--test_and_set-e-compare_and_swap) | 2 | Q39, Q86 |
| V | §70 | [Busy Waiting e Spinlocks](sistemas_operacoes_estudo__2_.md#70-busy-waiting-e-spinlocks) | 1 | Q2 |
| V | §71 | [Como Minimizar o Busy Waiting](sistemas_operacoes_estudo__2_.md#71-como-minimizar-o-busy-waiting) | 1 | Q2 |
| V | §74 | [Semáforos](sistemas_operacoes_estudo__2_.md#74-semáforos) | 1 | Q2 |
| V | §79 | [Problemas Clássicos — Readers and Writers](sistemas_operacoes_estudo__2_.md#79-problemas-clássicos--readers-and-writers) | 1 | Q70 |
| VI | §81 | [Caracterização de Deadlock — 4 Condições Necessárias](sistemas_operacoes_estudo__2_.md#81-caracterização-de-deadlock--4-condições-necessárias) | 2 | Q73, Q80 |

## Como pedir ao Claude Code para fazer um quiz

Cada pergunta inclui agora:

- `**Parte:**` — qual parte do guia (I a VI)
- `**Tópico:**` — categoria curta
- `**Guia:**` — links para as secções específicas do guia onde a matéria é explicada
- `**Fonte:**` — qual exame

**Sugestões de prompts:**

- _"Lê `perguntas_quiz.md` e faz-me um quiz só com perguntas da Parte III (Processos). Uma pergunta de cada vez, esconde a resposta até eu responder."_
- _"Faz-me um quiz só de perguntas marcadas com a secção §37 (fork e exec)."_
- _"Quiz com 20 perguntas aleatórias de Parte II, IV e V. No fim mostra-me as que errei e os links do guia para rever."_
- _"Modo exame: 30 perguntas aleatórias, sem feedback até ao fim."_
