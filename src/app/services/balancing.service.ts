import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BalancingCircle } from '../models/BalancingCircle';
import { Forecast } from '../models/Forecast';
import { map } from 'rxjs/operators'; // <-- Add this line


interface ApiResponse {
  $id: string;
  $values: BalancingCircle[]; // Define the structure of the API response
}

@Injectable({
  providedIn: 'root'
})
export class BalancingService {
  private apiUrl = 'http://localhost:5295/api/v1/balancing'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Fetch all balancing circles
  getBalancingCircles(): Observable<BalancingCircle[]> {
    return this.http.get<ApiResponse>(`${this.apiUrl}`).pipe(
      map(response => response.$values) // Map the response to extract $values
    );
  }

  // Fetch forecast for specific member
  getMemberForecast(memberId: number): Observable<Forecast[]> {
    return this.http.get<Forecast[]>(`${this.apiUrl}/member/${memberId}/forecast`);
  }

  // Get imbalances for a specific balancing circle
  getImbalances(balancingCircleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${balancingCircleId}/imbalances`);
  }
}
