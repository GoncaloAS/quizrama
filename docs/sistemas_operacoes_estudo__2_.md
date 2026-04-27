<!-- BEGIN ENHANCED TITLE BLOCK -->
<div align="center">

<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td align="center" style="padding:30px 20px;background:linear-gradient(135deg,#1F3864 0%,#2E75B6 100%);border-radius:12px;">

<sub style="color:#BDD7EE;letter-spacing:3px;">SISTEMAS DE OPERAÇÕES &nbsp;•&nbsp; FCUP &nbsp;•&nbsp; 2025 / 2026</sub>

# 📘&nbsp;&nbsp;Guia de Estudo Completo

<sub><i>C Language &nbsp;•&nbsp; Conceitos Básicos &nbsp;•&nbsp; Processos &nbsp;•&nbsp; Escalonamento &nbsp;•&nbsp; Sincronização &nbsp;•&nbsp; Deadlocks</i></sub>

</td>
</tr>
</table>

<br>

<table border="0">
<tr>
<td align="center" width="33%"><b>📚 Cobertura Completa</b><br><sub>Todos os capítulos do programa</sub></td>
<td align="center" width="33%"><b>📊 Diagramas & Tabelas</b><br><sub>Process states, RAG, Gantt charts</sub></td>
<td align="center" width="33%"><b>⚡ Pronto para Exame</b><br><sub>Resumos rápidos por capítulo</sub></td>
</tr>
</table>

<sub>Baseado nos slides de <b>Miguel Areias</b> &nbsp;•&nbsp; <i>Operating System Concepts, 10th Ed.</i> — Silberschatz, Galvin & Gagne</sub>

</div>

<!-- END ENHANCED TITLE BLOCK -->

# Sistemas de Operações 2025/2026 — Guia de Estudo

> Documento baseado nos slides de **C Language - Basics**, **C Language - Libraries**, **Basic Concepts**, **Processes** (Cap. 3), **Process Scheduling** (Cap. 5) e **Process Synchronization** (Caps. 6 e 8) — FCUP, Miguel Areias.
> Este guia cobre toda a matéria que sai no teste.

---

## Índice

### Parte I — Linguagem C
1. [Compilação em C](#1-compilação-em-c)
2. [Tipos de Dados](#2-tipos-de-dados)
3. [Operadores](#3-operadores)
4. [Estruturas de Decisão e Ciclos](#4-estruturas-de-decisão-e-ciclos)
5. [Apontadores (Pointers)](#5-apontadores-pointers)
6. [Arrays](#6-arrays)
7. [Strings](#7-strings)
8. [Funções — Call by Value vs Call by Reference](#8-funções--call-by-value-vs-call-by-reference)
9. [Alocação Dinâmica de Memória](#9-alocação-dinâmica-de-memória)
10. [Estruturas (struct) e Typedefs](#10-estruturas-struct-e-typedefs)
11. [Argumentos da Linha de Comandos](#11-argumentos-da-linha-de-comandos)
12. [O Pré-processador C](#12-o-pré-processador-c)
13. [Bibliotecas em C](#13-bibliotecas-em-c)
14. [Compilação e Linkagem](#14-compilação-e-linkagem)
15. [Linkagem Estática vs Dinâmica](#15-linkagem-estática-vs-dinâmica)
16. [Como é uma Biblioteca por dentro](#16-como-é-uma-biblioteca-por-dentro)

### Parte II — Conceitos Básicos de Sistemas de Operação
17. [O que é um Sistema Operativo?](#17-o-que-é-um-sistema-operativo)
18. [O que devem fazer os Sistemas Operativos?](#18-o-que-devem-fazer-os-sistemas-operativos)
19. [Estrutura de um Sistema Computacional](#19-estrutura-de-um-sistema-computacional)
20. [Princípios de um SO](#20-princípios-de-um-so)
21. [Componentes Principais de um SO](#21-componentes-principais-de-um-so)
22. [Serviços Comuns de um SO](#22-serviços-comuns-de-um-so)
23. [Multiprogramação e Multitasking](#23-multiprogramação-e-multitasking)
24. [Arranque do Computador (Boot)](#24-arranque-do-computador-boot)
25. [Interrupções](#25-interrupções)
26. [Dispositivos de I/O e DMA](#26-dispositivos-de-io-e-dma)
27. [Proteção do CPU e Operação Dual-Mode](#27-proteção-do-cpu-e-operação-dual-mode)
28. [Chamadas ao Sistema (System Calls)](#28-chamadas-ao-sistema-system-calls)

### Parte III — Processos (Cap. 3)
29. [Conceito de Processo](#29-conceito-de-processo)
30. [Process Control Block (PCB)](#30-process-control-block-pcb)
31. [Programa vs Processo](#31-programa-vs-processo)
32. [Estados de um Processo](#32-estados-de-um-processo)
33. [Transições entre Estados](#33-transições-entre-estados)
34. [Context Switch](#34-context-switch)
35. [Criação de Processos](#35-criação-de-processos)
36. [Custo de Criar um Processo](#36-custo-de-criar-um-processo)
37. [`fork()` e `exec()` em UNIX/Linux](#37-fork-e-exec-em-unixlinux)
38. [Terminação de Processos (`exit`, `wait`, zombie, orphan)](#38-terminação-de-processos-exit-wait-zombie-orphan)
39. [Comunicação entre Processos (IPC)](#39-comunicação-entre-processos-ipc)
40. [Modelos de IPC: Message Passing vs Shared Memory](#40-modelos-de-ipc-message-passing-vs-shared-memory)
41. [Pipes](#41-pipes)

### Parte IV — Escalonamento de Processos (Cap. 5)
42. [Motivação para o Escalonamento](#42-motivação-para-o-escalonamento)
43. [Ciclo CPU-I/O Burst](#43-ciclo-cpu-io-burst)
44. [Decisões de Escalonamento — Preemptivo vs Não-Preemptivo](#44-decisões-de-escalonamento--preemptivo-vs-não-preemptivo)
45. [Critérios de Escalonamento](#45-critérios-de-escalonamento)
46. [First-Come First-Served (FCFS)](#46-first-come-first-served-fcfs)
47. [Round Robin (RR)](#47-round-robin-rr)
48. [Shortest-Job-First (SJF) e Previsão do Próximo Burst](#48-shortest-job-first-sjf-e-previsão-do-próximo-burst)
49. [Shortest-Remaining-Time-First (SRTF)](#49-shortest-remaining-time-first-srtf)
50. [Priority Scheduling](#50-priority-scheduling)
51. [Multilevel Queue (MLQ)](#51-multilevel-queue-mlq)
52. [Multilevel Feedback Queue (MLFQ)](#52-multilevel-feedback-queue-mlfq)
53. [Completely Fair Scheduler (CFS) — Linux](#53-completely-fair-scheduler-cfs--linux)

### Parte V — Sincronização de Processos (Cap. 6)
54. [Background — Porque é que precisamos de sincronização?](#54-background--porque-é-que-precisamos-de-sincronização)
55. [Critical Sections e Race Conditions](#55-critical-sections-e-race-conditions)
56. [Operações Atómicas](#56-operações-atómicas)
57. [O Problema "Too Much Milk"](#57-o-problema-too-much-milk)
58. [Solução #1 — Nota simples](#58-solução-1--nota-simples)
59. [Solução #2 — Notas etiquetadas](#59-solução-2--notas-etiquetadas)
60. [Solução #3 — Notas etiquetadas + busy waiting](#60-solução-3--notas-etiquetadas--busy-waiting)
61. [O Problema da Critical Section — formalização](#61-o-problema-da-critical-section--formalização)
62. [Os 3 Requisitos de uma Solução](#62-os-3-requisitos-de-uma-solução)
63. [Tentativas falhadas (variável `lock` e `turn`)](#63-tentativas-falhadas-variável-lock-e-turn)
64. [Solução de Peterson](#64-solução-de-peterson)
65. [Hardware de Sincronização — Disable Interrupts](#65-hardware-de-sincronização--disable-interrupts)
66. [Instruções Atómicas — `test_and_set` e `compare_and_swap`](#66-instruções-atómicas--test_and_set-e-compare_and_swap)
67. [Mutual Exclusion com `test_and_set` e `compare_and_swap`](#67-mutual-exclusion-com-test_and_set-e-compare_and_swap)
68. [Bounded Waiting com `test_and_set`](#68-bounded-waiting-com-test_and_set)
69. [Mutex Locks](#69-mutex-locks)
70. [Busy Waiting e Spinlocks](#70-busy-waiting-e-spinlocks)
71. [Como Minimizar o Busy Waiting](#71-como-minimizar-o-busy-waiting)
72. [Implementação de Mutex em Uniprocessador](#72-implementação-de-mutex-em-uniprocessador)
73. [Implementação de Mutex em Multiprocessador](#73-implementação-de-mutex-em-multiprocessador)
74. [Semáforos](#74-semáforos)
75. [Operações `wait()` e `signal()`](#75-operações-wait-e-signal)
76. [Implementação de Semáforos](#76-implementação-de-semáforos)
77. [Starvation e Deadlock](#77-starvation-e-deadlock)
78. [Problemas Clássicos — Bounded Buffer](#78-problemas-clássicos--bounded-buffer)
79. [Problemas Clássicos — Readers and Writers](#79-problemas-clássicos--readers-and-writers)
80. [Problemas Clássicos — Dining Philosophers](#80-problemas-clássicos--dining-philosophers)

### Parte VI — Deadlocks (Cap. 8)
81. [Caracterização de Deadlock — 4 Condições Necessárias](#81-caracterização-de-deadlock--4-condições-necessárias)
82. [Resource Allocation Graph](#82-resource-allocation-graph)
83. [Resumo — Cycles vs Deadlocks no Grafo](#83-resumo--cycles-vs-deadlocks-no-grafo)
84. [Métodos para lidar com Deadlocks](#84-métodos-para-lidar-com-deadlocks)
85. [Deadlock Prevention](#85-deadlock-prevention)
86. [Deadlock Avoidance e Safe State](#86-deadlock-avoidance-e-safe-state)
87. [Deadlock Detection](#87-deadlock-detection)
88. [Recovery from Deadlock](#88-recovery-from-deadlock)

---


<br>

<div align="center">

<table border="0" width="100%">
<tr>
<td align="center" style="padding:18px;background:linear-gradient(135deg,#5b8af022 0%,#5b8af011 100%);border-left:6px solid #5b8af0;border-radius:8px;">

<sub style="color:#5b8af0;letter-spacing:4px;font-weight:700;">▌ Parte I ▐</sub>

### LINGUAGEM C

<sub><i>Compilação, tipos, ponteiros, malloc, structs, libs</i></sub>

</td>
</tr>
</table>

</div>

<br>

## 1. Compilação em C

Um programa C básico ("Hello World"):

```c
#include <stdio.h>
int main() {
    printf("Hello World!\n");
    return 0;
}
```

### Fases da compilação

A compilação de um programa C tem **4 fases sequenciais**:

```
.c  →  Pré-processador  →  .i  →  Compilador  →  .o  →  Linker  →  executável  →  Loader  →  RAM
```

1. **Pré-processador**: resolve `#include`, `#define`, comentários e directivas. Output: ficheiro `.i`.
2. **Compilador**: traduz C → assembly → código-objecto (`.o`).
3. **Linker**: junta vários `.o` + bibliotecas, resolve referências externas → executável.
4. **Loader**: carrega o executável para RAM e dá-lhe controlo (em runtime, não compile-time).

> Mnemónica: **P**ré → **C**ompilar → **L**inkar → **L**oad.

### Flags principais do compilador `gcc`

| Flag | Significado |
|------|-------------|
| `-o nome` | Define o nome do ficheiro executável. Ex.: `gcc -o hello hello.c` |
| `-Wall`   | Mostra todos os *warnings* (avisos) |
| `-g`      | Ativa informação de *debugging* (para usar com `gdb`) |
| `-O`      | Ativa otimização (não recomendado em fase de desenvolvimento) |
| `-c`      | Compila **apenas**, parando antes da linkagem (gera `.o`) |
| `-l<nome>` | Linka com a biblioteca `lib<nome>` (ex.: `-lm` para `libm`) |

**Exemplos:**
```bash
$ gcc -o hello hello.c    # Cria executável "hello"
$ gcc -Wall hello.c       # Compila mostrando todos os warnings
$ gcc -g hello.c          # Compila com info de debug
```

---

## 2. Tipos de Dados

### Exemplos de declarações

```c
char a = 'A';
char b = 65;
char c = 0x41;          // 'A' em hexadecimal — todos equivalentes!

int i = -2343234;
unsigned int ui = 4294967295;
unsigned int uj = ((long) 1 << 32) - 1;   // 4294967295
unsigned int uk = -1;                     // também dá 4294967295 (overflow)

float pi = 3.14;
double long_pi = 0.31415e+1;              // = 3.1415
```

### Tipos Inteiros

| Tipo            | Tamanho     | Gama de valores |
|-----------------|-------------|-----------------|
| `char`          | 1 byte      | -128 a 127 ou 0 a 255 |
| `unsigned char` | 1 byte      | 0 a 255 |
| `signed char`   | 1 byte      | -128 a 127 |
| `int`           | 2 ou 4 bytes| -32.768 a 32.767 ou ±2.147.483.648 |
| `unsigned int`  | 2 ou 4 bytes| 0 a 65.535 ou 0 a 4.294.967.295 |
| `short`         | 2 bytes     | -32.768 a 32.767 |
| `unsigned short`| 2 bytes     | 0 a 65.535 |
| `long`          | 4 bytes     | ±2.147.483.647 |
| `unsigned long` | 4 bytes     | 0 a 4.294.967.295 |

> **Importante:** Em C **não existe tipo booleano explícito**:
> - `0` ou `NULL` → **FALSE**
> - Qualquer outro valor → **TRUE**

### Tipos de Vírgula Flutuante

| Tipo         | Tamanho | Gama                  | Precisão |
|--------------|---------|-----------------------|----------|
| `float`      | 4 bytes | 1.2E-38 a 3.4E+38     | 6 casas decimais |
| `double`     | 8 bytes | 2.3E-308 a 1.7E+308   | 15 casas decimais |
| `long double`| 10 bytes| 3.4E-4932 a 1.1E+4932 | 19 casas decimais |

### Operador `sizeof()`

Devolve o tamanho em bytes de um tipo ou variável:

```c
int x;
printf("storage size for type int: %d bytes\n", sizeof(int));
printf("storage size for variable x: %d bytes\n", sizeof(x));
```

### Tipo `void`

O tipo `void` indica que **não há valor disponível** ou que o tipo é indefinido. Três usos:

1. **Funções que não devolvem valor:** `void exit(int)`
2. **Funções que não recebem argumentos:** `int rand(void)`
3. **Apontador para tipo indefinido:** `void *malloc(size_t)`

---

## 3. Operadores

### Operadores Aritméticos

| Operador | Descrição |
|----------|-----------|
| `+`  | Adição |
| `-`  | Subtração |
| `*`  | Multiplicação |
| `/`  | Divisão |
| `%`  | Resto da divisão inteira (módulo) |
| `++` | Incremento (soma 1) |
| `--` | Decremento (subtrai 1) |

### Operadores Relacionais

| Operador | Descrição |
|----------|-----------|
| `==` | Igual |
| `!=` | Diferente |
| `>`  | Maior |
| `<`  | Menor |
| `>=` | Maior ou igual |
| `<=` | Menor ou igual |

### Operadores Lógicos

| Operador | Descrição |
|----------|-----------|
| `&&` | AND lógico — true se ambos os operandos forem não-zero |
| `\|\|` | OR lógico — true se pelo menos um operando for não-zero |
| `!`  | NOT lógico — inverte o estado lógico |

### Operadores Bitwise (a nível de bits)

| Operador | Descrição |
|----------|-----------|
| `&`  | AND binário — copia o bit se existir em ambos operandos |
| `\|` | OR binário — copia o bit se existir em pelo menos um |
| `^`  | XOR binário — copia o bit se existir em apenas um |
| `~`  | Complemento (unário) — inverte ("flips") os bits |
| `<<` | Shift à esquerda — desloca bits à esquerda N posições |
| `>>` | Shift à direita — desloca bits à direita N posições |

---

## 4. Estruturas de Decisão e Ciclos

### Statement `if` / `else`

```c
if (cond) {
    // executa se cond for true
} else {
    // executa se cond for false
}
```

### Statement `switch`

```c
switch (val) {
    case const1:
        // executa se val == const1
        break;
    case const2:
        // executa se val == const2
        break;
    default:
        // executa se nenhum case anterior corresponder
}
```

> **Fall-through:** se omitires `break` no fim de um `case`, a execução **"cai"** para o caso seguinte (continua até encontrar `break` ou o fim do `switch`). NÃO há `break` implícito em C — fall-through é comportamento legal mas frequentemente é fonte de bugs.

### Ciclo `for`

```c
for (pre_cond; cond; post_loop) {
    // pre_cond executa uma vez antes
    // continua enquanto cond for true
    // post_loop executa no fim de cada iteração
}
```

### Ciclo `while`

```c
while (cond) {
    // executa enquanto cond for true
}
```

### Ciclo `do/while`

```c
do {
    // executa pelo menos uma vez, e continua enquanto cond for true
} while (cond);
```

> **Diferença importante:** No `while`, a condição é testada **antes**; no `do/while`, é testada **depois** — pelo que o corpo executa pelo menos uma vez.

---

## 5. Apontadores (Pointers)

Um **apontador** é uma variável cujo valor é **um endereço de memória**.

### Declaração

```c
type* varname;
```

Exemplos:
```c
char*  p1;   // apontador para um char
int*   p2;   // apontador para um int
float* p3;   // apontador para um float
```

### Operações principais

- `&` → obtém o endereço de memória de uma variável
- `*` → acede ao conteúdo do endereço guardado num apontador (dereference)

### Exemplo I — uso básico

```c
int main() {
    int v = 0;
    int *ip;          // ip contém um endereço indefinido inicialmente

    ip = &v;          // ip passa a ter o endereço de v

    printf("value stored in ip: %p\n", ip);   // imprime endereço

    *ip = 10;         // muda o valor de v através de ip

    printf("value of v: %d\n", *ip);          // imprime 10
    return 0;
}
```

### Exemplo II — visualização passo a passo

```c
int i, j, *ip, *ip2;

// step 1
i = 5;
ip = &i;          // ip aponta para i

// step 2
*ip = 7;          // i passa a valer 7 (via ip)
j = 3;
ip = &j;          // ip agora aponta para j

// step 3
ip2 = ip;         // ip2 também aponta para j

// step 4
ip = &i;          // ip volta a apontar para i; ip2 continua a apontar para j
```

**Estado final:** `i = 7`, `j = 3`, `ip → i`, `ip2 → j`

---

## 6. Arrays

Um **array** é uma coleção sequencial de **elementos do mesmo tipo**, em **posições contíguas de memória** e com **tamanho fixo**.

- O índice mais baixo é `0` (primeiro elemento).
- O índice mais alto é `size - 1` (último elemento).

### Declaração

```c
type arrayName[size];
```

Exemplos:
```c
char cs[10];   // array de 10 chars
int  is[5];    // array de 5 ints
```

### Inicialização

```c
int is[5] = {1000, 2, 3, 7, 50};
int is[]  = {1000, 2, 3, 7, 50};   // tamanho inferido = 5
```

**Regras:**
- O número de valores entre `{}` **não pode exceder** o tamanho declarado em `[]`.
- Se o tamanho for omitido, o array tem o tamanho exato da inicialização.

### Exemplo

```c
int main() {
    int i;
    int n[10];

    for (i = 0; i < 10; i++)
        n[i] = i + 100;

    for (i = 0; i < 10; i++)
        printf("element[%d] = %d\n", i, n[i]);

    return 0;
}
```

---

## 7. Strings

Uma **string** em C é um **array de caracteres terminado pelo caractere nulo** `'\0'`.

> Para guardar o `'\0'`, o array tem de ter **espaço para um caractere extra**.

```c
char greeting[6] = {'H','e','l','l','o','\0'};   // explícito
char greeting[]  = "Hello";                       // equivalente — '\0' adicionado automaticamente
char *greeting   = "Hello";                       // apontador para string literal
```

### Funções básicas de strings (`<string.h>`)

| Função | Descrição |
|--------|-----------|
| `strcpy(s1, s2)` | Copia a string `s2` para `s1` |
| `strcat(s1, s2)` | Concatena `s2` no fim de `s1` |
| `strlen(s1)`     | Devolve o comprimento de `s1` (sem contar `'\0'`) |
| `strcmp(s1, s2)` | Devolve `0` se iguais; `<0` se `s1<s2`; `>0` se `s1>s2` |
| `strchr(s1, ch)` | Devolve apontador para a 1ª ocorrência de `ch` em `s1` |
| `strstr(s1, s2)` | Devolve apontador para a 1ª ocorrência de `s2` dentro de `s1` |

### Exemplo

```c
int main() {
    char str1[100] = "Hello";
    char str2[100] = "World";

    strcat(str1, str2);    // str1 passa a ser "HelloWorld"
    strcpy(str2, str1);    // str2 passa a ser "HelloWorld"

    printf("str1 length: %d\n", strlen(str1));   // imprime 10
    return 0;
}
```

---

## 8. Funções — Call by Value vs Call by Reference

Existem duas formas de passar argumentos a funções em C:

### Call by Value (padrão em C)
- **Copia o valor** do argumento para o parâmetro formal.
- Mudanças dentro da função **NÃO afetam** o argumento original.

```c
void swap_call_by_value(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int i = 1, j = 2;
    swap_call_by_value(i, j);
    printf("i: %d j: %d\n", i, j);   // imprime "i:1 j:2" — não troca!
    return 0;
}
```

### Call by Reference (usando apontadores)
- **Copia o endereço** do argumento.
- Dentro da função, o endereço é usado para **aceder ao argumento original**.
- Mudanças **AFETAM** o argumento.

```c
void swap_call_by_reference(int *p, int *q) {
    int temp = *p;
    *p = *q;
    *q = temp;
}

int main() {
    int i = 1, j = 2;
    swap_call_by_reference(&i, &j);
    printf("i: %d j: %d\n", i, j);   // imprime "i:2 j:1" — TROCA!
    return 0;
}
```

> **Resumo:** Por defeito, C usa *call by value*. Para simular *call by reference*, passamos **apontadores** como argumentos.

---

## 9. Alocação Dinâmica de Memória

### Exemplo ERRADO ❌

```c
int* get_int() {
    int i = 2;
    return &i;        // ERRADO! i é local — desaparece quando a função termina
}
```

A variável `i` está na **stack** e é destruída quando a função retorna. O apontador devolvido fica **inválido** (dangling pointer).

### Exemplo CORRETO ✅

```c
#include <stdio.h>
#include <stdlib.h>

int* get_int() {
    int* p = (int*) malloc(sizeof(int));   // aloca no heap
    *p = 2;
    return p;                              // p continua válido após o return
}
```

A memória alocada com `malloc` está no **heap** e persiste até ser libertada explicitamente com `free`.

### Funções de alocação dinâmica (`<stdlib.h>`)

| Função | Descrição |
|--------|-----------|
| `void *malloc(int num)` | Aloca `num` bytes (não inicializados) |
| `void *calloc(int num, int size)` | Aloca array de `num` elementos de `size` bytes (inicializa a 0) |
| `void *realloc(void *address, int newsize)` | Redimensiona um bloco de memória já alocado |
| `void free(void *address)` | Liberta um bloco de memória |

### Exemplo completo

```c
int main() {
    char *name = (char *) malloc(20 * sizeof(char));

    if (name == NULL) {
        // erro de alocação
    } else {
        strcpy(name, "Hello world!");
        printf("%s\n", name);
    }

    free(name);   // IMPORTANTE — libertar a memória
    return 0;
}
```

> **Boa prática:** Verificar sempre se `malloc` devolve `NULL` (falha de alocação) e fazer sempre `free` no fim.

---

## 10. Estruturas (struct) e Typedefs

### Estruturas (`struct`)

Permitem **combinar dados de tipos diferentes** num único tipo definido pelo utilizador.

```c
struct [name] {
    type1 item1;
    type2 item2;
    ...
    typeN itemN;
} [variables];
```

### Exemplo

```c
struct list_elem {
    int data;
    struct list_elem *next;
};

int main() {
    struct list_elem le = {10, NULL};
    struct list_elem* lep = &le;

    // Três formas equivalentes de aceder aos campos:
    printf("data %d next %p\n", le.data, le.next);          // notação ponto
    printf("data %d next %p\n", (*lep).data, (*lep).next);  // dereference + ponto
    printf("data %d next %p\n", lep->data, lep->next);      // operador seta

    return 0;
}
```

> **Resumo dos acessos:**
> - `var.campo` — quando `var` é a estrutura
> - `(*ptr).campo` — quando `ptr` é apontador (forma longa)
> - `ptr->campo` — equivalente, forma curta e mais usada

### Typedefs

A keyword `typedef` permite dar **um novo nome (alias) a um tipo**.

```c
typedef unsigned char byte;
byte b1, b2;                 // equivalente a "unsigned char b1, b2;"
```

Também serve para nomear estruturas (muito comum):

```c
typedef struct {              // anonymous struct
    int data;
    struct list_elem *next;
} list_elem;

// ...
list_elem le = {10, NULL};    // sem precisar de "struct"
```

---

## 11. Argumentos da Linha de Comandos

A função `main` pode receber dois parâmetros para aceder aos argumentos da linha de comandos:

```c
int main(int argc, char* argv[]) {
    if (argc == 2)
        printf("Hello %s!\n", argv[1]);
    else
        printf("Hello World!\n");
    return 0;
}
```

- `argc` (**arg**ument **c**ount) → número de argumentos (incluindo o nome do programa).
- `argv` (**arg**ument **v**ector) → array de strings com os argumentos.
  - `argv[0]` é o nome do programa.
  - `argv[1]`, `argv[2]`, … são os argumentos passados.

**Exemplo de execução:**
```bash
$ gcc -o prog prog.c
$ ./prog
Hello World!
$ ./prog SdO
Hello SdO!
```

---

## 12. O Pré-processador C

O **C Preprocessor** **não faz parte do compilador**. É um passo separado da compilação que funciona como uma **ferramenta de substituição de texto**.

### Diretivas principais

| Diretiva | Descrição |
|----------|-----------|
| `#define`  | Substitui um macro do pré-processador |
| `#include` | Insere um header de outro ficheiro |
| `#undef`   | Remove a definição de um macro |
| `#ifdef`   | Verdadeiro se o macro estiver definido |
| `#ifndef`  | Verdadeiro se o macro NÃO estiver definido |
| `#if`      | Testa uma condição em tempo de compilação |
| `#else`    | Alternativa do `#if` |
| `#elif`    | `#else` + `#if` numa só diretiva |
| `#endif`   | Termina um bloco condicional |
| `#error`   | Imprime mensagem de erro no `stderr` |

### Exemplos típicos

```c
#include <stdio.h>                                 /* header da lib I/O */

#define PI ((double) 3.141592653589793)            /* constante matemática */
#define MAX_VALUE 1000                             /* constante do programa */
#define MAX(x,y) (((x) < (y)) ? (y) : (x))         /* função inline (macro) */

#ifdef DEBUG                                       /* compilação condicional */
    printf("This is a debugging message\n");
#endif
```

> **Truque comum:** O macro `MAX` usa parênteses extra à volta de `x` e `y` para evitar problemas com operadores de menor precedência (ex.: `MAX(a+1, b)`).

---

## 13. Bibliotecas em C

A linguagem C disponibiliza aos programadores **código pré-fabricado** para tarefas comuns:

- Manipulação de caracteres e strings
- Operações matemáticas
- Geradores de números aleatórios
- I/O de ficheiros
- Controlo de processos
- Gestão de memória

> A maior parte desta funcionalidade está na **Standard C Library** (também chamada **clib**).

### A clib em Unix
- A `clib` é tão fundamental que está incluída no próprio sistema operativo (Unix/Linux/macOS, Windows).
- Uma **biblioteca** é tipicamente um ficheiro de arquivo composto por vários **ficheiros objecto (`.o`) pré-compilados**.
- O **linker** (parte da toolchain do compilador) identifica código em falta no programa e "linka" esse código ao binário, produzindo o executável final (`a.out`).

### Onde encontrar bibliotecas no sistema

| Sistema   | Extensão estática | Extensão dinâmica |
|-----------|-------------------|-------------------|
| Linux     | `libX.a`          | `libX.so`         |
| macOS     | `libX.a`          | `libX.dylib`      |
| Windows   | `libX.lib`        | `libX.dll`        |

---

## 14. Compilação e Linkagem

O processo de compilação tem **três fases internas**:

```
   .c   ─►  ┌──────────────┐  ─►  ┌────────────┐  ─►  ┌──────────────┐  ─►  a.out
            │  Análise do  │      │  Geração   │      │   Library    │
            │   programa   │      │  de código │      │   linking    │
            └──────────────┘      └────────────┘      └──────────────┘
                                                          ▲   ▲   ▲
                                                          │   │   │
                                                         .o  .o  .o
```

1. **Análise do programa** — verificação léxica, sintática e semântica do código fonte.
2. **Geração de código** — produz ficheiros objecto (`.o`).
3. **Library linking** — junta o código do programa com o código das bibliotecas.

### Exemplo concreto

Se o programa chama `sin`, `cos` e `printf`, o compilador gera um `.o` com chamadas a essas funções **ainda por resolver**:
```
main:
    ...
    jal sin       ← endereço por preencher
    jal cos       ← endereço por preencher
    jal printf    ← endereço por preencher
```

O linker traz `sin.o`, `cos.o`, `printf.o` da biblioteca, **junta tudo** e produz o `a.out` final, com todos os endereços resolvidos.

---

## 15. Linkagem Estática vs Dinâmica

### Linkagem Estática
- O código necessário da biblioteca é **copiado e "colado"** ao programa em tempo de compilação.
- O executável final **contém todo o código necessário** para correr.
- ✅ Não depende de bibliotecas externas em runtime.
- ❌ Executável **maior**, ocupa mais disco e memória.

### Linkagem Dinâmica
- O linker **insere apenas código para carregar e chamar** a biblioteca **em runtime**.
- O executável **só corre se a biblioteca estiver disponível** no sistema de ficheiros e puder ser carregada para memória.
- ✅ **Múltiplos programas partilham a mesma cópia** da biblioteca em memória (ex.: `.so` files = *shared objects*).
- ✅ Binários mais **pequenos**.
- ❌ Depende da presença das bibliotecas no sistema.

---

## 16. Como é uma Biblioteca por dentro

### O Header da biblioteca (Math)
- Tipicamente em `/usr/include/math.h`
- Contém vários `#define` para constantes matemáticas (`PI`, `E`, …).
- Contém a **API** da biblioteca: assinaturas (tipos) das funções (ex.: `cos`, `sin`, `exp`, `log`, …).
- Usado pelo compilador para **type-checking**.

### A Biblioteca em si (Math)
- Tipicamente em `/usr/lib/libm.a` ou `/usr/lib/libm.so*`.
- Contém **um ficheiro objecto binário por cada função** da API.
- Para listar o conteúdo de uma biblioteca:
  - Estática: `ar -t libm.a`
  - Dinâmica: `nm -D --defined-only libm.so`

### Linkagem inteligente
Quando se faz **linkagem estática**, o linker **só inclui os `.o` que o programa realmente usa** (ex.: apenas `sin.o` e `cos.o`, se forem as únicas funções da `libm` usadas). Daí o executável final ser **mais pequeno** do que se a biblioteca inteira fosse anexada.

---

# Parte II — Conceitos Básicos de Sistemas de Operação

---


<br>

<div align="center">

<table border="0" width="100%">
<tr>
<td align="center" style="padding:18px;background:linear-gradient(135deg,#22c55e22 0%,#22c55e11 100%);border-left:6px solid #22c55e;border-radius:8px;">

<sub style="color:#22c55e;letter-spacing:4px;font-weight:700;">▌ Parte II ▐</sub>

### CONCEITOS BÁSICOS

<sub><i>O que é um SO, boot, interrupts, DMA, dual-mode, system calls</i></sub>

</td>
</tr>
</table>

</div>

<br>

## 17. O que é um Sistema Operativo?

### Motivação
- O **hardware sozinho não é fácil de usar** — é preciso software.
- Diferentes programas precisam normalmente das **mesmas operações** sobre o hardware.
- Faz sentido juntar essas funções comuns numa **única peça de software** — o **Sistema Operativo (SO)**.

### Definições possíveis

Não há uma definição universalmente aceite, mas existem duas aproximações comuns:

1. **"Tudo o que o fabricante envia quando se encomenda um sistema operativo"** — definição abrangente (mas que varia muito).
2. **"O único programa que está sempre a correr no computador"** — definição restrita (o **kernel**). Tudo o resto é:
   - **System program** — vem com o SO.
   - **Application program** — programa de utilizador.

### Funções principais
Um sistema operativo:
- **Gere o hardware** do computador.
- Atua como **intermediário** entre o utilizador e o hardware.
- Fornece **uma base** para os programas de aplicação.

Os SO podem ser desenhados para ser **convenientes de usar**, **eficientes** no uso do hardware, ou uma **combinação** dos dois.

---

## 18. O que devem fazer os Sistemas Operativos?

O design do SO depende do tipo de máquina:

| Tipo de máquina | Foco do SO |
|-----------------|------------|
| **Mainframes / workstations / servers** (partilhados) | Maximizar utilização de recursos; manter todos os utilizadores satisfeitos; uso eficiente e justo de CPU, memória e I/O. |
| **PCs** (single-user) | Facilidade de uso; alguma atenção à performance; quase nenhuma à utilização de recursos. |
| **Mobile** (smartphones, tablets) | Usabilidade e **bateria**; atenção especial à utilização de recursos. |
| **Embedded** (carros, eletrodomésticos) | Pouca ou nenhuma interface; correr **sem intervenção** do utilizador. |

---

## 19. Estrutura de um Sistema Computacional

Um sistema computacional pode ser dividido em **quatro componentes principais**:

```
   ┌─────────────────────────────────────┐
   │          UTILIZADORES               │  pessoas, outros programas/computadores
   └─────────────────────────────────────┘
                    ▲
   ┌─────────────────────────────────────┐
   │  PROGRAMAS (sistema e aplicação)    │  word, browsers, BDs, jogos, compiladores...
   └─────────────────────────────────────┘
                    ▲
   ┌─────────────────────────────────────┐
   │       SISTEMA OPERATIVO             │  controla e coordena
   └─────────────────────────────────────┘
                    ▲
   ┌─────────────────────────────────────┐
   │           HARDWARE                  │  CPU, memória, I/O...
   └─────────────────────────────────────┘
```

1. **Hardware** — recursos básicos (CPU, memória, dispositivos I/O).
2. **Sistema Operativo** — controla e coordena o uso do hardware entre as várias aplicações e utilizadores.
3. **Programas** — definem **como** os recursos são usados para resolver as necessidades dos utilizadores.
4. **Utilizadores** — pessoas ou outros programas/computadores.

---

## 20. Princípios de um SO

Um SO tem **dois grandes princípios** que coexistem:

### O SO como Resource Allocator/Controller (gestor)
- **Gere todos os recursos**: CPU, memória, dispositivos I/O…
- **Decide entre pedidos conflituantes** para um uso eficiente e justo dos recursos.
- **Previne erros** e o uso indevido do computador.
- Especialmente importante em ambientes **multi-utilizador**.

### O SO como Facilitator (facilitador)
- **Fornece serviços** que toda a gente precisa.
- Torna a programação de aplicações **mais fácil, rápida e menos propensa a erros**.
- Preocupa-se com a **operação dos vários programas**.

### Combinação dos dois
A maior parte das funcionalidades **reflete os dois princípios**.
> **Exemplo:** O sistema de ficheiros é necessário para todos (facilitador), mas tem de ser usado eficientemente e com proteção (controlador).

---

## 21. Componentes Principais de um SO

Os SO modernos incluem normalmente **quatro grandes componentes**:

### 1. Process Management (gestão de processos)
- Criar, suspender, retomar e terminar processos (do utilizador ou do sistema).
- Mecanismos para **comunicação entre processos**.
- Mecanismos para **sincronização de processos**.
- Mecanismos para **lidar com deadlocks**.

### 2. Memory Management (gestão de memória)
- **Alocar e libertar** espaço de memória conforme necessário.
- **Saber que partes da memória** estão em uso e por quem.
- **Decidir** quais processos/dados mover para dentro e fora da memória, e quando.

### 3. Storage Management (gestão de armazenamento)
- Vista lógica e uniforme do armazenamento (abstrai propriedades físicas em **ficheiros e diretorias**).
- Primitivas para criar, eliminar e manipular ficheiros e diretorias.
- Políticas de **controlo de acesso** (quem pode aceder a quê).
- Mapeamento e backup em **armazenamento secundário não-volátil**.

### 4. I/O Management (gestão de I/O)
- Esconder as **particularidades dos dispositivos** do utilizador:
  - Interface genérica de *device-driver*.
  - *Drivers* específicos para cada hardware.
- Gerir a memória ligada a I/O:
  - **Buffering** — guardar temporariamente os dados durante a transferência.
  - **Caching** — guardar partes dos dados em memória mais rápida para melhorar performance.
  - **Spooling** — sobreposição entre o output de um job e o input de outros jobs.

---

## 22. Serviços Comuns de um SO

O SO fornece um **ambiente de execução** para os programas. Os serviços diferem entre SO, mas há classes comuns.

### Serviços para os utilizadores/programas
- **User interfaces** — GUI, command line, batch.
- **Program execution** — carregar um programa para memória e executá-lo.
- **I/O operations** — providenciar formas de fazer I/O.
- **File systems** — manipulação de ficheiros e diretorias.
- **Communications** — troca de informação entre processos no mesmo computador ou através da rede.
- **Error detection** — vigilância constante para erros no CPU, memória, I/O, programas — e tomar ações apropriadas.

### Serviços internos (eficiência do próprio sistema)
- **Resource allocation** — alocar eficientemente CPU, memória, ficheiros, I/O entre vários processos concorrentes.
- **Accounting** — saber que utilizadores usam que recursos e quanto.
- **Protection and security** — evitar interferências entre processos e proteger o sistema de ataques externos.

---

## 23. Multiprogramação e Multitasking

### Multiprogramming (multiprogramação)
**Objetivo:** **aumentar a utilização do CPU**.

A ideia é organizar os jobs para que **o CPU tenha sempre algum job para executar**:

1. O SO começa a executar um job (escolhido por um *job scheduler*).
2. Eventualmente, esse job tem de **esperar** (ex.: por uma operação de I/O).
3. **Sem multiprogramação:** o CPU ficaria *idle* (parado).
4. **Com multiprogramação:** o SO **muda para outro job**. Quando este precisa de esperar, muda outra vez. Quando o primeiro job acaba de esperar, recupera o CPU.

> **Enquanto houver pelo menos um job a executar, o CPU nunca está parado.**

### Multitasking / Time Sharing
**Extensão lógica da multiprogramação** que adiciona **interação com o utilizador**.

- O CPU **alterna entre jobs com tanta frequência** que os utilizadores conseguem **interagir com cada job enquanto ele corre**.
- Dá a impressão a cada utilizador que o computador é **inteiramente dedicado** a ele, mesmo sendo partilhado por muitos.
- Baseia-se no facto de que um único utilizador faria um uso ineficiente do computador, mas **um grupo grande, em conjunto, não**.

> **Tempo de resposta esperado:** < 1 segundo.

> **Diferença chave:**
> - **Multiprogramming** → maximizar **utilização do CPU**.
> - **Multitasking** → maximizar **tempo de resposta** ao utilizador.

---

## 24. Arranque do Computador (Boot)

Quando o computador é ligado ou reiniciado, dá-se o seguinte:

1. O **bootstrap program** (geralmente chamado **firmware**) é carregado:
   - Tipicamente em **memória só de leitura** (ROM ou EPROM).
   - **Inicializa todos os aspetos** do sistema.
   - **Carrega o kernel** do SO e inicia a sua execução.

2. Assim que o kernel está carregado, **começa a fornecer serviços**:
   - Alguns serviços vêm de **system processes** (carregados no boot).
   - Em UNIX, o primeiro system process é o **`init`**, que arranca muitos outros.

3. Quando esta fase está completa, o sistema está **totalmente arrancado** e fica **à espera de eventos**.

---

## 25. Interrupções

Os eventos são geralmente sinalizados por uma **interrupção** (do hardware ou do software).

### Origens
- **Hardware** — dispositivos enviam um sinal ao CPU para chamar a atenção do SO.
- **Software** — quando se executa uma operação especial chamada **system call**.

### O que acontece quando o CPU é interrompido
1. O CPU **suspende a atividade atual**.
2. **Guarda o seu estado**.
3. **Transfere a execução** para uma função fixa chamada **interrupt handler** (que trata do evento).
4. O **interrupt vector** contém os endereços de todas as **interrupt service routines**.
5. Quando o handler termina, o CPU **retoma a computação interrompida**.

> **Nota:** A arquitetura de interrupções tem de **guardar o endereço da instrução interrompida** para poder voltar ao mesmo sítio.

### Interrupt Timeline (esquema)

```
CPU:  ── user ── [ I/O int ]── user ── [ I/O int ]── user ──
                  proc                  proc

I/O:  ── idle ── transferring ── idle ── transferring ── idle
            ▲              ▲           ▲              ▲
        I/O request    transfer    I/O request    transfer
                        done                       done
```

Enquanto o I/O transfere dados, o CPU continua a executar processos do utilizador. Quando o I/O termina, gera uma interrupção que o CPU trata.

### Como o CPU identifica que interrupt ocorreu
- Cada dispositivo tem um **número único** (interrupt request line).
- O CPU usa esse número como **índice** para o **Interrupt Vector Table (IVT)**, que mapeia número → endereço da ISR (interrupt service routine).
- A IVT está numa zona fixa de memória, definida pela arquitectura do CPU.

### Interrupt Service Routine (ISR)
- **ISR = código que trata o interrupt** (também chamado *interrupt handler*).
- Cada tipo de interrupt tem a sua ISR registada na IVT.
- Tem de ser **curta e rápida** — enquanto a ISR corre, outras tarefas estão suspensas.

### Polling vs Interrupts
| | **Polling** | **Interrupts** |
|-|-------------|----------------|
| **Como funciona** | CPU verifica periodicamente o estado do dispositivo | Dispositivo avisa o CPU quando precisa |
| **Custo** | Desperdiça CPU verificando dispositivos inactivos | CPU só reage quando necessário |
| **Latência** | Depende da frequência do polling | Imediata |
| **Complexidade** | Simples | Mais complexa (handlers, IVT) |

> **Polling** é apropriado para dispositivos muito frequentes (ex.: drivers de alta performance). **Interrupts** são a abordagem padrão para a maioria dos dispositivos.

### Desactivar interrupts (Disable Interrupts)
Por vezes o SO precisa de **desactivar interrupts** durante operações críticas:
- Para garantir **execução atómica** de código sensível (ex.: actualização de estruturas de dados do kernel).
- Para impedir que **ISRs interfiram** com operações em curso, evitando corrupção de estado.
- Para proteger **secções críticas** muito curtas em uniprocessadores (ver §65).

> **Cuidado:** desactivar interrupts deve ser **breve** — o sistema fica "surdo" a eventos enquanto está desactivado. Não é exposto a programas de utilizador.

### Nested Interrupts
- Um **nested interrupt** é um interrupt que ocorre **enquanto outro handler de interrupt está a correr**.
- Por defeito, em sistemas modernos, ISRs são **interrompíveis** (a menos que estejam explicitamente a desactivar interrupts).
- Permite que interrupts de **maior prioridade** (ex.: timer crítico) preemptem ISRs de menor prioridade.
- Implica **stacking** dos contextos guardados — daí a necessidade de stack do kernel suficientemente grande.

### Faults e Exceptions
- **Fault (exception)** = interrupção de software disparada por **uma condição de erro detectada pelo CPU**:
  - Divisão por zero.
  - Acesso a página inválida (page fault).
  - Instrução ilegal.
  - Overflow aritmético.
- Diferente de **trap** (system call): trap é **deliberada**; fault é **não-intencional**.
- O SO pode tratar a fault (ex.: page fault → carregar página do disco) ou terminar o processo (ex.: divisão por zero → enviar SIGFPE).

### Por que I/O passa pelo SO
- Programas de utilizador **não acedem directamente** a dispositivos de I/O.
- Razões:
  - **Protecção**: impedir um programa de corromper hardware ou interferir com outros.
  - **Abstracção**: programa não precisa de conhecer detalhes específicos do hardware (drivers).
  - **Sincronização**: SO arbitra acesso quando vários processos querem o mesmo dispositivo.
  - **Buffering/caching**: SO optimiza acessos.
- Programas usam **system calls** (read, write, ioctl, …) que o SO traduz para operações de hardware.

---

## 26. Dispositivos de I/O e DMA

### Estrutura: Device Controllers e Device Drivers

Os sistemas modernos têm vários **device controllers** (componentes de **hardware**) ligados por um **bus** comum:
- USB controller, PCI controller, IDE controller, SCSI controller, …
- Cada controller é responsável por um tipo específico de dispositivo (ex.: um SCSI controller pode gerir 4 dispositivos SCSI).
- Mantém **buffers locais** e um conjunto de **registos especiais**.
- É responsável por **mover dados** entre os dispositivos que controla e os seus buffers.

Para comunicar com cada controller, o SO precisa de um **device driver** (componente de **software**):
- O driver **conhece** o controller específico.
- Fornece ao resto do SO uma **interface uniforme** para o dispositivo.

### Como funciona uma operação de I/O (típica)

1. O **device driver carrega registos** apropriados no controller.
2. O **controller examina** esses registos para saber o que fazer (ex.: ler caractere do teclado).
3. O controller **transfere os dados** entre o dispositivo e o seu buffer.
4. Quando termina, o controller **avisa o driver via interrupção**.
5. O driver **devolve o controlo ao SO**.

### Direct Memory Access (DMA)

O modelo de I/O guiado por interrupções (uma interrupção por byte) é bom para **pequenas quantidades de dados**, mas tem **muito overhead** para transferências em massa (ex.: I/O de disco).

**Solução:** **DMA** para dispositivos de alta velocidade, capazes de transmitir a velocidades próximas das da memória.

- **Exemplos de dispositivos com DMA:** controllers de discos, placas gráficas, placas de rede, placas de som...
- O **device controller transfere blocos de dados diretamente para a memória principal**, **sem intervenção do CPU/driver** durante a transferência.
- Apenas **uma única interrupção é gerada por bloco** (em vez de uma por byte).

### Esquema "Putting all together"

```
   ┌─────────┐ ◄── data movement ──► ┌────────┐
   │   CPU   │                        │ memory │
   ├─────────┤                        │        │
   │ device  │ ◄─ data ──┐            │        │
   │ driver  │           │            └────▲───┘
   └────┬────┘           │                 │
        │ I/O req       interrupt          │
        ▼                │                 │
   ┌─────────┐           │                 │
   │ device  │           │                 │
   │controller│──────────┘                 │
   │         │ ◄────────── DMA ────────────┘
   └─────────┘
```

---

## 27. Proteção do CPU e Operação Dual-Mode

### Proteção do CPU (Timer)

**Problema:** não podemos permitir que um programa de utilizador fique preso ou falhe e nunca devolva o controlo ao SO.

**Solução:** usar um **timer**.
- O SO define um contador.
- A cada *clock tick*, o contador é decrementado.
- Quando chega a 0, ocorre uma **interrupção**.
- A interrupção transfere automaticamente o controlo ao SO, que pode:
  - Tratar como erro fatal, **ou**
  - Dar mais tempo ao programa para continuar.

> Antes de devolver o controlo ao utilizador, o SO **garante que o timer está armado**.

### Dual-Mode Operation (operação em dois modos)

Um SO bem desenhado tem de garantir que **um programa incorreto ou malicioso** não causa execução errada de outros programas (ex.: divisão por zero, ciclo infinito, modificar memória de outros processos ou do próprio SO).

A maior parte dos sistemas usa **suporte por hardware** para distinguir pelo menos **dois modos de operação**:

| Modo | Também conhecido como | Privilégio |
|------|----------------------|------------|
| **User mode** | — | Limitado |
| **Kernel mode** | supervisor / system / privileged mode | Total |

### Mode bit
- Um **mode bit** (fornecido pelo hardware) indica o modo atual.
  - `mode bit = 1` → **user mode**
  - `mode bit = 0` → **kernel mode**
- Algumas instruções, chamadas **privileged instructions**, **só podem ser executadas em kernel mode**:
  - Controlo de I/O
  - Gestão do timer
  - Gestão de interrupções
- **Interrupções e system calls** mudam o modo para kernel.
- **Retornos** de interrupções e system calls voltam para user mode.

### Esquema de transição

```
USER MODE ─────────► [trap]────► KERNEL MODE
(mode bit=1)         calls       (mode bit=0)
                    syscall          │
                                     │ executa
                                     │ syscall
                                     ▼
                                  [return]
USER MODE ◄────── (mode bit=1) ◄──────┘
```

---

## 28. Chamadas ao Sistema (System Calls)

### O que são
**System calls = interface aos serviços do SO.**
- Tipicamente escritas em C ou C++.

### Como são chamadas — APIs

Os programas **raramente invocam system calls diretamente**. Em vez disso, usam uma **API** (Application Programming Interface) de alto nível. As mais comuns:

| API | Para |
|-----|------|
| **Win32 API** | Windows |
| **POSIX API** | UNIX, Linux, macOS (sistemas POSIX) |
| **Java API** | Java Virtual Machine (JVM) |

### Porque usar APIs em vez de system calls diretamente?
1. **Portabilidade** — o mesmo programa compila e corre em qualquer sistema que suporte a mesma API.
2. **Simplicidade** — system calls podem ser muito detalhadas e difíceis de usar; a API esconde essa complexidade.

> Muitas APIs POSIX/Windows são **muito parecidas** com as system calls nativas do SO.

### Implementação de uma System Call

1. A cada system call está associado um **número**.
2. A interface de system calls mantém uma **tabela indexada por esse número**.
3. Quando chamada, a interface invoca a system call correta no kernel e devolve **estado e valores de retorno**.

> O programador **não precisa de saber como** a system call está implementada. Só precisa de **respeitar a API** e perceber o que o SO vai fazer.

```
   user application
        │  ex.: open()
        ▼
┌────────────────────────────┐  user mode
│   system call interface    │
└────────────┬───────────────┘  kernel mode
             ▼
     tabela de syscalls
     [ 0 ][ 1 ]...[ i ]──► implementação de open()
                           ...
                           return
```

### Exemplo: Sequência de System Calls para copiar um ficheiro

```
1. Pedir nome do ficheiro de input (escrever prompt + ler input)
2. Pedir nome do ficheiro de output (escrever prompt + ler input)
3. Abrir o ficheiro de input  → se não existir, abortar
4. Criar o ficheiro de output → se já existir, abortar
5. Ciclo:
     - Ler do ficheiro de input
     - Escrever no ficheiro de output
   até a leitura falhar (EOF)
6. Fechar ficheiro de output
7. Escrever mensagem de conclusão
8. Terminar normalmente
```

### Categorias de System Calls

As system calls dividem-se em **6 categorias principais**:

| Categoria | Windows | UNIX |
|-----------|---------|------|
| **Process control** | `CreateProcess()`, `ExitProcess()`, `WaitForSingleObject()` | `fork()`, `exit()`, `wait()` |
| **File manipulation** | `CreateFile()`, `ReadFile()`, `WriteFile()`, `CloseHandle()` | `open()`, `read()`, `write()`, `close()` |
| **Device manipulation** | `SetConsoleMode()`, `ReadConsole()`, `WriteConsole()` | `ioctl()`, `read()`, `write()` |
| **Information maintenance** | `GetCurrentProcessID()`, `SetTimer()`, `Sleep()` | `getpid()`, `alarm()`, `sleep()` |
| **Communication** | `CreatePipe()`, `CreateFileMapping()`, `MapViewOfFile()` | `pipe()`, `shmget()`, `mmap()` |
| **Protection** | `SetFileSecurity()`, `InitializeSecurityDescriptor()`, `SetSecurityDescriptorGroup()` | `chmod()`, `umask()`, `chown()` |

---

# Parte III — Processos (Cap. 3)

---


<br>

<div align="center">

<table border="0" width="100%">
<tr>
<td align="center" style="padding:18px;background:linear-gradient(135deg,#f59e0b22 0%,#f59e0b11 100%);border-left:6px solid #f59e0b;border-radius:8px;">

<sub style="color:#f59e0b;letter-spacing:4px;font-weight:700;">▌ Parte III ▐</sub>

### PROCESSOS

<sub><i>PCB, estados, fork/exec, wait/exit, zombie, IPC, pipes</i></sub>

</td>
</tr>
</table>

</div>

<br>

## 29. Conceito de Processo

Um **processo** é a **unidade de trabalho** na maior parte dos sistemas e pode ser pensado como **um programa em execução**.

### Recursos necessários
Um processo precisa de **recursos** para realizar a sua tarefa:
- **CPU time** (tempo de processador)
- **Memória**
- **Ficheiros**
- **Dispositivos de I/O**
- ...

> Os recursos podem ser alocados ao processo **quando este é criado** ou **enquanto está a executar**.

### Partes de um processo

Um processo tem várias partes na memória:

```
   max ┌─────────────┐
       │    stack    │  ← parâmetros, endereços de retorno, vars locais
       │      ↓      │
       │             │
       │      ↑      │
       │    heap     │  ← memória alocada dinamicamente em runtime
       ├─────────────┤
       │    data     │  ← variáveis globais
       ├─────────────┤
       │    text     │  ← código do programa
   0   └─────────────┘
```

| Parte | O que contém |
|-------|--------------|
| **Text section**  | Código do programa |
| **Data section**  | Variáveis globais |
| **Heap**          | Memória alocada dinamicamente durante a execução |
| **Stack**         | Dados temporários (parâmetros, endereços de retorno, variáveis locais) |
| **Process Control Block (PCB)** | Inclui o **program counter** e os **CPU registers** |

> As partes **text + data + heap + stack** formam o **address-space** do processo.

### Address-space e isolamento
- **Cada processo tem o seu próprio address-space virtual** isolado dos outros — protege contra interferência e corrupção mútua.
- O segmento **text é read-only**, podendo ser **partilhado fisicamente** entre processos do mesmo programa (mais memória poupada).
- Os segmentos **data, heap e stack são privados** a cada processo (cada um tem cópia própria).
- Um acesso a memória inválida (fora do address-space ou a uma página não mapeada) → **segmentation fault** (SIGSEGV) e o processo é terminado.

### Process Accounting e Limites de Recursos
O SO regista no PCB **quanto recurso cada processo usa** (CPU time, memória, I/O...) — permite:
- **Billing/auditoria** em sistemas multi-utilizador.
- **Estatísticas** para o scheduler.
- **Limites por processo** (`ulimit` em UNIX): CPU time, número de ficheiros abertos, tamanho de stack, etc.
- Quando um processo **excede um limite**, o SO tipicamente **termina-o** (envia SIGXCPU, SIGXFSZ, etc.).

### Foreground vs Background
- **Foreground**: processo ligado ao terminal — recebe input e envia output directamente.
- **Background**: processo desligado do terminal — corre sem bloquear o shell.
- Em UNIX, o shell põe um processo em background com `&` no fim do comando: `./prog &`.
- Internamente, o shell faz `fork()` para criar o filho e **não chama `wait()`**, voltando logo a aceitar comandos.

### Daemons
Um **daemon** é um processo de longa duração que corre em **background** sem interface de terminal (ex.: `sshd`, `cron`, `nginx`). Tipicamente:
- Arrancam no boot (via `init`/`systemd`).
- Não têm terminal de controlo.
- Esperam por eventos (sockets, sinais, timers) e respondem.

### Process Groups e Sessions
- **Process group**: conjunto de processos relacionados, identificados por **PGID**. Tipicamente todos os processos lançados pelo mesmo comando do shell.
- **Session**: conjunto de process groups, identificados por **SID** — tipicamente uma sessão de login.
- Utilidade:
  - **Sinais ao grupo**: `kill -SIGTERM -<PGID>` envia sinal a todos os processos do grupo (ex.: `Ctrl+C` envia SIGINT ao grupo de foreground).
  - **Job control** no shell.

### Pseudo-Terminals (PTYs)
- Um **PTY** é um par de file descriptors que **emula um terminal** sem hardware real.
- Necessários para:
  - **Shells remotos** (`ssh`) — o servidor cria um PTY e liga-o ao shell.
  - **Terminal multiplexers** (`tmux`, `screen`).
  - **Emuladores de terminal** (xterm, iTerm) — comunicam com o shell via PTY.

### Processor Binding (CPU Affinity)
- **Restringir** um processo a correr apenas em **CPUs específicos** (em sistemas SMP).
- Linux: `taskset`, `sched_setaffinity()`.
- Vantagens: melhor uso de cache (não perde quando muda de CPU), latência previsível.
- Útil em sistemas real-time e em workloads críticos.

### Process Priority
- Cada processo tem uma **prioridade** que influencia o scheduling.
- Em UNIX, a prioridade é ajustada via **nice value** (-20 a +19). Mais baixo = mais prioridade.
- O scheduler usa prioridade para decidir qual processo correr a seguir (ver §50).

### Process Spawning e Lifetime
- **Spawning** = criar um novo processo (em UNIX, via `fork()` + `exec()`).
- **Process lifetime** vai de **NEW** (criação) até **TERMINATED** (saída).
- Um processo terminado **não pode ser reiniciado** — para "reiniciar", o pai tem de criar um novo filho (`fork()`).

---

## 30. Process Control Block (PCB)

O SO representa **cada processo por um Process Control Block** (também chamado **task control block**).

### Conteúdo do PCB

| Campo | Descrição |
|-------|-----------|
| **Process state**         | Estado atual (new, ready, running, …) |
| **Process identification (PID)** | Identificador único do processo |
| **Program counter (PC)**  | Endereço da próxima instrução a executar |
| **CPU registers**         | Registos genéricos, índices, stack pointers, etc. |
| **Scheduling information**| Prioridades, apontadores para queues de scheduling |
| **Memory information**    | Memória alocada ao processo |
| **Accounting information**| CPU usado, tempo de relógio desde o arranque, limites de tempo |
| **I/O information**       | Dispositivos alocados, lista de ficheiros abertos |

### Esquema de um PCB

```
   ┌──────────────────────┐
   │    process state     │
   ├──────────────────────┤
   │   process number     │
   ├──────────────────────┤
   │   program counter    │
   ├──────────────────────┤
   │      registers       │
   ├──────────────────────┤
   │    memory limits     │
   ├──────────────────────┤
   │ list of open files   │
   ├──────────────────────┤
   │         ...          │
   └──────────────────────┘
```

---

## 31. Programa vs Processo

| | **Programa** | **Processo** |
|-|--------------|--------------|
| **Natureza** | Entidade **passiva** | Entidade **ativa** |
| **Forma** | Ficheiro executável (lista de instruções) | Sequência de execução de um programa |
| **Onde está** | Em disco | Em memória, a executar |

### Pontos-chave

- Um **programa torna-se um processo** quando é **carregado para memória**.
- **Um programa pode dar origem a vários processos** (cada execução é um processo distinto).
- **Dois processos do mesmo programa** são considerados **duas sequências de execução separadas**.
  - Vários utilizadores podem correr cópias do mail program; o mesmo utilizador pode abrir várias instâncias do browser.
  - **As secções `text` são iguais**, mas as secções `data`, `heap` e `stack` **variam** entre processos.

---

## 32. Estados de um Processo

Conforme o processo executa, o seu estado **muda de acordo com a sua atividade atual**.

| Estado | Significado |
|--------|-------------|
| **New**         | O processo está a ser criado |
| **Running**     | As instruções estão a ser executadas |
| **Waiting / Blocked** | À espera de um evento (I/O, sinal, …) |
| **Ready**       | À espera de ser atribuído a um processador |
| **Terminated**  | Acabou de executar |

> Muitos processos podem estar **ready** ou **waiting** ao mesmo tempo, mas **só um processo por processador pode estar em running** num dado instante.

### Diagrama de estados

```
                       admitted              exit
       (new) ─────────────────► (ready) ───────────────► (terminated)
                                  ▲   │
                                  │   │ scheduler dispatch
                                  │   ▼
                  I/O ou event    (running)
                  completion         │
       (waiting) ◄──────────────────┘  I/O ou event wait
              │                       │
              └───────────────────────┘
                       interrupt (running → ready)
```

### Transições típicas
- **new → ready**: o processo foi admitido pelo SO.
- **ready → running**: o **scheduler** escolheu este processo (dispatch).
- **running → ready**: foi **preemptado** (ex.: timer interrupt).
- **running → waiting**: pediu I/O ou está à espera de um evento.
- **waiting → ready**: o evento ocorreu (ex.: I/O terminou).
- **running → terminated**: chamou `exit()` ou acabou o `main`.

---

## 33. Transições entre Estados

Os principais eventos que provocam transições entre estados são:

| Sigla | Evento | Transição que provoca |
|-------|--------|------------------------|
| **TI** | **Timer Interrupt** | running → ready (preempção) |
| **I/O**| **I/O system call** | running → waiting/blocked |
| **HI** | **Hardware Interrupt** (ex.: I/O completion) | waiting → ready |

### Exemplo (slide 7)

```
Process A:  ▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓░░░░░░░░░░░░  (Running ▓ / Ready ░)
Process B:  ░░░░░░░░░░░░▓▓▓▓████████████████░░░░░░░░░░░░░  (Blocked █)
Process C:  ░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓░░░░░░░░░░░░░░░░░▓▓
Dispatcher:       ▓▓▓     ▓▓▓     ▓▓▓     ▓▓▓
                   TI     I/O      TI      HI
```

- **TI** força a passagem do processo em execução para ready.
- **I/O** bloqueia o processo (vai para waiting).
- **HI** acorda o processo bloqueado (passa para ready).

---

## 34. Context Switch

**Context switch** = tarefa de **mudar o CPU para outro processo**.

### O que envolve

1. **Guardar o contexto** do processo atual no seu PCB.
2. **Carregar o contexto** do novo processo a partir do PCB dele.

### Pontos importantes

- O context switch é **puro overhead**: o sistema **não faz trabalho útil** enquanto o faz.
- **Tempo típico:** alguns **milissegundos** (na verdade, em sistemas modernos, normalmente abaixo de 10 µs).
- **Velocidade depende de:**
  - Velocidade da memória.
  - Número de registos a copiar.
  - Existência de instruções especiais (ex.: load/store de todos os registos numa instrução).
- **Quanto mais complexo o SO e o PCB, mais demorado** é o context switch.
- Algumas máquinas têm **vários conjuntos de registos** por CPU — o context switch torna-se apenas mudar o ponteiro para o novo conjunto.

### Triggers de Context Switch
Um context switch é **desencadeado por**:
- **Timer interrupt** (preempção): o quantum do processo expirou.
- **I/O syscall bloqueante**: processo pede I/O e bloqueia.
- **Hardware interrupt**: outro processo (mais prioritário) é acordado.
- **Voluntary yield**: processo desiste do CPU (`sched_yield()`).
- **System call em geral**: pode ou não desencadear switch dependendo do scheduler.

> Context switches **podem ocorrer durante execução do kernel** (kernel preemptivo) — são uma decisão do scheduler, não estão limitados a fronteiras de processo.

### Custo: User vs Kernel Mode Switch
- **Mode switch** (user ↔ kernel): apenas muda mode bit + alguns registos. Rápido (~ns).
- **Context switch completo** (entre processos): guarda PCB inteiro, troca address-space (TLB flush!), recarrega PCB do novo. Mais lento (~µs).
- **Demasiados context switches reduzem trabalho útil** — sintoma típico de quantum mau ou demasiados processos activos (thrashing).

### Context Switch e Scheduling
- O **scheduler decide** qual processo correr; o **dispatcher** faz o context switch propriamente dito.
- Toda decisão de scheduling que mude o processo activo dispara um context switch.

### Context Switch e System Calls
- Uma system call por si só é um **mode switch** (user → kernel) — não necessariamente um context switch.
- Mas se a syscall **bloquear** (ex.: `read()` num pipe vazio) ou **se o scheduler decidir preemptar**, ocorre context switch.

### Diagrama (slide 9)

```
   processo P0     SO              processo P1
   executing  ──┐
                ▼ interrupt or system call
            save state into PCB0
                  ...
            reload state from PCB1
                ┌───────────────► executing
   idle  ◄─────┘
                ▼ interrupt or system call
            save state into PCB1
                  ...
            reload state from PCB0
   executing ◄──┘
```

---

## 35. Criação de Processos

Durante a sua execução, um processo pode **criar vários processos novos**:

- O processo que cria é o **parent (pai)**.
- Os novos processos são os **children (filhos)**.
- Cada child pode também criar processos, formando uma **árvore de processos**.

### Process Identifier (PID)

A maioria dos SO identifica processos por um **PID** (process identifier), tipicamente um **inteiro**. O PID é único e usado como **índice** para aceder a atributos do processo dentro do kernel.

### Alternativas na criação

**Partilha de recursos:**
- Pai e filhos partilham **todos** os recursos.
- Filhos partilham um **subconjunto** dos recursos do pai.
- Pai e filho **não partilham nada**.

**Execução:**
- Pai e filhos executam **concorrentemente**.
- O **pai espera** até alguns/todos os filhos terminarem.

**Address space:**
- Pai e filho são **duplicados** (filho começa com programa e dados do pai).
- O filho carrega um **novo programa**.

---

## 36. Custo de Criar um Processo

Criar um processo envolve várias operações com diferentes custos:

| Operação | Custo |
|----------|-------|
| **Atribuir PID e armazenar novo PCB** | Barato |
| **Copiar I/O state do pai** (devices alocados, ficheiros abertos, …) | Médio |
| **Criar tabelas de memória para o address-space** | Mais caro |
| **Copiar dados do processo pai** | **Originalmente muito caro**; **muito mais barato com copy-on-write** |

> **Copy-on-write** é uma otimização: a memória do pai não é copiada imediatamente. Em vez disso, pai e filho partilham a mesma memória física, e só quando um deles **escreve** numa página é que essa página é duplicada.

---

## 37. `fork()` e `exec()` em UNIX/Linux

### `fork()`

Em UNIX/Linux, **um novo processo é criado pela system call `fork()`**:

- O novo processo (filho) é uma **cópia do address-space do processo original** (pai).
- O **valor de retorno do `fork()`**:
  - **`0`** no **filho**.
  - **PID do filho** (não-zero) no **pai**.
- **Ambos os processos continuam a executar concorrentemente** a partir da instrução **a seguir ao `fork()`**.
- Este mecanismo permite ao pai **comunicar facilmente** com os seus filhos.

### Padrão típico

```c
... // código do pai antes do fork

if ((pid = fork()) < 0) {
    ... // fork falhou
} else if (pid == 0) {
    ... // código do filho após o fork
} else {
    ... // código do pai após o fork
}

... // código comum após o fork
```

### `exec()`

**Tipicamente, depois de um `fork()`, um dos dois processos (pai ou filho) chama `exec()`**:

```c
execl("/bin/ls", "ls", NULL);
```

O que `exec()` faz:
- **Substitui o address-space** do processo (text, data, heap e stack) por **um programa novo lido do disco**.
- **Começa a executar** o novo programa a partir do `main`.
- **Destrói a imagem anterior** do processo.
- **Não cria um processo novo** — o processo que chama **mantém o seu PCB** (PID, ficheiros abertos, etc.).
- Permite que **pai e filho sigam caminhos separados**.

### Exemplo: forking de um comando `ls`

```c
int main()
{
    pid_t pid;

    /* fork a child process */
    pid = fork();

    if (pid < 0) {                       /* erro */
        fprintf(stderr, "Fork Failed");
        return 1;
    }
    else if (pid == 0) {                 /* filho */
        execlp("/bin/ls", "ls", NULL);
    }
    else {                               /* pai */
        wait(NULL);                      /* espera pelo filho */
        printf("Child Complete");
    }
    return 0;
}
```

### Esquema fork → exec → exit → wait

```
                  parent (pid > 0)
                  ┌──────────► wait() ──────► parent resumes
parent ──► pid = fork()
                  └──► exec() ──► exit()
                  child (pid = 0)
```

### Falhas de `fork()`
`fork()` pode falhar e devolver **-1** quando o sistema esgota recursos:
- **Excedeu número máximo de processos** no sistema (limite global do kernel).
- **Excedeu número máximo de processos** do utilizador (`RLIMIT_NPROC`).
- **Memória virtual insuficiente** para alocar PCB / page tables.

Ou seja, `fork()` **não é infalível** — código robusto verifica o retorno antes de assumir sucesso.

### Pipes antes de `fork()`
Quando se quer criar uma **pipeline** (pai ↔ filho via pipe), o pipe deve ser **criado ANTES de `fork()`**:

```c
int fd[2];
pipe(fd);              // cria pipe (fd[0] read, fd[1] write)
pid_t pid = fork();    // fork DEPOIS — filho herda fd[0] e fd[1]
```

**Razão:** `fork()` duplica os file descriptors abertos do pai para o filho. Se o pipe fosse criado **depois** do fork, cada um teria o seu pipe separado e não conseguiriam comunicar.

### Copy-on-Write (COW) e `fork()`
Como `exec()` substitui imediatamente o address-space, copiar tudo no `fork()` seria desperdício. **Copy-on-write** optimiza:
- Pai e filho **partilham fisicamente** as mesmas páginas em **modo read-only**.
- Quando um deles **escreve** numa página, o SO duplica essa página específica.
- Se o filho fizer logo `exec()`, **nenhuma página é realmente copiada** — `fork()+exec()` torna-se quase grátis.

---

## 38. Terminação de Processos (`exit`, `wait`, zombie, orphan)

### Terminação normal

Um processo termina ao:
- **Chamar `exit()` explicitamente**, ou
- **Executar a última instrução** (nesse caso, `exit()` é chamada implicitamente pelo `return` do `main`).

Ao terminar:
- **Todos os recursos** (memória física e virtual, ficheiros abertos, buffers de I/O, …) são **libertados pelo SO**.
- Um **exit status** (tipicamente um inteiro) fica disponível para o pai obter via `wait()`.

### Terminação forçada pelo pai

Um processo também pode ser terminado **pelo pai** quando:
- O **filho excedeu os recursos alocados**.
- A **tarefa atribuída ao filho já não é necessária**.
- O **pai está a sair** e o SO **não permite filhos sem pai vivo** (**cascading termination**).

### `exit()` e `wait()` em UNIX/Linux

```c
exit(status);                  // termina o processo com um exit status
pid = wait(&status);           // pai espera por um filho; devolve PID do filho terminado
```

`wait()` permite ao pai saber **qual** dos seus filhos terminou (devolve o PID).

### Zombie process

Se um processo **terminou e ainda nenhum pai chamou `wait()`** por ele, fica como **zombie**:
- Já não executa, mas o seu **PID e a sua entrada na process table continuam a existir**.
- Só quando o pai faz `wait()` é que esses recursos são libertados.

### Orphan process

Se um **pai termina antes dos filhos**, esses filhos passam a ser **órfãos**:
- Em UNIX/Linux, o **processo `init`** torna-se o novo pai dos órfãos.
- O `init` **chama `wait()` periodicamente**, libertando o PID e a entrada na process table dos órfãos quando estes terminarem.

---

## 39. Comunicação entre Processos (IPC)

Processos num sistema podem ser **independentes** ou **cooperantes**:

| Tipo | Definição |
|------|-----------|
| **Independent process** | Não pode afetar nem ser afetado pela execução de outros |
| **Cooperating process** | Pode afetar ou ser afetado pela execução de outros |

### Razões para haver processos cooperantes

- **Information sharing** — acesso concorrente à mesma informação.
- **Modularity** — partir o trabalho em subtarefas que façam mais sentido isoladamente.
- **Speedup** — executar subtarefas concorrentes em paralelo.

Para trocarem dados, processos cooperantes precisam de mecanismos de **IPC (Interprocess Communication)**. Há **dois modelos fundamentais**:
1. **Message passing**
2. **Shared memory**

---

## 40. Modelos de IPC: Message Passing vs Shared Memory

### Message Passing
- Comunicação via **envio e receção de mensagens**.
- **Funciona em rede** (entre máquinas diferentes).
- Implementado tipicamente com **system calls** → **requer intervenção do kernel**, o que é demorado.

### Shared Memory
- Comunicação por **leitura/escrita numa região de memória partilhada**.
- Pode levar a **problemas complexos de sincronização**.
- **System calls só são necessárias para criar a região partilhada**; depois disso, todos os acessos são tratados como acessos normais a memória — **sem intervenção do kernel**.
- **Tipicamente mais rápida** que message passing.

### Esquema dos dois modelos

```
   Message Passing                        Shared Memory
   ┌──────────────┐                       ┌──────────────┐
   │  process A   │ ◄────┐                │  process A   │ ──┐
   ├──────────────┤      │                ├──────────────┤   │
   │  process B   │ ──┐  │                │ shared mem   │ ◄─┤
   ├──────────────┤   │  │                ├──────────────┤   │
   │              │   │  │                │  process B   │ ──┘
   │  msg queue   │ ◄─┘  │                ├──────────────┤
   │ m0 m1 ... mn │ ─────┘                │              │
   │   kernel     │                       │   kernel     │
   └──────────────┘                       └──────────────┘
```

---

## 41. Pipes

**Pipes** foram um dos primeiros mecanismos de IPC em UNIX e oferecem uma das formas mais simples de comunicar entre processos.

### Características

- Comunicação no estilo **producer–consumer**:
  - **Producer** escreve no **write-end** do pipe.
  - **Consumer** lê no **read-end** do pipe.
- **Pipes são unidirecionais** — comunicação **só num sentido**.
  - Para comunicação bidirecional, **são necessários 2 pipes** (um em cada sentido).

### Pipes na linha de comandos

O carácter `|` constrói pipes:

```bash
ls | sort
cat fich.txt | grep xpto
```

### Pipes em UNIX/Linux

```c
int pipe(int fd[2]);
```

A system call `pipe()` cria um pipe novo e inicializa o array `fd[2]` com **dois file descriptors**:
- `fd[0]` → **read-end** do pipe.
- `fd[1]` → **write-end** do pipe.

> O UNIX/Linux trata pipes como um **tipo especial de ficheiro**, o que permite usá-los com as system calls **`read()` e `write()`** normais.

### Forking de um pipe

Um pipe **não pode ser acedido fora do processo que o criou**.

- Tipicamente, o **pai cria o pipe e usa-o para comunicar com um filho criado por `fork()`**.
- Como pipes são "ficheiros", **o filho herda o pipe** do pai.

```
   parent                          child
   fd[0]  fd[1]                    fd[0]  fd[1]
       \    \                       /     /
        \    \                     /     /
         ─────►─── pipe (kernel) ◄──────
```

### Pipe do pai para o filho

Para um pipe do pai → filho:
- O **pai fecha o `fd[0]`** (read-end) — só vai escrever.
- O **filho fecha o `fd[1]`** (write-end) — só vai ler.
- Ler de um pipe **vazio mas aberto** (alguém ainda tem `fd[1]` aberto) **bloqueia** até alguém escrever.

### Exemplo de comunicação por pipe (pai → filho)

```c
#define BUFFER_SIZE 25
#define READ_END    0
#define WRITE_END   1

int main(void) {
    char write_msg[BUFFER_SIZE] = "Greetings";
    char read_msg[BUFFER_SIZE];
    int fd[2];
    pid_t pid;

    /* cria o pipe */
    if (pipe(fd) == -1) {
        fprintf(stderr, "Pipe failed");
        return 1;
    }

    /* fork de um filho */
    pid = fork();

    if (pid < 0) {
        fprintf(stderr, "Fork Failed");
        return 1;
    }

    if (pid > 0) {                                         /* pai */
        close(fd[READ_END]);                               /* fecha read-end */
        write(fd[WRITE_END], write_msg, strlen(write_msg) + 1);
        close(fd[WRITE_END]);
    }
    else {                                                 /* filho */
        close(fd[WRITE_END]);                              /* fecha write-end */
        read(fd[READ_END], read_msg, BUFFER_SIZE);
        printf("read %s", read_msg);
        close(fd[READ_END]);
    }

    return 0;
}
```

---

# Parte IV — Escalonamento de Processos (Cap. 5)

---


<br>

<div align="center">

<table border="0" width="100%">
<tr>
<td align="center" style="padding:18px;background:linear-gradient(135deg,#8b5cf622 0%,#8b5cf611 100%);border-left:6px solid #8b5cf6;border-radius:8px;">

<sub style="color:#8b5cf6;letter-spacing:4px;font-weight:700;">▌ Parte IV ▐</sub>

### ESCALONAMENTO

<sub><i>FCFS, RR, SJF, SRTF, Priority, MLQ, MLFQ, CFS</i></sub>

</td>
</tr>
</table>

</div>

<br>

## 42. Motivação para o Escalonamento

O objetivo da **multiprogramação** é **ter sempre algum processo a executar**, **maximizando a utilização do CPU**.

- Quando um processo tem de esperar (ex.: por I/O), o SO tira-o do CPU e dá o CPU a outro processo.
- A função fundamental do SO que está na base da multiprogramação é o **process scheduling**.
- Ao escalonar o CPU eficientemente entre vários processos, o SO consegue **servir mais tarefas** e **tornar o computador mais produtivo**.

### Hardware Timer Interrupts
Schedulers preemptivos **dependem de hardware timer interrupts**:
- O timer dispara periodicamente (ex.: cada 4 ms).
- A ISR do timer dá controlo ao scheduler, que decide se preempta o processo actual.
- Sem timer hardware, o SO não consegue forçar preempção — só algoritmos cooperativos seriam possíveis.

### Real-Time Scheduling
Em sistemas **real-time**, processos têm **deadlines** que não podem ser falhados. Algoritmos clássicos:
- **Rate Monotonic (RM)**: prioridade **inversamente proporcional ao período** — tarefas com período mais curto têm prioridade mais alta. **Estática** (atribuída uma vez).
- **Earliest Deadline First (EDF)**: prioridade **dinâmica**, atribuída ao processo cujo **deadline está mais próximo**. EDF é óptimo (escalona qualquer conjunto factível) mas mais complexo.

---

## 43. Ciclo CPU-I/O Burst

A execução de um processo pode ser vista como um **ciclo de CPU bursts e I/O bursts**:

```
   load store add store read from file       ─┐
                                               │  CPU burst
   ─────────────────────────────────────────┘
   wait for I/O                                ─┐  I/O burst
   ─────────────────────────────────────────┘
   store increment index write to file         ─┐  CPU burst
   ─────────────────────────────────────────┘
   wait for I/O                                ─┐  I/O burst
   ─────────────────────────────────────────┘
   load store add store read from file         ─┐  CPU burst
   ─────────────────────────────────────────┘
   wait for I/O                                ─┐  I/O burst
                          ⋮
```

- A execução começa com um **CPU burst**, seguido por um **I/O burst**, seguido por outro CPU burst, etc.
- Eventualmente, o **último CPU burst** termina com um pedido de **terminação**.

### Classificação de Processos
Conforme a relação CPU/I/O, classificamos os processos em:
- **CPU-bound**: gastam a maior parte do tempo a fazer **computação** (CPU bursts longos, poucos I/O bursts). Ex.: cálculos científicos, compressão.
- **I/O-bound**: gastam a maior parte do tempo a **esperar I/O** (CPU bursts curtos, muitos I/O bursts). Ex.: editores de texto, navegadores.

> **Schedulers tipicamente favorecem processos I/O-bound** sobre CPU-bound — porque libertam o CPU rapidamente, permitindo melhor throughput global e melhor responsividade.

---

## 44. Decisões de Escalonamento — Preemptivo vs Não-Preemptivo

As **decisões de escalonamento** podem ocorrer quando um processo:

1. Passa de **running → waiting** (resultado de um pedido de I/O).
2. Passa de **waiting → ready** (resultado de I/O completion).
3. Passa de **running → ready** (resultado de uma interrupção).
4. **Termina**.

O **scheduler escolhe entre os processos da ready queue** e atribui o CPU a um deles.

| Tipo | Quando decide | |
|------|---------------|--|
| **Não-preemptivo (cooperativo)** | **Apenas nas situações 1 e 4** | Uma vez dado o CPU, o processo só o larga voluntariamente |
| **Preemptivo** | **Em todas as situações (1–4)** | Pode tirar o CPU a um processo |

> **O escalonamento preemptivo precisa de hardware especial — tipicamente um timer.**

### Riscos do escalonamento preemptivo

O escalonamento preemptivo pode causar **race conditions** (o resultado depende da ordem de execução):

- Enquanto um processo atualiza dados, é preempted; outro processo lê os mesmos dados num **estado inconsistente**.
- O processamento de uma system call pode estar a alterar **dados do kernel** (ex.: filas de I/O). Se for preempted no meio dessas alterações e o kernel/driver precisar de modificar a mesma estrutura, **dá caos**.

> Como interrupções podem ocorrer a qualquer momento, **secções críticas têm de ser protegidas contra acessos concorrentes**: as **interrupções são desativadas à entrada** dessas secções e **só reativadas à saída**.

---

## 45. Critérios de Escalonamento

Critérios típicos para comparar algoritmos de scheduling:

| Critério | Definição |
|----------|-----------|
| **CPU utilization** | Manter o CPU **ocupado o máximo possível** |
| **Throughput** | Número de processos **completados por unidade de tempo** |
| **Turnaround time / Completion time** | Tempo total para **executar um processo** (do submit ao completion) |
| **Waiting time** | Tempo que um processo passa **na ready queue à espera** |
| **Response time** | Tempo do submit até **à primeira resposta** (não output) — relevante em sistemas time-sharing |

### Otimização

| Maximizar | Minimizar |
|-----------|-----------|
| CPU utilization | Turnaround time |
| Throughput      | Waiting time |
|                 | Response time |

---

## 46. First-Come First-Served (FCFS)

**O processo que pede o CPU primeiro é o primeiro a recebê-lo.**

- Gerido facilmente com uma **fila FIFO**:
  - Quando entra na ready queue, vai para o **fim**.
  - Quando o CPU está livre, é dado ao processo na **cabeça** da fila.
- **Não-preemptivo**: uma vez dado o CPU, o processo só o larga ao **terminar** ou ao **pedir I/O**.

### Problemas
- O **average waiting time** costuma ser **bastante longo**.
- **Mau para sistemas time-sharing**, onde cada utilizador deve receber CPU em intervalos regulares.

### Exemplo I — ordem `P1, P2, P3`

| Processo | Burst Time |
|----------|------------|
| P1 | 24 |
| P2 |  3 |
| P3 |  3 |

```
| P1                                      | P2  | P3  |
0                                        24    27    30
```

**Average waiting time:** `(0 + 24 + 27) / 3 = 51 / 3 = 17`

### Exemplo II — ordem `P2, P3, P1` (mesmos processos)

```
| P2  | P3  | P1                                      |
0     3     6                                        30
```

**Average waiting time:** `(0 + 3 + 6) / 3 = 9 / 3 = 3`

> A ordem de chegada dos processos tem **enorme impacto** no FCFS. Processos curtos atrás de processos longos sofrem o **convoy effect**.

---

## 47. Round Robin (RR)

Espécie de **FCFS com preempção**, especialmente desenhado para sistemas time-sharing:

- Cada processo recebe um **time quantum (time slice)** — pequena unidade de tempo de CPU.
- A cada quantum, **o timer interrompe** e o scheduler escolhe o próximo. O processo atual é **preempted** e vai para o **fim** da ready queue (a fila funciona como uma fila circular).

### Análise

Se o quantum é **Q** e há **N processos** na ready queue:
- Cada processo recebe **`1/N` do CPU**, em pedaços de **no máximo Q** unidades de tempo de cada vez.
- Nenhum processo espera mais do que **`(N-1)·Q`** unidades de tempo.

| Tamanho de Q | Efeito |
|--------------|--------|
| **Q grande** | Tende a comportar-se como **FCFS** |
| **Q pequeno** | **Mais context switches** → o overhead pode ser **demasiado alto** |

### Exemplo — RR com quantum 4

| Processo | Burst Time |
|----------|------------|
| P1 | 24 |
| P2 |  3 |
| P3 |  3 |

```
| P1  | P2  | P3  | P1  | P1  | P1  | P1  | P1  |
0     4     7    10    14    18    22    26    30
```

**Average waiting time:** `(6 + 4 + 7) / 3 = 17 / 3 ≈ 5.66`

### Time quantum vs context switch time

```
   process time = 10
   ────────────────────────────              quantum     context switches
   |                          |                12               0
   0                          10
   ──────────────|─────────────              quantum     context switches
   |             |            |                 6               1
   0             6           10
   |─|─|─|─|─|─|─|─|─|─|                    quantum     context switches
   0 1 2 3 4 5 6 7 8 9 10                       1               9
```

> **Regra:** o tempo de context switch deve ser uma **pequena fração do quantum**.
> - Tempo típico de context switch: **< 10 µs**.
> - Quantum típico em sistemas modernos: **10–100 ms**.

### FCFS x RR — quem ganha em quê?

| | FCFS | RR |
|-|------|----|
| **Vantagens** | Simples | Bom para jobs curtos |
| **Desvantagens** | Jobs curtos ficam presos atrás dos longos | Tempo de context switch acumula com jobs longos |

---

## 48. Shortest-Job-First (SJF) e Previsão do Próximo Burst

**SJF** associa a cada processo o **comprimento do seu próximo CPU burst** e escolhe **o processo com o burst mais curto**.

- Em caso de empate, **FCFS** desempata.
- Também conhecido como **Shortest-Time-to-Completion-First (STCF)**, embora o nome mais correto seja **shortest-next-CPU-burst** — o que importa é o **próximo burst**, não o tempo total do processo.

### Por que SJF é "ótimo"?

> **SJF é ótimo** porque produz o **menor average waiting time possível** para um conjunto dado de processos.

**Intuição:** mover um job curto para a frente de um longo **diminui mais o waiting do curto** do que aumenta o do longo.

### Exemplo

| Processo | Burst Time |
|----------|------------|
| P1 | 6 |
| P2 | 8 |
| P3 | 7 |
| P4 | 3 |

**SJF (ordem P4, P1, P3, P2):**
```
| P4  | P1     | P3      | P2       |
0     3        9         16          24
```
Average waiting time SJF: `(0 + 3 + 9 + 16) / 4 = 28 / 4 = 7`

**FCFS (ordem P1, P2, P3, P4):**
Average waiting time FCFS: `(0 + 6 + 14 + 21) / 4 = 41 / 4 = 10.25`

### A grande dificuldade do SJF

> **Não sabemos à partida o comprimento do próximo CPU burst.**

### Previsão do próximo CPU burst — média exponencial

Podemos **estimar** o próximo burst a partir do histórico, com uma **média exponencial**:

```
τ(n+1) = α · t(n) + (1 − α) · τ(n)
```

Onde:
- **τ(n+1)** = previsão para o próximo CPU burst.
- **t(n)** = comprimento real do n-ésimo CPU burst (acabou de acontecer).
- **τ(n)** = previsão anterior.
- **0 ≤ α ≤ 1**, tipicamente **α = 1/2**.

Com **α = 1/2**:
```
τ(n+1) = (t(n) + τ(n)) / 2
```

#### Exemplo de previsão (slide 16)

| iteração | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|----------|---|---|---|---|---|---|---|---|
| `t(i)` real     |  6 |  4 |  6 |  4 | 13 | 13 | 13 |  … |
| `τ(i)` previsto | 10 |  8 |  6 |  6 |  5 |  9 | 11 | 12 |

A previsão **adapta-se progressivamente** ao comportamento do processo.

---

## 49. Shortest-Remaining-Time-First (SRTF)

**SJF** pode ser **não-preemptivo** ou **preemptivo**:

- O **SJF preemptivo** chama-se **SRTF** (Shortest-Remaining-Time-First).

A escolha entre preemptivo e não-preemptivo ocorre **quando um novo processo chega à ready queue** e o seu próximo burst é **mais curto do que o que falta** ao processo atualmente em execução:

| | Comportamento |
|-|---------------|
| **SJF (não-preemptivo)** | Deixa o processo atual **terminar** o seu burst |
| **SRTF (preemptivo)**    | **Preempta** o atual e escalona o processo recém-chegado |

### Exemplo (com tempos de chegada)

| Processo | Arrival Time | Burst Time |
|----------|--------------|------------|
| P1 | 0 | 8 |
| P2 | 1 | 4 |
| P3 | 2 | 9 |
| P4 | 3 | 5 |

**SRTF (preemptivo):**
```
| P1 | P2  | P4   | P1     | P3        |
0    1     5      10       17           26
```
Average waiting time SRTF: `[(17-8-0) + (5-4-1) + (26-9-2) + (10-5-3)] / 4 = 26/4 = 6.5`

**SJF (não-preemptivo):**
Average waiting time SJF: `[0 + (8-1) + (12-3) + (17-2)] / 4 = 31/4 = 7.75`

### FCFS x RR x SJF & SRTF — Pros e Cons

**FCFS**
- (+) Simples
- (–) Jobs curtos ficam presos atrás de longos

**RR**
- (+) Melhor para jobs curtos
- (–) Tempo de context switch acumula em jobs longos

**SJF & SRTF**
- (+) **Average waiting time ótimo**
- (+) Grande efeito positivo em jobs curtos
- (–) Difícil prever o futuro (próximo burst)
- (–) **Starvation** de jobs longos

---

## 50. Priority Scheduling

**Priority scheduling** associa um **número de prioridade** a cada processo; o **CPU vai para o processo de maior prioridade**.

- Empates de prioridade → **FCFS** desempata.
- **SJF e SRTF podem ser vistos como casos especiais** de priority scheduling (a "prioridade" é o comprimento do próximo burst).

### Variantes

| Variante | Comportamento |
|----------|---------------|
| **Preemptivo**     | Se chega um processo com **maior prioridade** que o atual, **preempta** |
| **Não-preemptivo** | Deixa o processo atual **terminar** o seu burst |

### Problema: Starvation (indefinite blocking)

Processos de **baixa prioridade** podem **nunca executar** — ficam bloqueados indefinidamente.

### Solução: Aging

> **Aging** = aumentar **gradualmente a prioridade** dos processos que estão à espera há muito tempo.

### Priority Inversion
**Priority inversion** ocorre quando um **processo de baixa prioridade bloqueia um processo de alta prioridade** indirectamente:
1. Processo de **baixa** prioridade (L) detém um lock.
2. Processo de **alta** prioridade (H) tenta adquirir o lock e bloqueia.
3. Processo de **prioridade média** (M) ganha CPU e impede L de correr (e portanto de libertar o lock).
4. Resultado: H espera M, mas devia preceder M — inversão!

> Caso famoso: Mars Pathfinder (1997). Um processo de baixa prioridade bloqueou um processo de alta prioridade durante minutos.

**Soluções:**
- **Priority Inheritance**: o processo que detém o lock **herda temporariamente** a prioridade mais alta entre os bloqueados, garantindo que avança rapidamente.
- **Priority Ceiling**: cada lock tem uma **prioridade tecto**; quem o adquire fica com essa prioridade enquanto o detém.

### Exemplo

| Processo | Burst | Priority |
|----------|-------|----------|
| P1 | 10 | 3 |
| P2 |  1 | 1 |
| P3 |  2 | 4 |
| P4 |  1 | 5 |
| P5 |  5 | 2 |

(Convenção: **menor número = maior prioridade**.)

```
| P2 | P5    | P1          | P3   | P4 |
0    1       6              16     18   19
```
Average waiting time: `(0 + 1 + 6 + 16 + 18) / 5 = 41 / 5 = 8.2`

---

## 51. Multilevel Queue (MLQ)

**MLQ** divide a ready queue em **várias filas separadas**:

- Os processos são **permanentemente atribuídos a uma fila**, com base em alguma propriedade (ex.: tamanho de memória, prioridade do processo, …).
- **Cada fila tem o seu próprio algoritmo de escalonamento** (uma pode ser RR, outra FCFS, etc.).

Para além disso, é preciso **escalonamento entre as filas**:

| Estratégia entre filas | Comportamento |
|------------------------|---------------|
| **Fixed priority scheduling** | Cada fila tem **prioridade absoluta** sobre as de prioridade inferior — preemptivo, **com risco de starvation** |
| **Time slice** | Cada fila recebe **uma fatia de CPU** que é depois distribuída pelos seus processos (ex.: 80% para RR, 20% para FCFS) |

### Exemplo de hierarquia (slide 26)

```
   highest priority
   ────►  system processes              ────►
   ────►  interactive processes         ────►
   ────►  interactive editing processes ────►
   ────►  batch processes               ────►
   ────►  student processes             ────►
   lowest priority
```

---

## 52. Multilevel Feedback Queue (MLFQ)

Os dois setups de MLQ (fixed priority e time slice) têm **baixo overhead** mas são **inflexíveis**.

**MLFQ** é mais flexível porque **permite que processos mudem de fila**:

- Processos que **usam muito CPU** são **movidos para filas de menor prioridade**.
- Processos **I/O-bound** e **interativos** ficam nas filas de **maior prioridade**.
- Implementa **aging** ao **promover** para uma fila superior os processos que esperam demasiado tempo numa fila inferior — **previne starvation**.

> **BSD UNIX, Solaris, Windows NT** e versões posteriores do Windows usam uma forma de **MLFQ** como scheduler base.

### Exemplo: 3 filas

- **Q0** — RR com quantum **8 ms** (mais alta prioridade)
- **Q1** — RR com quantum **16 ms**
- **Q2** — FCFS (mais baixa prioridade)

```
    ────► [ Q0  quantum = 8  ]────►
              ↓
    ────► [ Q1  quantum = 16 ]────►
              ↓
    ────► [ Q2     FCFS      ]────►
```

### Algoritmo de escalonamento I (slide 28)

- Novos processos entram pela **cauda de Q0**.
- Um processo na cabeça de Q0 recebe **8 ms**, na cabeça de Q1 recebe **16 ms**, na cabeça de Q2 corre **FCFS**.
- **Q1 só corre se Q0 estiver vazia**; **Q2 só corre se Q0 e Q1 estiverem vazias**.
  - Se uma fila não corre durante muito tempo, os processos podem ser **promovidos** para uma fila superior (aging).
- Um processo que entra numa fila **superior preempta** qualquer processo a correr numa fila inferior.

### Algoritmo de escalonamento II (slide 29)

- Se um processo **completa dentro do seu quantum** → sai do sistema.
- Se um processo **usa todo o quantum** → é preempted e **desce uma fila** (penaliza CPU-bound).
- Se um processo **bloqueia para I/O** → sai da fila atual e **volta à cauda da mesma fila** quando ficar ready.
- **Alternativa anti-gaming:** assim que um processo usa **todo o seu quantum acumulado** num nível (independentemente de quantas vezes bloqueou para I/O), **é demovido** para a fila inferior — assim impede-se que o processo **engane** o scheduler bloqueando de propósito a meio do quantum.

### MLQ vs MLFQ — parâmetros a definir

| MLQ (4 parâmetros) | MLFQ (5 parâmetros) |
|--------------------|---------------------|
| Número de filas    | Número de filas |
| Algoritmo de escalonamento por fila | Algoritmo de escalonamento por fila |
| Algoritmo entre filas (fixed priority ou time slice) | Método para decidir **a fila inicial** de um processo |
| Método para atribuir processos a uma fila | Método para decidir quando **promover** um processo |
|                    | Método para decidir quando **demover** um processo |

### Pros e Cons

**MLQ**
- (+) Baixo overhead de scheduling
- (–) Fixed priority é injusto, inflexível e pode causar starvation
- (–) Time slice pode prejudicar o average waiting time

**MLFQ**
- (+) **Excelente performance** para I/O-bound curtos e razoável para CPU-bound longos
- (+) **Resultados aproximam-se do SRTF**
- (+) **Evita starvation** (com aging)
- (–) Requer **afinar 5 parâmetros**

---

## 53. Completely Fair Scheduler (CFS) — Linux

O **CFS** é o algoritmo de scheduling adotado pelo **kernel do Linux desde a versão 2.6.23**.

### Ideia central

> O CFS tenta **dividir o CPU de forma justa** entre todas as tasks (processos ou threads), tendo em conta as **prioridades** e o **histórico de uso de CPU**.

O CFS baseia-se em **scheduling classes**, em que **cada classe tem uma gama de prioridades**:
- O scheduler escolhe a **task de maior prioridade da classe de maior prioridade**.
- Tasks de menor prioridade são preempted quando tasks de maior prioridade estão prontas.

### Duas classes principais

Tipicamente, kernels Linux standard implementam **duas classes de scheduling**:
1. **Real-time class**
2. **Normal (default) class**

```
         Real-Time             Normal
    ┌────────────────┬────────────────────┐
    │                │                    │
    0               99 100               139
    ◄──── Higher                  Lower ────►
                  Priority
```

| Classe | Prioridades | Como são atribuídas |
|--------|-------------|---------------------|
| **Real-time** | **0–99**     | **Estáticas** |
| **Normal**    | **100–139**  | **Dinâmicas**, baseadas em **nice values** |

### Nice values

- **Range:** `[-20, +19]`, com **default 0**.
- Mapeiam para prioridades **100–139**.
- **Nice value mais baixo → prioridade mais alta** (e vice-versa).
  - A ideia: aumentar o nice value é "ser simpático" para os outros (cedem prioridade).

### Como funciona o scheduling

- **Real-time tasks** são escalonadas **por prioridade** e **antes** de qualquer task das outras classes.
- **Normal tasks** são escalonadas pelo **menor virtual runtime**.

### Virtual runtime

O CFS mantém um **virtual runtime por task**, que mede o tempo de CPU **com um fator de decay baseado no nice value**:

- **Nice = 0** → virtual runtime **igual ao real runtime** (correu 100 ms ⇒ +100 ms de virtual runtime).
- **Lower-priority tasks** (nice alto) **acumulam virtual runtime mais depressa** (decay maior) ⇒ chegam mais rapidamente a ser as "menos prioritárias".
- **Higher-priority tasks** (nice baixo) acumulam virtual runtime mais devagar.
- **Nova task** → recebe um virtual runtime **igual ao mínimo virtual runtime atual** (para entrar competitivamente sem dominar nem ficar para trás).

### Target latency

- O CFS define uma **target latency**: **intervalo de tempo durante o qual cada runnable task deve correr pelo menos uma vez**.
- A target latency tem **valores default e mínimo**, mas pode **aumentar** se o número de tasks ativas crescer acima de um certo threshold.
- **Tasks recebem proporções de CPU** dentro da target latency, **proporcionais às suas prioridades relativas**.

### Sem fixed time slices

Com CFS, **as tasks não têm time slices fixos** — correm **até deixarem de ser a task mais "injustamente tratada"** (i.e., até o virtual runtime de outra task se tornar menor).

### Wakeup das tasks

> Quando uma task acorda, a **diferença entre o seu virtual runtime e o mínimo virtual runtime atual não pode exceder a target latency**. Se exceder, **o virtual runtime da task é ajustado** a esse limite.

Isto **previne que uma task que esperou muito tempo monopolize o CPU** quando volta a estar runnable.

### Exemplo prático (slide 36)

Cenário:
- Target latency = 10 ms; decay factor = 2x.
- **P0**: virtual runtime = 100 ms, nice = 0 (proporção mínima 2 ms).
- **P1**: virtual runtime = 101 ms, nice = -1 (proporção mínima 4 ms).
- **P2**: virtual runtime =  97 ms, nice = -1 (proporção mínima 4 ms).

| Passo | P0 | P1 | P2 |
|-------|-----|-----|-----|
| Estado inicial                                      | 100 | 101 |  97 |
| Schedule P2 durante 6 ms (é o de menor vruntime)    | 100 | 101 | **100** |
| Schedule P0 durante 2 ms (I/O syscall após 1 ms)    | **101** | 101 | 100 |
| Schedule P2 durante 4 ms                            | 101 | 101 | **102** |
| Schedule P1 durante 4 ms                            | 101 | **103** | 102 |
| Schedule P2 durante 4 ms (HW interrupt após 2 ms)   | 101 | 103 | **103** |
| Schedule P0 durante 2 ms                            | **103** | 103 | 103 |

> Repara como o CFS **alterna** sempre para a task de **menor virtual runtime**, ajustando os valores em função do nice (decay) e respeitando a target latency.

---


<br>

<div align="center">

<table border="0" width="100%">
<tr>
<td align="center" style="padding:18px;background:linear-gradient(135deg,#ec489922 0%,#ec489911 100%);border-left:6px solid #ec4899;border-radius:8px;">

<sub style="color:#ec4899;letter-spacing:4px;font-weight:700;">▌ Parte V ▐</sub>

### SINCRONIZAÇÃO

<sub><i>Race conditions, Peterson, mutex, semáforos, problemas clássicos</i></sub>

</td>
</tr>
</table>

</div>

<br>

## 54. Background — Porque é que precisamos de sincronização?

Um **processo cooperante** é aquele que **pode afetar ou ser afetado** por outros processos do sistema.

- Os processos cooperantes podem **partilhar diretamente um espaço de endereçamento lógico** ou **partilhar dados através de ficheiros ou mensagens**.
- O acesso concorrente a dados partilhados pode resultar em **inconsistência de dados**:
  - Um processo pode ser **interrompido a meio da sua execução**, deixando uma operação a meio.
  - Para manter a consistência, é preciso **garantir a execução ordenada dos processos cooperantes** — e é exatamente disso que trata a **sincronização**.

---

## 55. Critical Sections e Race Conditions

### Critical Section (secção crítica)

> Uma **critical section** é um pedaço de código que **acede a um recurso partilhado** (variáveis comuns, atualização de uma tabela, escrita num ficheiro, etc.).

**Regra fundamental:**
> Quando um processo está a executar uma critical section, **nenhum outro processo pode estar a executar a mesma critical section** — ou seja, **dois processos não podem estar dentro da mesma critical section ao mesmo tempo**. É necessário sincronizá-los.

### Race Condition

> Uma **race condition** ocorre quando vários processos podem aceder e manipular um recurso partilhado e o **resultado depende da ordem em que esses acessos acontecem** — quase sempre levando a um resultado **surpreendente e indesejado**.

---

## 56. Operações Atómicas

Para lidar com concorrência, precisamos de saber quais são as **operações atómicas** que o sistema oferece:

- Operações atómicas são **indivisíveis**: não podem ser **interrompidas a meio** nem **modificadas por terceiros** durante a execução.
- São o **bloco de construção fundamental** — sem elas, **não é possível suportar concorrência**.
- Na maior parte das máquinas, **acessos à memória — loads e stores de palavras (words)** — são atómicos.

---

## 57. O Problema "Too Much Milk"

Problema clássico para ilustrar sincronização. Restrições:
- Quando é preciso, **alguém compra leite**.
- **Nunca mais do que uma pessoa** compra leite.

**Cenário problemático sem sincronização:**

| Hora | Pessoa A | Pessoa B |
|------|----------|----------|
| 15:00 | Olha para o frigorífico, sem leite | |
| 15:05 | Sai para a loja | |
| 15:10 | Chega à loja | Olha para o frigorífico, sem leite |
| 15:15 | Compra leite | Sai para a loja |
| 15:20 | Volta para casa, arruma o leite | Chega à loja |
| 15:25 | | Compra leite |
| 15:30 | | Volta para casa, **leite a mais!** |

Este problema motiva a necessidade de uma forma de sinalização entre processos.

---

## 58. Solução #1 — Nota simples

A ideia é deixar uma **nota** antes de ir comprar leite, para evitar que duas pessoas comprem.

```c
if (no milk) {
    if (no note) {
        leave note;
        buy milk;
        remove note;
    }
}
```

**Problema:** ainda compra leite a mais ocasionalmente!

**Cenário do problema:**

```
P1                              P2
if (no milk) {
  if (no note) {
                                if (no milk) {
                                  if (no note) {
    leave note;
    buy milk
    ...
                                    leave note;
                                    buy milk
                                    ...
```

> **P1 pode sofrer context switch** depois de verificar leite e nota, mas **antes** de deixar a nota → ambos acabam por comprar.

---

## 59. Solução #2 — Notas etiquetadas

E se cada um deixasse uma **nota com etiqueta** (Ni do processo i) **antes** de verificar?

```c
leave note Ni;
if (no note Nj) {
    if (no milk)
        buy milk;
}
remove note Ni;
```

**Problema:** é possível que **nenhum dos dois compre leite**!

**Cenário do problema:**

```
P1                              P2
leave note N1;
                                leave note N2;
if (no note N2) {
  // existe → não compra
}
                                if (no note N1) {
                                  // existe → não compra
                                }
remove note N1;
                                remove note N2;
```

> Ambos veem a nota do outro e nenhum compra.

---

## 60. Solução #3 — Notas etiquetadas + busy waiting

Uma solução assimétrica:

```c
// P1                                // P2
leave note N1;                        leave note N2;
while (note N2) {        // X         if (no note N1) {     // Y
    do nothing;                           if (no milk)
}                                             buy milk;
if (no milk)                          }
    buy milk;                         remove note N2;
remove note N1;
```

**Como funciona:**
- Em **X**, se a nota N2 não existe, é seguro o P1 comprar; caso contrário, espera para ver o que acontece.
- Em **Y**, se a nota N1 não existe, é seguro o P2 comprar; caso contrário, ou o P1 está a comprar, ou está à espera que o P2 desista.

**Funciona, mas é insatisfatória:**
- **Muito complexa** — difícil convencer-se de que está correta.
- **O código de P1 é diferente do de P2** — se houvesse muitos processos, cada um precisaria de código diferente.
- **P1 usa busy waiting** — está a consumir tempo de CPU sem fazer nada útil enquanto espera.

> **Conclusão:** precisamos de uma abordagem melhor — locks, hardware support, semáforos.

---

## 61. O Problema da Critical Section — formalização

O objetivo é desenhar um **protocolo** que os processos possam usar para cooperar:
- Os processos têm de **pedir permissão** para entrar na critical section — a **entry section**.
- A critical section pode ser seguida por uma **exit section** e por uma **remainder section** (não-crítica).

```
do {
    entry section
        critical section
    exit section
        remainder section
} while (true);
```

---

## 62. Os 3 Requisitos de uma Solução

Uma solução para o problema da critical section tem de satisfazer **3 requisitos**:

1. **Mutual Exclusion** — Se um processo está dentro da critical section, **nenhum outro** pode estar dentro dela.
2. **Progress** — Se nenhum processo está dentro da critical section, então só os processos que **não estão a executar a remainder section** podem participar na decisão de quem entra a seguir, e essa decisão **não pode ser adiada indefinidamente**.
3. **Bounded Waiting** — Tem de existir um **limite** no número de vezes que outros processos podem entrar na critical section depois de um processo ter pedido para entrar e antes de esse pedido ser satisfeito.

---

## 63. Tentativas falhadas (variável `lock` e `turn`)

### Tentativa A — variável `lock` partilhada

```c
boolean lock = false;
do {
    while (lock);
    lock = true;
    // critical section
    lock = false;
    // non-critical section
} while (true);
```

**Não funciona — não preserva mutual exclusion!**
> Entre o `while (lock);` e o `lock = true;` pode haver um context switch e ambos os processos entram.

### Tentativa B — variável `turn`

```c
int turn = 0;
// Pi é o processo atual
do {
    while (turn != i);
    // critical section
    turn = 1 - i;
    // non-critical section
} while (true);
```

**Não funciona — não satisfaz o requisito de progress!**
> Os processos têm de **alternar estritamente**. Se P0 não quiser entrar, P1 fica preso à espera que P0 mude `turn`.

---

## 64. Solução de Peterson

> **Solução clássica baseada em software** para o problema da critical section.

- Fornece uma **boa descrição algorítmica** do problema.
- Ilustra a **complexidade** de desenhar software que satisfaça mutual exclusion, progress e bounded waiting.
- É uma **solução para 2 processos**, mas tem generalização para N.

**Provadamente:**
- Mutual exclusion é preservada.
- Progress é satisfeito.
- Bounded waiting é satisfeito.

**Variáveis partilhadas:**
- `turn` — indica de quem é a vez de entrar.
- `flag[2]` — indica se cada processo está pronto para entrar.

```c
int turn;
boolean flag[2] = {false, false};

// Pi é o processo atual, Pj é o outro
do {
    flag[i] = true;
    turn = j;
    while (flag[j] && turn == j);   // busy waiting
    // critical section
    flag[i] = false;
    // non-critical section
} while (true);
```

**Como funciona:**
- O processo `i` declara interesse (`flag[i] = true`).
- Concede a vez ao outro (`turn = j`).
- Espera só enquanto o outro também tiver interesse **e** for a vez do outro.

> **Nota importante:** Peterson ainda usa **busy waiting** e o `while` cobre o caso em que o outro também quer entrar.

---

## 65. Hardware de Sincronização — Disable Interrupts

### Em uniprocessadores

Em sistemas com um único CPU, podíamos resolver tudo desativando interrupções enquanto modificamos variáveis partilhadas:

```c
disable interrupts;
// critical section
enable interrupts;
```

> O código corre **sem preempção** — ninguém o interrompe.

### Problemas com desativar interrupções

- **Não pode ser usado pelos utilizadores diretamente** — o programador pode esquecer-se de reativar interrupções!
- **Não escala para multiprocessadores** — desativar interrupções em todos os processadores requer mensagens entre eles, o que é demasiado ineficiente.

---

## 66. Instruções Atómicas — `test_and_set` e `compare_and_swap`

Os sistemas modernos disponibilizam **instruções de hardware especiais** — atómicas — para resolver o problema da critical section, baseando-se na ideia de **proteger regiões críticas com locking**:

- **`test_and_set()`** — testa e modifica uma palavra de memória atomicamente.
- **`compare_and_swap()`** — troca o conteúdo de duas palavras de memória atomicamente.

Ao contrário de desativar interrupções, **estas instruções funcionam tanto em uniprocessadores como em multiprocessadores**:
- Em uniprocessadores não é difícil.
- Em multiprocessadores precisa de ajuda do **protocolo de coerência de cache**.

### Pseudocódigo

```c
boolean test_and_set(boolean *target) {
    boolean temp = *target;
    *target = true;
    return temp;
}

int compare_and_swap(int *target, int expected, int new_val) {
    int temp = *target;
    if (*target == expected)
        *target = new_val;
    return temp;
}
```

> **Note bem:** `test_and_set` devolve o valor antigo e mete `true`. Se devolveu `false`, o lock estava livre e agora ficou reservado para nós.

---

## 67. Mutual Exclusion com `test_and_set` e `compare_and_swap`

### Com `test_and_set()`

```c
boolean lock = false;

do {
    while (test_and_set(&lock));   // espera enquanto devolver true (lock estava ocupado)
    // critical section
    lock = false;
    // non-critical section
} while (true);
```

### Com `compare_and_swap()`

```c
int lock = 0;

do {
    while (compare_and_swap(&lock, 0, 1));   // espera enquanto não conseguir trocar 0→1
    // critical section
    lock = 0;
    // non-critical section
} while (true);
```

> **Atenção:** ambas as soluções satisfazem **mutual exclusion** e **progress**, mas **não satisfazem bounded waiting** — um processo pode ficar a tentar indefinidamente.

---

## 68. Bounded Waiting com `test_and_set`

Para satisfazer também o **bounded waiting**, é preciso uma estrutura mais elaborada com um array `waiting[N]`:

```c
boolean lock = false, waiting[N] = {false, ..., false};

do {
    waiting[i] = true;
    key = true;
    while (waiting[i] && key)
        key = test_and_set(&lock);
    waiting[i] = false;
    // critical section
    j = (i + 1) % n;
    while ((j != i) && waiting[j] == false)
        j = (j + 1) % n;
    if (j == i)
        lock = false;
    else
        waiting[j] = false;
    // non-critical section
} while (true);
```

> A ideia: à saída, o processo procura **circularmente** o próximo que está à espera e dá-lhe a vez (em vez de simplesmente largar o lock para qualquer um pegar). Isto garante o limite no tempo de espera.

---

## 69. Mutex Locks

As soluções anteriores são **escondidas dos programadores**. Os designers de SO constroem **ferramentas de software** mais práticas — a mais simples é o **mutex lock** (mutual exclusion).

**Mutex protege regiões críticas e previne race conditions:**
- Variável **booleana** que indica se o lock está disponível ou não.
- `init_lock()` — inicializa o lock.
- `acquire_lock()` — adquire o lock.
- `release_lock()` — liberta o lock.

> As chamadas a `acquire_lock()` e `release_lock()` **têm de ser atómicas** — geralmente são implementadas com instruções atómicas de hardware.

### Implementação básica

**Com `test_and_set`:**
```c
#define init_lock(M)    { M = false; }
#define acquire_lock(M) { while (test_and_set(&M)); }   // busy waiting
#define release_lock(M) { M = false; }
```

**Com `compare_and_swap`:**
```c
#define init_lock(M)    { M = 0; }
#define acquire_lock(M) { while (compare_and_swap(&M, 0, 1)); }
#define release_lock(M) { M = 0; }
```

### Uso típico

```c
init_lock(mutex);
do {
    acquire_lock(mutex);    // busy waiting
    // critical section
    release_lock(mutex);
    // non-critical section
} while (true);
```

---

## 70. Busy Waiting e Spinlocks

Quando a solução do mutex usa **busy waiting**, chama-se **spinlock** porque o processo "spinna" (gira) à espera que o lock fique livre.

### Características dos spinlocks

- **Desperdiçam CPU** que outro processo poderia estar a usar.
- Geralmente **não satisfazem bounded waiting** — caso das versões com `test_and_set` e `compare_and_swap`.

### Quando são vantajosos

- Quando os locks são mantidos por **períodos curtos**.
- Em **multiprocessadores**: um processo pode estar a executar a critical section num CPU enquanto outros "spinnam" noutros CPUs.
- **Não há context switch** ao esperar num spinlock.

### Quando são problemáticos

- Em **sistemas de multiprogramação**: se o processo que detém o lock está à espera de correr (não em execução), nenhum outro consegue libertar o lock e dar tempo de CPU aos que esperam é inútil.

---

## 71. Como Minimizar o Busy Waiting

> **Pergunta:** Conseguimos construir mutexes **sem** busy waiting?
> **Resposta:** Não, mas podemos **minimizar o tempo** de busy waiting.

A ideia é só fazer busy waiting **para verificar atomicamente o valor do lock** — não para esperar até este ficar livre.

**Implementação:**
- Cada lock tem uma **fila de processos à espera** (queue).
- Operação `suspend()` que **suspende voluntariamente** a execução do processo atual.

**Duas abordagens:**
- Uniprocessadores → desativar interrupções.
- Multiprocessadores → desativar interrupções **+** instruções atómicas (para coordenar entre CPUs).

---

## 72. Implementação de Mutex em Uniprocessador

### Estrutura de dados

```c
typedef struct {
    int value;       // valor do mutex (FREE ou BUSY)
    PCB *queue;      // fila de processos à espera
} mutex;

init_lock(mutex M) {
    M.value = FREE;
    M.queue = EMPTY;
}
```

### `acquire_lock`

```c
acquire_lock(mutex M) {
    disable interrupts;
    if (M.value == BUSY) {
        // evita busy waiting
        add_to_queue(current PCB, M.queue);
        suspend();
        // o kernel reativa interrupts antes de retomar este processo
    } else {
        M.value = BUSY;
        enable interrupts;
    }
}
```

### `release_lock`

```c
release_lock(mutex M) {
    disable interrupts;
    if (M.queue != EMPTY) {
        // mantém o lock BUSY e acorda um processo à espera
        PCB = remove_from_queue(M.queue);
        add_to_queue(PCB, ready queue);
    } else {
        M.value = FREE;
    }
    enable interrupts;
}
```

> **Truque importante no `release`:** quando há processos à espera, o lock continua `BUSY` e a propriedade do lock passa diretamente para um deles. Não se liberta!

---

## 73. Implementação de Mutex em Multiprocessador

A diferença para uniprocessador: além de desativar interrupções (que só afeta um CPU), precisamos de uma **guarda atómica** entre CPUs.

### Estrutura de dados

```c
typedef struct {
    boolean guard;   // garante atomicidade entre CPUs
    int value;       // FREE ou BUSY
    PCB *queue;
} mutex;

init_lock(mutex M) {
    M.guard = false;
    M.value = FREE;
    M.queue = EMPTY;
}
```

### `acquire_lock`

```c
acquire_lock(mutex M) {
    disable interrupts;
    while (test_and_set(&M.guard));   // tempo curto de busy waiting
    if (M.value == BUSY) {
        add_to_queue(current PCB, M.queue);
        M.guard = false;
        suspend();
    } else {
        M.value = BUSY;
        M.guard = false;
        enable interrupts;
    }
}
```

### `release_lock`

```c
release_lock(mutex M) {
    disable interrupts;
    while (test_and_set(&M.guard));   // tempo curto de busy waiting
    if (M.queue != EMPTY) {
        PCB = remove_from_queue(M.queue);
        add_to_queue(PCB, ready queue);
    } else {
        M.value = FREE;
    }
    M.guard = false;
    enable interrupts;
}
```

> **A guarda só é mantida durante a verificação/atualização da estrutura** — daí o tempo curto de busy waiting.

---

## 74. Semáforos

> Um **semáforo** é uma ferramenta de sincronização usada para **controlar o acesso a um recurso composto por um número finito de instâncias**.

- Definido pela primeira vez por **Dijkstra**, no final dos anos 60.
- Foi a **principal primitiva de sincronização do UNIX original**.

### Características

Semáforos são como inteiros, **exceto:**
- **Não se podem ler nem escrever**, exceto para inicializar o valor.
- **Não admitem valores negativos** — quando o semáforo chega a 0, todas as instâncias estão em uso, ou seja, **todos os processos que queiram usar o recurso ficam bloqueados** até o semáforo se tornar maior que 0.

### Tipos

- **Counting semaphore** — pode tomar valores num **domínio sem restrições**.
- **Binary semaphore** — só toma valores 0 ou 1 (semelhante ao mutex).

---

## 75. Operações `wait()` e `signal()`

Os semáforos são acedidos através de **duas operações atómicas standard**:

- `wait()` — espera que o semáforo se torne positivo e depois decrementa-o em 1.
- `signal()` — incrementa o semáforo em 1.

### Pseudocódigo (versão "naive" com busy waiting)

```c
wait(semaphore S) {
    while (S == 0);   // busy waiting
    S--;
}

signal(semaphore S) {
    S++;
}
```

> Esta é a definição **conceptual**. As implementações reais evitam o busy waiting (ver §76).

---

## 76. Implementação de Semáforos

A implementação tem de garantir que **nunca duas operações `wait()` e/ou `signal()` corram ao mesmo tempo no mesmo semáforo**:
- `wait()` simultâneos não podem decrementar o valor abaixo de zero.
- Não pode ser perdido um incremento de `signal()` se acontecer um `wait()` em simultâneo.

Tal como nos mutexes, há **duas abordagens** para minimizar busy waiting:
- Uniprocessadores → desativar interrupções.
- Multiprocessadores → desativar interrupções **+** instruções atómicas.

### Uniprocessador

```c
typedef struct {
    int value;       // valor do semáforo
    PCB *queue;      // fila de processos à espera
} semaphore;

init_semaphore(semaphore S) {
    S.value = 0;
    S.queue = EMPTY;
}
```

```c
wait(semaphore S) {
    disable interrupts;
    if (S.value == 0) {
        add_to_queue(current PCB, S.queue);
        suspend();
        // kernel reativa interrupts antes de retomar
    } else {
        S.value--;
        enable interrupts;
    }
}

signal(semaphore S) {
    disable interrupts;
    if (S.queue != EMPTY) {
        // mantém o valor e acorda um processo à espera
        PCB = remove_from_queue(S.queue);
        add_to_queue(PCB, ready queue);
    } else {
        S.value++;
    }
    enable interrupts;
}
```

### Multiprocessador

A estrutura ganha uma `boolean guard` — tal como nos mutexes — e cada operação faz `while (test_and_set(&S.guard));` antes da secção crítica interna.

```c
typedef struct {
    boolean guard;
    int value;
    PCB *queue;
} semaphore;
```

```c
wait(semaphore S) {
    disable interrupts;
    while (test_and_set(&S.guard));   // busy waiting curto
    if (S.value == 0) {
        add_to_queue(current PCB, S.queue);
        S.guard = false;
        suspend();
    } else {
        S.value--;
        S.guard = false;
        enable interrupts;
    }
}

signal(semaphore S) {
    disable interrupts;
    while (test_and_set(&S.guard));
    if (S.queue != EMPTY) {
        PCB = remove_from_queue(S.queue);
        add_to_queue(PCB, ready queue);
    } else {
        S.value++;
    }
    S.guard = false;
    enable interrupts;
}
```

> **Mesmo padrão dos mutexes** — guarda atómica para coordenar entre CPUs, fila de espera e `suspend()` para evitar busy waiting longo.

---

## 77. Starvation e Deadlock

### Starvation (indefinite blocking)

> **Starvation** é uma situação em que um processo **espera indefinidamente por um evento que pode nunca acontecer**.

### Deadlock

> **Deadlock** é uma situação em que um conjunto de processos **espera indefinidamente por um evento que nunca vai acontecer**, porque esse evento só pode ser causado por **um dos processos do conjunto**.

### Relação

> **Deadlock ⇒ starvation**, mas **não vice-versa.**
> - Starvation **pode acabar** (mas não é garantido).
> - Deadlock **não pode acabar sem intervenção externa**.

### Exemplo de deadlock com semáforos

```
P0:                P1:
wait(S);           wait(Q);
wait(Q);           wait(S);
...                ...
signal(S);         signal(Q);
signal(Q);         signal(S);
```

**Sequência problemática:**
```
P0: wait(S);   // S = 0
P1: wait(Q);   // Q = 0
P0: wait(Q);   // bloqueia, Q = 0 e detido por P1
P1: wait(S);   // bloqueia, S = 0 e detido por P0
```

> **Possible deadlock!** Note que deadlocks **não são determinísticos** — podem acontecer ou não para o mesmo código, dependendo do timing.

---

## 78. Problemas Clássicos — Bounded Buffer

> Ilustra o **poder das primitivas de sincronização**.

- **Producer** — coloca itens num buffer partilhado.
- **Consumer** — retira-os.

### Restrições de correção

1. **Mutual exclusion** — só um processo pode manipular a fila do buffer de cada vez.
2. **Scheduling** — se o buffer estiver **cheio**, o producer tem de esperar pelo consumer.
3. **Scheduling** — se o buffer estiver **vazio**, o consumer tem de esperar pelo producer.

### Solução com semáforos

```c
int n;                              // número de buffers
semaphore mutex = 1;                // mutual exclusion no buffer
semaphore empty = n;                // número de buffers vazios
semaphore full  = 0;                // número de buffers cheios
```

**Ideia chave:**
- **Um semáforo por restrição.**
- **Simetria** entre producer e consumer — pode-se ler como o producer a "produzir" full buffers para o consumer, ou o consumer a "produzir" empty buffers para o producer.

### Producer

```c
do {
    /* produce an item in next_produced */
    wait(empty);          // espera por um buffer vazio
    wait(mutex);          // entra na critical section
    /* add next_produced to the buffer */
    signal(mutex);        // sai da critical section
    signal(full);         // mais um buffer cheio disponível
} while (true);
```

### Consumer

```c
do {
    wait(full);           // espera por um buffer cheio
    wait(mutex);          // entra na critical section
    /* remove an item from buffer to next_consumed */
    signal(mutex);
    signal(empty);        // mais um buffer vazio disponível
    /* consume the item in next_consumed */
} while (true);
```

### Pontos de discussão

- **A ordem dos `wait()` é importante?** **Sim**, senão pode causar deadlock!
  Se invertermos no producer (`wait(mutex); wait(empty);`) e o buffer estiver cheio, o producer fica com o mutex e a esperar por `empty`. Como o consumer precisa do mutex para libertar um buffer, **deadlock**.
- **A ordem dos `signal()` é importante?** **Não**, exceto que pode afetar a eficiência.
- **2 producers ou 2 consumers?** Funciona na mesma — não é preciso mudar nada.

---

## 79. Problemas Clássicos — Readers and Writers

> Ilustra o problema de **partilhar dados**.

- **Readers** — só leem os dados partilhados.
- **Writers** — leem e escrevem nos dados partilhados.

### Será que um único lock chega?

- **Para writers, sim** — têm de ter acesso exclusivo.
- **Para readers, não** — queremos permitir **múltiplos readers em simultâneo**.

### Aplicações úteis

- Quando é fácil identificar quem só lê e quem escreve.
- Quando há **mais readers do que writers** — a maior concorrência compensa o overhead da solução.

### Variações

- **Variação I** — Nenhum reader fica à espera a menos que um writer já tenha conseguido permissão. Pode causar **starvation dos writers**.
- **Variação II** — Assim que um writer está pronto, executa o mais cedo possível. Pode causar **starvation dos readers**.

> A solução típica que se estuda implementa a **Variação I**.

### Solução (Variação I)

```c
semaphore rw_mutex = 1;     // mutual exclusion para writers
semaphore mutex   = 1;      // mutual exclusion ao atualizar read_count
int read_count    = 0;      // número de readers atualmente a ler
```

**Ideia chave:**
- Se um writer está na critical section e há N readers à espera, **só 1 reader fica em fila no `rw_mutex`**, os outros N-1 ficam em fila no `mutex`.
- Quando o writer faz `signal(rw_mutex)`, retoma-se ou o reader em espera ou um writer (à escolha do scheduler).

### Writer

```c
do {
    wait(rw_mutex);
    /* writing is performed */
    signal(rw_mutex);
} while (true);
```

### Reader

```c
do {
    wait(mutex);
    read_count++;
    if (read_count == 1)
        wait(rw_mutex);     // primeiro reader fecha a porta aos writers
    signal(mutex);

    /* reading is performed */

    wait(mutex);
    read_count--;
    if (read_count == 0)
        signal(rw_mutex);   // último reader abre a porta aos writers
    signal(mutex);
} while (true);
```

> **Ideia central:** o **primeiro reader** é o que disputa o `rw_mutex` com os writers; o **último reader** liberta-o. Os intermediários nem mexem.

---

## 80. Problemas Clássicos — Dining Philosophers

> Ilustra a classe dos problemas de **controlo de concorrência** — necessidade de alocar **vários recursos a vários processos** de forma **livre de deadlock e de starvation**.

### Cenário

- N filósofos sentados em torno de uma mesa redonda.
- N pauzinhos (chopsticks), um entre cada par de filósofos vizinhos.
- Tigela de arroz no centro.

**Comportamento:**
- Quando pensa, não interage com ninguém.
- Quando tem fome, tenta agarrar **os dois pauzinhos mais próximos** (um de cada vez).
- Quando tem ambos, **come sem largar nenhum**.
- Quando termina, larga ambos e volta a pensar.

### Solução com semáforos

```c
semaphore chopstick[5];   // (todos inicializados a 1)
```

**Ideia chave:**
- Para agarrar um pauzinho, o filósofo faz `wait()` no semáforo correspondente.
- Para o largar, faz `signal()`.

### Código (filósofo `i`)

```c
do {
    wait(chopstick[i]);
    wait(chopstick[(i+1) % 5]);
    /* eat for awhile */
    signal(chopstick[i]);
    signal(chopstick[(i+1) % 5]);
    /* think for awhile */
} while (true);
```

### Problema: deadlock!

> **O que acontece se todos ficarem com fome ao mesmo tempo?**
> Se todos agarrarem **primeiro o pauzinho da esquerda**, ao tentarem agarrar o da direita ficam **bloqueados para sempre** — **deadlock**!

### Possíveis remédios

- **Permitir no máximo 4 filósofos sentados em simultâneo** à mesa.
- **Solução assimétrica**: filósofos com índice **ímpar** agarram primeiro o esquerdo e depois o direito; filósofos com índice **par** agarram primeiro o direito e depois o esquerdo.

> **Atenção:** uma solução **livre de deadlock não é necessariamente livre de starvation**. Uma solução satisfatória tem de prevenir as duas coisas.

---


<br>

<div align="center">

<table border="0" width="100%">
<tr>
<td align="center" style="padding:18px;background:linear-gradient(135deg,#ef444422 0%,#ef444411 100%);border-left:6px solid #ef4444;border-radius:8px;">

<sub style="color:#ef4444;letter-spacing:4px;font-weight:700;">▌ Parte VI ▐</sub>

### DEADLOCKS

<sub><i>4 condições, RAG, Banker, prevention, detection, recovery</i></sub>

</td>
</tr>
</table>

</div>

<br>

## 81. Caracterização de Deadlock — 4 Condições Necessárias

Um deadlock só pode ocorrer se as **4 condições seguintes acontecerem em simultâneo**:

1. **Mutual exclusion** — Só um processo pode usar um recurso de cada vez (um pedido tem de esperar até o recurso ser libertado).
2. **Hold and wait** — Um processo que **detém pelo menos um recurso** está à espera de adquirir recursos adicionais detidos por outros processos.
3. **No preemption** — Um recurso **não pode ser preemptado** — só pode ser libertado **voluntariamente** pelo processo que o detém, depois de este completar a sua tarefa.
4. **Circular wait** — Existe um conjunto de processos `{P1, P2, …, PN}` em espera tal que P1 espera por um recurso de P2, P2 por um recurso de P3, …, PN-1 por um recurso de PN, e PN por um recurso de P1.

> Se **qualquer uma destas falhar**, **não há deadlock**. É exatamente isto que motiva os métodos de prevenção.

---

## 82. Resource Allocation Graph

Os deadlocks podem ser descritos com um **grafo dirigido** chamado **resource allocation graph**, com **vértices V** e **arestas E**.

### V — vértices, em duas categorias

- **P = {P1, P2, …, PN}** — todos os processos do sistema (representados por **círculos**).
- **R = {R1, R2, …, RM}** — todos os tipos de recursos do sistema (representados por **quadrados**, com um **ponto por instância**).

### E — arestas, em duas categorias

- **Er (request edges)** — `Pi → Rj` significa que o processo `Pi` pediu uma instância do tipo `Rj` e está a esperar.
- **Ea (assignment edges)** — `Rj → Pi` significa que uma instância de `Rj` foi atribuída ao processo `Pi`.

### Exemplo do slide (sem deadlock)

```
P  = {P1, P2, P3}
R  = {R1, R2, R3}
Er = {P1 → R1, P2 → R3}
Ea = {R1 → P2, R2 → P1, R2 → P2, R3 → P3}
```

Estados:
- P1 detém uma instância de R2 e espera uma de R1.
- P2 detém uma instância de R1, uma de R2, e espera uma de R3.
- P3 detém uma instância de R3.

### Exemplo com deadlock

Se P3 fizer agora um request de R2 (e R2 não tiver instâncias livres), adicionamos `P3 → R2` e ficamos com **dois ciclos**:
- `P1 → R1 → P2 → R3 → P3 → R2 → P1`
- `P2 → R3 → P3 → R2 → P2`

Os processos P1, P2 e P3 estão **deadlocked**:
- P1 espera R1, detido por P2.
- P2 espera R3, detido por P3.
- P3 espera R2 (qualquer instância), detido por P1 ou P2.

### Exemplo com ciclo mas SEM deadlock

Considera um grafo com o ciclo `P1 → R1 → P3 → R2 → P1`, mas em que **R1 tem outra instância detida por P2** e **R2 tem outra instância detida por P4**.

- Se P2 libertar a sua instância de R1, ela pode ser dada a P1 e o ciclo quebra-se.
- Alternativamente, se P4 libertar a instância de R2, ela vai para P3 e o ciclo quebra-se.

> Ou seja, **a existência de um ciclo não chega para concluir que há deadlock** quando os recursos têm múltiplas instâncias.

---

## 83. Resumo — Cycles vs Deadlocks no Grafo

| Estado do grafo | Conclusão |
|-----------------|-----------|
| **Não tem ciclos** | **Não há deadlock** |
| **Tem ciclo** | **Pode haver deadlock** |
| Ciclo em recursos com **uma única instância** | **Há deadlock** |
| Ciclo em recursos com **várias instâncias** | **Não implica deadlock** |

> Um ciclo é uma **condição necessária mas não suficiente** para a existência de deadlock.

---

## 84. Métodos para lidar com Deadlocks

Para garantir que **deadlocks nunca ocorrem**, o sistema pode usar:
- **Deadlock prevention** — Impede que pelo menos uma das 4 condições necessárias se verifique, restringindo a forma como os pedidos de recursos podem ser feitos.
- **Deadlock avoidance** — Exige que o SO receba **informação adicional à partida** sobre que recursos cada processo vai pedir e usar, para decidir se um pedido pode ser satisfeito ou tem de esperar.

Se não usar nenhum dos dois, o sistema pode entrar em deadlock e:
- **Deadlock detection** — Periodicamente examina o estado do sistema para ver se houve deadlock e, se sim, dispõe de algoritmos para **recovery**.

### E se ignorarmos o problema?

Sem nenhum destes métodos, o sistema pode entrar em deadlock sem o saber:
- A performance **degrada-se** porque há recursos detidos por processos que não correm e cada vez mais processos entram em deadlock à medida que pedem os mesmos recursos.
- Eventualmente o sistema **deixa de funcionar** e tem de ser reiniciado manualmente.
- **Mas:** ignorar é **mais barato** que os outros métodos. Se os deadlocks forem raros, pode compensar — métodos para outras condições (crash, reset) podem servir também para recuperar do deadlock.

---

## 85. Deadlock Prevention

A estratégia: **garantir que pelo menos uma das 4 condições necessárias não se verifica**.

### Prevenir Mutual Exclusion

> Tornar todos os recursos **partilháveis** — nenhum processo precisa de esperar.

**Problema:** **não é realista** — alguns recursos são intrinsecamente não-partilháveis (ex.: um mutex lock não pode ser partilhado).

### Prevenir Hold and Wait

> Garantir que sempre que um processo pede recursos, **não está a deter outros**.

Duas formas:
1. Exigir que o processo **peça todos os recursos antes de começar a executar** (problema: previsão difícil, processos sobre-estimam).
2. Alternativamente, exigir que o processo **liberte todos os recursos que detém antes de pedir mais**.

**Problema:** **baixa utilização de recursos** e **starvation possível**.

### Prevenir No Preemption

> Permitir libertação voluntária de recursos.

Duas variantes:
1. Se um processo P falha ao alocar recursos, **libertam-se todos os recursos que ele detém** e só quando puder readquirir tudo (antigos + novos) é reiniciado.
2. Alternativamente, se P falha, vê-se se outros processos que estão à espera detêm os recursos desejados — e se sim, **preempta-se** os recursos deles e dão-se a P.

**Problema:** **não funciona em geral** com recursos como mutex locks e semáforos.

### Prevenir Circular Wait

> Impor uma **ordem total** sobre todos os tipos de recursos e exigir que cada processo peça os recursos por **ordem crescente de enumeração**.

**Problema:** os programadores **podem não seguir** essa ordem.

---

## 86. Deadlock Avoidance e Safe State

Os métodos de avoidance precisam de **informação a priori** sobre os recursos que cada processo vai precisar durante a sua vida.

- O método mais simples e útil exige que cada processo **declare o número máximo de recursos de cada tipo que pode vir a precisar**.
- Quando um processo pede um recurso, o SO decide se a alocação imediata **deixa o sistema num safe state**.

### Estados

- **Safe state** ⇒ **não há deadlock**.
- **Unsafe state** ⇒ **possibilidade de deadlock** (não significa que vá ocorrer).

> Esquematicamente: **deadlock ⊂ unsafe ⊂ todos os estados**. Um estado seguro nunca leva a deadlock; um estado inseguro **pode** levar.

### Definição formal de Safe State

Um sistema está num **safe state** se existir uma **safe sequence** `<P1, P2, …, PN>` tal que, para cada `Pi`, os recursos que `Pi` ainda pode pedir podem ser satisfeitos pelos **recursos atualmente disponíveis** mais os **recursos detidos por todos os Pj com j < i**.

### Algoritmos de avoidance

- Se cada tipo de recurso tem **uma única instância** → **Resource allocation graph**.
- Se há **múltiplas instâncias** → **Banker's algorithm**.

### Exemplo de safe state (slide 73)

| Processo | Allocation (A B C) | Need (A B C) | Available (A B C) |
|----------|--------------------|--------------|-------------------|
| P0 | 0 1 0 | 7 4 3 | **2 3 0** |
| P1 | 3 0 2 | 0 2 0 | |
| P2 | 3 0 2 | 6 0 0 | |
| P3 | 2 1 1 | 0 1 1 | |
| P4 | 0 0 2 | 4 3 1 | |

A sequência `<P1, P3, P4, P0, P2>` satisfaz o requisito de safety, logo o sistema **está num safe state** e podemos conceder o pedido de P1.

> Como verificar: começa-se com Available = (2, 3, 0). P1 só precisa de (0, 2, 0) → cabe; após terminar liberta (3, 0, 2). Fica (5, 3, 2). Continuar com P3 (precisa 0,1,1), P4 (precisa 4,3,1) etc. Cada um cabe nos recursos disponíveis, logo a sequência é válida.

---

## 87. Deadlock Detection

Sem prevention nem avoidance, o sistema **pode** entrar em deadlock. Nesses casos:
- Pode invocar **periodicamente** um algoritmo que examina o estado do sistema e determina se houve deadlock.
- Pode disponibilizar um **algoritmo de recovery**.

### Quando invocar o algoritmo de detection?

- **A cada pedido de recurso** → muito **overhead**.
- **Arbitrariamente** (ex.: de hora a hora) → o grafo pode ter **muitos ciclos** quando se chega lá, impossibilitando saber **qual processo causou o deadlock**.

### Exemplo do slide 75 (há deadlock?)

| Processo | Allocation (A B C) | Request (A B C) | Available (A B C) |
|----------|--------------------|-----------------|-------------------|
| P0 | 0 1 0 | 0 0 0 | **0 0 0** |
| P1 | 2 0 0 | 2 0 2 | |
| P2 | 3 0 3 | 0 0 1 | |
| P3 | 2 1 1 | 1 0 0 | |
| P4 | 0 0 2 | 0 0 2 | |

- Available = (0, 0, 0).
- P0 não pede nada → reclamamos a sua allocation: (0, 1, 0). Available passa a (0, 1, 0).
- Mas (0,1,0) **não chega para satisfazer** o request de nenhum dos outros (P1 quer 2,0,2; P2 quer 0,0,1; P3 quer 1,0,0; P4 quer 0,0,2).
- Logo **existe deadlock** envolvendo **P1, P2, P3 e P4**.

---

## 88. Recovery from Deadlock

### Estratégia 1 — Abortar processos

Duas formas:
- **Abortar todos os processos em deadlock** → resultados das computações parciais perdidos, podem ter de ser recalculados.
- **Abortar um processo de cada vez até quebrar o deadlock** → **considerável overhead** (corre o algoritmo de detection após cada abort).

**Em que ordem escolher quem abortar?**
- **Prioridade** do processo.
- **Tempo já computado** e quanto falta para completar.
- **Recursos usados** pelo processo.
- **Recursos necessários** para terminar.
- **Quantos processos** vão ter de ser terminados.

### Estratégia 2 — Preemptar recursos sucessivamente

Tirar recursos a processos e dá-los a outros até quebrar o deadlock. **Três questões:**

- **Selecting a victim** — minimizar custo (número de recursos detidos, tempo já consumido).
- **Rollback** — devolver o processo a um safe state e reiniciar a partir daí. Como em geral é difícil determinar qual é esse safe state, a solução mais simples é o **total rollback** (abortar e reiniciar do zero).
- **Starvation** — pode acontecer que o **mesmo processo seja sempre escolhido como vítima**. Solução comum: incluir o **número de rollbacks** no fator de custo.

---

## Resumo Rápido para o Teste

### Parte I — Linguagem C — coisas para nunca esquecer

1. **4 fases de compilação:** Pré-processador → Compilador → Linker → Loader (P-C-L-L).
2. **Flags gcc:** `-o` nome, `-Wall` warnings, `-g` debug, `-c` só compilar (sem link), `-l<lib>` linkar biblioteca.
3. **C usa call by value por defeito** — para alterar variáveis dentro de funções, passa apontadores.
4. **Byte zero (`\0`) no fim das strings** — sempre alocar 1 byte extra.
5. **`malloc` no heap, variáveis locais na stack** — não devolver apontadores para variáveis locais.
6. **Sempre fazer `free`** após `malloc`. **Verificar se `malloc` devolveu `NULL`**.
7. **Operador `->` para campos via apontador**, `.` para campo direto.
8. **Switch sem `break` → fall-through** (NÃO há break implícito).
9. **Pré-processador faz substituição de texto** antes da compilação.
10. **Linkagem estática = tudo no binário**; dinâmica = carregada em runtime. Linker é "inteligente" — só inclui `.o` realmente usados.
11. **`argc` inclui o nome do programa**, por isso `argc == 1` quando não há argumentos.
12. **`if (cond)` em C: `0` ou `NULL` é falso, qualquer outra coisa é verdadeiro.**

### Parte II — Conceitos de SO — coisas para nunca esquecer

1. **SO = gestor do hardware** + facilitador para os programas.
2. **4 componentes principais:** processos, memória, armazenamento, I/O.
3. **Foco do SO depende do tipo:** mainframe→utilização; PC→ease of use; mobile→bateria; embedded→autonomia.
4. **Multiprogramming** maximiza **utilização do CPU**; **Multitasking** maximiza **tempo de resposta**.
5. **Boot:** firmware (ROM) → carrega kernel → arranca system processes (ex.: `init`).
6. **Interrupções:** podem vir do **hardware** (sinal ao CPU) ou do **software** (system call ou fault).
7. **Interrupt vector** guarda os endereços das ISRs (interrupt service routines).
8. **Polling vs interrupts:** polling desperdiça CPU; interrupts são event-driven.
9. **Disable interrupts** = ferramenta para garantir atomicidade em código kernel curto.
10. **Nested interrupts:** ISRs podem ser interrompidas por interrupts mais prioritários.
11. **Faults (exceptions):** divisão por zero, page fault, instrução ilegal — interrupção de software disparada por erro.
12. **Device controller** = hardware; **device driver** = software (interface uniforme para o SO).
13. **DMA** evita ter o CPU envolvido em cada byte → **uma só interrupção por bloco**.
14. **Timer** protege o SO de programas que não devolvem o controlo.
15. **Dual-mode (user/kernel)** com **mode bit**: instruções privilegiadas só correm em kernel mode.
16. **System call = trap** que muda para kernel mode; o **return** volta a user mode.
17. **APIs (POSIX, Win32, Java)** são preferíveis às system calls diretas (portabilidade + simplicidade).
18. **6 categorias de system calls:** process control, file manipulation, device manipulation, information maintenance, communication, protection.

### Parte III — Processos — coisas para nunca esquecer

1. **Processo = programa em execução** (entidade ativa). Programa = entidade passiva.
2. **Address-space** = text + data + heap + stack. **TEXT é read-only e partilhável**; data/heap/stack privados.
3. **PCB** = state, PID, PC, registers, scheduling info, memory info, I/O info, accounting.
4. **5 estados:** new, ready, running, waiting/blocked, terminated. **Só um running por CPU**.
5. **Transições:** `TI` (running→ready), `I/O` (running→waiting), `HI` (waiting→ready), `dispatch` (ready→running). NÃO há waiting→running directo.
6. **Context switch é puro overhead** — guarda PCB do antigo, carrega PCB do novo. Triggers: timer, syscall bloqueante, interrupt, voluntary yield.
7. **Mode switch (user↔kernel) ≠ context switch**: mode switch é mais leve (só mode bit + alguns regs).
8. **`fork()`** retorna **0 no filho** e **PID do filho no pai**. Filho começa como cópia do pai. **Pode falhar** (-1) se sistema esgotar recursos.
9. **Pipes antes de `fork()`** — para o filho herdar os file descriptors do pipe.
10. **Copy-on-write (COW)**: pai e filho partilham páginas read-only; só são copiadas no primeiro write. Torna `fork()+exec()` quase grátis.
11. **`exec()`** substitui o address-space mas **mantém o PCB** (mesmo PID).
12. **`wait()`** no pai recolhe o exit status do filho e o seu PID.
13. **Zombie** = filho terminou e o pai não fez `wait()`. **Orphan** = pai morreu antes do filho → adotado pelo `init`.
14. **Cascading termination**: alguns SO matam os filhos quando o pai sai.
15. **Process groups e sessions:** para aplicar sinais/I/O ao grupo (ex.: `Ctrl+C` envia SIGINT ao grupo de foreground).
16. **Daemon** = processo de longa duração em background, sem terminal.
17. **2 modelos de IPC:** **message passing** (kernel intervém, funciona em rede) e **shared memory** (mais rápido, problemas de sincronização).
18. **`pipe(fd[2])`**: `fd[0]` read-end, `fd[1]` write-end. **Unidirecional**. Filho **herda** os file descriptors após `fork()`.

### Parte IV — Escalonamento — coisas para nunca esquecer

1. **Execução = ciclos CPU burst + I/O burst**. **CPU-bound** (bursts longos) vs **I/O-bound** (bursts curtos). Schedulers tipicamente favorecem I/O-bound.
2. **Hardware timer interrupts** são essenciais para scheduling preemptivo.
3. **Não-preemptivo** = só decide nas situações 1 e 4 (running→waiting e termina). **Preemptivo** = decide nas 4 situações.
4. **Critérios:** maximizar CPU utilization e throughput; **minimizar** turnaround, waiting e response time.
5. **FCFS:** simples, FIFO, não-preemptivo. **Convoy effect** (curtos atrás de longos).
6. **RR:** FCFS preemptivo com quantum Q. Q grande ≈ FCFS; Q pequeno → muito context switching.
7. **SJF é ÓTIMO** em average waiting time. **SRTF** = SJF preemptivo. Sofre de **starvation**.
8. **Previsão do próximo burst:** `τ(n+1) = α·t(n) + (1−α)·τ(n)`, com `α = 1/2` típico.
9. **Priority scheduling:** maior prioridade ganha. Risco de **starvation** → mitigar com **aging**.
10. **Priority inversion:** baixa prioridade detém lock → alta prioridade fica bloqueada → média prioridade preempta a baixa. Solução: **priority inheritance** ou **priority ceiling**.
11. **MLQ:** filas separadas, processos **fixos** numa fila. Cada fila com seu algoritmo. Sched entre filas: fixed priority ou time slice.
12. **MLFQ:** processos **mudam de fila**; CPU-bound caem, I/O-bound sobem; aging previne starvation. Aproxima SRTF na prática.
13. **CFS (Linux):** classes (Real-Time 0–99, Normal 100–139). Normal escalonado pelo **menor virtual runtime** (afetado por **nice ∈ [-20, +19]**).
14. **CFS sem time slice fixo:** task corre **até deixar de ser a mais injustamente tratada** (vruntime ≥ outra). **Target latency** garante que cada task corre pelo menos uma vez.
15. **Real-time scheduling:** **Rate Monotonic** (prioridade fixa, inversa ao período) e **Earliest Deadline First** (prioridade dinâmica, deadline mais próximo).
16. **Cálculos de waiting time:** `WT = tempo na ready queue` (não conta tempo a executar nem em I/O). Para cada processo: `WT = completion - arrival - burst_total`.

### Parte V — Sincronização de Processos — coisas para nunca esquecer

1. **Critical section** = código que acede a recurso partilhado. Só um processo de cada vez.
2. **Race condition** = resultado depende da ordem de execução; quase sempre indesejado.
3. **Atomic ops** (load/store, test_and_set, compare_and_swap) são o **bloco fundamental**.
4. **3 requisitos** de uma solução: **Mutual Exclusion + Progress + Bounded Waiting**.
5. **Solução de Peterson**: usa `flag[2]` e `turn`. **Funciona para 2 processos**, ainda usa busy waiting. Satisfaz os 3 requisitos.
6. **Disable interrupts** funciona em **uniprocessador**, não escala para multiprocessador, e não pode ser dado aos utilizadores.
7. **`test_and_set(t)`** = lê o valor antigo de `t`, mete `true`, devolve o antigo. **`compare_and_swap(t, exp, new)`** = troca por `new` só se `t == exp`.
8. **Mutex com test_and_set** garante **mutual exclusion + progress**, mas **não bounded waiting** sem array `waiting[]`.
9. **Mutex Lock** é a primitiva: `init`, `acquire`, `release`. Operações têm de ser atómicas.
10. **Spinlock** = mutex com busy waiting. Bom em multiprocessador para locks curtos. Mau em multiprogramação.
11. **Não dá para eliminar busy waiting**, mas dá para **minimizá-lo** — usar fila + `suspend()`.
12. **Mutex em uniprocessador** = `disable interrupts` à entrada/saída. **Em multiprocessador** = `disable interrupts` + `guard` com `test_and_set`.
13. **Truque do `release`:** quando há fila, **não se liberta o lock** — passa-se diretamente a propriedade ao próximo da fila.
14. **Semáforo** = inteiro especial, **não negativo**, só com `wait()` e `signal()`. **Counting** ou **binary**.
15. **`wait(S)`**: espera S>0, decrementa. **`signal(S)`**: incrementa. Ambas atómicas.
16. **Implementação real do semáforo** = igual ao mutex (interrupts + guard + queue).
17. **Starvation** = espera infinita possível. **Deadlock** = espera infinita garantida (precisa intervenção). **Deadlock ⇒ starvation**, não vice-versa.
18. **Bounded Buffer**: `mutex=1`, `empty=n`, `full=0`. **Ordem dos `wait()` importa** (deadlock se invertida); **ordem dos `signal()` não**.
19. **Readers-Writers (Var I)**: `rw_mutex` para writers; `mutex` + `read_count` para readers; **primeiro reader bloqueia writers**, **último reader liberta-os**. Pode causar **starvation dos writers**.
20. **Dining Philosophers**: agarrar `chopstick[i]` e `chopstick[(i+1)%5]`. Versão direta sofre **deadlock** se todos agarrarem o mesmo lado. Remédios: limitar a 4 filósofos, ou solução **assimétrica** (par/ímpar).

### Parte VI — Deadlocks — coisas para nunca esquecer

1. **4 condições necessárias** (têm de se verificar **todas** ao mesmo tempo): **Mutual Exclusion + Hold and Wait + No Preemption + Circular Wait**.
2. **Resource Allocation Graph**: processos = círculos, recursos = quadrados (1 ponto por instância), **request edge** P→R, **assignment edge** R→P.
3. **Sem ciclo ⇒ sem deadlock.** **Com ciclo ⇒ pode haver deadlock.** Em recursos com **instância única**, ciclo ⇒ deadlock. Com várias instâncias, não basta.
4. **Prevention**: negar uma das 4 condições. Cada uma tem trade-off: utilização baixa, starvation, ou impraticabilidade.
5. **Avoidance**: precisa de **informação à partida** (ex.: max necessidade). Decide se um pedido leva a **safe state**. Algoritmos: **resource allocation graph** (1 instância), **Banker's** (várias).
6. **Safe state** = existe sequência segura `<P1,...,Pn>` em que cada Pi consegue todos os seus recursos com Available + Allocation dos anteriores. **Safe ⇒ no deadlock**, **unsafe ⇒ pode haver deadlock**.
7. **Detection**: corre periodicamente. Verifica se Available + Allocation de quem termina chega para satisfazer Request de outros. Quem fica sem ser servido está em deadlock.
8. **Recovery**: ou **abortar processos** (todos ou um a um) ou **preemptar recursos** (selecting victim, rollback, evitar starvation incluindo nº rollbacks no custo).
9. **Ignorar deadlocks** é o método mais barato — usado em sistemas onde são raros (Linux, Windows, ...).



<br>

<div align="center">

<table border="0" width="100%">
<tr>
<td align="center" style="padding:24px;background:linear-gradient(135deg,#1F386422 0%,#2E75B611 100%);border-radius:8px;">

<sub style="letter-spacing:3px;">🎓 &nbsp; FIM DO GUIA &nbsp; 🎓</sub>

#### Boa sorte no exame!

<sub><i>Documento de estudo — Sistemas de Operações 2025/2026 — FCUP</i></sub>

</td>
</tr>
</table>

</div>
