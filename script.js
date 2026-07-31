document.getElementById('year').textContent = new Date().getFullYear();
if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.7 } });

const refinements = document.createElement('link');
refinements.rel = 'stylesheet';
refinements.href = 'refinements.css';
document.head.append(refinements);

const devicons = document.createElement('link');
devicons.rel = 'stylesheet';
devicons.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
document.head.append(devicons);

document.querySelectorAll('.nav-cta').forEach((link) => { link.href = 'contact.html'; });
document.querySelectorAll('.contact .button').forEach((link) => { link.href = 'contact.html'; });
document.querySelectorAll('.nav nav').forEach((menu) => {
  if (!menu.querySelector('a[href="index.html"]')) menu.insertAdjacentHTML('afterbegin', '<a href="index.html">Home</a>');
});

if (location.pathname.endsWith('index.html') || location.pathname.endsWith('/')) {
  document.querySelectorAll('.section .eyebrow, .dark-section .eyebrow, .contact .eyebrow').forEach((label) => {
    label.textContent = label.textContent.replace(/^\s*\d+\s*\/\s*/, '');
  });
}

if (location.pathname.endsWith('services.html')) {
  document.body.classList.add('service-page');
  document.querySelectorAll('.service-card a').forEach((link) => link.remove());
  const header = document.querySelector('.page-header .shell');
  if (header) {
    header.insertAdjacentHTML('beforeend', `<div class="service-visual" aria-hidden="true"><div class="service-visual-card"><i data-lucide="layout-template"></i><b>Make the case</b><small>Websites</small></div><div class="service-visual-card"><i data-lucide="blocks"></i><b>Make it work</b><small>Applications</small></div><div class="service-visual-card"><i data-lucide="sparkles"></i><b>Make it smarter</b><small>AI & advisory</small></div></div>`);
    if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.7 } });
  }
  const serviceGrid = document.querySelector('.service-grid');
  if (serviceGrid) {
    serviceGrid.insertAdjacentHTML('afterend', `<section class="service-detail"><div class="service-detail-top"><p class="eyebrow">What an engagement can include</p><h2>A practical partner<br>from <em>brief to build.</em></h2><p>Whether you need a focused launch or a complex platform, the work is shaped around the outcomes that matter—not a fixed, one-size-fits-all process.</p></div><div class="service-detail-grid"><article><i data-lucide="route"></i><h3>Product foundations</h3><p>Opportunity framing, feature prioritisation, user flows, technical direction, and an achievable delivery plan.</p><ul><li>Discovery workshops</li><li>User journeys & flows</li><li>Product roadmap</li></ul></article><article><i data-lucide="palette"></i><h3>Experience & interface</h3><p>Interfaces that earn trust quickly and make complex actions feel simple, coherent, and intentional.</p><ul><li>Wireframes & prototypes</li><li>Design systems</li><li>Responsive UI design</li></ul></article><article><i data-lucide="code-2"></i><h3>Build & launch</h3><p>Production-ready engineering with the integrations, infrastructure, and quality needed for confident release.</p><ul><li>Frontend & backend</li><li>API integrations</li><li>Cloud deployment</li></ul></article></div></section><section class="engagement-strip"><div><p class="eyebrow">Ways to work together</p><h2>Right-sized for<br>the <em>job.</em></h2></div><div class="engagement-list"><div><span>01</span><h3>Focused launch</h3><p>For a marketing site, prototype, or a contained product improvement with a clear goal and a defined finish line.</p></div><div><span>02</span><h3>Product build</h3><p>For a new application or platform that needs collaborative thinking, strong design, and end-to-end development.</p></div><div><span>03</span><h3>Ongoing partner</h3><p>For teams that benefit from a senior product and engineering partner as their needs evolve over time.</p></div></div></section>`);
    if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.7 } });
  }
}

