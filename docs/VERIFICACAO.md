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
10. Teste links externos e confirme que a landing é **separada** do sistema principal.
