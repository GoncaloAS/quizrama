/* eslint-disable no-unused-vars */
/**
 * TOPIC_COLORS — paleta por tópico (usada em badges, dots, barras de erro).
 * Helpers `tc(topic)` e `tb(topic)` devolvem cor de texto e cor de fundo,
 * com fallback em "General OS" se o tópico for desconhecido.
 */
const TOPIC_COLORS = {
  "Scheduling":         {color:"#38bdf8",bg:"rgba(56,189,248,.12)"},
  "Synchronization":    {color:"#a78bfa",bg:"rgba(167,139,250,.12)"},
  "Deadlocks":          {color:"#fb923c",bg:"rgba(251,146,60,.12)"},
  "Memory Management":  {color:"#34d399",bg:"rgba(52,211,153,.12)"},
  "File Systems":       {color:"#fbbf24",bg:"rgba(251,191,36,.12)"},
  "I/O Systems":        {color:"#f472b6",bg:"rgba(244,114,182,.12)"},
  "Processes":          {color:"#60a5fa",bg:"rgba(96,165,250,.12)"},
  "IPC":                {color:"#c084fc",bg:"rgba(192,132,252,.12)"},
  "System Calls":       {color:"#4ade80",bg:"rgba(74,222,128,.12)"},
  "Security":           {color:"#f87171",bg:"rgba(248,113,113,.12)"},
  "General OS":         {color:"#94a3b8",bg:"rgba(148,163,184,.12)"},
  "Linguagem C":        {color:"#5b8af0",bg:"rgba(91,138,240,.12)"},
  "Conceitos Básicos":  {color:"#22c55e",bg:"rgba(34,197,94,.12)"},
  "I/O e Interrupções": {color:"#f472b6",bg:"rgba(244,114,182,.12)"},
  "Processos":          {color:"#f59e0b",bg:"rgba(245,158,11,.12)"},
  "Escalonamento":      {color:"#38bdf8",bg:"rgba(56,189,248,.12)"},
  "Sincronização":      {color:"#a78bfa",bg:"rgba(167,139,250,.12)"},
  "Treino · fork()":     {color:"#ef4444",bg:"rgba(239,68,68,.15)"},
  "Treino · Pipes":      {color:"#ef4444",bg:"rgba(239,68,68,.15)"},
  "Treino · Scheduling": {color:"#ef4444",bg:"rgba(239,68,68,.15)"},
  "Treino · Sinais":     {color:"#ef4444",bg:"rgba(239,68,68,.15)"},
  "Exame · Parte I":    {color:"#fbbf24",bg:"rgba(251,191,36,.18)"},
  "Exame · Parte II":   {color:"#fbbf24",bg:"rgba(251,191,36,.18)"},
  "Exame · Parte III":  {color:"#fbbf24",bg:"rgba(251,191,36,.18)"},
  "Exame · Parte IV":   {color:"#fbbf24",bg:"rgba(251,191,36,.18)"},
  "Exame · Parte V":    {color:"#fbbf24",bg:"rgba(251,191,36,.18)"},
  "Exame · Parte VI":   {color:"#fbbf24",bg:"rgba(251,191,36,.18)"},
};
const tc = t => (TOPIC_COLORS[t]||TOPIC_COLORS["General OS"]).color;
const tb = t => (TOPIC_COLORS[t]||TOPIC_COLORS["General OS"]).bg;
