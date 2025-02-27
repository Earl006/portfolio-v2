import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
  <footer>
      <div class="container">
        <div class="footer-grid">
          <!-- Contact Info -->
          <div class="footer-section">
            <h3>Contact</h3>
            <p>Email: contact&#64;earljoe.dev</p>
            <p>Location: Nairobi, Kenya</p>
          </div>

          <!-- Quick Links -->
          <div class="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a routerLink="/about">About</a></li>
              <li><a routerLink="/projects">Projects</a></li>
              <li><a routerLink="/services">Services</a></li>
              <li><a routerLink="/contact">Contact</a></li>
            </ul>
          </div>

          <!-- Social Links -->
          <div class="footer-section">
            <h3>Connect</h3>
            <div class="social-links">
              <a href="https://github.com/earljoe" target="_blank" rel="noopener">
                <i class="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com/in/earljoe" target="_blank" rel="noopener">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="https://twitter.com/earljoe" target="_blank" rel="noopener">
                <i class="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} Earljoe Kadima. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,

    styles: [`
    footer {
      background-color: var(--background-color);
      color: var(--text-color);
      padding: 3rem 0 1.5rem;
      margin-top: 4rem;
      border-top: 1px solid var(--secondary-color);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-section h3 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
      color: var(--primary-color);
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
    }

    .footer-section ul li {
      margin-bottom: 0.5rem;
    }

    .footer-section a {
      color: var(--text-color);
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-section a:hover {
      color: var(--primary-color);
    }

    .social-links {
      display: flex;
      gap: 1rem;
    }

    .social-links a {
      font-size: 1.5rem;
      color: var(--text-color);
      transition: color 0.3s ease;
    }

    .social-links a:hover {
      color: var(--primary-color);
    }

    .footer-bottom {
      text-align: center;
      padding-top: 2rem;
      border-top: 1px solid var(--secondary-color);
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      .footer-grid {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .social-links {
        justify-content: center;
      }
    }
  `]
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}