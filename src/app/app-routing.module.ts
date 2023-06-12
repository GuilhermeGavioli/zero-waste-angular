import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAlimentoComponent } from './add-alimento/add-alimento.component';
import { MeusDadosComponent } from './meus-dados/meus-dados.component';
import { MinhasSolicitacoesComponent } from './minhas-solicitacoes/minhas-solicitacoes.component';
import { PaginaOngComponent } from './pagina-ong/pagina-ong.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { PesquisaDoarComponent } from './pesquisa-doar/pesquisa-doar.component';
import { TipoUsuarioComponent } from './tipo-usuario/tipo-usuario.component';
import { LoginComponent } from './login/login.component';
import { CadONGComponent } from './cad-ong/cad-ong.component';
import { CadUserComponent } from './cad-user/cad-user.component';
import { ConfCcComponent } from './conf-cc/conf-cc.component';
import { RecupPasswordComponent } from './recup-password/recup-password.component';
import { ConfEeComponent } from './conf-ee/conf-ee.component';
import { DeletarcontaComponent } from './deletarconta/deletarconta.component';
import { ComprovanteComponent } from './comprovante/comprovante.component';
import { FazerAgendamentoComponent } from './fazer-agendamento/fazer-agendamento.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { MeusLikesComponent } from './meus-likes/meus-likes.component';
import { MeusAgendamentosComponent } from './meus-agendamentos/meus-agendamentos.component';
import { StartComponent } from './start/start.component';
import { EmailComponent } from './email/email.component';
import { SolicitacaoComponent } from './solicitacao/solicitacao.component';
import { PaginaDaSolicitacaoComponent } from './pagina-da-solicitacao/pagina-da-solicitacao.component';
import { AgendamentosdaminhaorderComponent } from './agendamentosdaminhaorder/agendamentosdaminhaorder.component';
import { MinhasdoacoesComponent } from './minhasdoacoes/minhasdoacoes.component';
import { OrdersComponent } from './orders/orders.component';
import { AjudaComponent } from './ajuda/ajuda.component';
import { AuthGuard } from './auth.guard';
import { NonauthGuard } from './nonauth.guard';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: '', component: TipoUsuarioComponent },
  { path: 'ongs', component: PesquisaDoarComponent, canActivate: [AuthGuard]},
  { path: 'add-solicitacao', component: AddAlimentoComponent, canActivate: [AuthGuard] },
  {path: 'perfil', component: PerfilUsuarioComponent, canActivate: [AuthGuard]},
  { path: 'minhas-solicitacoes', component: MinhasSolicitacoesComponent, canActivate: [AuthGuard] },
  
  {path: 'meus-dados', component: MeusDadosComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [NonauthGuard]},
  {path: 'cadastroONG', component: CadONGComponent, canActivate: [NonauthGuard]},
  { path: 'cadastrousuario', component: CadUserComponent, canActivate: [NonauthGuard] },
  { path: 'confirmacaodecad/:code_path', component: ConfCcComponent, canActivate: [NonauthGuard] },
  { path: 'recupsenha', component: RecupPasswordComponent, canActivate: [NonauthGuard] },
  
  { path: 'confemail', component: ConfEeComponent },
  {path: 'deletarconta', component:DeletarcontaComponent, canActivate: [AuthGuard]},
  {path: 'meus-comprovantes', component:ComprovanteComponent, canActivate: [AuthGuard]},
  {path: 'agendando/:order_id', component:FazerAgendamentoComponent, canActivate: [AuthGuard]},
  { path: 'categorias', component: CategoriasComponent, canActivate: [AuthGuard]},
  
  { path: 'pagina-ong', component: PaginaOngComponent, canActivate: [AuthGuard]},
  
  {path: 'ong/:ong_id', component: PaginaOngComponent, canActivate: [AuthGuard]},
  { path: 'meus-likes', component: MeusLikesComponent, canActivate: [AuthGuard]},
  { path: 'meus-agendamentos', component: MeusAgendamentosComponent, canActivate: [AuthGuard]},
  { path: 'start', component:  StartComponent, canActivate: [AuthGuard]},
  { path: 'mail/:email', component:  EmailComponent},
  { path: 'solicitacao/:order_id', component:  SolicitacaoComponent, canActivate: [AuthGuard]},
    // {path: 'solicitacao', component: PaginaDaSolicitacaoComponent, canActivate: [AuthGuard]},
    {path: 'agendamentosdaorder/:order_id', component: AgendamentosdaminhaorderComponent, canActivate: [AuthGuard]},
  { path: 'minhasdoacoes', component: MinhasdoacoesComponent, canActivate: [AuthGuard]},
  { path: 'ajuda', component: AjudaComponent},
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard]},
    
    { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
