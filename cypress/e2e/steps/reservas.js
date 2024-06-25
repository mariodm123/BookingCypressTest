import { Then, When,Given, Step, AfterAll } from '@badeball/cypress-cucumber-preprocessor'
import ReservasPageObject from '../../support/pageObjects/ReservasPageObject.cy'

const reservasPageObject = new ReservasPageObject()

AfterAll(() => {
    reservasPageObject.clearDatabase()
})

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

Given('selecciono la primera reserva', () => {
    reservasPageObject.seleccionarReserva()
    reservasPageObject.recogerPrecio()
})

When('relleno los pasajeros', () => {
    reservasPageObject.rellenarPasajeros()
})

When('relleno la habitación aleatoria', () => {
    reservasPageObject.elegirHabitacionesRandom()
})

When('el usuario rellena la habitación: {string}', (habitacion) => {
    reservasPageObject.elegirHabitacionUsuario(habitacion)
})

When('relleno el nombre: {string}', (nombre) => {
    reservasPageObject.rellenarNombre(nombre)
})

When('relleno el correo: {string}', (correo) => {
    reservasPageObject.rellenarCorreo(correo)
})

When('relleno el número de teléfono: {string}', (telefono) => {
    reservasPageObject.rellenarTelefono(telefono)
})

When('pulso el boton de crear reserva', () =>{
    reservasPageObject.pulsarCrearReserva()
})

When('relleno todos los campos de la reserva', () => {
    Step(this,'relleno los pasajeros')
    Step(this,'relleno la habitación aleatoria')
    Step(this,'relleno el nombre: "Mario PRUEBA QA"')
    Step(this,'relleno el correo: "mario.domenech27@gmail.com"')
    Step(this,'relleno el número de teléfono: "612345678"')
    Step(this,'pulso el boton de crear reserva')
})

Then('se crea la reserva correctamente', () => {
    reservasPageObject.comprobarReservaCreada()
})
