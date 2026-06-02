/* ============================================================================
   NIGHTINGALE BEACON SUITE — SINGLE SOURCE OF TRUTH (catalog.js)
   ----------------------------------------------------------------------------
   Every menu (standardized list AND the future overworld map) should read from
   THIS file and nothing else. Two menus reading two hardcoded lists is how the
   launcher (18) and hub (16) drifted apart — this fixes that at the root.

   WHY .js INSTEAD OF .json:
     Loaded via <script src="catalog.js"> so it works under file:// (Desktop
     testing) AND http:// (GitHub Pages). A .json fetch() is blocked by browsers
     under file://. This sets window.NG_CATALOG.

   PATH CONVENTION:
     item.path is relative to the SUITE ROOT (the folder holding launch.html).
     A consumer not at the root prepends its own prefix to root:
        - launch.html (root)        -> prefix ''     -> path used as-is
        - 02_hub/index.html         -> prefix '../'  -> '../' + path
     Helper: NG_CATALOG.resolve(path, rootPrefix)

   GENERIC BY DESIGN:
     "Custom per school" can be wide open, so an item is just:
       { id, type, title, area, path, status, ...freeform metadata }
     New content types (podcast/h5p/flipbook/guide/external) need NO new code —
     a menu switches on item.type. Subjects are not hardcoded to nursing.
   ============================================================================ */
