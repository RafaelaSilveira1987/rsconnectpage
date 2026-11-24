# Homologação — Landing RS Connect Motion V2

1. Na abertura, o filme em `assets/video/rs-connect-cinematic.mp4` deve reproduzir em loop, sem áudio, atrás do conteúdo, enquanto títulos e elementos emergem de forma cinematográfica.
2. Verificar o botão **Pausar movimento / Retomar movimento** no canto inferior da abertura. Em pausa, o vídeo e as animações CSS param; ao retomar, o vídeo volta a tocar.
3. Observar a simulação de mensagens mudar no painel a cada ~6,5 segundos quando a abertura está visível. Os dados são ilustrativos.
4. Descer até **O atendimento muda. A jornada continua.** e conferir três capítulos e suas animações: WhatsApp, IA, CRM. A tela da direita acompanha o capítulo predominante no scroll.
5. Em **Como funciona**, a sequência deve mudar automaticamente a cada ~4,3 segundos enquanto visível. Confirmar botões de seleção, teclas de seta e o botão de pausar/reproduzir sequência.
6. Em CRM, observar destaque percorrendo o Kanban quando a seção está visível. Nada é gravado no backend.
7. Desktop e celular: confirmar que não há elementos cortados nem rolagem horizontal; abrir/fechar o menu no celular; abrir FAQ, verificar links para acesso ao sistema e CTA.
8. Em preferências do sistema com movimento reduzido, o vídeo fica parado, os controles automáticos não rodam e o texto das seções permanece acessível.
9. Publicação: a landing deve ficar **separada do backend RS Connect**; não atualizar o repositório PHP nem integrar a landing aos bancos de dados.
10. Atualização de cache: após publicar, abrir em janela anônima e confirmar que o vídeo MP4 e `?v=motion-v2` dos arquivos CSS/JS estão sendo servidos.

Conferência local executada nesta entrega: renderização visual em viewport desktop e mobile, reprodução do vídeo, mudança das três cenas por rolagem, seleção das etapas, menu móvel e acessibilidade de movimento reduzido; nenhum erro JavaScript ou overflow horizontal nessas verificações. Deploy real no EasyPanel não foi executado.
