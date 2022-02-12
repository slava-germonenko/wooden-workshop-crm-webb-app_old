import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

import { IMaterial, IPage } from '@common/interfaces';

import { MATERIALS_TABLE_ACTIONS, MATERIALS_TABLE_COLUMNS } from './common';
import { MaterialsStateService } from './materials-state.service';

@Component({
  selector: 'ww-materials',
  templateUrl: 'materials.component.html',
  styleUrls: ['materials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsComponent {
  @HostBinding('class')
  public hostClasses = ['pad-page-content', 'full-height'];

  public readonly materials$ = this.materialsStateService.materials$;

  public readonly materialsCount$ = this.materialsStateService.materialsCount$;

  public readonly tableColumns = [...MATERIALS_TABLE_COLUMNS];

  public readonly tableRowsActions = [...MATERIALS_TABLE_ACTIONS];

  public constructor(private readonly materialsStateService: MaterialsStateService) { }

  public addMaterial(): void {
    this.materialsStateService.addMaterial();
  }

  public dispatchTableRowAction({ item, action } : { item: IMaterial; action: string }): void {
    switch (action) {
      case 'remove':
        this.materialsStateService.deleteMaterial(item.id);
        break;
      case 'update':
        this.materialsStateService.renameMaterial(item);
        break;
      default:
        throw new Error(`Unsupported action on material: ${action}.`);
    }
  }

  public setMaterialsPage(page: IPage): void {
    this.materialsStateService.setMaterialsPage(page);
  }

  public setMaterialsSearch(search: string): void {
    this.materialsStateService.setMaterialsSearch(search);
  }
}
