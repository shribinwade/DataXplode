import { Component } from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrl: './pagenotfound.component.scss'
})
export class PagenotfoundComponent {

  ngAfterViewInit() {
    this.initializeSpinner();
    this.initializeStickyNavbar();
    this.initializeDropdownHover();
    this.initializeBackToTopButton();
    this.initializeTestimonialsCarousel();
    this.initializePortfolioFilter();
  }

  private initializeSpinner(): void {
    setTimeout(() => {
      const spinnerElement = document.getElementById('spinner');
      if (spinnerElement) {
        spinnerElement.classList.remove('show');
      }
    }, 1);
  }

  private initializeStickyNavbar(): void {
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 45) {
        navbar?.classList.add('sticky-top', 'shadow-sm');
      } else {
        navbar?.classList.remove('sticky-top', 'shadow-sm');
      }
    });
  }

  private initializeDropdownHover(): void {
    const dropdowns = document.querySelectorAll('.dropdown');
    const mediaQuery = window.matchMedia("(min-width: 992px)");

    const handleDropdownHover = (dropdown: Element, add: boolean) => {
      const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
      const dropdownMenu = dropdown.querySelector('.dropdown-menu');
      if (add) {
        dropdown.classList.add('show');
        dropdownToggle?.setAttribute('aria-expanded', 'true');
        dropdownMenu?.classList.add('show');
      } else {
        dropdown.classList.remove('show');
        dropdownToggle?.setAttribute('aria-expanded', 'false');
        dropdownMenu?.classList.remove('show');
      }
    };

    const handleHoverEvents = () => {
      dropdowns.forEach(dropdown => {
        if (mediaQuery.matches) {
          dropdown.addEventListener('mouseenter', () => handleDropdownHover(dropdown, true));
          dropdown.addEventListener('mouseleave', () => handleDropdownHover(dropdown, false));
        } else {
          dropdown.removeEventListener('mouseenter', () => handleDropdownHover(dropdown, true));
          dropdown.removeEventListener('mouseleave', () => handleDropdownHover(dropdown, false));
        }
      });
    };

    mediaQuery.addEventListener('change', handleHoverEvents);
    handleHoverEvents();
  }

  private initializeBackToTopButton(): void {
    const backToTopButton = document.querySelector('.back-to-top') as HTMLElement;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        backToTopButton.style.display = 'block';
      } else {
        backToTopButton.style.display = 'none';
      }
    });

    backToTopButton.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  private initializeTestimonialsCarousel(): void {
    // Simple carousel implementation using native JavaScript
    const testimonialCarousel = document.querySelector('.testimonial-carousel') as HTMLElement;
    let currentIndex = 0;
    const carouselItems = testimonialCarousel?.children;

    const showCarouselItem = (index: number) => {
      Array.from(carouselItems).forEach((item, idx) => {
        if (idx === index) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    };

    const nextCarouselItem = () => {
      currentIndex = (currentIndex + 1) % (carouselItems?.length || 1);
      showCarouselItem(currentIndex);
    };

    if (testimonialCarousel) {
      setInterval(nextCarouselItem, 3000); // Change item every 3 seconds
    }
  }

  private initializePortfolioFilter(): void {
    const portfolioContainer = document.querySelector('.portfolio-container');
    const portfolioItems = portfolioContainer?.children;
    const portfolioFilters = document.querySelectorAll('#portfolio-flters li');
  
    // Ensure portfolioItems is defined and an instance of HTMLCollection
    if (portfolioItems instanceof HTMLCollection) {
      portfolioFilters.forEach(filter => {
        filter.addEventListener('click', () => {
          portfolioFilters.forEach(el => el.classList.remove('active'));
          filter.classList.add('active');
          const filterValue = filter.getAttribute('data-filter') || '';
  
          Array.from(portfolioItems).forEach(item => {
            if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
              item.classList.remove('d-none');
            } else {
              item.classList.add('d-none');
            }
          });
        });
      });
    }
  }

}
