// Theme toggle
const themeBtn = document.getElementById("themeBtn");
themeBtn?.addEventListener("click", () =>
  document.body.classList.toggle("light")
);

// Animated counters when visible
const counters = document.querySelectorAll(".num");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const goal = +el.dataset.count;
        const isPct = el.textContent.includes("%");
        let cur = 0;
        const step = Math.max(1, Math.round(goal / 60));
        const tick = () => {
          cur += step;
          if (cur > goal) cur = goal;
          el.textContent = isPct ? cur + "%" : cur;
          if (cur < goal) requestAnimationFrame(tick);
        };
        tick();
        io.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);
counters.forEach((c) => io.observe(c));

// Skill bars animate on view
const bars = document.querySelectorAll(".bar span");
const io2 = new IntersectionObserver(
  (es) => {
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.style.getPropertyValue("--val");
        io2.unobserve(e.target);
      }
    });
  },
  { threshold: 0.4 }
);
bars.forEach((b) => io2.observe(b));

// Current year
document.getElementById("year").textContent = new Date().getFullYear();

// Sparks generator
function spawnSpark(container, x, y) {
  const s = document.createElement("span");
  s.className = "spark";
  const r = () => Math.random() * 80 - 40 + "px"; // random drift
  s.style.left = x + "px";
  s.style.top = y + "px";
  s.style.setProperty("--dx", r());
  s.style.setProperty("--dy", r());
  container.appendChild(s);
  s.addEventListener("animationend", () => s.remove());
}
const sparkArea = document.getElementById("spark-area");
sparkArea.addEventListener("mousemove", (e) => {
  const rect = sparkArea.getBoundingClientRect();
  spawnSpark(sparkArea, e.clientX - rect.left, e.clientY - rect.top);
});
document.querySelectorAll(".card").forEach((card) => {
  card.style.position = "relative";
  card.addEventListener("mouseenter", () => {
    const rect = card.getBoundingClientRect();
    for (let i = 0; i < 6; i++)
      spawnSpark(
        card,
        Math.random() * rect.width,
        Math.random() * rect.height * 0.3 + rect.height * 0.05
      );
  });
});

