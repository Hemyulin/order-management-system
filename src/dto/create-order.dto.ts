import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LineItemDto {
  @Field()
  product: string;

  @Field()
  quantity: number;

  @Field()
  price: number;
}

@InputType()
export class CreateOrderDto {
  @Field(() => [LineItemDto])
  lineItems: LineItemDto[];
}
