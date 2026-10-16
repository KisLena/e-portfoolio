export interface SubCompetency {
  id: string;
  name: string;
  reflection: string;
  evidence: string[];
  actionPoints: string[];
  status: 'completed' | 'in_progress';
}

export interface CompetencyCard {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;         // Section accent color
  darkColor: string;     // Darker shade for "Ava →"
  items: SubCompetency[];
}

export interface PortfolioIntroduction {
  title: string;
  subtitle: string;
  authorName: string;
  role: string;
  institution: string;
  qualification: string;
  leadText: string;
  motto: string;
  email: string;
  updatedAt: string;
}

export const INITIAL_INTRODUCTION: PortfolioIntroduction = {
  title: 'Elena Galanina / e-portfoolio',
  subtitle: 'Õpetaja kutsestandardile vastav professionaalne arengumapp ja eneseanalüüs',
  authorName: 'Elena Galanina',
  role: 'Õpetaja / Pedagoog',
  institution: 'Tallinna Humanitaargümnaasium',
  qualification: 'Õpetaja kutsestandard tase 6 pädevused',
  leadText: 'Tere tulemast minu e-portfooliosse! Siia olen koondanud oma pedagoogilise teekonna sisulise eneseanalüüsi, väärtuspõhised põhimõtted, õppijate toetamise meetodid ning praktilised tõendusmaterjalid. Portfoolio toetub õpetaja kutsestandardi viiele pädevusvaldkonnale ning on pidevas arengus koos minu õppijate ja haridusuuendustega.',
  motto: '„Õpetamine ei ole valmis teadmiste edasiandmine, vaid mõtlemisjulguse kasvatamine, usaldusliku suhte loomine ja iga õppija ainulaadse potentsiaali märkamine.”',
  email: 'kislyakova.lena@gmail.com',
  updatedAt: 'Kevadsemester 2026',
};

