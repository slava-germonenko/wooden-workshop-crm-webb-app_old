import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
} from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { ITreeNode } from '@common/interfaces';

import { ADMINISTRATION_TREE_ITEMS } from './constatnts';

@Component({
  selector: 'ww-administration',
  templateUrl: 'administration.component.html',
  styleUrls: ['administration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdministrationComponent {
  @HostBinding('class')
  public hostClasses = ['pad-page-content', 'full-size'];

  public readonly treeNodesControl = new NestedTreeControl<ITreeNode>((node) => node.children);

  public readonly treeNodesDataSource = new MatTreeNestedDataSource<ITreeNode>();

  public constructor() {
    this.treeNodesDataSource.data = [...ADMINISTRATION_TREE_ITEMS];
  }

  // eslint-disable-next-line class-methods-use-this
  public hasChild(_: number, node: ITreeNode): boolean {
    return !!node.children?.length;
  }
}