// Language switch (EN / ID)
const i18n = {
  en: {
    nav_projects: "Projects",
    nav_skills: "Skills",
    nav_about: "About",
    nav_contact: "Contact",
    loc: "Based in Indonesia",
    hero_title: "Electrical & Automation Engineer",
    hero_sub:
      "I design reliable control systems for factories—Siemens TIA Portal (S7-1200, PID_Compact), VFD integration, gas detection EWS, and SCADA/telemetry. I care about safety, clarity, and measurable impact.",
    hire: "Hire me",
    download: "Download CV",
    stat_energy: "Energy saved via PID/VFD",
    stat_ews: "Gas detector units deployed",
    stat_manual: "Manual work reduced",
    stat_months: "Months hands-on experience",
    projects_title: "Featured Projects",
    projects_sub:
      "Selected work where reliability, safety, and clarity were the priorities.",
    p1_title: "Pneumatic Conveyor Pressure Control",
    p1_desc:
      "Built S7-1200 logic with PID_Compact and integrated VFD to stabilize pressure near setpoint and improve fault diagnostics — contributing to ≈9% energy saving.",
    p2_title: "Gas Detector Early Warning System",
    p2_desc:
      "Delivered PLC & HMI based EWS across 10 storage units to strengthen safety compliance and accelerate response time.",
    p3_title: "SWRO SCADA",
    p3_desc:
      "Designed SCADA screens and alarms giving clear visibility into quality-critical parameters—cutting manual intervention by >30% and standardizing routine checks.",
    p4_title: "E-RTG Power Monitoring",
    p4_desc:
      "Implemented power monitoring for E-RTG enabling data-driven load balancing and reporting for operations.",
    skills_title: "Skills",
    skills_sub: "Practical focus on controls engineering & tooling.",
    about_title: "About",
    about1_title: "Automation Graduate",
    about1_desc:
      "Hands-on projects in food processing plants and fuel storage terminals. BNSP PLC programming certified.",
    about2_title: "Focus Areas",
    about2_desc:
      "PLC, HMI/SCADA, safety/EWS, and power monitoring. Passion for clear diagnostics and standard work.",
    about3_title: "What I value",
    about3_desc:
      "Stable control loops, maintainable code, and measurable outcomes.",
    contact_title: "Let's work together",
    contact_sub:
      "Tell me about your project or role. I usually respond within 24 hours.",
    form_name: "Name",
    form_email: "Email",
    form_msg: "Message",
    form_send: "Send Message",
    quick_title: "Prefer a quick chat?",
    quick_desc:
      "Reach me via email or LinkedIn. I’m open to PLC/Automation roles and projects.",
    email_cta: "Email",
    port_title: "Portfolio",
    port_sub:
      "A collection of work, HMI/SCADA mockups, wiring, and project docs. You can add your own images.",
    view_photos: "View photos",
    p5_title: "Face Recognition-Based Presence System",
    p5_desc:
      "Built a webcam-based attendance system in Python with a custom GUI (PyCharm). Iterated for accuracy & stability.",
    p6_title: "STM32F446 Nucleo-64 Learning Module",
    p6_desc:
      "Designed/validated PCB, integrated sensor/actuator, developed firmware & staged functional tests.",
    p7_title: "ATmega8535 Learning Module",
    p7_desc:
      "Designed & analyzed PCB, integrated electrical subsystem, programmed ATmega8535 (AVR/CVAVR).",
    //Leadership
    org_title: "Leadership & Involvement",
    org_sub: "Selected organizational experiences, judged by impact and scope.",
    org_sort: "Sort:",
    org_sort_scale: "Scale",
    org_sort_time: "Timeline",
    org_view_photos: "View photos",
    org_view_cert: "Certificate",
    //achive
    achv_title: "Achievements — Training & Certifications",
    achv_sub:
      "Selected trainings and certifications. Click to view the certificate.",
    achv_filter: "Filter:",
    achv_all: "All",
    achv_cert: "Certifications",
    achv_train: "Trainings",
    achv_sort: "Sort:",
    achv_prestige: "Prestige",
    achv_year: "Year",
    achv_view: "View Certificate",
    achv_bnsp_badge: "BNSP Certified",
  },
  id: {
    nav_projects: "Proyek",
    nav_skills: "Keahlian",
    nav_about: "Tentang",
    nav_contact: "Kontak",
    loc: "Berdomisili di Indonesia",
    hero_title: "Engineer Kelistrikan & Otomasi",
    hero_sub:
      "Saya merancang sistem kontrol yang andal untuk pabrik—Siemens TIA Portal (S7-1200, PID_Compact), integrasi VFD, EWS gas detector, dan SCADA/telemetri. Fokus pada keselamatan, kejelasan, dan dampak terukur.",
    hire: "Ajak Kerja Sama",
    download: "Unduh CV",
    stat_energy: "Hemat energi via PID/VFD",
    stat_ews: "Unit gas detector terpasang",
    stat_manual: "Pekerjaan manual berkurang",
    stat_months: "Bulan pengalaman praktis",
    projects_title: "Proyek Unggulan",
    projects_sub:
      "Contoh pekerjaan dengan prioritas keandalan, keselamatan, dan kejelasan.",
    p1_title: "Kontrol Tekanan Konveyor Pneumatik",
    p1_desc:
      "Membangun logika S7-1200 dengan PID_Compact dan integrasi VFD agar tekanan stabil di sekitar setpoint serta diagnostik lebih jelas — berkontribusi ≈9% penghematan energi.",
    p2_title: "Early Warning System Gas Detector",
    p2_desc:
      "Membangun EWS berbasis PLC & HMI pada 10 unit penyimpanan untuk memperkuat kepatuhan keselamatan dan mempercepat respon.",
    p3_title: "SCADA SWRO",
    p3_desc:
      "Mendesain layar dan alarm SCADA untuk visibilitas parameter kritis—mengurangi intervensi manual >30% dan menstandarkan pengecekan.",
    p4_title: "Monitoring Daya E-RTG",
    p4_desc:
      "Implementasi monitoring daya untuk E-RTG sehingga penyeimbangan beban dan pelaporan menjadi berbasis data.",
    skills_title: "Keahlian",
    skills_sub: "Fokus praktis pada rekayasa kontrol & peralatan.",
    about_title: "Tentang",
    about1_title: "Lulusan Otomasi",
    about1_desc:
      "Berpengalaman langsung di pabrik pengolahan makanan dan terminal penyimpanan BBM. Tersertifikasi BNSP PLC.",
    about2_title: "Bidang Fokus",
    about2_desc:
      "PLC, HMI/SCADA, safety/EWS, dan pemantauan daya. Senang membuat diagnostik yang jelas dan standar kerja.",
    about3_title: "Nilai yang dijaga",
    about3_desc: "Loop kontrol stabil, kode mudah dirawat, hasil yang terukur.",
    contact_title: "Yuk kolaborasi",
    contact_sub:
      "Ceritakan proyek atau lowongan Anda. Biasanya saya balas ≤24 jam.",
    form_name: "Nama",
    form_email: "Email",
    form_msg: "Pesan",
    form_send: "Kirim Pesan",
    quick_title: "Mau ngobrol cepat?",
    quick_desc:
      "Hubungi lewat email atau LinkedIn. Terbuka untuk proyek/posisi PLC & Otomasi.",
    email_cta: "Email",
    port_title: "Portfolio",
    port_sub:
      "Koleksi karya, mockup HMI/SCADA, wiring, dan dokumentasi proyek. Anda bisa menambahkan gambar sendiri.",
    view_photos: "Lihat foto",
    p5_title: "Sistem Presensi Berbasis Face Recognition",
    p5_desc:
      "Membangun presensi berbasis webcam di Python dengan GUI (PyCharm). Iterasi untuk akurasi & stabilitas.",
    p6_title: "Modul Pembelajaran STM32F446 Nucleo-64",
    p6_desc:
      "Desain & validasi PCB, integrasi sensor/aktuator, pengembangan firmware & pengujian fungsional.",
    p7_title: "Modul Pembelajaran ATmega8535",
    p7_desc:
      "Desain & analisis PCB, integrasi subsistem listrik, pemrograman ATmega8535 (AVR/CVAVR).",

    // Leadership
    org_title: "Leadership & Involvement",
    org_sub:
      "Pengalaman organisasi terpilih, ditata berdasarkan skala & dampak.",
    org_sort: "Urut:",
    org_sort_scale: "Skala",
    org_sort_time: "Linimasa",
    org_view_photos: "Lihat foto",
    org_view_cert: "Sertifikat",

    // achive
    achv_title: "Pencapaian — Pelatihan & Sertifikasi",
    achv_sub:
      "Daftar pelatihan dan sertifikasi terpilih. Klik untuk melihat sertifikat.",
    achv_filter: "Filter:",
    achv_all: "Semua",
    achv_cert: "Sertifikasi",
    achv_train: "Pelatihan",
    achv_sort: "Urut:",
    achv_prestige: "Skala",
    achv_year: "Tahun",
    achv_view: "Lihat Sertifikat",
    achv_bnsp_badge: "Tersertifikasi BNSP",
  },
};