const quoteForm = document.querySelector('#quote-form');
if (quoteForm) {
  quoteForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = quoteForm.querySelector('button');
    const successMessage = quoteForm.querySelector('.form-success');
    const errorMessage = quoteForm.querySelector('.form-error');
    const formValues = new FormData(quoteForm);
    const service = formValues.get('service');
    const details = formValues.get('details');

    submitButton.disabled = true;
    submitButton.textContent = 'Sending enquiry…';
    successMessage.classList.remove('visible');
    errorMessage.classList.remove('visible');

    try {
      const response = await fetch('https://sheetdb.io/api/v1/y2frw3avr80k0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [{
            'Sr. no.': 'INCREMENT',
            'Name': formValues.get('name'),
            'Email': formValues.get('email'),
            'Phone': formValues.get('phone'),
            'Message': `${service}: ${details}`
          }]
        })
      });

      if (!response.ok) throw new Error('SheetDB submission failed');
      quoteForm.reset();
      successMessage.classList.add('visible');
      submitButton.textContent = 'Enquiry sent ✓';
    } catch (error) {
      errorMessage.classList.add('visible');
      submitButton.textContent = 'Try again';
    } finally {
      submitButton.disabled = false;
    }
  });
}

const technologyIcons = {
  'React': 'devicon-react-original', 'Node.js': 'devicon-nodejs-plain', 'PostgreSQL': 'devicon-postgresql-plain',
  'AWS': 'devicon-amazonwebservices-plain-wordmark', 'Flutter': 'devicon-flutter-plain', 'Dart': 'devicon-dart-plain',
  'MongoDB': 'devicon-mongodb-plain', 'Supabase': 'devicon-supabase-plain', 'Kotlin': 'devicon-kotlin-plain',
  'Swift': 'devicon-swift-plain', 'Azure': 'devicon-azure-plain', 'GCP': 'devicon-googlecloud-plain',
  'MERN': 'devicon-react-original', 'Railway': 'devicon-railway-plain', 'REST APIs': 'devicon-nodejs-plain',
  'WebSockets': 'devicon-socketio-original', 'Mobile UX': 'devicon-figma-plain', 'Analytics': 'devicon-google-plain',
  'Cloud': 'devicon-googlecloud-plain', 'Web app': 'devicon-html5-plain', 'Workflow UX': 'devicon-figma-plain',
  'Bluetooth LE': 'devicon-bluetooth-plain', 'Connected devices': 'devicon-bluetooth-plain'
};

document.querySelectorAll('.tags span, .skills span').forEach((chip) => {
  const icon = technologyIcons[chip.textContent.trim()];
  if (icon) chip.insertAdjacentHTML('afterbegin', `<i class="tech-icon ${icon}" aria-hidden="true"></i>`);
});

const projectAddenda = {
  'smart-ring.html': { challenge: 'Wearable metrics are only valuable when a person can understand them without becoming a full-time analyst.', approach: 'The product uses a calm daily overview for the main decision, with deeper sleep, activity, and device views when curiosity calls for it.', enables: 'A continuous connection between the physical ring and an app that feels helpful from the first morning check-in to firmware management.' },
  'summation-erp.html': { challenge: 'Operational data tends to fragment across departments just when leaders need a joined-up view.', approach: 'The dashboard leads with exceptions and next actions, while each functional area has a clear, predictable home.', enables: 'Faster hand-offs between teams and a dependable picture of inventory, production, purchasing, and commercial health.' },
  'support-desk.html': { challenge: 'Every extra tool or missing detail makes a simple customer issue harder to resolve.', approach: 'The workspace keeps customer context, conversation history, assignment, and escalation actions visible in one flow.', enables: 'Support teams can respond with confidence, retain ownership, and bring in specialist help without losing the thread.' },
  'mock-test.html': { challenge: 'Assessment programmes often grow in volume before the process for managing them grows in clarity.', approach: 'Content, test administration, student activity, and key performance signals are organised around the everyday tasks of an education team.', enables: 'A scalable testing operation that is easier for administrators to run and clearer for learners to take part in.' },
  'cirp.html': { challenge: 'Professional resolution workflows involve many stakeholders, documents, dates, and decisions that must remain traceable.', approach: 'A focused case view brings the important data, participation, documentation, and commercial activity into a structured progression.', enables: 'A more transparent marketplace where professionals can coordinate sensitive work with confidence.' }
};

const addendum = projectAddenda[location.pathname.split('/').pop()];
const caseBody = document.querySelector('.case-body');
if (addendum && caseBody) {
  caseBody.insertAdjacentHTML('beforeend', `<section class="case-addendum"><p class="eyebrow">Product focus</p><div><span>Challenge</span><p>${addendum.challenge}</p></div><div><span>Approach</span><p>${addendum.approach}</p></div><div><span>Enables</span><p>${addendum.enables}</p></div></section>`);
}
