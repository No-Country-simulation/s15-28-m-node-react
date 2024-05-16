# 📖The summary guide on how we work with branches

In Git, branch nomenclatures can vary depending on what you are doing.

To know how to name the branch, there are some common conventions used to
name branches according to their functionality.

## Main

The main branch of the project that reflects the version in production.

Example: main

## Development

Main development branch where the functional ones are worked on until having
stable versions to send to main or production.

Example: dev

## Feature branches

It has a descriptive name that indicates the functionality they are implementing.

For example:

- feat/userContext
- feat/userCard
- feat/orderPage
- feat/middlewarePayment
- feat/userAuth

## Release branches

They are used to prepare and test releases before shipping to prod.

For example:

- release/v1.0.0
- release/v1.2.0

## Hotfix branches

To correct important problems that arise and are found, the project has already been submitted
to production.

For example:

- hotfix/bugUserPage
- hotfix/missingNavBarIssue

## Bug branches

They can be used to solve non-critical problems that are discovered once the project is completed.
was sent to development

For example:

- bugfix/missingUserTimeStamp
- bugfix/userCardStylingIssue

It's much broader, but we can narrow it down to those last 4 things for development and make it
everything is more coherent and hygienic between each thing, obviously in English as we standardize
that is, avoid a feat/UserLetter or a hotfix/errorInNavBar.