export const INITIAL_COMPETENCY_CARDS: CompetencyCard[] = [
  {
    id: 'mina-ise',
    number: 1,
    title: 'Enesehoid',
    subtitle: 'Enesejuhtimine ja professionaalne identiteet',
    description: 'Õpetaja isiklik areng, refleksiooniharjumus, teaduspõhine ja uurimuslik lähenemine ning pidev õppimine.',
    color: '#2563EB',      // Sinine
    darkColor: '#1D4ED8',  // Tumedam sinine «Ava →» jaoks
    items: [
      {
        id: 'c1-0a',
        name: 'Tervise hoidmine',
        reflection: 'Hoolitsen teadlikult oma vaimse, füüsilise, sotsiaalse ja emotsionaalse heaolu eest. Järgin tervislikke eluviise ja ergonoomikat, mis tagab pikaajalise töövõime ja positiivse energia õppetöös.',
        evidence: [
          'Terviseedenduse ja heaolu praktikad töökohal',
          'Ergonoomiliste töövõtete rakendamine klassiruumis',
        ],
        actionPoints: [
          'Hoida regulaarset liikumisharjumust ja taastumisaega',
        ],
        status: 'completed',
      },
      {
        id: 'c1-0b',
        name: 'Tasakaalu hoidmine',
        reflection: 'Hoolitsen töö- ja eraelu teadliku tasakaalu eest, seades selged piirid tööajale ja puhkusele ning ennetades läbipõlemist läbi tõhusa ajaplaneerimise.',
        evidence: [
          'Tööaja ja puhkeaja planeerimise süsteem',
          'Enesehoiu strateegiate analüüs',
        ],
        actionPoints: [
          'Järgida puhkepäevadel digipaastu põhimõtteid',
        ],
        status: 'completed',
      },
      {
        id: 'c1-1',
        name: 'Karjääritee kujundamine',
        reflection: 'Mõtestan teadlikult oma professionaalset arengut ja sean pikaajalisi eesmärke. Olen osalenud mentorlusprogrammides, jaganud kogemusi ning planeerinud karjäärietappe seotuna süvendatud aineõppe ja haridustehnoloogiaga.',
        evidence: [
          'Individuaalne arenguplaan ja 3 aasta professionaalsed eesmärgid',
          'Täiendkoolituste pass ja läbitud kursuste portfoolio',
          'Enesehindamise maatriks õpetaja kutsestandardi baasil',
        ],
        actionPoints: [
          'Osaleda riiklikus haridusjuhtimise või vanemõpetaja arenguprogrammis',
          'Koostada regulaarne kvartali refleksioonikokkuvõte',
        ],
        status: 'completed',
      },
      {
        id: 'c1-2',
        name: 'Teadmiste ajakohastamine',
        reflection: 'Hoian end järjepidevalt kursis haridusteaduste uusimate uuringute, ainedidaktika trendide ja riiklike õppekavade uuendustega. Loen teadusartikleid ning osalen erialastel konverentsidel ja seminaridel.',
        evidence: [
          'Konverentsi „Õppimine ja õpetamine muutuvas maailmas” osalustõend',
          'Erialase kirjanduse annotatsioonid ja lugemispäevik',
          'Kaasaegsete õppemeetodite rakendamise analüüs ainetundides',
        ],
        actionPoints: [
          'Jälgida rahvusvahelisi haridusteaduslikke ajakirju (nt Educational Leadership)',
          'Tutvuda süvitsi uute kognitiivse psühholoogia õpiteooriatega',
        ],
        status: 'completed',
      },
      {
        id: 'c1-3',
        name: 'Uurimusliku lähenemise rakendamine enda professionaalsuse arendamiseks',
        reflection: 'Kasutan oma töös tegevusuuringu (action research) põhimõtteid: analüüsin süsteemselt õppijate komistuskive, katsetan uusi metoodikaid ning kogun tõenduspõhist tagasisidet õpitulemuste kohta.',
        evidence: [
          'Tegevusuuring: „Tekstimõistmise ja funktsionaalse lugemisoskuse toetamine visuaalsete skeemide abil”',
          'Õppijate diagnostiliste testide tulemuste dünaamika analüüs',
          'Ettekanne ainesektsioonis tegevusuuringu tulemustest',
        ],
        actionPoints: [
          'Kavandada järgmiseks õppeaastaks uurimus õppijate enesehindamisoskuse arengust',
          'Kaasata kolleege ühisesse õppepraktika uurimisse',
        ],
        status: 'completed',
      },
      {
        id: 'c1-4',
        name: 'Õppimisoskus',
        reflection: 'Õppijana analüüsin oma õpistiili, kasutan eesmärgipäraseid ajaplaneerimise võtteid ning kohandan strateegiaid vastavalt olukorrale. Pean elukestvat õpet õpetajaameti tuumaks.',
        evidence: [
          'Isikliku õpikeskkonna (PLE) kaart ja kasutatavad allikad',
          'Refleksioonipäevik uute digivahendite ja didaktiliste võtete omandamisel',
        ],
        actionPoints: [
          'Arendada süsteemset kiirlugemis- ja märkmete tegemise tehnikat',
          'Õppida tundma uusi mikrokvalifikatsiooni kursusi',
        ],
        status: 'completed',
      },
      {
        id: 'c1-5',
        name: 'Innovatsioonipädevus',
        reflection: 'Olen avatud uudsetele ideedele, loovatele lahendustele ning tehnoloogilistele uuendustele hariduses. Julgen katsetada ja luua õppeprotsessi rikastavaid uusi formaate (nt haridusrobootika, digitaalsed loovtööd).',
        evidence: [
          'Projekt: „Interaktiivsed õppepesad ja virtuaalsed kultuurirännakud”',
          'Generatiivse tehisintellekti eetilise kasutamise juhis ainetunnis',
          'Robootika ja programmeerimise lõimimine keeletundidesse',
        ],
        actionPoints: [
          'Luua ainetevaheline STEAM-projekt koostöös reaalainete õpetajatega',
          'Integreerida disainmõtlemise metoodikat õpilaste loovtöödesse',
        ],
        status: 'completed',
      },
    ],
  },
  {
    id: 'oppija-toetamine',
    number: 2,
    title: 'Õppija toetamine',
    subtitle: 'Õpetamine, arengukeskkond ja väärtused',
    description: 'Õppijate tundmaõppimine, turvalise ja toetava keskkonna loomine, ainesisu didaktiline käsitlemine, diferentseerimine ning väärtuspõhine tagasiside.',
    color: '#E85D5D',      // Punane
    darkColor: '#B83838',  // Tumedam punane «Ava →» jaoks
    items: [
      {
        id: 'c3-1',
        name: 'Õppijate tundmaõppimine',
        reflection: 'Kaardistan õppijate eelteadmised, huvid, tugevused ja erivajadused õppeaasta alguses ja jooksul. Kohandan õpet vastavalt klassi dünaamikale ja iga lapse individuaalsele eripärale.',
        evidence: [
          'Õppeaasta alguse diagnostilised küsimustikud ja õpistiilide profiilid',
          'HEV-õppijate individuaalsed õppekavad (IÕK) ja koostöö tugispetsialistidega',
        ],
        actionPoints: ['Täiendada õppijate arenguvestluste küsimustikku eneseanalüüsi toetavate teemadega'],
        status: 'completed',
      },
      {
        id: 'c3-2',
        name: 'Suhete loomine, keskkonna kujundamine ja õppijatest hoolimine',
        reflection: 'Loon klassis emotsionaalselt turvalise õhkkonna, kus eksimine on loomulik osa õppimisest. Märkan iga õpilast, toetan vastastikust austust ning välistan kiusamise.',
        evidence: [
          'Klassikokkulepped ja väärtuste plakat, koostatud koostöös õppijatega',
          'Sotsiaal-emotsionaalsete oskuste arendamise harjutuste näited klassijuhatajatunnis',
        ],
        actionPoints: ['Viia läbi regulaarsed klassi sisekliima reflektsiooniringid'],
        status: 'completed',
      },
      {
        id: 'c3-3',
        name: 'Õpetamise kavandamine ja õpetamine',
        reflection: 'Kavandan õpet süsteemselt: sõnastan selged, mõõdetavad õpieesmärgid, jagan teemad loogilisteks etappideks ning kasutan mitmekesiseid aktiivõppemeetodeid (pööratud klassiruum, rühmatööd, juhtumianalüüsid).',
        evidence: [
          'Ainekava ja töökavad e-Koolis / Stuudiumis',
          'Näidistunnikavad: eesmärgistamine, õpitegevused, reflektsioon',
        ],
        actionPoints: ['Katsetada süvendatult probleemõpet (PBL) humanitaarainetes'],
        status: 'completed',
      },
      {
        id: 'c3-4',
        name: 'Õppevara valimine, kohandamine, koostamine ja jagamine',
        reflection: 'Valin kriitiliselt õppevara, kohandan seda erinevatele keele- ja võimekustasemetele ning loon kaasaegseid digitaalseid ja paberkandjal materjale (töölehed, interaktiivsed skeemid).',
        evidence: [
          'Autori loodud töölehtede kogu Opiq / E-koolikott repositooriumis',
          'Diferentseeritud õppevara näidised andekatele ja tuge vajavatele õppijatele',
        ],
        actionPoints: ['Avalikustada parimad digimaterjalid E-koolikoti keskkonnas'],
        status: 'completed',
      },
      {
        id: 'c3-5',
        name: 'Ainesisu käsitlemine',
        reflection: 'Valdan ainesisu sügavuti, selgitan keerulisi mõisteid eluliste näidete varal, loon ainetevahelisi seoseid (ajalugu, kunst, ühiskonnaõpetus) ning arendan õppijate ainespetsiifilist sõnavara.',
        evidence: [
          'Ainetevahelise lõimingu projektid ja näidismaterjalid',
          'Aineolümpiaadide ja võistluste ettevalmistuse metoodilised plaanid',
        ],
        actionPoints: ['Integreerida rohkem kaasaegse meedia ja keelekasutuse analüüsi'],
        status: 'completed',
      },
      {
        id: 'c3-6',
        name: 'Väärtuste kujundamine ja järgimine',
        reflection: 'Olen õpetajana väärtuskasvatuse eeskuju. Kujundan ausust, sallivust, kultuuripärandi hoidmist, keskkonnateadlikkust ja demokraatlikke väärtusi tekstianalüüsi ja arutelude kaudu.',
        evidence: [
          'Arutelu- ja väitlustundide kavad: eetika, väärtusdilemmad kirjanduses ja elus',
          'Heategevus- ja kogukonnaprojektides osalemise korraldus',
        ],
        actionPoints: ['Toetada õppijate kriitilist meediatarbimist ja valeuudiste äratundmist'],
        status: 'completed',
      },
      {
        id: 'c3-7',
        name: 'Üldpädevuste arendamine',
        reflection: 'Lõimin ainetundidesse teadlikult riikliku õppekava 8 üldpädevust: suhtluspädevus, sotsiaalne ja kodanikupädevus, digipädevus, enesemääratluspädevus ning õpipädevus.',
        evidence: [
          'Tundide analüüs: milliseid üldpädevusi konkreetsed õpiülesanded arendavad',
          'Enesemääratluse ja koostöö hindamismaatriksid',
        ],
        actionPoints: ['Koostada eraldi enesehindamise leht suhtlus- ja koostööpädevusele'],
        status: 'completed',
      },
      {
        id: 'c3-8',
        name: 'Õppijate võimestamine',
        reflection: 'Annan õppijatele valikuvabadust õppeteede ja ülesannete vormi osas, toetan nende autonoomiat, algatusvõimet ja usku oma võimetesse, et kasvatada enesejuhitud õppijaid.',
        evidence: [
          'Valikülesannetega projektitööde juhendid (õppija valib formaadi ja fookuse)',
          'Õpilaste loovtööde ja uurimuste juhendamise tagasiside',
        ],
        actionPoints: ['Võimaldada õppijatel osaleda hindamiskriteeriumide ühises loomises'],
        status: 'completed',
      },
      {
        id: 'c3-9',
        name: 'Tagasiside andmine ja hindamine',
        reflection: 'Rakendan regulaarset kujundavat hindamist: annan edasiviivat, kirjeldavat tagasisidet (mis on hästi, mida ja kuidas parandada). Kasutan enese- ja kaaslasehindamist.',
        evidence: [
          'Kujundava hindamise rubriigid ja kriteeriumipõhised hindamistabelid',
          'Õpilase kirjaliku töö tagasisidestamise näidis (kirjeldav tagasiside)',
        ],
        actionPoints: ['Katsetada helisalvestatud ja video-tagasisidet pikemate loovtööde puhul'],
        status: 'completed',
      },
      {
        id: 'c3-10',
        name: 'Analüüsi- ja sünteesioskus',
        reflection: 'Õpetan õppijaid eristama fakti arvamusest, analüüsima põhjuse-tagajärje seoseid, sünteesima infot mitmest allikast ning looma iseseisvaid argumenteeritud järeldusi.',
        evidence: [
          'Tekstianalüüsi skeemid, mõistekaardid ja väitlusmudelid',
          'Essee ja uurimusliku töö analüüsitabelid',
        ],
        actionPoints: ['Arendada õppijate allikakriitilisust tehisintellekti loodud tekstide analüüsil'],
        status: 'completed',
      },
      {
        id: 'c3-11',
        name: 'Suhtlemisoskus',
        reflection: 'Valdan selget, empaatilist ja korrektset suhtlust erinevates olukordades, valin sihtrühmale sobiva tooni, kuulan aktiivselt ning lahendan konflikte konstruktiivselt.',
        evidence: [
          'Suhtlemisoskuste ja aktiivse kuulamise harjutused ainetundides',
          'Kriitiliste olukordade ja konfliktide rahumeelse lahendamise juhtumianalüüsid',
        ],
        actionPoints: ['Jätkata väitlusoskuste ja retoorika elementide integreerimist ainetundidesse'],
        status: 'completed',
      },
    ],
  },
  {
    id: 'organisatsioon',
    number: 3,
    title: 'Organisatsioon',
    subtitle: 'Koolikultuur, meeskonnatöö ja partnerlus',
    description: 'Töö koolimeeskonnas, ühiste väärtuste ja arengukava elluviimine, turvaline töökeskkond, koostöö kolleegide ja lastevanematega.',
    color: '#FFD447',      // Kollane
    darkColor: '#A67C00',  // Tumedam kollane/kuldne «Ava →» jaoks (kõrge kontrastsus valgel)
    items: [
      {
        id: 'c4-1',
        name: 'Eesmärkidest ja väärtustest lähtumine',
        reflection: 'Toetan oma igapäevatöös kooli arengukava ja põhiväärtuste elluviimist. Osalen kooli strateegilistes aruteludes ning aitan hoida ja uuendada koolikultuuri.',
        evidence: [
          'Osalemine kooli arengukava töörühmas või ainesektsiooni tööplaani koostamisel',
          'Koolisiseste ürituste ja traditsioonide korraldamise materjalid',
        ],
        actionPoints: ['Panustada kooli sisehindamise ja rahuloluküsitluste analüüsi'],
        status: 'completed',
      },
      {
        id: 'c4-2',
        name: 'Koostöö kolleegidega oma organisatsioonis',
        reflection: 'Väärtustan meeskonnatööd: jagan õppematerjale, planeerin ainetevahelisi projekte, külastan kolleegide tunde ning osalen ainesektsiooni ja lennupõhises koostöös.',
        evidence: [
          'Koostöötundide ja lõiminguprojektide kavad koos reaal- ja sotsiaalainete õpetajatega',
          'Kolleegitundide vaatluste lehed ja vastastikuse tagasiside protokollid',
        ],
        actionPoints: ['Algatada regulaarne kovisiooni või kogemuste vahetamise töötuba'],
        status: 'completed',
      },
      {
        id: 'c4-3',
        name: 'Turvaline töökeskkond',
        reflection: 'Järgin ja kujundan füüsiliselt, vaimselt ja digitaalselt turvalist keskkonda: tunnen ohutustehnika nõudeid, esmaabivõtteid ning tean kriisijuhtimise algoritme.',
        evidence: [
          'Läbitud esmaabikoolituse ja tuleohutuse tõendid',
          'Klassiruumi ergonoomika ja digiohutuse reeglite rakendamine',
        ],
        actionPoints: ['Uuendada klassi digiseadmete ja andmekaitse heade tavade meelespead'],
        status: 'completed',
      },
      {
        id: 'c4-4',
        name: 'Kolleegide professionaalse arengu toetamine',
        reflection: 'Toetan alustavaid õpetajaid ja praktikante, jagan parimaid praktikaid koolisisestel koolitustel ning olen avatud nõustamiseks ja metoodiliseks abiks.',
        evidence: [
          'Mentori või juhendaja tagasiside ülikooli praktikandilt',
          'Sisekoolituse „Tõhusad meetodid teksti analüüsimisel” esitlus ja tagasiside',
        ],
        actionPoints: ['Läbida ametlik haridusmentori koolitus'],
        status: 'completed',
      },
      {
        id: 'c4-5',
        name: 'Suhtlemine ja koostöö lapsevanematega',
        reflection: 'Ehitame lapsevanematega üles partnerlussuhte: jagan regulaarselt positiivset tagasisidet, kaasan vanemaid klassielu aruteludesse ning viin läbi sisukaid arenguvestlusi.',
        evidence: [
          'Lastevanemate üldkoosoleku interaktiivse arutelu protokoll ja materjalid',
          'Arenguvestluse ettevalmistus- ja kokkuvõttelehed',
          'Tagasisideküsitluse kokkuvõte lastevanematelt',
        ],
        actionPoints: ['Luua igakuine klassi uudiskiri õppetegevuste ja edusammude kajastamiseks'],
        status: 'completed',
      },
      {
        id: 'c4-6',
        name: 'Info ja andmed organisatsioonis',
        reflection: 'Haldan vastutustundlikult kooli infosüsteeme (e-Kool/Stuudium, pilveteenused), järgin andmekaitsemäärust (GDPR) ning kasutan andmeid õppe tõhustamiseks.',
        evidence: [
          'E-päeviku korrektne ja õigeaegne täitmine (õpitulemused, puudumised, märkused)',
          'Andmekaitse ja autoriõiguse reeglite järgimise eneseanalüüs',
        ],
        actionPoints: ['Süstematiseerida kooli ainesektsiooni ühine digiarhiiv'],
        status: 'completed',
      },
      {
        id: 'c4-7',
        name: 'Väärtustest lähtumine',
        reflection: 'Käitun kooskõlas õpetaja eetikakoodeksiga: austan inimväärikust, olen õiglane ja erapooletu, toetan kultuurilist mitmekesisust ja hoian haridustöötaja autoriteeti.',
        evidence: [
          'Refleksioon õpetaja eetikakoodeksi rakendamisest keerulistes kooliolukordades',
          'Õpilaste ja kolleegide tagasiside õigluse ja toetavuse kohta',
        ],
        actionPoints: ['Arutada õpetaja eetikaküsimusi koos nooremate kolleegidega'],
        status: 'completed',
      },
      {
        id: 'c4-8',
        name: 'Koostööoskus',
        reflection: 'Oskan töötada eriilmelistes meeskondades, juhtida arutelusid, leida kompromisse ning võtta vastutust ühiste tulemuste saavutamisel kooli tasandil.',
        evidence: [
          'Ainetevahelise töörühma või kooliprojekti juhtimise kogemus ja tulemused',
          'Ühiste õppekäikude ja kooliürituste meeskondlik korraldamine',
        ],
        actionPoints: ['Arendada modereerimis- ja arutelujuhtimise tehnikaid'],
        status: 'completed',
      },
    ],
  },
  {
    id: 'okosusteem',
    number: 4,
    title: 'Ökosüsteem',
    subtitle: 'Haridusruum, ühiskond ja valdkondlik mõju',
    description: 'Panustamine aineühenduste töösse, pedagoogilise teadmuse levitamine laiemas ühiskonnas, säilenõtkus ning digipädevuse juhtimine.',
    color: '#16A34A',      // Roheline (Ökosüsteem)
    darkColor: '#15803D',  // Tumedam roheline «Ava →» jaoks
    items: [
      {
        id: 'c5-1',
        name: 'Koostöö ja panustamine valdkonna- või erialaühenduste töösse',
        reflection: 'Olen erialaühingu aktiivne liige, osalen suve- ja talvekoolides, jagan oma töökogemusi laiemale hariduskogukonnale ning panustan ainedidaktika arendamisse.',
        evidence: [
          'Eesti Emakeeleõpetajate Seltsi / Aineühenduse liikmelisus ja osalus',
          'Ettekanne või töötoba piirkondlikul ainesektsiooni seminaril',
        ],
        actionPoints: ['Kirjutada kogemusartikkel Õpetajate Lehte'],
        status: 'completed',
      },
      {
        id: 'c5-2',
        name: 'Õpetaja elukutse positiivse kuvandi kujundamine',
        reflection: 'Kujundan oma hoiaku, avaliku esinemise ja suhtlusega õpetajaameti väärikat, inspireerivat ja kaasaegset kuvandit nii koolis, sotsiaalmeedias kui ka kogukonnas.',
        evidence: [
          'Osalemine lahtiste uste päevadel ja noortele suunatud haridusüritustel',
          'Kooli ja õpilaste saavutuste kajastamine kooli infokanalites',
        ],
        actionPoints: ['Kutsuda vilistlasi tundi rääkima õpetaja rollist nende eluteel'],
        status: 'completed',
      },
      {
        id: 'c5-3',
        name: 'Pedagoogilise teadmuse levitamine ühiskonnas',
        reflection: 'Jagan pedagoogilisi teadmisi ja häid tavasid lastevanematele, kolleegidele ja huvilistele, selgitan haridusuuenduste ja õppekava eesmärke lihtsas ja arusaadavas keeles.',
        evidence: [
          'Artiklid, ajaveebipostitused või ettekanded kogukonnale (nt „Kuidas toetada noore lugemishuvi”)',
          'Koostöö kohaliku raamatukogu, muuseumi või kultuurikeskusega',
        ],
        actionPoints: ['Käivitada kooli juures lastevanemate hariduslik lugemisklubi'],
        status: 'completed',
      },
      {
        id: 'c5-4',
        name: 'Säilenõtkus',
        reflection: 'Kohanen paindlikult ootamatute muutustega (kriisiolukorrad, distantsõpe, haridusreformid), säilitan rahu ja lahendustele orienteeritud mõtteviisi ning toetan ka teisi ebakindluse perioodidel.',
        evidence: [
          'Refleksioon hübriid- ja distantsõppe korraldamisest ja kiirest kohanemisest',
          'Kriisijuhtimise ja muutustega toimetuleku strateegiad koolitöös',
        ],
        actionPoints: ['Kaardistada isiklikud ja meeskondlikud toimetulekumehhanismid kriisides'],
        status: 'completed',
      },
      {
        id: 'c5-5',
        name: 'Digipädevus',
        reflection: 'Kasutan ja juhendan teisi digitehnoloogiate eesmärgipärasel rakendamisel õppetöös (DigCompEdu raamistik): õppevara loomine, digitaalne hindamine, koostöövahendid ning küber- ja tehisintellektieetika.',
        evidence: [
          'DigCompEdu enesehindamise raport ja digipädevuse arengukava',
          'Digiõppe projektid (nt Canva, Mentimeter, Padlet, Google Workspace, e-õppekeskkonnad)',
          'Õpilaste digipädevuse ja tehisintellekti kriitilise kasutamise hindamine',
        ],
        actionPoints: ['Viia läbi koolitus kolleegidele tehisintellekti (LLM) didaktilisest kasutamisest'],
        status: 'completed',
      },
    ],
  },
];
