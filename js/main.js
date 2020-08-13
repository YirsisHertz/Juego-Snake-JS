/**
 * Author: Yirsis Serrano
 * Lang = ES
 * Programming Lang = HTML / CSS / JavaScript (ECMA-262)
 * Version: 1.0.0
 * Sources: Normalize.css project in => https://necolas.github.io/normalize.css/
 * Repositories: 
 * 	Normalize.css: https://github.com/necolas/normalize.css/
 * 	Snake Game: https://github.com/YirsisHertz/Juego-Snake-JS
 * 	YouTube Channel: https://www.youtube.com/channel/UC30q5sUntEDAKIgkk8bmgpg?view_as=subscriber
 * 	Udemy Profile: https://www.udemy.com/user/yirsis-aldebrand-serrano-herrera/
 */

try{

	const dificultad = () => {
		
		const lvl = prompt('Selecciona un nivel \n 1) Facil\n 2) Medio\n 3) Dificil\n 4) Experto\n\n(Una vez seleccionado no podras cambiar tu selección hasta recargar la pagina)')

		if (lvl == 1) {
			
			return 70

		}else if (lvl == 2) {
			
			return 50

		}else if (lvl == 3) {
			
			return 40

		}else if (lvl == 4) {
			
			return 30

		}else{

			return 60

		}
	}

	const velocidad = dificultad()

	let tam = 10
	let puntos = 0
	
	class Objeto{
		
		constructor(){

			this.tam = tam

		}	

		choque(obj){

			let dif_x = Math.abs(this.x - obj.x)
			let dif_y = Math.abs(this.y - obj.y)

			if (dif_x >= 0 && dif_x < tam && dif_y >= 0 && dif_y < tam) {

				return true

			}else{
				
				return false
			}
		}
	}

	class Cola extends Objeto{
		
		constructor(x, y){
			
			super()
			this.x = x
			this.y = y
			this.siguiente = null

		}

		dibujar(ctx){

			if (this.siguiente != null) {

				this.siguiente.dibujar(ctx)

			}

			ctx.fillStyle = "#00FF00"
			ctx.fillRect(this.x, this.y, this.tam, this.tam)

		}

		setPosition(x, y){
			if (this.siguiente != null) {

				this.siguiente.setPosition(this.x, this.y)
				
			}
			this.x = x
			this.y = y
		}

		setCola(){
			
			if (this.siguiente == null) {
				
				this.siguiente = new Cola(this.x, this.y)

			}else{

				this.siguiente.setCola()

			}
		}

		getSiguiente(){

			return this.siguiente
		}

	}

	class Comida extends Objeto{
		
		constructor(){
			
			super()
			this.x = this.generar()
			this.y = this.generar()

		}

		generar(){

			let position = Math.floor(Math.random() * 59) * 10
			return position

		}

		colocar(){
			this.x = this.generar()
			this.y = this.generar()
		}

		dibujar(ctx){

			ctx.fillStyle = "#FF0000"
			ctx.fillRect(this.x, this.y, this.tam, this.tam)

		}
	}

	let cabeza = new Cola(20, 20)
	let comida = new Comida()
	let ejeX = true
	let ejeY = true
	let dirX = 0
	let dirY = 0

	const movimiento = () => {
		
		const nx = cabeza.x + dirX
		const ny = cabeza.y + dirY

		cabeza.setPosition(nx, ny)
	}

	function control(event){
		
		let cod = event.keyCode

		if (ejeX) {
			
			if (cod == 38 || cod == 87) {

				dirY = -tam
				dirX = 0
				ejeX = false
				ejeY = true

			}
			if (cod == 40 || cod == 83) {

				dirY = tam
				dirX = 0
				ejeX = false
				ejeY = true

			}
		}

		if (ejeY) {
			
			if (cod == 37 || cod == 65) {

				dirY = 0
				dirX = -tam
				ejeX = true
				ejeY = false

			}
			if (cod == 39 || cod == 68) {

				dirY = 0
				dirX = tam
				ejeX = true
				ejeY = false

			}
		}

	}

	const gameOver = () => {
		dirX = 0
		dirY = 0
		ejeX = true
		ejeY = true
		cabeza = new Cola(20, 20)
		comida = new Comida()
		puntos = 0
		alert("Perdiste!\nAcepta para volver a jugar")
	}

	const choquePared = () => {

		if (cabeza.x < 0 || cabeza.x > 590 || cabeza.y < 0 || cabeza.y > 590) {
			gameOver()
		}

	}

	const choqueCuerpo = () => {

		let temporal = null

		try{

			temporal = cabeza.getSiguiente().getSiguiente()

		}catch(e){

			temporal = null

		}

		while(temporal != null){

			if (cabeza.choque(temporal)) {
				//GAME OVER
				gameOver()
			}else{
				temporal = temporal.getSiguiente()
			}

		}

	}


	const dibujar = () => {

		const canvas = document.getElementById("canvas")
		const ctx = canvas.getContext("2d")

		ctx.clearRect(0, 0, canvas.width, canvas.height)

		cabeza.dibujar(ctx)
		comida.dibujar(ctx)

	}

	function main(){
		
		document.getElementById('puntaje').innerHTML = `Puntaje: ${puntos}`
		
		choqueCuerpo()
		choquePared()
		dibujar()
		movimiento()

		if(cabeza.choque(comida)){
			
			comida.colocar()
			cabeza.setCola()

			puntos++

		}
	}

	setInterval("main()", velocidad)

}catch(err){
	
	console.log(`Error Encontrado: ${err}`)

}finally{

	console.log("%c¡ADVERTENCIA!\n", "color: yellow; font-size: 2em; font-weight: bold; text-align: center;")
	console.log("%cSi usas esta consola, es posible que los atacantes roben tu identidad y tu información a través de un ataque llamado Self-XSS.No ingreses ni pegues ningún código que no entiendas.\n", "font-size: 2em;")

}