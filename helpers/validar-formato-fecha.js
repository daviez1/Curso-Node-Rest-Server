function isValidDate(dateString) {
    // Expresión regular para el formato "yyyy/mm/dd"
    const dateFormat = /^\d{4}\/\d{2}\/\d{2}$/;
    return dateFormat.test(dateString);
}

module.exports = isValidDate