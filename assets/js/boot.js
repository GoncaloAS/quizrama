/**
 * Boot — entry-point. Tem de ser carregado depois de todos os outros scripts.
 *
 * Tenta restaurar sessão persistida; se falhar, inicia um quiz novo.
 */
if(loadState()){
  buildTopicFilter();
  render();
  showToast("📖 Resumed your previous session");
} else {
  init();
}
