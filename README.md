# RS Connect — Landing Cinematográfica React + TypeScript (Motion V3)

Nova landing independente da plataforma **RS Connect**, construída em **React 19 + TypeScript + Vite 7**, com CSS autoral e vídeo MP4 local. Inspirada na identidade visual do projeto RS Connect original e na versão Motion V2; preserva os tons de azul, ciano e roxo, a marca oficial e a linguagem de atendimento, CRM, agenda, IA e automações.

## O que foi entregue

- Abertura escura com vídeo tecnológico em loop sem áudio, luzes, profundidade, título revelado palavra por palavra e hover 3D.
- Navegação responsiva, menu mobile, indicador de rolagem e botão para voltar ao topo.
- Demonstração visual de atendimento com mensagens ilustrativas que alternam automaticamente.
- Jornada com três capítulos ativados durante a rolagem: WhatsApp, IA e CRM.
- Contadores animados ao rolar, seis módulos que surgem e inclinam com o cursor e seção interativa com linha de progresso em quatro etapas.
- CRM em Kanban ilustrativo com destaque progressivo entre colunas.
- Perguntas frequentes, chamada comercial com anéis giratórios e ligações para o login existente; o rodapé permanece estático.
- Painel lateral de demonstração em duas etapas, aberto pelos CTAs comerciais, com confirmação simulada e acessível em celular.
- Controle global para **pausar/retomar movimento** e respeito ao modo de movimento reduzido do sistema.

**Atenção:** telas, nomes de contatos, mensagens, funis e confirmação do formulário são **demonstrações fictícias**, não dados reais do sistema. O formulário não envia nem armazena dados e ainda precisa de um destino seguro de leads para funcionar comercialmente. A landing não executa mensagens, agendamentos, IA nem cobranças. Os CTAs de acesso apontam para `https://rsdigitallab.com/rsconnect/login`.

## Projeto-fonte

```text
index.html               página de entrada, ícones SVG e metadados
src/App.tsx              componentes React e comportamentos interativos
src/main.tsx             montagem do aplicativo
src/styles.css           visual cinematográfico, responsividade e animações
public/assets/img/       imagens e logos reais da RS Connect
public/assets/video/     vídeo de fundo MP4 (local)
package.json             dependências e scripts de execução
vite.config.ts           configurações de build e assets
Dockerfile               build Node → Nginx
nginx.conf               servidor HTTP 80
```

## Rodar localmente (Node 22 recomendado)

```bash
npm install
npm run dev
```

Abra o endereço indicado pelo Vite (geralmente `http://localhost:5173`). Para validar o build de produção:

```bash
npm run typecheck
npm run build
npm run preview
```

## Subir no EasyPanel via GitHub

1. Crie um **repositório próprio para a landing**, sem substituir o repositório do backend RS Connect.
2. Extraia o ZIP: `Dockerfile`, `package.json`, `index.html`, `src/` e `public/` devem ficar **na raiz** do repositório.
3. Envie para o GitHub (commit e push).
4. Crie uma aplicação no EasyPanel usando **GitHub → repositório da landing → build via Dockerfile**.
5. Defina a **porta interna 80** e configure o domínio/subdomínio da landing.
6. Faça o deploy. O Dockerfile instalará as dependências, executará TypeScript + Vite e publicará apenas `dist/` no Nginx.
7. Confira no domínio público o carregamento do vídeo, as cenas durante a rolagem, o menu móvel, as interações e o botão de pausa.

> O projeto está configurado para o subcaminho **`/rsconnectsystem/`** em `vite.config.ts` e `nginx.conf`. Se publicar na raiz de um domínio, alinhe essas duas configurações antes do deploy.

## Manutenção

- Trocar textos, módulos, etapas ou links: `src/App.tsx`.
- Alterar cores e efeitos: `src/styles.css` (variáveis `:root`).
- Trocar o vídeo: `public/assets/video/rs-connect-cinematic.mp4` (autoral/local; ideal MP4 H.264 sem áudio).
- Alterar logo: `public/assets/img/rs-connect-logo-clara.png` (gerada a partir do ativo original fornecido).
- Ajustar a URL de acesso: constante `LOGIN_URL` no topo de `src/App.tsx`.

## Integridade e limitações

- Nenhum código PHP, banco de dados, webhook ou integração real foi alterado.
- Sem dependências de runtime em CDNs de JavaScript (fontes Google Fonts são opcionais; a página oferece fontes alternativas).
- Os controles de movimento não enviam dados e não exigem contas externas.
- **Validações locais feitas:** `npm run build` (TypeScript e Vite) passou; a troca das cenas foi conferida no navegador em tela móvel, inclusive com a preferência de movimento reduzido ativada. A publicação no EasyPanel/domínio ainda depende do ambiente de deploy.

Consulte `docs/VERIFICACAO.md` para detalhes.
