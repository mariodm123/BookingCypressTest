class ReservasPageObject {

    RESERVAPP = '.d-inline-block'
    BTN_RESERVA = '.btn'
    PASAJEROS = '.col-2 > .form-control'
    FECHA_ENTRADA = ':nth-child(1) > .input-group > .form-control'
    FECHA_SALIDA = ':nth-child(2) > .input-group > .form-control'
    cantidad_pasajeros = ""
    fecha_entrada_texto = ""
    fecha_salida_texto = ""


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

}
export default ReservasPageObject