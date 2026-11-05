# Órbita — edição 16 bits

MVP funcional de aprendizagem gamificada em português brasileiro. Dois ambientes compartilham uma base: Universo escolar e Universo tech. Identidade, cenários PNG em pixel art e seis lições originais criados para este projeto.

## Executar

Requisito: Python 3. Não há dependências para instalar ou compilação.

```bash
cd /workspace/orbita
python3 -m http.server 4173 --bind 127.0.0.1
```

Abra http://localhost:4173. Alternativamente, `npm start` executa o servidor em `0.0.0.0:4173` para acesso pela rede do ambiente. Não abra index.html por file://: módulos JavaScript exigem servidor HTTP. Sem deploy ou push realizado.

## O que funciona

- Navegação por hash entre `#escolar` e `#tecnologia`, filtros por etapa/trilha e busca.
- Seis lições com leitura, questão, feedback, nova tentativa e revisão.
- 50 XP por primeira conclusão; revisão não acumula XP; um novo nível a cada 150 XP.
- Progresso compartilhado entre os ambientes, salvo em localStorage com validação de IDs e remoção de duplicatas. Exclusão exige confirmação.
- Na indisponibilidade do armazenamento, funciona em memória e exibe aviso.
- Layout responsivo, sem chamadas externas, cookies de rastreamento ou cadastro.
- Conteúdo disponível por botões e formulários HTML, foco visível, link para pular navegação, diálogos nativos com Escape, feedback anunciado e preferência por movimento reduzido.

## Conteúdo de amostra

Escolar: frações (Fundamental I), ciclo da água (Fundamental II), argumentação (Médio). Tecnologia: sequências lógicas, HTML, phishing. É um recorte demonstrativo, não cobertura curricular completa. Séries específicas, alinhamento BNCC e adequação por idade precisam de revisão pedagógica antes da expansão.

## Estrutura

- `index.html`: estrutura semântica e diálogos.
- `styles.css`: identidade, responsividade e pixel art complementar.
- `app.js`: interface, navegação e questionários.
- `data.js`: catálogo de lições e ambientes; adicionar conteúdo aqui.
- `state.js`: validação, progresso e XP.
- `tests/`: testes de domínio e fluxo no navegador.
- `docs/`: relatório e capturas reais.

Para acrescentar lições, forneça ID único, ambiente, categoria existente, disciplina, título, descrição, duração, nível, explicações, opções, índice da resposta correta (inicia em zero) e feedback. O conteúdo deve ser revisado; não coloque HTML em campos textuais. A aplicação escapa textos de explicações e respostas; o catálogo restante é conteúdo confiável mantido pelo desenvolvedor, não uma entrada pública.

## Testes

```bash
npm test
# Com o servidor ativo, Playwright Python e Chromium instalados:
python3 tests/browser_test.py
python3 tests/visual_16bit_test.py
python3 tests/coins_test.py
```

O teste de navegador usa `/usr/bin/chromium`; ajuste o caminho em outro sistema. Neste ambiente essas ferramentas já existiam. Não foram instaladas dependências.

Resultados em 2026-11-05: 4 testes de domínio aprovados; fluxo Chromium aprovado em desktop 1440 px e celular 390 px. Capturas em `docs/desktop.png`, `docs/mobile.png` e `docs/lesson.png`. Sem erros JavaScript no fluxo testado. Não foi realizada auditoria WCAG completa, teste em leitores de tela, Safari ou aparelhos físicos.

## Limites e próximos passos

Não há backend, login, sincronização, IA, painel docente, motor RPG jogável, revisão espaçada automática ou PWA/offline. O mapa é uma ilustração; as missões são atividades de leitura e questionário. O progresso local pode ser perdido ao limpar o navegador e não é um registro acadêmico confiável. Não há coleta de nomes, e-mails ou dados de menores; não adicionar essas funções sem desenhar controles de acesso e privacidade adequados. Antes da produção, revisar conteúdo, acessibilidade e requisitos legais aplicáveis. Escolher hospedagem e política de backup se houver backend no futuro.

