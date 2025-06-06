

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


 const slides = [
      {
        image: 'Office_Photo.jpg',
        title: 'We are a leading IT solutions provider specializing in Software Development, Mobile App Development, and Digital Marketing. Our mission is to empower businesses with scalable and innovative technology solutions. A subsidiary of GB Tech Solutions Pvt. Ltd.',
        // subtitle: 'Tempora quos est ut quia adipisci ut voluptas. Deleniti laborum soluta nihil est. Eum similique neque autem ut.',
        // text: 'Ut rerum et autem vel. Et rerum molestiae aut sit vel incidunt sit at voluptatem. Saepe dolorem et sed voluptate impedit. Ad et qui sint at qui animi animi rerum.'
      },
      {
        image: 'Office_Photo_2.jpg',
        title: 'We have successfully delivered 100+ projects across industries, helping businessesstreamline operations and enhance digital presence locally and globally. We have done E-commerce websites, Gaming Apps, Management Software, Food Delivery apps many more!',
        // subtitle: 'Vero temporibus maiores, architecto nobis, adipisci hic culpa.',
        // text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur ea numquam mollitia dignissimos minus.'
      },
      {
        image: 'Office_Photo_1.jpg',
        title: 'We have successfully designed and delivered 50+ brand logos across various industries,empowering businesses to streamline operations and enhance their digpresence both locally and globally.',
        // subtitle: 'Sapiente debitis fuga similique vitae temporibus quae excepturi.',
        // text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corrupti natus nihil dolore minima facere voluptates corporis iste deleniti?'
      }

    ];

    let currentSlide = 0;

    const carouselImage = document.getElementById('carouselImage');
    const carouselTitle = document.getElementById('carouselTitle');
    const carouselSubtitle = document.getElementById('carouselSubtitle');
    const carouselText = document.getElementById('carouselText');
    const carouselDots = document.getElementById('carouselDots');

    function renderSlide(index) {
      const slide = slides[index];
      carouselImage.style.backgroundImage = `url(${slide.image})`;
      carouselTitle.textContent = slide.title;
      carouselSubtitle.textContent = slide.subtitle;
      carouselText.textContent = slide.text;
      updateDots();
    }

    function updateDots() {
      carouselDots.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (idx === currentSlide ? ' active' : '');
        dot.onclick = () => {
          currentSlide = idx;
          renderSlide(currentSlide);
        };
        carouselDots.appendChild(dot);
      });
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      renderSlide(currentSlide);
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      renderSlide(currentSlide);
    }

    // Initial render
    renderSlide(currentSlide);

    function subscribeNewsletter() {
  const email = document.getElementById("newsletter-email").value;
  if (email) {
    alert("Subscribed with " + email);
    document.getElementById("newsletter-email").value = "";
  } else {
    alert("Please enter a valid email.");
  }
}

function openLiveChat() {
  alert("Opening live chat support...");
  // Integrate real chat widget here
}




const serviceDetails = {
    custom: {
      title: "Custom Software Solutions",
      description: "We create fully customized software tailored to your exact needs with scalable architecture and modern technologies."
    },
    // Add other services here using the same pattern
  };

  const cards = document.querySelectorAll('.service-card');
  const modal = document.getElementById('serviceModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const closeBtn = document.querySelector('.close-btn');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-service');
      if (serviceDetails[key]) {
        modalTitle.textContent = serviceDetails[key].title;
        modalDescription.textContent = serviceDetails[key].description;
        modal.style.display = 'flex';
      }
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });



  document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // this will block all links from navigating
  });
});



    function filterProjects(category) {
      const cards = document.querySelectorAll('.project-card');
      cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    }



  function openDialog(id) {
      document.getElementById(id).style.display = 'flex';
    }

    function closeDialog(id) {
      document.getElementById(id).style.display = 'none';
    }


