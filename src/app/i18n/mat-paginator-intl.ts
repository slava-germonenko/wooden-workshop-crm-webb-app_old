import { MatPaginatorIntl } from '@angular/material/paginator';

export class RussianMatPaginatorIntl extends MatPaginatorIntl {
  public override firstPageLabel = 'Первая страница';

  public override itemsPerPageLabel = 'Записей на странице';

  public override lastPageLabel = 'Последняя страница';

  public override nextPageLabel = 'Следующая страница';

  public override previousPageLabel = 'Предыдущая страница';

  // eslint-disable-next-line class-methods-use-this
  public override getRangeLabel = (page: number, pageSize: number, length: number) => {
    return `Страница ${page + 1} из ${Math.ceil(length / pageSize)}`;
  };
}