Licenciamento de distribuição não foi escolhido pelo titular. Nenhum asset ou conteúdo do site de referência foi incluído. A referência foi usada apenas para o conceito descrito na conversa; veja `docs/ANALISE.md`.

## Atualização visual 16 bits

Paleta escura, painéis de RPG com bordas retas, sombras em degraus e tipografia pixelada em toda a interface. Dois cenários originais de 384 × 240 pixels (vila escolar e estação tecnológica), personagens, robô, vegetação, ponte e seis sprites de objetos. Imagens escaladas com `image-rendering: pixelated`.

A fonte Pixelify Sans é distribuída localmente sob SIL Open Font License, incluída em `assets/OFL-PixelifySans.txt`. Origem: https://github.com/google/fonts/tree/main/ofl/pixelifysans. Não há download de fontes durante o uso. O botão “Texto acessível” troca toda a interface para fonte do sistema e salva a preferência, sem alterar o progresso.

O script `assets/create_art.py` reproduz os desenhos originais com Pillow (necessário apenas para regenerar os assets). O site não depende de Python/Pillow para renderizar as imagens prontas. O teste visual adicional usa fontTools para conferir os caracteres portugueses.

Verificação desta edição: os 4 testes de domínio e o fluxo Chromium anterior passaram novamente; testes adicionais passaram em 320, 390, 768, 1024 e 1440 pixels nos dois modos de texto, incluindo diálogos sem overflow e persistência da preferência após reload. Inspeção visual das capturas desktop escolar, desktop tech e mobile escolar. Não equivale a uma auditoria completa WCAG.

“16 bits” descreve a direção de arte retrô; a implementação continua sendo web moderna, com cenários ilustrativos, sem emulador ou movimentação RPG.

## Edição 0.3 — cores vivas

Paleta aplicada à descrição visual fornecida após o download da imagem de referência falhar com HTTP 403. Não houve amostragem direta da imagem neste ambiente. Fundo petróleo/turquesa, cabeçalho e rodapé escuros, painéis verde-água, contornos e botões dourados, texto creme; cenários com ciano, verde-limão, casa amarela e telhado rosado; cartões laranja, ciano e roxo. Composição, conteúdo e regras de progresso preservados.

Assets originais regenerados pelo script de desenho com a nova paleta. Fonte local e modo de texto acessível mantidos. Testes executados novamente: 4/4 de domínio; browser_test.py PASS; visual_16bit_test.py PASS em 320, 390, 768, 1024 e 1440 pixels nos dois modos de leitura. Capturas desktop e móvel atualizadas e inspecionadas. O servidor local antigo respondeu ERR_EMPTY_RESPONSE; foi reiniciado e ambos os testes de navegador passaram em seguida.

Contraste calculado para combinações principais (cores sólidas CSS): texto creme/fundo petróleo 7,36:1; texto dos cartões/painel 5,84:1; link amarelo/banner 4,55:1; texto/banner 4,79:1; texto escuro/botão dourado 8,04:1; resposta selecionada 4,69:1; texto da lição 7,65:1. Verificação parcial, não auditoria completa de acessibilidade.

Nenhum deploy, push ou mudança em outros projetos. Os arquivos anteriores de entrega foram preservados.

## Edição 0.4 — Atlas Coin

Moeda virtual de jogo, sem blockchain, compra com dinheiro, saque ou valor real. Cada missão única concluída rende 20 Atlas Coin além de 50 XP; revisões e respostas incorretas não concedem moedas. Nenhuma atividade cobra moedas. A loja visível oferece três insígnias originais: Gota exploradora (20 AC), Guardião das ideias (40 AC), Inventor de mundos (60 AC). Confirmar uma troca desconta o preço e equipa a insígnia ao lado do XP; cancelar não modifica nada. Equipar/remover itens já adquiridos é gratuito. Não há reembolso de troca virtual; a regra está visível. Saldo insuficiente desabilita a troca e informa quanto falta.

### Migração e integridade local

