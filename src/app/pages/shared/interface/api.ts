import { IUserInfo } from 'src/app/modules/auth';
// 
export interface IAdminList {
    list: IUserInfo[];
}

export interface ICategoriesList {
    id: number;
    title: string;
    description: string;
    media?: string[];
    status: number;
    created_at: string;
    updated_at: string;
}

export interface IMedia {
    uuid: string;
    size: number;
    extension: string;
    original: string;
    type: number;
    from_feature: string;
    url: string;
}