import { Component, DestroyRef, OnInit, effect, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private destoryRef = inject(DestroyRef);
  clickCount = signal(0);

  //convert signal to observable:
  clickCountObservable$ = toObservable(this.clickCount);

  //convert observable to signal:
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, {initialValue: 0}); //overwrite initial value coz observable dont have initial value

  //signals:
  constructor(){
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times.`)
    // });
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

    //using converted signal to observable:
    // this.clickCountObservable$.subscribe({
    //   next: (value) => console.log(`Clicked button ${this.clickCount()} times.`)
    // });

    //using converted observable to signal:
  }

  //signals:
  onClick(){
    this.clickCount.update(prevCount => prevCount + 1);
  }
}
