import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { CustomerOverviewComponent } from './customer-overview/customer-overview.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'articles', component: ArticleComponent },
    { path: 'customer', component: CustomerOverviewComponent },
    { path: 'customerOrder', component: CustomerOrderComponent },
    { path: '', component: LoginComponent },
    { path: '**', redirectTo: '' }
];
