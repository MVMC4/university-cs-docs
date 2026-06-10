'use client';

import React, { useMemo } from 'react';

interface PlotFunction {
  expr: string;
  color?: string;
  label?: string;
}

interface PlotIntegral {
  funcIndex: number;
  from: number;
  to: number;
  color?: string;
  showArea?: boolean;
}

interface GraphViewerProps {
  title?: string;
  description?: string;
  domain?: [number, number];
  range?: [number, number];
  functions: PlotFunction[];
  integrals?: PlotIntegral[];
  showGrid?: boolean;
}

const DEFAULT_COLORS = [
  'var(--fd-primary)', 
  '#ef4444', 
  '#10b981', 
  '#f59e0b', 
  '#8b5cf6', 
  '#ec4899'
];

export function GraphViewer({
  title,
  description,
  domain = [-10, 10],
  range = [-2, 2],
  functions,
  integrals = [],
  showGrid = true
}: GraphViewerProps) {
  const width = 600;
  const height = 400;
  const padding = 50;

  // Math scope for Desmos-like expressions (allows 'sin(x)' instead of 'Math.sin(x)')
  const mathScope = {
    sin: Math.sin, cos: Math.cos, tan: Math.tan,
    exp: Math.exp, log: Math.log, sqrt: Math.sqrt,
    abs: Math.abs, PI: Math.PI, E: Math.E,
    asin: Math.asin, acos: Math.acos, atan: Math.atan
  };

  const plotData = useMemo(() => {
    const steps = 500;
    const dx = (domain[1] - domain[0]) / steps;
    
    const toSvgX = (x: number) => (padding + ((x - domain[0]) / (domain[1] - domain[0])) * (width - 2 * padding)).toFixed(2);
    const toSvgY = (y: number) => (height - padding - ((y - range[0]) / (range[1] - range[0])) * (height - 2 * padding)).toFixed(2);

    // Compile functions
    const compiledFuncs = functions.map(f => {
      const cleanExpr = f.expr.replace(/\^/g, '**');
      return new Function('x', ...Object.keys(mathScope), `try { return ${cleanExpr}; } catch(e) { return NaN; }`);
    });

    // Generate paths for each function
    const paths = functions.map((_, fIdx) => {
      let currentPath = '';
      const segments: string[] = [];
      const evalFn = compiledFuncs[fIdx];

      for (let i = 0; i <= steps; i++) {
        const x = domain[0] + i * dx;
        const y = evalFn(x, ...Object.values(mathScope));

        if (isNaN(y) || !isFinite(y) || y > range[1] * 10 || y < range[0] * 10) {
          if (currentPath) { segments.push(currentPath); currentPath = ''; }
          continue;
        }

        const px = toSvgX(x);
        const py = toSvgY(y);

        if (!currentPath) currentPath = `M ${px} ${py}`;
        else currentPath += ` L ${px} ${py}`;
      }
      if (currentPath) segments.push(currentPath);
      return segments;
    });

    // Generate integral shading paths and calculate area
    const integralData = integrals.map(intg => {
      const evalFn = compiledFuncs[intg.funcIndex];
      if (!evalFn) return null;

      let path = '';
      let area = 0;
      let prevY = null;
      let started = false;
      
      // We need to step specifically through the integral bounds
      const intgSteps = 200;
      const intgDx = (intg.to - intg.from) / intgSteps;

      for (let i = 0; i <= intgSteps; i++) {
        const x = intg.from + i * intgDx;
        const y = evalFn(x, ...Object.values(mathScope));
        
        if (isNaN(y) || !isFinite(y)) continue;

        // Trapezoidal rule for area
        if (prevY !== null) {
          area += 0.5 * (prevY + y) * intgDx;
        }
        prevY = y;

        const px = toSvgX(x);
        const py = toSvgY(y);

        if (!started) {
          path = `M ${toSvgX(intg.from)} ${toSvgY(0)} L ${px} ${py}`;
          started = true;
        } else {
          path += ` L ${px} ${py}`;
        }
      }
      
      if (started) {
        path += ` L ${toSvgY(intg.to)} ${toSvgY(0)} Z`;
        // Fix: The line down to the x-axis should use X coordinate of 'to', not Y
        path = path.replace(`L ${toSvgY(intg.to)} ${toSvgY(0)} Z`, `L ${toSvgX(intg.to)} ${toSvgY(0)} Z`);
      }

      return { path, area: area.toFixed(3) };
    });

    return { paths, integralData, toSvgX, toSvgY };
  }, [functions, integrals, domain, range]);

  const { paths, integralData, toSvgX, toSvgY } = plotData;

  // Axis calculations
  const originX = domain[0] <= 0 && domain[1] >= 0 ? toSvgX(0) : null;
  const originY = range[0] <= 0 && range[1] >= 0 ? toSvgY(0) : null;

  // Tick generation
  const generateTicks = (min: number, max: number, count: number) => {
    const step = (max - min) / count;
    const ticks = [];
    for (let i = 0; i <= count; i++) {
      const val = min + i * step;
      if (Math.abs(val) > 1e-10) ticks.push(val); // Skip 0 to avoid overlapping origin label
    }
    return ticks;
  };

  const xTicks = generateTicks(domain[0], domain[1], 8);
  const yTicks = generateTicks(range[0], range[1], 6);

  return (
    <div className="my-6 w-full overflow-hidden rounded-xl border border-fd-border bg-fd-background shadow-sm">
      {(title || description) && (
        <div className="border-b border-fd-border p-4">
          {title && <h4 className="font-bold text-fd-foreground">{title}</h4>}
          {description && <p className="text-sm text-fd-muted-foreground mt-1">{description}</p>}
        </div>
      )}
      
      <div className="p-4 flex flex-col lg:flex-row gap-4 bg-fd-muted/10">
        <div className="flex-1 flex justify-center overflow-x-auto">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-2xl h-auto">
            {/* Grid */}
            {showGrid && (
              <g>
                {xTicks.map((val, i) => (
                  <line key={`gx-${i}`} x1={toSvgX(val)} y1={padding} x2={toSvgX(val)} y2={height - padding} stroke="var(--fd-border)" strokeWidth="1" strokeDasharray="4,4" />
                ))}
                {yTicks.map((val, i) => (
                  <line key={`gy-${i}`} x1={padding} y1={toSvgY(val)} x2={width - padding} y2={toSvgY(val)} stroke="var(--fd-border)" strokeWidth="1" strokeDasharray="4,4" />
                ))}
              </g>
            )}

            {/* Axes */}
            <g stroke="var(--fd-foreground)" strokeWidth="1.5" opacity="0.6">
              {originY && <line x1={padding} y1={originY} x2={width - padding} y2={originY} />}
              {originX && <line x1={originX} y1={padding} x2={originX} y2={height - padding} />}
            </g>

            {/* Origin Marker */}
            {originX && originY && (
              <g>
                <circle cx={originX} cy={originY} r="3" fill="var(--fd-foreground)" />
                <text x={Number(originX) - 12} y={Number(originY) + 15} fontSize="11" fill="var(--fd-muted-foreground)" fontFamily="monospace">0</text>
              </g>
            )}

            {/* Tick Labels */}
            <g fontSize="10" fill="var(--fd-muted-foreground)" fontFamily="monospace" textAnchor="middle">
              {xTicks.map((val, i) => (
                <g key={`tx-${i}`}>
                  <line x1={toSvgX(val)} y1={Number(originY || height - padding) - 3} x2={toSvgX(val)} y2={Number(originY || height - padding) + 3} stroke="var(--fd-foreground)" strokeWidth="1" />
                  <text x={toSvgX(val)} y={Number(originY || height - padding) + 15}>{val.toFixed(1)}</text>
                </g>
              ))}
            </g>
            <g fontSize="10" fill="var(--fd-muted-foreground)" fontFamily="monospace" textAnchor="end">
              {yTicks.map((val, i) => (
                <g key={`ty-${i}`}>
                  <line x1={Number(originX || padding) - 3} y1={toSvgY(val)} x2={Number(originX || padding) + 3} y2={toSvgY(val)} stroke="var(--fd-foreground)" strokeWidth="1" />
                  <text x={Number(originX || padding) - 8} y={Number(toSvgY(val)) + 3}>{val.toFixed(1)}</text>
                </g>
              ))}
            </g>

            {/* Axis Labels */}
            <text x={width - padding + 15} y={Number(originY || height - padding) + 4} fontSize="12" fill="var(--fd-foreground)" fontWeight="bold">x</text>
            <text x={Number(originX || padding) - 4} y={padding - 15} fontSize="12" fill="var(--fd-foreground)" fontWeight="bold" textAnchor="middle">y</text>

            {/* Integrals (Shading) */}
            {integralData.map((intg, i) => {
              if (!intg || !intg.path) return null;
              const color = integrals[i].color || DEFAULT_COLORS[integrals[i].funcIndex % DEFAULT_COLORS.length];
              return (
                <path 
                  key={`intg-${i}`} 
                  d={intg.path} 
                  fill={color} 
                  fillOpacity="0.2" 
                  stroke={color} 
                  strokeWidth="1" 
                  strokeDasharray="2,2"
                />
              );
            })}

            {/* Function Paths */}
            {paths.map((segments, fIdx) => {
              const color = functions[fIdx].color || DEFAULT_COLORS[fIdx % DEFAULT_COLORS.length];
              return segments.map((d, sIdx) => (
                <path 
                  key={`f-${fIdx}-${sIdx}`} 
                  d={d} 
                  fill="none" 
                  stroke={color} 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              ));
            })}
          </svg>
        </div>

        {/* Legend & Info */}
        <div className="lg:w-48 flex flex-col gap-3 text-sm border-t lg:border-t-0 lg:border-l border-fd-border pt-4 lg:pt-0 lg:pl-4">
          <div className="font-semibold text-fd-foreground text-xs uppercase tracking-wider">Functions</div>
          {functions.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-1 rounded-full" style={{ backgroundColor: f.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length] }} />
              <span className="font-mono text-xs text-fd-foreground truncate" title={f.expr}>
                {f.label || `f(x) = ${f.expr}`}
              </span>
            </div>
          ))}
          
          {integralData.some(d => d !== null) && (
            <>
              <div className="font-semibold text-fd-foreground text-xs uppercase tracking-wider mt-2">Integrals (Area)</div>
              {integrals.map((intg, i) => {
                const data = integralData[i];
                if (!data) return null;
                const color = intg.color || DEFAULT_COLORS[intg.funcIndex % DEFAULT_COLORS.length];
                return (
                  <div key={`intg-leg-${i}`} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-3 rounded-sm opacity-50" style={{ backgroundColor: color }} />
                      <span className="font-mono text-xs text-fd-muted-foreground">
                        [{intg.from}, {intg.to}]
                      </span>
                    </div>
                    {intg.showArea !== false && (
                      <span className="text-xs font-semibold text-fd-foreground pl-6">
                        Area ≈ {data.area}
                      </span>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}