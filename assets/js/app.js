/* RS Connect — landing cinematográfica: interação local, sem coleta de dados ou APIs externas. */
(() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const header = $('.site-header');
  const progress = $('.scroll-progress');
  const back = $('.back-to-top');
  const mobileToggle = $('.menu-toggle');
  const nav = $('#primaryNav');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const updateScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('scrolled', y > 35);
    back?.classList.toggle('visible', y > 500);
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
    if (progress) progress.style.width = `${Math.min(100, (y / max) * 100)}%`;
  };
  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  updateScroll();

  const toggleMenu = (open) => {
    nav?.classList.toggle('is-open', open);
    mobileToggle?.setAttribute('aria-expanded', String(open));
    mobileToggle?.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    const use = mobileToggle?.querySelector('use');
    if (use) use.setAttribute('href', open ? '#i-x' : '#i-menu');
  };
  mobileToggle?.addEventListener('click', () => toggleMenu(!nav.classList.contains('is-open')));
  $$('#primaryNav a').forEach((a) => a.addEventListener('click', () => toggleMenu(false)));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') toggleMenu(false); });
  document.addEventListener('click', (event) => { if (nav?.classList.contains('is-open') && !event.target.closest('.nav-shell')) toggleMenu(false); });
  back?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' }));
  const year = $('#year'); if (year) year.textContent = String(new Date().getFullYear());

  const reveal = $$('.reveal');
  if (!('IntersectionObserver' in window) || reduceMotion) reveal.forEach((el) => el.classList.add('in'));
  else {
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
    }), { threshold: .10, rootMargin: '0px 0px -25px 0px' });
    reveal.forEach((el) => io.observe(el));
  }

  const visual = $('#heroVisual');
  const scene = $('.scene-tilt');
  if (visual && scene && !reduceMotion && window.matchMedia('(hover: hover) and (min-width: 951px)').matches) {
    let raf = 0;
    visual.addEventListener('pointermove', (event) => {
      const box = visual.getBoundingClientRect();
      const x = ((event.clientX - box.left) / box.width - .5);
      const y = ((event.clientY - box.top) / box.height - .5);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => scene.style.transform = `rotateY(${-6 + x * 8}deg) rotateX(${3 - y * 6}deg)`);
    }, { passive: true });
    visual.addEventListener('pointerleave', () => { scene.style.transform = 'rotateY(-6deg) rotateX(3deg)'; });
  }

  const flowSteps = $$('#flowSteps .flow-step');
  const flowIcon = $('#flowActiveIcon use');
  const flowTitle = $('#flowTitle');
  const flowDesc = $('#flowDesc');
  const flowDots = $$('.flow-dots span');
  const flowData = [
    { icon:'#i-whatsapp', title:'O primeiro contato já faz parte da jornada', desc:'Mensagens recebidas no canal conectado dão início ao atendimento e podem ser acompanhadas pela equipe.' },
    { icon:'#i-users', title:'Cada conversa ganha mais contexto', desc:'Contatos e histórico ficam organizados para a continuidade entre profissionais e setores, conforme suas permissões.' },
    { icon:'#i-robot', title:'A IA apoia, segundo as regras da empresa', desc:'O agente pode seguir políticas de atendimento configuradas e encaminhar situações que exijam uma pessoa.' },
    { icon:'#i-calendar', title:'A equipe enxerga o que vem depois', desc:'Agenda, CRM e tarefas ajudam a acompanhar solicitações, compromissos e próximos passos do relacionamento.' },
  ];
  const activateStep = (index, focus = false) => {
    const step = flowData[index]; if (!step) return;
    flowSteps.forEach((button,i) => { const active = index === i; button.classList.toggle('active', active); button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1; });
    if (flowIcon) flowIcon.setAttribute('href', step.icon);
    if (flowTitle) flowTitle.textContent = step.title;
    if (flowDesc) flowDesc.textContent = step.desc;
    flowDots.forEach((dot,i) => dot.classList.toggle('on', index === i));
    if (focus) flowSteps[index].focus();
  };
  flowSteps.forEach((button, i) => {
    button.addEventListener('click', () => activateStep(i));
    button.addEventListener('keydown', (event) => {
      if (!['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const index = event.key === 'Home' ? 0 : event.key === 'End' ? flowSteps.length - 1 : (i + ((event.key === 'ArrowDown' || event.key === 'ArrowRight') ? 1 : -1) + flowSteps.length) % flowSteps.length;
      activateStep(index, true);
    });
  });

  // Filme original local, controles de movimento e respeito a preferências de acessibilidade.
  const heroFilm = $('#heroFilm');
  const motionToggle = $('#motionToggle');
  const motionToggleLabel = $('#motionToggleLabel');
  let userPaused = reduceMotion;
  const visibility = { hero: true, chat: true, flow: false, crm: false };
  if (reduceMotion) {
    heroFilm?.pause();
    motionToggle?.setAttribute('hidden', '');
  }
  const setMotionPaused = (paused) => {
    userPaused = paused;
    document.documentElement.classList.toggle('motion-paused', paused);
    motionToggle?.setAttribute('aria-pressed', String(paused));
    motionToggle?.setAttribute('aria-label', paused ? 'Retomar animações' : 'Pausar animações');
    if (motionToggleLabel) motionToggleLabel.textContent = paused ? 'Retomar movimento' : 'Pausar movimento';
    if (heroFilm) {
      if (paused || document.hidden || !visibility.hero) heroFilm.pause();
      else heroFilm.play().catch(() => {});
    }
  };
  motionToggle?.addEventListener('click', () => setMotionPaused(!userPaused));
  // Pausa o processamento de animações fora da tela, sem retirar os recursos existentes.
  const observeVis = (selector,key) => {
    const el = $(selector);
    if (!el || !('IntersectionObserver' in window)) return;
    const ob = new IntersectionObserver(([entry]) => {
      visibility[key] = entry.isIntersecting;
      if (key==='hero') {
        if (entry.isIntersecting && !userPaused && !document.hidden) heroFilm?.play().catch(() => {});
        else heroFilm?.pause();
      }
    },{threshold: .08});
    ob.observe(el);
  };
  observeVis('.hero','hero');
  observeVis('.preview-chat','chat');
  observeVis('#fluxo','flow');
  observeVis('#crm','crm');
  document.addEventListener('visibilitychange',() => {
    if (document.hidden) heroFilm?.pause();
    else if (!userPaused && visibility.hero) heroFilm?.play().catch(() => {});
  });

  // Conversas ilustrativas alternadas: demonstração visual, nenhuma mensagem real.
  const chatBubbles = $$('.preview-chat .bubble');
  const conversations = [
    ['Olá! Gostaria de conhecer a solução.','Olá! 👋 Como podemos ajudar você hoje?','Quero organizar meu atendimento pelo WhatsApp.'],
    ['Preciso saber se vocês trabalham com agenda.','Podemos ajudar a organizar solicitações e horários.','Ótimo! Quero entender como funciona.'],
    ['Tenho uma dúvida sobre um orçamento.','Vamos registrar sua solicitação e orientar o próximo passo.','Perfeito, obrigado pelo retorno!'],
  ];
  let chatIndex=0;
  const animateChat=()=>{
    if (userPaused || document.hidden || !visibility.hero || chatBubbles.length!==3) return;
    chatIndex=(chatIndex+1)%conversations.length;
    chatBubbles.forEach(b=>b.classList.add('is-swapping'));
    window.setTimeout(()=>{
      chatBubbles.forEach((b,i)=>{b.textContent=conversations[chatIndex][i];b.classList.remove('is-swapping');});
    },380);
  };
  if (!reduceMotion) window.setInterval(animateChat,6500);

  // Storytelling de scroll: a pessoa passa pelas 3 cenas; nada depende do cursor.
  const journeyBeats = $$('.journey-beat');
  const journeyPanes = $$('.journey-pane');
  const journeyBars = $$('.journey-stage-bar span');
  const journeyCount = $('#journeyViewerCount');
  let journeyIndex=-1;
  const activateJourney=(index) => {
    if (index===journeyIndex || !journeyBeats[index]) return;
    journeyIndex=index;
    journeyBeats.forEach((beat,i)=>beat.classList.toggle('active',i===index));
    journeyPanes.forEach((pane,i)=>{const active=i===index;pane.classList.toggle('active',active);pane.setAttribute('aria-hidden',String(!active));});
    journeyBars.forEach((bar,i)=>bar.classList.toggle('active',i===index));
    if (journeyCount) journeyCount.textContent=`0${index+1} — 03`;
  };
  activateJourney(0);
  let storyFrame=0;
  const updateJourney=()=>{
    if (!journeyBeats.length) return;
    const focusY=innerHeight * (innerWidth <= 690 ? .77 : .52);
    let candidate=0,dist=Infinity;
    journeyBeats.forEach((beat,i)=>{const box=beat.getBoundingClientRect();const mid=box.top+box.height*.5;const d=Math.abs(mid-focusY);if(d<dist){dist=d;candidate=i;}});
    activateJourney(candidate);
  };
  if (!reduceMotion) {
    window.addEventListener('scroll',()=>{if(storyFrame)return;storyFrame=requestAnimationFrame(()=>{storyFrame=0;updateJourney();});},{passive:true});
    window.addEventListener('resize',updateJourney,{passive:true});
    window.addEventListener('load',updateJourney,{once:true});
  }

  // Fluxo em execução, sem comando manual obrigatório, com opção de pausar.
  const flowToggle=$('#flowPlayToggle');
  let flowAutoPaused=false;
  flowToggle?.addEventListener('click',()=>{
    flowAutoPaused=!flowAutoPaused;
    flowToggle.setAttribute('aria-pressed',String(flowAutoPaused));
    flowToggle.innerHTML=flowAutoPaused ? 'Reproduzir sequência <span aria-hidden="true">▶</span>' : 'Pausar sequência <span aria-hidden="true">Ⅱ</span>';
    flowToggle.title=flowAutoPaused ? 'Retomar reprodução automática do fluxo' : 'Pausar reprodução automática do fluxo';
  });
  let flowAutoIndex=0, flowManualUntil=0;
  flowSteps.forEach((b,i)=>b.addEventListener('click',()=>{flowAutoIndex=i;flowManualUntil=Date.now()+13000;}));
  if(!reduceMotion) window.setInterval(()=>{
    if(userPaused || flowAutoPaused || document.hidden || !visibility.flow || Date.now()<flowManualUntil)return;
    flowAutoIndex=(flowAutoIndex+1)%flowSteps.length;
    activateStep(flowAutoIndex);
  },4300);

  // Um ponto de atenção percorre o Kanban de demonstração quando visível.
  const crmCols = $$('.kanban-col');
  const crmTickets = $$('.kanban-col .kanban-ticket');
  let crmIndex=0;
  if(!reduceMotion) window.setInterval(()=>{
    if(userPaused||document.hidden||!visibility.crm||crmCols.length<4)return;
    crmCols.forEach((col,i)=>col.classList.toggle('is-journey-active',i===crmIndex));
    crmTickets.forEach(ticket=>ticket.classList.remove('is-journey-active'));
    crmCols[crmIndex]?.querySelector('.kanban-ticket')?.classList.add('is-journey-active');
    crmIndex=(crmIndex+1)%crmCols.length;
  },2500);
})();
