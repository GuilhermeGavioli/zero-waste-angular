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

const routes: Routes = [
  { path: '', component: TipoUsuarioComponent },
  { path: 'ongs', component: PesquisaDoarComponent },
  { path: 'add-solicitacao', component: AddAlimentoComponent },
  {path: 'ong', component: PaginaOngComponent},
  {path: 'perfil', component: PerfilUsuarioComponent},
  {path: 'minhas-solicitacoes', component: MinhasSolicitacoesComponent},
  {path: 'meus-dados', component: MeusDadosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cadastroONG', component: CadONGComponent},
  {path: 'cadastrousuario', component:CadUserComponent},
  {path: 'confirmacaodecad', component:ConfCcComponent},
  {path: 'recupsenha', component:RecupPasswordComponent},
  {path: 'confemail', component:ConfEeComponent},
  {path: 'deletarconta', component:DeletarcontaComponent},
  {path: 'comprovante', component:ComprovanteComponent},
  {path: 'agendando/:order_id', component:FazerAgendamentoComponent},
  { path: 'categorias', component: CategoriasComponent },

  { path: 'meus-likes', component: MeusLikesComponent },
  { path: 'meus-agendamentos', component: MeusAgendamentosComponent },
  { path: 'start', component:  StartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
