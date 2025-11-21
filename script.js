document.addEventListener('DOMContentLoaded', function(){
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.getElementById('site-nav');
  if(navToggle && siteNav){
    navToggle.addEventListener('click', function(){
      const open = siteNav.classList.toggle('open');
      const expanded = open ? 'true' : 'false';
      navToggle.setAttribute('aria-expanded', expanded);
    });
  }

  // Copy email button
  const copyBtn = document.getElementById('copyEmail');
  if(copyBtn){
    copyBtn.addEventListener('click', function(){
      const email = copyBtn.getAttribute('data-email');
      if(!email) return;
      try{
        navigator.clipboard.writeText(email).then(()=>{
          copyBtn.textContent = 'Copied!';
          setTimeout(()=> copyBtn.textContent = email, 1800);
        });
      }catch(e){
        // fallback
        const ta = document.createElement('textarea');
        ta.value = email; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
        copyBtn.textContent = 'Copied!';
        setTimeout(()=> copyBtn.textContent = email, 1800);
      }
    });
  }

  // Copy phone button
  const copyPhoneBtn = document.getElementById('copyPhone');
  if(copyPhoneBtn){
    copyPhoneBtn.addEventListener('click', function(){
      const phone = copyPhoneBtn.getAttribute('data-phone');
      if(!phone) return;
      try{
        navigator.clipboard.writeText(phone).then(()=>{
          const prev = copyPhoneBtn.textContent;
          copyPhoneBtn.textContent = 'Copied!';
          setTimeout(()=> copyPhoneBtn.textContent = prev, 1600);
        });
      }catch(e){
        const ta = document.createElement('textarea');
        ta.value = phone; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
        const prev = copyPhoneBtn.textContent;
        copyPhoneBtn.textContent = 'Copied!';
        setTimeout(()=> copyPhoneBtn.textContent = prev, 1600);
      }
    });
  }
});

// Scroll reveal using IntersectionObserver — will add 'active' class to .reveal elements
function initScrollReveal(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length || !('IntersectionObserver' in window)){
    // Fallback: reveal everything immediately
    items.forEach(i=>{
      if(i.classList.contains('stagger')){
        const children = i.querySelectorAll('.reveal-child');
        children.forEach((c, idx)=> setTimeout(()=> c.classList.add('active'), idx * 80));
      }else{
        i.classList.add('active');
      }
    });
    return;
  }

  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      const el = entry.target;
      if(entry.isIntersecting){
        // If element is a stagger container, reveal its children in sequence
        if(el.classList.contains('stagger')){
          const step = parseInt(el.getAttribute('data-stagger')) || 80;
          const children = el.querySelectorAll('.reveal-child');
          children.forEach((c, idx)=> setTimeout(()=> c.classList.add('active'), idx * step));
          // also mark the container itself active after children
          setTimeout(()=> el.classList.add('active'), (children.length * (parseInt(el.getAttribute('data-stagger'))||step)));
          obs.unobserve(el);
          return;
        }

        el.classList.add('active');
        obs.unobserve(el);
      }
    });
  },{threshold:0.10});

  items.forEach(i=>obs.observe(i));
}

// Simple typewriter effect for a single element with class '.typewriter' and data-text attr
function initTypewriter(){
  const el = document.querySelector('.typewriter');
  if(!el) return;
  const text = el.getAttribute('data-text') || el.textContent.trim();
  el.textContent = '';
  let idx = 0;
  const speed = 80; // ms per char
  const cursorBlinkInterval = 500;

  const typer = setInterval(()=>{
    if(idx >= text.length){
      clearInterval(typer);
      // keep cursor for a short while then remove border
      setTimeout(()=> el.style.borderRight = '0', 900);
      return;
    }
    el.textContent += text[idx++];
  }, speed);
  // keep cursor blinking via CSS border (already done by .typewriter style)
}

// Initialize micro-interactions after DOM ready
document.addEventListener('DOMContentLoaded', function(){
  initScrollReveal();
  initTypewriter();
});

// Simple contact form handler (no backend). Replace this with an API call if needed.
function handleContact(e){
  e.preventDefault();
  const form = e.currentTarget;
  const status = document.getElementById('formStatus');
  const data = new FormData(form);
  // Minimal client-side validation
  if(!data.get('name') || !data.get('email') || !data.get('message')){
    status.textContent = 'Please fill in all fields.'; return false;
  }
  status.textContent = 'Thanks — your message is ready to be sent (no backend configured).';
  form.reset();
  return false;
}

// Theme toggle: respects saved preference and system preference, persists to localStorage
(function(){
  const themeToggle = document.getElementById('themeToggle');
  function applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
    if(themeToggle){
      themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-pressed', theme === 'dark');
    }
  }

  const saved = localStorage.getItem('theme');
  if(saved){
    applyTheme(saved);
  }else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
    applyTheme('dark');
  }else{
    applyTheme('light');
  }

  if(themeToggle){
    themeToggle.addEventListener('click', ()=>{
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  

})();
