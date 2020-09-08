class BookService {
  async filterDevotionalsByParams(book, params) {
    let {
      limit,
      day,
      month,
      year,
      date,
    } = params;
    let devotionals = [];

    limit = parseInt(limit);
    day = parseInt(day);
    month = parseInt(month);
    year = parseInt(year);

    devotionals = [...book.devotionals];

    devotionals.sort((devotionalA, devotionalB) => {
      dateA = devotionalA.date.split('-').join('');
      dateB = devotionalB.date.split('-').join('');
      return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
    });

    if (day) devotionals = devotionals.filter(devotional => devotional.date.split('-')[2] == day);
    if (month) devotionals = devotionals.filter(devotional => devotional.date.split('-')[1] == month);
    if (year) devotionals = devotionals.filter(devotional => devotional.date.split('-')[0] == year);
    if (limit) devotionals.length = limit;

    return devotionals.length > 0 ? devotionals : undefined;
  }
}

module.exports = BookService;