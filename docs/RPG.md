# Edição 0.6 — aventura RPG jogável

Personagem controlado por WASD/setas ou botões direcionais no celular. Shift ou Correr aumenta a velocidade; E/Interagir conversa; Esc pausa. Ampliar jogo dá mais espaço ao mapa. Há colisões com construções e água, travessia por ponte, NPCs com diálogo, três fragmentos por mundo e portais entre os dois ambientes. A entrega dos fragmentos concede o título Explorador de Órbita. As lições continuam acessíveis diretamente.

A exploração não gera Atlas Coins: cada lição única continua rendendo 20 AC, sem cobrança para aprender. O progresso anterior permanece em orbita-progress-v1. A aventura usa orbita-adventure-v1 e persiste os fragmentos e a conclusão por mundo; posições são mantidas durante a sessão e reiniciadas no ponto de entrada ao recarregar. Apagar meu progresso também remove a exploração. Dados são locais ao navegador, sem conta nem sincronização entre dispositivos.

O jogo pausa ao sair da janela, esconder a página ou tirar o mapa da área visível. Diálogos interrompem o movimento. Movimento reduzido elimina oscilações decorativas e mantém os controles voluntários. A fonte acessível e a pausa de animações permanecem disponíveis.

## Verificação

Teste de domínio criado primeiro e observado falhar pela ausência de game-core.js. Após implementação: 13/13 testes de domínio aprovados. Teste real no Chromium percorreu a ponte, coletou três fragmentos por movimento de teclado, entregou ao guia, abriu uma lição e viajou ao ambiente tecnológico. Verificou colisão, persistência, saldo preservado, botões móveis, soltura dos controles, movimento reduzido, reset e larguras 320/390/768/1440. Corrigida pausa indevida ao ampliar o mapa por estado antigo do observador de visibilidade. Verificada também soltura do controle direcional acionado por Enter.

Regressões browser_test.py, visual_16bit_test.py, coins_test.py e motion_test.py aprovadas. A inspeção visual das capturas é local; não equivale a auditoria completa de acessibilidade. Capturas usam um perfil de teste, não enviado no estado inicial do aplicativo.

## Escopo

MVP de exploração RPG em Canvas, com arte original e conteúdo educacional de amostra. Não inclui combate, multiplayer, áudio ou currículo completo. A diversão e a adequação pedagógica ainda precisam de avaliação com alunos e educadores. A aplicação das skills Harness² e ThigasAI segue o processo documentado em ANIMACOES.md; não foi executado um motor externo de otimização.
