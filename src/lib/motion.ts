export const EASE = [0.23, 1, 0.32, 1] as const;

export const DURATION = {
  micro: 0.35,
  reveal: 0.6,
  morph: 0.45,
} as const;

export const STAGGER = 0.08;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: EASE, delay: i * STAGGER },
  }),
};

export const viewportOnce = { once: true, amount: 0.15 } as const;
