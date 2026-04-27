/**
 * Banco de perguntas — Exame · Parte I
 * Total: 2 perguntas.
 *
 * Esquema de cada entrada:
 *   [topic, id, questionHtml, [4 options], correctIdx, explanationHtml, hintHtml?]
 */
/* eslint-disable */
const Q_EXAME_PARTE_I = [
  [
    "Exame · Parte I",
    "422",
    "O programa seguinte recebe o nome de dois ficheiros como argumentos e:<br><br><pre style=\"background:#0a0e1a;padding:10px;border-radius:6px;font-size:.85em;color:#a5c1ff;border:1px solid rgba(91,138,240,.15);overflow-x:auto;\">int main(int argc, char* argv[]) {<br>  FILE* fp1 = fopen(argv[1], \"r\");<br>  FILE* fp2 = fopen(argv[2], \"w\");<br>  if(fp1 == NULL) { /* error action */ }<br>  if(fp2 == NULL) { /* error action */ }<br>  while( (ch = fgetc(fp1)) != EOF)<br>    fputc(f2,ch);<br>  fclose(fp2);<br>  fclose(fp1);<br>  return 0;<br>}<br></pre>",
    [
      "concatena o conteúdo do primeiro ao do segundo.",
      "substitui o conteúdo do primeiro pelo o do segundo.",
      "substitui o conteúdo do segundo pelo o do primeiro.",
      "—",
    ],
    2,
    "<b>(C) ✓ correcta:</b> fp1 está em modo \"r\", fp2 em modo \"w\" (que trunca). Lê de fp1, escreve em fp2 → o segundo ficheiro fica com o conteúdo do primeiro.\n\n<b>(B) ✗</b>: lê-se de fp1 (1º) e escreve-se em fp2 (2º) — não substitui o 1º.\n\n<b>(A) ✗</b>: \"w\" trunca o destino, não concatena. Concatenar requer \"a\".",
    "Lê de fp1 (modo \"r\") e escreve em fp2 (modo \"w\" → trunca/reescreve). Logo, o segundo ficheiro fica com o conteúdo do primeiro.<br><a href=\"sistemas_operacoes_estudo__2_.html#13-bibliotecas-em-c\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §13 Bibliotecas em C ↗</a>",
  ],
  [
    "Exame · Parte I",
    "465",
    "O seguinte programa recebe o nome de dois ficheiros como argumentos e:<br><br><pre style=\"background:#0a0e1a;padding:10px;border-radius:6px;font-size:.85em;color:#a5c1ff;border:1px solid rgba(91,138,240,.15);overflow-x:auto;\">int main(int argc, char* argv[]) {<br>  FILE* fp1 = fopen(argv[1], \"w\");<br>  if(fp1 == NULL) { /* error action */ }<br>  FILE* fp2 = fopen(argv[2], \"r\");<br>  if(fp2 == NULL) { /* error action */ }<br>  int bytes_read;<br>  char buffer[BUFFER_SIZE];<br>  while( (bytes_read = fread(buffer, 1, BUFFER_SIZE, fp2)) != 0)<br>    fwrite(buffer, 1, bytes_read, fp1);<br>  fclose(fp2);<br>  fclose(fp1);<br>  return EXIT_SUCCESS;<br>}<br></pre>",
    [
      "substitui o conteúdo do segundo pelo do primeiro.",
      "concatena o conteúdo do segundo com o do primeiro.",
      "substitui o conteúdo do primeiro pelo do segundo.",
      "—",
    ],
    2,
    "<b>(C) ✓ correcta:</b> fp1 está em \"w\" (truncado) e fp2 em \"r\". Lê de fp2, escreve em fp1 → o primeiro fica com o conteúdo do segundo.\n\n<b>(A) ✗</b>: invertido — fp1 é destino.\n\n<b>(B) ✗</b>: \"w\" trunca, não concatena.",
    "fp1 está aberto em \"w\" (truncado para escrita), fp2 em \"r\" (leitura). Lê-se de fp2 e escreve-se em fp1 → o primeiro ficheiro fica com o conteúdo do segundo.<br><a href=\"sistemas_operacoes_estudo__2_.html#13-bibliotecas-em-c\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §13 Bibliotecas em C ↗</a>",
  ],
];
