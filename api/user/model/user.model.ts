import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose'
import { Document } from "mongoose";

@Schema()
export class User {
    @Prop()
    _id: mongoose.Schema.Types.ObjectId
    @Prop()
    name: string;

    @Prop({ lowercase:true, unique: true })
    email: string

    @Prop()
    password: string
}

export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)