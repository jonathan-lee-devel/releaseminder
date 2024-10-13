import {NgClass} from '@angular/common';
import {Component, input} from '@angular/core';

@Component({
  selector: 'app-login-sidebar-feature',
  standalone: true,
  imports: [
    NgClass,
  ],
  templateUrl: './login-sidebar-feature.component.html',
  styleUrl: './login-sidebar-feature.component.scss',
})
export class LoginSidebarFeatureComponent {
  iconClass = input.required<string>();
  title = input.required<string>();
  text = input.required<string>();
}
