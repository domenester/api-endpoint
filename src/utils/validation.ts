import * as joi from "joi";

export const validationErrorFunction: joi.ValidationErrorFunction = (errors) => {
  // tslint:disable-next-line:max-line-length
  return `${errors.map((err) => `Valor "${err.context.value}" inválido para campo ${err.context.key}`).join(" | ")}`;
};
