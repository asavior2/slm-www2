import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router'
import { NavbarComponent } from "../navbar/navbar.component";
import Libros from '../../../public/libros.json';
import LibrosHebreo from '../../../public/librosHebreo.json';
import { LocalStorageService } from '../services/local-storage.service';
import { DataBibliaService } from '../services/data-biblia.service';



@Component({
  selector: 'app-biblia',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './biblia.component.html',
  styleUrl: './biblia.component.css'
})


export class BibliaComponent {

  constructor(private localStorageService: LocalStorageService, private dataBibliaService: DataBibliaService) { }

  libro:number=43;
  //LibrosPrueba;
  capitulo:number=3;
  primerP: Array<any> = new Array();
  segundoP: Array<any> = new Array();
  //textoJson;
  //titulos;
  citas: any[] = new Array;
  cantCapitulo: any[] = new Array;
  librot:string = '';
  mostrarLibros = false;
  mostrarCapitulos = false;
  mostrarGenesis = false;
  mostrarTexto = false;
  fontSize:number = 22;
  //posicion;

  //citaIcon;
  //prueba ;
  contadorCitas = 1;
  versiculoCompleto = {
    'datos':[]
  };
  hayCitas = false;
  mapCita = [];
  mapText = [];
  textoJsonFinal: any;
  //imprimirVersiculo;
  arregloTextoCita: any;
  textoCita: string = "";
  textoCitaA = [];
  //tempVersiculo;
  //versiculoTEMP;
  dataTemp:any = new Array;
  textTemp = '';
  marcador: any[] = new Array;
  marcadorLibro: any[] = new Array;
  //marcarV;
  //zipPath;
  progrss: any="";
  //stadoDir: boolean;
  //public update: boolean;
  //librosTodosHebreo: any[] = new Array;
 
  //tipoOrdenT: boolean;
  //tipoOrdenM: boolean;
  //tipoOrdenH: boolean;
  //tipoOrdenName;
  //private fragment: string;
  //private sub: Subscription;
  //audioMP3:string;
  //private win: any = window;
  //tiempoAudio;
  colorVar = "blue"
  readVersiculo: boolean = true;
  isPlaying: boolean = false;
  //audio;
  idPlay = 0;
  tiempoRecorrido = 0;
  ultimoTiempo = 0;
  playPausa:string ="play";
  share:boolean = false;
  copiaCondensado = [];
  //pathDiviceIosAndroid:string;
  darkMode:boolean= true;
  estadoDark:string = "moon";
  
  librosTodos: any[] = Libros;
  librosTodosHebreo = LibrosHebreo;


  ngOnInit() {
    //console.log(this.librosTodos); 
    this.localStorageService.setItem("fontSize", this.fontSize);
    console.log('fontSize: '+ this.localStorageService.getItem('fontSize'));

    // Get libro actual numerico y texto 
    this.libro = this.localStorageService.getItem('libro');
    if (this.libro != null){
      for (let entry of Libros){
        if (this.libro == entry.id){
          this.librot = entry.libro;
        }
      }
    }else{
      this.libro = 43;
      this.librot = 'Juan';
    }
    
    //Get tamaño de la fuente
    this.fontSize = this.localStorageService.getItem('fontSize');
    if (this.fontSize == null || this.fontSize < 15) {
      this.fontSize = 22;
      this.localStorageService.setItem("fontSize", this.fontSize);
    } else {
      this.fontSize = 22;
    }

    // Get Capitulo 
    this.capitulo = this.localStorageService.getItem('capitulo');
    if (this.capitulo !== null) {
      // primer mostrar texto
      this.mostrarTextoMetodo (this.libro, this.capitulo);
      // console.log(this.capitulo);
    } else {
      this.capitulo = 3;
      this.mostrarTextoMetodo (this.libro, this.capitulo);
    }





  } // ngOnInit

  async mostrarTextoMetodo(libro:number, capitulo:number) {
    console.log('Llamado a mostrarTextoMetodo()');
    //this.marcarVersiculoAudioRemove("all")
    this.citas = [];
    this.localStorageService.setItem("libro", libro);
    this.localStorageService.setItem("capitulo", capitulo);
    this.marcador = this.localStorageService.getItem(libro.toString())
    if (this.marcador == null){
      this.marcador = [];
    }

    this.mostrarCapitulos = false;
    this.libro = libro;
    this.capitulo = capitulo;
    this.actualizarLibroTitulo(this.libro);

    /* 
    if (this.isPlaying){
      this.playAudio()
      await this.delay2(900);
      this.idPlay = 0
      this.tiempoRecorrido = 0
      await this.audioReproductor()
    }else{
      this.idPlay = 0
      this.tiempoRecorrido = 0
      console.log("desde no *** audioReproductor")
      await this.audioReproductor()
    }*/
    this.textoJsonFinal = await this.dataBibliaService.getTextoImport(this.libro, this.capitulo);
    
    console.log("textoJsonFinal***********")
    console.log(this.textoJsonFinal)

    this.mostrarTexto = true;
  }

