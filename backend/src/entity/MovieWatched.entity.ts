import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "movie_watched" })
export class MovieWatched{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    imdbID: string

    @Column()
    title: string

    @Column()
    year: number

    @Column()
    type: string

    @Column()
    posterURL: string

    @Column()
    audioFilePath: string
};