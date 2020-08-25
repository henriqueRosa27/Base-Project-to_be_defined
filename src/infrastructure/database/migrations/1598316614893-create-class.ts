import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createClass1598316614893 implements MigrationInterface {
  name = 'createClass1598316614893';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'class',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'topic',
            type: 'varchar',
            length: '500',
          },
          {
            name: 'teacher_id',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'class',
      new TableForeignKey({
        columnNames: ['teacher_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(`class`);
  }
}
