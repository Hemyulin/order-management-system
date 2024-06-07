import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  customer: string;

  @Prop({ required: true, enum: ['OPEN', 'IN_PROGRESS', 'COMPLETED'] })
  state: string;

  @Prop()
  assignedEmployee: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: [{ product: String, quantity: Number, price: Number }] })
  lineItems: { product: string; quantity: number; price: number }[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
