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