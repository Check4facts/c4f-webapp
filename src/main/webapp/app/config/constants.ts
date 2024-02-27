const config = {
  VERSION: process.env.VERSION,
};

export default config;

export const SERVER_API_URL = process.env.SERVER_API_URL;

export const AUTHORITIES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
};

export const messages = {
  DATA_ERROR_ALERT: 'Internal Error',
};

export const APP_DATE_FORMAT = 'DD/MM/YY';
export const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
export const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
export const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';
export const APP_LOCAL_DATETIME_FORMAT_Z = 'YYYY-MM-DDTHH:mm Z';
export const APP_WHOLE_NUMBER_FORMAT = '0,0';
export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]';

export const THIRD_PARTY_LINK = [
  {
    link: 'https://www.poynter.org/ifcn/',
    name: 'Poynter',
    logo: '../content/images/poynter-logo.png',
  },
  // {
  //   link: 'https://factcheckingday.com',
  //   name: 'FactCheckingDay',
  //   logo: '../content/images/ellinikahoaxes-logo.png'
  // },
  {
    link: 'https://fullfact.org',
    name: 'FullFact',
    logo: '../content/images/fullfact-logo.png',
  },
  {
    link: 'https://www.politifact.com',
    name: 'Politifact',
    logo: '../content/images/politifact-logo.png',
  },
  // {
  //   link: 'https://www.globalfact6.com',
  //   name: 'GlobalFact6',
  //   logo: '../content/images/ellinikahoaxes-logo.png'
  // },
  {
    link: 'https://reporterslab.org/fact-checking/',
    name: "Reporter's Lab",
    logo: '../content/images/dukereporterslab-logo.png',
  },
  // {
  //   link:
  //     'https://vip.politicsmeanspolitics.com/2020/01/24/youre-probably-more-susceptible-to-misinformation-than-you-think/?fbclid=IwAR3Hb0yX1NfOCFCLXPNhKpmydaLc85Lorjf5W0jA8I4i7nDnO_s--ks3xNs',
  //   name: 'PMP Magazine',
  //   logo: '../content/images/ellinikahoaxes-logo.png'
  // },
  {
    link: 'https://www.snopes.com/fact-check/',
    name: 'Snopes',
    logo: '../content/images/snopes-logo.png',
  },
  {
    link: 'https://www.factcheck.org',
    name: 'FactCheck.org',
    logo: '../content/images/factcheck-logo.png',
  },
  {
    link: 'https://www.washingtonpost.com/news/fact-checker/',
    name: 'Washington Post',
    logo: '../content/images/thewashingtonpost-logo.png',
  },
  {
    link: 'https://www.ellinikahoaxes.gr',
    name: 'Ellinika Hoaxes',
    logo: '../content/images/ellinikahoaxes-logo.png',
  },
  {
    link: 'https://www.disinfobservatory.org/the-observatory/?fbclid=IwAR3VZr8wCf0-oxH_8GCLf322VZJZqmtUadS0tU_1jtFP8nDy7JWqfOsVJo8',
    name: 'Disinfobservatory.ord',
    logo: '../content/images/soma-logo.png',
  },
  {
    link: 'https://edmo.eu/',
    name: 'EDMO',
    logo: '../content/images/edmo-logo.jpg',
  },
  {
    link: 'https://meddmo.eu/',
    name: 'MedDMO',
    logo: '../content/images/meddmo-logo.webp',
  },
  {
    link: 'https://efcsn.com/',
    name: 'EFCSN',
    logo: '../content/images/efcsn-logo.svg',
  },
  {
    link: 'https://www.reuters.com/fact-check/',
    name: 'Reuters',
    logo: '../content/images/reuters-logo.svg',
  },
  {
    link: 'https://www.bbc.com/news/reality_check',
    name: 'BBC Reality Check',
    logo: '../content/images/bbc-logo.svg',
  },
];
