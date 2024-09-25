import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminAttributes {
    role: string;
    username: string;
    hashed_password: string;
    email: string;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, IAdminAttributes> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    })
    id: string;

    @Column({
        type: DataType.ENUM('superadmin', 'admin'),
        allowNull: false,
        defaultValue: 'admin'
    })
    role: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    hashed_password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    email: string;
}