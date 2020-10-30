import { Component, OnInit } from '@angular/core';

// Services
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {
  year = new Date().getFullYear();

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    customInitFunctions();
  }
}
