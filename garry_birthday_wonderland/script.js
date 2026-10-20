/* =====================================================================*

*&#xA0;  BIRTHDAY WONDERLAND: edit this block to personalize everything.*

*&#xA0;  ===================================================================== */

const birthdayConfig = {

  recipientName: "Garry",

  senderName: "Your Love ❤️",

  birthdayDay: 23,

  birthdayMonth: "October",

  showRomanticQuotes: true,

  enableMusic: true

};



// Every message on the site is built from the config above.

const MUSIC_SRC = "assets/sounds/birthday-music.mp3";

const QUOTES_URL = "./data/quotes.json";

const buildMessages = (c) => ({

  loading: [

    "Gathering a thousand little reasons to make you smile...",

    "Hanging up the fairy lights...",

    "Wrapping chocolates with extra love...",

    "Teaching the cats to sing happy birthday..."

  ],

  heroTitle: `Hey, ${c.recipientName}! 💗`,

  heroSub: "I made a little universe of happiness, chocolates, cats, and love just for you.",

  surpriseTitle: "Ready for your little birthday surprise, my love? 🎁",

  resultHeading: `${c.birthdayDay}! Your special day is here! 🎂`,

  resultGreeting: `Happy birthday, ${c.recipientName}! Here's to ${c.birthdayDay} ${c.birthdayMonth} and everything beautiful it brings.`,

  finale: `Happy Birthday, ${c.recipientName}! 🎂❤️ You make ordinary moments feel extraordinary. May your new year be filled with happiness, beautiful memories, endless laughter, and all the love your heart can hold.`,

  closing: "If I could gift you one thing, it would be the ability to see yourself through my eyes, so you could understand how special you are to me.",

  signature: `With love, ${c.senderName}`

});