let currentLang = "en";
const langBtn = document.getElementById("langBtn");
const i18nEls = document.querySelectorAll("[data-i18n]");
function applyLang(lang) {
  i18nEls.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (i18n[lang][key] !== undefined) el.innerHTML = i18n[lang][key];
  });
  document.documentElement.lang = lang === "id" ? "id" : "en";
  langBtn.textContent = lang === "id" ? "EN" : "ID";
}
langBtn.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "id" : "en";
  applyLang(currentLang);
});
applyLang(currentLang);

// ===== Portfolio / Gallery (safe after removing controls) =====
const grid = document.getElementById("galleryGrid") || null;
const input = document.getElementById("galleryInput") || null;
const addBtn = document.getElementById("addImages") || null;
const exportBtn = document.getElementById("exportGallery") || null;
const clearBtn = document.getElementById("clearGallery") || null;
const dropzone = document.getElementById("dropzone") || null;
const portfolioSection = document.getElementById("portfolio") || null;

const LS_KEY = "portfolioGalleryV1";
let gallery = [];
try {
  gallery = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
} catch (e) {
  gallery = [];
}

function save() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(gallery));
  } catch (e) {}
}

function render(filter = "all") {
  if (!grid) return; // tidak ada grid → tidak perlu render apa pun
  grid.innerHTML = "";
  const items = gallery.filter((g) =>
    filter === "all" ? true : g.tag === filter
  );
  if (!items.length) {
    grid.innerHTML = `<div style="grid-column:1/-1; color:var(--muted)">No items yet.</div>`;
  }
  items.forEach((it) => {
    const card = document.createElement("article");
    card.className = "gallery-card";
    card.innerHTML = `
      <img loading="lazy" src="${it.src}" alt="${
      it.title || "portfolio image"
    }">
      <footer><span>${
        it.title || "Untitled"
      }</span><span class="badge-small tag" style="padding:.2rem .45rem">${
      it.tag || "Uploaded"
    }</span></footer>`;
    // Lightbox (optional, hanya jika elemen ada)
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    if (lightbox && lightboxImg) {
      card.addEventListener("click", () => {
        lightboxImg.src = it.src;
        lightbox.style.display = "flex";
        lightbox.setAttribute("aria-hidden", "false");
      });
      lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
        lightbox.setAttribute("aria-hidden", "true");
        lightboxImg.src = "";
      });
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.style.display === "flex")
          lightbox.click();
      });
    }
    grid.appendChild(card);
  });
}

