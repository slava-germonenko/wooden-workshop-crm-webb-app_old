import { IButton } from '@common/interfaces';

export interface ITreeNode extends IButton{
  children?: ITreeNode[];
}
