import { type ModelStatic, type Model } from 'sequelize'
import { ZodError } from 'zod'

interface Props {
  body: any
  model: ModelStatic<Model>
  excludedFields?: string[]
}

export function requeriedFieldsBody({ body, model, excludedFields }: Props) {
  const attributes = Object.keys(model.getAttributes())
  const requiredFields = attributes.filter(
    (attribute) => !excludedFields?.includes(attribute)
  )
  for (const field of requiredFields) {
    if (!body[field]) {
      return [400, { message: `Falto el campo ${field}` }]
    }
  }

  const invalidFields = Object.keys(body).filter(
    (field) => !requiredFields.includes(field)
  )
  if (invalidFields.length > 0) {
    return [
      422,
      {
        message: `Los siguientes campos no son validos: \
        ${invalidFields.join(', ')}`,
      },
    ]
  }

  return [200, { message: 'Todos los campos son validos' }]
}

export function optionalFieldBody({ body, model }: Props) {
  const attributes = Object.keys(model.getAttributes())

  const invalidFields = Object.keys(body).filter(
    (field) => !attributes.includes(field)
  )
  if (invalidFields.length > 0) {
    return [
      422,
      {
        message: `Los siguientes campos no son validos: 
        ${invalidFields.join(', ')}`,
      },
    ]
  }

  return [200, { message: 'Todos los campos son validos' }]
}

type ErrorType = ZodError | Error | unknown
export function messageError(error: ErrorType) {
  if (error instanceof ZodError) {
    return [
      500,
      {
        message: 'Error creating the team',
        error: error.issues.map(({ message, path }) => {
          return `${message} en el campo ${path.join('.')}`
        }),
      },
    ]
  }

  if (error instanceof Error) {
    return [
      500,
      {
        message: 'Error creating the team',
        error: error.message,
      },
    ]
  }

  return [
    500,
    {
      message: 'Error creating the team',
      error: 'Unknown error',
    },
  ]
}
