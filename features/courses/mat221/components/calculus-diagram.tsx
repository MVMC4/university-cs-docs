import Image from 'next/image';
import { mat221AssetPaths, type Mat221DiagramKey } from '../lib/asset-paths';

export function CalculusDiagram({
  diagram,
  alt,
  caption,
}: {
  diagram: Mat221DiagramKey;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="mat221-diagram">
      <Image src={mat221AssetPaths.diagrams[diagram]} alt={alt} width={960} height={540} unoptimized />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
