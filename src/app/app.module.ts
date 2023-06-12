import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TipoUsuarioComponent } from './tipo-usuario/tipo-usuario.component';
import { PesquisaDoarComponent } from './pesquisa-doar/pesquisa-doar.component';
import { AddAlimentoComponent } from './add-alimento/add-alimento.component';
import { PaginaOngComponent } from './pagina-ong/pagina-ong.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { MinhasSolicitacoesComponent } from './minhas-solicitacoes/minhas-solicitacoes.component';
import { MeusDadosComponent } from './meus-dados/meus-dados.component';
import { LoginComponent } from './login/login.component';
import { CadONGComponent } from './cad-ong/cad-ong.component';
import { CadUserComponent } from './cad-user/cad-user.component';
import { ConfCcComponent } from './conf-cc/conf-cc.component';
import { RecupPasswordComponent } from './recup-password/recup-password.component';
import { ConfEeComponent } from './conf-ee/conf-ee.component';
import { DeletarcontaComponent } from './deletarconta/deletarconta.component';
import { ComprovanteComponent } from './comprovante/comprovante.component';
import { FazerAgendamentoComponent } from './fazer-agendamento/fazer-agendamento.component';
import { HeaderComponent } from './header/header.component';

// transitions & Animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

 // get forms data and bind them to variables
import { FormsModule } from '@angular/forms';
import { CategoriasComponent } from './categorias/categorias.component';
import { MeusAgendamentosComponent } from './meus-agendamentos/meus-agendamentos.component';
import { MeusLikesComponent } from './meus-likes/meus-likes.component';
import { StartComponent } from './start/start.component';
import { EmailComponent } from './email/email.component';
import { SolicitacaoComponent } from './solicitacao/solicitacao.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { AgendamentosdaminhaorderComponent } from './agendamentosdaminhaorder/agendamentosdaminhaorder.component';
import { MinhasdoacoesComponent } from './minhasdoacoes/minhasdoacoes.component';
import { OrdersComponent } from './orders/orders.component';
import { AjudaComponent } from './ajuda/ajuda.component';
import { GlobalService } from './global.service';
import { ReportComponent } from './report/report.component';

export function globalServiceFactory(globalService: GlobalService) {
  return () => globalService.initialize();
}

@NgModule({
  declarations: [
    AppComponent,
    TipoUsuarioComponent,
    PesquisaDoarComponent,
    AddAlimentoComponent,
    PaginaOngComponent,
    PerfilUsuarioComponent,
    MinhasSolicitacoesComponent,
    MeusDadosComponent,
    LoginComponent,
    CadONGComponent,
    CadUserComponent,
    ConfCcComponent,
    RecupPasswordComponent,
    ConfEeComponent,
    DeletarcontaComponent,
    ComprovanteComponent,
    FazerAgendamentoComponent,
    HeaderComponent,
    CategoriasComponent,
    MeusAgendamentosComponent,
    MeusLikesComponent,
    StartComponent,
    EmailComponent,
    SolicitacaoComponent,
    AgendamentoComponent,
    AgendamentosdaminhaorderComponent,
    MinhasdoacoesComponent,
    OrdersComponent,
    AjudaComponent,
    ReportComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    GlobalService,
    {
      provide: APP_INITIALIZER,
      useFactory: globalServiceFactory,
      deps: [GlobalService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router) {}
  
 }
