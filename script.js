const credential = {
  name: "POLINA SAVKOVA",
  number: "IALM/PS21368",
  issued: "22.10.2023",
  issuedBy: "IALM Credentialing Office · Bern, CH",
  validity: "INDEFINITE",
  field: "Relationship & Emotional Wellbeing",
  status: "ACTIVE"
};

// INSERT THE TEXT FOR EACH LANGUAGE HERE.
// Structure: greeting, paragraphs[], closing, signature.
const letterContent = {
  ru: {
  greeting: "Любимая Полина,",
  paragraphs: [
    "Ты часто говоришь мне: «Я ещё не врач, я только на первом курсе.» И каждый раз мне хочется с тобой поспорить. Возможно, по официальным документам ты действительно только начинаешь свой путь и тебе ещё предстоит много лет учёбы, экзаменов, практики и всего того, что однажды приведёт тебя к званию врача.",
    
    "Но я хочу, чтобы ты знала одну вещь. Для меня твоя ценность никогда не определялась дипломом, курсом или тем, сколько знаний ты уже успела получить. Есть вещи, которым невозможно научиться только из учебников.",
    
    "Ты умеешь поддержать меня тогда, когда это действительно нужно. Умеешь вернуть и поддержать мое хорошее настроение, успокоить, рассмешить, заставить почувствовать себя лучше и просто сделать обычный день счастливее. И если существует такая область медицины, где измеряют не анализы, а то, насколько хорошо человеку рядом с тобой, — в ней ты для меня лучший специалист на этой планете.",
    
    "Поэтому это удостоверение — не потому, что я действительно считаю тебя врачом уже сейчас. Это маленькое напоминание о том, что даже если ты сама пока не видишь в себе специалиста, я уже вижу человека, чью «терапию» невозможно заменить. Я всегда буду ценить то, что ты уже умеешь делать для меня.",
    
    "Именно поэтому у этой терапии есть только одно назначение:",
    
    "Продолжать бессрочно."
  ],
  closing: "С любовью,",
  signature: "твой единственный пациент."
},
  es: {
    greeting: "Querida Polina,",
    paragraphs: [
      "A menudo me dices: \"Todavía no soy médica. Solo estoy en mi primer año.\" Y cada vez, siento ganas de discutir contigo. Tal vez, según los registros oficiales, realmente solo estás comenzando tu camino, y todavía te quedan muchos años de estudio, exámenes, práctica clínica y todo lo demás por delante que un día te llevarán a convertirte en médica.",
      "Pero quiero que sepas una cosa. Para mí, tu valor nunca ha sido definido por un título, un año de estudio o cuánto conocimiento ya has logrado adquirir. Hay cosas que simplemente no se pueden aprender solo con libros de texto.",
      "Sabes cómo apoyarme cuando realmente lo necesito. Sabes cómo devolverme y mantener mi buen humor, calmarme, hacerme reír, hacerme sentir mejor y, simplemente, convertir un día cualquiera en uno más feliz. Y si existiera un campo de la medicina donde midieran no análisis de sangre, sino cuánto se siente bien la persona a tu lado, tú serías, para mí, la mejor especialista de este planeta.",
      "Por eso este credencial no es porque en realidad crea que ya eres médica. Es solo un pequeño recordatorio de que aunque no te veas a ti misma como especialista todavía, yo ya veo a alguien cuya \"terapia\" nunca podría reemplazarse. Siempre valoraré lo que ya sabes hacer por mí.",
      "Y quizá por eso esta terapia solo tiene una receta:",
      "continuar indefinidamente."
    ],
    closing: "Con amor,",
    signature: "tu única y única paciente."
  },
  fr: {
    greeting: "Chère Polina,",
    paragraphs: [
      "Tu me dis souvent : \"Je ne suis pas encore médecin. Je ne suis que dans ma première année.\" Et à chaque fois, j’ai envie de me disputer avec toi. Peut-être, selon les dossiers officiels, tu n’es vraiment qu’au début de ton parcours, et il te reste encore de nombreuses années d’études, d’examens, de pratique clinique et de tout le reste devant toi qui, un jour, te mèneront à devenir médecin.",
      "Mais je veux que tu saches une chose. Pour moi, ta valeur n’a jamais été définie par un diplôme, une année d’étude ou la quantité de connaissances que tu as déjà réussi à acquérir. Il existe des choses que l’on ne peut simplement pas apprendre uniquement dans les livres.",
      "Tu sais comment me soutenir quand j’ai vraiment besoin de toi. Tu sais comment me redonner et garder mon bon humeur, me calmer, me faire rire, me faire sentir mieux et simplement transformer une journée ordinaire en une journée plus heureuse. Et s’il existait un domaine de la médecine où l’on mesurait non pas les analyses sanguines, mais à quel point la personne à côté de toi se sent bien, tu serais, pour moi, la meilleure spécialiste de cette planète.",
      "C’est pourquoi ce diplôme n’est pas parce que je crois vraiment que tu es déjà médecin. C’est juste un petit rappel que même si tu ne te vois pas encore comme une spécialiste, je vois déjà quelqu’un dont la \"thérapie\" ne peut jamais être remplacée. Je chérirai toujours ce que tu sais déjà faire pour moi.",
      "Et peut-être est-ce exactement pour cela que cette thérapie n’a qu’une seule prescription :",
      "continuer indéfiniment."
    ],
    closing: "Avec amour,",
    signature: "ta seule et unique patiente."
  },
  de: {
    greeting: "Liebe Polina,",
    paragraphs: [
      "Du sagst mir oft: \"Ich bin noch kein Arzt. Ich bin erst in meinem ersten Jahr.\" Und jedes Mal habe ich das Gefühl, mit dir zu streiten. Vielleicht bist du laut offizieller Unterlagen tatsächlich erst am Anfang deiner Reise, und du hast noch viele Jahre Studium, Prüfungen, klinische Praxis und alles Weitere vor dir, das dich eines Tages dazu führen wird, Ärztin zu werden.",
      "Aber ich möchte, dass du eines weißt. Für mich wurde dein Wert noch nie durch einen Abschluss, ein Studienjahr oder den Wissensstand definiert, den du bereits erworben hast. Es gibt Dinge, die man einfach nicht allein aus Büchern lernen kann.",
      "Du weißt, wie du mich unterstützt, wenn ich dich wirklich brauche. Du weißt, wie du meine gute Laune zurückholst und bewahrst, mich beruhigst, zum Lachen bringst, mich besser fühlen lässt und aus einem ganz normalen Tag einen glücklicheren machst. Und gäbe es ein Feld der Medizin, in dem nicht Blutwerte gemessen würden, sondern wie gut sich die Person neben dir fühlt, dann wärst du für mich die beste Spezialistin auf diesem Planeten.",
      "Deshalb ist dieses Zertifikat nicht deshalb da, weil ich wirklich glaube, dass du schon Ärztin bist. Es ist nur eine kleine Erinnerung daran, dass du, auch wenn du dich selbst noch nicht als Spezialistin siehst, für mich bereits jemand bist, dessen \"Therapie\" niemals ersetzt werden kann. Ich werde immer schätzen, was du bereits für mich kannst.",
      "Und vielleicht ist genau das der Grund, warum diese Therapie nur eine einzige Verschreibung hat:",
      "unendlich weiterzuführen."
    ],
    closing: "Mit Liebe,",
    signature: "deine einzige und beste Patientin."
  }
};

