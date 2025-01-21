import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { CustomerOverviewComponent } from './customer-overview/customer-overview.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';
import { OrderComponent } from './order/order.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'articles', component: ArticleComponent },
    { path: 'customer', component: CustomerOverviewComponent },
    { path: 'order', component: OrderComponent },
    { path: 'customerOrder', component: CustomerOrderComponent },
    { path: '', component: LoginComponent },
    { path: '**', redirectTo: '' }
];