  actualizarLibroTitulo(libro:number) {
    console.log('Llamado a actualizarLibroTitulo()')
    //Metodo para actualizar el nombre del libro
    for (let entry of Libros) {
      if (libro === entry.id) {
        this.librot = entry.libro;
      }
    }
    this.getcapitulos(this.libro);
  }

  getcapitulos(libro:number) {
    console.log('Llamado a getcapitulos()')
    this.cantCapitulo = [];
    for (const entry of Libros) {
      if (entry.id == libro) {
        for (let _i = 0; _i < +entry.capitulos; _i++) {
          this.cantCapitulo.push(_i + 1);
        }
        console.log(this.cantCapitulo)
      }
    }
    // console.log('Cantidad de capitulos ' + this.cantCapitulo);
  }

  //Reproductor de audio
  /*
  async audioReproductor(){
    //Validar si el audio existe con readAsText
    
    let promiseAudio = this.file.readAsText(this.file.applicationStorageDirectory + this.pathDiviceIosAndroid, "por-Capitulos/" + this.libro + "/" + this.capitulo + ".mp3");
    if(promiseAudio != undefined){
      await promiseAudio.then((value) => {
        console.log("ARCHIVO  existente ");
        let localAudioURL = this.file.applicationStorageDirectory + this.pathDiviceIosAndroid + "por-Capitulos/" + this.libro + "/" + this.capitulo + ".mp3";
        this.audioMP3 = this.win.Ionic.WebView.convertFileSrc(localAudioURL);
      }).catch(err => {
        console.error(err);
        console.log("ARCHIVO AUDIO no  existente ir a internet ");
        this.audioMP3 = "https://sionlecheymiel.com/file/audios/" + this.libro + "/" + this.capitulo + ".mp3";
      });
    }else{
      this.audioMP3 = "https://sionlecheymiel.com/file/audios/" + this.libro + "/" + this.capitulo + ".mp3";
    }
    //this.audioMP3 = "assets/audios/" + this.libro + "-" + libro + "/" + this.capitulo +".mp3"
    this.tiempoAudio = this.bibliaService.getTextoAudio(this.libro, this.capitulo);
    console.log(this.tiempoAudio)
    console.log("***** " + this.audioMP3)
    

    this.storage.get('playAuto').then((val) => {
      if (val != null && val == true) {

        this.playAudio()
      }
      console.log("playAuto reproductor " + val);
    });

    this.audio = new Audio();

     this.audio.addEventListener("playing", async () => { 
      //playing  Tras una falta de datos, el recurso multimedia vuelve a estar listo para reproducirse.
      this.playPausa = "pause"

      this.isPlaying = true;
      console.log("Event playing");
      let tiempo
      //console.log("Event onplaying");
      //console.log(this.tiempoAudio)
      if (this.tiempoAudio != null){
        this.tiempoRecorrido = 0; 
        for (const entry  of this.tiempoAudio){
          console.log(entry)
          let versiculoAnterior = entry.versiculo - 1
          if (!this.isPlaying){
            this.idPlay = parseInt(entry.id) - 1 ;
            console.log("idPlay")
            console.log(this.idPlay)            
            break;
          }
          //if(this.audio.currentTime){
          //console.log("this.audio.currentTime " + this.audio.currentTime)
          //console.log("this.tiempoRecorrido " + this.tiempoRecorrido)
          //}

          if (parseInt(entry.id) >= this.idPlay){
            if (parseInt(entry.versiculo) > 1){
              this.marcarVersiculoAudioRemove("readVersiculol" + versiculoAnterior)
              this.marcarVersiculoAudioAdd("readVersiculol" + entry.versiculo)
            }else {
              this.marcarVersiculoAudioAdd("readVersiculol" + entry.versiculo)
            }
            ///tiempo = entry.seg*1000
            tiempo = parseInt(entry.seg)
            let tiempoRestante = (entry.seg - tiempo)*1000
            if (entry.versiculo != ""){
              this.router.navigate( ['/tabs/tab1'], {fragment: "l"+entry.versiculo});
            }
            //Siguiente linea es para hacer efecto el route frament [recordar debe existir el id en el html]
            this.sub = this.activeRoute.fragment.pipe(filter(f => !!f)).subscribe(f => document.getElementById(f).scrollIntoView());

            if (tiempo > 1){
              for (let _i = 0; _i < tiempo*2; _i++) { //ms*2  y time 500 es para solucionar pause play rapido
                //if (!this.isPlaying || this.audio.paused){                  
                if (!this.isPlaying ){
                  break
                }
                //console.log("Espero " + 500)
                await new Promise( resolve => setTimeout(resolve, 500) );
              }
              //console.log("Espero " + tiempoRestante)
              await new Promise( resolve => setTimeout(resolve, tiempoRestante) );
            }else {
              //console.log("Espero " + entry.seg*1000)
              await new Promise( resolve => setTimeout(resolve, entry.seg*1000) );
            }
          }
          this.tiempoRecorrido = this.tiempoRecorrido + entry.seg;
          this.ultimoTiempo = entry.seg; 
        }
      }
      
    });

    this.audio.addEventListener("pause", async () => {
      console.log("Event Pause");
      //this.playAudio();
      this.isPlaying = false;
      await this.storage.set('playAuto', false);
      console.log('4')

      this.playPausa = "play"
      this.marcarVersiculoAudioRemove("all")
      
      //this.isPlaying = !this.isPlaying;
      //await this.storage.set('playAuto', false);
      //this.playPausa = "play"
      //console.log("pause")
      //this.marcarVersiculoAudioRemove("all")
      
    });

    this.audio.addEventListener("ended", async () => {
      await this.storage.set('playAuto', true);
      console.log("Event finalizo el audio reproducción");
      //this.isPlaying = false
      this.nextboton()
    });

    this.audio.addEventListener("loadstart", () => {
      console.log("Event loadstart");
    });
    this.audio.addEventListener("canplaythrough", () => {
      console.log("Event canplaythrough");
    });
    this.audio.addEventListener("waiting", () => {
      //La reproducción se ha detenido por ausencia (temporal) de datos.
      console.log("Event waiting");
      this.isPlaying = false
      this.playPausa = "alert-circle-outline"
    });
    this.audio.addEventListener(".canplay", () => {
      //	La carga del recurso multimedia se ha detenido, pero no por un error.
      console.log("Event .canplay");
      this.isPlaying = false
      this.playPausa = "alert-circle-outline"
    });
    this.audio.addEventListener(".abort", () => {
      //	La carga del recurso multimedia se ha detenido, pero no por un error.
      console.log("Event .abort");
      this.isPlaying = false
      this.playPausa = "alert-circle-outline"
    });
    this.audio.addEventListener(".error", () => {
      //	La carga del recurso multimedia se ha detenido, resultado de un error.
      console.log("Event .error");
      this.isPlaying = false
      this.playPausa = "alert-circle-outline"
    });
  }
  */

