// src/app/components/navbar/navbar.component.ts
import { Component, HostListener } from '@angular/core';
import { ThemeService } from '../../../shared/services/theme.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  template: `
    <nav [class.scrolled]="isScrolled" [class.mobile-open]="isMobileMenuOpen">
      <div class="nav-content">
        <a routerLink="/" class="logo">Earljoe Kadima</a>
        
        <!-- Mobile menu button -->
        <button class="mobile-menu-btn" (click)="toggleMobileMenu()">
          <span [class.open]="isMobileMenuOpen"></span>
        </button>

        <!-- Nav links -->
        <div class="nav-links" [class.show]="isMobileMenuOpen">
          <a routerLink="/about" routerLinkActive="active">About</a>
          <a routerLink="/projects" routerLinkActive="active">Projects</a>
          <a routerLink="/services" routerLinkActive="active">Services</a>
          <a routerLink="/contact" routerLinkActive="active">Contact</a>
          
          <!-- Theme toggle button -->
          <button class="theme-toggle" (click)="toggleTheme()" aria-label="Toggle theme">
            <svg *ngIf="(themeService.theme$ | async) === 'light'" class="theme-icon" viewBox="0 0 24 24">
              <path d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"/>
            </svg>
            <svg *ngIf="(themeService.theme$ | async) === 'dark'" class="theme-icon" viewBox="0 0 24 24">
              <path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13h2c0.55,0,1-0.45,1-1s-0.45-1-1-1H2 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13h2c0.55,0,1-0.45,1-1s-0.45-1-1-1h-2c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 S11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0 s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background-color: var(--background-color);
      padding: 1rem 2rem;
      transition: all 0.3s ease;
    }

    .nav-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .scrolled {
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      background-color: var(--background-color);
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--text-color);
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .nav-links a {
      color: var(--text-color);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
      position: relative;
    }

    .nav-links a:after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--primary-color);
      transition: width 0.3s ease;
    }

    .nav-links a:hover:after,
    .nav-links a.active:after {
      width: 100%;
    }

    .theme-toggle {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-color);
      transition: transform 0.3s ease;
    }

    .theme-toggle:hover {
      transform: rotate(15deg);
    }

    .theme-icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }

    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
    }

    /* Mobile styles */
    @media (max-width: 768px) {
      .mobile-menu-btn {
        display: block;
        position: relative;
        width: 30px;
        height: 20px;
      }

      .mobile-menu-btn span {
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: var(--text-color);
        transition: all 0.3s ease;
      }

      .mobile-menu-btn span::before,
      .mobile-menu-btn span::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: var(--text-color);
        transition: all 0.3s ease;
      }

      .mobile-menu-btn span::before {
        transform: translateY(-8px);
      }

      .mobile-menu-btn span::after {
        transform: translateY(8px);
      }

      .mobile-menu-btn span.open {
        background-color: transparent;
      }

      .mobile-menu-btn span.open::before {
        transform: rotate(45deg);
      }

      .mobile-menu-btn span.open::after {
        transform: rotate(-45deg);
      }

      .nav-links {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background-color: var(--background-color);
        padding: 1rem;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }

      .nav-links.show {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }
    }
  `],
  standalone: true
})
export class NavbarComponent {
  isScrolled = false;
  isMobileMenuOpen = false;

  constructor(
    public themeService: ThemeService,
    private router: Router
  ) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Close mobile menu when route changes
  ngOnInit() {
    this.router.events.subscribe(() => {
      this.isMobileMenuOpen = false;
    });
  }
}