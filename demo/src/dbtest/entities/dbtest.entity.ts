import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Generated, PrimaryColumn, OneToMany } from 'typeorm'
import {Tags} from './tag.entity'
@Entity() // 实体装饰器
export class Dbtest {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 255 })
    spuName: string

    @Column({ type: 'varchar', length: 255 })
    color: string

    @Column({ type: 'varchar', length: 255 })
    colorCode: string

    @Column({ type: 'varchar', length: 255 })
    fineCode: string

    @Column({ type: 'int' })
    number: number

    @Column({
        type: 'enum',
        enum: [0, 1],
        default: 0,  // 定义默认值
        // comment: '是否启用',  // 注释 
        // name: 'isActive', // 列名
        // update: true, // 是否更新列值
        // primary: false, // 将列标记为主要列 和 @PrimaryColumn 相同
        // collation: '', // 列排序规则
    }) // 枚举
    isActive: number

    @Generated('uuid') // 自动生成uuid
    uuid: string

    @CreateDateColumn() // 自动生成创建时间
    createTime: Date

    // @Column({type: 'simple-array'})
    // menchart: string[]

    // @Column({type: 'simple-json'})
    // warehouse: {name: string, code: string}

    @OneToMany(() => Tags, (Tags) => Tags.spuName) // 
    tags: Tags[]

}
