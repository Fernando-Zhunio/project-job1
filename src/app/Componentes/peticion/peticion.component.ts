import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
// import { AngularFireMessaging } from '@angular/fire/messaging';

// import { AngularFireStorage } from "@angular/fire/st";
import { Subscription, Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { MatDialog } from '@angular/material';
import { ModalPeticionComponent } from '../Modals/modal-peticion/modal-peticion.component';

@Component({
  selector: "app-peticion",
  templateUrl: "./peticion.component.html",
  styleUrls: ["./peticion.component.scss"],
})
export class PeticionComponent implements OnInit {
  collection_pedidos = "Pedidos";

  // itemCollecion: AngularFirestoreCollection<any>;
  $collecion_suscribe: Subscription;
  peticiones = [];
  // messagingFire:any;

  constructor(
    private afs: AngularFirestore,
    public dialog: MatDialog,
    // private afm:AngularFireMessaging
    private afstorage: AngularFireStorage
  ) {
    // contruccion de base de datos firebase
    // this.messagingFire =
    this.$collecion_suscribe = afs
      .collection(this.collection_pedidos, (ref) => ref.orderBy("fecha"))
      .valueChanges()
      .subscribe((res) => {
        console.log(res);
        this.peticiones = res;
      });
  }
  // peticiones = dataPeticion;
  img: File;
  ngOnInit() {}

  ngOnDestroy(): void {
    this.$collecion_suscribe.unsubscribe();
  }

  uploadImg(event) {
    this.img = event.target.files[0];
    // let path = 'FirstMessage';
    // this.afs.ref()
  }

  myId = localStorage.getItem("myId");
  url: Observable<string>;

  sendMessage(url) {
    // let batch = this.afs.firestore.batch();
    this.currentTo = { to: url.from, id_peticion: url.id_pedido };
    console.log(this.currentTo);
    if(this.myId!=this.currentTo.to){
      const dialogRef = this.dialog.open(ModalPeticionComponent, {
        // width: '250px',
        panelClass:["col-10","col-lg-7"],
        data: {to: this.currentTo.to},
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {
        if(!result.state)
        {
          alert('Mensaje cancelado');
          return
        }
        let id = Math.random().toString(36).substring(2);
        let patch = "FirstMessage/" + id;
        let ref = this.afstorage.ref(patch);
        this.afstorage
          .upload(patch, result.imagen)
          .snapshotChanges()
          .pipe(
            finalize(() => {
              ref.getDownloadURL().subscribe((res) => {
                console.log({ res });
                let message = result.message;
                let file = res;
                let precio = result.precio;
                let user = this.myId + "_client";
                let fecha = new Date().getTime();
                console.log("enviando...");
                console.log(this.currentTo);
                // this.afs
                //   .collection<any>(this.currentTo.to+'_client') // a que usuario le voy a enviar el mensaje
                //   .doc(this.currentTo.id_peticion) // el id del la peticion que hace
                //   .collection<any>("chats")
                //   .add({ message, file, precio, user,fecha })
                //   .then((res) => {
                //     console.log(res);
                //     alert('Enviado con exito');
                //   })
                //   .catch((err) => console.log(err));
    
                let document = this.afs.firestore
                  .collection(this.currentTo.to + "_client") // a que usuario le voy a enviar el mensaje
                  .doc(this.currentTo.id_peticion) // el id del la peticion que hace
                  .collection("chats")
                  .doc();
    
                let document2 = this.afs.firestore
                  .collection(this.myId + "_client")
                  .doc("Client")
                  .collection("clients")
                  .doc();
                let batch = this.afs.firestore.batch();
                batch.set(document, { message, file, precio, user, fecha });
                batch.set(document2, {
                  message,
                  to: this.currentTo.to + "_client",
                  peticion_id: this.currentTo.id_peticion,
                });
                batch.commit().then((res) => console.log(res));
              });
            })
          )
          .subscribe();
      });
    }
    else{
      alert("Este mensaje le pertenece a usted no se puede enviar un mensaje a usted mismo")
    }
  }

  currentTo: info_peticion_send;
  // showModal(url) {
  //   this.currentTo = { to: url.from, id_peticion: url.id_pedido };
  // }
}

interface info_peticion_send {
  to: string;
  id_peticion: string;
}

const dataPeticion = [
  {
    id: "",
    user: "fzreyes@gmail.com",
    url: "/assets/imagenes/logo-fz.jpg",
    categoria: "vestimenta",
    descripcion: "Solicito un play 4 a precio economico",
    precio_max: 400,
  },
  {
    id: "aMaYrShLx2RDvIUMJw36",
    user: "fzhunio91@hotmail.com",
    url: "/assets/imagenes/logo-fz.jpg",
    categoria: "comida",
    descripcion: "Solicito un play 3 a precio economico",
    precio_max: null,
  },
  {
    id: "aMaYrShLx2RDvIUMJw36",
    user: "fzhunio@hotmail.com",
    url: "/assets/imagenes/logo-fz.jpg",
    categoria: "videojuegos",
    descripcion: "Solicito un play 2 a precio economico",
    precio_max: 400,
  },
  {
    id: "",
    user: "4",
    url: "/assets/imagenes/logo-fz.jpg",
    categoria: "comida",
    descripcion: "Solicito un vestimenta a precio economico",
    precio_max: 400,
  },
  {
    id: "",
    user: "5",
    url: "/assets/imagenes/logo-fz.jpg",
    categoria: "vestimenta",
    descripcion: "Solicito un play 5",
    precio_max: null,
  },
  {
    id: "",
    user: "6",
    url: "/assets/imagenes/logo-fz.jpg",
    categoria: "videojuegos",
    descripcion: "Solicito un play 4 a precio economico",
    precio_max: 400,
  },
  {
    id: "",
    user: "7",
    url: "/assets/imagenes/logo-fz.jpg",
    categoria: "vestimenta",
    descripcion: "Solicito un play 3 a precio economico",
    precio_max: null,
  },
  {
    id: "",
    user: "8",
    url: "/assets/imagenes/logo-fz.jpg",
    categoria: "vestimenta",
    descripcion: "Solicito un play 2 a precio economico",
    precio_max: 400,
  },
  {
    id: "",
    user: "9",
    url: "/assets/imagenes/logo-fz.jpg",
    categoria: "videojuegos",
    descripcion: "Solicito un vestimenta a precio economico",
    precio_max: 400,
  },
  {
    id: "",
    user: "10",
    url: "/assets/imagenes/logo-fz.jpg",
    categoria: "vestimenta",
    descripcion: "Solicito un play 5",
    precio_max: null,
  },
  {
    id: "",
    user: "11",
    url: "/assets/imagenes/logo-fz.jpg",
    categoria: "videojuegos",
    descripcion: "Solicito un play 4 a precio economico",
    precio_max: 400,
  },
  {
    id: "",
    user: "12",
    url: "/assets/imagenes/logo-fz.jpg",
    categoria: "vestimenta",
    descripcion: "Solicito un play 3 a precio economico",
    precio_max: null,
  },
  {
    id: "",
    user: "13",
    url: "/assets/imagenes/logo-fz.jpg",
    categoria: "vestimenta",
    descripcion: "Solicito un play 2 a precio economico",
    precio_max: 400,
  },
  {
    id: "",
    user: "14",
    url: "/assets/imagenes/logo-fz.jpg",
    categoria: "videojuegos",
    descripcion: "Solicito un vestimenta a precio economico",
    precio_max: 400,
  },
  {
    id: "",
    user: "15",
    url: "/assets/imagenes/logo-fz.jpg",
    categoria: "vestimenta",
    descripcion: "Solicito un play 5",
    precio_max: null,
  },
  {
    id: "",
    user: "16",
    url: "/assets/imagenes/logo-fz.jpg",
    categoria: "vestimenta",
    descripcion: "Solicito un play 4 a precio economico",
    precio_max: 400,
  },
  {
    id: "",
    user: "17",
    url: "/assets/imagenes/logo-fz.jpg",
    categoria: "comida",
    descripcion: "Solicito un play 3 a precio economico",
    precio_max: null,
  },
  {
    id: "",
    user: "18",
    url: "/assets/imagenes/logo-fz.jpg",
    categoria: "videojuegos",
    descripcion: "Solicito un play 2 a precio economico",
    precio_max: 400,
  },
  {
    id: "",
    user: "19",
    url: "/assets/imagenes/logo-fz.jpg",
    categoria: "vestimenta",
    descripcion: "Solicito un vestimenta a precio economico",
    precio_max: 400,
  },
  {
    id: "",
    user: "20",
    url: "/assets/imagenes/logo-fz.jpg",
    categoria: "comida",
    descripcion: "Solicito un play 5",
    precio_max: null,
  },
];
