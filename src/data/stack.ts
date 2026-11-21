/**
 * Tech stack shown in the "Tech stack" section. Logos are monochrome (black)
 * paths from `simple-icons`; `path: null` shows the name with a generic icon
 * (used for AWS — Amazon doesn't license its logo to open icon sets).
 */
import {
  siDart, siDocker, siExpress, siFigma, siFirebase, siFlutter, siGit, siGithubactions,
  siJavascript, siKalilinux, siKubernetes, siLangchain, siLinux, siMongodb, siNextdotjs,
  siNodedotjs, siPostgresql, siPython, siSupabase, siPytorch, siReact, siTailwindcss, siTensorflow,
  siTypescript, siWireshark,
} from 'simple-icons';

export interface StackItem { name: string; path: string | null }
export interface StackGroup { title: string; items: StackItem[] }

const i = (name: string, icon: { path: string } | null): StackItem => ({ name, path: icon?.path ?? null });

export const stack: StackGroup[] = [
  {
    title: 'Languages',
    items: [i('Python', siPython), i('JavaScript', siJavascript), i('TypeScript', siTypescript), i('Dart', siDart)],
  },
  {
    title: 'Frameworks',
    items: [
      i('React', siReact), i('Next.js', siNextdotjs), i('Node.js', siNodedotjs), i('Express', siExpress),
      i('Flutter', siFlutter), i('PyTorch', siPytorch), i('TensorFlow', siTensorflow), i('LangChain', siLangchain),
      i('Tailwind CSS', siTailwindcss),
    ],
  },
  {
    title: 'Software & tools',
    items: [
      i('AWS', null), i('Docker', siDocker), i('Kubernetes', siKubernetes), i('GitHub Actions', siGithubactions),
      i('Linux', siLinux), i('MongoDB', siMongodb), i('PostgreSQL', siPostgresql), i('Supabase', siSupabase), i('Firebase', siFirebase),
      i('Git', siGit), i('Figma', siFigma), i('Kali Linux', siKalilinux), i('Wireshark', siWireshark),
    ],
  },
];
