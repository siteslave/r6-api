import * as Knex from 'knex';

export class Api {
  getKpiList(db: Knex, thYear:string, level: string) {
    return db('kpi_list')
      .select('id', 'kpi_no', 'title', 'kpi_unit', 'operator', 'goal', 'result')
      .where('kpi_year', thYear)
      .where('kpi_level', level)
      .orderBy('title', 'ASC');
  }
}