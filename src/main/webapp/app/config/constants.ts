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
  },
  {
    link: 'https://factcheckingday.com',
    name: 'FactCheckingDay',
  },
  {
    link: 'https://fullfact.org',
    name: 'FullFact',
  },
  {
    link: 'https://www.politifact.com',
    name: 'Politifact',
  },
  {
    link: 'https://www.globalfact6.com',
    name: 'GlobalFact6',
  },
  {
    link: 'https://reporterslab.org/fact-checking/',
    name: "Reporter's Lab",
  },
  {
    link:
      'https://vip.politicsmeanspolitics.com/2020/01/24/youre-probably-more-susceptible-to-misinformation-than-you-think/?fbclid=IwAR3Hb0yX1NfOCFCLXPNhKpmydaLc85Lorjf5W0jA8I4i7nDnO_s--ks3xNs',
    name: 'PMP Magazine',
  },
  {
    link: 'https://www.snopes.com/fact-check/',
    name: 'Snopes',
  },
  {
    link: 'https://www.factcheck.org',
    name: 'FactCheck.org',
  },
  {
    link: 'https://www.washingtonpost.com/news/fact-checker/',
    name: 'Washington Post',
  },
  {
    link: 'https://www.ellinikahoaxes.gr',
    name: 'Ellinika Hoaxes',
  },
  {
    link: 'https://www.disinfobservatory.org/the-observatory/?fbclid=IwAR3VZr8wCf0-oxH_8GCLf322VZJZqmtUadS0tU_1jtFP8nDy7JWqfOsVJo8',
    name: 'Disinfobservatory.ord',
  },
];