// Event listeners hanya dipasang jika elemennya ada
if (addBtn && input) {
  addBtn.addEventListener("click", () => input.click());
  input.addEventListener("change", (e) => {
    [...e.target.files].forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const r = new FileReader();
      r.onload = (ev) => {
        gallery.unshift({
          src: ev.target.result,
          title: file.name.replace(/\.[^.]+$/, ""),
          tag: "Uploaded",
        });
        save();
        render("all");
      };
      r.readAsDataURL(file);
    });
  });
}
if (exportBtn) {
  exportBtn.addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(gallery, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gallery.json";
    a.click();
    URL.revokeObjectURL(url);
  });
}
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    if (confirm("Clear uploaded gallery?")) {
      gallery = [];
      save();
      render("all");
    }
  });
}
if (portfolioSection && dropzone) {
  ["dragenter", "dragover"].forEach((evt) =>
    portfolioSection.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.style.display = "block";
      dropzone.classList.add("active");
    })
  );
  ["dragleave", "drop"].forEach((evt) =>
    portfolioSection.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.remove("active");
      if (evt === "drop") {
        [...e.dataTransfer.files].forEach((file) => {
          if (!file.type.startsWith("image/")) return;
          const r = new FileReader();
          r.onload = (ev) => {
            gallery.unshift({
              src: ev.target.result,
              title: file.name.replace(/\.[^.]+$/, ""),
              tag: "Uploaded",
            });
            save();
            render("all");
          };
          r.readAsDataURL(file);
        });
      }
      setTimeout(() => (dropzone.style.display = "none"), 150);
    })
  );
}

// Jika kamu sudah menghapus filter chips, jangan bind apa pun
render("all");

/* ===== EmailJS (opsional) =====
1) Tambah <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script> di index.html (SEBELUM script.js)
2) Un-comment block di bawah ini dan isi key/ID-mu.

emailjs.init({ publicKey: "YOUR_PUBLIC_KEY" });
document.querySelector('#contact form').addEventListener('submit', function (e) {
  e.preventDefault();
  const params = {
    from_name: document.getElementById('name').value,
    reply_to:  document.getElementById('email').value,
    message:   document.getElementById('msg').value
  };
  emailjs.send('service_xxx', 'template_contact', params)
    .then(() => { alert('✅ Message sent. Thank you!'); this.reset(); })
    .catch(()=> alert('❌ Failed to send. Try later.'));
});
*/

/* ===== Project gallery (per project via JSON) ===== */
const PG = {
  data: null,
  cur: { slug: null, idx: 0, list: [] },
  els: {
    modal: document.getElementById("pgModal"),
    img: document.querySelector(".pg-img"),
    title: document.querySelector(".pg-title"),
    caption: document.querySelector(".pg-caption"),
    dl: document.querySelector(".pg-download"),
    prev: document.querySelector(".pg-prev"),
    next: document.querySelector(".pg-next"),
    close: document.querySelector(".pg-close"),
  },
};

async function loadProjectsJSON() {
  if (PG.data) return PG.data;
  const res = await fetch("assets/data/projects.json", { cache: "no-store" });
  PG.data = await res.json();
  return PG.data;
}

