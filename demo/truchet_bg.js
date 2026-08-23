class TruchetBg extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.intervalId = null;
  }

  static get observedAttributes() {
    return ['data-mode', 'data-brand', 'data-refresh', 'data-cell-width', 'data-interactive'];
  }

  connectedCallback() {
    // Delay render to ensure dimensions are available
    requestAnimationFrame(() => {
      this.render();
      this.startRotation();
    });

    // Rebuild grid on resize
    this.resizeObserver = new ResizeObserver(() => {
      this.render();
    });
    this.resizeObserver.observe(this);
  }

  disconnectedCallback() {
    this.stopRotation();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'data-refresh') {
        this.stopRotation();
        this.startRotation();
      } else {
        this.render();
      }
    }
  }

  get mode() {
    return this.getAttribute('data-mode') || 'light';
  }

  get brand() {
    return this.getAttribute('data-brand') || 'm5t';
  }

  get refresh() {
    return parseInt(this.getAttribute('data-refresh') || '800', 10);
  }

  get cellWidth() {
    return parseInt(this.getAttribute('data-cell-width') || '100', 10);
  }

  get interactive() {
    return this.getAttribute('data-interactive') === 'true';
  }

  render() {
    const cellWidth = this.cellWidth;
    const width = this.offsetWidth || 800;
    const height = this.offsetHeight || 600;

    const cols = Math.floor(width / cellWidth);
    const rows = Math.floor(height / cellWidth);

    const isDark = this.mode === 'dark';
    const className = isDark ? 'truchet-bg-dark' : 'truchet-bg-light';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
        }

        .truchet-bg-dark {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' style='fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5' viewBox='0 0 240 240'%3E%3Cg transform='matrix(.263 0 0 .27392 -.878 -.235)'%3E%3Cpath d='M3.338.857h912.551V877.03H3.338z' style='fill:none'/%3E%3CclipPath id='a'%3E%3Cpath d='M3.338.857h912.551V877.03H3.338z'/%3E%3C/clipPath%3E%3Cg clip-path='url(%23a)'%3E%3Ccircle cx='533.882' cy='438.874' r='308.22' style='fill:none;stroke:%23fff;stroke-width:7.71px' transform='matrix(1.48035 0 0 1.42134 -789.734 -622.933)'/%3E%3Ccircle cx='533.882' cy='438.874' r='308.22' style='fill:none;stroke:%23fff;stroke-width:7.71px' transform='matrix(1.48035 0 0 1.42134 122.817 253.24)'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .truchet-bg-light {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' style='fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5' viewBox='0 0 240 240'%3E%3Cg transform='matrix(.263 0 0 .27392 -.878 -.235)'%3E%3Cpath d='M3.338.857h912.551V877.03H3.338z' style='fill:none'/%3E%3CclipPath id='a'%3E%3Cpath d='M3.338.857h912.551V877.03H3.338z'/%3E%3C/clipPath%3E%3Cg clip-path='url(%23a)'%3E%3Ccircle cx='533.882' cy='438.874' r='308.22' style='fill:none;stroke:%23000;stroke-width:7.71px' transform='matrix(1.48035 0 0 1.42134 -789.734 -622.933)'/%3E%3Ccircle cx='533.882' cy='438.874' r='308.22' style='fill:none;stroke:%23000;stroke-width:7.71px' transform='matrix(1.48035 0 0 1.42134 122.817 253.24)'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .grid-container {
          display: grid;
          grid-template-columns: repeat(${cols}, 1fr);
          grid-auto-rows: ${actualCellWidth}px;
          width: 100%;
          height: 100%;
        }

        .grid-cell {
          width: 100%;
          height: ${actualCellWidth}px;
          background-size: cover;
          background-repeat: no-repeat;
          position: relative;
        }

        .grid-cell::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: transparent;
          pointer-events: none;
          transition: background-color 0s;
        }
      </style>
      <div class="grid-container">
        ${this.generateCells(rows, cols, className)}
      </div>
    `;

    if (this.interactive) {
      this.attachHoverListeners();
    }
  }

  attachHoverListeners() {
    const cells = this.shadowRoot.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
      cell.addEventListener('mouseenter', () => {
        const isDark = this.mode === 'dark';
        const overlayColor = isDark ? 'rgba(255, 255, 255, 0.24)' : 'rgba(0, 0, 0, 0.24)';

        // Create a style element for this specific cell's ::after pseudo-element
        const computedStyle = window.getComputedStyle(cell, '::after');
        cell.style.setProperty('--hover-bg', overlayColor);

        // Apply via CSS variable
        const style = this.shadowRoot.querySelector('style');
        if (!style.textContent.includes('--hover-bg')) {
          style.textContent += `
            .grid-cell.hovered::after {
              background-color: var(--hover-bg, transparent);
            }
          `;
        }

        cell.classList.add('hovered');

        const delay = Math.random() * 600 + 200; // Random between 200-800ms
        setTimeout(() => {
          cell.classList.remove('hovered');
        }, delay);
      });
    });
  }

  generateCells(rows, cols, className) {
    let cells = '';
    for (let i = 0; i < rows * cols; i++) {
      const rotation = Math.random() > 0.5 ? 90 : 0;
      cells += `<div class="grid-cell ${className}" style="transform: rotate(${rotation}deg);"></div>`;
    }
    return cells;
  }

  startRotation() {
    this.stopRotation();

    this.intervalId = setInterval(() => {
      const cells = this.shadowRoot.querySelectorAll('.grid-cell');
      cells.forEach(cell => {
        // 50% chance to change
        if (Math.random() > 0.5) {
          // 50% chance to be 90 degrees, otherwise 0
          const rotation = Math.random() > 0.5 ? 90 : 0;
          cell.style.transform = `rotate(${rotation}deg)`;
        }
      });
    }, this.refresh);
  }

  stopRotation() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

}

customElements.define('truchet-bg', TruchetBg);
