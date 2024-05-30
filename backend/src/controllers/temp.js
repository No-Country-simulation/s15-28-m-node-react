//valida campo obligatorio
const isRequired = (inputValue, field) => {
  return !inputValue ? `El ${f} es requerido.` : null;
};

//valida campo de texto
const isString = (inputValue, field) => {
  return typeof inputValue !== "string" ? `El ${field} no es un texto.` : null;
};

const isNumber = (inputValue, field) => {
  return typeof inputValue !== "number" ? `El ${field} no es un número.` : null;
};

const isDate = (inputValue, field) => {
  return isNaN(Date.parse(inputValue))
    ? `El ${field} no es una fecha válida.`
    : null;
};

//valida campo de texto
const isNotEmpty = (value, campo) => {
  return value.length === 0 ? `El ${campo} no puede estar vacío.` : null;
};

const isValidateAge = (inputValue, field) => {
  const birthDate = new Date(inputValue);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0) if (m === 0) if (today.getDate() < birthDate.getDate()) age--;
  return age >= 19 && age <= 99
    ? null
    : `El ${field} debe ser mayor de 18 y menor de 99.`;
};

//valida requisitos de caracteres
const hasValidateRequirements = (inputValue, field, regexArg) => {
  const error = regexArg
    .map((reg) => {
      return reg.reg.test(inputValue) ? null : `El ${field} ${reg.msn}`;
    })
    .filter((err) => err !== null)[0];
  return error || null;
};

