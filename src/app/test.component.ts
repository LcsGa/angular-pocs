import { Component, Input } from '@angular/core';
import { AppRouterInputs } from './app.routes';

@Component({
  selector: 'test',
  standalone: true,
  template: '',
})
export default class TestComponent implements AppRouterInputs {
  @Input()
  id!: string;

  @Input()
  test2!: number;

  @Input()
  test3!: boolean | null;

  @Input()
  test4?: string;

  ngOnInit(): void {
    console.log(this.id);
    console.log(this.test2);
    console.log(this.test3);
    console.log(this.test4);
  }
}
