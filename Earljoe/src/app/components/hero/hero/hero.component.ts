// src/app/components/hero/hero.component.ts
import { Component, ElementRef, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { ThemeService } from '../../../shared/services/theme.service';
import { NavbarComponent } from "../../navbar/navbar/navbar.component";
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import Typed from 'typed.js';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

@Component({
  selector: 'app-hero',
  template: `
    <div class="hero-container">
      <canvas #canvas></canvas>
      <div class="gradient-overlay"></div>
      <div class="hero-content">
        <h1>I am Earljoe Kadima</h1>
        <div class="typed-container">
          <span>I'm a </span>
          <span id="typed-text"></span>
        </div>
        
        <div class="cta-section">
          <button class="resume-btn" (click)="openResumeOverlay()">
            <i class="fas fa-file-alt"></i> View Resume
          </button>
          
          <div class="social-links">
            <a href="https://github.com/Earl006" target="_blank" rel="noopener">
              <i class="fab fa-github"></i>
            </a>
            <a href="https://wa.me/+254112272250" target="_blank" rel="noopener">
              <i class="fab fa-whatsapp"></i>
            </a>
            <a href="https://www.linkedin.com/in/earljoe-kadima" target="_blank" rel="noopener">
              <i class="fab fa-linkedin"></i>
            </a>
            <!-- <a href="sms:+yourphonenumber">
              <i class="fas fa-call"></i>
            </a> -->
          </div>
        </div>
      </div>

      <!-- Resume Overlay -->
      <div class="resume-overlay" [class.active]="showResumeOverlay" (click)="closeResumeOverlay()">
        <div class="overlay-content" (click)="$event.stopPropagation()">
          <button class="close-btn" (click)="closeResumeOverlay()">
            <i class="fas fa-times"></i>
          </button>
          <iframe [src]="resumeUrl" frameborder="0"></iframe>
          <a [href]="resumeUrl" download class="download-btn">
            <i class="fas fa-download"></i> Download Resume
          </a>
        </div>
      </div>
    </div>

    <!-- About Section -->
    <section class="about-section">
  <div class="container">
    <h2 class="section-title">About Me 👨‍💻</h2>

    <div class="about-grid">
      <div class="about-image">
        <img src="./assets/joe.jpeg" alt="Earljoe Kadima" />
      </div>
      <div class="about-content">
        <p class="intro">
          Hi, I'm Earljoe Kadima — a passionate tech enthusiast who thrives on crafting solutions that make an impact. 
        </p>
        <p>
          With a love for both creative problem-solving and technical precision, I wear multiple hats: from building seamless applications as a <span class="highlight">FullStack Developer</span> to ensuring perfection in every line of code as a <span class="highlight">QA Engineer</span>. I also have a strong foundation in <span class="highlight">network engineering</span>, making sure systems run securely and efficiently.
        </p>
        <p>
          What sets me apart is my drive to take on challenges with innovation and precision, breaking down complexities into actionable and elegant solutions. 
        </p>
        <p>
          Whether I'm optimizing networks, architecting applications, or debugging complex systems, I approach every task with the same curiosity and commitment to excellence.
        </p>
      </div>
    </div>

    <div class="tech-stack">
  <h2 class="tech-title">Tech Stack</h2>
  <div class="icon-belt">
    <div class="tech-icon" title="Laravel">
      <img src="assets/icons/laravel.svg" alt="Laravel" />
    </div>
    <div class="tech-icon" title="CodeIgniter">
      <img src="assets/icons/codeigniter.svg" alt="CodeIgniter" />
    </div>
    <div class="tech-icon" title="Cypress">
      <img src="assets/icons/cypress.svg" alt="Cypress" />
    </div>
    <div class="tech-icon" title="Jest">
      <img src="assets/icons/jest.svg" alt="Jest" />
    </div>
    <div class="tech-icon" title=".NET">
      <img src="assets/icons/dotnet.svg" alt=".NET" />
    </div>
    <div class="tech-icon" title="Angular">
      <img src="assets/icons/angular.svg" alt="Angular" />
    </div>
    <div class="tech-icon" title="MSSQL">
      <img src="assets/icons/mssql.svg" alt="MSSQL" />
    </div>
    <div class="tech-icon" title="Prisma ORM">
      <img src="assets/icons/prisma.svg" alt="Prisma ORM" />
    </div>
    <div class="tech-icon" title="Cisco Networks">
      <img src="assets/icons/cisco.svg" alt="Cisco Networks" />
    </div>
  </div>
</div>
  </div>
</section>


    <!-- Services Section -->
    <section class="services-section section">
      <div class="container">
        <h2>Services</h2>
        <div class="services-grid">
          <div class="service-card">
            <div class="icon">🌐</div>
            <h3>Web Development</h3>
            <p>Full-stack web applications with modern frameworks and responsive design.</p>
          </div>
          <div class="service-card">
            <div class="icon">📱</div>
            <h3>Mobile Development</h3>
            <p>Cross-platform mobile applications using cutting-edge technologies.</p>
          </div>
          <div class="service-card">
            <div class="icon">💻</div>
            <h3>Desktop Applications</h3>
            <p>Efficient and scalable desktop solutions for various platforms.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section class="projects-section section">
      <div class="container">
        <h2>Projects</h2>
        <div class="project-categories">
          <h3>Current Projects</h3>
          <div class="projects-grid">
            <div class="project-card">
              <img src="/api/placeholder/300/200" alt="Project 1" />
              <h4>DSIMI HR System</h4>
              <p>Human Resource Management System built with Laravel</p>
              <div class="tech-stack">
                <span>Laravel</span>
                <span>MySQL</span>
                <span>Bootstrap</span>
              </div>
              <a routerLink="/projects/dsimi" class="read-more">Read More →</a>
            </div>
            <!-- Add more project cards as needed -->
          </div>

          <h3>Completed Projects</h3>
          <div class="projects-grid">
            <div class="project-card">
              <img src="/api/placeholder/300/200" alt="Project 2" />
              <h4>Event Management System</h4>
              <p>Scalable event management platform with payment integration</p>
              <div class="tech-stack">
                <span>Angular</span>
                <span>Node.js</span>
                <span>TypeScript</span>
              </div>
              <a routerLink="/projects/event-system" class="read-more">Read More →</a>
            </div>
            <!-- Add more project cards as needed -->
          </div>
        </div>
        <div class="view-all">
          <a routerLink="/projects" class="btn">View All Projects</a>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section section">
      <div class="container">
        <h2>Testimonials</h2>
        <div class="testimonials-slider">
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p>"Earljoe delivered exceptional results. His technical expertise and 
                  attention to detail made our project a success."</p>
            </div>
            <div class="testimonial-author">
              <img src="/api/placeholder/50/50" alt="Client" />
              <div>
                <h4>John Doe</h4>
                <p>Tech Lead, Company XYZ</p>
              </div>
            </div>
          </div>
          <!-- Add more testimonial cards as needed -->
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section section">
      <div class="container">
        <h2>Let's Chat</h2>
        <div class="contact-content">
          <form class="contact-form">
            <div class="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div class="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div class="form-group">
              <input type="text" placeholder="Subject" required />
            </div>
            <div class="form-group">
              <textarea placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-container {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: var(--background-color);
    }

    .gradient-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 200px;
      background: linear-gradient(to bottom, transparent, var(--background-color));
      z-index: 2;
    }

    canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .hero-content {
      position: relative;
      z-index: 3;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: var(--text-color);
      text-align: center;
    }

    h1 {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .typed-container {
      font-size: 1.8rem;
      min-height: 80px;
    }

    .typed-cursor {
      font-size: 1.8rem;
      color: var(--primary-color);
    }

    .cta-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    .resume-btn {
      padding: 1rem 2rem;
      font-size: 1.1rem;
      background: #000;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    .resume-btn:hover {
      transform: translateY(-2px);
    }

    .social-links {
      display: flex;
      gap: 1.5rem;
    }

    .social-links a {
      color: var(--text-color);
      font-size: 1.5rem;
      transition: all 0.3s ease;
    }

    .social-links a:hover {
      color: var(--primary-color);
      transform: translateY(-2px);
    }

    .resume-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      z-index: 1000;
      display: none;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .resume-overlay.active {
      display: flex;
    }

    .overlay-content {
      position: relative;
      width: 80%;
      height: 80%;
      background: white;
      border-radius: 10px;
      padding: 2rem;
      cursor: default;
    }

    .close-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--text-color);
    }

    iframe {
      width: 100%;
      height: calc(100% - 60px);
    }

    .download-btn {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      padding: 0.75rem 1.5rem;
      background: var(--primary-color);
      color: white;
      text-decoration: none;
      border-radius: 5px;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2.5rem;
      }

      .typed-text {
        font-size: 1.2rem;
      }
    }

    /* Common section styles */
    .section {
      padding: 5rem 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    h2 {
      font-size: 2.5rem;
      margin-bottom: 3rem;
      text-align: center;
    }

    /* About section */

    .about-section {
  padding: 5rem 0;
  background: var(--background-color, #f9f9f9);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--primary-color, #333);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  align-items: center;
}

.about-image img {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.about-content {
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-color);
}

.about-content .highlight {
  color: var(--primary-color, #007BFF);
  font-weight: bold;
}

.tech-stack {
  margin-top: 3rem;
  text-align: center;
  border-top: 2px solid var(--border-color);
  padding-top: 2rem;
}

.tech-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--primary-color);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.icon-belt {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
}

.tech-icon {
  position: relative;
  cursor: pointer;
}

.tech-icon img {
  width: 50px;
  height: 50px;
  transition: transform 0.3s ease;
  filter: grayscale(100%);
}

.tech-icon:hover img {
  transform: translateY(-5px);
  filter: grayscale(0%);
}

.tech-icon::after {
  content: attr(title);
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  white-space: nowrap;
  color: var(--text-color);
}

.tech-icon:hover::after {
  opacity: 1;
}

@media (max-width: 768px) {
  .tech-title {
    font-size: 2rem;
  }
  
  .icon-belt {
    gap: 1.5rem;
  }
  
  .tech-icon img {
    width: 40px;
    height: 40px;
  }
}


    /* Services section */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .service-card {
      padding: 2rem;
      border-radius: 10px;
      background: var(--background-color);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .service-card:hover {
      transform: translateY(-5px);
    }

    .icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    /* Projects section */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .project-card {
      border-radius: 10px;
      overflow: hidden;
      background: var(--background-color);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .project-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .project-card h4 {
      padding: 1rem;
      margin: 0;
    }

    .project-card p {
      padding: 0 1rem;
      margin-bottom: 1rem;
    }

    .tech-stack {
      padding: 0 1rem 1rem;
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .tech-stack span {
      padding: 0.25rem 0.75rem;
      background: var(--secondary-color);
      border-radius: 15px;
      font-size: 0.875rem;
    }

    /* Testimonials section */
    .testimonial-card {
      padding: 2rem;
      border-radius: 10px;
      background: var(--background-color);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      margin: 1rem;
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 1rem;
    }

    .testimonial-author img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    /* Contact section */
    .contact-form {
      max-width: 600px;
      margin: 0 auto;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    input, textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--secondary-color);
      border-radius: 5px;
      background: var(--background-color);
      color: var(--text-color);
    }

    .btn {
      display: inline-block;
      padding: 0.75rem 2rem;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      text-decoration: none;
      transition: background-color 0.3s ease;
    }

    .btn:hover {
      background: var(--accent-color);
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .about-content {
        grid-template-columns: 1fr;
      }

      .hero-content h1 {
        font-size: 2.5rem;
      }

      .hero-content p {
        font-size: 1.25rem;
      }

      .section {
        padding: 3rem 0;
      }

      h2 {
        font-size: 2rem;
      }
    }
  `],
  standalone: true,
  imports: [RouterLink]
})
export class HeroComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private nodes: Node[] = [];
  private mouseX: number = 0;
  private mouseY: number = 0;
  private animationFrame: number = 0;
  private isDark: boolean = false;
  showResumeOverlay = false;
  resumeUrl: SafeResourceUrl;
  private typed: Typed | null = null;

  constructor(
    private themeService: ThemeService,
    private sanitizer: DomSanitizer
  ) {
    this.resumeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('./assets/resume.pdf');
  }

  ngOnInit(): void {
    this.initializeCanvas();
    this.createNodes();
    this.animate();

    this.themeService.theme$.subscribe(theme => {
      this.isDark = theme === 'dark';
      this.updateColors();
    });

    this.initTypeAnimation();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrame);
    if (this.typed) {
      this.typed.destroy();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.initializeCanvas();
    this.createNodes();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
  }

  private initializeCanvas(): void {
    const canvas = this.canvas.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.ctx = canvas.getContext('2d')!;
  }

  private createNodes(): void {
    const numberOfNodes = Math.floor((window.innerWidth * window.innerHeight) / 15000);
    this.nodes = Array.from({ length: numberOfNodes }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 2 + 1
    }));
  }

  private updateColors(): void {
    if (!this.ctx) return;
    this.ctx.strokeStyle = this.isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';
    this.ctx.fillStyle = this.isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)';
  }

  private animate(): void {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Update and draw nodes
    for (const node of this.nodes) {
      // Update position
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off walls
      if (node.x < 0 || node.x > window.innerWidth) node.vx *= -1;
      if (node.y < 0 || node.y > window.innerHeight) node.vy *= -1;

      // Draw node
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      this.ctx.fill();

      // Draw connections to mouse if within range
      const dx = this.mouseX - node.x;
      const dy = this.mouseY - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        this.ctx.beginPath();
        this.ctx.moveTo(node.x, node.y);
        this.ctx.lineTo(this.mouseX, this.mouseY);
        this.ctx.stroke();
      }

      // Draw connections between nearby nodes
      for (const otherNode of this.nodes) {
        if (node === otherNode) continue;
        const dx = otherNode.x - node.x;
        const dy = otherNode.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(node.x, node.y);
          this.ctx.lineTo(otherNode.x, otherNode.y);
          this.ctx.stroke();
        }
      }
    }

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  openResumeOverlay() {
    this.showResumeOverlay = true;
  }

  closeResumeOverlay() {
    this.showResumeOverlay = false;
  }

  private initTypeAnimation(): void {
    this.typed = new Typed('#typed-text', {
      strings: [
        'Full Stack Developer',
        'QA/QE Engineer',
        'Network Engineer',
        'Problem Solver'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      smartBackspace: true,
      cursorChar: '|'
    });
  }
}