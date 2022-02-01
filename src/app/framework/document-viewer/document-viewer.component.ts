import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'ww-document-viewer',
  templateUrl: 'document-viewer.component.html',
  styleUrls: ['document-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentViewerComponent {
  private documentUrl?: string;

  public googleViewerIframeUrl?: SafeResourceUrl;

  @Input()
  public set src(src: string) {
    this.documentUrl = src;
    this.googleViewerIframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://docs.google.com/gview?url=${src}&embedded=true`,
    );
  }

  public constructor(private readonly sanitizer: DomSanitizer) { }
}
