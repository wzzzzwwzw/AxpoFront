import {Member} from "./Member";
export interface RawMemberResponse {
  $id: string;
  $values: Member[]; // Assume $values contains the actual members array
}
export interface BalancingCircle {
  id: number; // ID of the balancing circle
  name: string; // Name of the balancing circle
  members: RawMemberResponse; // Array of Member objects
}
