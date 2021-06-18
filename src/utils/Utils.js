export const formatDate = date => {
    date = new Date(date);
    const year = date.getFullYear();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const MONTHS = [
        "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
    ];
    const month = MONTHS[date.getMonth()];
    const hour = date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${day} ${month}, ${hour}:${minutes}`;
}