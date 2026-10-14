export interface DefaultEvidenceItem {
  id: string;
  k: string;
  title: string;
  desc: string;
  type: 'file' | 'link';
  url?: string;
  name?: string;
  mime?: string;
  ts: number;
}

export interface DefaultPortfolioData {
  heroImage: string | null;
  texts: Record<string, string>;
  evidence: Record<string, DefaultEvidenceItem[]>;
}

export const DEFAULT_PORTFOLIO_DATA: DefaultPortfolioData = {
  heroImage: null,
  texts: {
    "home-intro": "Tere tulemast minu e-portfooliosse! Olen Elena Galanina, pühendunud pedagoog ja õpetaja. Käesolev e-portfoolio on koostatud vastavalt Õpetaja kutsestandardile (tase 6) ning peegeldab minu professionaalset teekonda, pedagoogilisi väärtusi, eneseanalüüsi ning tõendusmaterjale.",
    "contact-bio": "Pühendunud pedagoog, õppijate arengu toetaja ning haridusuuenduste ja Lego Education Milo haridusroboti projektide elluviija.",
    "contact-email": "kislyakova.lena@gmail.com",
    "contact-location": "Tallinn, Eesti"
  },
  evidence: {}
};
