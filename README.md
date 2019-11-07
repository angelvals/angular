## Install Material lib

```sh
ng add @angular/material
```

## Add new components

```sh
# Pages
ng generate component pages/user
# Components
ng generate component components/header
```

## Usage

Add the components that you will need in the app.module file, in this example we are using a custom component for the header and material components

```typescript
// Import all the material components that we are going to need
import {
  MatToolbarModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatInputModule,
  MatCheckboxModule,
  MatRadioModule
} from '@angular/material';
// Pages in router must be added as components as well
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/settings/settings.component';
// Custom header component
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

Modify your app-routing.module file to add your customs and default routes

```typescript
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'settings', component: SettingsComponent },

  // Default view
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];
```

Add the custom component into the html file

```html
<app-header></app-header>
<p>Any page you want!!</p>
```

Note: The component name is declared in the selector attribute of component.ts file

```typescript
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
```

For this example I use css custom class to resize mi img in the logo, you can modify this class if you want, you can find this in ./src/app/components/header.component.scss

```css
img.logo {
  transform: translateX(-50%);
  width: 100px;
  margin-left: 50%;
  margin-top: 10px;
  margin-right: 20px;
}
a.header-link {
  margin-right: 10px;
}
```

Good luck and may the force be with you!
