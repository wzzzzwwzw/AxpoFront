import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BalancingService } from '../../services/balancing.service';
import { Forecast } from '../../models/Forecast';
import { BalancingCircle } from '../../models/BalancingCircle';

@Component({
  selector: 'app-drill-down',
  templateUrl: './drill-down.component.html',
  styleUrls: ['./drill-down.component.css']
})
export class DrillDownComponent implements OnInit {
  balancingCircleId!: number;
  memberForecasts: { memberName: string; forecasts: Forecast[] }[] = [];
  imbalances: any[] = []; // Store fetched imbalances

  constructor(private route: ActivatedRoute, private balancingService: BalancingService) {}

  ngOnInit(): void {
    this.balancingCircleId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMemberForecasts();
    this.loadImbalances(); // Call to load imbalances
  }

  loadMemberForecasts(): void {
    this.balancingService.getBalancingCircles().subscribe({
      next: (circles: BalancingCircle[]) => {
        const selectedCircle = circles.find(circle => circle.id === this.balancingCircleId);

        if (selectedCircle) {
          const members = selectedCircle.members || [];

          if (Array.isArray(members)) {
            const memberRequests = members.map(member =>
              this.balancingService.getMemberForecast(member.id).subscribe({
                next: (forecasts: Forecast[]) => {
                  this.memberForecasts.push({
                    memberName: member.name,
                    forecasts
                  });
                },
                error: (error) => {
                  console.error('Error fetching forecasts for member:', member.name, error);
                }
              })
            );
          } else {
            console.error('Members property is not an array:', selectedCircle.members);
          }
        } else {
          console.error('Selected balancing circle not found for ID:', this.balancingCircleId);
        }
      },
      error: (error) => {
        console.error('Error fetching balancing circles:', error);
      },
      complete: () => {
        console.log('Fetching balancing circles completed');
      }
    });
  }

  loadImbalances(): void {
    this.balancingService.getImbalances(this.balancingCircleId).subscribe({
      next: (imbalances) => {
        console.log('Imbalances fetched:', imbalances);
        this.imbalances = imbalances; // Store imbalances
      },
      error: (error) => {
        console.error('Error fetching imbalances:', error);
      }
    });
  }
}
