import { IFolder } from './folder.interface';

export interface IAsset {
  assetName: string;
  created: Date;
  id: string;
  folderId?: string;
  folder?: IFolder;
  size: number;
  updated?: Date;
  url?: string;
}
