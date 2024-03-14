export class CreateProjectDto {
    name: string;
    logo: string;
    apiBaseUrl: string;
    primaryColor: string;
    layout: {
        api: string;
        footer: boolean;
        search: boolean;
    };
    auth: {
        api: {
            login: string;
            profile: string;
        }
    };
    isDarkTheme: string;
}

export class CreateModuleDto {
    name: string;
    schema: any;
}
