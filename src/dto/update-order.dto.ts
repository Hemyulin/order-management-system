import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateOrderDto {
  @Field()
  id: string;

  @Field({ nullable: true })
  state?: string;

  @Field(() => [LineItemDto], { nullable: true })
  lineItems?: LineItemDto[];
}
