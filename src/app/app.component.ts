import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private destoryRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = interval(1000).subscribe({
      next: (value) => console.log(value),
    });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
