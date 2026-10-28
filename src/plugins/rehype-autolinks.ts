import { visit } from 'unist-util-visit';
import { autoLinkRules } from '../data/autolinks.js';

interface FlatKeyword {
  keyword: string;
  url: string;
}

// Urutkan kata kunci dari yang terpanjang ke terpendek (greedy matching)
const sortedKeywords: FlatKeyword[] = [];
for (const rule of autoLinkRules) {
  for (const kw of rule.keywords) {
    sortedKeywords.push({
      keyword: kw.toLowerCase().trim(),
      url: rule.url,
    });
  }
}
sortedKeywords.sort((a, b) => b.keyword.length - a.keyword.length);

/**
 * Rehype plugin untuk auto internal linking di konten markdown.
 * Aturan:
 * 1. Maksimal 1 link per URL target per halaman untuk menghindari over-linking.
 * 2. Tidak menyisipkan link di dalam heading (h1-h6), link (a), atau block kode (code, pre).
 * 3. Self-linking dicegah berdasarkan file path atau URL dokumen yang sedang diproses.
 */
export function rehypeAutoLinks() {
  return (tree: any, file: any) => {
    const linkedUrls = new Set<string>();

    // Deteksi URL halaman saat ini dari path file
    const filePath = file?.history?.[0] || file?.path || '';
    let currentRoute = '';
    if (filePath.includes('/content/lokasi/')) {
      const match = filePath.match(/\/content\/lokasi\/(.+?)\.(md|mdx)$/);
      if (match) currentRoute = `/lokasi/${match[1]}/`;
    } else if (filePath.includes('/content/artikel/')) {
      const match = filePath.match(/\/content\/artikel\/(.+?)\.(md|mdx)$/);
      if (match) currentRoute = `/${match[1]}/`;
    }

    // Jika sedang di halaman itu sendiri, jangan tautkan ke dirinya sendiri
    if (currentRoute) {
      linkedUrls.add(currentRoute);
    }

    // Traverse AST HTML
    visit(tree, 'element', (node, index, parent) => {
      // Lewati tag yang tidak boleh di-link
      if (['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code', 'pre', 'script', 'style'].includes(node.tagName)) {
        return 'skip';
      }

      // Periksa children yang bertipe text
      if (!node.children || node.children.length === 0) return;

      const newChildren: any[] = [];
      let modified = false;

      for (const child of node.children) {
        if (child.type !== 'text') {
          newChildren.push(child);
          continue;
        }

        const textContent = child.value;
        if (!textContent || textContent.trim().length === 0) {
          newChildren.push(child);
          continue;
        }

        let replaced = false;

        // Cari kata kunci yang cocok
        for (const item of sortedKeywords) {
          if (linkedUrls.has(item.url)) continue;

          // Regex case-insensitive dengan boundary kata
          const escaped = item.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`(^|\\s|[.,!?;:()"])${escaped}($|\\s|[.,!?;:()"])`, 'i');
          const match = textContent.match(regex);

          if (match && match.index !== undefined) {
            const prefix = match[1] || '';
            const suffix = match[2] || '';
            const matchStart = match.index + prefix.length;
            const matchEnd = matchStart + item.keyword.length;

            const beforeText = textContent.slice(0, matchStart);
            const matchedText = textContent.slice(matchStart, matchEnd);
            const afterText = textContent.slice(matchEnd);

            if (beforeText) {
              newChildren.push({ type: 'text', value: beforeText });
            }

            // Buat node <a> untuk autolink
            newChildren.push({
              type: 'element',
              tagName: 'a',
              properties: {
                href: item.url,
                className: ['autolink-keyword'],
              },
              children: [{ type: 'text', value: matchedText }],
            });

            if (afterText) {
              newChildren.push({ type: 'text', value: afterText });
            }

            linkedUrls.add(item.url);
            replaced = true;
            modified = true;
            break;
          }
        }

        if (!replaced) {
          newChildren.push(child);
        }
      }

      if (modified) {
        node.children = newChildren;
      }
    });
  };
}
