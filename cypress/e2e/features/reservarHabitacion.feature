Feature: Apartado de reservas

    Background: Navegar a reservas
        Given navego a la web de reservas
        Then estoy en la web de reservas

    Scenario: Como usuario quiero poder hacer una reserva
        Given pulso en el boton de nueva reserva
        Then estoy en la pagina de buscar reserva
        When escribo la cantidad de pasajeros: 1
        And escribo la fecha de entrada: "1999-08-24"
        And escribo la fecha de salida: "2000-08-29"
        And busco la disponibilidad
        Then me salen todas las habitaciones de hotel disponibles para dicha fecha y dichos pasajeros
        Given selecciono el tipo de habitacion que quiero: "Individual"
        When relleno todos los campos de la reserva
        Then se crea la reserva correctamente