//import htmlDOC from './player.html'
// import "assets/package/swiper-bundle.min.js";
class sliderLbs extends componentBase {

  constructor() {
      super();
      this._modal;
      this._fullscreenBtn;

  }

  async getData() {
      
      var txt = '';
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = () => {
        if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
          txt = xmlhttp.responseText;
          this.shadowRoot.innerHTML = txt;

          // this.iframe = this.shadowRoot.getElementById('iframe');
          this.modal = this.shadowRoot.getElementById('iframeModal');
          this.closeBtn = this.shadowRoot.getElementById('closeModalBtn');

          this.shadowRoot.querySelector("swiper-container").addEventListener("click", (event) => {
            const clickedSlide = event.target.closest('.swiper-slide-active');
            if(clickedSlide) {
              this.slideTouched(clickedSlide);
            }
          });
          
          this.closeBtn.addEventListener('click', () => {
            // this.iframe.classList.add('hidden');
            // this.iframe.classList.remove('visible');
            this.modal.style.animationName = "animatebottom";
            this.modal.style.webkitAnimationName = "animatebottom";
            setTimeout(() =>{
              this.modal.style.animationName = null;
              this.modal.style.webkitAnimationName = null;
              this.modal.style.display = 'none';
              this.closeBtn.style.display = 'none';
              if(!this._isMobile) Visor.botonesHandlerWeb('show');
            }, 300);
          });

          // this.shadowRoot.querySelector(".close").addEventListener('click', this._hideModal.bind(this));

          this.updateStyle(this);
          this._logicData(this);
        }
      };
      xmlhttp.open("GET","components/sliderLbs/sliderLbs.html",true);
      xmlhttp.send();
  }

  updateStyle(elem) {
      const shadow = elem.shadowRoot;

      shadow.querySelector("style").textContent = `

      .div-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 700px;
        }

      .div-wrapper-fs {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 1030px;
        }

        .mySwiperFullscreen {
          width: 1400px !important;
          height: 900px !important;
        }
    
        swiper-slide {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          font-size: 22px;
          color: #fff;
        }

        swiper-slide .title {
          font-family: Volte-Semibold;
          font-size: 42px;
          font-size: 42px;
          font-weight: bold;
          max-width: 800px;
          position: relative;
          text-align: center;
        }

        swiper-slide .title-fs {
          font-family: Volte-Semibold;
          font-size: 42px;
          font-size: 75px;
          font-weight: bold;
          max-width: 1250px;
          position: relative;
          text-align: center;
        }
    
        swiper-slide .text {
          font-family: 'Volte-Regular';
          font-size: 30px;
          max-width: 1250px;
          line-height: 1.3;    
          margin-top: 10px;
          text-align: justify;
          position: relative;
          display: flex;
          align-content: center;
          flex-wrap: wrap;
        }
    
        swiper-slide .text-fs {
          font-family: 'Volte-Regular';
          font-size: 42px;
          max-width: 1250px;
          line-height: 1.3;    
          margin-top: 10px;
          text-align: justify;
          position: relative;
          display: flex;
          align-content: center;
          flex-wrap: wrap;
        }

        .swiper-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          position: absolute;
          left: 0;
          top: 0;
        }

        .swiper {
          height: 105%;
        }

        swiper .swiper-wrapper {
          height: 94%;
        }

        .fullscreen {
          margin: 50px;
          --bg: #e74c3c;
          --text-color: #fff;
          position: relative;
          width: 150px;
          border: none;
          background: var(--bg);
          color: var(--text-color);
          padding: 1em;
          font-weight: bold;
          text-transform: uppercase;
          transition: 0.2s;
          border-radius: 5px;
          opacity: 0.8;
          letter-spacing: 1px;
          box-shadow: #c0392b 0px 7px 2px, #000 0px 8px 5px;
        }
        
        .fullscreen:hover {
          opacity: 1;
        }
        
        .fullscreen:active {
          top: 4px;
          box-shadow: #c0392b 0px 3px 2px,#000 0px 3px 5px;
        }

        disabled {
          background-color: rgbs(0, 0, 0, 0.5);
          touch-action: none;
        }

        /* Add Animation */
        @-webkit-keyframes animatetop {
            from {top:-300px; opacity:0} 
            to {top:0; opacity:1}
        }
        @keyframes animatetop {
            from {top:-300px; opacity:0}
            to {top:0; opacity:1}
        }

        .close {
          position: absolute;
          right: 60px;
          margin: 17px;
          color: #000;
          background: #C1C1C1;
          float: right;
          font-size: 32px;
          font-weight: bold;
          z-index: 20;
        }
        .close:hover,
        .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
        }

        @media screen and (max-width: 575.98px) {
          .modal {
            padding-top: 40% !important; 
          }
        }

        @media screen and (min-width: 576px) and (max-width: 844.9px) {
          .modal {
            padding-top: 40% !important; 
          }
        }

        @media screen and (min-width: 845x){
          .modal {
            padding-top: 270px !important; 
          }
        }

        .modal {
          background-color: #1C1C1C;
          display: none; 
          position: fixed;
          z-index: 1; 
          padding-top: 270px; 
          left: 0;
          top: 0;
          width: 100%; 
          height: 100%; 
          backdrop-filter: blur(5px); 
          -webkit-backdrop-filter: blur(5px);
        }
        
        /* Modal Content */
        .modal-content {
            position: relative;
            background-color: #1C1C1C;
            margin: auto;
            padding: 0;
            
            width: 100%;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
            -webkit-animation-name: animatetop;
            -webkit-animation-duration: 0.4s;
            animation-name: animatetop;
            animation-duration: 0.4s
        }
        .modal-header {
          padding: 2px 16px;
          background-color: #1C1C1C;
          color: black;
        }
        .modal-body {
        }

      `;

      this._id = elem.getAttribute("id");
      this._pagina = elem.getAttribute("pagina");
      this._ejercicio = elem.getAttribute("ejercicio");
      this._isFullscreen = elem.getAttribute("fullscreen");
      this._file = elem.getAttribute("file");

      this.observers();
      this.loadData();
  }

  _sliderData(){
      console.log('3 - sliderData');
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        console.log('4 - sliderData despues?');
        xhr.open('GET', `assets/slides${this._ejercicio}.json`, true);
        xhr.responseType = 'json';
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                  const data = xhr.response;

                  // const titulos = [];
                  // const oraciones = [];

                  // for (const item of data) {
                  //     titulos.push(item.titulo);
                  //     oraciones.push(item.oracion);
                  // }
                  // console.log(data);
                  // console.log(data[0].oraciones);
                  // console.log(data[0].titulos);

                  resolve(data);
                  return data;
                   
    
              } else {
                reject(new Error('Error al cargar las preguntas. Código de estado: ' + xhr.status));
              }
        };
        
        xhr.send();
    
        });
    }

  _insertDataSlider(){
    return new Promise(resolve => {
      console.log('2 - insertDataSlider');
      this._sliderData()
      .then((data) => {
        console.log('5 - insertDataSlider despues');
        const swiperCont = this.shadowRoot.querySelector("swiper-container");

        let iFrame = this.shadowRoot.querySelector(".iframe");
        console.log(iFrame);

        iFrame.setAttribute("src", `./assets/gamma-page/${this._file}/index.html`);

        for(let i = 0; i < data[0].titulos.length; i++){
          
          var swiperSlide = document.createElement("swiper-slide");
          var div = document.createElement("div");
          div.setAttribute("class", "swiper-slide-content");
          var img = document.createElement("img");
          img.setAttribute("class", "swiper-slide-bg-image");
          img.setAttribute("src", `./assets/gamma-page/${this._file}/imagenesSlide/foto${i+1}.png`);
          var clickVideo = document.createElement("img");
          clickVideo.muted = true
          clickVideo.setAttribute("class", "video-click");
          clickVideo.setAttribute("src", `assets/img/animation2.gif`);
          
          swiperCont.appendChild(swiperSlide);
          swiperCont.children[i].appendChild(img);
          swiperCont.children[i].appendChild(div);
          swiperCont.children[i].appendChild(clickVideo);

          // var title = document.createElement("div");
          // title.innerText = data[0].titulos[i];
          // title.setAttribute("class", "titulo");
          // title.setAttribute("data-swiper-parallax", -300);

          // var text = document.createElement("div");
          // text.setAttribute("class", "oracion");
          // text.setAttribute("data-swiper-parallax", -100);

          // var img = document.createElement("img");
          // img.setAttribute("class", "swiper-gl-image");
          // img.setAttribute("src", `./images/0${i+1}.jpg`);
          // text.setAttribute("data-swiper-parallax", -100);
          
          // swiperCont.children[i].children[1].appendChild(title);
          // swiperCont.children[i].children[1].appendChild(text);
          // swiperCont.children[i].children[0].appendChild(img);

          // var textData = document.createElement("p");
          // textData.innerText = data[0].oraciones[i];
          // swiperCont.children[i].children[1].children[1].appendChild(textData);

        }

        resolve(swiperCont);
        return swiperCont;

        })
        .catch((error) => {
            console.error(error.message);
        });

      });

      
  }

  async _logicData(elem) {
    console.log('1 - logicData');
    this._insertDataSlider()
    .then((swiperCont) => {
      console.log('6 - logicData despues');
      var swiper = new Swiper("swiper-container");
      Object.assign(swiperCont, {
        slidesPerView: "auto",
        centeredSlides: true,
        grabCursor: true,
        loop: true,
        effect: "coverflow",
        coverflowEffect: {
          depth: 500,
          rotate: 20,
          scale: 1.25,
          stretch: 80,
          modifier: 2,
        },
        speed: 400,
        watchSlidesProgress: true,
      });
      
      swiperCont.initialize();

      const swiperShadow = swiperCont.shadowRoot.querySelector(".swiper");
      const wrapperShadow = swiperCont.shadowRoot.querySelector(".swiper-wrapper");
      swiperShadow.style.cssText += 'height:105%;';
      wrapperShadow.style.cssText += 'height:94%;';

    })
    .catch((error) => {
        console.error(error.message);
    });
  }

  slideTouched(elem) {
    this.modal.style.display = 'flex';
    this.modal.style.animationName = "animatetop";
    this.modal.style.webkitAnimationName = "animatetop"; 
    this.closeBtn.style.display = 'block';
  }
  
  loadData(){
      const search = this.Visor.store.getState().bookReducer.filter(a => a.elemento == this._id);

      if(search != 0) {
          this._itemLbs.value = search[0].data;
      } 
  }

  observers(){
      this._unsubscribe = this.Visor.store.subscribe(()=>{
          
          const search = this.Visor.store.getState().bookReducer.filter(a => a.elemento == this._id);

          if(search != 0) {
              this._itemLbs.value = search[0].data;
          }

      });
  }

  connectedCallback() {
      this.getData();
  }
  disconnectedCallback() {
      this._unsubscribe();
  }
}

customElements.define('slider-lbs',sliderLbs);