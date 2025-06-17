En este nivel se encuentran los endpoints de la aplicación
- Se utiliza el router de express para definir los endpoints
- Se utiliza el controller para definir la lógica de la aplicación
- Se utiliza el datasource para obtener los datos de la base de datos
- Se utiliza el repository para realizar las acciones con la base de datos
- Se utiliza el use case para realizar las acciones de la aplicación
- Se utiliza el entity para representar los datos de la aplicación
- Se utiliza el dto para representar los datos de la aplicación
- Se utiliza el server para iniciar el servidor

# Consideraciones:
El controller.ddd.ts es una implementación de un controller que utiliza el enfoque de Domain Driven Design (DDD), se hacen todas las acciones desde el mismo controller

El controller.ts es una implementación de un controller que utiliza el enfoque de Clean Architecture, se hacen las acciones mandando a llamar los use cases