import { Component, OnInit } from '@angular/core';

// Services
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {
  year = new Date().getFullYear();

  constructor(
    private settingsService: SettingsService,
    private _sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    customInitFunctions();
    this._sidebarService.cargarMenu();
  }
}
