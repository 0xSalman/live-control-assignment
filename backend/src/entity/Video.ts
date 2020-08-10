import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Video {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    path: string;

    @Column()
    title: string;
    
    @Column()
    extension: string;
    
    @Column('simple-array')
    quality: string[];
}
