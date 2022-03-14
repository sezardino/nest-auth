import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Roles } from 'src/common';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop({ unique: true, default: Roles.USER })
  value: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
