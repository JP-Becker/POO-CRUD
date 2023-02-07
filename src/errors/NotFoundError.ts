import { BaseError } from "./BaseError";

export abstract class NotFoundError extends BaseError {
    constructor (
        message: string = "Requisição não encontrada" // mensagem de erro padrão caso não seja enviado um argumento
    ) {
        super(404, message)
    }
}