using my.bookshop as my from '../db/data-model';

service CatalogService {
    entity Books as projection on my.Books;
    entity MasterData as projection on my.MasterData;
    entity Compliance as projection on my.Compliance;
    entity Files as projection on my.Files;
}
