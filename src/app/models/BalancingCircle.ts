import {Member} from "./Member";
export interface RawMemberResponse {
  $id: string;
  $values: Member[];
}
export interface BalancingCircle {
  id: number;
  name: string;
  members: RawMemberResponse;
}
