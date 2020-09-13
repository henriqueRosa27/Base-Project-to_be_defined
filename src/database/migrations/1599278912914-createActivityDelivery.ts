import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class createActivityDelivery1599278912914
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'activity_delivery',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'note',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'delivery_date',
            type: 'date',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'report',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'feedback',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'image',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'activity_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'student_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'activity_delivery',
      new TableForeignKey({
        columnNames: ['activity_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'activity',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'activity_delivery',
      new TableForeignKey({
        columnNames: ['student_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('activity_delivery');
  }
}
