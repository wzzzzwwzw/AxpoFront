import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BalancingService} from '../../services/balancing.service';
import {Forecast} from '../../models/Forecast';
import {BalancingCircle} from '../../models/BalancingCircle';

@Component({
  selector: 'app-drill-down',
  templateUrl: './drill-down.component.html',
  styleUrls: ['./drill-down.component.css']
})
export class DrillDownComponent implements OnInit {
  balancingCircleId!: number;
  memberForecasts: { memberName: string; forecasts: Forecast[] }[] = [];
  imbalances: any[] = [];

  constructor(private route: ActivatedRoute, private balancingService: BalancingService, private router: Router) {
  }

  ngOnInit(): void {
    this.balancingCircleId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMemberForecasts();
    this.loadImbalances();
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
        if (imbalances && typeof imbalances === 'object') {
          this.imbalances = Object.entries(imbalances).map(([key, value]) => ({
            date: key,
            amount: value
          }));
        } else {
          this.imbalances = [];
        }
      },
      error: (error) => {
        console.error('Error fetching imbalances:', error);
      }
    });
  }

  navigateToOverview(): void {
    this.router.navigate(['/overview'])
      .then(success => {
        if (success) {
          console.log('Navigation successful!');
        } else {
          console.log('Navigation failed!');
        }
      })
      .catch(error => {
        console.error('Navigation error:', error);
      });
  }


}
