export default function ImagePlaceholder({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <div className={`mf-imgph ${light ? "on-light" : ""}`} role="img" aria-label={`Placeholder: ${label}`}>
      <span>{label}</span>
    </div>
  );
}
