import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.page.html',
  styleUrls: ['./finalizar.page.scss'],
})
export class FinalizarPage implements OnInit {

  isChecked: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  checked(event): void {
    this.isChecked = event.target.checked;
  }

  finalizar(): void {
    this.router.navigate(['/inicio']);
  }

}
