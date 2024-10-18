import { Component, OnInit } from '@angular/core';
import { BalancingService } from '../../services/balancing.service';
import { BalancingCircle } from '../../models/BalancingCircle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  balancingCircles: BalancingCircle[] = [];

  constructor(private balancingService: BalancingService, private router: Router) {}

  ngOnInit(): void {
    this.loadBalancingCircles();
  }

  loadBalancingCircles(): void {
    this.balancingService.getBalancingCircles().subscribe({
      next: (data) => {
        console.log('Data received from API:', data);  // Log the data
        this.balancingCircles = Array.isArray(data) ? data : []; // Ensure it’s an array
      },
      error: (error) => {
        console.error('Error fetching balancing circles', error);
      },
      complete: () => {
        console.log('Fetching balancing circles completed');
      },
    });
  }


  navigateToDrillDown(circleId: number): void {
    this.router.navigate(['/drill-down', circleId]).then(
      () => console.log('Navigation successful'),
      (error) => console.error('Navigation error', error)
    );  }
}
