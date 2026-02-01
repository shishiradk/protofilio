/* ADMIN PANEL LOGIC */

// Global Error Handler for debugging
window.onerror = function (msg, url, line, col, error) {
  alert("Admin Error: " + msg + "\nLine: " + line);
};

// Load data directly from data.js
const pd = window.PORTFOLIO_DATA || {};

/* ---------- INITIALIZE ---------- */
function init() {
  try {
    // Check data
    if (!pd.hero) alert("Warning: data.js might be missing or empty.");

    // Tabs
    const tabs = document.querySelectorAll('.sidebar li');
    const sections = document.querySelectorAll('.tab');

    if (tabs.length === 0) { console.warn("No tabs found"); }

    tabs.forEach(t => {
      t.onclick = () => {
        // Toggle Active Class
        tabs.forEach(tab => tab.classList.remove('active'));
        t.classList.add('active');

        // Hide all sections
        sections.forEach(s => s.style.display = 'none');

        // Show target
        const targetId = t.dataset.tab;
        const target = document.getElementById(targetId);
        if (target) {
          target.style.display = 'block';
        } else {
          console.error("Target section not found:", targetId);
        }
      };
    });

    // Show first tab by default
    if (sections.length > 0) {
      sections[0].style.display = 'block';
      if (tabs[0]) tabs[0].classList.add('active');
    }

    loadValues();

  } catch (e) {
    alert("Init Error: " + e.message);
  }
}

function loadValues() {
  try {
    // Hero
    if (pd.hero) {
      setVal('hero-title', pd.hero.title);
      setVal('hero-desc', pd.hero.description);
      setVal('hero-img', pd.hero.image);
      setVal('hero-cv', pd.hero.cvLink);
      setVal('hero-blog', pd.hero.blogLink);
    }

    // Hire
    if (pd.hire) {
      setVal('hire-text', pd.hire.text);
      setVal('hire-color', pd.hire.color);
      if (el('hire-visible')) el('hire-visible').checked = pd.hire.visible || false;
      if (el('hire-glow')) el('hire-glow').checked = pd.hire.glow || false;
    }

    // About
    if (pd.about) {
      setVal('about-title', pd.about.title);
      setVal('about-name', pd.about.name);
      setVal('about-intro', pd.about.intro);
      setVal('about-desc', pd.about.description);
    }

    // Experience
    renderExpList();

    // Skills
    renderSkillsList();

    // Projects
    renderProjectsList();

    // Socials
    if (pd.socials) {
      ['linkedin', 'github', 'kaggle', 'twitter', 'instagram'].forEach(k => {
        setVal(k, pd.socials[k]);
      });
    }

    // General (Footer)
    if (pd.footer) {
      setVal('footer-text', pd.footer.text);
      setVal('footer-year', pd.footer.year);
    } else {
      console.warn("Footer data missing in pd object");
      // Create default if missing
      pd.footer = { text: "SHISHIRADHIKARI", year: "2025" };
      setVal('footer-text', pd.footer.text);
      setVal('footer-year', pd.footer.year);
    }
  } catch (e) {
    alert("LoadValues Error: " + e.message);
  }
}

/* ---------- ACTIONS ---------- */

// Save Hero
bindClick('save-hero', () => {
  pd.hero = {
    title: el('hero-title').value,
    description: el('hero-desc').value,
    image: el('hero-img').value,
    cvLink: el('hero-cv').value,
    blogLink: el('hero-blog').value
  };
  saveAndSync();
});

// Save Hire
bindClick('save-hire', () => {
  pd.hire = {
    text: el('hire-text').value,
    color: el('hire-color').value,
    visible: el('hire-visible').checked,
    glow: el('hire-glow').checked
  };
  saveAndSync();
});

// Save About
bindClick('save-about', () => {
  pd.about.title = el('about-title').value;
  pd.about.name = el('about-name').value;
  pd.about.intro = el('about-intro').value;
  pd.about.description = el('about-desc').value;
  saveAndSync();
});

// Save Socials
bindClick('save-socials', () => {
  ['linkedin', 'github', 'kaggle', 'twitter', 'instagram'].forEach(k => {
    if (el(k)) pd.socials[k] = el(k).value;
  });
  saveAndSync();
});

