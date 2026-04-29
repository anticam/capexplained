//import { xpr } from '@sap/cds/lib/compile/parse';

const { Books } = require('#cds-models/BookstoreService')
const { Genre } = require('#cds-models/tutorial/db')
const cds = require('@sap/cds')


module.exports = class BookstoreService extends cds.ApplicationService {
  init() {
    const timestamp = () => new Date().toISOString();

    //  const { Books } = cds.entities('BookstoreService')

    this.on('addDiscount', async () => {
      await UPDATE(Books)
        // .set({ price: { '*=': 0.9 } })
        .set({ price: { func: 'ROUND', args: [{ xpr: [{ ref: ['price'] }, '*', { val: 0.9 }] }, { val: 2 }] } })

    })

    this.on('addStock', Books, async (req) => {
      console.log('AddStock called: ', req.params)
      const bookId = req.params[0].ID;

      //const { ID } = req.params[0];
      //console.log('AddStock book ID, ID: ', bookId, ID);
      await UPDATE(Books)
        .set({ stock: { '+=': 1 } })
        .where({ ID: bookId })

    })


    this.on('changePublishDate', Books, async (req) => {
      console.log('changePublishDate called: ', req.params, req.data)
      const bookId = req.params[0].ID;
      const newDate = req.data.newDate;
      //const { ID } = req.params[0];
      //console.log('AddStock book ID, ID: ', bookId, ID);
      await UPDATE(Books)
        .set({ publishedAt: newDate })
        .where({ ID: bookId })

    })

    this.on('changeStatus', Books, async (req) => {
      console.log('changeStatus called: ', req.params, req.data)
      const bookId = req.params[0].ID;
      const newStatus = req.data.newStatus;
      //const { ID } = req.params[0];
      //console.log('AddStock book ID, ID: ', bookId, ID);
      await UPDATE(Books)
        .set({ status_code: newStatus })
        .where({ ID: bookId })

    })

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
        if (book.genre_code === Genre.Art) {
          book.price *= 0.8;
          book.title += ' (20% discount)';
          console.log(`[${timestamp()}] Discount applied to book ${book.ID} (${book.title}) price: ${book.price}`);
        }
      }
    })



    return super.init()
  }
}
