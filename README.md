## Install Material lib

```sh
ng add @angular/material
```

# Usage

Add the components that you will need in the app.module file

```typescript
import { MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

Add the componente into the html file

```html
<mat-toolbar>
    <span>My App</span>
</mat-toolbar>
```

For this example I use css custom class to resize mi img in the logo, you can modify this class if you want

```css
img.logo {
  transform: translateX(-50%);
  width: 100px;
  margin-left: 50%;
  margin-top: 10px;
  margin-right: 20px;
}
```

Good luck and may the force be with you!