import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ lowercase: true, unique: true })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  permissions: string[];

  @Prop()
  displayName: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
