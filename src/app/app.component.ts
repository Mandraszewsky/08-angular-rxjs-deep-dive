import { Component, DestroyRef, OnInit, effect, inject, signal } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private destoryRef = inject(DestroyRef);
  clickCount = signal(0);

  //signals:
  constructor(){
    effect(() => {
      console.log(`Clicked button ${this.clickCount()} times.`)
    });
  }

  //observables:
  ngOnInit(): void {
    const subscription = interval(1000).pipe(map((value) => value * 2)).subscribe({
      next: (value) => console.log(value),
    });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });

    //signales example for the same thing (also there should be a computed signal that * 2 value):
    // setInterval(() => {
    //   this.interval.update(prevInterval => prevInterval + 1);
    // }, 1000);
  }

  //signals:
  onClick(){
    this.clickCount.update(prevCount => prevCount + 1);
  }
}
