import { InputType, Field } from '@nestjs/graphql';
import { LineItemDto } from './create-order.dto';

@InputType()
export class UpdateOrderDto {
  @Field()
  id: string;

  @Field({ nullable: true })
  state?: string;

  @Field(() => [LineItemDto], { nullable: true })
  lineItems?: LineItemDto[];
}
