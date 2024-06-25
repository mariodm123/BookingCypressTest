import { Then, When,Given, Step, AfterAll } from '@badeball/cypress-cucumber-preprocessor'
import ReservasPageObject from '../../support/pageObjects/ReservasPageObject.cy'
import TipoHabitacionesPageObject from '../../support/pageObjects/TipoHabitacionesPageObject.cy'

const reservasPageObject = new ReservasPageObject()
const tipoHabitacionesPageObject = new TipoHabitacionesPageObject()

When('pruebas pruebas', () => {
    tipoHabitacionesPageObject.comprobarCanitidadDisponible()
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

Given('pulso en el boton de nueva reserva', () => {
    reservasPageObject.pulsarNuevaReserva()
})

Then('estoy en la pagina de buscar reserva', () => {
    tipoHabitacionesPageObject.comprobarPageNuevaReserva()
})

When('escribo la cantidad de pasajeros: {int}', (cantidad) => {
    tipoHabitacionesPageObject.escribirPasajeros(cantidad)
})

When('escribo la fecha de entrada: {string}', (fecha_entrada) => {
    tipoHabitacionesPageObject.escribirFechaEntrada(fecha_entrada)
})

When('escribo la fecha de salida: {string}', (fecha_salida) => {
    tipoHabitacionesPageObject.escribirFechaSalida(fecha_salida)
})

When('busco la disponibilidad', () => {
    tipoHabitacionesPageObject.pulsarBuscarDisponibilidad()
})

Then('me salen todas las habitaciones de hotel disponibles para dicha fecha y dichos pasajeros', () => {
    tipoHabitacionesPageObject.comprobarBusquedaDisponible()
})

Given('selecciono el tipo de habitacion que quiero: {string}', (capacidad) => {
    tipoHabitacionesPageObject.seleccionarReserva(capacidad)
    tipoHabitacionesPageObject.recogerPrecio()
})

When('relleno los pasajeros', () => {
    tipoHabitacionesPageObject.rellenarPasajeros()
})

When('relleno la habitación aleatoria', () => {
    tipoHabitacionesPageObject.elegirHabitacionesRandom()
})

When('el usuario rellena la habitación: {string}', (habitacion) => {
    tipoHabitacionesPageObject.elegirHabitacionUsuario(habitacion)
})

When('relleno el nombre: {string}', (nombre) => {
    tipoHabitacionesPageObject.rellenarNombre(nombre)
})

When('relleno el correo: {string}', (correo) => {
    tipoHabitacionesPageObject.rellenarCorreo(correo)
})

When('relleno el número de teléfono: {string}', (telefono) => {
    tipoHabitacionesPageObject.rellenarTelefono(telefono)
})

When('pulso el boton de crear reserva', () =>{
    tipoHabitacionesPageObject.pulsarCrearReserva()
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
    tipoHabitacionesPageObject.comprobarReservaCreada()
})