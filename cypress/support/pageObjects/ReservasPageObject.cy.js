class ReservasPageObject {

    RESERVAPP = '.d-inline-block'
    BTN_RESERVA = '.btn'
    PASAJEROS = '.col-2 > .form-control'
    FECHA_ENTRADA = ':nth-child(1) > .input-group > .form-control'
    FECHA_SALIDA = ':nth-child(2) > .input-group > .form-control'
    ADD_PASAJEROS = ':nth-child(4) > .col-12 > .input-group > .form-control'
    ADD_HABITACION = '.form-select'
    ADD_HABITACION_2 = '*[class^="form-select text-end"]'
    ADD_NOMBRE = ':nth-child(1) > .col-12 > .input-group > .form-control'
    ADD_CORREO_ELECTRONICO = '.col > :nth-child(2) > .col-12 > .input-group > .form-control'
    ADD_NUMERO_TELEFONO = '.col > :nth-child(3) > .col-12 > .input-group > .form-control'
    PRECIO = ':nth-child(7) > .col-12 > .input-group > .form-control'
    TABLA = '*[class^="table table-hover table-responsive"]'

    cantidad_pasajeros = ""
    fecha_entrada_texto = ""
    fecha_salida_texto = ""
    precio_text = ""
    ultima_reserva = ""

    navegarPage() {
        cy.visit("/")
    }

    pulsarReserva(){
        cy.get(this.RESERVAPP).should("exist").and("be.visible").click()

    }

    comprobarPageReserva(){
        cy.url().should("include","https://mggp.pythonanywhere.com/")
    }

    pulsarNuevaReserva(){
        cy.get(this.BTN_RESERVA).should("be.enabled").contains("Nueva reserva").click()
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

    seleccionarReserva(){
        cy.get(':nth-child(1) > .text-end > .navbar-brand > .d-inline-block').should("be.visible").click()
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
        });
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
            // Aquí value tendrá el valor del input, por ejemplo, "240,00"
            // Si quieres convertirlo a número, puedes hacer lo siguiente:
            const price = parseFloat(value.replace(',', '.'));
            this.precio_text = price
        });
    }

    comprobarReservaCreada(){
        cy.get(this.TABLA).find('tbody').find('tr').then(listing => {
            this.ultima_reserva = Cypress.$(listing).length
            cy.log(this.ultima_reserva)
            cy.get(`:nth-child(${this.ultima_reserva}) > :nth-child(6)`).contains(this.precio_text)
            cy.get(`:nth-child(${this.ultima_reserva}) > :nth-child(5)`).contains(this.cantidad_pasajeros)
        });
    }
}
export default ReservasPageObject