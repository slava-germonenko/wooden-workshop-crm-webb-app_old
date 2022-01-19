import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { IFolder } from '@common/interfaces';

@Component({
  selector: 'ww-folder-card',
  templateUrl: 'folder-card.component.html',
  styleUrls: ['folder-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderCardComponent {
  private folderIsSelected = false;

  @HostBinding('class')
  public hostClasses = ['mat-border', 'align-center'];

  @Input()
  @HostBinding('class.selected')
  public selected = false;

  @Input()
  public folder?: IFolder;
}