// Save General
bindClick('save-general', () => {
  pd.footer = {
    text: el('footer-text').value,
    year: el('footer-year').value
  };
  saveAndSync();
});


/* ---------- LIST LOGIC ---------- */

// Experience
function renderExpList() {
  const list = el('exp-list');
  if (!list) return;
  list.innerHTML = '';
  (pd.experience || []).forEach((e, i) => {
    const d = document.createElement('div');
    d.className = 'list-item';
    d.innerHTML = `
      <div class="list-info">
        <b>${e.role}</b> <span class="list-sub">${e.company}</span>
      </div>
      <button class="btn-del" onclick="removeExp(${i})">🗑️</button>`;
    list.appendChild(d);
  });
}
window.removeExp = (i) => {
  pd.experience.splice(i, 1);
  renderExpList();
  saveAndSync();
};
bindClick('add-exp', () => {
  if (!pd.experience) pd.experience = [];
  pd.experience.push({
    role: el('exp-role').value,
    company: el('exp-company').value,
    duration: el('exp-duration').value,
    desc: el('exp-desc').value
  });
  renderExpList();
  saveAndSync();
});


// Skills
function renderSkillsList() {
  const list = el('skills-list');
  if (!list) return;
  list.innerHTML = '';
  (pd.skills || []).forEach((s, i) => {
    const d = document.createElement('div');
    d.className = 'list-item';
    d.innerHTML = `
      <div class="list-info"><b>${s.title}</b></div>
      <button class="btn-del" onclick="removeSkill(${i})">🗑️</button>`;
    list.appendChild(d);
  });
}
window.removeSkill = (i) => {
  pd.skills.splice(i, 1);
  renderSkillsList();
  saveAndSync();
};
bindClick('add-skill', () => {
  pd.skills.push({
    title: el('skill-title').value,
    icon: el('skill-icon').value,
    desc: el('skill-desc').value
  });
  renderSkillsList();
  saveAndSync();
});


// Projects
function renderProjectsList() {
  const list = el('projects-list');
  if (!list) return;
  list.innerHTML = '';
  (pd.projects || []).forEach((p, i) => {
    const d = document.createElement('div');
    d.className = 'list-item';
    d.innerHTML = `
      <div class="list-info"><b>${p.title}</b></div>
      <button class="btn-del" onclick="removeProject(${i})">🗑️</button>`;
    list.appendChild(d);
  });
}
window.removeProject = (i) => {
  pd.projects.splice(i, 1);
  renderProjectsList();
  saveAndSync();
};
bindClick('add-project', () => {
  pd.projects.push({
    id: Date.now().toString(),
    title: el('p-title').value,
    desc: el('p-desc').value,
    tags: el('p-tags').value.split(','),
    featured: el('p-featured').checked,
    demo: el('p-demo').value,
    code: el('p-code').value
  });
  renderProjectsList();
  saveAndSync();
});


/* ---------- HELPERS ---------- */

function el(id) { return document.getElementById(id); }

function setVal(id, val) {
  const element = el(id);
  if (element) element.value = val || "";
}

function bindClick(id, fn) {
  const element = el(id);
  if (element) element.onclick = fn;
}

function saveAndSync() {
  // 1. Sync Live (only if opened from main site)
  if (window.opener && window.opener !== window) {
    try {
      window.opener.postMessage({ type: 'updateAll', data: pd }, '*');
    } catch (e) { /* ignore */ }
  }
  // 2. Trigger Download
  downloadData();
}

function downloadData() {
  const content = "window.PORTFOLIO_DATA = " + JSON.stringify(pd, null, 2) + ";";
  const blob = new Blob([content], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);

  let dlBtn = document.getElementById('dl-trigger');
  if (!dlBtn) {
    dlBtn = document.createElement('a');
    dlBtn.id = 'dl-trigger';
    document.body.appendChild(dlBtn);
  }
  dlBtn.href = url;
  dlBtn.download = "data.js";
  dlBtn.click();
}

// Start
init();
