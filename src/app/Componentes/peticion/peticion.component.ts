import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-peticion",
  templateUrl: "./peticion.component.html",
  styleUrls: ["./peticion.component.scss"],
})
export class PeticionComponent implements OnInit {
  constructor(private afs: AngularFirestore) {}
  formMessage = new FormGroup({
    message: new FormControl(null),
    file: new FormControl(null),
    precio: new FormControl(null),
  });
  peticiones = dataPeticion;
  ngOnInit() {}

  sendMessage() {
    let mensaje = this.formMessage.controls["message"].value;
    // let file = this.formMessage.controls["file"].value;
    let file = 'una imagen va aqui'
    let precio = this.formMessage.controls["precio"].value;
    let from = localStorage.getItem("myId");
    console.log('enviando...');
    console.log(this.currentTo);  
    this.afs
      .collection<any>(this.currentTo.user)// a que usuario le voy a enviar el mensaje
      .doc(this.currentTo.id)// el id del la peticion que hace
      .collection<any>("chats")
      .add({ mensaje, file, precio, from })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  currentTo:{user:string,id:string}
  showModal(user,id){
    this.currentTo = {user,id}
  }


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
