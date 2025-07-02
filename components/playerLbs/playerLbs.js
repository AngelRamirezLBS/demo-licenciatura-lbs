class playerLbs extends componentBase {
  constructor() {
    super();
    this.audio = null;
    this.isPlaying = false;
    this.isDragging = false;
  }

  async getData() {
    let html = '';
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        html = xhr.responseText;
        this.shadowRoot.innerHTML = html;
        this._setupAudio();
        this._setupListeners();
      }
    };
    xhr.open("GET", "components/playerLbs/playerLbs.html", true);
    xhr.send();
  }

  _setupAudio() {
    const audioName = this.getAttribute("audio");
    if (!audioName) return;

    this.audio = new Audio(`assets/audio/${audioName}.mp3`);
    this.shadowRoot.appendChild(this.audio);

    // Actualizar icono al terminar
    this.audio.addEventListener("ended", () => {
      this.isPlaying = false;
      this._updatePauseIcon();
    });

    // Compatibilidad con iOS/Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIpad = /Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1;
    const isIos = /iphone|ipod|ipad/i.test(navigator.userAgent);
    const isChrome = /chrome/i.test(navigator.userAgent);
    const target = this.shadowRoot.querySelector(".player-container");

    const triggerPlay = () => {
      this.audio.play().catch(() => {});
    };

    if (isSafari || isIos || isIpad || isChrome) {
      target.addEventListener('touchstart', triggerPlay, { once: true });
    } else {
      target.addEventListener('click', triggerPlay, { once: true });
    }

    this.audio.addEventListener("loadedmetadata", () => {
      this._updateTimes(); // Establece la duración total
    });
    
    this.audio.addEventListener("timeupdate", () => {
      this._updateTimes(); // Actualiza tiempo actual
    });    
  }

  _setupListeners() {
    const shadow = this.shadowRoot;
  
    // Botones estándar
    shadow.querySelector(".rewind").addEventListener("click", () => {
      if (this.audio) {
        this.audio.currentTime = Math.max(0, this.audio.currentTime - 10);
        const percent = this.audio.currentTime / this.audio.duration;
        const thumbX = percent * (bar.offsetWidth - thumb.offsetWidth);
        gsap.set(thumb, { x: thumbX });
      }
    });
  
    shadow.querySelector(".forward").addEventListener("click", () => {
      if (this.audio) {
        this.audio.currentTime = Math.min(this.audio.duration, this.audio.currentTime + 10);
        const percent = this.audio.currentTime / this.audio.duration;
        const thumbX = percent * (bar.offsetWidth - thumb.offsetWidth);
        gsap.set(thumb, { x: thumbX });
      }
    });
  
    shadow.querySelector(".pause").addEventListener("click", () => {
      if (!this.audio) return;
  
      if (this.audio.paused) {
        this.audio.play();
        this.isPlaying = true;
      } else {
        this.audio.pause();
        this.isPlaying = false;
      }
  
      this._updatePauseIcon();
    });
  
    // Barra y thumb
    const bar = shadow.querySelector(".bar");
    const thumb = shadow.querySelector(".bar-thumb");
    
    console.log("Bar encontrada:", bar);
    console.log("Thumb encontrado:", thumb);
    
    const getClientX = (e) => {
      if (e.touches && e.touches.length > 0) {
        return e.touches[0].clientX;
      } else if (e.changedTouches && e.changedTouches.length > 0) {
        return e.changedTouches[0].clientX;
      } else if (e.clientX !== undefined) {
        return e.clientX;
      }
      return 0;
    };
  
    const updatePositionFromClientX = (clientX) => {
      if (!clientX || isNaN(clientX)) {
        console.log("ClientX inválido:", clientX);
        return;
      }
      
      const rect = bar.getBoundingClientRect();
      const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = offsetX / rect.width;
  
      console.log("Actualizando posición:", { clientX, offsetX, percent });
  
      if (this.audio && this.audio.duration && !isNaN(percent)) {
        this.audio.currentTime = percent * this.audio.duration;
        this._updateTimes();
      }
    };
  
    // Click sobre la barra
    bar.addEventListener("click", (e) => {
      console.log("Click en barra");
      updatePositionFromClientX(getClientX(e));
      const percent = this.audio.currentTime / this.audio.duration;
      const thumbX = percent * (bar.offsetWidth - thumb.offsetWidth);
      console.log("Click - Percent:", percent, "ThumbX:", thumbX, "Bar width:", bar.offsetWidth, "Thumb width:", thumb.offsetWidth);
      gsap.set(thumb, { x: thumbX });
    });
    
    // Click sobre la barra (touch)
    bar.addEventListener("touchstart", (e) => {
      console.log("Touch en barra");
      updatePositionFromClientX(getClientX(e));
      const percent = this.audio.currentTime / this.audio.duration;
      const thumbX = percent * (bar.offsetWidth - thumb.offsetWidth);
      gsap.set(thumb, { x: thumbX });
    });
  
    // Configurar GSAP Draggable para el thumb (usando el mismo enfoque que dragado_tipo5LBS)
    console.log("Configurando GSAP Draggable para player");
    
    // Establecer posición inicial del thumb
    const initialPercent = this.audio ? (this.audio.currentTime / this.audio.duration) : 0;
    const initialX = initialPercent * (bar.offsetWidth - thumb.offsetWidth);
    gsap.set(thumb, { x: initialX });
    
    const draggable = Draggable.create(thumb, {
      type: "x",
      bounds: {
        minX: 0,
        maxX: bar.offsetWidth - thumb.offsetWidth
      },
      inertia: false,
      onDragStart: function() {
        console.log("GSAP Drag start");
        this.isDragging = true;
        thumb.style.cursor = 'grabbing';
      }.bind(this),
      onDrag: function() {
        console.log("GSAP Drag update");
        const rect = bar.getBoundingClientRect();
        const thumbRect = thumb.getBoundingClientRect();
        const offsetX = thumbRect.left - rect.left + thumbRect.width / 2;
        const percent = Math.max(0, Math.min(1, offsetX / rect.width));
        
        console.log("Posición:", { offsetX, percent, rectWidth: rect.width });
        
        if (this.audio && this.audio.duration) {
          this.audio.currentTime = percent * this.audio.duration;
          
          // Actualizar también el fill durante el drag
          const fill = this.shadowRoot.querySelector(".bar-fill");
          if (fill) {
            fill.style.width = `${percent * 100}%`;
          }
        }
      }.bind(this),
      onDragEnd: function() {
        console.log("GSAP Drag end");
        thumb.style.cursor = 'grab';
        this.isDragging = false;
      }.bind(this)
    })[0];
    
    console.log("Draggable creado:", draggable);
    
    // Prevenir que el clic en el thumb active el clic de la barra
    thumb.addEventListener("click", (e) => {
      console.log("Click en thumb");
      e.stopPropagation();
      e.preventDefault();
    });
    
    thumb.addEventListener("touchend", (e) => {
      console.log("Touch en thumb");
      e.stopPropagation();
      e.preventDefault();
    });
  }
  

  _formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }
  
    _updateTimes() {
    if (!this.audio) return;
  
    const currentSpan = this.shadowRoot.querySelector(".current-time");
    const durationSpan = this.shadowRoot.querySelector(".duration");
  
    if (currentSpan) {
      currentSpan.textContent = this._formatTime(this.audio.currentTime);
    }
  
    if (durationSpan && this.audio.duration) {
      durationSpan.textContent = this._formatTime(this.audio.duration);
    }
    
    const fill = this.shadowRoot.querySelector(".bar-fill");
    const thumb = this.shadowRoot.querySelector(".bar-thumb");
    const bar = this.shadowRoot.querySelector(".bar");

    if (this.audio && this.audio.duration) {
      const percent = this.audio.currentTime / this.audio.duration;
      const percentText = `${percent * 100}%`;

      if (fill) fill.style.width = percentText;
      
      // Solo actualizar la posición del thumb si no está siendo arrastrado
      if (thumb && bar && !this.isDragging) {
        const thumbX = percent * (bar.offsetWidth - thumb.offsetWidth);
        gsap.set(thumb, { x: thumbX });
      }
    }
  }


  
  

  _updatePauseIcon() {
    const pauseBtn = this.shadowRoot.querySelector(".pause");
    if (this.isPlaying) {
      pauseBtn.textContent = "⏸"; // Unicode for pause
    } else {
      pauseBtn.textContent = "▶"; // Unicode for play
    }
  }

  connectedCallback() {
    this.getData();
  }

  disconnectedCallback() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }
}

customElements.define('player-lbs', playerLbs);