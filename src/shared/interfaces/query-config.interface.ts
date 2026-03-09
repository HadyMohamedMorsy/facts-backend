export type QueryRelations = Record<
  string,
  | boolean
  | {
      select?: string[];
      relations?: QueryRelations;
      where?: any;
      orderBy?: any;
      filters?: any;
    }
>;

export interface QueryConfig {
  select?: string[];
  relations?: QueryRelations;
  where?: any;
  orderBy?: any;
  take?: number;
  skip?: number;
  filters?: any;
  isPagination?: boolean;
  sort?: {
    field?: string;
    order?: 'ASC' | 'DESC';
  };
}

