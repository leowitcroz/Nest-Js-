import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDTO } from "./create_user.dto";


export class UpdatePatchUserDTO extends PartialType(CreateUserDTO){

    
}