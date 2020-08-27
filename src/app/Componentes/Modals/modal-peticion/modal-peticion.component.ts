import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-modal-peticion",
  templateUrl: "./modal-peticion.component.html",
  styleUrls: ["./modal-peticion.component.scss"],
})
export class ModalPeticionComponent implements OnInit {
  // constructor() { }
  constructor(
    private thisDialog: MatDialogRef<ModalPeticionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  formMessage = new FormGroup({
    message: new FormControl(null, [Validators.required]),
    file: new FormControl(null,[Validators.required]),
    precio: new FormControl(null, [Validators.required]),
  });
  img: File;

  ngOnInit() {}

  uploadImg(event) {
    this.img = event.target.files[0];
    // let path = 'FirstMessage';
    // this.afs.ref()
  }
  sendMessage() {
    if(this.formMessage.valid && this.img!=null){
      let message = this.formMessage.controls['message'].value;
      // let message = this.formMessage.controls['message'].value;
      let precio = this.formMessage.controls['precio'].value;
      this.thisDialog.close({state:true, message,precio,imagen:this.img})
    }
    else
      alert('Se requieren todos los datos');
  }
}
