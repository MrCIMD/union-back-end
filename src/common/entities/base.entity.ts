import { CreateDateColumn, DeleteDateColumn, VersionColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp with time zone" })
  deletedAt: Date;

  @VersionColumn({ default: 0, nullable: false })
  version: number;
}
