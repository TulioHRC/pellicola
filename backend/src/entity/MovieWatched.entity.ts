import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "movie_watched" })
export class MovieWatched{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    imdbID: string

    @Column()
    Title: string

    @Column()
    Year: string

    @Column()
    Type: string

    @Column()
    Poster: string

    @Column({ nullable: true })
    audioFilePath: string
};