/**
 * Sidebar — drawer mobile + collapse de secções.
 *
 * `toggleSidebar` é chamado pelo botão hambúrguer (`onclick` no HTML)
 * e por listeners aqui registados (click fora, ESC).
 *
 * `toggleSection` é chamado pelo cabeçalho de cada s-section (`onclick` no HTML).
 */
function toggleSidebar(){
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  const isOpen = sidebar.classList.toggle('open');
  if (isOpen) {
    backdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
  } else {
    backdrop.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// Auto-close drawer when a topic filter button is clicked on mobile
document.addEventListener('click', function(e){
  if (window.innerWidth > 900) return;
  if (e.target.closest('.tbtn') || e.target.closest('.hcell')) {
    const sidebar = document.getElementById('sidebar');
    if (sidebar && sidebar.classList.contains('open')) {
      setTimeout(toggleSidebar, 150);
    }
  }
});

// Close drawer with ESC
document.addEventListener('keydown', function(e){
  if (e.key === 'Escape') {
    const sidebar = document.getElementById('sidebar');
    if (sidebar && sidebar.classList.contains('open')) toggleSidebar();
  }
});

function toggleSection(h){
  h.classList.toggle("open");
  const body=h.nextElementSibling;
  body.classList.toggle("hidden");
  h.querySelector("span:last-child").textContent=h.classList.contains("open")?"▾":"▸";
}
