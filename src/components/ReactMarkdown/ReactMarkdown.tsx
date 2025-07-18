import markdownit from 'markdown-it';
import cls from 'classnames';
import { memo } from 'react';
import styles from './react-markdown.module.less';

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
  breaks: false,
});

interface ReactMarkdownProps {
  content: string;
  className?: string;
}

export const ReactMarkdown = memo<ReactMarkdownProps>((props) => {
  const { content, className } = props;

  return (
    <div
      className={cls(styles.md, className)}
      dangerouslySetInnerHTML={{
        __html: md.render(content),
      }}
    />
  );
});
