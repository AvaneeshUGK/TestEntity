using CatalogService as service from '../../srv/cat-service';
annotate service.MasterData with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'RegID',
                Value : RegID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Country',
                Value : Country,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CompanyName',
                Value : CompanyName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ListofDirectors',
                Value : ListofDirectors,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Admin',
                Value : Admin,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Comments',
                Value : Comments,
            },
            {
                $Type : 'UI.DataField',
                Label : 'User',
                Value : User,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Status',
                Value : Status,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Status_val',
                Value : Status_val,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Compliance',
            ID : 'Compliance',
            Target : 'toCompliance/@UI.LineItem#Compliance',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Contact Us',
            ID : 'ContactUs',
            Target : '@UI.FieldGroup#ContactUs',
        },],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'RegID',
            Value : RegID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Country',
            Value : Country,
        },
        {
            $Type : 'UI.DataField',
            Label : 'CompanyName',
            Value : CompanyName,
        },
    ],
);

annotate service.MasterData with @Common.SemanticKey: [ RegID ];

annotate service.MasterData with @(
    UI.FieldGroup #AddKeyAttachments : {
        $Type : 'UI.FieldGroupType',
        Data : [
        ],
    }
);
annotate service.Compliance with @(
    UI.LineItem #Compliance : [
        {
            $Type : 'UI.DataField',
            Value : year,
            Label : 'year',
        },]
);
annotate service.Compliance with @(
    UI.LineItem #Insurance : [
    ]
);
annotate service.MasterData with @(
    UI.FieldGroup #ContactUs : {
        $Type : 'UI.FieldGroupType',
        Data : [
        ],
    }
);
