using {
    cuid,
    managed,
    sap.common.Currencies,
    Currency
} from '@sap/cds/common';
using {Attachments} from '@cap-js/attachments';

namespace tutorial.db;

entity Books : cuid, managed {
    title       : String;
    author      : Association to Authors;
    genre       : Association to Genres;
    publishedAt : Date;
    pages       : Integer;
    price       : Decimal(9, 2);
    //currency    : Association to Currencies;
    currency    : Currency;
    stock       : Integer;
    status      : Association to BookStatus;
    Chapters    : Composition of many Chapters
                      on Chapters.book = $self;
}

annotate Books with {
    price @Measures.ISOCurrency: currency_code;
}

entity Genres {
    key code        : Genre;
        description : String;
}

type Genre          : String enum {
    Fiction = 'Fiction';
    Science = 'Science';
    Cooking = 'Cooking';
    Fantasy = 'Fantasy';
    Hobby = 'Hobby';
    Adventure = 'Adventure';
    SelfHelp = 'Self-Help';
    NonFiction = 'Non-Fiction';
    Art = 'Art';
    Children = 'Children'
}

entity BookStatus {
    key code        : String(1) enum { // BookStatusCode;
            Available = 'A';
            Low_Stock = 'L';
            Unavailable = 'U';
        };
        criticality : Integer;
        displayText : String;
}

type BookStatusCode : String(1) enum {
    Available = 'A';
    Low_Stock = 'L';
    Unavailable = 'U';
}

entity Authors : cuid, managed {
    name              : String;
    fileName          : String;
    fileType          : String      @Core.IsMediaType;
    content           : LargeBinary @Core.MediaType                  : fileType
                                    @Core.AcceptableMediaTypes       : ['application/pdf'] // https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types/Common_types
                                    @Core.ContentDisposition.Filename: fileName;
    virtual bookCount : Integer;
    attachments       : Composition of many Attachments;
    books             : Association to many Books
                            on books.author = $self;
}

entity Chapters : cuid, managed {
    key book   : Association to Books;
        number : Integer;
        title  : String;
        pages  : Integer;

}
