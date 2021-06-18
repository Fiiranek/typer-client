export const MESSAGE = Object.freeze({
    'SUCCESS': 'SUCCESS',
    'FAILURE': 'FAILURE'
})

export const COUNTRY_CODES = Object.freeze({
    "Turkey": "tr",
    "Italy": "it",
    "Wales": "",
    "Switzerland": "ch"
})

export const COUNTRY_LIST = Object.keys(COUNTRY_CODES).map(e => e);

export const SERVER_URL = window.location.href.includes('localhost') ? 'http://localhost:5000' : 'https://euro-2020-typer.herokuapp.com';

export const FLAG_SIZE = 64;