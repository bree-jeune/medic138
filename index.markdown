---
layout: default
title: "Home"
---

<section class="hero hero--home">
  <div class="hero-body">
    <p class="hero-kicker">Interactive training for real medics</p>
    <h1 class="hero-title">
      Street-smart EMS education<br>
      for front line responders.
    </h1>
    <p class="hero-subtitle">
      Less textbook trivia, more pattern recognition. Learn how to think on scene,
      hand off clean, and walk away knowing you made the right calls.
    </p>

    <div class="hero-ctas">
      <a href="/courses/" class="btn btn--primary">Start a course</a>
      <a href="/games/" class="btn btn--ghost">Run a 10-minute drill</a>
      <a href="/dispatch-notes/" class="btn btn--ghost">Learn from real calls</a>
    </div>
    

    <div class="hero-meta">
    <div class="hero-newsletter hero-newsletter--pill">
  <p class="hero-newsletter-title">Get weekly EMS breakdowns.</p>
  <p class="hero-newsletter-sub">
    Short trauma lessons, drills, and real-call debriefs in your inbox.
  </p>

  <div class="playbook-cta">
  <div class="playbook-cta__frame">
    <div class="playbook-cta__inner">
      <div class="playbook-cta__text">
        <p class="playbook-cta__eyebrow">Free NREMT resource</p>
        <h3 class="playbook-cta__title">Get the NREMT First-Time Pass Playbook</h3>
        <p class="playbook-cta__body">
          A tactical study plan for busy medics. Built for real shifts, not fantasy schedules.
        </p>
      </div>

      <div class="playbook-cta__actions">
        <!-- Main CTA → Gumroad Playbook -->
        <a href="https://medic138.gumroad.com/l/dpnnbd"
           class="btn btn--primary playbook-cta__btn">
          Download the Playbook
        </a>

        <!-- Optional: Buttondown signup inline -->
        <form
          class="playbook-cta__form"
          action="https://buttondown.email/api/emails/embed-subscribe/medic138"
          method="post"
          target="popupwindow"
          onsubmit="window.open('https://buttondown.email/medic138', 'popupwindow')"
        >
          <label class="playbook-cta__label" for="playbook-email">
            Get future drills by email:
          </label>
          <div class="playbook-cta__input-row">
            <span class="playbook-cta__patch" aria-hidden="true">EMT</span>
            <input
              id="playbook-email"
              type="email"
              name="email"
              placeholder="you@agency.com"
              required
            />
            <button type="submit" class="btn btn--ghost playbook-cta__btn-secondary">
              Join the list
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>


  <div class="hero-newsletter-substack">
  
    <iframe src="https://medic138.substack.com/embed"
            width="100%" height="180"
            style="border:0; background:transparent;"
            frameborder="0" scrolling="no"></iframe>
  </div>

  <form
    action="https://medic138.substack.com/api/v1/free?nojs=1"
    method="post"
    target="_blank"
    class="hero-newsletter-form hero-newsletter-form--icon"
  >
    <div class="hero-newsletter-input-wrap">
    <span class="hero-newsletter-icon" aria-hidden="true"> <img src="/assets/img/ui/emt-patch.svg" alt=""></span>
    <input
      type="email"
      name="email"
      placeholder="Enter your email"
      required
    >
  </div>
  <button type="submit">Subscribe</button>
</form>
</div>


  <div class="hero-panel">
    <div class="hero-panel-header">
      <span class="hero-panel-label">Today’s dispatch</span>

      
    </div>
    <div>
      <span class="hero-panel-tag">Medical, Shock & Trauma Streams</span>
      <div class="embed embed--youtube">
        <div class="embed-inner">
          <!-- Insert a valid YouTube video id in place of `VIDEO_ID` or set `page.video_id` in front matter. -->
          <!-- If you don't want an embed, the iframe is intentionally omitted to avoid a broken placeholder. -->
          <p style="color:var(--text-muted);">Video placeholder — add a YouTube video id or remove this section.</p>
        </div>
      </div>

    </div>

    <ul class="hero-panel-list">
      <li>
        <span class="hero-chip">New</span>
        <div>
          <ul class="hero-panel-list">
  <li>
    <span class="hero-chip">New</span>
    <div>
      <p class="hero-panel-title">
        <a href="/lessons/shock-basics-emt/" >
          Shock basics for EMTs
        </a>
      </p>
      <p class="hero-panel-text">
        Classify hemorrhagic vs distributive before the monitor tells you something’s wrong.
      </p>
    </div>
  </li>
  <li>
    <span class="hero-chip hero-chip--green">Advanced</span>
    <div>
      <p class="hero-panel-title">
        <a href="/courses/flight-physiology/" class="hero-panel-link">
          Flight physiology primer
        </a>
      </p>
      <p class="hero-panel-text">
        Gas laws, altitude effects, and what actually happens to your vented patient at 8,000 feet.
      </p>
    </div>
  </li>
  <li>
    <span class="hero-chip hero-chip--amber">Drill</span>
    <div>
      <p class="hero-panel-title">
        <a href="/scenarios/" class="hero-panel-link">
          10-minute polytrauma scenario
        </a>
      </p>
      <p class="hero-panel-text">
        Make three choices: triage, destination, and damage-control interventions.
      </p>
    </div>
  </li>
</ul>

        </div>
      </li>
      <li>
        <span class="hero-chip hero-chip--amber">Drill</span>
        <div>
          <p class="hero-panel-title">10-minute polytrauma scenario</p>
          <p class="hero-panel-text">
            Make three choices: triage, destination, and damage-control interventions.
          </p>
        </div>
      </li>
    </ul>
  </div>
</section>

<!-- Where to start -->
<section class="section-header">
  <div class="section-label">Start here</div>
  <div class="section-header-body">
    <h2>Where to start</h2>
    <p>Pick the track that fits your current scope and bandwidth.</p>
  </div>
</section>

<section class="page-card home-section">
  <div class="lesson-list">
    <article class="lesson-card">
      <h3>🚀 New to EMS?</h3>
      <p>Start with the basics of shock and trauma assessment.</p>
      <a href="/lessons/shock-basics-emt/" class="link-arrow">Go to Shock Basics</a>
    </article>

    <article class="lesson-card">
      <h3>🫀 Advanced provider?</h3>
      <p>Deep-dive into 12-lead ECGs and flight physiology.</p>
      <a href="/courses/flight-physiology/" class="link-arrow">Start Flight Phys</a>
    </article>

    <article class="lesson-card">
      <h3>🎮 Just need a quick drill?</h3>
      <p>Test your knowledge with interactive scenarios and games.</p>
      <a href="/games/" class="link-arrow">Play drills</a>
    </article>
  </div>
</section>

<!-- Latest dispatch notes -->
<section class="section-header">
  <div class="section-label">Dispatch notes</div>
  <div class="section-header-body">
    <h2>Latest dispatch notes</h2>
    <p>Real calls, real lessons you can skim between tones.</p>
  </div>
</section>

<section class="page-card home-section">
  <div class="dispatch-list">
    {% for note in site.dispatch_notes limit:2 %}
      <article class="dispatch-note">
        <h3><a href="{{ note.url | relative_url }}">{{ note.title }}</a></h3>
        <p><small>{{ note.date | date: "%B %-d, %Y" }}</small></p>
        <p>{{ note.summary }}</p>
      </article>
    {% endfor %}
  </div>
</section>
