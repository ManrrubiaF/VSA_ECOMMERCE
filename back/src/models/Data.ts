import { DataType, Table, Column, Model } from 'sequelize-typescript';
import 'reflect-metadata';


@Table
export class Data extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id!: number;
    @Column({allowNull: true, type: 'text' },)
    aboutText!:string;
    @Column(DataType.ARRAY(DataType.STRING))
    videos!:string[];
    @Column(DataType.ARRAY(DataType.STRING))
    photos!:string[];
    @Column({allowNull: true})
    phone!:number;
    @Column({allowNull: true})
    whatsapp!:number;
    @Column({defaultValue: ""})
    email!:string;
    @Column(DataType.ARRAY(DataType.STRING))
    socialLinks!: string[];
    
}
   
