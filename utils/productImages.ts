/**
 * High-Fidelity SVG Vector Assets for SYSLight Luxury Fixtures
 * Beautifully engineered, fully responsive, and 100% reliable.
 * Generates custom Base64 Data URIs of the actual product models.
 */

function svgToDataUri(svgContent: string): string {
  const rebrandedSvg = svgContent.replace(/#C9A96E/gi, '#4D4A9D');
  const encoded =
    typeof btoa !== 'undefined'
      ? btoa(unescape(encodeURIComponent(rebrandedSvg.trim())))
      : Buffer.from(rebrandedSvg.trim(), 'utf-8').toString('base64');
  return `data:image/svg+xml;base64,${encoded}`;
}

// 1. Nano LuminaDown (Recessed cutoff deep downlight with gold baffle)
const NANO_LUMINA_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <!-- Dark studio gradient background -->
    <radialGradient id="studio-bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#141419" />
      <stop offset="100%" stop-color="#070709" />
    </radialGradient>
    
    <!-- Light cone glow -->
    <linearGradient id="light-beam" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF0" stop-opacity="0.85" />
      <stop offset="30%" stop-color="#C9A96E" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#C9A96E" stop-opacity="0.0" />
    </linearGradient>

    <!-- Warm lens glow filter -->
    <filter id="lens-flare" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="400" height="400" fill="url(#studio-bg)" rx="4" />
  
  <!-- Blueprint Grid -->
  <g opacity="0.12">
    <line x1="50" y1="0" x2="50" y2="400" stroke="#C9A96E" stroke-width="0.5" stroke-dasharray="2,4" />
    <line x1="150" y1="0" x2="150" y2="400" stroke="#C9A96E" stroke-width="0.5" stroke-dasharray="2,4" />
    <line x1="250" y1="0" x2="250" y2="400" stroke="#C9A96E" stroke-width="0.5" stroke-dasharray="2,4" />
    <line x1="350" y1="0" x2="350" y2="400" stroke="#C9A96E" stroke-width="0.5" stroke-dasharray="2,4" />
    
    <line x1="0" y1="50" x2="400" y2="50" stroke="#C9A96E" stroke-width="0.5" stroke-dasharray="2,4" />
    <line x1="0" y1="150" x2="400" y2="150" stroke="#C9A96E" stroke-width="0.5" stroke-dasharray="2,4" />
    <line x1="0" y1="250" x2="400" y2="250" stroke="#C9A96E" stroke-width="0.5" stroke-dasharray="2,4" />
    <line x1="0" y1="350" x2="400" y2="350" stroke="#C9A96E" stroke-width="0.5" stroke-dasharray="2,4" />
    
    <!-- Outer CAD boundary box -->
    <rect x="30" y="30" width="340" height="340" fill="none" stroke="#C9A96E" stroke-dasharray="10,12" stroke-width="0.5" />
  </g>

  <!-- Spec Labels (Architectural Ledger look) -->
  <text x="40" y="340" fill="#8E909A" font-family="monospace" font-size="8" letter-spacing="1">MODEL: NANO-LUMINA</text>
  <text x="40" y="355" fill="#C9A96E" font-family="monospace" font-size="8" letter-spacing="1">SERIES: DEEP-CUTOFF DOWNLIGHT</text>
  <text x="360" y="340" fill="#8E909A" font-family="monospace" font-size="8" text-anchor="end">CUTOUT: Ø75MM</text>
  <text x="360" y="355" fill="#8E909A" font-family="monospace" font-size="8" text-anchor="end">UGR: &lt;13</text>

  <!-- Technical dimensions indicator lines -->
  <g stroke="#C9A96E" stroke-opacity="0.3" stroke-width="0.75" fill="none">
    <path d="M 120,45 L 120,35 L 280,35 L 280,45" />
    <path d="M 95,90 L 85,90 L 85,210 L 95,210" />
  </g>
  <text x="200" y="30" fill="#C9A96E" fill-opacity="0.7" font-family="monospace" font-size="8" text-anchor="middle">75 mm (Outer Bezel)</text>
  <text x="75" y="155" fill="#C9A96E" fill-opacity="0.7" font-family="monospace" font-size="8" text-anchor="middle" transform="rotate(-90 75 155)">H: 90 mm</text>

  <!-- Projections: Emitted Light Beam -->
  <polygon points="155,185 80,320 320,320 245,185" fill="url(#light-beam)" />

  <!-- The Fixture - 3D Section Illustration -->
  <g id="fixture-body">
    <!-- Ceiling Line representation -->
    <line x1="60" y1="90" x2="340" y2="90" stroke="#2D2D37" stroke-width="3" />
    <line x1="60" y1="90" x2="340" y2="90" stroke="#C9A96E" stroke-width="1" stroke-opacity="0.5" />

    <!-- Outer Heatsink / Housing (Anodized Dark Gray) -->
    <path d="M 130,90 L 130,50 L 270,50 L 270,90 Z" fill="#24252B" stroke="#373840" stroke-width="1" />
    <!-- Heatsink Fins (lines) -->
    <line x1="145" y1="50" x2="145" y2="90" stroke="#16171A" stroke-width="1.5" />
    <line x1="160" y1="50" x2="160" y2="90" stroke="#16171A" stroke-width="1.5" />
    <line x1="175" y1="50" x2="175" y2="90" stroke="#16171A" stroke-width="1.5" />
    <line x1="190" y1="50" x2="190" y2="90" stroke="#16171A" stroke-width="1.5" />
    <line x1="210" y1="50" x2="210" y2="90" stroke="#16171A" stroke-width="1.5" />
    <line x1="225" y1="50" x2="225" y2="90" stroke="#16171A" stroke-width="1.5" />
    <line x1="240" y1="50" x2="240" y2="90" stroke="#16171A" stroke-width="1.5" />
    <line x1="255" y1="50" x2="255" y2="90" stroke="#16171A" stroke-width="1.5" />

    <!-- Outer Trim Bezel -->
    <path d="M 115,90 L 285,90 L 285,95 L 115,95 Z" fill="#1C1C1F" stroke="#2C2C30" stroke-width="0.5" />
    
    <!-- Deep Recessed Inner Baffle (Sleek sand-gold luxury reflective color) -->
    <path d="M 125,95 L 155,160 L 245,160 L 275,95 Z" fill="#C9A96E" />
    <!-- Specular luxury highlight inside the gold baffle -->
    <path d="M 125,95 L 155,160 L 165,160 L 132,95 Z" fill="#FFF" fill-opacity="0.15" />
    <!-- Baffle shadow ridge -->
    <path d="M 155,160 L 245,160 L 275,95 L 265,95 L 240,150 L 160,150 Z" fill="#000" fill-opacity="0.3" />

    <!-- Highly Recessed COB LED Core Emitter -->
    <ellipse cx="200" cy="160" rx="35" ry="12" fill="#FFEAA7" stroke="#FFE38E" stroke-width="1" />
    <!-- Super Bright Light Core point -->
    <ellipse cx="200" cy="160" rx="16" ry="5" fill="#FFFFFF" filter="url(#lens-flare)" />
  </g>
</svg>
`;

// 2. Twin GlareFree Spotlight (Rectangle cardan double spot)
const TWIN_GLAREFREE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="studio-bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#141419" />
      <stop offset="100%" stop-color="#070709" />
    </radialGradient>
    <linearGradient id="beam-1" x1="50%" y1="0%" x2="40%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF0" stop-opacity="0.75" />
      <stop offset="40%" stop-color="#C9A96E" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#C9A96E" stop-opacity="0.0" />
    </linearGradient>
    <linearGradient id="beam-2" x1="50%" y1="0%" x2="60%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF0" stop-opacity="0.75" />
      <stop offset="40%" stop-color="#C9A96E" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#C9A96E" stop-opacity="0.0" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="400" height="400" fill="url(#studio-bg)" rx="4" />
  
  <!-- Grid -->
  <g opacity="0.08">
    <circle cx="200" cy="200" r="160" fill="none" stroke="#C9A96E" stroke-width="0.5" stroke-dasharray="4,8" />
    <line x1="200" y1="0" x2="200" y2="400" stroke="#C9A96E" stroke-width="0.5" />
    <line x1="0" y1="200" x2="400" y2="200" stroke="#C9A96E" stroke-width="0.5" />
    <rect x="40" y="40" width="320" height="320" fill="none" stroke="#C9A96E" stroke-width="0.5" stroke-dasharray="10,12" />
  </g>

  <!-- Spec Labels -->
  <text x="40" y="340" fill="#8E909A" font-family="monospace" font-size="8" letter-spacing="1">MODEL: TWIN-GLAREFREE</text>
  <text x="40" y="355" fill="#C9A96E" font-family="monospace" font-size="8" letter-spacing="1">SERIES: DUAL CARDAN SPOTLIGHT</text>
  <text x="360" y="340" fill="#8E909A" font-family="monospace" font-size="8" text-anchor="end">WATTAGE: 2x10W / 2x15W</text>
  <text x="360" y="355" fill="#8E909A" font-family="monospace" font-size="8" text-anchor="end">ADJUSTMENT: ±30° CARDAN</text>

  <!-- Light Cones -->
  <g opacity="0.9">
    <!-- Left light beam tilted to left -->
    <polygon points="140,165 40,310 180,310 160,165" fill="url(#beam-1)" />
    <!-- Right light beam tilted to right -->
    <polygon points="240,165 220,310 360,310 260,165" fill="url(#beam-2)" />
  </g>

  <!-- Main Bezel Plate Frame (Recessed Flush profile) -->
  <rect x="80" y="115" width="240" height="70" rx="3" fill="#1C1C1F" stroke="#333" stroke-width="1.5" />
  <!-- Inner Cutout Shadow -->
  <rect x="88" y="121" width="224" height="58" rx="2" fill="#0A0A0C" />

  <!-- LEFT GIMBAL HOUSING -->
  <g transform="translate(150, 150) rotate(-15)">
    <!-- Cardan Outer Ring -->
    <ellipse cx="0" cy="0" rx="35" ry="15" fill="none" stroke="#4C4D52" stroke-width="1.5" />
    <!-- Spotlight cylinder body -->
    <rect x="-24" y="-30" width="48" height="36" rx="2" fill="#2D2E35" stroke="#44454E" stroke-width="1" />
    <!-- Core gold-accent ring -->
    <ellipse cx="0" cy="6" rx="24" ry="10" fill="#C9A96E" />
    <!-- Emitter deep lens -->
    <ellipse cx="0" cy="6" rx="16" ry="6" fill="#fff" />
  </g>

  <!-- RIGHT GIMBAL HOUSING -->
  <g transform="translate(250, 150) rotate(15)">
    <!-- Cardan Outer Ring -->
    <ellipse cx="0" cy="0" rx="35" ry="15" fill="none" stroke="#4C4D52" stroke-width="1.5" />
    <!-- Spotlight cylinder body -->
    <rect x="-24" y="-30" width="48" height="36" rx="2" fill="#2D2E35" stroke="#44454E" stroke-width="1" />
    <!-- Core gold-accent ring -->
    <ellipse cx="0" cy="6" rx="24" ry="10" fill="#C9A96E" />
    <!-- Emitter deep lens -->
    <ellipse cx="0" cy="6" rx="16" ry="6" fill="#fff" />
  </g>

  <!-- CAD axis & tilt annotations -->
  <path d="M 100,195 L 120,215 M 100,215 L 120,195" stroke="#C9A96E" stroke-width="0.75" />
  <arc d="M 120,150 A 40,40 0 0,1 150,180" stroke="#C9A96E" stroke-dasharray="2,2" stroke-width="1" fill="none" />
  <text x="110" y="230" fill="#C9A96E" font-family="monospace" font-size="7">30° Cardan Pivot</text>
  
</svg>
`;

// 3. COBMove Downlight (Adjustable Zoom Light with focal dial)
const COBMOVE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#141419" />
      <stop offset="100%" stop-color="#070709" />
    </radialGradient>
    <linearGradient id="narrow-beam" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#FFF" stop-opacity="0.8" />
      <stop offset="15%" stop-color="#C9A96E" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#C9A96E" stop-opacity="0.0" />
    </linearGradient>
    <linearGradient id="wide-beam" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#FFF" stop-opacity="0.4" />
      <stop offset="40%" stop-color="#C9A96E" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#C9A96E" stop-opacity="0.0" />
    </linearGradient>
  </defs>

  <rect width="400" height="400" fill="url(#bg)" rx="4" />
  
  <!-- Blueprint background grid -->
  <g opacity="0.1">
    <rect x="50" y="50" width="300" height="300" fill="none" stroke="#C9A96E" stroke-width="0.5" />
    <circle cx="200" cy="180" r="100" fill="none" stroke="#C9A96E" stroke-dasharray="2,2" stroke-width="0.5" />
    <line x1="200" y1="0" x2="200" y2="400" stroke="#C9A96E" stroke-width="0.5" />
  </g>

  <!-- Technical Spec details -->
  <text x="40" y="340" fill="#8E909A" font-family="monospace" font-size="8" letter-spacing="1">MODEL: COBMOVE-ZOOM</text>
  <text x="40" y="355" fill="#C9A96E" font-family="monospace" font-size="8" letter-spacing="1">SERIES: OPTICAL ADJUSTABLE FOCUS</text>
  <text x="360" y="340" fill="#8E909A" font-family="monospace" font-size="8" text-anchor="end">SPECTRUM: 15° TO 50°</text>
  <text x="360" y="355" fill="#8E909A" font-family="monospace" font-size="8" text-anchor="end">CRI: &gt;93 Ra</text>

  <!-- Ray Tracing Graphics (Dynamic Zoom cone representation) -->
  <polygon points="200,195 160,310 240,310" fill="url(#narrow-beam)" />
  <polygon points="200,195 100,310 300,310" fill="url(#wide-beam)" />
  
  <path d="M 120,280 C 160,295 240,295 280,280" stroke="#C9A96E" stroke-dasharray="3,3" stroke-width="1.2" fill="none" />
  <text x="200" y="275" fill="#C9A96E" font-family="monospace" font-size="7" text-anchor="middle">Variable optical range</text>

  <!-- Fixture Body Assembly -->
  <g transform="translate(0, 10)">
    <!-- Top cooling fins (Heatsink) -->
    <path d="M 150,90 L 150,55 A 10,10 0 0,1 160,45 L 240,45 A 10,10 0 0,1 250,55 L 250,90 Z" fill="#2C2E35" stroke="#3D3E45" stroke-width="1" />
    <rect x="165" y="45" width="8" height="45" fill="#1C1C1F" />
    <rect x="180" y="45" width="8" height="45" fill="#1C1C1F" />
    <rect x="195" y="45" width="8" height="45" fill="#1C1C1F" />
    <rect x="212" y="45" width="8" height="45" fill="#1C1C1F" />
    <rect x="227" y="45" width="8" height="45" fill="#1C1C1F" />

    <!-- Main upper housing cylinder -->
    <rect x="135" y="90" width="130" height="60" fill="#1E1E22" stroke="#37373C" stroke-width="1.2" />

    <!-- Zoom rotation ring with custom measurement scale mark notches -->
    <rect x="135" y="150" width="130" height="25" fill="#C9A96E" />
    <!-- Ring Notches/Markings -->
    <line x1="145" y1="150" x2="145" y2="160" stroke="#1E1E22" stroke-width="1.5" />
    <line x1="155" y1="150" x2="155" y2="156" stroke="#1E1E22" stroke-width="1" />
    <line x1="165" y1="150" x2="165" y2="156" stroke="#1E1E22" stroke-width="1" />
    <line x1="175" y1="150" x2="175" y2="156" stroke="#1E1E22" stroke-width="1" />
    <line x1="185" y1="150" x2="185" y2="160" stroke="#1E1E22" stroke-width="1.5" />
    <text x="185" y="170" fill="#1E1E22" font-family="monospace" font-size="7" font-weight="bold" text-anchor="middle">15°</text>

    <line x1="200" y1="150" x2="200" y2="156" stroke="#1E1E22" stroke-width="1" />
    <line x1="215" y1="150" x2="215" y2="160" stroke="#1E1E22" stroke-width="1.5" />
    <text x="215" y="170" fill="#1E1E22" font-family="monospace" font-size="7" font-weight="bold" text-anchor="middle">38°</text>

    <line x1="230" y1="150" x2="230" y2="156" stroke="#1E1E22" stroke-width="1" />
    <line x1="245" y1="150" x2="245" y2="160" stroke="#1E1E22" stroke-width="1.5" />
    <text x="245" y="170" fill="#1E1E22" font-family="monospace" font-size="7" font-weight="bold" text-anchor="middle">50°</text>

    <path d="M 197,144 L 200,137 L 203,144 Z" fill="#FFEAA7" />

    <!-- Pure crystal optics exit bezel -->
    <rect x="145" y="175" width="110" height="15" rx="1" fill="#16171A" stroke="#2D2D35" stroke-width="1" />
    <ellipse cx="200" cy="183" rx="45" ry="6" fill="#A8DADC" stroke="#FFFFFF" stroke-width="0.75" fill-opacity="0.25" />
  </g>
</svg>
`;

// 4. TwinBeam Track Spotlight (Cylinder spot on track bar with honeycomb front screen)
const TWINBEAM_TRACK_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="studio-bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#141419" />
      <stop offset="100%" stop-color="#070709" />
    </radialGradient>
    <linearGradient id="spot-cone" x1="10%" y1="10%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF0" stop-opacity="0.8" />
      <stop offset="40%" stop-color="#C9A96E" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#C9A96E" stop-opacity="0.0" />
    </linearGradient>
    
    <!-- Honeycomb seamless pattern pattern fill -->
    <pattern id="honeycomb" width="8" height="14" patternUnits="userSpaceOnUse" patternTransform="scale(0.8)">
      <path d="M 4 0 L 8 2 L 8 7 L 4 9 L 0 7 L 0 2 Z" fill="none" stroke="#25252A" stroke-width="1" />
    </pattern>
  </defs>

  <rect width="400" height="400" fill="url(#studio-bg)" rx="4" />

  <!-- Background graphic compass grid -->
  <g opacity="0.08" stroke="#C9A96E" stroke-width="0.5">
    <circle cx="200" cy="200" r="150" fill="none" />
    <circle cx="200" cy="200" r="100" fill="none" />
    <line x1="200" y1="50" x2="200" y2="350" />
    <line x1="50" y1="200" x2="350" y2="200" />
  </g>

  <!-- Specs Layout Details -->
  <text x="40" y="340" fill="#8E909A" font-family="monospace" font-size="8" letter-spacing="1">MODEL: TWINBEAM-TRACK</text>
  <text x="40" y="355" fill="#C9A96E" font-family="monospace" font-size="8" letter-spacing="1">SERIES: ARCHITECTURAL TRACKLIGHT</text>
  <text x="360" y="340" fill="#8E909A" font-family="monospace" font-size="8" text-anchor="end">EMITTER: CREE LED COB</text>
  <text x="360" y="355" fill="#8E909A" font-family="monospace" font-size="8" text-anchor="end">GRID: INTEGRATED HONEYCOMB</text>

  <!-- Emitted Light Cone Projection (Tilted angle projection) -->
  <polygon points="190,195 240,330 380,260 210,175" fill="url(#spot-cone)" />

  <!-- 3-Phase Global Track segment profile -->
  <g transform="translate(80, 40)">
    <rect x="0" y="0" width="240" height="12" fill="#1C1C1F" stroke="#333" stroke-width="1" />
    <line x1="10" y1="6" x2="230" y2="6" stroke="#C9A96E" stroke-opacity="0.4" stroke-width="1" />
  </g>

  <!-- Track joint link adapter -->
  <g transform="translate(180, 52)">
    <!-- Adaptor lock box -->
    <rect x="0" y="0" width="40" height="18" fill="#2E2F35" stroke="#444" stroke-width="0.75" />
    <!-- Rotation joint hinge -->
    <circle cx="20" cy="25" r="7" fill="#1D1E22" stroke="#444" stroke-width="1" />
    
    <!-- Heavy metallic bracket neck -->
    <path d="M 13,25 L 13,60 A 10,10 0 0,0 23,70 L 30,70" fill="none" stroke="#2E2F35" stroke-width="6" />
    <path d="M 13,25 L 13,60 A 10,10 0 0,0 23,70 L 30,70" fill="none" stroke="#C9A96E" stroke-width="1" stroke-opacity="0.5" />
  </g>

  <!-- Cylindrical spotlight body at an dynamic angled mount position -->
  <g transform="translate(200, 120) rotate(35)">
    <!-- Back Cap cylinder detail -->
    <rect x="-25" y="-60" width="50" height="10" rx="1" fill="#1C1C1F" stroke="#2A2B30" stroke-width="1" />
    
    <!-- Core main body cylinder -->
    <rect x="-25" y="-50" width="50" height="90" fill="#2A2A30" stroke="#3E3E47" stroke-width="1" />
    <!-- Specular luxury light line on cylinder -->
    <rect x="-15" y="-50" width="6" height="90" fill="#FFFFFF" fill-opacity="0.08" />

    <!-- Gold Accent connection lock ring -->
    <rect x="-25" y="40" width="50" height="8" fill="#C9A96E" />

    <!-- Baffle cone/Snoot exit shroud -->
    <polygon points="-25,48 -22,70 22,70 25,48" fill="#1C1C1F" stroke="#2C2C30" stroke-width="1" />

    <!-- Front Honeycomb mesh core plate (extremely realistic mockup element) -->
    <ellipse cx="0" cy="69" rx="20" ry="4" fill="#0E0E10" />
    <ellipse cx="0" cy="69" rx="20" ry="4" fill="url(#honeycomb)" />
    
    <!-- High gloss glass bead visual -->
    <ellipse cx="0" cy="69" rx="14" ry="2.5" fill="#FFF" fill-opacity="0.15" />
  </g>
</svg>
`;

// 5. Mag-Linear Click System (Magnetic low voltage track module grids)
const MAG_LINEAR_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="studio-bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#141419" />
      <stop offset="100%" stop-color="#070709" />
    </radialGradient>
    <linearGradient id="linear-glow" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#FFEAA7" stop-opacity="0.75" />
      <stop offset="50%" stop-color="#C9A96E" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#C9A96E" stop-opacity="0.0" />
    </linearGradient>
  </defs>

  <rect width="400" height="400" fill="url(#studio-bg)" rx="4" />
  
  <g opacity="0.1" stroke="#C9A96E" stroke-width="0.5">
    <line x1="50" y1="0" x2="50" y2="400" stroke-dasharray="2,2" />
    <line x1="350" y1="0" x2="350" y2="400" stroke-dasharray="2,2" />
    <path d="M 0,200 L 400,200" />
  </g>

  <!-- Technical label tags -->
  <text x="40" y="340" fill="#8E909A" font-family="monospace" font-size="8" letter-spacing="1">MODEL: MAG-LINEAR CLICK</text>
  <text x="40" y="355" fill="#C9A96E" font-family="monospace" font-size="8" letter-spacing="1">SERIES: 48V LOW-VOLTAGE MODULAR</text>
  <text x="360" y="340" fill="#8E909A" font-family="monospace" font-size="8" text-anchor="end">LOCK: MAGNETIC &amp; MECHANICAL</text>
  <text x="360" y="355" fill="#8E909A" font-family="monospace" font-size="8" text-anchor="end">EMISSION: GLARLESS DOT MATRIX</text>

  <!-- Glow effect from the multiple micro spots -->
  <polygon points="105,120 70,270 330,270 295,120" fill="url(#linear-glow)" />

  <!-- Recessed 48V Magnetic Architectural Track housing profile -->
  <g transform="translate(60, 45)">
    <!-- Drywall cut boundary mockup -->
    <path d="M -20,5 L 0,5 L 0,60 L 280,60 L 280,5 L 300,5" fill="none" stroke="#2E2E34" stroke-width="2" />
    <line x1="-30" y1="5" x2="310" y2="5" stroke="#444" stroke-width="1" stroke-dasharray="2,4" />

    <!-- Magnetic profile track inside aluminum cavity -->
    <rect x="1" y="6" width="278" height="53" fill="#0A0A0C" />
    <!-- Golden conductive contact strips -->
    <line x1="5" y1="20" x2="275" y2="20" stroke="#C9A96E" stroke-opacity="0.3" stroke-width="1.5" />
    <line x1="5" y1="46" x2="275" y2="46" stroke="#C9A96E" stroke-opacity="0.3" stroke-width="1.5" />

    <!-- INSERTED FIXTURE MODULE (Linear Grid Spotlight inserts clicked in) -->
    <g transform="translate(40, 20)">
      <!-- Module Frame structure -->
      <rect x="0" y="0" width="200" height="42" fill="#1C1C1F" stroke="#3C3C43" stroke-width="1" />
      <rect x="0" y="34" width="200" height="8" fill="#000" />

      <!-- Click handles / Magnetic anchors -->
      <rect x="20" y="-6" width="16" height="6" fill="#C9A96E" rx="1" />
      <rect x="164" y="-6" width="16" height="6" fill="#C9A96E" rx="1" />

      <!-- Elegant micro glare-free grilles -->
      <g stroke="#3D3D45" stroke-width="1">
        <!-- Dot Spot 1 -->
        <rect x="15" y="10" width="20" height="24" fill="#0C0C0E" />
        <circle cx="25" cy="22" r="6" fill="#C9A96E" />
        <circle cx="25" cy="22" r="3" fill="#FFF" />
        
        <!-- Dot Spot 2 -->
        <rect x="45" y="10" width="20" height="24" fill="#0C0C0E" />
        <circle cx="55" cy="22" r="6" fill="#C9A96E" />
        <circle cx="55" cy="22" r="3" fill="#FFF" />

        <!-- Dot Spot 3 -->
        <rect x="75" y="10" width="20" height="24" fill="#0C0C0E" />
        <circle cx="85" cy="22" r="6" fill="#C9A96E" />
        <circle cx="85" cy="22" r="3" fill="#FFF" />

        <!-- Dot Spot 4 -->
        <rect x="105" y="10" width="20" height="24" fill="#0C0C0E" />
        <circle cx="115" cy="22" r="6" fill="#C9A96E" />
        <circle cx="115" cy="22" r="3" fill="#FFF" />

        <!-- Dot Spot 5 -->
        <rect x="135" y="10" width="20" height="24" fill="#0C0C0E" />
        <circle cx="145" cy="22" r="6" fill="#C9A96E" />
        <circle cx="145" cy="22" r="3" fill="#FFF" />

        <!-- Dot Spot 6 -->
        <rect x="165" y="10" width="20" height="24" fill="#0C0C0E" />
        <circle cx="175" cy="22" r="6" fill="#C9A96E" />
        <circle cx="175" cy="22" r="3" fill="#FFF" />
      </g>
    </g>
    
    <!-- Aesthetic installation annotation -->
    <path d="M 230,30 L 230,10 L 210,10" stroke="#C9A96E" stroke-width="0.75" fill="none" />
    <text x="235" y="13" fill="#C9A96E" font-family="monospace" font-size="6">Snap Secure</text>
  </g>
</svg>
`;

// 6. SYSProfile Architectural Diffuser (Recessed drywall trimless neon profiles)
const SYSPROFILE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="studio-bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#141419" />
      <stop offset="100%" stop-color="#070709" />
    </radialGradient>
    <linearGradient id="neon-glow" x1="0%" y1="50%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#FFEAA7" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="1.0" />
      <stop offset="100%" stop-color="#FFEAA7" stop-opacity="0.8" />
    </linearGradient>
    <!-- Downward linear glow -->
    <linearGradient id="linear-beam" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#FFF" stop-opacity="0.5" />
      <stop offset="50%" stop-color="#C9A96E" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#C9A96E" stop-opacity="0.0" />
    </linearGradient>
  </defs>

  <rect width="400" height="400" fill="url(#studio-bg)" rx="4" />

  <!-- Layout lines -->
  <g opacity="0.1" stroke="#C9A96E" stroke-width="0.5">
    <line x1="0" y1="120" x2="400" y2="120" />
    <line x1="0" y1="280" x2="400" y2="280" />
    <line x1="200" y1="0" x2="200" y2="400" stroke-dasharray="3,3" />
  </g>

  <!-- Technical Spec description -->
  <text x="40" y="340" fill="#8E909A" font-family="monospace" font-size="8" letter-spacing="1">MODEL: SYSPROFILE-DIFFUSED</text>
  <text x="40" y="355" fill="#C9A96E" font-family="monospace" font-size="8" letter-spacing="1">SERIES: ARCHITECTURAL LINEAR EXTRUSION</text>
  <text x="360" y="340" fill="#8E909A" font-family="monospace" font-size="8" text-anchor="end">MOUNT: RECESSED TRIMLESS</text>
  <text x="360" y="355" fill="#8E909A" font-family="monospace" font-size="8" text-anchor="end">DIFFUSER: SHADOWLESS OPAL</text>

  <!-- Linear light dispersion fields -->
  <rect x="80" y="160" width="240" height="130" fill="url(#linear-beam)" />

  <!-- Drywall structural representation (Linear cuts) -->
  <g transform="translate(0, 40)">
    <!-- Left gyprock panel -->
    <path d="M 0,110 L 80,110 L 80,120 " fill="none" stroke="#25252A" stroke-width="4" />
    <!-- Right gyprock panel -->
    <path d="M 320,110 L 320,120 L 400,120" fill="none" stroke="#25252A" stroke-width="4" />
    
    <!-- Extruded Aluminum profile profile frame structure -->
    <!-- Trimless wings embedding into drywall mud -->
    <path d="M 60,110 L 80,110 L 80,60 L 320,60 L 320,110 L 340,110" fill="none" stroke="#3D3D45" stroke-width="2.5" />
    <!-- Inner module recess wall brackets -->
    <rect x="83" y="62" width="234" height="46" fill="#151518" />

    <!-- Reflector chamber curves -->
    <path d="M 83,105 C 110,105 130,70 150,70 L 250,70 C 270,70 290,105 317,105" fill="none" stroke="#2E2E35" stroke-width="1.5" />

    <!-- Interior high density linear LED ribbon strip -->
    <rect x="160" y="65" width="80" height="4" fill="#E8A838" />
    <!-- micro LED dots -->
    <circle cx="170" cy="67" r="1.5" fill="#FFF" />
    <circle cx="185" cy="67" r="1.5" fill="#FFF" />
    <circle cx="200" cy="67" r="1.5" fill="#FFF" />
    <circle cx="215" cy="67" r="1.5" fill="#FFF" />
    <circle cx="230" cy="67" r="1.5" fill="#FFF" />

    <!-- High-grade Satin Polycarbonate opal Diffuser lens (Glow bar) -->
    <rect x="80" y="112" width="240" height="12" fill="url(#neon-glow)" rx="1.5" />
    <rect x="80" y="112" width="240" height="12" fill="#FFF" rx="1.5" fill-opacity="0.4" />
  </g>
</svg>
`;

// 7. Aurora Pathway Spike (Anodised brass garden spike ground light)
const AURORA_SPIKE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="studio-bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#141419" />
      <stop offset="100%" stop-color="#070709" />
    </radialGradient>
    <linearGradient id="ground-wash" x1="10%" y1="10%" x2="70%" y2="90%">
      <stop offset="0%" stop-color="#FFEAA7" stop-opacity="0.6" />
      <stop offset="50%" stop-color="#C9A96E" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#C9A96E" stop-opacity="0.0" />
    </linearGradient>
  </defs>

  <rect width="400" height="400" fill="url(#studio-bg)" rx="4" />

  <!-- Landscape Grid lines representation -->
  <g opacity="0.06" stroke="#C9A96E" stroke-width="0.5">
    <ellipse cx="200" cy="275" rx="160" ry="40" fill="none" />
    <line x1="200" y1="0" x2="200" y2="400" />
  </g>

  <!-- Technical specs tag details -->
  <text x="40" y="340" fill="#8E909A" font-family="monospace" font-size="8" letter-spacing="1">MODEL: AURORA-SPIKE-IP66</text>
  <text x="40" y="355" fill="#C9A96E" font-family="monospace" font-size="8" letter-spacing="1">SERIES: WEATHERPROOF LANDSCAPE BOLLARD</text>
  <text x="360" y="340" fill="#8E909A" font-family="monospace" font-size="8" text-anchor="end">FINISH: SOLID BRUSHED BRASS</text>
  <text x="360" y="355" fill="#8E909A" font-family="monospace" font-size="8" text-anchor="end">PROTECT: IP66 WATER-SEALED</text>

  <!-- Ground line visual -->
  <line x1="50" y1="275" x2="350" y2="275" stroke="#3D3D45" stroke-width="2" />
  <!-- Soil texture indicators -->
  <line x1="75" y1="285" x2="105" y2="285" stroke="#1D1D22" stroke-width="1.5" />
  <line x1="290" y1="290" x2="320" y2="290" stroke="#1D1D22" stroke-width="1.5" />

  <!-- Glow Projection (Casts soft gold light on pathway) -->
  <polygon points="120,140 30,270 250,270" fill="url(#ground-wash)" />

  <!-- Garden Spike Fixture assembly -->
  <g transform="translate(100, 40)">
    <!-- Ground Spike blade wedged inside soil (recessed below ground line) -->
    <polygon points="96,235 104,235 100,310" fill="#1C1C1F" stroke="#25252A" stroke-width="1" />

    <!-- Robust Solid Heavy pathway shaft / spike stem -->
    <rect x="94" y="160" width="12" height="75" fill="#C9A96E" />
    <!-- Fine Specular Metallic shine line on stem -->
    <rect x="95" y="160" width="2" height="75" fill="#FFF" fill-opacity="0.15" />

    <!-- Adjustable locking swivel knuckle rotation screw joint -->
    <circle cx="100" cy="155" r="10" fill="#8D7040" stroke="#5D4C2D" stroke-width="1.2" />
    <path d="M 96,155 L 104,155 M 100,151 L 100,159" stroke="#FFF" stroke-width="1.5" />

    <!-- Angled elegant spot core spotlight head housing (Machined deep solid brass) -->
    <!-- Rotated elegantly towards the ground center -->
    <g transform="translate(100, 145) rotate(-30)">
      <!-- Back enclosure heat ring -->
      <path d="M -15,-40 L 15,-40 L 12,-30 L -12,-30 Z" fill="#8D7040" />
      <!-- Solid cylindric body -->
      <rect x="-16" y="-30" width="32" height="50" fill="#C9A96E" />
      <rect x="-11" y="-30" width="2" height="50" fill="#FFF" fill-opacity="0.15" />
      
      <!-- Asymmetrical visor / glare hood cutout mask -->
      <path d="M -16,20 L 16,10 L 16,36 L -16,36 Z" fill="#DDBB7D" />
      <path d="M -16,20 L 16,10 L 16,36 L -16,36 Z" stroke="#8D7040" stroke-width="0.75" />

      <!-- Optical water seal gasket ring -->
      <line x1="-16" y1="20" x2="16" y2="10" stroke="#1D1D22" stroke-width="1.5" />

      <!-- Internal Cree core source -->
      <ellipse cx="0" cy="15" rx="10" ry="3.5" fill="#FFFDF0" />
    </g>
  </g>
</svg>
`;

// 8. Helios Dual Wall Sconce (IP65 up & down cylindrical wall wash light)
const HELIOS_SCONCE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="studio-bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#141419" />
      <stop offset="100%" stop-color="#070709" />
    </radialGradient>
    <linearGradient id="up-cone" x1="50%" y1="100%" x2="50%" y2="0%">
      <stop offset="0%" stop-color="#FFFDF0" stop-opacity="0.75" />
      <stop offset="35%" stop-color="#C9A96E" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#C9A96E" stop-opacity="0.0" />
    </linearGradient>
    <linearGradient id="down-cone" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF0" stop-opacity="0.75" />
      <stop offset="35%" stop-color="#C9A96E" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#C9A96E" stop-opacity="0.0" />
    </linearGradient>
  </defs>

  <rect width="400" height="400" fill="url(#studio-bg)" rx="4" />

  <!-- Wall brick layout lines (representing beautiful facade textures) -->
  <g opacity="0.04" stroke="#FFF" stroke-width="0.75">
    <line x1="0" y1="60" x2="400" y2="60" />
    <line x1="0" y1="140" x2="400" y2="140" />
    <line x1="0" y1="220" x2="400" y2="220" />
    <line x1="0" y1="300" x2="400" y2="300" />
    
    <line x1="100" y1="0" x2="100" y2="60" />
    <line x1="300" y1="0" x2="300" y2="60" />
    <line x1="50" y1="60" x2="50" y2="140" />
    <line x1="250" y1="60" x2="250" y2="140" />
    <line x1="180" y1="140" x2="180" y2="220" />
    <line x1="380" y1="140" x2="380" y2="220" />
    <line x1="110" y1="220" x2="110" y2="300" />
    <line x1="310" y1="220" x2="310" y2="300" />
  </g>

  <!-- Spec Description -->
  <text x="40" y="340" fill="#8E909A" font-family="monospace" font-size="8" letter-spacing="1">MODEL: HELIOS-WALL-UPDOWN</text>
  <text x="40" y="355" fill="#C9A96E" font-family="monospace" font-size="8" letter-spacing="1">SERIES: ARCHITECTURAL DUAL SCONCE</text>
  <text x="360" y="340" fill="#8E909A" font-family="monospace" font-size="8" text-anchor="end">EMISSION: SYMMETRICAL 2x6W</text>
  <text x="360" y="355" fill="#8E909A" font-family="monospace" font-size="8" text-anchor="end">PROTECT: IP65 SPLASHPROOF</text>

  <!-- Sharp, geometric light cones casting up and down -->
  <polygon points="200,125 100,20 300,20" fill="url(#up-cone)" />
  <polygon points="200,275 100,380 300,380" fill="url(#down-cone)" />

  <!-- Wall sconce cylindrical body representation -->
  <g transform="translate(175, 125)">
    <!-- Back support mounting plate -->
    <rect x="-18" y="40" width="12" height="70" fill="#2E2E35" stroke="#1D1D22" stroke-width="1" />
    <rect x="-6" y="70" width="12" height="10" fill="#1C1C1F" />

    <!-- Symmetrical Cylinder Body housing (Graphite/Anthracite grey) -->
    <rect x="0" y="0" width="50" height="150" fill="#2A2B30" stroke="#3E3E47" stroke-width="1.2" rx="1.5" />
    <!-- Fine highlight glare lines -->
    <rect x="8" y="0" width="5" height="150" fill="#FFF" fill-opacity="0.1" />

    <!-- Center aesthetic brand ribbon / gold center connector ring -->
    <rect x="0" y="71" width="50" height="8" fill="#C9A96E" />

    <!-- Top optical clear tempered glass lens rim -->
    <rect x="0" y="-1" width="50" height="4" fill="#0C0C0E" stroke="#333" stroke-width="0.5" />
    <ellipse cx="25" cy="1" rx="21" ry="1.5" fill="#FFF" fill-opacity="0.5" />

    <!-- Bottom optical clear tempered glass lens rim -->
    <rect x="0" y="147" width="50" height="4" fill="#0C0C0E" stroke="#333" stroke-width="0.5" />
    <ellipse cx="25" cy="149" rx="21" ry="1.5" fill="#FFF" fill-opacity="0.5" />
  </g>
</svg>
`;

export const PRODUCT_IMAGE_URIS: Record<string, string[]> = {
  'nano-lumina': [svgToDataUri(NANO_LUMINA_SVG)],
  'twin-glarefree': [svgToDataUri(TWIN_GLAREFREE_SVG)],
  'cobmove-downlight': [svgToDataUri(COBMOVE_SVG)],
  'twinbeam-spotlight': [svgToDataUri(TWINBEAM_TRACK_SVG)],
  'mag-linear': [svgToDataUri(MAG_LINEAR_SVG)],
  'linear-sysprofile': [svgToDataUri(SYSPROFILE_SVG)],
  'aurora-garden-spike': [svgToDataUri(AURORA_SPIKE_SVG)],
  'helios-wall-wash': [svgToDataUri(HELIOS_SCONCE_SVG)],
  'fr-snap': [svgToDataUri(NANO_LUMINA_SVG)],
  'fr-clasp': [svgToDataUri(NANO_LUMINA_SVG)],
  'fr-hinge': [svgToDataUri(NANO_LUMINA_SVG)],
  'fr-open': [svgToDataUri(NANO_LUMINA_SVG)],
  'fr-click': [svgToDataUri(NANO_LUMINA_SVG)],
};
