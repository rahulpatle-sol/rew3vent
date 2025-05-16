export default function Footer() {
  return (
    <footer className="bg-card/30 border-t border-border/50 py-6 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Rew3vent. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          Fueling the future of events, one block at a time.
        </p>
      </div>
    </footer>
  );
}