  async citaAlert(cita:string, idLibroCita:string, capituloC:string, verInicial:string) {
  
    this.arregloTextoCita = await this.dataBibliaService.getTextoImport(parseInt(idLibroCita), parseInt(capituloC));
    // console.log ("Texto cita" + this.arregloTextoCita);
    // console.log(this.textoCita);
    for (let citaText of this.arregloTextoCita) {
      if (verInicial === citaText.versiculo) {
        if (citaText.hasOwnProperty('comprimido')) {
          this.textoCita = '';
          for (let texto of citaText.comprimido) {
            this.textoCita = this.textoCita + ' ' + texto.parteText;
            if (texto.hasOwnProperty('parteFinal')) {
              this.textoCita = this.textoCita + ' ' + texto.parteFinal;
            }
          }
        } else {
          this.textoCita = citaText.texto;
        }
      }
    }
    this.mostrarCitaAlert(cita, this.textoCita, idLibroCita, capituloC);
    // console.log(this.textoCita);
    this.textoCita = '';
  }


  async mostrarCitaAlert(cita: string, textoVersiculo: string ,idLibro:string, capituloC:string) {
    // HAy que hacer algo como alertController de angular 
    /** 
    const alert = await this.alertController.create({
      header: cita,
      message: "<h6 align=\"center\">" + textoVersiculo + "</h6>",
      buttons: [
                {text:'OK'},
                {
                  text: 'Ir al Capitulo',
                  handler: () => {
                    if (this.isPlaying){
                      this.audio.pause();//Stop
                      this.audio.currentTime = 0;
                      this.idPlay = 0
                      this.tiempoRecorrido = 0  
                      this.router.navigate( ['/tabs/tab1'], {fragment: ""});
                      this.marcarVersiculoAudioRemove("all")
                    }
                    this.mostrarTextoMetodo(idLibro, capituloC);
                    this.ionContent.scrollToTop(300);
                  }
                }
              ],
      mode: 'ios'
    });
    await alert.present();
    */
  }

  async buscarVersiculo(idLibro:string, capitulo:string, versiculo:string) {
    console.log(idLibro + " -- " + capitulo + " -- " + versiculo)

    //Siguiente linea la movi para ngOnInit, aqui daba peo.
    this.dataTemp = await this.dataBibliaService.getTextoImport(parseInt(idLibro), parseInt(capitulo));
    // console.log ("Texto cita" + this.arregloTextoCita);
    console.log(this.dataTemp)
    for (let text of this.textoJsonFinal) {
      if (versiculo == text.versiculo) {
        if (text.hasOwnProperty('comprimido')) {
          this.textTemp = '';
          for (let texto of text.comprimido){
            this.textTemp = this.textTemp + ' ' + texto.parteText;
            if (texto.hasOwnProperty('parteFinal')) {
              this.textTemp = this.textTemp + ' ' + texto.parteFinal;
            }
          }
        } else {
          this.textTemp = text.texto;
        }
      }
    }
  }

  



} // end class

export default BibliaComponent;