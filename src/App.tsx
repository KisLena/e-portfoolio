/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { DEFAULT_PORTFOLIO_DATA } from './data/defaultPortfolioData';

// Section definition
interface SectionDef {
  title: string;
  slug: string;
  color: string;
  desc: string;
  items: string[];
  prefix: string;
  customIds?: string[];
}

const SECTIONS: SectionDef[] = [
  {
    title: "Mina ise",
    slug: "mina-ise",
    color: "var(--bl)",
    desc: "Minu enesehoid, heaolu ja professionaalne areng.",
    items: [
      "Karjääritee kujundamine",
      "Teadmiste ajakohastamine",
      "Uurimusliku lähenemise rakendamine enda professionaalsuse arendamiseks",
      "Õppimisoskus",
      "Innovatsioonipädevus"
    ],
    prefix: "mi",
    customIds: ["mi3", "mi4", "mi5", "mi6", "mi7"]
  },
  {
    title: "Enesehoid",
    slug: "enesehoid",
    color: "var(--gr)",
    desc: "Minu professionaalse heaolu ja enesearengu toetamine.",
    items: [
      "Tervise hoidmine",
      "Tasakaalu hoidmine"
    ],
    prefix: "eh",
    customIds: ["mi1", "mi2"]
  },
  {
    title: "Õppija toetamine",
    slug: "oppija-toetamine",
    color: "var(--rd)",
    desc: "Õppijate arengu toetamine, õpetamine ja õpikeskkonna kujundamine.",
    items: [
      "Õppijate tundmaõppimine",
      "Suhete loomine, keskkonna kujundamine ja õppijatest hoolimine",
      "Õpetamise kavandamine ja õpetamine",
      "Õppevara valimine, kohandamine, koostamine ja jagamine",
      "Ainesisu käsitlemine",
      "Väärtuste kujundamine ja järgimine",
      "Üldpädevuste arendamine",
      "Õppijate võimestamine",
      "Tagasiside andmine ja hindamine",
      "Analüüsi- ja sünteesioskus",
      "Suhtlemisoskus"
    ],
    prefix: "ot"
  },
  {
    title: "Organisatsioon",
    slug: "organisatsioon",
    color: "var(--ye)",
    desc: "Koostöö kolleegide ja lapsevanematega ning panustamine organisatsiooni tegevusse.",
    items: [
      "Eesmärkidest ja väärtustest lähtumine",
      "Koostöö kolleegidega oma organisatsioonis",
      "Turvaline töökeskkond",
      "Kolleegide professionaalse arengu toetamine",
      "Suhtlemine ja koostöö lapsevanematega",
      "Info ja andmed organisatsioonis",
      "Väärtustest lähtumine",
      "Koostööoskus"
    ],
    prefix: "og"
  },
  {
    title: "Ökosüsteem",
    slug: "okosusteem",
    color: "#8E6BBF",
    desc: "Koostöö haridusvaldkonnas, õpetaja elukutse väärtustamine ja teadmiste jagamine.",
    items: [
      "Koostöö ja panustamine valdkonna- või erialaühenduste töösse",
      "Õpetaja elukutse positiivse kuvandi kujundamine",
      "Pedagoogilise teadmuse levitamine ühiskonnas",
      "Säilenõtkus",
      "Digipädevus"
    ],
    prefix: "ok"
  }
];

const ICONS = [
  <svg key="0" width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="10" r="5" fill="#fff"/><rect x="6" y="17" width="16" height="9" rx="3" fill="#fff"/></svg>,
  <svg key="1" width="28" height="28" viewBox="0 0 28 28"><circle cx="12" cy="14" r="6" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="4 2.5"/><path d="M18 20c6-1 8-7 8-10-4 0-9 3-8 10z" fill="#fff"/></svg>,
  <svg key="2" width="28" height="28" viewBox="0 0 28 28"><rect x="6" y="9" width="16" height="12" rx="3" fill="#fff"/><circle cx="11" cy="14" r="2" fill="#E85D5D"/><circle cx="17" cy="14" r="2" fill="#E85D5D"/><rect x="12" y="4" width="4" height="5" fill="#fff"/></svg>,
  <svg key="3" width="28" height="28" viewBox="0 0 28 28"><rect x="4" y="12" width="12" height="10" rx="2" fill="#fff"/><rect x="12" y="6" width="12" height="10" rx="2" fill="#24364B" opacity=".75"/><circle cx="8" cy="10" r="2" fill="#fff"/><circle cx="18" cy="4" r="2" fill="#24364B"/></svg>,
  <svg key="4" width="28" height="28" viewBox="0 0 28 28"><circle cx="9" cy="14" r="5" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="3 2"/><circle cx="20" cy="9" r="4" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="3 2"/><circle cx="20" cy="20" r="4" fill="#fff"/></svg>
];

