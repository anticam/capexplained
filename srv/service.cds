using {tutorial.db as db} from '../db/schema';

service BookstoreService {
    entity Books as projection on db.Books;
}
