import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CoreService } from '../../services/core.service';

@Component({
    selector: 'app-client-layout',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    template: `
        <app-header></app-header>
        <router-outlet></router-outlet>
        <app-footer></app-footer>
    `,
})
export class ClientLayoutComponent {
    constructor(
    private coreService: CoreService,
    private router: Router,
    private cdr: ChangeDetectorRef
) {

    this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
            this.coreService.cleanup(); 
            this.coreService.initAllEffects(); 
            this.cdr.detectChanges();
        }
    });
}
    ngOnInit() {
        this.coreService.initAllEffects();
    }
    
    openModal() {
        this.coreService.openCancelModal();
    }
}