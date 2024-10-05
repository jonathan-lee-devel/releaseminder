import {toNumber} from '@app/util/util';
import {Configuration, Value} from '@itgorillaz/configify/dist';
import {IsNotEmpty} from 'class-validator';

import {NodeEnvironment} from './environment';

@Configuration()
export class MainConfig {
  @IsNotEmpty()
  @Value('NODE_ENV')
  nodeEnv: NodeEnvironment;

  @IsNotEmpty()
  @Value('FRONT_END_URL')
  frontEndUrl: string;

  @IsNotEmpty()
  @Value('PORT', {parse: toNumber})
  port: number;
}
