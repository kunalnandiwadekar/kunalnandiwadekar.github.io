class FuturisticParticles {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    this.particles = [];
    this.particleCount = window.innerWidth < 768 ? 20 : 40;
    this.time = 0;
    this.gridSize = 100; // Size of the connection grid
    
    // Tech-inspired color palette
    this.colors = {
      primary: 'rgba(0, 231, 255, 0.8)',  // Cyan
      secondary: 'rgba(142, 68, 255, 0.8)', // Purple
      accent: 'rgba(0, 255, 196, 0.8)',   // Teal
      highlight: 'rgba(255, 46, 144, 0.8)' // Pink
    };
    
    this.init();
  }

  init() {
    this.setupCanvas();
    this.createParticles();
    this.animate();
    window.addEventListener('resize', () => this.handleResize());
  }

  setupCanvas() {
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '0';
    this.canvas.style.opacity = '0.9';
    this.canvas.style.mixBlendMode = 'screen';
    
    // Insert canvas at the beginning of the body
    document.body.insertBefore(this.canvas, document.body.firstChild);
    
    this.resizeCanvas();
  }

  resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
  }

  handleResize() {
    this.resizeCanvas();
    this.particles = [];
    this.createParticles();
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      const colorKeys = Object.keys(this.colors);
      const colorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
      const baseSize = Math.random() * 4 + 1;
      
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        baseX: 0,
        baseY: 0,
        size: baseSize,
        baseSize: baseSize,
        color: this.colors[colorKey],
        speed: Math.random() * 0.5 + 0.2,
        angle: Math.random() * Math.PI * 2,
        noiseOffset: Math.random() * 1000,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        shape: Math.random() > 0.5 ? 'circle' : 'square'
      });
    }
  }

  drawParticles() {
    // Clear with semi-transparent background for motion blur effect
    this.ctx.fillStyle = 'rgba(8, 10, 20, 0.2)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update time for animations
    this.time += 0.005;
    
    // Draw particles
    this.particles.forEach((particle, i) => {
      // Update particle position with noise for organic movement
      const noise = this.simplex.noise3D(
        particle.x * 0.005, 
        particle.y * 0.005, 
        this.time
      ) * Math.PI * 2;
      
      particle.angle = noise * 0.5;
      particle.x += Math.cos(particle.angle) * particle.speed;
      particle.y += Math.sin(particle.angle) * particle.speed;
      particle.rotation += particle.rotationSpeed;
      
      // Wrap around edges
      if (particle.x < -50) particle.x = this.canvas.width + 50;
      if (particle.x > this.canvas.width + 50) particle.x = -50;
      if (particle.y < -50) particle.y = this.canvas.height + 50;
      if (particle.y > this.canvas.height + 50) particle.y = -50;
      
      // Draw particle
      this.ctx.save();
      this.ctx.translate(particle.x, particle.y);
      this.ctx.rotate(particle.rotation);
      
      // Draw different shapes
      if (particle.shape === 'circle') {
        this.drawGlow(particle);
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        // Draw square with tech-inspired corners
        this.drawGlow(particle);
        this.ctx.fillStyle = particle.color;
        this.ctx.fillRect(
          -particle.size * 0.8, 
          -particle.size * 0.8, 
          particle.size * 1.6, 
          particle.size * 1.6
        );
      }
      
      this.ctx.restore();
      
      // Draw connections
      this.drawConnections(particle, i);
    });
  }
  
  drawGlow(particle) {
    const gradient = this.ctx.createRadialGradient(
      0, 0, 0,
      0, 0, particle.size * 3
    );
    const color = particle.color.replace('0.8', '0.3');
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, particle.size * 3, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  drawConnections(particle, index) {
    for (let i = index + 1; i < this.particles.length; i++) {
      const p = this.particles[i];
      const dx = particle.x - p.x;
      const dy = particle.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 120) {
        const opacity = 0.4 * (1 - dist / 120);
        this.ctx.strokeStyle = `rgba(100, 150, 255, ${opacity})`;
        this.ctx.lineWidth = 0.8;
        
        this.ctx.beginPath();
        this.ctx.moveTo(particle.x, particle.y);
        this.ctx.lineTo(p.x, p.y);
        this.ctx.stroke();
      }
    }
  }
  }

  animate() {
    this.drawParticles();
    requestAnimationFrame(() => this.animate());
  }
  
  // Simple 3D noise function (simplified version of Perlin/Simplex noise)
  simplex = {
    grad3: [
      [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
      [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
      [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]
    ],
    p: [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
        190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,
        125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,
        105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,
        135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,
        82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,
        153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,
        251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,
        157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,
        66,215,61,156,180],
    dot: function(g, x, y, z) {
      return g[0]*x + g[1]*y + g[2]*z; 
    },
    noise3D: function(x, y, z) {
      // Simple hash function
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      const Z = Math.floor(z) & 255;
      
      x -= Math.floor(x);
      y -= Math.floor(y);
      z -= Math.floor(z);
      
      const u = this.fade(x);
      const v = this.fade(y);
      const w = this.fade(z);
      
      const A = this.p[X]+Y, AA = this.p[A]+Z, AB = this.p[A+1]+Z;
      const B = this.p[X+1]+Y, BA = this.p[B]+Z, BB = this.p[B+1]+Z;
      
      return this.lerp(w, this.lerp(v, this.lerp(u, this.grad(this.p[AA], x, y, z),
          this.grad(this.p[BA], x-1, y, z)),
          this.lerp(u, this.grad(this.p[AB], x, y-1, z),
          this.grad(this.p[BB], x-1, y-1, z))),
          this.lerp(v, this.lerp(u, this.grad(this.p[AA+1], x, y, z-1),
          this.grad(this.p[BA+1], x-1, y, z-1)),
          this.lerp(u, this.grad(this.p[AB+1], x, y-1, z-1),
          this.grad(this.p[BB+1], x-1, y-1, z-1))));
    },
    fade: function(t) { 
      return t * t * t * (t * (t * 6 - 15) + 10); 
    },
    lerp: function(t, a, b) { 
      return a + t * (b - a); 
    },
    grad: function(hash, x, y, z) {
      const h = hash & 15;
      const u = h < 8 ? x : y;
      const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }
  };
}


// Initialize the background when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const background = new FuturisticParticles();
  
  // Make sure the hero content is above the background
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.position = 'relative';
    heroContent.style.zIndex = '2';
  }

  // Add mouse move interaction
  document.addEventListener('mousemove', (e) => {
    background.particles.forEach(particle => {
      // Slight attraction to mouse
      const dx = e.clientX - particle.x;
      const dy = e.clientY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 200) {
        const force = (200 - distance) * 0.0005;
        particle.x += dx * force;
        particle.y += dy * force;
      }
    });
  });
