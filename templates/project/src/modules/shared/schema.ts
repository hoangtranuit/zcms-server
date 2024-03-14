export type ObjectSchema = {
    fields: Record<string, ObjectSchemaValue>;
    api?: {
        detail: string;
        list: string;
        create: string;
        update: string;
        delete: string;
    };
    form?: {
        create: any[];
        update?: any[];
    };
    table?: {
        default: any[];
    };
    search?: any;
};

export type ObjectSchemaValue = {
    title: string;
    table: any;
    form: any;
};