//formato de caracteres para nombre y apellido
const formatValue = (value) => {
  return value
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Validate field

// Validate avatar
const validateAvatar = (inputValue, field) => {
  /*
  Validación de Fotografía:
    Campo no obligatorio. ok
    Formatos permitidos: png, jpg
    Menor o igual a 1Mb. frontend ok
    Nombre del archivo: mínimo 2 caracteres alfanuméricos (puede incluir espacios y símbolos - _ ) y máximo 50. Más la extención (.jpg, .png) las api
  */
  const regexArgImage = [
    {
      reg: /\.(jpg|png)$/,
      msn: "debe ser de formato .jpg o .png.",
    },
  ];
  const errors =
    isRequired(inputValue, field) ||
    isNotEmpty(inputValue, field) ||
    isString(inputValue, field) ||
    hasValidateRequirements(inputValue, field, regexArgImage);
  return errors || inputValue;
};

//Validate field first_name and last_name
const validateField = (inputValue, field) => {
  /*
  valida campo para nombre y apellido:
    Campo obligatorio. ok
    Campo de texto. ok
    Se permite caracteres alfabéticos (se permite ñ, á, é, í, ó, ú, ú, Á, É, Í, Ó, Ú). ok
    Se permiten espacios (No al inicio). ok
    No permite ingresar números y caracteres especiales. ok
      Mínimo de 2 caracteres, máximo 30 caracteres.ok
  */
  inputValue = inputValue.trim();
  const regexArgField = [
    {
      reg: /^[^0-9]+$/,
      msn: "no debe tener caracteres numéricos.",
    },
    {
      reg: /^[a-zA-ZñáéíóúÁÉÍÓÚ\s]+$/,
      msn: "Solo se permiten esto caracteres: ñ, á, é, í, ó, ú, ú, Á, É, Í, Ó, Ú.",
    },
    {
      reg: /^\S+(\s\S+)*$/,
      msn: "no debe tener doble espacio.",
    },
    {
      reg: /^.{2,30}$/,
      msn: "debe tener entre 8 y 30 caracteres.",
    },
  ];
  const errors =
    isRequired(inputValue, field) ||
    isString(inputValue, field) ||
    isNotEmpty(inputValue, field) ||
    hasValidateRequirements(inputValue, field, regexArgField);
  return errors || formatValue(inputValue);
};

// Validate email
const validateEmail = (inputValue, field) => {
  /*
    Validación del Email:
      Campo obligatorio. ok
      Campo de texto. ok
      No se permiten espacios. ok
      Máximo total de caracteres debe ser de 255, mínimo de 6. ok
      Debe tener un @ ok
      Estructura algo@algo.algo que debe cumplir lo siguiente:
        Antes del @ permite: caracteres alfanuméricos y solo los símbolos - _ . + ok
        Antes del @ debe tener un mínimo de 1 y hasta 64 caracteres. ok
        Antes del @ No puede comenzar ni terminar con un . ok
        Antes del @ No puede haber dos . seguidos. ok
        Después del @ permite: caracteres alfabéticos y solo los símbolos . -. ok
        Después del @ debe contener un . ok
        Después del @ la cantidad de caracteres debe estar comprendida entre 4 y 255 caracteres. ok
        Los caracteres después del . posterior al @ debe contener: un mínimo 2 máximo 10 ok
  */
  const regexArgEmail = [
    {
      reg: /^[a-zA-Z0-9-_.]+@[^@]+$/,
      msn: "antes del @ solo se permiten caracteres alfanuméricos y solo los símbolos - _ .",
    },
    {
      reg: /^[a-zA-Z0-9-_.]{1,64}@[^@]+$/,
      msn: "antes del @ debe tener entre 1 y 64 caracteres.",
    },
    {
      reg: /^(?!.*\.{2})[^\s]+$/,
      msn: "no se puede tener varios puntos seguidos.",
    },
    {
      reg: /^[^.].*[^.]@/,
      msn: "antes del @ no puede comenzar ni terminar con un punto.",
    },
    {
      reg: /@.{4,255}$/,
      msn: "después del @ debe tener entre 4 y 255 caracteres.",
    },
    {
      reg: /@[a-zA-Z.-]+$/,
      msn: "Después del @ solo se permiten caracteres alfabéticos y solo los símbolos . -.",
    },
    {
      reg: /@.*\..*$/,
      msn: "Después del @ debe contener un .",
    },
    {
      reg: /@[^.].*[^.]$/,
      msn: "Después del @ no puede comenzar ni terminar con un punto.",
    },
    {
      reg: /\.[a-zA-Z]{2,10}$/,
      msn: "los caracteres después del . posterior al @ deben tener entre 2 y 10 caracteres.",
    },
    {
      reg: /^.{6,255}$/,
      msn: "el email debe tener entre 6 y 255 caracteres.",
    },
    {
      reg: /^[^ ]+[^ ]+\.[^ ]+$/,
      msn: "no se permiten tener espacios.",
    },
    {
      reg: /^[^@]+@[^@]+$/,
      msn: "solo puede haber un @ en el email.",
    },
  ];
  inputValue = inputValue.trim();
  const errors =
    isRequired(inputValue, field) ||
    isString(inputValue, field) ||
    isNotEmpty(inputValue, field) ||
    hasValidateRequirements(inputValue, field, regexArgEmail);
  return errors || inputValue.toLowerCase();
};

// validate password
const validatePassword = (password, field) => {
  /*
  validación de Password:
    Campo obligatorio.
    Campo de texto.
    Mínimo 8 caracteres y máximo 30.
    Se permite caracteres alfanuméricos y caracteres especiales.
    No se permiten espacios.
    Se debe incluir de forma obligatoria:
      un número,
      un símbolo especial,
      un carácter en minúscula,
      un carácter en mayúscula.
  */
  const regexArgPassword = [
    {
      reg: /[A-Z]/,
      msn: " debe tener por lo menos una letra mayúscula.",
    },
    {
      reg: /[a-z]/,
      msn: " debe tener por lo menos una letra minúscula.",
    },
    {
      reg: /\d/,
      msn: " debe tener por lo menos un carácter numérico.",
    },
    {
      reg: /[^a-zA-Z\d]/,
      msn: " debe tener por lo menos un carácter especial.",
    },
    { reg: /\S/, msn: " no debe tener espacios." },
    {
      reg: /^.{8,30}$/,
      msn: " debe tener entre 8 y 30 caracteres.",
    },
  ];
  const errors =
    isRequired(password, field) ||
    isString(password, field) ||
    isNotEmpty(password, field) ||
    hasValidateRequirements(password, field, regexArgPassword);
  return errors || password;
};

// Validate phone
const validatePhone = (inputValue, field) => {
  /*
  Validación de Teléfono:
    Campo no obligatorio. ok
    Campo de texto. ok
    Mínimo 8 caracteres y 16 máximo .
    Se permite caracteres numéricos, espacios y los caracteres especiales + -
    No se permiten caracteres alfabéticos.
  */
  const regexArgPhone = [
    {
      reg: /^.{8,16}$/,
      msn: "debe tener entre 8 y 16 caracteres.",
    },
    {
      reg: /^[0-9 +\-]*$/,
      msn: "solo puede contener caracteres numéricos, espacios y los caracteres especiales + -..",
    },
  ];
  const errors =
    isRequired(inputValue, field) ||
    isNotEmpty(inputValue, field) ||
    isString(inputValue, field) ||
    hasValidateRequirements(inputValue, field, regexArgPhone);
  return errors || inputValue;
};

// Validate birthdate
const validateBirthdate = (inputValue, field) => {
  /*
  Campo obligatorio.
    Tipo Calendario. from ok
    Se debe seleccionar: día, mes, año. frontend ok
    Formato: dd/mm/aaaa ok
    La fecha seleccionada debe ser mayor a 18 años, menor a 99 años.
    Debe ser una fecha válida. ok
  */
  const regexArgDate = [
    {
      reg: /^\d{4}[-\/]\d{2}[-\/]\d{2}( \d{2}:\d{2}:\d{2})?$/,
      msn: "no es una fecha.",
    },
  ];
  const errors =
    isRequired(inputValue, field) ||
    isNotEmpty(inputValue, field) ||
    isDate(inputValue, field) ||
    isValidateAge(inputValue, field) ||
    hasValidateRequirements(inputValue, field, regexArgDate);
  return errors || inputValue;
};

// Validate role
const validateRole = (inputValue, field) => {
  /*
  validación del rol
    Campo obligatorio.ok
    solo numeros.ok
    Lista desplegable. frontend ok
    Opciones: Freelancer / Cliente role id=1/2 ok
  */
  const regexArgRole = [
    {
      reg: /^[0-9]+$/,
      msn: "Debe ser un valor numérico y no puede ser negativo.",
    },
  ];
  const errors =
    isRequired(inputValue, field) ||
    isNumber(inputValue, field) ||
    isNotEmpty(inputValue, field) ||
    hasValidateRequirements(inputValue, field, regexArgRole);
  return errors || inputValue;
};

const body = {
  "avatar": "image.jpg",
  "first_name": "David Hernaddo",
  "last_name": "Caycedio Blum",
  "Email": "david.coach_dev@acoreo.com.ec",
  "Password": "Pass1234#",
  "phone": "+5939123456789",
  "birthdate": "1982/04/14",
  "role": 1
};

const validateCampoBody = (body) => {
  const isValidateBody = {
    avatar: {
      fn: validateAvatar,
    },
    first_name: {
      fn: validateField,
    },
    last_name: {
      fn: validateField,
    },
    Email: {
      fn: validateEmail,
    },
    Password: {
      fn: validatePassword,
    },
    phone: {
      fn: validatePhone,
    },
    birthdate: {
      fn: validateBirthdate,
    },
    role: {
      fn: validateRole,
    },
  };
  let resp = {};
  const bodyKeys = Object.keys(body);

  bodyKeys.forEach((key) => {
    const fnName = isValidateBody[key].fn;
    resp[key] = fnName(body[key], key);
  });

  // Comprueba si todos los valores de resp son iguales a los de body
  const allValuesEqual = bodyKeys.every(key => resp[key] === body[key]);

  if (allValuesEqual) {
    return body;
  } else {
    // Filtra las claves de resp que no son iguales a las de body
    const unequalKeys = bodyKeys.filter(key => resp[key] !== body[key]);

    // Crea un nuevo objeto con solo las claves que no son iguales
    const unequalResp = {};
    unequalKeys.forEach(key => {
      unequalResp[key] = resp[key];
    });

    return unequalResp;
  }
}
console.log(validateCampoBody(body));
