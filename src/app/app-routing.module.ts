import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { ProdutoComponent } from './produto/produto.component';
import { VendaComponent } from './venda/venda.component';

export const routes: Routes = [
  { path: 'clientes', component: ClienteComponent },
  { path: 'produtos', component: ProdutoComponent },
  { path: 'vendas', component: VendaComponent },
  { path: '', redirectTo: '/clientes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }