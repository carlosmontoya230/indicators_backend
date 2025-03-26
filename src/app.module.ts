import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthSsoModule } from "./auth-sso/auth-sso.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mssql",
      host: "(localdb)\\MSSQLLocalDB",
      port: 1433,
      database: "IndicatorsDB",
      options: {
        encrypt: false,
        trustServerCertificate: true
      },
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true
    }),
    AuthSsoModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
