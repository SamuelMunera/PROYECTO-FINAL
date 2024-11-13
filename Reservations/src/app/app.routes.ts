import { Routes } from '@angular/router';

// Importación de componentes 
import { HomeComponent } from './pages/home/home.component';
import { CardsPageComponent } from './pages/cards-page/cards-page.component';
import { QuienesSomosComponent } from './pages/quienes-somos/quienes-somos.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DetalleNegocioComponent } from './pages/detalle-negocio/detalle-negocio.component';
import { FormularioReservaComponent } from './pages/formulario-reserva/formulario-reserva.component';
import { TusReservasComponent } from './pages/tus-reservas/tus-reservas.component';

export const routes: Routes = [
    { path: '', component: HomeComponent,  },
    { path: 'card', component: CardsPageComponent },
    { path: 'quienes-somos', component: QuienesSomosComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'business/:id', component: DetalleNegocioComponent},
    { path: 'reserva/:id', component: FormularioReservaComponent },
    { path: 'tusReservas', component:TusReservasComponent  }
];
