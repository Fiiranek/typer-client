export const MESSAGE = Object.freeze({
    'SUCCESS': 'SUCCESS',
    'FAILURE': 'FAILURE'
})

export const COUNTRY_CODES = Object.freeze({
    "Turkey": { "code": "tr", "group": "A" },
    "Italy": { "code": "it", "group": "A" },
    "Wales": { "code": "gb", "group": "A" },
    "Switzerland": { "code": "ch", "group": "A" },
    "Denmark": { "code": "dk", "group": "B" },
    "Finland": { "code": "fi", "group": "B" },
    "Belgium": { "code": "be", "group": "B" },
    "Russia": { "code": "ru", "group": "B" },
    "Netherlands": { "code": "nl", "group": "C" },
    "Ukraine": { "code": "ua", "group": "C" },
    "Austria": { "code": "at", "group": "C" },
    "North Macedonia": { "code": "mk", "group": "C" },
    "England": { "code": "gb", "group": "D" },
    "Croatia": { "code": "hr", "group": "D" },
    "Scotland": { "code": "gb", "group": "D" },
    "Czech Republic": { "code": "cz", "group": "D" },
    "Spain": { "code": "es", "group": "E" },
    "Sweden": { "code": "se", "group": "E" },
    "Poland": { "code": "pl", "group": "E" },
    "Slovakia": { "code": "sk", "group": "E" },
    "Hungary": { "code": "hu", "group": "F" },
    "Portugal": { "code": "pt", "group": "F" },
    "France": { "code": "fr", "group": "F" },
    "Germany": { "code": "de", "group": "F" },
})

export const COUNTRY_LIST = Object.keys(COUNTRY_CODES).map(e => e);

export const SERVER_URL = window.location.href.includes('localhost') ? 'http://localhost:5000' : 'https://euro-2020-typer.herokuapp.com';

export const FLAG_SIZE = 64;