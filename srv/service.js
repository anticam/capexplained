//import { xpr } from '@sap/cds/lib/compile/parse';

const { Books, Authors } = require('#cds-models/BookstoreService')
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

    this.after('READ', Authors, async (authors) => {
      console.log(`[${timestamp()}] After READ Authors`)//, Authors)
      const ids = authors.map(author => author.ID);
      // const ids2 = authors.map( (author) => { return author.ID} ); // same as above, just more verbose
      console.log(ids);
      const bookCounts = await SELECT
        .from(Books)
        .columns('author_ID', { func: 'count' })
        .where({ author_ID: { in: ids } })
        .groupBy('author_ID');
      console.log('bookCounts :', bookCounts);
      for (const author of authors) {
        const bookCount = bookCounts.find(bookCount => bookCount.author_ID === author.ID);
        // author.bookCount = bookCounts.find(b => b.author_ID === author.ID)?.count ?? 0;
        console.log('book count', bookCount)
        author.bookCount = bookCount?.count ?? 0;
      }

    })



    return super.init()
  }
}
