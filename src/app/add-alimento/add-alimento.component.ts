import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { slideAnimation } from '../slideAnimation';


@Component({
  selector: 'app-add-alimento',
  templateUrl: './add-alimento.component.html',
  styleUrls: ['./add-alimento.component.css'],
  animations: [slideAnimation]
})
export class AddAlimentoComponent {

  public description: string = ''
  public name: string = ''
  public valid_description: boolean = false
  @ViewChild('descriptionInput') descriptionInput!: ElementRef;
  @ViewChild('createOrderButton') createOrderButton!: ElementRef;
  @ViewChild('ErrorMessage') ErrorMessage!: ElementRef;

  public denied_message: string = ''
  public loading: boolean = false;
  showLoading() {
    this.loading = true
    this.createOrderButton.nativeElement.disabled = true
  }

  hideLoading() {
    this.loading = false
    this.createOrderButton.nativeElement.disabled = false
  }

  public is_message_being_shown = false;
  handleMessageAppearence() {
    if (this.is_message_being_shown) return;
    this.is_message_being_shown = true;
    this.ErrorMessage.nativeElement.innerText = this.denied_message;
    this.ErrorMessage.nativeElement.style.top = '25px'
    setTimeout(() => {
      this.is_message_being_shown = false
      this.ErrorMessage.nativeElement.style.top = '-300px'
      this.denied_message = '';
    }, 3000);

  }


  constructor(private router: Router, private global: GlobalService) {}
  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  onDescriptionInputChange() {
    if (this.description.length >= 85 && this.description.length < 400) {
      this.valid_description = true;
      this.descriptionInput.nativeElement.style.border = '2px solid var(--zw-red)'
    } else {
      this.descriptionInput.nativeElement.style.border = '1px solid #b4b4b4'
    }
  }

  public items = [0, 0, 0, 0, 0, 0, 0]
  public possible_items = ['Farinhas e Amidos', 'Produtos em Conserva', 'Óleos e Gorduras', 'Leites e Derivados', 'Sucos e Bebidas', 'Grãos e Cereais', 'Enlatados']



  async createOrder() {
    this.loading = true
    const res = await fetch(`${this.global.APIURL}/createorder`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({items: this.items, name: this.name, description: this.description})
    });
    if (res.status === 200) {
      alert('ok')
      window.location.href = '/perfil'
    } else {
      this.denied_message = await res.text()
      this.handleMessageAppearence()
    }
    this.loading = false
  }



  public valid_name: boolean = false
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('nameContainer') nameContainer!: ElementRef;
  onNameInputChange() {
    if (this.name) {
      const nameRegex = /^[a-zA-Z0-9ç ]*$/;
      const valid = nameRegex.test(this.name)
      // Update UI based on name validity
      if (valid && this.name.length > 3)  {
        this.valid_name = true
        this.nameContainer.nativeElement.style.border = '2px solid var(--zw-red)'
        // Valid name
        // Perform UI updates or other actions
      } else {
        this.valid_name = false
        this.nameContainer.nativeElement.style.border = '1px solid #b4b4b4'
        // Invalid name
        // Perform UI updates or other actions
      }
    } else {
      this.valid_name = false
      this.nameContainer.nativeElement.style.border = '1px solid #b4b4b4'
      // Empty email
      // Perform UI updates or other actions
    }
  }

  goTo(url: string){
    this.router.navigateByUrl(`/${url}`)
  }

}
