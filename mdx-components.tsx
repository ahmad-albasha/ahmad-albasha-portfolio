import type { MDXComponents } from "mdx/types";

// Typography for MDX blog posts (required by @next/mdx in the App Router).
const components: MDXComponents = {
  h2: (props) => <h2 className="mt-14 mb-4 text-title" {...props} />,
  h3: (props) => <h3 className="mt-10 mb-3 font-display text-2xl" {...props} />,
  p: (props) => <p className="my-5 leading-relaxed" {...props} />,
  a: (props) => <a className="text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold" {...props} />,
  ul: (props) => <ul className="my-5 list-disc space-y-2 ps-6 marker:text-gold" {...props} />,
  ol: (props) => <ol className="my-5 list-decimal space-y-2 ps-6 marker:text-gold" {...props} />,
  strong: (props) => <strong className="font-semibold text-fg" {...props} />,
  code: (props) => <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-gold-soft" {...props} />,
  pre: (props) => <pre dir="ltr" className="my-6 overflow-x-auto rounded-xl border border-line bg-surface p-5 text-sm [&_code]:bg-transparent [&_code]:p-0" {...props} />,
  blockquote: (props) => <blockquote className="my-6 border-s-2 border-gold/60 ps-5 text-fg/90 italic" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
