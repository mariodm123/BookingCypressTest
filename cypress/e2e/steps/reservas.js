import { Then, When,Given } from '@badeball/cypress-cucumber-preprocessor'
import ReservasPageObject from '../../support/pageObjects/ReservasPageObject.cy'

const reservasPageObject = new ReservasPageObject()

Given('navego a la web de reservas', () => {
    reservasPageObject.navegarPage()
})

When('pulso en Reservapp', () => {
    reservasPageObject.pulsarReserva()
})

Then('estoy en la web de reservas', () => {
    reservasPageObject.comprobarPageReserva()
})

Given('pulso en el botón de nueva reserva', () => {
    reservasPageObject.pulsarNuevaReserva()
})

Then('estoy en la pagina de buscar reserva', () => {
    reservasPageObject.comprobarPageNuevaReserva()
})

When('escribo la cantidad de pasajeros: {int}', (cantidad) => {
    reservasPageObject.escribirPasajeros(cantidad)
})

When('escribo la fecha de entrada: {string}', (fecha_entrada) => {
    reservasPageObject.escribirFechaEntrada(fecha_entrada)
})

When('escribo la fecha de salida: {string}', (fecha_salida) => {
    reservasPageObject.escribirFechaSalida(fecha_salida)
})

When('busco la disponibilidad', () => {
    reservasPageObject.pulsarBuscarDisponibilidad()
})

Then('me salen todas las habitaciones de hotel disponibles para dicha fecha y dichos pasajeros', () => {
    reservasPageObject.comprobarBusquedaDisponible()
})
