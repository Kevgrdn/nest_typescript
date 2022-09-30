import {IsNotEmpty, IsString, Length, MinLength, MaxLength } from 'class-validator'

export class CreateTodoListDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(1,{
        message: "Nom trop petit"
    })
    @MaxLength(100,{
        message: "Trop de caractères !"
    })
    name : string
}
