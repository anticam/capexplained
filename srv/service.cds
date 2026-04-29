using {tutorial.db as db} from '../db/schema';

service BookstoreService {
    entity Books      as projection on db.Books
        actions {
            @(Common.SideEffects: {TargetProperties: ['stock']})
            action addStock();
            action changePublishDate(newDate: Date);
            @(Common.SideEffects: {TargetProperties: ['status_code']}) // update only status_code
            //@(Common.SideEffects: {TargetProperties: ['status_code', 'stock']}) // update only status_code and stock 
            //@(Common.SideEffects: {TargetEntities:  ['in']}) // in - update all entites
            // @(Common.SideEffects: {TargetEntities:  ['in/Chapters']}) // in - update all entites
            action changeStatus(
                                @(Common: {
                                    ValueListWithFixedValues: true,
                                    Label                   : 'New status',
                                    ValueList               : {
                                        $Type         : 'Common.ValueListType',
                                        CollectionPath: 'BookStatus',
                                        Parameters    : [{
                                            $Type            : 'Common.ValueListParameterInOut',
                                            LocalDataProperty: newStatus,
                                            ValueListProperty: 'code',
                                        }, ],
                                    },
                                })
                                newStatus: String);
        };

    @(Common.SideEffects: {TargetEntities : ['/BookstoreService.EntityContainer/Books']}) // side effects for unbound actions
    action addDiscount();

    entity Authors    as projection on db.Authors;
    entity Chapters   as projection on db.Chapters;
    entity BookStatus as projection on db.BookStatus;

    entity GenresVH   as projection on db.Genres;
}

annotate BookstoreService.Books with @odata.draft.enabled;

annotate BookstoreService.Authors with @odata.draft.enabled;