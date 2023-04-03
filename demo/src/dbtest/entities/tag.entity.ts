import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Generated, PrimaryColumn, ManyToOne } from 'typeorm'
import {Dbtest} from './dbtest.entity';

@Entity() // 实体装饰器
export class Tags {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Dbtest)
    spuName: Dbtest

    @Column({ type: 'varchar', length: 255 })
    tag: string

}
