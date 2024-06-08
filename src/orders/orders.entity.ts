import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Order {
  @Field((type) => Int)
  id: number;

  @Field()
  currentState: String; // TODO: ENUM?!

  @Field((type) => Int)
  customer: number;

  @Field()
  lineItems: String; // TODO: LIST?!

  dateCreated: Date;

  lastUpdated: Date;
}