const PROMPTS: Record<string, string> = {
  mi1: "Kirjelda, kuidas enda vaimse, füüsilise, sotsiaalse ja emotsionaalse heaolu eest hoolitsed.",
  mi2: "Selgita näidete kaudu, mida tähendab sinu jaoks enda töö- ja eraelu tasakaalus hoidmine.",
  mi3: "Lisa enda karjääriplaan, mis tugineb professionaalse tegevuse refleksioonil.",
  mi4: "Lisa kolm enda õpetamisvaldkonna õpetamise- ja õppimisalast hiljutist uuendust või uuringut, millega oled kokku puutunud.",
  mi5: "Ava, mida tähendab sinu jaoks uurimusliku lähenemise rakendamine enda professionaalsuse arendamiseks. Lisa enda õpetamisoskuse analüüs koos plaaniga oskust täiustada.",
  ot1: "Too kolm näidet enda tööst, kuidas õppijat, õppijate rühma ja nende eripärasid tundma õpid.",
  ot2: "Kirjelda, kuidas oled õppijatega suhteid kujundanud ja hoidnud. Too kolm näidet, kuidas oled loonud õppimiseks turvalise ja kaasava keskkonna.",
  ot3: "Visualiseeri õppeprotsessi kui tervikut enda ühe tunni ja ühe õppeperioodi näitel, lisades juurde enda töökava, tunnikava, töölehtede koopiad, näited õppematerjalidest, diferentseeritud ülesanded, hindamise ja tagasisidestamise alused. Lisa selgitused, põhjendused, mille alusel oled õppetööd kohandanud.",
  ot4: "Kirjelda, mida väärtustad õppevara juures. Too kaks näidet 1) enda kasutatud, 2) kohandatud ja 3) koostatud õppevarast.",
  ot5: "Selgita, kuidas tekitad enda aine vastu huvi – too kolm võimalikult konkreetset näidet.",
  ot6: "Kirjelda, kuidas kujundad ja järgid õppijatega väärtusi läbi kolme näite.",
  ot7: "Too iga üldpädevuse arendamise kohta enda tööst kaks näidet.",
  ot8: "Too kaks näidet, kus oled 1) õppijaid sihipäraselt võimestanud, 2) suunanud neid aktiivselt enda õppimise ja arengu eest vastutust võtma. Too kaks näidet võimalikest stereotüüpidest enda töös koos selgitusega, kuidas väldid nende kinnistamist.",
  ot9: "Lisa koopiaid/kuvatõmmiseid sinu antud tagasisidest õppijale. Tutvusta kolme enda tunnis kasutusel olevat hindamismeetodit.",
  og1: "Too kaks näidet, kus oled juhindunud enda töös organisatsiooni eesmärkidest ja väärtustest ning kaks näidet, mis näitavad et juhindud enda õigustest ja kohustustest.",
  og2: "Lisa kaks näidet enda koostööst kolleegidega.",
  og3: "Lisa kaks näidet toetava ja turvalise töökeskkonna kujundamisest koos kolleegidega.",
  og4: "Too kaks näidet, kuidas toetad kolleegide professionaalset arengut.",
  og5: "Analüüsi enda koostööd lapsevanematega kahe näite põhjal.",
  og6: "Kirjelda kolme näite kaudu, millised on sinu töös kõige olulisemad info ja andmete jagamise põhimõtted, mida järgid.",
  ok1: "Tõenda ja põhjenda osalemist valdkonna- ja/või erialaühenduste tegevustes.",
  ok2: "Too kaks näidet, millega oled ühiskonnas eeskujuks õpetaja elukutsest positiivse kuvandi kujundamisel.",
  ok3: "Too kolm näidet erinevatel haridusvaldkonna avalikel üritustel, uurimis- ja/või projektrühmades osalemisest.",
  mi6: "Ava paari näite kaudu, kuidas valid ja kohandad teadlikult tõhusaid õpistrateegiaid, et omandada uusi pädevusi ning suuta eesmärgipäraselt juhtida õppimisega seotud motivatsiooni ja emotsioone.",
  mi7: "Ava paari näite kaudu, kuidas lähened raskustele-probleemidele eri vaatenurkadest, otsid neile loovaid ja tõhusamaid lahendusi ning rakendad uudseid lähenemisviise, meetodeid ja materjale, olles valmis toime tulema ebakindluse ja eksimise võimalustega.",
  ot10: "Ava paari näite kaudu, kuidas kasutad mõtlemisel süsteemset arutlust, mõtestad protsesse, nähtusi ja nendega seotud osapooli ning selgitad nendevahelisi suhteid, valikute tegemisel alternatiivide tugevusi ja nõrkusi ning lood saadud teadmistest uusi tervikuid ja teed järeldusi.",
  ot11: "Ava paari näite kaudu, kuidas lood, hoiad ja arendad teiste inimestega usaldusväärseid ning koostööle suunatud suhteid, väljendades end selgelt ja viisakalt; märkad enda ja teiste vajadusi, ootusi ja emotsioone ning kohandad suhtlust, toetades positiivset ja mõistvat suhtluskeskkonda.",
  og7: "Kirjelda, milliseid üldinimlikke väärtusi ja põhimõtteid oma tegevuses järgid.",
  og8: "Ava paari näite kaudu, kuidas sead teistega ühiselt eesmärke ning teed nende saavutamise nimel tõhusat koostööd, arvestades osapoolte vajaduste ja seisukohtadega.",
  ok4: "Ava paari näite kaudu, kuidas tuled toime muutustega nii tunnete, mõtete kui ka käitumise tasandil, reageerides adekvaatselt ja asjalikult ning taastades enesehoiuks vajaliku tasakaalu.",
  ok5: "Ava paari näite kaudu, kuidas suhtud positiivselt digivahendite, -keskkondade ja -sisu tähenduslikku eesmärgipärasesse kasutamisse ning rakendad ja kohandad neid tõhusalt, eetiliselt ja vastutustundlikult oma töös. Too välja, milliseid digipädevusi enda töös vajad ja milliseid järgmisena plaanid edasi arendada."
};

interface EvidenceRecord {
  id: string;
  k: string;
  title: string;
  desc: string;
  type: 'file' | 'link';
  url?: string;
  blob?: Blob;
  name?: string;
  mime?: string;
  ts: number;
}

const processUploadedImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = (e.target?.result as string) || '';
      if (file.size < 600 * 1024) {
        resolve(src);
        return;
      }
      const img = new Image();
      img.onload = () => {
        const maxDim = 1200;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(src);
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.9);
        resolve(dataUrl);
      };
      img.onerror = () => resolve(src);
      img.src = src;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => location.hash.replace(/^#\/?/, '') || '');
  const [menuOpen, setMenuOpen] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);

  // Hero custom image state
  const [heroImage, setHeroImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('eport_hero_image') || DEFAULT_PORTFOLIO_DATA.heroImage || null;
    } catch {
      return DEFAULT_PORTFOLIO_DATA.heroImage || null;
    }
  });
  const heroFileInputRef = useRef<HTMLInputElement | null>(null);
  const importFileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Texts store
  const [textValues, setTextValues] = useState<Record<string, string>>(() => ({
    ...DEFAULT_PORTFOLIO_DATA.texts,
  }));
  const [textStatuses, setTextStatuses] = useState<Record<string, { msg: string; type: 'ok' | 'err' | 'idle' }>>({});

  // Evidence store
  const [evidenceMap, setEvidenceMap] = useState<Record<string, EvidenceRecord[]>>(() => {
    const map: Record<string, EvidenceRecord[]> = {};
    Object.entries(DEFAULT_PORTFOLIO_DATA.evidence).forEach(([k, list]) => {
      map[k] = [...(list as any[])];
    });
    return map;
  });

  // Collapsible sub-competency panels state
  // Empty panels (no text/evidence) are collapsed; panels with written content are open.
  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>({});

  // Reset manually toggled panel states when navigating between competency sections
  useEffect(() => {
    setOpenPanels({});
  }, [currentRoute]);

  // Modal dialog states
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [activeEvidenceKey, setActiveEvidenceKey] = useState<string>('');
  const [editingItem, setEditingItem] = useState<EvidenceRecord | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formType, setFormType] = useState<'file' | 'link'>('file');
  const [formUrl, setFormUrl] = useState('');
  const [formFile, setFormFile] = useState<File | null>(null);
  const [formError, setFormError] = useState('');

  // Admin / Edit Mode authorization states (Default: false for visitors/evaluators)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return (
        sessionStorage.getItem('eport_is_admin') === 'true' ||
        localStorage.getItem('eport_is_admin') === 'true'
      );
    } catch {
      return false;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginPasswordInput, setLoginPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState('');

  const [isGitHubInfoModalOpen, setIsGitHubInfoModalOpen] = useState(false);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<EvidenceRecord | null>(null);

  // IndexedDB database reference
  const dbRef = useRef<IDBDatabase | null>(null);
  const saveTimeoutRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Initialize IndexedDB
  useEffect(() => {
    if (!window.indexedDB) {
      setWarning("IndexedDB puudub seadmes.");
      return;
    }

    const request = indexedDB.open("eportfoolio", 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("text")) {
        db.createObjectStore("text");
      }
      if (!db.objectStoreNames.contains("ev")) {
        db.createObjectStore("ev", { keyPath: "id" }).createIndex("k", "k");
      }
    };

    request.onsuccess = () => {
      const db = request.result;
      dbRef.current = db;
      navigator.storage?.persist?.();
      loadAllData(db);
    };

    request.onerror = () => {
      setWarning("Brauseri andmesalvestus pole saadaval. Muudatusi ei saa salvestada.");
    };
  }, []);

  // Listen to hash change
  useEffect(() => {
    const handleHash = () => {
      const route = location.hash.replace(/^#\/?/, '') || '';
      setCurrentRoute(route);
      window.scrollTo(0, 0);
      setMenuOpen(false);
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Auto-prompt login dialog if URL contains ?edit=1 or ?admin=1
  useEffect(() => {
    try {
      const search = window.location.search;
      if (search.includes('admin=1') || search.includes('edit=1')) {
        const isAuth =
          sessionStorage.getItem('eport_is_admin') === 'true' ||
          localStorage.getItem('eport_is_admin') === 'true';
        if (!isAuth) {
          setIsLoginModalOpen(true);
        }
      }
    } catch {}
  }, []);

  // Fetch static portfolio-data.json if present on hosting (GitHub Pages)
  useEffect(() => {
    fetch('./portfolio-data.json')
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then(async (data) => {
        if (!data || typeof data !== 'object') return;
        if (data.texts && typeof data.texts === 'object') {
          setTextValues((prev) => ({ ...data.texts, ...prev }));
        }
        if (data.heroImage) {
          setHeroImage((prev) => prev || data.heroImage);
        }
        if (data.evidence && typeof data.evidence === 'object') {
          const newEvMap: Record<string, EvidenceRecord[]> = {};
          for (const [k, list] of Object.entries(data.evidence)) {
            if (!Array.isArray(list)) continue;
            newEvMap[k] = [];
            for (const item of list as any[]) {
              let blob: Blob | undefined = undefined;
              if (item.base64Blob) {
                try {
                  const res = await fetch(item.base64Blob);
                  blob = await res.blob();
                } catch {}
              }
              newEvMap[k].push({
                id: item.id || crypto.randomUUID(),
                k: item.k || k,
                title: item.title || '',
                desc: item.desc || '',
                type: item.type || 'file',
                url: item.url,
                name: item.name,
                mime: item.mime,
                ts: item.ts || Date.now(),
                blob,
              });
            }
          }
          setEvidenceMap((prev) => {
            const merged = { ...prev };
            Object.entries(newEvMap).forEach(([k, list]) => {
              if (!merged[k] || merged[k].length === 0) {
                merged[k] = list;
              }
            });
            return merged;
          });
        }
      })
      .catch(() => {});
  }, []);

  // Admin authentication handlers
  const getAdminPassword = () => {
    try {
      const stored = localStorage.getItem('eport_admin_password');
      if (!stored || stored === 'elena2024') {
        localStorage.setItem('eport_admin_password', 'Elena2026');
        return 'Elena2026';
      }
      return stored;
    } catch {
      return 'Elena2026';
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPass = getAdminPassword();
    const entered = loginPasswordInput.trim();
    if (entered === currentPass || entered.toLowerCase() === currentPass.toLowerCase()) {
      setIsAdmin(true);
      try {
        sessionStorage.setItem('eport_is_admin', 'true');
        localStorage.setItem('eport_is_admin', 'true');
      } catch {}
      setIsLoginModalOpen(false);
      setLoginPasswordInput('');
      setLoginError('');
    } else {
      setLoginError('Vale parool. Palun kontrollige parooli ja proovige uuesti.');
    }
  };

  const handleExitAdmin = () => {
    setIsAdmin(false);
    try {
      sessionStorage.removeItem('eport_is_admin');
      localStorage.removeItem('eport_is_admin');
    } catch {}
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const newPass = newPasswordInput.trim();
    if (newPass.length < 4) {
      alert('Parool peab olema vähemalt 4 tähemärki pikk.');
      return;
    }
    try {
      localStorage.setItem('eport_admin_password', newPass);
      setPasswordChangeSuccess('Uus parool on edukalt salvestatud!');
      setTimeout(() => {
        setIsPasswordChangeOpen(false);
        setPasswordChangeSuccess('');
        setNewPasswordInput('');
      }, 1500);
    } catch {
      alert('Parooli salvestamine ebaõnnestus.');
    }
  };

  // Export current data as public portfolio-data.json for GitHub
  const handleDownloadPublicData = async () => {
    try {
      const exportData = {
        version: 1,
        updatedAt: new Date().toISOString(),
        heroImage: heroImage || null,
        texts: textValues,
        evidence: {} as Record<string, any[]>,
      };

      for (const [k, list] of Object.entries(evidenceMap)) {
        exportData.evidence[k] = await Promise.all(
          list.map(async (item) => {
            let base64Blob: string | undefined = undefined;
            if (item.type === 'file' && item.blob) {
              try {
                base64Blob = await new Promise<string>((res, rej) => {
                  const r = new FileReader();
                  r.onload = () => res(r.result as string);
                  r.onerror = rej;
                  r.readAsDataURL(item.blob!);
                });
              } catch (err) {
                console.warn('Could not serialize blob for item', item.id, err);
              }
            }
            return {
              id: item.id,
              k: item.k,
              title: item.title,
              desc: item.desc,
              type: item.type,
              url: item.url,
              name: item.name,
              mime: item.mime,
              ts: item.ts,
              base64Blob,
            };
          })
        );
      }

      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'portfolio-data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setIsGitHubInfoModalOpen(true);
    } catch (err: any) {
      alert('Andmete salvestamine ebaõnnestus: ' + (err?.message || 'viga'));
    }
  };

  // Load texts & evidence from IndexedDB
  const loadAllData = async (db: IDBDatabase) => {
    try {
      // 1. Load texts
      const textTx = db.transaction("text", "readonly");
      const textStore = textTx.objectStore("text");
      const keysReq = textStore.getAllKeys();
      const valsReq = textStore.getAll();

      textTx.oncomplete = () => {
        const keys = keysReq.result;
        const vals = valsReq.result;
        const map: Record<string, string> = {};
        keys.forEach((k, idx) => {
          map[String(k)] = String(vals[idx] || '');
        });
        setTextValues((prev) => ({ ...DEFAULT_PORTFOLIO_DATA.texts, ...prev, ...map }));
        if (map['hero-image']) {
          setHeroImage(map['hero-image']);
          try {
            localStorage.setItem('eport_hero_image', map['hero-image']);
          } catch {}
        } else if (DEFAULT_PORTFOLIO_DATA.heroImage) {
          setHeroImage(DEFAULT_PORTFOLIO_DATA.heroImage);
        }
      };

      // 2. Load evidence
      const evTx = db.transaction("ev", "readonly");
      const evStore = evTx.objectStore("ev");
      const allEvReq = evStore.getAll();

      evTx.oncomplete = () => {
        const records: EvidenceRecord[] = allEvReq.result || [];
        const evMap: Record<string, EvidenceRecord[]> = {};
        Object.entries(DEFAULT_PORTFOLIO_DATA.evidence).forEach(([k, list]) => {
          evMap[k] = [...(list as any[])];
        });
        records.forEach((rec) => {
          if (!evMap[rec.k]) evMap[rec.k] = [];
          evMap[rec.k] = evMap[rec.k].filter((x) => x.id !== rec.id);
          evMap[rec.k].push(rec);
        });
        Object.keys(evMap).forEach((k) => {
          evMap[k].sort((a, b) => a.ts - b.ts);
        });
        setEvidenceMap(evMap);
      };
    } catch (e) {
      console.error("Error loading data from DB", e);
    }
  };

  // Text change handler with debounced save to IndexedDB
  const handleTextChange = (key: string, val: string) => {
    setTextValues((prev) => ({ ...prev, [key]: val }));
    setTextStatuses((prev) => ({
      ...prev,
      [key]: { msg: "Muudatused salvestamata…", type: "idle" }
    }));

    if (saveTimeoutRef.current[key]) {
      clearTimeout(saveTimeoutRef.current[key]);
    }

    saveTimeoutRef.current[key] = setTimeout(async () => {
      await saveTextToDB(key, val);
    }, 700);
  };

  const saveTextToDB = async (key: string, val: string) => {
    const db = dbRef.current;
    if (!db) {
      // Fallback to localStorage if available
      try {
        localStorage.setItem(`eport_${key}`, val);
        setTextStatuses((prev) => ({
          ...prev,
          [key]: {
            msg: "Salvestatud " + new Date().toLocaleTimeString("et-EE", { hour: "2-digit", minute: "2-digit" }),
            type: "ok"
          }
        }));
      } catch (err) {
        setTextStatuses((prev) => ({
          ...prev,
          [key]: { msg: "Salvestamine ebaõnnestus", type: "err" }
        }));
      }
      return;
    }

    try {
      const tx = db.transaction("text", "readwrite");
      tx.objectStore("text").put(val, key);
      tx.oncomplete = () => {
        setTextStatuses((prev) => ({
          ...prev,
          [key]: {
            msg: "Salvestatud " + new Date().toLocaleTimeString("et-EE", { hour: "2-digit", minute: "2-digit" }),
            type: "ok"
          }
        }));
      };
      tx.onerror = () => {
        setTextStatuses((prev) => ({
          ...prev,
          [key]: { msg: "Salvestamine ebaõnnestus", type: "err" }
        }));
      };
    } catch (e: any) {
      setTextStatuses((prev) => ({
        ...prev,
        [key]: { msg: "Salvestamine ebaõnnestus: " + (e.message || ""), type: "err" }
      }));
    }
  };

  const handleImageSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setWarning('Palun valige pildifail (PNG, JPG, WebP jne).');
      return;
    }
    try {
      const dataUrl = await processUploadedImage(file);
      setHeroImage(dataUrl);
      try {
        localStorage.setItem('eport_hero_image', dataUrl);
      } catch {}
      await saveTextToDB('hero-image', dataUrl);
    } catch (err) {
      console.error('Pildi töötlemise viga', err);
      setWarning('Pildi üleslaadimine ebaõnnestus.');
    }
  };

  const handleRemoveHeroImage = async () => {
    setHeroImage(null);
    try {
      localStorage.removeItem('eport_hero_image');
    } catch {}
    await saveTextToDB('hero-image', '');
  };

  // Open modal to add or edit evidence
  const openEvidenceModal = (key: string, itemToEdit?: EvidenceRecord) => {
    setActiveEvidenceKey(key);
    setFormError('');
    if (itemToEdit) {
      setEditingItem(itemToEdit);
      setFormTitle(itemToEdit.title);
      setFormDesc(itemToEdit.desc || '');
      setFormType(itemToEdit.type);
      setFormUrl(itemToEdit.url || '');
      setFormFile(null);
    } else {
      setEditingItem(null);
      setFormTitle('');
      setFormDesc('');
      setFormType('file');
      setFormUrl('');
      setFormFile(null);
    }
    setIsEvidenceModalOpen(true);
  };

  // Submit Evidence Form
  const handleSaveEvidence = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    const title = formTitle.trim();
    if (!title) {
      setFormError("Palun sisesta pealkiri.");
      return;
    }

    const db = dbRef.current;
    if (!db) {
      setFormError("Andmebaas pole kättesaadav.");
      return;
    }

    const rec: EvidenceRecord = {
      id: editingItem?.id || crypto.randomUUID(),
      k: activeEvidenceKey,
      title,
      desc: formDesc.trim(),
      type: formType,
      ts: editingItem?.ts || Date.now()
    };

    if (formType === 'link') {
      const u = formUrl.trim();
      try {
        const p = new URL(u);
        if (!/^https?:$/.test(p.protocol)) throw new Error();
      } catch {
        setFormError("Sisesta korrektne veebiaadress, mis algab https://");
        return;
      }
      rec.url = u;
    } else {
      const allowedExt = ["pdf", "jpg", "jpeg", "png", "doc", "docx", "odt", "txt"];
      if (formFile) {
        const ext = formFile.name.split('.').pop()?.toLowerCase() || '';
        if (!allowedExt.includes(ext)) {
          setFormError("Failitüüp ei ole toetatud. Kasuta PDF, JPG, PNG, DOC, DOCX, ODT või TXT.");
          return;
        }
        if (formFile.size > 15 * 1048576) {
          setFormError("Fail on liiga suur (maksimaalselt 15 MB).");
          return;
        }
        rec.blob = formFile;
        rec.name = formFile.name;
        rec.mime = formFile.type || "application/octet-stream";
      } else if (editingItem?.type === 'file') {
        rec.blob = editingItem.blob;
        rec.name = editingItem.name;
        rec.mime = editingItem.mime;
      } else {
        setFormError("Vali fail või kasuta veebiaadressi.");
        return;
      }
    }

    try {
      const tx = db.transaction("ev", "readwrite");
      tx.objectStore("ev").put(rec);
      tx.oncomplete = () => {
        setIsEvidenceModalOpen(false);
        // Refresh evidence map
        setEvidenceMap((prev) => {
          const list = [...(prev[activeEvidenceKey] || [])];
          const existIdx = list.findIndex((x) => x.id === rec.id);
          if (existIdx >= 0) {
            list[existIdx] = rec;
          } else {
            list.push(rec);
          }
          list.sort((a, b) => a.ts - b.ts);
          return { ...prev, [activeEvidenceKey]: list };
        });
      };
      tx.onerror = (err: any) => {
        setFormError("Salvestamine ebaõnnestus: " + (err.target?.error?.message || "viga"));
      };
    } catch (e: any) {
      setFormError("Viga: " + (e.message || "salvestamine ebaõnnestus"));
    }
  };

  // Delete evidence
  const handleDeleteEvidence = async () => {
    if (!deleteTarget) return;
    const db = dbRef.current;
    if (!db) return;

    try {
      const tx = db.transaction("ev", "readwrite");
      tx.objectStore("ev").delete(deleteTarget.id);
      tx.oncomplete = () => {
        setEvidenceMap((prev) => {
          const list = (prev[deleteTarget.k] || []).filter((x) => x.id !== deleteTarget.id);
          return { ...prev, [deleteTarget.k]: list };
        });
        setDeleteTarget(null);
      };
    } catch (e) {
      console.error(e);
    }
  };

  // Export all portfolio data (reflections, evidence, photo) as JSON
  const handleExportData = async () => {
    try {
      const exportData = {
        version: 1,
        exportedAt: new Date().toISOString(),
        heroImage: heroImage || null,
        texts: textValues,
        evidence: {} as Record<string, any[]>,
      };

      for (const [k, list] of Object.entries(evidenceMap)) {
        exportData.evidence[k] = await Promise.all(
          list.map(async (item) => {
            let base64Blob: string | undefined = undefined;
            if (item.type === 'file' && item.blob) {
              try {
                base64Blob = await new Promise<string>((res, rej) => {
                  const r = new FileReader();
                  r.onload = () => res(r.result as string);
                  r.onerror = rej;
                  r.readAsDataURL(item.blob!);
                });
              } catch (err) {
                console.warn('Could not serialize blob for item', item.id, err);
              }
            }
            return {
              id: item.id,
              k: item.k,
              title: item.title,
              desc: item.desc,
              type: item.type,
              url: item.url,
              name: item.name,
              mime: item.mime,
              ts: item.ts,
              base64Blob,
            };
          })
        );
      }

      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `elena_galanina_eportfoolio_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      alert('Andmete eksportimine ebaõnnestus: ' + (err?.message || 'teadmata viga'));
    }
  };

  // Import portfolio data from JSON
  const handleImportFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        if (!data || typeof data !== 'object') {
          alert('Vigane failivorming.');
          return;
        }
        const db = dbRef.current;

        if (data.texts && typeof data.texts === 'object') {
          setTextValues((prev) => ({ ...prev, ...data.texts }));
          if (db) {
            const tx = db.transaction("text", "readwrite");
            const store = tx.objectStore("text");
            for (const [k, v] of Object.entries(data.texts)) {
              store.put(v, k);
            }
          }
        }

        if (data.heroImage) {
          setHeroImage(data.heroImage);
          try {
            localStorage.setItem('eport_hero_image', data.heroImage);
          } catch {}
          if (db) {
            const tx = db.transaction("text", "readwrite");
            tx.objectStore("text").put(data.heroImage, 'hero-image');
          }
        }

        if (data.evidence && typeof data.evidence === 'object') {
          const newEvMap: Record<string, EvidenceRecord[]> = { ...evidenceMap };
          const dbRecords: EvidenceRecord[] = [];

          for (const [k, list] of Object.entries(data.evidence)) {
            if (!Array.isArray(list)) continue;
            newEvMap[k] = newEvMap[k] || [];
            for (const item of list as any[]) {
              let blob: Blob | undefined = undefined;
              if (item.base64Blob) {
                try {
                  const res = await fetch(item.base64Blob);
                  blob = await res.blob();
                } catch {}
              }
              const record: EvidenceRecord = {
                id: item.id || crypto.randomUUID(),
                k: item.k || k,
                title: item.title || '',
                desc: item.desc || '',
                type: item.type || 'file',
                url: item.url,
                name: item.name,
                mime: item.mime,
                ts: item.ts || Date.now(),
                blob,
              };
              newEvMap[k] = newEvMap[k].filter((x) => x.id !== record.id);
              newEvMap[k].push(record);
              dbRecords.push(record);
            }
            newEvMap[k].sort((a, b) => a.ts - b.ts);
          }
          setEvidenceMap(newEvMap);

          if (db) {
            const tx = db.transaction("ev", "readwrite");
            const store = tx.objectStore("ev");
            dbRecords.forEach((rec) => store.put(rec));
          }
        }

        alert('Andmed on edukalt imporditud ja salvestatud!');
      } catch (err: any) {
        alert('Viga faili importimisel: ' + (err?.message || 'vigane JSON fail'));
      }
    };
    reader.readAsText(file);
  };

  const activeSectionIndex = SECTIONS.findIndex((s) => s.slug === currentRoute);
  const activeSection = activeSectionIndex >= 0 ? SECTIONS[activeSectionIndex] : null;

  return (
    <>
      <a className="sr" href="#main">Mine põhisisu juurde</a>

      {warning && <div id="warn">{warning}</div>}

      {/* ADMIN STATUS BANNER (Visible only to Elena Galanina when logged in) */}
      {isAdmin && (
        <aside className="admin-banner" aria-label="Toimetamisriba">
          <div className="admin-banner-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
              <span style={{ fontSize: '1.2rem' }}>✏️</span>
              <span>Toimetamisrežiim aktiivne</span>
              <span
                style={{
                  opacity: 0.9,
                  fontSize: '0.8rem',
                  background: 'rgba(255,255,255,0.22)',
                  padding: '2px 8px',
                  borderRadius: '12px',
                }}
              >
                Elena Galanina
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                type="button"
                className="btn sm"
                style={{
                  background: '#ffffff',
                  color: '#1e3a8a',
                  borderColor: '#ffffff',
                  fontWeight: 700,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
                onClick={handleDownloadPublicData}
                title="Laadi alla fail, mille saab GitHubi laadida, et kõigile näha oleks"
              >
                <span>📥 Salvesta fail GitHubi jaoks</span>
              </button>
              <button
                type="button"
                className="btn sm"
                style={{
                  background: 'transparent',
                  color: '#ffffff',
                  borderColor: 'rgba(255,255,255,0.6)',
                }}
                onClick={() => {
                  setPasswordChangeSuccess('');
                  setIsPasswordChangeOpen(true);
                }}
              >
                <span>🔑 Muuda parooli</span>
              </button>
              <button
                type="button"
                className="btn sm"
                style={{
                  background: '#F59E0B',
                  color: '#1E293B',
                  borderColor: '#F59E0B',
                  fontWeight: 700,
                }}
                onClick={handleExitAdmin}
                title="Lülitu vaaterežiimi, et näha saiti täpselt nii, nagu näeb komisjon"
              >
                <span>👁️ Vaata nagu komisjon</span>
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Header with Sticky bar & Nunito Sans navigation */}
      <header>
        <div className="wrap bar">
          <a className="brand" href="#/">
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '9px',
                backgroundColor: '#111827',
                color: '#FFFFFF',
                fontFamily: "'Lora', Georgia, 'Times New Roman', serif",
                fontWeight: 700,
                fontSize: '21px',
                lineHeight: 1,
                flexShrink: 0,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.25)',
              }}
              aria-hidden="true"
            >
              E
            </span>
            <span
              style={{
                fontFamily: "'Lora', Georgia, 'Times New Roman', serif",
                fontWeight: 700,
                fontSize: '1.3rem',
                color: '#24364B',
                letterSpacing: '-0.01em',
              }}
            >
              Elena Galanina / e-portfoolio
            </span>
          </a>

          <nav id="nv" className={menuOpen ? "open" : ""} aria-label="Põhimenüü">
            <ul id="nl">
              {SECTIONS.map((p) => {
                const isActive = currentRoute === p.slug;
                return (
                  <li key={p.slug}>
                    <a
                      href={`#/${p.slug}`}
                      aria-current={isActive ? "page" : undefined}
                      className={`nav-${p.slug} ${isActive ? "active" : ""}`}
                    >
                      {p.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header-actions">
            {isAdmin ? (
              <button
                type="button"
                onClick={handleExitAdmin}
                className="btn-header-admin"
                title="Välju toimetamise režiimist"
              >
                <span>🚪</span>
                <span>Välju</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn-header-edit"
                onClick={() => {
                  setLoginError('');
                  setLoginPasswordInput('');
                  setIsLoginModalOpen(true);
                }}
                title="Toimeta portfooliot (ainult Elena Galanina)"
              >
                <span>🔒</span>
                <span>Toimeta</span>
              </button>
            )}

            <button
              id="mt"
              aria-expanded={menuOpen}
              aria-controls="nv"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              Menüü
            </button>
          </div>
        </div>
      </header>

      {/* ADMIN STATUS BANNER */}
      {isAdmin && (
        <aside
          role="region"
          aria-label="Toimetamisrežiim"
          style={{
            background: '#1E293B',
            color: '#F8FAFC',
            padding: '10px 20px',
            fontSize: '0.88rem',
            borderBottom: '2px solid #3B82F6',
          }}
        >
          <div
            className="wrap"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              padding: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#22C55E',
                  boxShadow: '0 0 6px #22C55E',
                }}
              />
              <span style={{ fontWeight: 600 }}>Toimetamisrežiim aktiivne</span>
              <span style={{ color: '#94A3B8', fontSize: '0.82rem' }}>
                (Kõik tekstid, fotod ja tõendid on muudetavad)
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => {
                  setNewPasswordInput('');
                  setPasswordChangeSuccess('');
                  setIsPasswordChangeOpen(true);
                }}
                style={{
                  background: '#334155',
                  border: '1px solid #475569',
                  color: '#F1F5F9',
                  padding: '4px 10px',
                  borderRadius: '5px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                🔑 Muuda parooli
              </button>
              <button
                type="button"
                onClick={handleExitAdmin}
                style={{
                  background: '#EF4444',
                  border: 'none',
                  color: '#FFFFFF',
                  padding: '4px 12px',
                  borderRadius: '5px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                🚪 Logi välja
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* MAIN CONTAINER */}
      <main id="main" className="wrap" tabIndex={-1}>
        {!activeSection ? (
          /* AVALEHT (MAIN HERO PAGE) */
          <>
            <section className="hero">
              <div>
                <h1>
                  Elena Galanina
                  <br />
                  e-portfoolio
                </h1>

                {/* Introduction: Read-Only for visitors, Editable Textarea for Elena in Admin mode */}
                {isAdmin ? (
                  <div>
                    <label className="sr" htmlFor="t-home-intro">
                      Sissejuhatus
                    </label>
                    <textarea
                      id="t-home-intro"
                      value={textValues["home-intro"] ?? ""}
                      placeholder="Tutvustan siin ennast ja oma professionaalset teekonda õpetajana."
                      onChange={(e) => handleTextChange("home-intro", e.target.value)}
                      aria-describedby="s-home-intro"
                    />
                    <div
                      className={`st ${textStatuses["home-intro"]?.type === 'err' ? 'err' : textStatuses["home-intro"]?.type === 'ok' ? 'ok' : ''}`}
                      id="s-home-intro"
                      role="status"
                      aria-live="polite"
                    >
                      {textStatuses["home-intro"]?.msg || ""}
                    </div>
                  </div>
                ) : (
                  <div className="prose-text" style={{ marginTop: '18px', fontSize: '1.08rem' }}>
                    {textValues["home-intro"] || (
                      "Tere tulemast minu e-portfooliosse! Olen Elena Galanina, pühendunud pedagoog ja õpetaja."
                    )}
                  </div>
                )}
              </div>

              {/* Photo Area: Clean presentation for visitors, Upload controls for Elena in Admin mode */}
              <div className="hero-image-box">
                <input
                  type="file"
                  ref={heroFileInputRef}
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleImageSelect(file);
                    }
                    e.target.value = '';
                  }}
                />

                {heroImage ? (
                  <div className="upload-preview-wrapper">
                    <img
                      src={heroImage}
                      alt="Elena Galanina foto"
                      className="upload-preview-img"
                    />
                    {isAdmin && (
                      <div className="upload-preview-actions">
                        <button
                          type="button"
                          className="btn"
                          style={{
                            fontSize: '0.88rem',
                            padding: '8px 16px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: '#fff',
                            border: '1.5px solid var(--bd)',
                            borderRadius: '10px',
                            cursor: 'pointer',
                          }}
                          onClick={() => heroFileInputRef.current?.click()}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                          <span>Laadi uus pilt</span>
                        </button>
                        <button
                          type="button"
                          className="btn"
                          style={{
                            fontSize: '0.88rem',
                            padding: '8px 16px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: '#DC2626',
                            background: '#FEF2F2',
                            border: '1.5px solid #FECACA',
                            borderRadius: '10px',
                            cursor: 'pointer',
                          }}
                          onClick={handleRemoveHeroImage}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                          <span>Eemalda</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : isAdmin ? (
                  <div
                    className={`upload-dropzone ${isDraggingOver ? 'dragover' : ''}`}
                    onClick={() => heroFileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingOver(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setIsDraggingOver(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDraggingOver(false);
                      const file = e.dataTransfer.files?.[0];
                      if (file) {
                        handleImageSelect(file);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        heroFileInputRef.current?.click();
                      }
                    }}
                    aria-label="Laadi pilt üles"
                  >
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'var(--lb)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--bl)',
                      }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: '1.05rem',
                          color: 'var(--tx)',
                        }}
                      >
                        Laadi pilt üles
                      </span>
                      <span
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--mu)',
                          maxWidth: '240px',
                          lineHeight: 1.4,
                        }}
                      >
                        Klõpsa siin või lohista foto (PNG, JPG, WebP)
                      </span>
                    </div>

                    <button
                      type="button"
                      className="btn pri"
                      style={{
                        marginTop: '6px',
                        fontSize: '0.9rem',
                        padding: '10px 22px',
                        borderRadius: '12px',
                        pointerEvents: 'none',
                      }}
                    >
                      Vali pilt
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      width: '100%',
                      minHeight: '260px',
                      background: 'linear-gradient(145deg, #ffffff, #f1f5f9)',
                      border: '2px solid var(--bd)',
                      borderRadius: '20px',
                      padding: '30px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      gap: '12px',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    <div
                      style={{
                        width: '74px',
                        height: '74px',
                        borderRadius: '50%',
                        backgroundColor: '#1e3a8a',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'Lora', Georgia, serif",
                        fontSize: '32px',
                        fontWeight: 700,
                        boxShadow: '0 4px 12px rgba(30, 58, 138, 0.25)',
                      }}
                    >
                      EG
                    </div>
                    <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '1.15rem' }}>
                      Elena Galanina
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* CARDS GRID (5 in a row on desktop) */}
            <section aria-label="Portfoolio osad" className="cards">
              {SECTIONS.map((p, j) => (
                <a
                  key={p.slug}
                  className="card"
                  style={{ ['--c' as any]: p.color }}
                  href={`#/${p.slug}`}
                >
                  <span className="ic" aria-hidden="true">
                    {ICONS[j]}
                  </span>
                  <h2>{p.title}</h2>
                  <span className="go">Ava →</span>
                </a>
              ))}
            </section>
          </>
        ) : (
          /* SECTION DETAIL PAGE */
          <div>
            <div className="crumbs">
              <a href="#/">Avaleht</a> / {activeSection.title}
            </div>

            <div className="phead">
              <span className="ic" aria-hidden="true" style={{ background: activeSection.color }}>
                {ICONS[activeSectionIndex]}
              </span>
              <h1 style={{ margin: 0 }}>{activeSection.title}</h1>
            </div>

            <div style={{ margin: "18px 0" }}>
              <a className="btn" href="#/">
                ← Tagasi avalehele
              </a>
            </div>

            {/* Sub-competencies panels with details & summary */}
            {activeSection.items.map((subTitle, j) => {
              const id = activeSection.customIds
                ? activeSection.customIds[j]
                : `${activeSection.prefix}${j + 1}`;
              const placeholder = PROMPTS[id] || "Kirjuta siia oma eneseanalüüs...";
              const evList = evidenceMap[id] || [];

              const hasContent = Boolean(
                (textValues[id] && textValues[id].trim().length > 0) ||
                evList.length > 0
              );
              const isOpen = openPanels[id] !== undefined ? openPanels[id] : hasContent;

              return (
                <details
                  key={id}
                  className="panel"
                  style={{ ['--c' as any]: activeSection.color }}
                  open={isOpen}
                  onToggle={(e) => {
                    const nextOpen = (e.currentTarget as HTMLDetailsElement).open;
                    setOpenPanels((prev) => {
                      if (prev[id] === nextOpen) return prev;
                      return { ...prev, [id]: nextOpen };
                    });
                  }}
                >
                  <summary>
                    <h2>{subTitle}</h2>
                  </summary>

                  <div className="pb">
                    {/* Reflection: Textarea for admin, Clean prose for public visitors */}
                    {isAdmin ? (
                      <div>
                        <label className="sr" htmlFor={`t-${id}`}>
                          {subTitle}
                        </label>
                        <textarea
                          id={`t-${id}`}
                          value={textValues[id] ?? ""}
                          placeholder={placeholder}
                          onChange={(e) => handleTextChange(id, e.target.value)}
                          aria-describedby={`s-${id}`}
                        />
                        <div
                          className={`st ${textStatuses[id]?.type === 'err' ? 'err' : textStatuses[id]?.type === 'ok' ? 'ok' : ''}`}
                          id={`s-${id}`}
                          role="status"
                          aria-live="polite"
                        >
                          {textStatuses[id]?.msg || ""}
                        </div>
                      </div>
                    ) : (
                      <div style={{ marginBottom: "18px" }}>
                        {textValues[id] && textValues[id].trim() ? (
                          <div className="prose-text">
                            {textValues[id]}
                          </div>
                        ) : (
                          <div className="empty-prose">
                            Eneseanalüüs lisamisel...
                          </div>
                        )}
                      </div>
                    )}

                    {/* Evidence block */}
                    <div data-ev={id}>
                      <h3>Tõendid</h3>
                      <div className="evl">
                        {evList.length === 0 ? (
                          <p className="empty">Tõendeid pole veel lisatud.</p>
                        ) : (
                          evList.map((item) => {
                            let fileSrc = item.url;
                            let isImg = false;
                            if (item.type === 'file' && item.blob) {
                              fileSrc = URL.createObjectURL(item.blob);
                              isImg = /^image\//.test(item.mime || '');
                            }

                            return (
                              <div key={item.id} className="ev">
                                <h4>{item.title}</h4>
                                {item.desc && <p>{item.desc}</p>}

                                {item.type === 'file' ? (
                                  <>
                                    {isImg && fileSrc && (
                                      <img src={fileSrc} alt={`Eelvaade: ${item.name}`} />
                                    )}
                                    <p className="meta">Fail: {item.name}</p>
                                    <a
                                      href={fileSrc}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      download={item.name}
                                    >
                                      {/pdf|image/.test(item.mime || '')
                                        ? "Ava / laadi alla fail"
                                        : "Laadi alla fail"}
                                    </a>
                                  </>
                                ) : (
                                  <p className="meta">
                                    Link:{" "}
                                    <a
                                      href={item.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {item.url}
                                    </a>
                                  </p>
                                )}

                                <div className="meta" style={{ marginTop: "6px" }}>
                                  Lisamise kuupäev:{" "}
                                  {new Date(item.ts).toLocaleDateString("et-EE")}
                                </div>

                                {isAdmin && (
                                  <div className="acts">
                                    <button
                                      className="btn sm"
                                      onClick={() => openEvidenceModal(id, item)}
                                    >
                                      Muuda
                                    </button>
                                    <button
                                      className="btn sm dng"
                                      onClick={() => setDeleteTarget(item)}
                                    >
                                      Kustuta
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>

                      {isAdmin && (
                        <button
                          className="btn pri"
                          onClick={() => openEvidenceModal(id)}
                          style={{ marginTop: "8px" }}
                        >
                          + Lisa tõend
                        </button>
                      )}
                    </div>
                  </div>
                </details>
              );
            })}

            <div style={{ marginTop: "24px" }}>
              <a className="btn" href="#/">
                ← Tagasi avalehele
              </a>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER: CONTACT DETAILS & CREDENTIALS */}
      <footer>
        <div className="wrap">


          {/* Admin tools when logged in */}
          {isAdmin && (
            <div
              style={{
                padding: '16px 20px',
                background: '#F8FAFC',
                border: '1.5px solid #E2E8F0',
                borderRadius: '12px',
                marginBottom: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <input
                type="file"
                ref={importFileInputRef}
                accept=".json"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImportFile(file);
                  e.target.value = '';
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🛠️</span>
                <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1E293B' }}>
                  Andmehaldus ja seaded (Admin):
                </span>
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  type="button"
                  className="btn sm"
                  title="Laadi alla fail kõigi sisestatud tekstide ja tõenditega"
                  onClick={handleExportData}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>💾 Varunda andmed (JSON)</span>
                </button>
                <button
                  type="button"
                  className="btn sm"
                  title="Taasta andmed varem salvestatud failist"
                  onClick={() => importFileInputRef.current?.click()}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>📥 Taasta andmed</span>
                </button>
                <button
                  type="button"
                  className="btn sm"
                  title="Muuda parooli"
                  onClick={() => {
                    setNewPasswordInput('');
                    setPasswordChangeSuccess('');
                    setIsPasswordChangeOpen(true);
                  }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>🔑 Muuda parooli</span>
                </button>
              </div>
            </div>
          )}

          {/* Bottom copyright line & centered Toimeta button */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: '14px',
              fontSize: '0.86rem',
              color: '#64748B',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '8px 16px',
              }}
            >
              <span>© {new Date().getFullYear()} Elena Galanina • Kõik õigused kaitstud</span>
              <span aria-hidden="true" style={{ opacity: 0.5 }}>•</span>
              <span>Õpetaja kutsestandard tase 6 kompetentsid ja eneseanalüüs</span>
            </div>

            {!isAdmin && (
              <button
                type="button"
                className="btn sm"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.84rem',
                  opacity: 0.75,
                  border: '1px dashed #94a3b8',
                  background: 'transparent',
                  padding: '6px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onClick={() => {
                  setLoginError('');
                  setLoginPasswordInput('');
                  setIsLoginModalOpen(true);
                }}
                title="Toimeta portfooliot (Elena Galanina)"
              >
                <span>🔒</span>
                <span>Toimeta</span>
              </button>
            )}
          </div>
        </div>
      </footer>



      {/* DIALOG: LISA / MUIDA TÕEND */}
      {isEvidenceModalOpen && (
        <dialog
          open
          style={{ display: "block" }}
          id="dlg"
          aria-labelledby="dt"
        >
          <form onSubmit={handleSaveEvidence} noValidate>
            <h2 id="dt">{editingItem ? "Muuda tõendit" : "Lisa tõend"}</h2>

            <label htmlFor="f-t">Pealkiri</label>
            <input
              type="text"
              id="f-t"
              maxLength={200}
              required
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              autoFocus
            />

            <label htmlFor="f-d">Kirjeldus</label>
            <textarea
              id="f-d"
              style={{ minHeight: "100px" }}
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
            />

            <div className="lb" id="tl">
              Fail või veebiaadress
            </div>
            <div className="row" role="radiogroup" aria-labelledby="tl">
              <label>
                <input
                  type="radio"
                  name="ty"
                  value="file"
                  checked={formType === "file"}
                  onChange={() => setFormType("file")}
                />
                Fail
              </label>
              <label>
                <input
                  type="radio"
                  name="ty"
                  value="link"
                  checked={formType === "link"}
                  onChange={() => setFormType("link")}
                />
                Veebiaadress
              </label>
            </div>

            {formType === "file" ? (
              <div id="fw">
                <label htmlFor="f-f">
                  Fail (PDF, JPG, JPEG, PNG, DOC, DOCX, ODT, TXT; kuni 15 MB)
                </label>
                <input
                  type="file"
                  id="f-f"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.odt,.txt"
                  onChange={(e) => {
                    const f = e.target.files?.[0] || null;
                    setFormFile(f);
                  }}
                />
                {editingItem?.name && (
                  <div className="meta" style={{ marginTop: "4px" }}>
                    Praegune fail: {editingItem.name} (jäta tühjaks, et säilitada)
                  </div>
                )}
              </div>
            ) : (
              <div id="uw">
                <label htmlFor="f-u">Veebiaadress</label>
                <input
                  type="url"
                  id="f-u"
                  placeholder="https://"
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                />
              </div>
            )}

            {formError && (
              <div className="fe" role="alert">
                {formError}
              </div>
            )}

            <div className="acts" style={{ marginTop: "18px" }}>
              <button className="btn pri" type="submit" id="sv">
                Salvesta
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => setIsEvidenceModalOpen(false)}
              >
                Tühista
              </button>
            </div>
          </form>
        </dialog>
      )}

      {/* DIALOG: KUSTUTA TÕEND */}
      {deleteTarget && (
        <dialog
          open
          style={{ display: "block" }}
          id="cdlg"
          aria-labelledby="ct"
        >
          <h2 id="ct">Kustuta tõend?</h2>
          <p id="cm">
            Kas kustutada tõend „{deleteTarget.title}“? Seda ei saa tagasi võtta.
          </p>
          <div className="acts">
            <button className="btn dng" id="cy" onClick={handleDeleteEvidence}>
              Kustuta
            </button>
            <button className="btn" id="cx" onClick={() => setDeleteTarget(null)}>
              Tühista
            </button>
          </div>
        </dialog>
      )}

      {/* DIALOG: HALDAJA SISSELOGIMINE */}
      {isLoginModalOpen && (
        <dialog
          open
          style={{ display: "block", maxWidth: '440px' }}
          id="login-dlg"
          aria-labelledby="login-title"
        >
          <form onSubmit={handleLoginSubmit}>
            <h2 id="login-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🔒</span>
              <span>Haldaja sisselogimine</span>
            </h2>
            <p style={{ color: 'var(--mu)', fontSize: '0.92rem', margin: '8px 0 16px' }}>
              Ainult Elena Galanina jaoks portfoolio tekstide, fotode ja tõendite muutmiseks.
            </p>

            <label htmlFor="admin-pwd">Parool / PIN</label>
            <input
              type="password"
              id="admin-pwd"
              required
              value={loginPasswordInput}
              onChange={(e) => {
                setLoginPasswordInput(e.target.value);
                setLoginError('');
              }}
              placeholder="Sisesta parool"
              autoFocus
            />

            <div style={{ fontSize: '0.84rem', color: '#64748B', marginTop: '6px' }}>
              💡 Sisestage parool toimetamise režiimi avamiseks.
            </div>

            {loginError && (
              <div className="fe" role="alert" style={{ marginTop: '10px' }}>
                {loginError}
              </div>
            )}

            <div className="acts" style={{ marginTop: '20px' }}>
              <button className="btn pri" type="submit">
                Logi sisse ja toimeta
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setIsLoginModalOpen(false);
                  setLoginError('');
                  setLoginPasswordInput('');
                }}
              >
                Sulge
              </button>
            </div>
          </form>
        </dialog>
      )}

      {/* DIALOG: PAROOLI MUUTMINE */}
      {isPasswordChangeOpen && (
        <dialog
          open
          style={{ display: "block", maxWidth: '440px' }}
          id="pwd-dlg"
          aria-labelledby="pwd-title"
        >
          <form onSubmit={handleChangePassword}>
            <h2 id="pwd-title">Muuda haldaja parooli</h2>
            <p style={{ color: 'var(--mu)', fontSize: '0.92rem', margin: '8px 0 16px' }}>
              Määrake uus parool portfoolio toimetamiseks.
            </p>

            <label htmlFor="new-admin-pwd">Uus parool (vähemalt 4 märki)</label>
            <input
              type="text"
              id="new-admin-pwd"
              required
              minLength={4}
              value={newPasswordInput}
              onChange={(e) => setNewPasswordInput(e.target.value)}
              placeholder="Sisesta uus parool"
              autoFocus
            />

            {passwordChangeSuccess && (
              <div style={{ marginTop: '10px', color: '#16a34a', fontWeight: 600, fontSize: '0.92rem' }}>
                {passwordChangeSuccess}
              </div>
            )}

            <div className="acts" style={{ marginTop: '20px' }}>
              <button className="btn pri" type="submit">
                Salvesta uus parool
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setIsPasswordChangeOpen(false);
                  setPasswordChangeSuccess('');
                  setNewPasswordInput('');
                }}
              >
                Tühista
              </button>
            </div>
          </form>
        </dialog>
      )}

      {/* DIALOG: GITHUB JUHIS PÄRAST ANDMETE ALLALAADIMIST */}
      {isGitHubInfoModalOpen && (
        <dialog
          open
          style={{ display: "block", maxWidth: '540px' }}
          id="gh-dlg"
          aria-labelledby="gh-title"
        >
          <div>
            <h2 id="gh-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem' }}>
              <span>✅</span>
              <span>Andmefail on alla laaditud!</span>
            </h2>
            <p style={{ margin: '12px 0 14px', lineHeight: 1.6, color: 'var(--tx)' }}>
              Fail <strong>portfolio-data.json</strong> sisaldab kõiki teie viimaseid tekste, fotot ja tõendeid.
            </p>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '14px 16px', fontSize: '0.92rem' }}>
              <div style={{ fontWeight: 700, color: '#1e3a8a', marginBottom: '8px' }}>
                Kuidas teha muudatused GitHub Pages lingil kõigile nähtavaks:
              </div>
              <ol style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Avage oma repositoorium <strong>github.com</strong> lehel.</li>
                <li>Klõpsake <strong>Add file → Upload files</strong>.</li>
                <li>Lohistage fail <code>portfolio-data.json</code> ja vajutage <strong>Commit changes</strong>.</li>
              </ol>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--mu)', marginTop: '12px' }}>
              Kõik komisjoniliikmed näevad teie uusi andmeid koheselt kaitstud vaaterežiimis ilma võimaluseta midagi muuta!
            </p>

            <div className="acts" style={{ marginTop: '18px' }}>
              <button
                className="btn pri"
                type="button"
                onClick={() => setIsGitHubInfoModalOpen(false)}
              >
                Suurepärane, sain aru!
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
