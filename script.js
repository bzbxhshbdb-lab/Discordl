const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

function collectSettings() {
  const config = {};
  document.querySelectorAll("input[type=checkbox]").forEach(cb => {
    config[cb.dataset.key] = cb.checked;
  });
  config.target = document.getElementById("target").value;
  return config;
}

/* =========================
   AIM ASSIST AVANÇADO
   ========================= */
function buildAimAssist(settings) {
  if (!settings.aimAssist) {
    return { enabled: false };
  }

  return {
    enabled: true,

    // 🔥 Magnetismo quase total
    magnetism: 0.98,

    // 🔥 Redução extrema da sensibilidade
    slowdown: 0.95,

    // 🔥 Correção angular suave (não gira sozinho)
    correction: 0.93,

    // 🔥 Cone pequeno (gruda fácil)
    baseFov: 7.0,
    minFov: 3.5,

    // 🔥 Ajuste automático conforme alinhamento
    dynamicFov: true,

    // 🎯 prioridade de hitbox
    priority: settings.target, // head / neck / body

    // ❌ nunca automático
    autoRotate: false,
    snap: false
  };
}

/* =========================
   GAMEPLAY EXTREMO
   ========================= */
function buildGameplay(settings) {
  return {
    // precisão quase perfeita
    precision: settings.dynamicPrecision ? 1.0 : 0.9,

    // estabilidade máxima
    stability: settings.weaponStability ? 1.0 : 0.9,

    // recuo praticamente zero
    recoil: settings.recoilControl ? 0.01 : 0.2,

    aimAssist: buildAimAssist(settings)
  };
}

document.getElementById("apply").addEventListener("click", () => {
  const settings = collectSettings();

  const finalConfig = {
    app: "ZXiter Trick",
    displayName: "Free Fire Max",
    package: "com.dts.freefiremax",

    performance: {
      antilag: settings.antilag,
      pingBoost: settings.pingBoost,
      fpsBoost: settings.fpsBoost,
      reduceDelay: settings.reduceDelay,
      lowLatency: settings.lowLatency
    },

    gameplay: buildGameplay(settings),

    system: {
      advancedSync: settings.advancedSync,
      smartCache: settings.smartCache,
      processPriority: settings.processPriority,
      debugMode: settings.debugMode
    }
  };

  // 👉 Comunicação direta com Unity
  if (window.Unity) {
    window.Unity.call(JSON.stringify(finalConfig));
  }

  localStorage.setItem("zxiter_config", JSON.stringify(finalConfig));
  alert("Assistência de mira avançada (nível máximo) aplicada.");
});
