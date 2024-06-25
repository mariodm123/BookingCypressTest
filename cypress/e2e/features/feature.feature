Feature: Apartado de reservas

    Background: Navegar a reservas
        Given navego a la web de reservas
        Then estoy en la web de reservas
        
    Scenario: Como usuario quiero poder hacer una reserva
        Given pulso en el botón de nueva reserva
        Then estoy en la pagina de buscar reserva
        When escribo la cantidad de pasajeros: 2
        And escribo la fecha de entrada: "2021-07-24"
        And escribo la fecha de salida: "2021-07-29"
        And busco la disponibilidad
        Then me salen todas las habitaciones de hotel disponibles para dicha fecha y dichos pasajeros
        Given selecciono la primera reserva
        When relleno todos los campos de la reserva
        Then se crea la reserva correctamente