(() => {

  "use strict";



  const $ = (id) => document.getElementById(id);

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  const msg = buildMessages(birthdayConfig);

  const resets = []; // each scene registers a function that returns it to its starting state

  const COLORS = ["#ffb3d1", "#cdb4ff", "#bde0fe", "#fff6ea", "#ff7eb6", "#ffe08a"];



  /** Random index that never equals `last` (no consecutive repeats). */

  function pickDifferent(length, last) {

    if (length < 2) return 0;

    let i;

    do { i = Math.floor(Math.random() * length); } while (i === last);

    return i;

  }



  /** Builds the CSS cake (3 candles). */

  function cakeHTML(big) {

    return `<div class="cake ${big ? "big" : ""}"><div class="candles">

      <div class="candle"><i class="flame"></i></div><div class="candle"><i class="flame"></i></div><div class="candle"><i class="flame"></i></div>

    </div><div class="tier2"></div><div class="tier1"></div></div>`;

  }



  /* ---------- Personalized text ---------- */

  function applyText() {

    document.title = `Happy Birthday, ${birthdayConfig.recipientName}! 🎂`;

    $("heroTitle").textContent = msg.heroTitle;

    $("heroSub").textContent = msg.heroSub;

    $("surpriseTitle").textContent = msg.surpriseTitle;

    $("finaleMsg").textContent = msg.finale;

    $("closingMsg").textContent = msg.closing;

    $("signature").textContent = msg.signature;

    $("loadCake").innerHTML = cakeHTML(false);

    $("resultCake").innerHTML = cakeHTML(false);

    $("finaleCake").innerHTML = cakeHTML(true);

  }



  /* ---------- Confetti (canvas) and emoji pops ---------- */

  const Confetti = (() => {

    const canvas = $("confetti");

    const ctx = canvas.getContext("2d");

    let parts = [], raf = null;

    const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };

    resize();

    window.addEventListener("resize", resize);

    function loop() {

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      parts = parts.filter((p) => p.life < 150 && p.y < canvas.height + 20);

      parts.forEach((p) => {

        p.vy += 0.3; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life++;

        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);

        ctx.fillStyle = p.c; ctx.globalAlpha = Math.max(0, 1 - p.life / 150);

        ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore();

      });

      raf = parts.length ? requestAnimationFrame(loop) : null;

      if (!raf) ctx.clearRect(0, 0, canvas.width, canvas.height);

    }

    return {

      burst(count = 130) {

        const n = reduced ? 25 : count;

        for (let i = 0; i < n; i++) {

          parts.push({ x: canvas.width / 2, y: canvas.height * 0.55, vx: (Math.random() - 0.5) * 16, vy: -Math.random() * 15 - 3,

            s: 6 + Math.random() * 7, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,

            c: COLORS[Math.floor(Math.random() * COLORS.length)], life: 0 });

        }

        if (!raf) raf = requestAnimationFrame(loop);

      }

    };

  })();



  /** Emojis float up from an element (hearts, sparkles). */

  function popAt(el, emojis = ["💗", "✨", "💖"], count = 6) {

    const r = el.getBoundingClientRect();

    for (let i = 0; i < count; i++) {

      const s = document.createElement("span");

      s.className = "pop-emoji"; s.setAttribute("aria-hidden", "true");

      s.textContent = emojis[i % emojis.length];

      s.style.left = r.left + r.width / 2 + (Math.random() - 0.5) * r.width * 0.6 + "px";

      s.style.top = r.top + r.height / 2 + "px";

      s.style.setProperty("--dx", (Math.random() - 0.5) * 120 + "px");

      s.style.animationDelay = i * 60 + "ms";

      document.body.appendChild(s);

      setTimeout(() => s.remove(), 1500);

    }

  }



  /* ---------- Decorations ---------- */

  function buildDecor() {

    // Fairy lights

    const fairy = $("fairy");

    for (let i = 0; i < 24; i++) {

      const b = document.createElement("i");

      b.className = "bulb";

      b.style.setProperty("--c", COLORS[i % COLORS.length]);

      b.style.setProperty("--d", (i % 6) * 0.4 + "s");

      fairy.appendChild(b);

    }

    // Balloons (hidden by CSS under reduced motion)

    document.querySelectorAll("[data-balloons]").forEach((box) => {

      for (let i = 0; i < 4; i++) {

        const b = document.createElement("i");

        b.className = "balloon";

        b.style.setProperty("--c", COLORS[(i * 2 + box.classList.length) % COLORS.length]);

        b.style.setProperty("--x", 10 + i * 22 + "%");

        b.style.setProperty("--t", 11 + i * 2.5 + "s");

        b.style.setProperty("--d", i * -3 + "s");

        box.appendChild(b);

      }

    });

    // Floating hearts and stars: few, slow, never over the text for long

    if (!reduced) {

      const amb = $("ambient"), icons = ["💗", "✨", "⭐", "💖"];

      for (let i = 0; i < 12; i++) {

        const s = document.createElement("span");

        s.className = "amb"; s.textContent = icons[i % icons.length];

        s.style.setProperty("--x", Math.random() * 95 + "%");

        s.style.setProperty("--t", 14 + Math.random() * 12 + "s");

        s.style.setProperty("--d", -Math.random() * 20 + "s");

        s.style.setProperty("--s", 0.9 + Math.random() * 0.9 + "rem");

        amb.appendChild(s);

      }

    }

  }



  /** If a photo fails to load, swap it for a cute emoji. */

  function setupImageFallbacks() {

    document.querySelectorAll("img[data-fallback], img[data-optional]").forEach((img) => {

      const swap = () => {

        if (img.dataset.optional) { (img.closest(".photo-frame") || img).remove(); return; }

        const span = document.createElement("span");

        span.className = "photo-fallback"; span.textContent = img.dataset.fallback;

        span.setAttribute("role", "img"); span.setAttribute("aria-label", img.alt);

        img.replaceWith(span);

      };

      img.addEventListener("error", swap, { once: true });

      if (img.complete && img.naturalWidth === 0) swap();

    });

  }



  /* ---------- Scene 1: Loader ---------- */

  function runLoader() {

    const loader = $("loader"), bar = $("loadBar"), pct = $("loadPct"), text = $("loadMsg");

    const DURATION = 3500;

    let finished = false, i = 0;

    const finish = () => {

      if (finished) return;

      finished = true; clearInterval(rot);

      loader.classList.add("done");

      loader.setAttribute("aria-hidden", "true");

      Confetti.burst(60);

    };

    const rot = setInterval(() => { i = (i + 1) % msg.loading.length; text.textContent = msg.loading[i]; }, 1000);

    text.textContent = msg.loading[0];

    const start = performance.now();

    const tick = (now) => {

      if (finished) return;

      const p = Math.min(1, (now - start) / DURATION);

      bar.style.width = p * 100 + "%"; pct.textContent = Math.round(p * 100) + "%";

      p < 1 ? requestAnimationFrame(tick) : finish();

    };

    requestAnimationFrame(tick);

    setTimeout(finish, DURATION + 2500); // failsafe: never trap the visitor

  }



  /* ---------- Navigation ---------- */

  function setupNav() {

    const links = [...document.querySelectorAll("#navLinks a")];

    if (!birthdayConfig.showRomanticQuotes) {

      document.querySelectorAll("[data-quotes-link], #quotes").forEach((el) => el.remove());

    }

    const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);

    const io = new IntersectionObserver((entries) => {

      entries.forEach((e) => {

        if (e.isIntersecting) links.forEach((a) => {

          const on = a.getAttribute("href") === "#" + e.target.id;

          a.classList.toggle("active", on);

          on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current");

          if (on) a.scrollIntoView({ block: "nearest", inline: "center" });

        });

      });

    }, { threshold: 0.5 });

    sections.forEach((s) => io.observe(s));



    const toTop = $("toTop");

    window.addEventListener("scroll", () => { toTop.hidden = window.scrollY < 600; }, { passive: true });

    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }));

  }

  const scrollToId = (id) => $(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });



  /* ---------- Music (optional, off by default) ---------- */

  /** Built-in music-box "Happy Birthday" (Web Audio). Used when no MP3 file is found. */

  const Synth = (() => {

    const F = { C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392, A4: 440, Bb4: 466.16, C5: 523.25 };

    const song = [["C4",.5],["C4",.5],["D4",1],["C4",1],["F4",1],["E4",2],["C4",.5],["C4",.5],["D4",1],["C4",1],["G4",1],["F4",2],

      ["C4",.5],["C4",.5],["C5",1],["A4",1],["F4",1],["E4",1],["D4",2],["Bb4",.5],["Bb4",.5],["A4",1],["F4",1],["G4",1],["F4",2]];

    const BEAT = 0.5; // seconds per beat

    let ctx = null, out = null, session = null, timer = null, playing = false, muted = false;

    function schedule() {

      let t = ctx.currentTime + 0.05;

      song.forEach(([n, beats]) => {

        const o = ctx.createOscillator(), g = ctx.createGain();

        o.type = "triangle"; o.frequency.value = F[n];

        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.35, t + 0.02);

        g.gain.exponentialRampToValueAtTime(0.0001, t + beats * BEAT + 0.35);

        o.connect(g); g.connect(session); o.start(t); o.stop(t + beats * BEAT + 0.4);

        t += beats * BEAT;

      });

      timer = setTimeout(schedule, (t - ctx.currentTime + 1.2) * 1000); // short pause, then loop

    }

    return {

      get playing() { return playing; },

      start() {

        ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();

        if (!out) { out = ctx.createGain(); out.gain.value = muted ? 0 : 0.5; out.connect(ctx.destination); }

        ctx.resume();

        session = ctx.createGain(); session.connect(out);

        playing = true; schedule();

      },

      stop() { clearTimeout(timer); if (session) session.disconnect(); playing = false; },

      setMuted(m) { muted = m; if (out) out.gain.value = m ? 0 : 0.5; }

    };

  })();



  function setupMusic() {

    const controls = $("musicControls");

    if (!birthdayConfig.enableMusic) { controls.hidden = true; return; }

    const play = $("musicToggle"), mute = $("muteToggle"), note = $("musicNote");

    const audio = new Audio();

    audio.loop = true; audio.preload = "none"; audio.src = MUSIC_SRC; // nothing plays until the user clicks

    let muted = false;

    const isPlaying = () => !audio.paused || Synth.playing;

    const showNote = (t) => { note.textContent = t; note.hidden = false; setTimeout(() => { note.hidden = true; }, 6000); };

    const sync = () => {

      const on = isPlaying();

      play.setAttribute("aria-pressed", String(on));

      play.setAttribute("aria-label", on ? "Pause music" : "Play music");

      play.textContent = on ? "⏸" : "🎵";

      mute.setAttribute("aria-pressed", String(muted));

      mute.setAttribute("aria-label", muted ? "Unmute music" : "Mute music");

      mute.textContent = muted ? "🔇" : "🔊";

    };

    play.addEventListener("click", async () => {

      if (isPlaying()) { audio.pause(); Synth.stop(); return sync(); }

      try {

        await audio.play(); // your MP3, if present

      } catch {

        Synth.start(); // no MP3 found: play the built-in music-box tune instead

        showNote("Playing the built-in music-box tune. Add assets/sounds/birthday-music.mp3 to use your own song.");

      }

      sync();

    });

    mute.addEventListener("click", () => { muted = !muted; audio.muted = muted; Synth.setMuted(muted); sync(); });

    audio.addEventListener("play", sync); audio.addEventListener("pause", sync);

    sync();

  }



  /* ---------- Scene 2: Hero ---------- */

  function setupHero() {

    $("enterBtn").addEventListener("click", () => {

      Confetti.burst(); popAt($("enterBtn"), ["✨", "💗", "🎀"], 8);

      setTimeout(() => scrollToId("surprise"), reduced ? 0 : 450);

    });

  }



  /* ---------- Scene 3: 1..N number surprise ---------- */

  function setupSurprise() {

    const btn = $("surpriseBtn"), display = $("numDisplay"), result = $("surpriseResult"), replay = $("replayBtn");

    const total = birthdayConfig.birthdayDay;

    const STEP = reduced ? 60 : 150; // ms per number

    let timer = null; // single timer handle prevents overlapping runs



    function stop() { clearTimeout(timer); timer = null; }

    function start() {

      if (timer !== null) return; // already running: ignore extra clicks

      result.hidden = true; display.textContent = ""; btn.disabled = true;

      let n = 0;

      const step = () => {

        n++;

        display.innerHTML = `<span class="n">${n}</span>`;

        if (n >= total) { timer = null; finish(); return; }

        timer = setTimeout(step, STEP);

      };

      timer = setTimeout(step, 0);

    }

    function finish() {

      btn.disabled = false; btn.textContent = "Open It Again 🎁";

      $("resultHeading").textContent = msg.resultHeading;

      $("resultGreeting").textContent = msg.resultGreeting;

      result.hidden = false;

      Confetti.burst(220);

    }

    btn.addEventListener("click", start);

    replay.addEventListener("click", () => { result.hidden = true; display.textContent = ""; start(); });

    $("wishBtn").addEventListener("click", () => { popAt($("wishBtn")); scrollToId("finale"); });

    resets.push(() => {

      stop(); display.textContent = ""; result.hidden = true; btn.disabled = false;

      btn.textContent = "Open Your Birthday Surprise 🎁";

    });

  }



  /* ---------- Scene 4: Chocolates ---------- */

  function setupChocolates() {

    const items = [

      { name: "Cadbury Dairy Milk", bg: "linear-gradient(135deg,#5b2a86,#3c1a63)", emoji: "🍫", text: "A little sweetness for someone who makes life sweeter." },

      { name: "KitKat", bg: "linear-gradient(135deg,#d6181f,#9d0f15)", emoji: "☕", text: "Take a break, smile a little, and enjoy your special day." },

      { name: "Ferrero Rocher", bg: "linear-gradient(135deg,#c89b3c,#7a5416)", emoji: "✨", text: "A golden little treat for a golden-hearted person." },

      { name: "5 Star", bg: "linear-gradient(135deg,#8b3a1d,#4f200f)", emoji: "⭐", text: "For five-star smiles and unforgettable moments." },

      { name: "Silk", bg: "linear-gradient(135deg,#6a2c5f,#2d1030)", emoji: "💜", text: "A little extra sweetness, because ordinary is overrated." }

    ];

    const grid = $("chocGrid");

    items.forEach((it) => {

      const card = document.createElement("article");

      card.className = "choc";

      card.innerHTML = `<h3></h3>

        <div class="choc-bar" style="--bg:${it.bg}" aria-hidden="true"><span></span><span class="emoji">${it.emoji}</span><div class="foil">🎀</div></div>

        <p class="choc-msg" aria-live="polite"></p>

        <button class="btn btn-primary" type="button">Unwrap Chocolate</button>`;

      card.querySelector("h3").textContent = it.name;

      card.querySelector(".choc-bar span").textContent = it.name;

      const button = card.querySelector("button"), message = card.querySelector(".choc-msg");

      button.addEventListener("click", () => {

        if (card.classList.contains("open")) { // second click wraps it back up

          card.classList.remove("open"); message.textContent = ""; button.textContent = "Unwrap Chocolate"; return;

        }

        card.classList.add("open"); message.textContent = it.text; button.textContent = "Wrap It Again";

        popAt(card, ["💗", "✨", "🍫"], 6);

      });

      grid.appendChild(card);

    });

    resets.push(() => grid.querySelectorAll(".choc").forEach((c) => {

      c.classList.remove("open"); c.querySelector(".choc-msg").textContent = ""; c.querySelector("button").textContent = "Unwrap Chocolate";

    }));

  }



  /* ---------- Scene 5: Memes and applause ---------- */

  function setupMemes() {

    const memes = [

      { img: "g1", s: "👏", c: "Clapping because it's YOUR day! 👏" },

      { img: "g2", s: "👑", c: "The birthday queen has entered the chat." },

      { img: "g3", s: "😲", c: "Wait... that whole cake is for me?" },

      { img: "g4", s: "🍫", c: "Me pretending I didn't eat the last chocolate." },

      { img: "g1", s: "🛡️", c: "Official birthday security: protecting the cake." },

      { img: "g2", s: "💅", c: "One more year of being absolutely iconic." },

      { img: "g3", s: "🍰", c: "Today's forecast: 100% chance of cake. Extra slice, please." },

      { img: "g4", s: "🎈", c: "Brought flowers. Expecting cake in return." }

    ];

    const card = $("memeCard"), memeImg = $("memeImg"), sticker = $("memeSticker"), cap = $("memeCaption"), tiles = $("memeTiles");

    let current = -1;

    function show(i) {

      current = i; sticker.textContent = memes[i].s; cap.textContent = memes[i].c;

      card.classList.remove("noimg");

      memeImg.alt = "Cute kitten meme: " + memes[i].c;

      memeImg.src = `assets/images/${memes[i].img}.jpeg`;

      card.classList.remove("swap"); void card.offsetWidth; card.classList.add("swap"); // restart animation

      tiles.querySelectorAll(".tile").forEach((t, k) => k === i ? t.setAttribute("aria-current", "true") : t.removeAttribute("aria-current"));

    }

    memes.forEach((m, i) => {

      const t = document.createElement("button");

      t.type = "button"; t.className = "tile"; t.textContent = m.s;

      t.setAttribute("aria-label", `Meme ${i + 1}: ${m.c}`);

      t.addEventListener("click", () => show(i));

      tiles.appendChild(t);

    });

    memeImg.addEventListener("error", () => card.classList.add("noimg")); // emoji fallback

    $("memeBtn").addEventListener("click", () => show(pickDifferent(memes.length, current)));



    const clapBtn = $("clapBtn"), count = $("clapCount"), clapMsg = $("clapMsg");

    const cheers = ["Yay! 🎉", "Louder! 👏", "Standing ovation! 🥳", "The cats are cheering too! 🐱", "You deserve every clap! 💗"];

    let claps = 0;

    clapBtn.addEventListener("click", () => {

      claps++; count.textContent = claps; clapMsg.textContent = cheers[claps % cheers.length];

      clapBtn.classList.remove("clap-anim"); void clapBtn.offsetWidth; clapBtn.classList.add("clap-anim");

      popAt(clapBtn, ["👏", "✨"], 4);

    });

    show(0);

    resets.push(() => { claps = 0; count.textContent = "0"; clapMsg.textContent = ""; show(0); });

  }



  /* ---------- Scene 6: Quote journey ---------- */

  function setupQuotes() {

    if (!birthdayConfig.showRomanticQuotes) return;

    const card = $("quoteCard"), title = $("quoteTitle"), text = $("quoteText"), progress = $("quoteProgress");

    const prev = $("prevQuote"), next = $("nextQuote"), restart = $("restartQuotes"), final = $("quoteFinal"), error = $("quoteError");

    let quotes = [], index = 0, busy = false;



    /** Keep only entries that have usable title/text. */

    function validate(data) {

      if (!data || !Array.isArray(data.quotes)) return [];

      return data.quotes.filter((q) => q && typeof q.text === "string" && q.text.trim() && typeof q.title === "string");

    }

    async function load() {

      progress.textContent = "Loading little thoughts... 💭";

      error.hidden = true; card.hidden = true; final.hidden = true;

      [prev, next, restart].forEach((b) => { b.hidden = true; });

      try {

        let data;

        try {

          const res = await fetch(QUOTES_URL);

          if (!res.ok) throw new Error(`HTTP ${res.status}`);

          data = await res.json();

        } catch (fetchErr) {

          // fetch is blocked on file:// pages, so use the offline copy from data/quotes.js

          console.info("Using offline quotes copy:", fetchErr.message);

          data = window.BIRTHDAY_QUOTES;

        }

        quotes = validate(data);

        if (!quotes.length) throw new Error("No usable quotes");

        index = 0; render(false);

      } catch (err) {

        console.warn("Quotes failed to load:", err);

        progress.textContent = "The quotes are shy right now 🐱";

        error.hidden = false;

      }

    }

    /** Draw the current state: a quote (index < n) or the final reveal (index === n). */

    function render(animate = true) {

      const n = quotes.length, atEnd = index >= n;

      card.hidden = atEnd; final.hidden = !atEnd; error.hidden = true;

      prev.hidden = index === 0; next.hidden = atEnd; restart.hidden = !atEnd;

      const shown = atEnd ? final : card;

      if (!atEnd) {

        progress.textContent = `Quote ${index + 1} of ${n}`;

        title.textContent = quotes[index].title; text.textContent = quotes[index].text;

      } else {

        progress.textContent = "The end 💗";

        Confetti.burst(120); popAt(final, ["💗", "💌", "✨"], 8);

      }

      shown.classList.remove("in", "out"); void shown.offsetWidth; if (animate) shown.classList.add("in");

    }

    /** Fade out, change state, fade in. The `busy` flag blocks double-clicks mid-transition. */

    async function go(delta) {

      if (busy || !quotes.length) return;

      const target = Math.min(quotes.length, Math.max(0, index + delta));

      if (target === index) return;

      busy = true;

      const visible = final.hidden ? card : final;

      if (!reduced) { visible.classList.add("out"); await wait(300); }

      index = target; render(true); busy = false;

      if (index < quotes.length) popAt(card, ["💗", "🌸"], 3);

    }

    next.addEventListener("click", () => go(1));

    prev.addEventListener("click", () => go(-1));

    restart.addEventListener("click", () => { index = 0; render(true); });

    $("retryQuotes").addEventListener("click", load);

    resets.push(() => { if (quotes.length) { index = 0; render(false); } });

    load();

  }



  /* ---------- Scene 7: Wishes wall ---------- */

  function setupWishes() {

    const wishes = [

      ["May your smile always find a reason to shine.", "And may I always be nearby to see it. 💗"],

      ["May this year bring beautiful surprises.", "Starting with a few of mine. 🎁"],

      ["More happiness, more adventures, more cake!", "Especially the cake. 🍰"],

      ["May your dreams feel closer every day.", "I'm cheering for every single one. 📣"],

      ["Keep being your wonderfully unique self.", "It's my favourite version of the world. 🌍"],

      ["May your days be soft and your laughter loud.", "Both look lovely on you. 😄"],

      ["May every little worry turn into a little win.", "And you handle the wins beautifully. 🏆"],

      ["May you always feel as loved as you are.", "Which is more than you know. 💞"],

      ["May good news find you quickly this year.", "Possibly with sprinkles. ✨"],

      ["May your favourite songs play at the perfect moments.", "I'll hold the volume knob. 🎶"],

      ["May you rest well and wake up excited.", "Tomorrow has good things planned. 🌅"],

      ["May the cats of the world adore you.", "They already do. 🐱"]

    ];

    const bgs = ["#ffb3d1", "#cdb4ff", "#bde0fe", "#fff6ea", "#ffd1e8", "#e0c9ff"];

    const grid = $("wishGrid"), out = $("wishReveal");

    let last = -1;

    const buttons = wishes.map(([w, extra], i) => {

      const b = document.createElement("button");

      b.type = "button"; b.className = "wish"; b.style.setProperty("--bg", bgs[i % bgs.length]);

      b.innerHTML = `<span></span><span class="extra" hidden></span>`;

      b.firstChild.textContent = "💌 " + w; b.querySelector(".extra").textContent = extra;

      b.addEventListener("click", () => reveal(i));

      grid.appendChild(b); return b;

    });

    function reveal(i) {

      last = i;

      const b = buttons[i], ex = b.querySelector(".extra");

      b.classList.remove("open"); void b.offsetWidth; b.classList.add("open");

      ex.hidden = false; popAt(b, ["💗", "✨"], 4);

      out.textContent = wishes[i][1];

    }

    $("randomWishBtn").addEventListener("click", () => {

      const i = pickDifferent(wishes.length, last); reveal(i);

      buttons[i].scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });

    });

    resets.push(() => {

      last = -1; out.textContent = "";

      buttons.forEach((b) => { b.classList.remove("open"); b.querySelector(".extra").hidden = true; });

    });

  }



  /* ---------- Scene 8: Finale ---------- */

  function setupFinale() {

    const btn = $("finalWishBtn"), out = $("finalWishOut"), cake = document.querySelector("#finaleCake .cake");

    btn.addEventListener("click", () => {

      if (cake.classList.contains("out")) return;

      cake.classList.add("out"); // click-based wish (no microphone)

      out.textContent = "Close your eyes and make a wish... it's already on its way. 🌠💗";

      btn.disabled = true; btn.textContent = "Wish Made 💫";

      Confetti.burst(240); popAt(btn, ["💗", "✨", "🎂", "💖"], 10);

    });

    $("restartAll").addEventListener("click", () => {

      resets.forEach((fn) => fn());

      cake.classList.remove("out"); out.textContent = ""; btn.disabled = false; btn.textContent = "Make a Wish ✨";

      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });

    });

  }



  /* ---------- Boot ---------- */

  function init() {

    applyText();

    buildDecor();

    setupImageFallbacks();

    setupNav();

    setupMusic();

    setupHero();

    setupSurprise();

    setupChocolates();

    setupMemes();

    setupQuotes();

    setupWishes();

    setupFinale();

    runLoader();

  }

  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init();

})();