function applyPhoto(idx) {
  const item = PG.cur.list[idx];
  if (!item) return;
  PG.cur.idx = idx;
  PG.els.img.src = item.src;
  PG.els.img.style.transform = "scale(1)"; // reset zoom
  const cap =
    item.caption?.[document.documentElement.lang] || item.caption?.en || "";
  PG.els.caption.textContent = cap;
  PG.els.dl.disabled = !item.downloadable;
  PG.els.dl.onclick = () => {
    if (item.downloadable) {
      const a = document.createElement("a");
      a.href = item.src;
      a.download = item.src.split("/").pop() || "photo";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };
}

function openProject(slug) {
  const proj = PG.data.projects.find((p) => p.slug === slug);
  if (!proj) {
    console.warn("project not found", slug);
    return;
  }
  PG.cur = { slug, idx: 0, list: proj.photos.slice(0, 8) }; // max 8 foto
  PG.els.title.textContent =
    proj.title?.[document.documentElement.lang] || proj.title?.en || "";
  applyPhoto(0);
  PG.els.modal.classList.add("open");
  PG.els.modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closePG() {
  PG.els.modal.classList.remove("open");
  PG.els.modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

PG.els.prev.addEventListener("click", () =>
  applyPhoto((PG.cur.idx - 1 + PG.cur.list.length) % PG.cur.list.length)
);
PG.els.next.addEventListener("click", () =>
  applyPhoto((PG.cur.idx + 1) % PG.cur.list.length)
);
PG.els.close.addEventListener("click", closePG);
PG.els.modal.querySelector(".pg-backdrop").addEventListener("click", closePG);

// Zoom on click/scroll
let zoom = 1;
PG.els.img.addEventListener("click", () => {
  zoom = zoom === 1 ? 1.8 : 1;
  PG.els.img.style.transform = `scale(${zoom})`;
  PG.els.img.style.cursor = zoom > 1 ? "zoom-out" : "zoom-in";
});
PG.els.img.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    zoom = Math.min(2.2, Math.max(1, zoom + (e.deltaY < 0 ? 0.1 : -0.1)));
    PG.els.img.style.transform = `scale(${zoom})`;
  },
  { passive: false }
);

// Keyboard nav
window.addEventListener("keydown", (e) => {
  if (!PG.els.modal.classList.contains("open")) return;
  if (e.key === "Escape") closePG();
  if (e.key === "ArrowRight") PG.els.next.click();
  if (e.key === "ArrowLeft") PG.els.prev.click();
});

// Bind buttons
document.querySelectorAll(".view-photos").forEach((btn) => {
  btn.addEventListener("click", async () => {
    await loadProjectsJSON();
    openProject(btn.dataset.slug);
  });
});

/* ===== Organization / Leadership & Involvement ===== */
const ORG = {
  data: null,
  sortMode: "scale", // 'scale' | 'time'
  els: {
    list: document.getElementById("orgList"),
    sortScale: document.getElementById("sortScale"),
    sortTime: document.getElementById("sortTime"),
  },
};

async function loadOrgJSON() {
  if (ORG.data) return ORG.data;
  const res = await fetch("assets/data/organization.json", {
    cache: "no-store",
  });
  ORG.data = await res.json();
  return ORG.data;
}

function scaleOrderVal(scale) {
  return { international: 0, national: 1, university: 2 }[scale] ?? 3;
}

function renderOrg() {
  if (!ORG.data) return;
  const lang = document.documentElement.lang === "id" ? "id" : "en";
  let list = [...ORG.data.items];

  if (ORG.sortMode === "scale") {
    list.sort((a, b) => {
      const s = scaleOrderVal(a.scale) - scaleOrderVal(b.scale);
      if (s !== 0) return s;
      return (b.start || "").localeCompare(a.start || ""); // tie-break by start desc
    });
  } else {
    // timeline: terbaru dulu -> lama
    list.sort((a, b) => (b.start || "").localeCompare(a.start || ""));
  }

  ORG.els.list.innerHTML = "";
  list.forEach((it) => {
    const card = document.createElement("article");
    card.className = "org-card";

    const scaleCls = `scale-${it.scale}`;
    const title = it.title?.[lang] || it.title?.en || "";
    const role = it.role?.[lang] || it.role?.en || "";
    const org = it.org?.[lang] || it.org?.en || "";
    const meta = [org, it.city, it.period].filter(Boolean).join(" • ");

    card.innerHTML = `
      <div class="org-logo">${
        it.logo ? `<img src="${it.logo}" alt="${org} logo">` : ""
      }</div>
      <div class="org-body">
        <div class="org-head">
          <span class="org-title">${title || role}</span>
          <span class="scale-badge ${scaleCls}">${
      it.scaleLabel?.[lang] || it.scale
    }</span>
        </div>
        <div class="org-meta">${meta}</div>
        ${
          Array.isArray(it.bullets?.[lang])
            ? `<ul class="org-bullets">` +
              it.bullets[lang]
                .slice(0, 2)
                .map((x) => `<li>${x}</li>`)
                .join("") +
              `</ul>`
            : ""
        }
        <div class="org-actions">
          ${
            it.photos?.length
              ? `<button class="btn alt org-view" data-slug="${it.slug}" data-max="4" data-i18n="org_view_photos">${i18n[lang].org_view_photos}</button>`
              : ""
          }
          ${
            it.certFile
              ? `<a class="btn" href="${it.certFile}" target="_blank" rel="noopener" data-i18n="org_view_cert">${i18n[lang].org_view_cert}</a>`
              : ""
          }
        </div>
      </div>
    `;

    ORG.els.list.appendChild(card);
  });

  // bind photo buttons to reuse PG modal
  document.querySelectorAll(".org-view").forEach((btn) => {
    btn.addEventListener("click", () => {
      const slug = btn.dataset.slug;
      const proj = ORG.data.items.find((x) => x.slug === slug);
      if (!proj || !proj.photos?.length) return;
      PG.cur = {
        slug,
        idx: 0,
        list: proj.photos.slice(0, Math.min(4, +btn.dataset.max || 4)),
      };
      const lang = document.documentElement.lang === "id" ? "id" : "en";
      PG.els.title.textContent =
        (proj.title?.[lang] ||
          proj.title?.en ||
          proj.role?.[lang] ||
          proj.role?.en ||
          "") +
        " — " +
        (proj.org?.[lang] || proj.org?.en || "");
      applyPhoto(0);
      PG.els.modal.classList.add("open");
      PG.els.modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });
}

(async () => {
  await loadOrgJSON();
  renderOrg();

  ORG.els.sortScale?.addEventListener("click", () => {
    ORG.sortMode = "scale";
    ORG.els.sortScale.classList.add("active");
    ORG.els.sortTime.classList.remove("active");
    renderOrg();
  });
  ORG.els.sortTime?.addEventListener("click", () => {
    ORG.sortMode = "time";
    ORG.els.sortTime.classList.add("active");
    ORG.els.sortScale.classList.remove("active");
    renderOrg();
  });
})();

// Re-apply language for dynamic buttons after language switch
function reapplyOrgLang() {
  renderOrg();
}
langBtn?.addEventListener("click", () => {
  // setelah applyLang(), panggil render ulang
  setTimeout(reapplyOrgLang, 0);
});

/* ===== Achievements (Training & Certifications) ===== */
const ACHV = {
  data: null,
  filter: "all",
  sort: "prestige",
  page: 1,
  perPage: 8,
  els: {
    list: document.getElementById("achvList"),
    pager: document.getElementById("achvPager"),
    prev: document.getElementById("pgPrev"),
    next: document.getElementById("pgNext"),
    info: document.getElementById("pgInfo"),
    fAll: document.getElementById("fAll"),
    fCert: document.getElementById("fCert"),
    fTrain: document.getElementById("fTrain"),
    sPrestige: document.getElementById("sPrestige"),
    sYear: document.getElementById("sYear"),
  },
};

async function loadAchvJSON() {
  if (ACHV.data) return ACHV.data;
  const res = await fetch("assets/data/achievements.json", {
    cache: "no-store",
  });
  ACHV.data = await res.json();
  return ACHV.data;
}

function prestigeWeight(t, featured) {
  // Higher is earlier
  if (featured) return 3;
  if (t === "cert") return 2;
  return 1; // training
}

function buildAchvList() {
  const lang = document.documentElement.lang === "id" ? "id" : "en";
  let items = [...ACHV.data.items];

  // filter
  if (ACHV.filter !== "all") {
    items = items.filter((x) => x.type === ACHV.filter);
  }

  // sort
  if (ACHV.sort === "prestige") {
    items.sort(
      (a, b) =>
        prestigeWeight(b.type, b.featured) - prestigeWeight(a.type, a.featured)
    );
  } else {
    items.sort((a, b) => (b.year || 0) - (a.year || 0));
  }

  // pagination
  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / ACHV.perPage));
  ACHV.page = Math.min(ACHV.page, pages);
  const start = (ACHV.page - 1) * ACHV.perPage;
  const view = items.slice(start, start + ACHV.perPage);

  ACHV.els.list.innerHTML = "";
  view.forEach((it) => {
    const title = it.title?.[lang] || it.title?.en || "";
    const provider = it.provider?.[lang] || it.provider?.en || "";
    const badgeClass = it.featured
      ? "badge-featured"
      : it.type === "cert"
      ? "badge-cert"
      : "badge-train";
    const typeLabel = it.featured
      ? "Featured"
      : it.type === "cert"
      ? "Cert"
      : "Training";
    const logo = it.logo ? `<img src="${it.logo}" alt="${provider} logo">` : "";

    const card = document.createElement("article");
    card.className = "achv-card";
    card.innerHTML = `
      <div class="achv-logo">${logo}</div>
      <div>
        <div class="achv-head">
          <span class="achv-title">${title}</span>
          <span class="badge ${badgeClass}">${typeLabel}</span>
        </div>
        <div class="achv-meta">${provider} • ${it.year || ""}</div>
        <div class="achv-actions">
          ${
            it.certFile
              ? `<a class="btn" href="${it.certFile}" target="_blank" rel="noopener" data-i18n="achv_view">${i18n[lang].achv_view}</a>`
              : ""
          }
          ${
            it.certUrl
              ? `<a class="btn" href="${it.certUrl}"  target="_blank" rel="noopener" data-i18n="achv_view">${i18n[lang].achv_view}</a>`
              : ""
          }
        </div>
      </div>`;
    ACHV.els.list.appendChild(card);
  });

  // pager state
  ACHV.els.info.textContent = `${ACHV.page} / ${pages}`;
  ACHV.els.prev.disabled = ACHV.page <= 1;
  ACHV.els.next.disabled = ACHV.page >= pages;
}

(async () => {
  await loadAchvJSON();
  buildAchvList();

  // bind filter
  [ACHV.els.fAll, ACHV.els.fCert, ACHV.els.fTrain].forEach((btn) => {
    btn?.addEventListener("click", () => {
      [ACHV.els.fAll, ACHV.els.fCert, ACHV.els.fTrain].forEach((b) =>
        b.classList.remove("active")
      );
      btn.classList.add("active");
      ACHV.filter = btn.dataset.type;
      ACHV.page = 1;
      buildAchvList();
    });
  });

  // bind sort
  ACHV.els.sPrestige?.addEventListener("click", () => {
    ACHV.els.sPrestige.classList.add("active");
    ACHV.els.sYear.classList.remove("active");
    ACHV.sort = "prestige";
    ACHV.page = 1;
    buildAchvList();
  });
  ACHV.els.sYear?.addEventListener("click", () => {
    ACHV.els.sYear.classList.add("active");
    ACHV.els.sPrestige.classList.remove("active");
    ACHV.sort = "year";
    ACHV.page = 1;
    buildAchvList();
  });

  // pager
  ACHV.els.prev?.addEventListener("click", () => {
    if (ACHV.page > 1) {
      ACHV.page--;
      buildAchvList();
    }
  });
  ACHV.els.next?.addEventListener("click", () => {
    ACHV.page++;
    buildAchvList();
  });

  // Show badge "BNSP Certified" on hero if exists
  const hasBNSP = ACHV.data.items.some(
    (x) => x.featured && (x.tags || []).includes("BNSP")
  );
  if (hasBNSP) {
    const eyebrow = document.querySelector(".eyebrow");
    if (eyebrow && !document.getElementById("bnspBadge")) {
      const tag = document.createElement("span");
      tag.id = "bnspBadge";
      tag.className = "tag";
      tag.textContent =
        i18n[
          document.documentElement.lang === "id" ? "id" : "en"
        ].achv_bnsp_badge;
      eyebrow.appendChild(tag);
    }
  }
})();

// Re-render on language change
langBtn?.addEventListener("click", () => setTimeout(buildAchvList, 0));
