# Verificação — Motion V3 (React + TypeScript)

## Fonte de referência

- Landing Motion V2 aprovada anteriormente como base editorial e de movimento.
- Código do RS Connect original para logo, identidade, paleta e funcionalidades descritas.
- Não foram reutilizados serviços internos, credenciais nem APIs do projeto de aplicação.

## Conferências realizadas no ambiente de criação

| Área | Resultado |
|---|---|
| TSX sintaxe / compilação isolada pelo TypeScript | OK, sem erros de parsing |
| TypeScript semântico com dublês temporários das assinaturas do React | OK, sem erros |
| Renderização de markup no Chromium para QA estática | OK |
| Largura em desktop, 1440px | OK, sem overflow horizontal |
| Largura em mobile, 390px | OK, sem overflow horizontal |
| Logo/PNG na interface estática | OK, imagens carregadas |
| Links internos para seções da landing | Referências presentes |
| Fonte do vídeo MP4 e controles de movimento | Implementados |
| Build npm completo (`npm run build`) | OK — TypeScript e Vite compilados |
| Deploy real no EasyPanel / domínio | PENDENTE — depende do ambiente do usuário |
| Troca das cenas da jornada durante rolagem em tela móvel | OK — conferida com movimento normal e reduzido |
| Movimento de fundo da seção **A solução** (`#solucao`) | OK — luzes continuam em movimento; pausa global e movimento reduzido respeitados |
| Movimento nas seções seguintes | OK — cards e fundo dos módulos, etapas do fluxo e cartões do CRM se movimentam |
| Painel de demonstração em desktop e celular | OK — validação, interesses, confirmação simulada, Escape e CTAs |
| Movimento de fundo na chamada final e no painel | OK — conferido em desktop/celular; pausa global e movimento reduzido respeitados |
| Tela final “O próximo passo começa aqui” | Confirmação ilustrativa final do formulário; não inicia uma demonstração do produto nem envia dados |
| Envio real de leads para o comercial/CRM | PENDENTE — requer um destino seguro, consentimento e política de privacidade |

## Roteiro de homologação recomendado

1. No EasyPanel confirme build da etapa Node (`npm install`, `npm run build`) sem erros e publicação Nginx 80.
2. Abra em desktop e mobile; verifique logo, título com 3 linhas, menus e ausência de rolagem lateral.
3. Veja o vídeo se mover em loop (sem som); clique em **Pausar movimento** e confirme parada; retome.
4. Observe a conversa ilustrativa trocar suas mensagens no painel de abertura.
5. Role as três cenas da jornada e confira as telas de WhatsApp, IA e CRM.
6. Abra **Como funciona**, clique nas 4 etapas e confirme que texto/ícone correspondem à etapa escolhida; teste pausar sequência.
7. Observe o Kanban e as indicações em movimento ao entrar na seção CRM.
8. No celular, abra/feche menu e navegue para a seção Módulos.
9. Nas configurações de acessibilidade do dispositivo, ative **Reduzir movimento**, recarregue e confirme que a leitura continua possível sem animações e que as cenas continuam acompanhando a rolagem.
10. Abra o painel de demonstração pelo menu, pela abertura e pela chamada final; teste campos obrigatórios, interesses, fechar com Escape e confirme o aviso de que os dados não são enviados.
11. Na confirmação “O próximo passo começa aqui”, confirme que a experiência termina ali; o formulário é apenas uma prévia visual, sem envio de leads ou demonstração interativa do produto.
12. Teste links externos e confirme que a landing é **separada** do sistema principal.
