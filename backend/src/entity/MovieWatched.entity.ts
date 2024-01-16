import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "movie_watched" })
export class MovieWatchedEntity{
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
    imdbRating: string

    @Column()
    Poster: string

    @Column({ nullable: true })
    audioFilePath: string
};