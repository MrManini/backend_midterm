import { Director } from "../../../domain/entities/director.entity";

export type MovieDto = {
    id: string;
    title: string;
    year: number;
    directorId: string;
    director: Director,
};
