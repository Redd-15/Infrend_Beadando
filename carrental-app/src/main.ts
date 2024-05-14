/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF1cXmhMYVF2WmFZfVpgfV9EZlZVQmY/P1ZhSXxXdkBiWn1fcnJRQGlYUEY=');

bootstrapApplication(AppComponent, appConfig, )
  .catch((err) => console.error(err));
