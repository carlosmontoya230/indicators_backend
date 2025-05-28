import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth
} from "@nestjs/swagger";

import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { RolesGuard } from "src/common/guards/rolesguard.service";
import { Roles } from "src/common/decorators/rolesdecorators.service";
import { CreateRolDto } from "./dto/rol.dto";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Crear usuario" })
  @ApiResponse({ status: 201, description: "Usuario creado correctamente." })
  @Post("/createUser/")
  create(@Body() body: CreateUserDto) {
    return this.usersService.createUser(
      body.email,
      body.contrasena,
      body.roles
    );
  }

  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Solo admins pueden ver esto" })
  @ApiResponse({ status: 200, description: "Solo admins pueden ver esto." })
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("admin")
  @Get("only-admins")
  findAdmins() {
    return "Solo admins pueden ver esto";
  }

  @ApiOperation({ summary: "Obtener todos los usuarios" })
  @ApiResponse({ status: 200, description: "Lista de usuarios." })
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("admin")
  @Get("/all/Users/")
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Buscar usuario por email" })
  @ApiResponse({ status: 200, description: "Usuario encontrado." })
  @Get("/user/:email")
  findOne(@Param("email") email: string) {
    return this.usersService.findOne(email);
  }

  @ApiOperation({ summary: "Actualizar usuario por email" })
  @ApiResponse({
    status: 200,
    description: "Usuario actualizado correctamente."
  })
  @Put(":email")
  update(@Param("email") email: string, @Body() body: { contrasena?: string }) {
    return this.usersService.updateUser(email, body);
  }

  @ApiOperation({ summary: "Eliminar usuario por email" })
  @ApiResponse({ status: 200, description: "Usuario eliminado correctamente." })
  @Delete(":email")
  remove(@Param("email") email: string) {
    return this.usersService.removeUser(email);
  }

  //* Roles Management
  @ApiOperation({ summary: "Crear un nuevo rol" })
  @ApiResponse({ status: 201, description: "Rol creado correctamente." })
  // @UseGuards(AuthGuard("jwt"), RolesGuard)
  // @Roles("admin")
  @ApiBody({ type: CreateRolDto })
  @Post("/createRol")
  createRol(@Body() body: CreateRolDto) {
    return this.usersService.createRol(body.nombre);
  }

  @ApiOperation({ summary: "Obtener todos los roles" })
  @ApiResponse({ status: 200, description: "Lista de roles." })
  @Get("/all/roles")
  findAllRoles() {
    return this.usersService.findAllRoles();
  }
}
