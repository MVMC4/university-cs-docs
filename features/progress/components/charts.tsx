import type { ReactNode } from 'react';
import { addDays } from '../core';

/** A circular progress ring, for the daily goal and level progress. */
export function Ring({ value, size = 96, stroke = 9, label, children }: { value: number; size?: number; stroke?: number; label: string; children?: ReactNode }) {
  const clamped = Math.max(0, Math.min(1, value));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="pg-ring" style={{ width: size, height: size }} role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(clamped * 100)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle className="pg-ring-track" cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} fill="none" />
        <circle
          className="pg-ring-fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${circumference * clamped} ${circumference}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="pg-ring-inner">{children}</div>
    </div>
  );
}

export type Point = { label: string; value: number; title?: string };

function niceMax(value: number) {
  if (value <= 10) return 10;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  return Math.ceil(value / magnitude) * magnitude;
}

/**
 * A line and area chart over a run of days. `average` draws a smoothed line over the top, so a quiet day does not
 * hide the trend. A short text summary is read by screen readers in place of the picture.
 */
export function TrendChart({
  points,
  average,
  unit,
  summary,
  height = 190,
  percent = false,
}: {
  points: Point[];
  average?: number[];
  unit: string;
  summary: string;
  height?: number;
  percent?: boolean;
}) {
  const width = 640;
  const pad = { left: 38, right: 12, top: 14, bottom: 26 };
  const max = percent ? 100 : niceMax(Math.max(1, ...points.map((point) => point.value), ...(average ?? [0])));
  const innerWidth = width - pad.left - pad.right;
  const innerHeight = height - pad.top - pad.bottom;
  const step = points.length > 1 ? innerWidth / (points.length - 1) : 0;
  const x = (index: number) => pad.left + index * step;
  const y = (value: number) => pad.top + innerHeight - (value / max) * innerHeight;
  const line = points.map((point, index) => `${index === 0 ? 'M' : 'L'}${x(index).toFixed(1)} ${y(point.value).toFixed(1)}`).join(' ');
  const area = points.length > 0 ? `${line} L${x(points.length - 1).toFixed(1)} ${pad.top + innerHeight} L${x(0).toFixed(1)} ${pad.top + innerHeight} Z` : '';
  const averageLine = average?.map((value, index) => `${index === 0 ? 'M' : 'L'}${x(index).toFixed(1)} ${y(value).toFixed(1)}`).join(' ');
  const ticks = [0, 0.5, 1].map((fraction) => Math.round(max * fraction));
  const labelAt = [0, Math.floor((points.length - 1) / 2), points.length - 1];
  return (
    <figure className="pg-chart">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={summary} preserveAspectRatio="none">
        {ticks.map((tick) => (
          <g key={tick}>
            <line className="pg-grid" x1={pad.left} x2={width - pad.right} y1={y(tick)} y2={y(tick)} />
            <text className="pg-axis" x={pad.left - 6} y={y(tick) + 4} textAnchor="end">{tick}{percent ? '%' : ''}</text>
          </g>
        ))}
        {area && <path className="pg-area" d={area} />}
        {line && <path className="pg-line" d={line} fill="none" />}
        {averageLine && <path className="pg-average" d={averageLine} fill="none" />}
        {points.map((point, index) => (
          point.value > 0 && (
            <circle key={point.label} className="pg-dot" cx={x(index)} cy={y(point.value)} r={points.length > 40 ? 1.8 : 3}>
              <title>{point.title ?? `${point.label}: ${point.value} ${unit}`}</title>
            </circle>
          )
        ))}
        {labelAt.map((index, position) => points[index] && (
          <text key={position} className="pg-axis" x={x(index)} y={height - 7} textAnchor={position === 0 ? 'start' : position === 2 ? 'end' : 'middle'}>{points[index].label}</text>
        ))}
      </svg>
      <figcaption>{summary}</figcaption>
    </figure>
  );
}

/** Bars for weeks (or any short run of totals). */
export function BarChart({ points, unit, summary, height = 150 }: { points: Point[]; unit: string; summary: string; height?: number }) {
  const width = 640;
  const pad = { left: 38, right: 12, top: 12, bottom: 26 };
  const max = niceMax(Math.max(1, ...points.map((point) => point.value)));
  const innerWidth = width - pad.left - pad.right;
  const innerHeight = height - pad.top - pad.bottom;
  const slot = innerWidth / Math.max(1, points.length);
  const barWidth = Math.min(40, slot * 0.64);
  return (
    <figure className="pg-chart">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={summary} preserveAspectRatio="none">
        {[0, 0.5, 1].map((fraction) => {
          const value = Math.round(max * fraction);
          const yy = pad.top + innerHeight - fraction * innerHeight;
          return (
            <g key={fraction}>
              <line className="pg-grid" x1={pad.left} x2={width - pad.right} y1={yy} y2={yy} />
              <text className="pg-axis" x={pad.left - 6} y={yy + 4} textAnchor="end">{value}</text>
            </g>
          );
        })}
        {points.map((point, index) => {
          const barHeight = (point.value / max) * innerHeight;
          const bx = pad.left + index * slot + (slot - barWidth) / 2;
          return (
            <g key={point.label}>
              <rect className="pg-bar-rect" x={bx} y={pad.top + innerHeight - barHeight} width={barWidth} height={Math.max(barHeight, point.value > 0 ? 2 : 0)} rx="3">
                <title>{point.title ?? `${point.label}: ${point.value} ${unit}`}</title>
              </rect>
              {(points.length <= 12 || index % 2 === 0) && <text className="pg-axis" x={bx + barWidth / 2} y={height - 7} textAnchor="middle">{point.label}</text>}
            </g>
          );
        })}
      </svg>
      <figcaption>{summary}</figcaption>
    </figure>
  );
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const shortDate = (key: string) => {
  const [, month, day] = key.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]}`;
};

function weekdayIndex(key: string) {
  const [year, month, day] = key.split('-').map(Number);
  return (new Date(Date.UTC(year, month - 1, day)).getUTCDay() + 6) % 7; // Monday = 0
}

/** The activity heat map: columns are weeks, rows are Monday to Sunday, darker means more XP that day. */
export function Heatmap({ xpByDay, today, weeks = 17 }: { xpByDay: Record<string, number>; today: string; weeks?: number }) {
  const start = addDays(today, -(weeks - 1) * 7 - weekdayIndex(today));
  const max = Math.max(1, ...Object.values(xpByDay));
  const cells = Array.from({ length: weeks * 7 }, (_, index) => {
    const key = addDays(start, index);
    const xp = xpByDay[key] ?? 0;
    const level = xp <= 0 ? 0 : Math.min(4, Math.max(1, Math.ceil((xp / max) * 4)));
    return { key, xp, level, future: key > today };
  });
  const studied = cells.filter((cell) => cell.level > 0).length;
  return (
    <div className="pg-heat" role="img" aria-label={`Study days over the last ${weeks} weeks: ${studied} days with activity`}>
      {cells.map((cell) => (
        <span
          key={cell.key}
          className="pg-cell"
          data-level={cell.level}
          data-future={cell.future || undefined}
          data-today={cell.key === today || undefined}
          title={cell.future ? undefined : `${shortDate(cell.key)}${cell.xp > 0 ? `: ${cell.xp} XP` : ''}`}
        />
      ))}
    </div>
  );
}
