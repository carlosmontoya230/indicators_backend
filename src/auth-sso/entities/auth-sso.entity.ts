import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ItemsDocument = AuthSso & Document;

@Schema()
export class AuthSso {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const AuthSsoSchema = SchemaFactory.createForClass(AuthSso);
