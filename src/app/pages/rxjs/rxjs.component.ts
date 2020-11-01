import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {
  public intervalSubs$: Subscription;

  constructor() {
    // this.retornaObservable()
    //   .pipe(retry(2))
    //   .subscribe(
    //     (value) => {
    //       console.log('Subs:', value);
    //     },
    //     (error) => {
    //       console.warn('Error:', error);
    //     },
    //     () => {
    //       console.log('Observable Finalizado');
    //     }
    //   );

    this.intervalSubs$ = this.retornaIntervalo().subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.intervalSubs$.unsubscribe(); // Desuscripción del observable
  }

  retornaIntervalo(): Observable<number> {
    return interval(100).pipe(
      // take(10), // Limite del intervalo
      map((response) => response + 1), // Mutar información del response
      filter((response) => (response % 2 === 0 ? true : false)) // Determinar si emitir un valor de manera condicional
    );
  }

  retornaObservable(): Observable<number> {
    let i = -1;

    return new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          observer.error('i llego al valor de 2');
        }
      }, 1000);
    });
  }
}
