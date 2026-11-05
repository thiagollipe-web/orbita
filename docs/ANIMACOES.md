# Órbita 0.5 — cenários animados

## Entrega

Cenários originais com exploradores em movimento, nuvens, água, partículas suaves e sinal do laboratório; itens das trilhas flutuam discretamente. Botões fixos de 44 × 44 pixels no mapa abrem a próxima missão pendente ou a loja. Concluir uma missão pela primeira vez e adquirir uma insígnia dispara uma breve chuva de pixels. Diálogos e feedback têm entrada curta. Sem som automático, flashes ou mudança nas regras de XP/Atlas Coin.

Botão de pausa persistente; movimento reduzido do sistema desativa as animações e as partículas. Continuam funcionando lições, recompensas e navegação. Os personagens seguem trajetos decorativos; não há movimentação controlada pelo jogador nem um motor RPG. Arte e paleta aprovadas preservadas. A referência 1UPmed não pôde ser aberta nesta sessão; nenhuma comparação direta de sua implementação foi realizada.

## Skills realmente utilizadas

ThigasAI Skills — Codex Web: thigas-ub-mode. Harness²: harness2-auditoria, harness2-ciclo e harness2-codex. Lidas via catálogo de skills. Motor original Harness² não instalado nem executado; não houve alteração de modelo, instalação ou chamada paga de avaliação. A tarefa é de interface, não otimização de agente: usamos os princípios para organizar verificações e explicitar limites.

### Auditoria do fluxo

| Componente | Estado e evidência |
| --- | --- |
| Instruções do projeto | AGENTS.md ausente na pasta Órbita; escopo fornecido na conversa |
| Limites | Pasta isolada; repositório thiagollipe-web/orbita autorizado; sem alteração em objetos |
| Memória | README e relatórios locais; sem gravação de memória global |
| Ferramentas | Node, Python, Chromium e Playwright disponíveis; conector GitHub disponível |
| Subagentes | Não usados |
| Skills | ub-mode e três skills Harness² lidas |
| Scripts | 8 testes Node e suítes Python existentes; novos testes motion e site_integrity |
| Plugins | GitHub para publicar; Library para entrega; fonte da referência inacessível |

### Propor → Testar → Compor

Linha de base medida: 8 testes de domínio aprovados. O novo teste de movimento falhou antes da implementação porque #motion-toggle não existia (vermelho esperado). Não foi medido benchmark comparativo de modelos ou desempenho de harness.

Candidata invariante do fluxo: conferir dependências locais no pacote antes de envio, hipótese de prevenir um módulo novo ausente no deploy. Arquivo tests/site_integrity_test.py; risco baixo, reversível pela remoção do teste. Executada: 14 referências locais encontradas na versão final. Não é uma alteração visual concorrente.

Candidata específica: testar movimento observável, pausa persistente, reduced-motion, navegação pelo mapa, recompensa única e alvos de toque. Arquivo tests/motion_test.py; executada antes (falha esperada) e após (PASS). Hipótese: evita animações incontornáveis e regressões da economia. Riscos: excesso de movimento, duplicação de moeda e arquivo motion.js ausente; probes correspondentes implementados.

Composição: mantidas ambas as verificações complementares. Isto não constitui uma comparação controlada de três agentes/candidatos de modelo; não se alega otimização quantitativa do harness. Sucessor da aplicação verificado com testes e inspeção das capturas.

## Evidências executadas

- npm test: 8/8 PASS, antes e depois.
- tests/browser_test.py: PASS (lições, tentativa, persistência, busca/filtros, reset).
- tests/visual_16bit_test.py: PASS (fonte, cinco larguras, modos de leitura).
- tests/coins_test.py: PASS (migração, loja, saldo, cancelamento, duas abas sequenciais).
- tests/motion_test.py: vermelho por controle inexistente antes; PASS após implementação e após refatoração do atalho para recompensas. Verifica alteração real do transform do personagem entre quadros, pausa, reload, sistema reduzido, atalhos, próxima missão, saldo, efeito e alvos 44px em 320/390/768/1440px.
- tests/site_integrity_test.py: PASS no projeto; repetir no pacote de publicação.
- Capturas reais: animated-desktop.png, animated-mobile.png, animated-scene.png. Capturas são estáticas, não vídeos.

Refatoração: comportamento de movimento isolado em motion.js; função openRewards compartilhada; personagens removidos da pintura estática e renderizados como camadas SVG originais. state.js e regras monetárias inalterados.

crapper, dryer, mutator e uml-viewer ausentes: NÃO VERIFICADO; sem alegações de cobertura, CRAP, mutação ou benchmark FPS. Acessibilidade testada parcialmente, sem auditoria WCAG completa, leitor de tela ou aparelho físico.

Lição local: ao acrescentar módulos ao site estático, testar também a pasta exata enviada ao Pages. Um teste local verde não garante que todos os arquivos foram copiados para publicação.
