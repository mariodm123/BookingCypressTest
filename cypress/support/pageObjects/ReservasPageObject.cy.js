class ReservasPageObject {

    RESERVAPP = '.d-inline-block'
    BTN_RESERVA = '.btn'
    TABLA = '*[class^="table table-hover table-responsive"]'

    navegarPage() {
        cy.visit("/")
    }

    comprobarPageReserva(){
        cy.url().should("include","https://mggp.pythonanywhere.com/")
    }

    pulsarNuevaReserva(){
        cy.get(this.BTN_RESERVA).should("be.enabled").contains("Nueva reserva").click()
    }
}
export default ReservasPageObject