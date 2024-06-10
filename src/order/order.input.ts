import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field()
  costumer: string;

  @Field()
  lineItems: [string];
}