function initLetterPage() {
  const modal = document.getElementById("languageModal");
  const loading = document.getElementById("languageLoading");
  const loadingCopy = loading ? loading.querySelector(".loading-copy") : null;
  const tiles = document.querySelectorAll(".lang-tile");
  const article = document.getElementById("letterContent");
  const homeButton = document.getElementById("homeLetterButton");

  if (!modal || !article) return;

  article.classList.remove("is-visible");
  article.innerHTML = "";

  const loadingLabels = {
    ru: "Готовим перевод...",
    es: "Preparando la traducción...",
    fr: "Préparation de la traduction...",
    de: "Übersetzung wird vorbereitet..."
  };

  const defaultLanguage = "ru";

  tiles.forEach((tile) => {
    const selected = tile.dataset.lang === defaultLanguage;
    tile.classList.toggle("is-selected", selected);
    tile.setAttribute("aria-pressed", String(selected));
  });

  const renderLetter = (lang) => {
    const content = letterContent[lang] || letterContent.ru;
    const paragraphs = content.paragraphs
      .map((text, index) => {
        const isItalic = index === content.paragraphs.length - 2;
        return `<p${isItalic ? ' class="italics"' : ""}>${text}</p>`;
      })
      .join("");

    article.innerHTML = `
      <p class="salutation">${content.greeting}</p>
      ${paragraphs}
      <p class="closing">${content.closing}</p>
      <span class="signature">${content.signature}</span>
    `;

    requestAnimationFrame(() => article.classList.add("is-visible"));
  };

  const selectLanguage = (lang) => {
    const nextLabel = loadingLabels[lang] || loadingLabels.ru;

    tiles.forEach((tile) => {
      const selected = tile.dataset.lang === lang;
      tile.classList.toggle("is-selected", selected);
      tile.setAttribute("aria-pressed", String(selected));
    });

    if (loadingCopy) {
      loadingCopy.textContent = nextLabel;
    }

    modal.classList.add("is-loading");
    article.classList.remove("is-visible");

    setTimeout(() => {
      modal.classList.remove("is-visible", "is-loading");
      renderLetter(lang);
    }, 1800);
  };

  requestAnimationFrame(() => modal.classList.add("is-visible"));

  tiles.forEach((tile) => {
    tile.addEventListener("click", () => selectLanguage(tile.dataset.lang));
  });

  if (homeButton) {
    homeButton.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
}

function initMainPage() {
  const checking = document.getElementById("checking");
  const lookup = document.getElementById("lookup");
  const notFound = document.getElementById("notFound");
  const result = document.getElementById("result");
  const form = document.getElementById("credentialForm");
  const input = document.getElementById("credentialInput");
  const submittedNumber = document.getElementById("submittedNumber");
  const tryAgainBtn = document.getElementById("tryAgainBtn");
  const homeLogo = document.getElementById("homeLogo");
  const navCurrent = document.getElementById("navCurrent");
  const navHome = document.getElementById("navHome");
  const navRecent = document.getElementById("navRecent");
  const btn = document.getElementById("profileBtn");
  const details = document.getElementById("profileDetails");
  const qrCode = document.getElementById("qrCode");

  if (!form || !input || !tryAgainBtn || !btn || !homeLogo) return;

  document.querySelectorAll("[data-credential]").forEach((element) => {
    const key = element.dataset.credential;
    element.textContent = credential[key];
  });

  const screens = [lookup, checking, notFound, result].filter(Boolean);
  const screenLabels = new Map([
    [lookup, "Home Page"],
    [checking, "Credential Check"],
    [notFound, "No Record Found"],
    [result, "Credential Record"]
  ]);

  let recentScreen = null;
  let verifyTimer = null;

  function showScreen(screen) {
    screens.forEach((item) => {
      if (!item) return;
      item.hidden = item !== screen;
      item.classList.toggle("active", item === screen);
    });

    if (screen && screenLabels.has(screen)) {
      if (navCurrent) navCurrent.textContent = screenLabels.get(screen) || "Home Page";
      if (navHome) navHome.hidden = screen === lookup;
      if (navRecent) navRecent.disabled = !recentScreen;
    }
  }

  function normalizeCredentialNumber(value) {
    return value.trim().toUpperCase();
  }

  function resetProfileDetails() {
    if (!details || !btn) return;
    details.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
    btn.querySelector("span").textContent = "＋";
  }

  function getCredentialUrl() {
    const url = new URL(window.location.href);
    url.searchParams.set("credential", credential.number);
    url.hash = "";
    return url.toString();
  }

  function createQrSvg(text) {
    const size = 25;
    const darkModules = [];

    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const edge = x < 2 || y < 2 || x > size - 3 || y > size - 3;
        const finder = (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);
        const align = x >= 10 && x <= 14 && y >= 10 && y <= 14;
        const pattern = ((x + y * 3) % 5 === 0 || (x * 2 + y) % 7 === 0) && !finder && !edge && !align;

        if (edge || finder || align || pattern) {
          darkModules.push(`<rect x="${x + 2}" y="${y + 2}" width="1" height="1"/>`);
        }
      }
    }

    return `<svg viewBox="0 0 ${size + 4} ${size + 4}" role="img" aria-label="QR code for ${text}" xmlns="http://www.w3.org/2000/svg"><rect width="${size + 4}" height="${size + 4}" fill="#fff"/><g fill="#241B20">${darkModules.join("")}</g></svg>`;
  }

  function renderQrCode() {
    if (qrCode) qrCode.innerHTML = createQrSvg(credential.number);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const value = normalizeCredentialNumber(input.value);
    input.value = value;

    showScreen(checking);

    clearTimeout(verifyTimer);
    verifyTimer = setTimeout(() => {
      if (value === credential.number) {
        recentScreen = result;
        window.history.replaceState(null, "", getCredentialUrl());
        showScreen(result);
        return;
      }

      if (submittedNumber) submittedNumber.textContent = value;
      recentScreen = notFound;
      showScreen(notFound);
    }, 1600);
  });

  tryAgainBtn.addEventListener("click", () => {
    input.value = "";
    input.focus();
    showScreen(lookup);
  });

  homeLogo.addEventListener("click", () => {
    showScreen(lookup);
    input.focus();
  });

  if (navHome) {
    navHome.addEventListener("click", () => {
      showScreen(lookup);
      input.focus();
    });
  }

  if (navRecent) {
    navRecent.addEventListener("click", () => {
      if (recentScreen) showScreen(recentScreen);
    });
  }

  btn.addEventListener("click", () => {
    details.classList.toggle("open");
    const expanded = details.classList.contains("open");
    btn.setAttribute("aria-expanded", String(expanded));
    btn.querySelector("span").textContent = expanded ? "−" : "＋";
  });

  renderQrCode();
  showScreen(lookup);
  input.value = "";
  resetProfileDetails();
}

if (document.body.dataset.page === "letter") {
  initLetterPage();
} else {
  initMainPage();
}
