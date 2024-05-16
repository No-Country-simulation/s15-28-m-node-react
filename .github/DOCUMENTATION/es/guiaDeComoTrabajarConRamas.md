# 📖La guía resumida de como trabajamos con branches

En Git, las nomenclaturas de las ramas pueden variar según la cosa que se esté haciendo.

Para saber como nombrar la rama, hay algunas convenciones comunes que se utilizan para
nombrar ramas según su funcionalidad.

## Main

La rama principal del proyecto que refleja la versión en producción.

Ejemplo: main

## Development

Rama de desarrollo principal donde se trabajan las funcionales hasta tener
versiones estables para enviar a main o producción.

Ejemplo: dev

## Feature branches (ramas de funcionalidades)

Tiene un nombre descriptivo que indica la funcionalidad que están implementando.

Por ejemplo:

- feat/userContext
- feat/userCard
- feat/orderPage
- feat/middlewarePayment
- feat/userAuth

## Release branches (ramas de release)

Se usan para preparar y probar versiones antes de enviar a prod.

Por ejemplo:

- release/v1.0.0
- release/v1.2.0

## Hotfix branches (ramas de corrección rápida)

Para corregir problemas importantes que surjan y se encuentren una ya fue enviado el proyecto
a producción.

Por ejemplo:

- hotfix/bugUserPage
- hotfix/missingNavBarIssue

## Bug branches (ramas de corrección de bugs)

Pueden utilizarse para solucionar problemas no críticos que se descubren una vez el proyecto
se envió a development

Por ejemplo:

- bugfix/missingUserTimeStamp
- bugfix/userCardStylingIssue

Es mucho más amplio, pero podemos reducirnos a esas 4 últimas cosas para desarrollo y hacer que
todo sea más coherente y higiénico entre cada cosa, obviamente en inglés como estandarizamos
es decir evitar un feat/cartaDeUsuario o un hotfix/errorEnNavBar.