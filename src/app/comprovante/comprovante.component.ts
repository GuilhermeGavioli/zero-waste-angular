import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { slideToSide } from '../slideAnimation';

@Component({
  selector: 'app-comprovante',
  templateUrl: './comprovante.component.html',
  styleUrls: ['./comprovante.component.css'],
  animations: [slideToSide]
})
export class ComprovanteComponent implements OnInit {

  public my_pdfs: any[] = []
  constructor(private router: Router,  private global: GlobalService){}

  async ngOnInit(){
    await this.getMyPdfs()
  }

  async getMyPdfs() {
    const res = await fetch(`${this.global.APIURL}/getMyPDFS`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      this.my_pdfs = await res.json();
      console.log(this.my_pdfs)
    }
  }

  goTo(ong_id: string) {
    this.router.navigateByUrl(`/ong/${ong_id}`)
  }


  public iframesrc = ''
  async getSinglePDF(pdf_id: string) {
    const res = await fetch(`${this.global.APIURL}/filesystem?pdf_id=${pdf_id}`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      const pdfBlob = await res.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const anchor = document.createElement('a');
      anchor.style.display = 'none';
      anchor.href = pdfUrl;
      anchor.download = 'file.pdf';

    // Append the anchor to the document body and click it
    document.body.appendChild(anchor);
    anchor.click();

    // Clean up by revoking the temporary URL
    URL.revokeObjectURL(pdfUrl);
      
      console.log('ok')
    }
  }
  
}
