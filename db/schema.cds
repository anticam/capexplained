using { cuid, managed } from '@sap/cds/common';

namespace tutorial.db;

entity Books: cuid, managed {
        Title  : String;
        Author : String;
}
