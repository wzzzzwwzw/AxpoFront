import {Forecast} from "./Forecast";

export interface Member {
  id: number;
  name: string;
  type: string;
  category: string;
  forecasts: Forecast[];
  isProducer: boolean;
}
