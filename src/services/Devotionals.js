class BookService {
  async getById(devotionals, id) {
    if(!Array.isArray(devotionals)) return undefined;

    const devotional = devotionals.filter(devotional => devotional._id == id);

    return devotional.length > 0 ? devotional[0] : undefined;
  }

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
      let dateA = devotionalA.date.split('-').join('');
      let dateB = devotionalB.date.split('-').join('');
      return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
    });

    if (day) devotionals = devotionals.filter(devotional => devotional.date.split('-')[2] == day);
    if (month) devotionals = devotionals.filter(devotional => devotional.date.split('-')[1] == month);
    if (year) devotionals = devotionals.filter(devotional => devotional.date.split('-')[0] == year);
    if (limit && devotionals.length > limit) devotionals.length = limit;

    return devotionals.length > 0 ? devotionals : undefined;
  }
}

module.exports = BookService;