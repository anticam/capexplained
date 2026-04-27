const cds = require('@sap/cds')

module.exports = class BookstoreService extends cds.ApplicationService {
  init() {
    const timestamp = () => new Date().toISOString()

    const { Books } = cds.entities('BookstoreService')

    this.before('READ', Books, async (req) => {
      console.log(`[${timestamp()}] Before READ Books`, req.data)
    })

    this.on('READ', Books, async (req, next) => {
      console.log(`[${timestamp()}] On READ Books`, req.data)
      return next();
    })

    this.after('READ', Books, async (books, req) => {
      console.log(`[${timestamp()}] After READ Books`)//, books)
      for (const book of books) {
        if (book.genre_code === 'Art') {
          book.price *= 0.8;
          book.title += ' (20% discount)';
          console.log(`[${timestamp()}] Discount applied to book ${book.ID} (${book.title}) price: ${book.price}`);
        }
      }
    })



    return super.init()
  }
}
