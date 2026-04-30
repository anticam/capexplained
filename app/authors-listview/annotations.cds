using BookstoreService as service from '../../srv/service';
annotate service.Authors with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Ebook',
            ID : 'Ebook',
            Target : '@UI.FieldGroup#Ebook',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Books Information',
            ID : 'BookInformation',
            Target : '@UI.FieldGroup#BookInformation',
        },
    ],
    UI.FieldGroup #Ebook : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : content,
                Label : 'Ebook file',
            },
        ],
    },
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : name,
            Label : 'Name',
        },
    ],
    UI.FieldGroup #BookInformation : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : bookCount,
                Label : 'Book count',
            },
        ],
    },
);

