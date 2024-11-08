import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  fileName: string;

  @Column({ type: 'varchar' })
  fileType: string;

  @Column({ type: 'int' })
  fileSize: number;

  // Colonne pour stocker les données binaires du fichier
  @Column({ type: 'bytea' })
  fileData: Buffer;

  @Column({ type: 'varchar' })
  userId: string; // ID Keycloak de l'utilisateur
}