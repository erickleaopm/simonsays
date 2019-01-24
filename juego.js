const azul = document.getElementById('azul')
const purpura = document.getElementById('purpura')
const rojizo = document.getElementById('rojizo')
const esmeralda = document.getElementById('esmeralda')
const btnEmpezar = document.getElementById('btnEmpezar')
const txtLevel = document.getElementById('level');
const countLevel = document.getElementById('countLevel')
const ULTIMO_NIVEL = 3

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    this.contadorNivel()
    setTimeout(this.siguienteNivel, 500)
  }

  inicializar() {
    this.contadorNivel = this.contadorNivel.bind(this)
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.elegirColor = this.elegirColor.bind(this)
    this.toggleBtnEmpezar()
    this.showHideLevel()
    this.nivel = 1
    this.colores = {
      azul,
      purpura,
      rojizo,
      esmeralda
    }
  }

  toggleBtnEmpezar() {
    if(btnEmpezar.classList.contains('hide')) {
      btnEmpezar.classList.remove('toggle')
      setTimeout(() => btnEmpezar.classList.remove('hide'), 500)
    } else {
      btnEmpezar.classList.add('hide')
      setTimeout(() => btnEmpezar.classList.add('toggle'), 500)
    }
  }

  showHideLevel() {
    if(txtLevel.classList.contains('show')) {
      txtLevel.classList.remove('show')
    } else {
      txtLevel.classList.add('show')
    }
  }

  generarSecuencia() {
    // Es importante rellenar el array con 'fill'
    // puesto que si el array está vacío 'map' da error.
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  siguienteNivel() {
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventosClick()
  }

  contadorNivel() {
    countLevel.innerHTML = this.nivel
  }

  transformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return 'azul'
      case 1:
        return 'purpura'
      case 2:
        return 'rojizo'
      case 3:
        return 'esmeralda'
    }
  }

  transformarColorANumero(color) {
    switch (color) {
      case 'azul':
        return 0
      case 'purpura':
        return 1
      case 'rojizo':
        return 2
      case 'esmeralda':
        return 3
    }
  }

  iluminarSecuencia() {
    for(let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), 1000 * i)
    }
  }

  iluminarColor(color) {
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 350)
  }

  apagarColor(color) {
    this.colores[color].classList.remove('light')
  }

  agregarEventosClick() {
    this.colores.azul.addEventListener('click', this.elegirColor)
    this.colores.purpura.addEventListener('click', this.elegirColor)
    this.colores.rojizo.addEventListener('click', this.elegirColor)
    this.colores.esmeralda.addEventListener('click', this.elegirColor)
  }
  
  eliminarEventosClick() {
    this.colores.azul.removeEventListener('click', this.elegirColor)
    this.colores.purpura.removeEventListener('click', this.elegirColor)
    this.colores.rojizo.removeEventListener('click', this.elegirColor)
    this.colores.esmeralda.removeEventListener('click', this.elegirColor)
  }

  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color;
    const numeroColor = this.transformarColorANumero(nombreColor)
    this.iluminarColor(nombreColor)
    if(numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++
      if(this.subnivel === this.nivel) {
        this.nivel++
        this.eliminarEventosClick()
        if(this.nivel === (ULTIMO_NIVEL + 1)) {
          this.ganoElJuego()
        } else {
          setTimeout(this.contadorNivel, 500)
          setTimeout(this.siguienteNivel, 1500)
        }
      }
    } else {
      this.perdioElJuego()
    }
  }

  ganoElJuego() {
    swal("YAY!", "Felicitaciones, ganaste el juego!", "success")
      .then(this.inicializar)
  }

  perdioElJuego() {
    swal("Opss!", "Lo lamentamos, perdiste 😥", "error")
    .then(() => {
      this.eliminarEventosClick()
      this.inicializar()
    })
  }
}

function empezarJuego() {
  window.juego = new Juego()
}