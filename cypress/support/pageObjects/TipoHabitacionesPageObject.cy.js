import ReservasPageObject from "./ReservasPageObject.cy"

const reservasPageObject = new ReservasPageObject()
let intentos = 10

class TipoHabitacionesPageObject {
    BTN_RESERVA = '.btn'
    PASAJEROS = '.col-2 > .form-control'
    FECHA_ENTRADA = ':nth-child(1) > .input-group > .form-control'
    FECHA_SALIDA = ':nth-child(2) > .input-group > .form-control'
    TABLA_DISPONIBILIDAD = '*[class^="table table-hover table-responsive"]'
    ADD_PASAJEROS = ':nth-child(4) > .col-12 > .input-group > .form-control'
    ADD_HABITACION = '.form-select'
    ADD_HABITACION_2 = '*[class^="form-select text-end"]'
    ADD_NOMBRE = ':nth-child(1) > .col-12 > .input-group > .form-control'
    ADD_CORREO_ELECTRONICO = '.col > :nth-child(2) > .col-12 > .input-group > .form-control'
    ADD_NUMERO_TELEFONO = '.col > :nth-child(3) > .col-12 > .input-group > .form-control'
    PRECIO = ':nth-child(7) > .col-12 > .input-group > .form-control'

    cantidad_pasajeros = 0
    fecha_entrada_texto = ""
    fecha_salida_texto = ""
    precio_text = 0
    ultima_reserva = ""

    //Genera una fecha aleatoria entre una fecha de entrada y una de salida
    getRandomDate(start, end) {
        const startDate = new Date(start)
        const endDate = new Date(end)
        const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
        return new Date(randomTime).toISOString().split('T')[0]
    }

    //Aqui se define segun los pasajeros (a) y el tipo de habitacion (b) el índice
    customCalculation(a, b) {
        const results = {
            "2,2": 1,
            "2,3": 2,
            "2,4": 3,
            "3,3": 1,
            "3,4": 2,
            "4,4": 1
        }
    
        // Formateamos los números para buscar en el objeto results
        let key = `${Math.min(a, b)},${Math.max(a, b)}`
        
        // Devolvemos el resultado correspondiente o null si no se encuentra
        return results[key] || null
    }
    
    //Tipo de habitaciones, simplemente pasa de lo que pide el usuario a numerico
    tipoHabitacion(ordinal) {
        const ordinalMap = {
            'Individual': 1,
            'Doble': 2,
            'Triple': 3,
            'Cuádruple': 4
        }

        return ordinalMap[ordinal]
    }

    comprobarPageNuevaReserva(){
        cy.url().should("include","room_types/")
    }

    pulsarBuscarDisponibilidad(){
        cy.get(this.BTN_RESERVA).should("be.enabled").contains("Buscar disponibilidad").click()
    }

    escribirPasajeros(cantidad){
        cy.get(this.PASAJEROS).should("be.visible").type(cantidad)
        this.cantidad_pasajeros = cantidad
    }

    escribirFechaEntrada(fecha_entrada){
        cy.get(this.FECHA_ENTRADA).should("be.visible").type(fecha_entrada)
        this.fecha_entrada_texto = fecha_entrada
    }

    escribirFechaSalida(fecha_salida){
        cy.get(this.FECHA_SALIDA).should("be.visible").type(fecha_salida)
        this.fecha_salida_texto = fecha_salida
    }

    comprobarBusquedaDisponible(){
        cy.url().should("include",`?guest_count=${this.cantidad_pasajeros}&start_date=${this.fecha_entrada_texto}&end_date=${this.fecha_salida_texto}`)
    }

    seleccionarReserva(habitacion){
        const capacidad = this.tipoHabitacion(habitacion)
        const pasajeros = parseInt(this.cantidad_pasajeros)
        let index = 0
        //Si buscas por mas cantidad de pasasjeros de los que quieres la habitacion, no entra
        if(capacidad >= this.cantidad_pasajeros){
            if(pasajeros === 1){
                index = capacidad
            }else{
                //Calcula el índice segun los pasajeros que se hayan introducido y el tipo de habitacion del usuario
                index = this.customCalculation(pasajeros,capacidad)
            }
            
            //Entramos en la cantidad disponible para verificar si tiene o no
            cy.get(`tbody > :nth-child(${index}) > :nth-child(3)`).then(cantidad_disponible => {
                const cantidad = parseInt(cantidad_disponible.text())
                if(cantidad > 0){
                    cy.get(`:nth-child(${index}) > .text-end > .navbar-brand > .d-inline-block`).should("be.visible").click()
                }else{
                    //Si no encuentra ninguna fecha generar una aleatoria para que asi si que hayan habitaciones disponibles
                    intentos--
                    this.escribirFechaEntrada(this.getRandomDate('2001-01-01', '2001-06-31'))
                    this.escribirFechaSalida(this.getRandomDate('2001-07-01', '2001-12-31'))
                    //Le damos 10 intentos para buscar una fecha que tenga disponibilidad
                    this.pulsarBuscarDisponibilidad()
                    if(intentos > 0){
                        this.seleccionarReserva(habitacion)
                    }
                }
            })
        }  
    }

    rellenarPasajeros(){
        cy.get(this.ADD_PASAJEROS).should("be.visible").type(this.cantidad_pasajeros)
    }

    elegirHabitacionUsuario(habitacion){
        cy.get(this.ADD_HABITACION).should("be.visible").select(habitacion)
    }

    elegirHabitacionesRandom(){
        cy.get(this.ADD_HABITACION_2).find('option').then(listing => {
            const random = Math.floor(Math.random() * Cypress.$(listing).length)
            cy.get(this.ADD_HABITACION_2).select(random)
        })
    }

    rellenarNombre(nombre){
        cy.get(this.ADD_NOMBRE).should("be.visible").type(nombre)
    }

    rellenarCorreo(correo){
        cy.get(this.ADD_CORREO_ELECTRONICO).should("be.visible").type(correo)
    }

    rellenarTelefono(telefono){
        cy.get(this.ADD_NUMERO_TELEFONO).should("be.visible").type(telefono)
    }

    pulsarCrearReserva(){
        cy.get(this.BTN_RESERVA).should("be.visible").contains("Crear reserva").click()
    }

    recogerPrecio(){
        cy.get(this.PRECIO)
        .invoke('val')
        .then((value) => {
            //Para convertirlo a numerico
            const price = parseFloat(value.replace(',', '.'))
            this.precio_text = price
        })
    }

    comprobarReservaCreada(){
        cy.get(reservasPageObject.TABLA).find('tbody').find('tr').then(listing => {
            const ultima_reserva = Cypress.$(listing).length
            cy.get(`:nth-child(${ultima_reserva}) > :nth-child(6)`).contains(this.precio_text)
            cy.get(`:nth-child(${ultima_reserva}) > :nth-child(5)`).contains(this.cantidad_pasajeros)
        })
    }
}
export default TipoHabitacionesPageObject

