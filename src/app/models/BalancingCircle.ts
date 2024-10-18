import {Member} from "./Member";

export interface BalancingCircle {
  id: number; // ID of the balancing circle
  name: string; // Name of the balancing circle
  members: Member[]; // Array of Member objects
}