Mantida a chave `orbita-progress-v1`. O schema anterior `{completed: [...]}` continua aceito. Agora acrescenta `owned` e `equipped`, e o saldo é derivado de conclusões únicas × 20 menos o custo das insígnias adquiridas. Missões antigas contam automaticamente, sem modificar XP nem duplicar crédito ao recarregar. Os três itens custam 120 AC no total, exatamente o que as seis amostras rendem. IDs inválidos, duplicatas e equipamento não adquirido são descartados; inventário sem lastro nas missões é limitado ao saldo disponível. Catálogo e preços ficam em `state.js`; por derivar o gasto do preço atual, mudanças futuras de preço exigem migração para preservar a economia.

A preferência de texto acessível permanece separada. Eventos de armazenamento atualizam outras abas; antes de premiar ou comprar, o estado persistido é relido. É uma proteção local contra estado desatualizado, não uma transação distribuída: gravações exatamente simultâneas entre abas ainda podem causar perda de uma atualização. Não há backend, conta, antifraude ou sincronização entre dispositivos; usuários podem alterar seu armazenamento. Limpar os dados ou confirmar “Apagar meu progresso” remove missões, XP, moedas e insígnias. Se armazenamento falhar, há aviso e o estado pode durar só a sessão.

### Verificação desta edição

`npm test`: 8/8 testes aprovados, incluindo migração, idempotência, saldo insuficiente, troca única, inventário, equipar/remover e compra de todos os itens. `tests/browser_test.py` e `tests/visual_16bit_test.py`: PASS. Novo `tests/coins_test.py`: PASS para migração real do schema antigo, revisão/resposta incorreta sem moeda, cancelar/confirmar troca, desconto, bloqueio por saldo, persistência, insígnia no perfil, saldo compartilhado entre universos, sincronização sequencial em outra aba, reset e ambos os modos de texto em 320, 390, 768 e 1440 px. Sem erros JavaScript capturados. Capturas da loja em desktop e celular inspecionadas. Sem auditoria WCAG completa.

As capturas Atlas Coin exibem um perfil de teste com missões e trocas realizadas. O pacote não inclui dados de aluno nem saldo de teste: um navegador novo inicia em zero. O progresso pré-existente é lido do navegador que o usuário já utiliza, se abrir na mesma origem/porta. Sem publicação, push ou alterações em outros projetos.

## Edição 0.5 — mundo animado

Cenários com movimento, atalhos para próxima missão e recompensas, efeitos de conquista e pausa persistente. Respeita movimento reduzido do sistema. Relatório de implementação, skills e testes em `docs/ANIMACOES.md`. Novos comandos: `python3 tests/motion_test.py` e `python3 tests/site_integrity_test.py`. Sem alterações na economia Atlas Coin.

## Edição 0.6 — aventura RPG

Personagem controlável, corrida, colisões, NPCs, coleta de fragmentos e portais. Use WASD/setas e E, ou os botões no celular. Detalhes e limites em `docs/RPG.md`. Teste: `python3 tests/rpg_test.py`.

## Edição 0.7 — gráficos detalhados

Dois cenários originais em SVG pixel art: biblioteca com telhas, alvenaria, vegetação e rio; estação com cúpula, cidade distante e terminais. Sprites sombreados com quatro orientações, mochila, passos e portal detalhado. A geometria e as regras de progresso permanecem iguais. O script `tools/create_worlds.py` reproduz os cenários sem dependências externas.

Validação: 13 testes de domínio, percurso RPG completo no Chromium, controles móveis, animações e movimento reduzido; ambos os SVG carregados sem erros e sem transbordamento em 320/390/768/1440 px. Capturas locais inspecionadas.

## Paleta viva da referência

Cenários detalhados recoloridos com ciano, turquesa, verde-limão, amarelo e vermelho-rosado, seguindo a descrição da imagem registrada na conversa. Não houve nova amostragem da imagem. Superfícies de leitura em petróleo escuro, textos creme e botões dourados. Geometria e progresso preservados.
