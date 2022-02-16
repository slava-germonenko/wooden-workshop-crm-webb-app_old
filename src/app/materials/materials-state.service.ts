import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  shareReplay,
  switchMap,
  skip,
} from 'rxjs';

import { DEFAULT_PAGE } from '@common/constants';
import { IMaterial, IPage } from '@common/interfaces';
import { MaterialsListService } from '@common/services';

import { MaterialsService } from './common';

@Injectable()
export class MaterialsStateService {
  private materialsPageSource = new BehaviorSubject<IPage>(DEFAULT_PAGE);

  private materialsSearchSource = new BehaviorSubject<string>('');

  public readonly materials$: Observable<IMaterial[]>;

  public readonly materialsCount$: Observable<number>;

  public readonly materialsPage$ = this.materialsPageSource.asObservable();

  public constructor(
    private readonly materialsService: MaterialsService,
    private readonly materialsListService: MaterialsListService,
  ) {
    const materialsPage$ = combineLatest([
      this.materialsPageSource,
      this.materialsSearchSource.pipe(skip(1)),
    ]).pipe(
      switchMap(([page, search]) => this.materialsListService.getMaterialsPage(page, search)),
      shareReplay(1),
    );

    this.materials$ = materialsPage$.pipe(
      map((materialsPage) => materialsPage.items),
    );

    this.materialsCount$ = materialsPage$.pipe(
      map((materialsPage) => materialsPage.total),
    );
  }

  public addMaterial(): void {
    this.materialsService.createMaterial()
      .subscribe(() => this.resetPageAndSearch());
  }

  public deleteMaterial(materialId: string): void {
    this.materialsService.deleteMaterial(materialId)
      .subscribe(() => this.resetPageAndSearch());
  }

  public renameMaterial(material: IMaterial): void {
    this.materialsService.updateMaterial(material)
      .subscribe(() => this.resetPageAndSearch());
  }

  public setMaterialsPage(page: IPage): void {
    this.materialsPageSource.next(page);
  }

  public setMaterialsSearch(search: string): void {
    this.materialsSearchSource.next(search);
  }

  private resetPageAndSearch(): void {
    this.materialsPageSource.next(DEFAULT_PAGE);
    this.materialsSearchSource.next('');
  }
}
