import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class UserEntity {
    @Prop()
    name: string

    @Prop()
    email: string

    @Prop()
    password: string
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity)