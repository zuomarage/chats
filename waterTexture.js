/* global THREE AFRAME*/
import { Voronoi, relaxCells, distance } from "./voronoi.js";
const {
  WebGLRenderTarget,
  RGBFormat,
  NearestFilter,
  DepthTexture,
  UnsignedShortType,
  ShaderMaterial,
  TextureLoader,
  RepeatWrapping,
  Vector2,
  MeshBasicMaterial,
  MeshDepthMaterial,
  CanvasTexture
} = THREE;

function lerp(p1, p2, t = 0.5) {
  return {
    x: p1.x + (p2.x - p1.x) * t,
    y: p1.y + (p2.y - p1.y) * t
  };
}

function generateCausticCanvasTexture(nPoints) {
  const voronoi = new Voronoi();
  const originalSites = [];
  const width = 512;
  const height = 512;
  const targetGap = width / 55;
  const bbox = { xl: -width, xr: width * 2, yt: -height, yb: height * 2 }; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom
  for (let i = 0; i < nPoints - 3; i++)
    originalSites.push({
      x: Math.random() * width,
      y: Math.random() * height
    });
  originalSites.push(
    ...relaxCells(voronoi.compute(originalSites.splice(0), bbox).cells)
  );
  for (let i = 0; i < 3; i++)
    originalSites.push({
      x: Math.random() * width,
      y: Math.random() * height
    });
  const sites = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      for (const site of originalSites) {
        sites.push({
          x: site.x + width * i,
          y: site.y + height * j
        });
      }
    }
  }
  const shapes = voronoi.compute(sites, bbox);
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("viewBox", `${0} ${0} ${width} ${height}`);
  svg.setAttribute(
    "style",
    `width:${width}px; height:${height}px; position: absolute;`
  );
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.innerHTML = `
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <defs>
          <filter id="goo">
              <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"></feColorMatrix>
              <feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite>
          </filter>
          <filter id="goo2">
              <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="4"></feGaussianBlur>
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 14 -8" result="goo"></feColorMatrix>
              <feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite>
          </filter>
          <filter id="displacementFilter">
            <feTurbulence type="turbulence" baseFrequency="0.025" stitchTiles="stitch"
                numOctaves="1" result="turbulence"/>
            <feGaussianBlur in="turbulence" result="blur" stdDeviation="10"></feGaussianBlur>
            <feDisplacementMap in2="blur" in="SourceGraphic"
                scale="${width /
                  13}" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
        <g style="filter: url(#goo2);"></g>
        `;
  const g = svg.querySelector("g");
  for (const cell of shapes.cells) {
    if (!cell.halfedges[0]) continue;
    const p = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    const vertices = [];
    vertices.push(cell.halfedges[0].getStartpoint());
    for (const halfEdge of cell.halfedges) {
      vertices.push(halfEdge.getEndpoint());
    }
    p.setAttribute(
      "points",
      vertices
        .map(vertex => {
          const t =
            1 - targetGap / Math.max(distance(cell.site, vertex), targetGap);
          return lerp(cell.site, vertex, t);
        })
        .map(vertex => `${vertex.x},${vertex.y}`)
        .join(" ")
    );
    p.setAttribute("style", "fill:black;stroke-width:0;filter:url(#goo);");
    g.appendChild(p);
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const canvasTexture = new CanvasTexture(canvas);
  canvasTexture.wrapS = canvasTexture.wrapT = RepeatWrapping;
  canvasTexture.anisotropy = 4;
  const img = document.createElement("img");
  const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  img.onload = function() {
    canvas.getContext("2d").drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
    canvasTexture.needsUpdate = true;
  };
  img.src = url;

  return canvasTexture;
}

export {
  generateCausticCanvasTexture
}