(function () {
  var CATALOG = {
    meta: {
      title: "The Nightingale Beacon Suite",
      tagline: "Change Lives. Beginning with Your Own.",
      version: "v3",
      updated: "2026-05-29",
      // license + review fields are placeholders for the public-launch checklist
      license: null,          // e.g. "CC BY-NC-SA 4.0" once chosen
      reviewedBy: null,       // e.g. "Dr. Vidya Aggrawal" once content is signed off
      variant: "nightingale"  // swap/extend per school for custom builds
    },

    /* Breadth areas. `setting` tags each for the future "Beacon General"
       hospital-on-a-campus overworld (hospital wing vs. campus building). */
    areas: [
      { id: "sci",  label: "Natural Sciences",          icon: "🧬", color: "#5ec8ff", setting: "hospital" },
      { id: "math", label: "Mathematics",               icon: "📐", color: "#ff8c42", setting: "campus"   },
      { id: "comm", label: "English & Communication",   icon: "📝", color: "#88c878", setting: "campus"   },
      { id: "soc",  label: "Social Sciences",           icon: "🧠", color: "#ff6cb6", setting: "campus"   },
      { id: "hum",  label: "Humanities",                icon: "🏛️", color: "#f4c45a", setting: "campus"   }
    ],

    /* type:    "game" | "guide" | "podcast" | "h5p" | "flipbook" | "external"
       status:  "live" | "pending" | "deferred"  (menus may hide non-live)
       visitKey: the kernel gameType.type the game writes to ng_global_progress;
                 null means it does not report progress (e.g. the supplement). */
    items: [
      // ---- NATURAL SCIENCES (hospital wing) ----
      { id:"sci220", type:"game", code:"SCI 220", title:"AnatomyQuest", subtitle:"Human Anatomy", area:"sci", credits:4, status:"live", visitKey:"anatomy",
        path:"01_games/01_BIO_AnatomyQuest_NC_v3.html",
        topics:"Skeletal · Muscular · Cardiovascular · Nervous · Endocrine · Digestive · Renal · Reproductive", boss:"8 system bosses" },
      { id:"sci221", type:"game", code:"SCI 221", title:"PhysiologyQuest", subtitle:"Human Physiology", area:"sci", credits:4, status:"live", visitKey:"physiology",
        path:"01_games/02_BIO_PhysiologyQuest_NC_v3.html",
        topics:"Action potentials · Cardiac cycle · Renal · Endocrine · Respiratory · Reproductive", boss:"10 system bosses" },
      { id:"sci225", type:"game", code:"SCI 225", title:"PathoQuest", subtitle:"Pathophysiology", area:"sci", credits:3, status:"live", visitKey:"patho",
        path:"01_games/03_BIO_PathoQuest_NC_v3_EXEMPLAR.html",
        topics:"Fluid & Immune · Cell & Cancer · Neuro · Endocrine · Cardio · Pulmo-Renal · GI", boss:"7 bosses · v3 exemplar" },
      { id:"drvidya", type:"game", code:"SCI 225 · supplement", title:"Dr. Vidya's Quiz Show", subtitle:"Pathophysiology — chase format", area:"sci", credits:0, status:"live", visitKey:null, flagship:true,
        path:"01_games/04_BIO_DrVidya_QuizShow_NC_v3.html",
        topics:"Rapid-fire chase · 5 tiers", boss:"The Chaser",
        note:"No kernel — does not report cross-game progress." },
      { id:"sci251", type:"game", code:"SCI 251", title:"MicroQuest", subtitle:"Microbiology", area:"sci", credits:4, status:"live", visitKey:"micro",
        path:"01_games/05_BIO_MicroQuest_NC_v3.html",
        topics:"Bacteria · Viruses · Fungi · Parasites · Antibiotics · Sterile Technique", boss:"8 pathogen bosses" },
      { id:"sci131", type:"game", code:"SCI 131", title:"NutritionQuest", subtitle:"Nutrition", area:"sci", credits:3, status:"live", visitKey:"nutrition",
        path:"01_games/06_BIO_NutritionQuest_NC_v3.html",
        topics:"Macros · Micros · Lifespan needs · Clinical nutrition · DM diet planning", boss:"7 nutrition challenges" },

      // ---- MATHEMATICS (campus math annex) ----
      { id:"mat100", type:"game", code:"MAT 100", title:"AlgebraQuest", subtitle:"College Algebra", area:"math", credits:3, status:"live", visitKey:"algebra",
        path:"01_games/07_MAT_AlgebraQuest_NC_v3.html",
        topics:"Linear · Quadratic · Exponential · Logarithmic · Systems", boss:"5 algebra bosses" },
      { id:"mat220", type:"game", code:"MAT 220", title:"StatsQuest", subtitle:"Introduction to Statistics", area:"math", credits:3, status:"live", visitKey:"stats",
        path:"01_games/08_MAT_StatsQuest_NC_v3.html",
        topics:"Descriptive · Probability · Inferential · Hypothesis · Regression", boss:"5 stats bosses" },

      // ---- ENGLISH & COMMUNICATION (campus writing center) ----
      { id:"eng120", type:"game", code:"ENG 120", title:"CompQuest", subtitle:"English Composition", area:"comm", credits:3, status:"live", visitKey:"composition",
        path:"01_games/09_ENG_CompQuest_NC_v3.html",
        topics:"Thesis · Evidence · Argument · Revision · Rhetoric", boss:"5 writing bosses" },
      { id:"eng311", type:"game", code:"ENG 311", title:"EditorsDesk", subtitle:"Professional & Academic Writing", area:"comm", credits:3, status:"live", visitKey:"editors",
        path:"01_games/10_ENG_EditorsDesk_NC_v3.html",
        topics:"Research papers · APA · Lit review · Clinical documentation", boss:"10 writing modes" },
      { id:"com301", type:"game", code:"COM 301", title:"SpeechCraft", subtitle:"Oral Communication", area:"comm", credits:3, status:"live", visitKey:"speech",
        path:"01_games/11_COM_SpeechCraft_NC_v3.html",
        topics:"Public speaking · Persuasion · Group · Interpersonal · Nonverbal", boss:"5 speech bosses" },

      // ---- SOCIAL SCIENCES (campus social science hall) ----
      { id:"psy201", type:"game", code:"PSY 201", title:"PsychQuest", subtitle:"Introduction to Psychology", area:"soc", credits:3, status:"live", visitKey:"psych",
        path:"01_games/12_PSY_PsychQuest_NC_v3.html",
        topics:"Cognition · Personality · Disorders · Development · Social", boss:"7 psych bosses" },
      { id:"psy201lab", type:"game", code:"PSY 201 · lab", title:"PsychLab", subtitle:"Research Methods Lab", area:"soc", credits:0, status:"live", visitKey:"psychlab",
        path:"01_games/13_PSY_PsychLab_NC_v3.html",
        topics:"Research design · Methods · Ethics · Analysis", boss:"Lab challenges",
        note:"Writes visitKey 'psychlab' — hub currently has no node reading it. Reconcile when wiring the hub." },
      { id:"psy300", type:"game", code:"PSY 300", title:"LifespanQuest", subtitle:"Human Development", area:"soc", credits:3, status:"live", visitKey:"lifespan",
        path:"01_games/14_PSY_LifespanQuest_NC_v3.html",
        topics:"Infant · Child · Adolescent · Adult · Older Adult · Erikson stages", boss:"8 lifespan bosses" },
      { id:"soc220", type:"game", code:"SOC 220", title:"SocietyQuest", subtitle:"Introduction to Sociology", area:"soc", credits:3, status:"live", visitKey:"society",
        path:"01_games/15_SOC_SocietyQuest_NC_v3.html",
        topics:"Functionalism · Conflict · Symbolic Interactionism · Stratification · Deviance", boss:"5 sociological lenses" },
      { id:"ant300", type:"game", code:"ANT 300", title:"CultureQuest", subtitle:"Cultural Anthropology", area:"soc", credits:3, status:"live", visitKey:"culture",
        path:"01_games/16_SOC_CultureQuest_NC_v3.html",
        topics:"Kinship · Ritual · Language · Exchange · Cross-cultural", boss:"5 cultural domains" },

      // ---- HUMANITIES (campus humanities hall) ----
      { id:"hum110", type:"game", code:"HUM 110", title:"WesternCivQuest", subtitle:"Western Civilization I", area:"hum", credits:3, status:"live", visitKey:"westerncivil",
        path:"01_games/17_HUM_WesternCivQuest_NC_v3.html",
        topics:"Mesopotamia · Egypt · Greece · Rome · Medieval · Renaissance", boss:"7 civilizations" },
      { id:"hum301", type:"game", code:"HUM 301", title:"EthicsQuest", subtitle:"Applied Ethics", area:"hum", credits:3, status:"live", visitKey:"ethics",
        path:"01_games/18_HUM_EthicsQuest_NC_v3.html",
        topics:"Utilitarianism · Deontology · Virtue · Care · Justice · Nursing ethics", boss:"5 ethical frameworks" },

      // ---- SCI 225 STUDY GUIDES (Dr. Vidya Aggrawal's self-contained HTML guides, in /guides) ----
      { id:"sci225-g-wk1", type:"guide", tool:"guide", course:"SCI 225", area:"sci", status:"live", title:"Week 1 — Genetics & Cell Biology",      path:"guides/SCI225_Week1_Study_Guide.html" },
      { id:"sci225-g-wk2", type:"guide", tool:"guide", course:"SCI 225", area:"sci", status:"live", title:"Week 2 — Immunity & Hypersensitivity",  path:"guides/SCI225_Week2_Study_Guide.html" },
      { id:"sci225-g-wk3", type:"guide", tool:"guide", course:"SCI 225", area:"sci", status:"live", title:"Week 3 — Oncology",                     path:"guides/SCI225_Week3_Study_Guide.html" },
      { id:"sci225-g-wk4", type:"guide", tool:"guide", course:"SCI 225", area:"sci", status:"live", title:"Week 4 — Neurologic Function",          path:"guides/SCI225_Week4_Study_Guide.html" },
      { id:"sci225-g-wk5", type:"guide", tool:"guide", course:"SCI 225", area:"sci", status:"live", title:"Week 5 — CNS/PNS, NMJ & Peds Neuro",     path:"guides/SCI225_Week5_Study_Guide.html" },
      { id:"sci225-g-wk6", type:"guide", tool:"guide", course:"SCI 225", area:"sci", status:"live", title:"Week 6 — Endocrine",                    path:"guides/SCI225_Week6_Study_Guide.html" },
      { id:"sci225-g-wk8", type:"guide", tool:"guide", course:"SCI 225", area:"sci", status:"live", title:"Week 8 — Hematology",                  path:"guides/SCI225_Week8_Study_Guide.html" },
      { id:"sci225-g-wk9", type:"guide", tool:"guide", course:"SCI 225", area:"sci", status:"live", title:"Week 9 — Cardiovascular",               path:"guides/SCI225_Week9_Study_Guide.html" },
      { id:"sci225-g-mid", type:"guide", tool:"guide", course:"SCI 225", area:"sci", status:"live", title:"Midterm — High-Yield Review",           path:"guides/SCI225_Pathophysiology_Midterm_Review.html" },

      // ---- SCI 225 FLASHCARDS (active-recall decks, by week — shared app, deep-linked per deck) ----
      { id:"sci225-f-wk1", type:"flash", tool:"flash", course:"SCI 225", area:"sci", status:"live", title:"Week 1 — Genetics & Cell Biology",  path:"guides/SCI225_Flashcards.html?deck=wk1" },
      { id:"sci225-f-wk2", type:"flash", tool:"flash", course:"SCI 225", area:"sci", status:"live", title:"Week 2 — Immunity & Hypersensitivity", path:"guides/SCI225_Flashcards.html?deck=wk2" },
      { id:"sci225-f-wk3", type:"flash", tool:"flash", course:"SCI 225", area:"sci", status:"live", title:"Week 3 — Oncology",                  path:"guides/SCI225_Flashcards.html?deck=wk3" },
      { id:"sci225-f-wk4", type:"flash", tool:"flash", course:"SCI 225", area:"sci", status:"live", title:"Week 4 — Neurologic Function",       path:"guides/SCI225_Flashcards.html?deck=wk4" },
      { id:"sci225-f-wk5", type:"flash", tool:"flash", course:"SCI 225", area:"sci", status:"live", title:"Week 5 — CNS/PNS, NMJ & Peds Neuro",  path:"guides/SCI225_Flashcards.html?deck=wk5" },
      { id:"sci225-f-wk6", type:"flash", tool:"flash", course:"SCI 225", area:"sci", status:"live", title:"Week 6 — Endocrine",                 path:"guides/SCI225_Flashcards.html?deck=wk6" },
      { id:"sci225-f-wk8", type:"flash", tool:"flash", course:"SCI 225", area:"sci", status:"live", title:"Week 8 — Hematology",                path:"guides/SCI225_Flashcards.html?deck=wk8" },
      { id:"sci225-f-wk9", type:"flash", tool:"flash", course:"SCI 225", area:"sci", status:"live", title:"Week 9 — Cardiovascular",            path:"guides/SCI225_Flashcards.html?deck=wk9" }

      /* ---- STUDY GUIDES / FLASHCARDS / etc — MANY per course is fine ----
         A course is a shell; a `tool` is a CATEGORY that can hold multiple items.
         Tag each with the same `course` + `tool` and the course hub auto-groups them:
         one item launches directly; 2+ items show "VIEW (N)" -> a sub-menu list.

         Example: several Patho study guides + flashcard decks —
         { id:"sci225-guide-wk1", type:"guide", tool:"guide", course:"SCI 225", area:"sci",
           title:"Week 1 — Cellular Injury", status:"live", external:true, path:"https://<link>" },
         { id:"sci225-guide-wk2", type:"guide", tool:"guide", course:"SCI 225", area:"sci",
           title:"Week 2 — Inflammation",   status:"live", external:true, path:"https://<link>" },
         { id:"sci225-guide-mid", type:"guide", tool:"guide", course:"SCI 225", area:"sci",
           title:"Midterm Review",          status:"live", external:true, path:"https://<link>" },
         { id:"sci225-flash-1",  type:"flash", tool:"flash", course:"SCI 225", area:"sci",
           title:"Patho Core Deck",         status:"live", external:true, path:"https://<link>" }
         (`course`/`tool` are auto-derived for games; for these set them explicitly.)
         NOTE: a public site + a public cloud link = world-readable files.
         Confirm the folder is intentionally public before publishing.

         ---- DEFERRED (switch status to "live" when ready) ----
         Podcasts (Spotify) and personal H5P links are intentionally omitted for now.
         When ready: type+tool:"podcast" / "h5p", external:true, with the embed/link URL.
      */
    ],

    /* Resolve an item.path against a consumer's prefix-to-root. */
    resolve: function (path, rootPrefix) {
      if (!path) return path;
      if (/^https?:\/\//i.test(path)) return path; // external link, leave as-is
      return (rootPrefix || "") + path;
    },

    /* Convenience filters used by menus. */
    games: function () { return this.items.filter(function (i) { return i.type === "game" && i.status === "live"; }); },
    byArea: function (areaId) { return this.items.filter(function (i) { return i.area === areaId; }); },
    liveCount: function () { return this.items.filter(function (i) { return i.status === "live"; }).length; },

    /* COURSE SHELLS — every item carries `course` (e.g. "SCI 225") + `tool`
       (quest|quiz|lab|guide|flash|podcast). A course is a shell that holds many
       tools; add a tool, tag it to the course, it appears. byCourse() returns one
       course's tools; courses() returns the grouped shells with a display title. */
    byCourse: function (c) { return this.items.filter(function (i) { return i.course === c && i.status !== "deferred"; }); },
    courses: function () {
      var order = [], map = {};
      this.items.forEach(function (it) {
        if (it.status === "deferred") return; var c = it.course; if (!c) return;
        if (!map[c]) { map[c] = { course: c, area: it.area, title: "", items: [] }; order.push(c); }
        map[c].items.push(it);
        if (it.tool === "quest" && !map[c].title) map[c].title = it.subtitle || it.title;
      });
      return order.map(function (c) { var s = map[c]; if (!s.title) s.title = (s.items[0] && (s.items[0].subtitle || s.items[0].title)) || c; return s; });
    }
  };

  /* Derive course + tool for every item (no hand-editing 18 entries).
     course := the code minus any " · supplement"/" · lab" suffix.
     tool   := games default to "quest"; overrides below; non-games use their type. */
  (function () {
    var TOOL_OVERRIDE = { drvidya: "quiz", psy201lab: "lab" };
    CATALOG.items.forEach(function (it) {
      if (!it.course) it.course = (it.code || "").replace(/\s*·.*$/, "").trim();
      if (!it.tool) it.tool = TOOL_OVERRIDE[it.id] || (it.type === "game" ? "quest" : it.type);
    });
  })();

  if (typeof window !== "undefined") window.NG_CATALOG = CATALOG;
  if (typeof module !== "undefined" && module.exports) module.exports = CATALOG;
})();
