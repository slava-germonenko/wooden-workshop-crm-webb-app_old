import { MatSnackBarRef } from '@angular/material/snack-bar';

import { ToastrComponent } from '@framework/toastr';
import { filter } from 'rxjs';

export class ToastrRef {
  public closed$ = this.snackbarRef.afterDismissed();

  public closedWithAction$ = this.closed$.pipe(
    filter((dismiss) => dismiss.dismissedByAction),
  );

  public closedWithoutAction$ = this.closed$.pipe(
    filter((dismiss) => !dismiss.dismissedByAction),
  );

  public constructor(private readonly snackbarRef: MatSnackBarRef<ToastrComponent>) { }
}
