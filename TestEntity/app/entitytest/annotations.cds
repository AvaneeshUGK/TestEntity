using CatalogService as service from '../../srv/cat-service';
using from '../../db/data-model';
annotate service.MasterData with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Entity',
                Value : Entity,
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
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Compliance',
            ID : 'Compliance',
            Target : 'toCompliance/@UI.LineItem#Compliance',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Insurance',
            ID : 'Insurance',
            Target : 'toInsurance/@UI.LineItem#Insurance',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Entity',
            Value : Entity,
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
    ],
);

annotate service.MasterData with @UI.DeleteHidden : true;

annotate service.Compliance with @(
    UI.LineItem #Compliance : [
        {
            $Type : 'UI.DataField',
            Value : year,
            Label : 'year',
        },{
            $Type : 'UI.DataField',
            Value : FinancialYear,
            Label : 'FinancialYear',
        },{
            $Type : 'UI.DataField',
            Value : DueDate,
            Label : 'DueDate',
        },]
);
annotate service.insurance with @(
    UI.LineItem #Insurance : [
        {
            $Type : 'UI.DataField',
            Value : policy_date,
            Label : 'policy_date',
        },{
            $Type : 'UI.DataField',
            Value : policy_expiry_date,
            Label : 'policy_expiry_date',
        },]
);
annotate service.insurance with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Insurance Information',
            ID : 'InsuranceInformation',
            Target : '@UI.FieldGroup#InsuranceInformation',
        },
    ],
    UI.FieldGroup #InsuranceInformation : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : convert_premium_in_usd,
                Label : 'convert_premium_in_usd'
            },{
                $Type : 'UI.DataField',
                Value : convert_Sum,
                Label : 'convert_Sum',
            },{
                $Type : 'UI.DataField',
                Value : Country,
                Label : 'Country',
            },{
                $Type : 'UI.DataField',
                Value : enter_sum,
                Label : 'enter_sum',
            },{
                $Type : 'UI.DataField',
                Value : enter_premium,
                Label : 'enter_premium',
            },{
                $Type : 'UI.DataField',
                Value : Entity,
                Label : 'Entity',
            },{
                $Type : 'UI.DataField',
                Value : id,
                Label : 'id',
            },{
                $Type : 'UI.DataField',
                Value : name_of_subsidiary,
                Label : 'name_of_subsidiary',
            },{
                $Type : 'UI.DataField',
                Value : others,
                Label : 'others',
            },{
                $Type : 'UI.DataField',
                Value : policy_date,
                Label : 'policy_date',
            },{
                $Type : 'UI.DataField',
                Value : policy_expiry_date,
                Label : 'policy_expiry_date',
            },{
                $Type : 'UI.DataField',
                Value : select_country,
                Label : 'select_country',
            },],
    }
);
